import { database } from "@/services/firebase/config";
import { get, ref, set, update } from "firebase/database";
import { useEffect, useRef, useState } from "react";
import { AppState, AppStateStatus } from "react-native";
import { useUser } from "./useUser";

const useTimeSpentTracker = () => {
    const [timeSpentMinutes, setTimeSpentMinutes] = useState<number>(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const appStateRef = useRef(AppState.currentState);

    const { user, loading } = useUser();

    useEffect(() => {
        if (!user || loading) return;

        const loadSavedTime = async () => {
            try {
                const userRef = ref(database, `users/${user.uid}`);
                const snapshot = await get(userRef);
                if (snapshot.exists()) {
                    setTimeSpentMinutes(snapshot.val().totalMinutes || 0);
                }
            } catch (error) {
                console.error("Error loading time from Firebase:", error);
            }
        };

        loadSavedTime();
    }, [user, loading]);

    useEffect(() => {
        if (!user || loading) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            return;
        }

        const handleAppStateChange = (nextAppState: AppStateStatus) => {
            if (appStateRef.current.match(/inactive|background/) && nextAppState === "active") {
                set(ref(database, `users/${user.uid}`), { totalMinutes: timeSpentMinutes });
            }

            if (nextAppState === "active") {
                if (intervalRef.current) clearInterval(intervalRef.current);

                intervalRef.current = setInterval(() => {
                    update(ref(database, `users/${user.uid}`), {
                        totalMinutes: timeSpentMinutes + 1,
                    });
                    setTimeSpentMinutes((prev) => prev + 1);
                }, 60 * 1000);
            }

            appStateRef.current = nextAppState;
        };

        const sub = AppState.addEventListener("change", handleAppStateChange);
        handleAppStateChange(AppState.currentState);

        return () => {
            sub.remove();
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [user, timeSpentMinutes, loading]);

    return timeSpentMinutes;
};

export default useTimeSpentTracker;
