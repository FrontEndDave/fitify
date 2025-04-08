import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { useWorkouts } from "@/hooks/useWorkouts";

export default function WorkoutButton({ name, exerciseId, exercise }: { name: string; exerciseId: string; exercise: any }) {
    const { t } = useTranslation();
    const { activeWorkout, startActiveWorkout, stopActiveWorkout } = useWorkouts();

    const handlePress = async () => {
        if (activeWorkout) {
            await stopActiveWorkout();
        } else {
            await startActiveWorkout(exercise.name, exerciseId);
        }
    };

    return (
        <View className='px-6'>
            <TouchableOpacity
                onPress={() => {
                    handlePress();
                    router.push({
                        pathname: "/workout/[name]",
                        params: { name: name },
                    });
                }}
                className='rounded-full bg-success-400 w-full py-4 px-6 fixed bottom-0 z-50'>
                <Text className='font-bold text-xl text-primary text-center leading-8'>{t("workout-details.start")}</Text>
            </TouchableOpacity>
        </View>
    );
}
