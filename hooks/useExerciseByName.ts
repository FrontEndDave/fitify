import { useEffect, useState } from "react";
import { Exercise } from "../types";
import { exerciseService } from "../services/firebase/exercises";

export const useExerciseByName = (name: string) => {
    const [exercise, setExercise] = useState<Exercise | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchExercise = async () => {
            try {
                const result = await exerciseService.getExerciseByName(name);
                setExercise(result);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : String(err));
            } finally {
                setLoading(false);
            }
        };

        fetchExercise();
    }, [name]);

    return { exercise, loading, error };
};
