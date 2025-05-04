import { auth, database } from "@/services/firebase/config";
import { onAuthStateChanged, User } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";

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
        let unsubscribeDb: () => void = () => {};

        const unsubscribeAuth = onAuthStateChanged(
            auth,
            async (authUser: User | null) => {
                try {
                    setLoading(true);
                    setError(null);

                    if (!authUser) {
                        setUser(null);
                        return;
                    }

                    const userRef = ref(database, `users/${authUser.uid}`);

                    unsubscribeDb = onValue(
                        userRef,
                        (snapshot) => {
                            if (snapshot.exists()) {
                                const dbData = snapshot.val();
                                const mergedUser: UserData = {
                                    uid: authUser.uid,
                                    email: authUser.email,
                                    displayName: authUser.displayName,
                                    createdAt: dbData.createdAt,
                                    totalCalories: dbData.totalCalories || 0,
                                    totalMinutes: dbData.totalMinutes || 0,
                                    totalWorkouts: dbData.totalWorkouts || 0,
                                    completedExercises: dbData.completedExercises || {},
                                    dailyActivity: dbData.dailyActivity || {},
                                };
                                setUser(mergedUser);
                            } else {
                                setError("User data not found in database");
                            }
                            setLoading(false);
                        },
                        (error) => {
                            setError(error.message);
                            setLoading(false);
                        }
                    );
                } catch (err) {
                    setError(err instanceof Error ? err.message : "Unknown error");
                    setLoading(false);
                }
            },
            (authError) => {
                setError(authError.message);
                setLoading(false);
            }
        );

        return () => {
            unsubscribeAuth();
            unsubscribeDb();
        };
    }, []);

    return { user, loading, error };
};
