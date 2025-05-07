import { database } from "@/services/firebase/config";
import { get, onValue, ref, set, update } from "firebase/database";
import { useEffect, useState } from "react";
import { useUser } from "./useUser";

type ActiveWorkoutData = {
    startedAt: number;
    completedEpisodes: string[];
    totalEpisodes: number;
};

export type ActiveWorkoutWithName = ActiveWorkoutData & {
    workoutName: string;
};

export const useActiveWorkout = (workoutName: string) => {
    const [activeWorkout, setActiveWorkout] = useState<ActiveWorkoutData | null>(null);
    const { user, loading } = useUser();

    useEffect(() => {
        if (!user) return;
        if (loading) return;

        const workoutRef = ref(database, `users/${user.uid}/activeWorkout/${workoutName}`);
        const unsubscribe = onValue(workoutRef, (snapshot) => {
            const data = snapshot.val();
            setActiveWorkout(data);
        });

        return () => unsubscribe();
    }, [user, workoutName, loading]);

    const startWorkout = (episodes: string[]) => {
        if (!user) return;
        const workoutRef = ref(database, `users/${user.uid}/activeWorkout/${workoutName}`);
        set(workoutRef, {
            startedAt: Date.now(),
            completedEpisodes: [],
            totalEpisodes: episodes.length,
        });

        const userRef = ref(database, `users/${user.uid}`);
        get(userRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    update(userRef, {
                        totalWorkouts: (data.totalWorkouts || 0) + 1,
                    });
                }
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    };

    const completeEpisode = (episodeName: string) => {
        if (!user || !activeWorkout) return;
        const workoutRef = ref(database, `users/${user.uid}/activeWorkout/${workoutName}`);
        const updated = [...(activeWorkout.completedEpisodes || []), episodeName];
        update(workoutRef, { completedEpisodes: updated });
    };

    const resetWorkout = () => {
        if (!user) return;
        const workoutRef = ref(database, `users/${user.uid}/activeWorkout/${workoutName}`);
        set(workoutRef, null);
    };

    return { activeWorkout, startWorkout, completeEpisode, resetWorkout };
};
export const useAllActiveWorkoutsArray = () => {
    const [workouts, setWorkouts] = useState<ActiveWorkoutWithName[]>([]);
    const { user } = useUser();

    useEffect(() => {
        if (!user) return;
        const allRef = ref(database, `users/${user.uid}/activeWorkout`);
        const unsubscribe = onValue(allRef, (snapshot) => {
            const data: Record<string, ActiveWorkoutData> = snapshot.val() || {};
            const arr: ActiveWorkoutWithName[] = Object.entries(data).map(([workoutName, meta]) => ({
                workoutName,
                ...meta,
            }));
            setWorkouts(arr);
        });
    }, [user]);

    return { workouts };
};
