import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { get, ref, set } from "firebase/database";
import { FIREBASE_DATABASE, FIREBASE_AUTH } from "./config";

let userInitializationPromise: Promise<unknown> | null = null;

const initializeUser = async () => {
    if (userInitializationPromise) {
        return userInitializationPromise;
    }

    userInitializationPromise = new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
            if (user) {
                unsubscribe();
                resolve(user);
            } else {
                try {
                    const userCredential = await signInAnonymously(FIREBASE_AUTH);

                    const userRef = ref(FIREBASE_DATABASE, `users/${userCredential.user.uid}`);
                    const snapshot = await get(userRef);

                    if (!snapshot.exists()) {
                        await set(userRef, {
                            uid: userCredential.user.uid,
                            createdAt: Date.now(),
                            totalCalories: 0,
                            totalMinutes: 0,
                            weight: null,
                            height: null,
                            completedExercises: {},
                            dailyActivity: {},
                        });
                    }

                    unsubscribe();
                    resolve(userCredential.user);
                } catch (error) {
                    unsubscribe();
                    console.error("Błąd podczas inicjalizacji użytkownika:", error);
                    reject(error);
                }
            }
        });
    });

    return userInitializationPromise;
};

const getUserData = async () => {
    const user = FIREBASE_AUTH.currentUser;

    if (!user) {
        console.warn("Brak zalogowanego użytkownika.");
        return null;
    }

    const userRef = ref(FIREBASE_DATABASE, `users/${user.uid}`);
    const snapshot = await get(userRef);

    if (!snapshot.exists()) {
        console.warn("Brak danych użytkownika.");
        return null;
    }

    const userData = snapshot.val();

    console.log("Pobrane dane użytkownika:", userData);

    return userData;
};

export { initializeUser, getUserData };
