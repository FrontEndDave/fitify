import { database } from "./config";
import { ref, push, set, onValue, remove, update, query, orderByChild, equalTo, get } from "firebase/database";
import { Exercise } from "../../types";

const exercisePaths = {
    exercises: () => "exercises/",
    exerciseById: (id: string) => `exercises/${id}`,
};

export const exerciseService = {
    async addExercise(exercise: Omit<Exercise, "id" | "createdAt">): Promise<string> {
        const newExerciseRef = push(ref(database, exercisePaths.exercises()));
        await set(newExerciseRef, {
            ...exercise,
            createdAt: Date.now(),
        });
        return newExerciseRef.key!;
    },

    subscribeToExercises(callback: (exercises: Exercise[]) => void) {
        const exercisesRef = ref(database, exercisePaths.exercises());

        const unsubscribe = onValue(exercisesRef, (snapshot) => {
            const exercisesData = snapshot.val() || {};
            const exercisesArray = Object.entries(exercisesData).map(([id, value]) => ({
                id,
                ...(value as Exercise),
            }));
            callback(exercisesArray);
        });

        return unsubscribe;
    },

    async updateExercise(id: string, updates: Partial<Exercise>) {
        const exerciseRef = ref(database, exercisePaths.exerciseById(id));
        await update(exerciseRef, updates);
    },

    async deleteExercise(id: string) {
        const exerciseRef = ref(database, exercisePaths.exerciseById(id));
        await remove(exerciseRef);
    },

    async getExerciseByName(name: string): Promise<Exercise | null> {
        try {
            const exercisesRef = ref(database, exercisePaths.exercises());
            const queryRef = query(exercisesRef, orderByChild("name"), equalTo(name));
            const snapshot = await get(queryRef);

            if (snapshot.exists()) {
                const data = snapshot.val();
                const exerciseId = Object.keys(data)[0];
                return {
                    id: exerciseId,
                    ...data[exerciseId],
                };
            }
            return null;
        } catch (error) {
            throw new Error(`Error fetching exercise: ${error}`);
        }
    },
};
