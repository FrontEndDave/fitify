import { Exercise } from "@/types";
import { router } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";

export default function WorkoutButton({ name, exerciseId, exercise }: { name: string; exerciseId: string; exercise: Exercise }) {
    const { t } = useTranslation();

    return (
        <View className='px-6'>
            <TouchableOpacity
                onPress={() =>
                    router.push({
                        pathname: "/workout/[name]",
                        params: {
                            name: exercise.episodes[0].name,
                            video: exercise.episodes[0].video,
                            reps: exercise.episodes[0].reps ?? 6,
                            sets: exercise.episodes[0].sets ?? 2,
                            episodes: JSON.stringify(exercise.episodes),
                            duration: 1000 * 60 * (exercise.episodes[0].duration ?? 2),
                        },
                    })
                }
                className='rounded-full bg-success-400 w-full py-4 px-6 fixed bottom-0 z-50'>
                <Text className='font-bold text-xl text-primary text-center leading-8'>{t("workout-details.start")}</Text>
            </TouchableOpacity>
        </View>
    );
}
