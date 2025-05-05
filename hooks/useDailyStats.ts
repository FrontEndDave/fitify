import { auth, database } from "@/services/firebase/config";
import { format } from "date-fns";
import { onValue, ref, update } from "firebase/database";
import { useEffect, useState } from "react";

export const useDailyStats = () => {
    const user = auth.currentUser;
    const today = format(new Date(), "yyyy-MM-dd");

    const [stats, setStats] = useState<{
        calories: number;
        episodes: { name: string; sets: number; reps: number }[];
    }>({
        calories: 0,
        episodes: [],
    });

    useEffect(() => {
        if (!user) return;
        const statsRef = ref(database, `users/${user.uid}/dailyActivity/${today}`);

        const unsubscribe = onValue(statsRef, (snapshot) => {
            const data = snapshot.val() || { calories: 0, episodes: [] };
            setStats(data);
        });

        return () => unsubscribe();
    }, [user, today]);

    const addCompletedEpisode = (exerciseName: string, kcalPerMinute: number, durationMs: number, sets: number, reps: number) => {
        if (!user) return;
        const statsRef = ref(database, `users/${user.uid}/dailyActivity/${today}`);

        const durationMinutes = durationMs / 1000 / 60;
        const caloriesBurned = kcalPerMinute * durationMinutes;

        const newCalories = stats.calories + caloriesBurned;

        const existingEpisodeIndex = stats.episodes.findIndex((episode) => episode.name === exerciseName);

        let updatedEpisodes = [...stats.episodes];

        if (existingEpisodeIndex === -1) {
            updatedEpisodes.push({ name: exerciseName, sets, reps });
        } else {
            updatedEpisodes[existingEpisodeIndex] = { name: exerciseName, sets, reps };
        }

        update(statsRef, {
            calories: newCalories,
            episodes: updatedEpisodes,
        });
    };

    return { stats, addCompletedEpisode };
};
