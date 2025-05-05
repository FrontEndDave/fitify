import { auth, database } from "@/services/firebase/config";
import { onValue, ref, set, update } from "firebase/database";
import { useEffect, useState } from "react";

type ActiveWorkoutData = {
    startedAt: number;
    completedEpisodes: string[];
    totalEpisodes: number;
};

export const useActiveWorkout = (workoutName: string) => {
    const [activeWorkout, setActiveWorkout] = useState<ActiveWorkoutData | null>(null);
    const user = auth.currentUser;

    useEffect(() => {
        if (!user) return;

        const workoutRef = ref(database, `users/${user.uid}/activeWorkout/${workoutName}`);
        const unsubscribe = onValue(workoutRef, (snapshot) => {
            const data = snapshot.val();
            setActiveWorkout(data);
        });

        return () => unsubscribe();
    }, [user, workoutName]);

    const startWorkout = (episodes: string[]) => {
        if (!user) return;
        const workoutRef = ref(database, `users/${user.uid}/activeWorkout/${workoutName}`);
        set(workoutRef, {
            startedAt: Date.now(),
            completedEpisodes: [],
            totalEpisodes: episodes.length,
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
