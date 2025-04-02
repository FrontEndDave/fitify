import { useState, useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useTimeSpentTracker = () => {
    const [timeSpentMinutes, setTimeSpentMinutes] = useState<number>(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const appStateRef = useRef(AppState.currentState);
    const isMounted = useRef(true);

    useEffect(() => {
        const loadSavedTime = async () => {
            try {
                const savedTime = await AsyncStorage.getItem("timeSpent");
                if (savedTime) setTimeSpentMinutes(parseInt(savedTime, 10));
            } catch (error) {
                console.error("Błąd przy wczytywaniu czasu:", error);
            }
        };

        loadSavedTime();

        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        const handleAppStateChange = async (nextAppState: AppStateStatus) => {
            try {
                if (appStateRef.current.match(/active/) && nextAppState === "background") {
                    await AsyncStorage.setItem("timeSpent", timeSpentMinutes.toString());
                }

                appStateRef.current = nextAppState;

                if (nextAppState === "active") {
                    intervalRef.current = setInterval(() => {
                        setTimeSpentMinutes((prev) => {
                            const newTime = prev + 1;
                            AsyncStorage.setItem("timeSpent", newTime.toString());
                            return newTime;
                        });
                    }, 60000);
                } else if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                }
            } catch (error) {
                console.error("Błąd zmiany stanu aplikacji:", error);
            }
        };

        const subscription = AppState.addEventListener("change", handleAppStateChange);
        handleAppStateChange(AppState.currentState);

        return () => {
            subscription.remove();
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    return timeSpentMinutes;
};

export default useTimeSpentTracker;
