import { FIREBASE_DATABASE } from "./config";
import { ref, onValue, query, orderByChild, equalTo, get } from "firebase/database";
import { Exercise } from "../../types";

const exercisePaths = {
    exercises: () => "exercises/",
    exerciseById: (id: string) => `exercises/${id}`,
};

export const exerciseService = {
    subscribeToExercises(callback: (exercises: Exercise[]) => void) {
        const exercisesRef = ref(FIREBASE_DATABASE, exercisePaths.exercises());

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

    async getExerciseByName(name: string): Promise<Exercise | null> {
        try {
            const exercisesRef = ref(FIREBASE_DATABASE, exercisePaths.exercises());
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
