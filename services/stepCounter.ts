import { Pedometer } from "expo-sensors";

export const getTodayStepCount = async (): Promise<number> => {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000 - 1);

    try {
        const result = await Pedometer.getStepCountAsync(startOfDay, endOfDay);
        return result.steps;
    } catch (error) {
        console.error("Failed to fetch step count:", error);
        throw new Error("Unable to fetch step count. Ensure permissions are granted.");
    }
};
