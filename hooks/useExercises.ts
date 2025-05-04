import { useEffect, useState } from "react";
import { exerciseService } from "../services/firebase/exercises";
import { Exercise } from "../types";

export const useExercises = () => {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe: () => void = exerciseService.subscribeToExercises((fetchedExercises: Exercise[]) => {
            setExercises(fetchedExercises);
            setLoading(false);
            setError(null);
        });

        return () => unsubscribe();
    }, []);

    return { exercises, loading, error };
};
