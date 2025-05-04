import { signInWithEmailAndPassword } from "firebase/auth";
import { get, ref, set } from "firebase/database";
import { auth, database } from "./config";

const initializeUser = async ({ email, password }: { email: string; password: string }) => {
    const login = await signInWithEmailAndPassword(auth, email, password);

    if (login.user) {
        const user = auth.currentUser;

        const userRef = ref(database, `users/${user.uid}`);
        const snapshot = await get(userRef);

        if (!snapshot.exists()) {
            await set(userRef, {
                uid: user.uid,
                createdAt: Date.now(),
                totalCalories: 0,
                totalMinutes: 0,
                weight: null,
                height: null,
                completedExercises: {},
                dailyActivity: {},
            });
        }
    } else {
        console.log("Login failed");
    }
};

const getUserData = async () => {
    const user = auth.currentUser;

    if (!user) {
        console.warn("Brak zalogowanego użytkownika.");
        return null;
    }

    const userRef = ref(database, `users/${user.uid}`);
    const snapshot = await get(userRef);

    if (!snapshot.exists()) {
        console.warn("Brak danych użytkownika.");
        return null;
    }

    const userData = snapshot.val();

    console.log("Pobrane dane użytkownika:", userData);

    return userData;
};

export { getUserData, initializeUser };
