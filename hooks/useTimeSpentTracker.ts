import { useState, useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";
import { useUser } from "./useUser";
import "firebase/database";
import { database } from "@/services/firebase/config";
import { get, ref, set, update } from "firebase/database";

const useTimeSpentTracker = () => {
    const [timeSpentMinutes, setTimeSpentMinutes] = useState<number>(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const appStateRef = useRef(AppState.currentState);
    const { user } = useUser();
    const isMounted = useRef(true);

    useEffect(() => {
        const loadSavedTime = async () => {
            try {
                const userId = user?.uid;
                if (userId) {
                    const userRef = ref(database, `users/${user.uid}`);
                    const snapshot = await get(userRef);

                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        setTimeSpentMinutes(data.totalMinutes);
                    } else {
                        console.warn("Brak danych użytkownika.");
                    }
                }
            } catch (error) {
                console.error("Error loading time from Firebase:", error);
            }
        };

        loadSavedTime();
        return () => {
            isMounted.current = false;
        };
    }, [user]);

    useEffect(() => {
        const handleAppStateChange = async (nextAppState: AppStateStatus) => {
            if (appStateRef.current.match(/inactive|background/) && nextAppState === "active") {
                if (user?.uid) {
                    const userRef = ref(database, `users/${user.uid}`);
                    set(userRef, {
                        totalMinutes: timeSpentMinutes,
                    });
                }
            }

            if (nextAppState === "active") {
                if (intervalRef.current) clearInterval(intervalRef.current);
                intervalRef.current = setInterval(() => {
                    update(ref(database, `users/${user?.uid}`), {
                        totalMinutes: timeSpentMinutes + 1,
                    });
                    setTimeSpentMinutes((prev) => prev + 1);
                }, 60 * 1000);
            }
        };

        const subscription = AppState.addEventListener("change", handleAppStateChange);
        handleAppStateChange(AppState.currentState);

        return () => {
            subscription.remove();
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [user, timeSpentMinutes]);

    return timeSpentMinutes;
};

export default useTimeSpentTracker;
