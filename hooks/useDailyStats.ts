import { auth, database } from "@/services/firebase/config";
import { format } from "date-fns";
import { onValue, ref, update } from "firebase/database";
import { useEffect, useState } from "react";

export const useDailyStats = () => {
    const user = auth.currentUser;
    const today = format(new Date(), "yyyy-MM-dd");
    const [stats, setStats] = useState<{ calories: number; exercises: string[] }>({ calories: 0, exercises: [] });

    useEffect(() => {
        if (!user) return;
        const statsRef = ref(database, `users/${user.uid}/dailyActivity/${today}`);

        const unsubscribe = onValue(statsRef, (snapshot) => {
            const data = snapshot.val() || { calories: 0, exercises: [] };
            setStats(data);
        });

        return () => unsubscribe();
    }, [user, today]);

    const addExercise = (exerciseName: string, kcalPerMinute: number, duration: number) => {
        if (!user) return;
        const statsRef = ref(database, `users/${user.uid}/dailyActivity/${today}`);

        console.log("Adding exercise:", {
            exerciseName,
            kcalPerMinute,
            duration,
            stats,
        });

        const newCalories = kcalPerMinute * (duration / 60 / 1000) + stats.calories;
        const newExercises = Array.from(new Set([...stats.exercises, exerciseName]));

        update(statsRef, {
            calories: newCalories,
            exercises: newExercises,
        });
    };

    return { stats, addExercise };
};
