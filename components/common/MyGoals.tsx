import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import RightArrow from "@/assets/svg/RightArrow";
import PersonLiftingWeights from "@/assets/svg/PersonLiftingWeights";
import ProgressCircle from "../common/ProgressCircle";
import colors from "@/constants/colors";

type GoalCardProps = {
    title: string;
    description: string;
    progress: number;
    type: "weight" | "water" | "steps" | "sleep";
};

const GoalCard = ({ title, description, progress, type }: GoalCardProps) => {
    return (
        <View className='flex flex-row items-center justify-between'>
            <View className='flex flex-row items-center gap-5'>
                <View className='bg-secondary-100 w-[50px] h-[50px] rounded-[13px] flex justify-center items-center'>
                    <PersonLiftingWeights
                        width={28}
                        height={28}
                    />
                </View>

                <View className='flex flex-col items-start gap-0.5'>
                    <Text className='font-manrope-medium text-[16px] text-secondary-400'>{title}</Text>
                    <Text className='font-manrope-bold text-[17px] text-secondary-500'>{description}</Text>
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

export default function MyGoals() {
    return (
        <View className='mt-8 pb-7'>
            <View className='flex flex-row justify-between items-center'>
                <Text className='font-manrope-bold text-[19px] text-secondary-500'>My Goals</Text>
                <TouchableOpacity className='flex flex-row items-center gap-2.5'>
                    <Text className='font-manrope-semibold text-[16px] text-secondary-400'>See all</Text>
                    <RightArrow
                        width={18}
                        height={19}
                    />
                </TouchableOpacity>
            </View>

            <View className='w-full px-4 py-2.5 bg-primary mt-5 rounded-[20px] gap-5'>
                <GoalCard
                    title='Weight Loss'
                    description='Lose 5kg in 2 months'
                    progress={37}
                    type='weight'
                />
                <GoalCard
                    title='Drink Water'
                    description='2L water daily'
                    progress={79}
                    type='water'
                />
                <GoalCard
                    title='Sleep 8hrs'
                    description='8hrs of sleep daily'
                    progress={60}
                    type='sleep'
                />
                <GoalCard
                    title='Make 10k steps'
                    description='10k steps daily'
                    progress={19}
                    type='steps'
                />
            </View>
        </View>
    );
}
