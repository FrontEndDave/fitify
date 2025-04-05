import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import RightArrow from "@/assets/svg/RightArrow";
import PersonLiftingWeights from "@/assets/svg/PersonLiftingWeights";
import ProgressCircle from "./ProgressCircle";
import colors from "@/constants/colors";
import { useTranslation } from "react-i18next";

type GoalCardProps = {
    title: string;
    exercise: number;
    progress: number;
};

const WorkoutCard = ({ title, exercise, progress }: GoalCardProps) => {
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
                <Text className='font-manrope-bold text-[16px] text-secondary-500 absolute'>{progress}%</Text>
            </View>
        </View>
    );
};

export default function MyWorkout() {
    const { t } = useTranslation();

    return (
        <View className='mt-8 pb-7'>
            <View className='flex flex-row justify-between items-center'>
                <Text className='font-manrope-bold text-[19px] text-secondary-500'>{t("workout.title")}</Text>
            </View>

            <View className='w-full mt-5 gap-3'>
                <WorkoutCard
                    title='Hand grip muscle'
                    exercise={15}
                    progress={37}
                />
                <WorkoutCard
                    title='Arm & shoulder muscle'
                    exercise={15}
                    progress={79}
                />
                <WorkoutCard
                    title='Chest muscle'
                    exercise={15}
                    progress={60}
                />
            </View>
        </View>
    );
}
