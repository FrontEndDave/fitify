import { get, ref, set } from "firebase/database";
import { database } from "./config";
import auth from "@react-native-firebase/auth";

const initializeUser = async () => {
    try {
        const createdUser = await auth().signInAnonymously();
        console.log("User created:", createdUser);

        const userRef = ref(database, `users/${createdUser.user.uid}`);
        const snapshot = await get(userRef);

        if (!snapshot.exists()) {
            await set(userRef, {
                createdAt: Date.now(),
                totalCalories: 0,
                totalMinutes: 0,
                weight: null,
                height: null,
                completedExercises: {},
                dailyActivity: {},
            });
        }

        return createdUser.user.uid;
    } catch (error) {
        console.error("Error initializing user:", error);
        throw error;
    }
};

const getUserData = async () => {
    const user = auth().currentUser;
    if (!user) return null;

    const snapshot = await get(ref(database, `users/${user.uid}`));
    return snapshot.val();
};

export { initializeUser, getUserData };
