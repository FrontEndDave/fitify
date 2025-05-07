import { database } from "@/services/firebase/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { get, onValue, ref } from "firebase/database";
import { useCallback, useEffect, useState } from "react";

export interface UserData {
    uid: string;
    email?: string | null;
    displayName?: string | null;
    createdAt: number;
    totalCalories: number;
    totalMinutes: number;
    totalWorkouts: number;
    completedExercises: Record<string, boolean>;
    dailyActivity: Record<string, any>;
}

export const useUser = () => {
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let unsubscribeDb: (() => void) | null = null;

        const initListener = async () => {
            setLoading(true);
            setError(null);

            try {
                const uid = await AsyncStorage.getItem("uid");
                if (!uid) {
                    setUser(null);
                    setLoading(false);
                    return;
                }

                const userRef = ref(database, `users/${uid}`);
                unsubscribeDb = onValue(
                    userRef,
                    (snapshot) => {
                        if (snapshot.exists()) {
                            const dbData = snapshot.val();
                            setUser({
                                uid: dbData.uid,
                                email: dbData.email ?? null,
                                displayName: dbData.name ?? null,
                                createdAt: dbData.createdAt,
                                totalCalories: dbData.totalCalories ?? 0,
                                totalMinutes: dbData.totalMinutes ?? 0,
                                totalWorkouts: dbData.totalWorkouts ?? 0,
                                completedExercises: dbData.completedExercises ?? {},
                                dailyActivity: dbData.dailyActivity ?? {},
                            });
                        } else {
                            setError("User data not found in database");
                            setUser(null);
                        }
                        setLoading(false);
                    },
                    (listenError) => {
                        setError(listenError.message);
                        setLoading(false);
                    }
                );
            } catch (e: any) {
                setError(e.message || "Unknown error");
                setLoading(false);
            }
        };

        initListener();

        return () => {
            if (unsubscribeDb) unsubscribeDb();
        };
    }, []);

    const refreshUser = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const uid = await AsyncStorage.getItem("uid");
            if (!uid) {
                setUser(null);
                return;
            }

            const snapshot = await get(ref(database, `users/${uid}`));
            if (snapshot.exists()) {
                const dbData = snapshot.val();
                setUser({
                    uid: dbData.uid,
                    email: dbData.email ?? null,
                    displayName: dbData.name ?? null,
                    createdAt: dbData.createdAt,
                    totalCalories: dbData.totalCalories ?? 0,
                    totalMinutes: dbData.totalMinutes ?? 0,
                    totalWorkouts: dbData.totalWorkouts ?? 0,
                    completedExercises: dbData.completedExercises ?? {},
                    dailyActivity: dbData.dailyActivity ?? {},
                });
            } else {
                setError("User data not found in database");
                setUser(null);
            }
        } catch (e: any) {
            setError(e.message || "Unknown error");
        } finally {
            setLoading(false);
        }
    }, []);

    return { user, loading, error, refreshUser };
};
