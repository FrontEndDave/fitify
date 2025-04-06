import { signInAnonymously } from "firebase/auth";
import { get, ref, set } from "firebase/database";
import { auth, database } from "./config";

const initializeUser = async () => {
    try {
        console.log("[1] Rozpoczęcie inicjalizacji użytkownika...");

        const userCredential = await signInAnonymously(auth);
        console.log("[2] Autentykacja zakończona:", userCredential);

        const user = userCredential.user;
        if (!user) {
            console.error("[ERROR] Brak obiektu user w userCredential");
            throw new Error("Nie udało się utworzyć użytkownika.");
        }
        console.log("[3] Użytkownik otrzymany:", user.uid);

        const userRef = ref(database, `users/${user.uid}`);
        console.log("[4] Referencja do bazy utworzona:", userRef.toString());

        console.log("[5] Próba pobrania snapshotu...");
        const snapshot = await get(userRef).catch((error) => {
            console.error("[CRITICAL] Błąd odczytu bazy:", error);
            throw error;
        });
        console.log("[6] Snapshot otrzymany:", snapshot.exists());

        if (!snapshot.exists()) {
            console.log("[7] Tworzenie nowego rekordu...");
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
            console.log("[8] Rekord utworzony");
        }

        return user;
    } catch (error) {
        console.error("[FINAL ERROR] Całościowy błąd:", error);
        throw error;
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

export { initializeUser, getUserData };
