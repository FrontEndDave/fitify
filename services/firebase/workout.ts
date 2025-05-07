import AsyncStorage from "@react-native-async-storage/async-storage";
import { ref, set } from "firebase/database";
import { database } from "./config";
import { getUserData } from "./user";

export const updateWorkoutProgress = async (workoutId: string, exerciseId: string) => {
    const user = await AsyncStorage.getItem("uid");

    if (!user) return;

    const progressRef = ref(database, `users/${user}/completedWorkouts/${workoutId}/${exerciseId}`);
    await set(progressRef, true);
};

export const getCurrentWorkout = async () => {
    const userData = await getUserData();
    return userData?.activeWorkout;
};

export const resetWorkoutProgress = async (workoutId: string) => {
    const user = await AsyncStorage.getItem("uid");
    if (!user) return;

    const progressRef = ref(database, `users/${user}/completedWorkouts/${workoutId}`);
    await set(progressRef, null);
};
