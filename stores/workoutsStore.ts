import { create } from "zustand";
import { database, auth } from "@/services/firebase/config";
import { ref, push, update, onValue } from "firebase/database";

interface Exercise {
    id?: string;
    exerciseId: string;
    status: "active" | "completed";
    startTime: number;
}

interface ActiveExercise extends Exercise {
    id: string;
    exerciseId: string;
    workoutId: string;
    startTime: number;
    endTime?: number;
    status: "active" | "completed";
}

interface WorkoutState {
    activeWorkout: ActiveExercise | null;
    workouts: Record<string, Exercise[]>;
    loading: boolean;
    error: string | null;
    unsubscribe: () => void;
    initializeWorkoutListener: () => void;
    startActiveWorkout: (workoutId: string, exerciseId: string) => Promise<void>;
    stopActiveWorkout: () => Promise<void>;
}

const useWorkoutStore = create<WorkoutState>((set, get) => ({
    activeWorkout: null,
    workouts: {},
    loading: false,
    error: null,
    unsubscribe: () => {},

    initializeWorkoutListener: () => {
        const user = auth.currentUser;
        if (!user) return;
        const workoutsRef = ref(database, `users/${user.uid}/active-workouts`);

        const unsubscribe = onValue(
            workoutsRef,
            (snapshot) => {
                if (snapshot.exists()) {
                    const workouts = snapshot.val();
                    set({ workouts });
                }
            },
            (error) => {
                set({ error: error.message });
            }
        );

        set({ unsubscribe });
    },

    startActiveWorkout: async (workoutId: string, exerciseId: string) => {
        set({ loading: true, error: null });
        try {
            const user = auth.currentUser;
            if (!user) throw new Error("User not authenticated");

            const newExerciseRef = ref(database, `users/${user.uid}/active-workouts/${workoutId}/${exerciseId}`);

            const newExercise: ActiveExercise = {
                id: exerciseId,
                exerciseId,
                workoutId,
                startTime: Date.now(),
                status: "active",
            };

            await update(newExerciseRef, newExercise);
            set({ activeWorkout: newExercise, loading: false });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : "Failed to start workout",
                loading: false,
            });
        }
    },

    stopActiveWorkout: async () => {
        set({ loading: true, error: null });
        try {
            const user = auth.currentUser;
            const activeWorkout = get().activeWorkout;
            if (!user || !activeWorkout) return;

            const updates = {
                [`users/${user.uid}/active-workouts/${activeWorkout.workoutId}/${activeWorkout.id}/status`]: "completed",
                [`users/${user.uid}//active-workouts/${activeWorkout.workoutId}/${activeWorkout.id}/endTime`]: Date.now(),
            };

            await update(ref(database), updates);
            set({ activeWorkout: null, loading: false });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : "Failed to stop workout",
                loading: false,
            });
        }
    },
}));

export default useWorkoutStore;
