import AsyncStorage from "@react-native-async-storage/async-storage";
import { get, ref, set } from "firebase/database";
import { database } from "./config";

const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

const initializeUser = async ({ email, password, name }: { email: string; password: string; name: string }) => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/register`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password, name }),
        });

        const userCredential = await res.json();

        if (!res.ok) {
            return Promise.reject(userCredential.error);
        }

        if (!userCredential) {
            throw new Error("User not found");
        }

        if (!userCredential.localId) {
            throw new Error("User ID not found");
        }

        await AsyncStorage.setItem("uid", userCredential.localId);

        const userRef = ref(database, `users/${userCredential.localId}`);
        const userData = {
            uid: userCredential.localId,
            name: name,
            createdAt: Date.now(),
            totalCalories: 0,
            totalMinutes: 0,
            totalWorkouts: 0,
            completedExercises: {},
            dailyActivity: {},
        };

        try {
            await set(userRef, userData);
        } catch (error) {
            console.error("Error setting user data:", error);
            throw new Error("Failed to set user data");
        }
        return userData;
    } catch (err) {
        return Promise.reject(typeof err === "string" ? err : err);
    }
};

const loginUser = async ({ email, password }: { email: string; password: string }) => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/login`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const userCredential = await res.json();

        if (!res.ok) {
            return Promise.reject(userCredential.error);
        }

        await AsyncStorage.setItem("uid", userCredential.localId);
    } catch (error) {
        return Promise.reject(error.code);
    }
};

const getUserData = async () => {
    const userUid = await AsyncStorage.getItem("uid");

    if (!userUid) {
        return null;
    }

    const userRef = ref(database, `users/${userUid}`);
    const snapshot = await get(userRef);

    if (!snapshot.exists()) {
        return null;
    }

    const userData = snapshot.val();

    return userData;
};

const updateUsername = async (newName: string) => {
    try {
        const userUid = await AsyncStorage.getItem("uid");
        if (!userUid) throw new Error("User not authenticated");

        const userRef = ref(database, `users/${userUid}/name`);
        await set(userRef, newName);

        return true;
    } catch (error) {
        throw new Error(error.code);
    }
};

export { getUserData, initializeUser, loginUser, updateUsername };
