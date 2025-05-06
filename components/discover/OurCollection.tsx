import PersonLiftingWeights from "@/assets/svg/PersonLiftingWeights";
import { SecondGradient } from "@/assets/svg/SecGradient";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";

type ExerciseCardProps = {
    title: string;
    description: string;
    color: string;
    accentColor: string;
    exercises: number;
};

const ExerciseCard = ({ title, color, accentColor, exercises, description }: ExerciseCardProps) => {
    const { t } = useTranslation();

    return (
        <TouchableOpacity
            style={{ backgroundColor: color }}
            className='w-full h-40 rounded-[1.8rem] flex flex-col overflow-hidden relative'>
            <View className='p-5 w-full h-full relative flex flex-col justify-between'>
                <View className='w-full'>
                    <Text className='font-manrope-bold text-2xl text-secondary-500 w-3/4'>{title}</Text>
                    <Text className='font-manrope-medium text-[15px] text-secondary-500 w-full mt-1'>{description}</Text>
                </View>
                <View className='flex flex-row items-center h-fit gap-2'>
                    <View
                        style={{ backgroundColor: accentColor }}
                        className='p-1.5 flex justify-center items-center rounded-md'>
                        <PersonLiftingWeights
                            width={20}
                            height={20}
                        />
                    </View>
                    <Text className='font-medium text-base text-secondary-500'>
                        {exercises} {t("workout.exercises")}
                    </Text>
                </View>
            </View>

            <View className='w-full h-[145px] absolute -bottom-5 flex-1 -z-20'>
                <SecondGradient />
            </View>
        </TouchableOpacity>
    );
};

export default function OurCollection() {
    const { t } = useTranslation();

    return (
        <View className='mt-10 w-full px-6'>
            <View className='flex flex-row justify-between items-center'>
                <Text className='font-manrope-bold text-[21px] text-secondary-500'>{t("discover.collection")}</Text>
            </View>

            <View className='flex flex-col gap-4 mt-3 pb-10'>
                <ExerciseCard
                    title={t("collection.full-body-title")}
                    description={t("collection.full-body-description")}
                    color='#FCDBB3'
                    accentColor='#FEF5D5'
                    exercises={12}
                />
                <ExerciseCard
                    title={t("collection.core-abs-title")}
                    description={t("collection.core-abs-description")}
                    color='#E0D2FD'
                    accentColor='#F2EBFE'
                    exercises={9}
                />
                <ExerciseCard
                    title={t("collection.lower-body-title")}
                    description={t("collection.lower-body-description")}
                    color='#C5CED6'
                    accentColor='#E2E7EC'
                    exercises={10}
                />
                <ExerciseCard
                    title={t("collection.upper-body-title")}
                    description={t("collection.upper-body-description")}
                    color='#A5E4DC'
                    accentColor='#D3F6EF'
                    exercises={8}
                />
                <ExerciseCard
                    title={t("collection.hiit-title")}
                    description={t("collection.hiit-description")}
                    color='#FFD6D3'
                    accentColor='#FFEDEB'
                    exercises={6}
                />
            </View>
        </View>
    );
}
