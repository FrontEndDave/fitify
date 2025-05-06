import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { get, ref, set } from "firebase/database";
import { auth, database } from "./config";

const initializeUser = async ({ email, password, name }: { email: string; password: string; name: string }) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email.toLowerCase(), password);
        const user = userCredential.user;

        await updateProfile(user, { displayName: "Dawid Piela" });

        try {
            if (userCredential.user) {
                const user = auth.currentUser;

                const userRef = ref(database, `users/${user.uid}`);

                await set(userRef, {
                    uid: user.uid,
                    name,
                    createdAt: Date.now(),
                    totalMinutes: 0,
                    totalWorkouts: 0,
                    completedExercises: {},
                    dailyActivity: {},
                });

                return userCredential.user;
            }
        } catch (error) {
            console.log("Error creating user in database", error);
            return Promise.reject(error);
        }
    } catch (error) {
        return Promise.reject(error.code);
    }
};

const loginUser = async ({ email, password }: { email: string; password: string }) => {
    try {
        await signInWithEmailAndPassword(auth, email.toLowerCase(), password);
    } catch (error) {
        return Promise.reject(error.code);
    }
};

const getUserData = async () => {
    const user = auth.currentUser;

    if (!user) {
        return null;
    }

    const userRef = ref(database, `users/${user.uid}`);
    const snapshot = await get(userRef);

    if (!snapshot.exists()) {
        return null;
    }

    const userData = snapshot.val();

    return userData;
};

const updateUsername = async (newName: string) => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("User not authenticated");

        await updateProfile(user, {
            displayName: newName,
        });

        const userRef = ref(database, `users/${user.uid}/name`);
        await set(userRef, newName);

        return true;
    } catch (error) {
        throw new Error(error.code);
    }
};

export { getUserData, initializeUser, loginUser, updateUsername };
