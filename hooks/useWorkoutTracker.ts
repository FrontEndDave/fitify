import { auth, database } from "@/services/firebase/config";
import { DailyStats, Episode, WorkoutProgress } from "@/types/exercise";
import { get, onValue, ref, update } from "firebase/database";
import { useEffect, useState } from "react";

const useWorkoutProgress = (workoutName: string) => {
    const [progress, setProgress] = useState<WorkoutProgress | null>(null);
    const [dailyStats, setDailyStats] = useState<DailyStats | null>(null);
    const user = auth.currentUser;

    useEffect(() => {
        if (!user) return;

        const progressRef = ref(database, `users/${user.uid}/workoutProgress`);
        const unsubscribe = onValue(progressRef, (snapshot) => {
            setProgress(snapshot.val() || {});
        });

        return () => unsubscribe();
    }, [user]);

    useEffect(() => {
        if (!user) return;

        const today = new Date().toISOString().split("T")[0];
        const dailyRef = ref(database, `users/${user.uid}/dailyActivity/${today}`);
        get(dailyRef).then((snapshot) => {
            setDailyStats(snapshot.val() || { date: today, totalCalories: 0, completedExercises: [] });
        });
    }, [user]);

    const startWorkout = async (episodes: Episode[]) => {
        if (!user) return;

        const updates = {
            [`users/${user.uid}/workoutProgress/${workoutName}`]: {
                startTime: Date.now(),
                completedEpisodes: [],
                episodes: episodes.map((e) => e.name),
            },
        };

        await update(ref(database), updates);
    };

    const completeEpisode = async (episodeName: string) => {
        if (!user || !progress?.[workoutName]) return;

        const updatedProgress = {
            ...progress[workoutName],
            completedEpisodes: [...progress[workoutName].completedEpisodes, episodeName],
        };

        await update(ref(database, `users/${user.uid}/workoutProgress/${workoutName}`), updatedProgress);
    };

    const completeWorkout = async (totalCalories: number) => {
        if (!user || !dailyStats) return;

        const today = new Date().toISOString().split("T")[0];
        const updates = {
            [`users/${user.uid}/workoutProgress/${workoutName}`]: null,
            [`users/${user.uid}/dailyActivity/${today}/totalCalories`]: dailyStats.totalCalories + totalCalories,
            [`users/${user.uid}/dailyActivity/${today}/completedExercises`]: [...dailyStats.completedExercises, workoutName],
        };

        await update(ref(database), updates);
    };

    return { progress, dailyStats, startWorkout, completeEpisode, completeWorkout };
};

export default useWorkoutProgress;
