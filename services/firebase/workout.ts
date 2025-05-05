import { ref, set } from "firebase/database";
import { auth, database } from "./config";
import { getUserData } from "./user";

export const updateWorkoutProgress = async (workoutId: string, exerciseId: string) => {
    const user = auth.currentUser;
    if (!user) return;

    const progressRef = ref(database, `users/${user.uid}/completedWorkouts/${workoutId}/${exerciseId}`);
    await set(progressRef, true);
};

export const getCurrentWorkout = async () => {
    const userData = await getUserData();
    return userData?.activeWorkout;
};

export const resetWorkoutProgress = async (workoutId: string) => {
    const user = auth.currentUser;
    if (!user) return;

    const progressRef = ref(database, `users/${user.uid}/completedWorkouts/${workoutId}`);
    await set(progressRef, null);
};
