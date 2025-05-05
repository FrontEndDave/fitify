import PersonLiftingWeights from "@/assets/svg/PersonLiftingWeights";
import colors from "@/constants/colors";
import { useAllActiveWorkoutsArray } from "@/hooks/useActiveWorkout";
import { router } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import ProgressCircle from "./ProgressCircle";

type WorkoutCardProps = {
    title: string;
    exercise: number;
    progress: number;
};

const WorkoutCard = ({ title, exercise, progress }: WorkoutCardProps) => {
    const { t } = useTranslation();

    return (
        <View className='flex flex-row items-center justify-between bg-primary px-4 py-1 rounded-[20px] w-full'>
            <View className='flex flex-row items-center gap-5'>
                <View className='bg-secondary-100 w-[50px] h-[50px] rounded-[13px] flex justify-center items-center'>
                    <PersonLiftingWeights
                        width={28}
                        height={28}
                    />
                </View>

                <View className='flex flex-col items-start gap-0.5'>
                    <Text className='font-manrope-bold text-lg text-secondary-500'>{title}</Text>
                    <Text className='font-manrope-medium text-base text-secondary-400'>
                        {exercise} {t("workout.exercises")}
                    </Text>
                </View>
            </View>

            <View className='w-[70px] h-[70px] flex justify-center items-center'>
                <ProgressCircle
                    size={60}
                    backgroundColor={colors.secondary_100}
                    progress={progress}
                    color={colors.success_400}
                />
                <Text className='font-manrope-bold text-sm text-secondary-500 absolute'>{progress}%</Text>
            </View>
        </View>
    );
};

export default function MyWorkout() {
    const { t } = useTranslation();
    const { workouts } = useAllActiveWorkoutsArray();

    const hasActiveWorkout = workouts.some((workout) => workout.totalEpisodes > 0) && workouts.some((workout) => workout.completedEpisodes);

    return (
        <View className='mt-8 pb-7'>
            <View className='flex flex-row justify-between items-center'>
                <Text className='font-manrope-bold text-[19px] text-secondary-500'>{t("workout.title")}</Text>
            </View>

            {hasActiveWorkout ? (
                <View className='w-full mt-5 gap-3'>
                    {workouts.map((workout, index) => {
                        if (workout.totalEpisodes === 0) return null;
                        if (!workout.completedEpisodes) return null;
                        const progress = Math.round((workout.completedEpisodes.length / workout.totalEpisodes) * 100) || 0;
                        return (
                            <WorkoutCard
                                key={index}
                                title={workout.workoutName}
                                exercise={workout.totalEpisodes}
                                progress={progress}
                            />
                        );
                    })}
                </View>
            ) : (
                <View className='w-full mt-5 '>
                    <TouchableOpacity
                        onPress={() => {
                            router.push("/(tabs)/discover");
                        }}
                        activeOpacity={0.7}
                        className='flex flex-row flex-wrap items-center justify-between bg-primary p-4 rounded-[20px] w-full'>
                        <View className='flex flex-row items-center gap-5 flex-1'>
                            <View className='bg-secondary-100 w-[50px] h-[50px] rounded-[13px] flex justify-center items-center shrink-0'>
                                <PersonLiftingWeights
                                    width={28}
                                    height={28}
                                />
                            </View>
                            <View className='flex flex-col items-start gap-0.5 flex-1 min-w-0'>
                                <Text className='font-manrope-bold text-lg text-secondary-500'>Brak aktualnych ćwiczeń</Text>
                                <Text className='font-manrope-medium text-base text-secondary-400 break-words flex-shrink'>Rozpocznij trening, aby zobaczyć postępy</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}
