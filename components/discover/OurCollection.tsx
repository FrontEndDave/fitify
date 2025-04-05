import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SecondGradient } from "@/assets/svg/SecGradient";
import PersonLiftingWeights from "@/assets/svg/PersonLiftingWeights";
import Svg, { FeColorMatrix, Filter, Image } from "react-native-svg";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";

type ExerciseCardProps = {
    title: string;
    color: string;
    accentColor: string;
};

const ExerciseCard = ({ title, color, accentColor }: ExerciseCardProps) => {
    const { t } = useTranslation();

    return (
        <TouchableOpacity
            onPress={() =>
                router.push({
                    pathname: "/workout-details/[name]",
                    params: { name: title },
                })
            }
            style={{ backgroundColor: color }}
            className='w-full h-40 rounded-[1.8rem] flex flex-col overflow-hidden relative'>
            <View className='p-5 w-full h-full relative flex flex-col justify-between'>
                <View className='w-full'>
                    <Text className='font-manrope-bold text-2xl text-secondary-500 w-3/4'>{title}</Text>
                </View>
                <View className='absolute bottom-0 left-12 -z-10'>
                    <Svg
                        height='230px'
                        width='300px'>
                        <Filter id='myFilter'>
                            <FeColorMatrix
                                type='saturate'
                                values='0'
                            />
                        </Filter>
                        <Image
                            href={require("@/assets/images/handworkout.png")}
                            height='350px'
                            width='480px'
                            filter='url(#myFilter)'
                        />
                    </Svg>
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
                    <Text className='font-medium text-base text-secondary-500'>12 {t("workout.exercises")}</Text>
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
                    title='Chest & abdominal exercises'
                    color='#FCDBB3'
                    accentColor={"#FEF5D5"}
                />
                <ExerciseCard
                    title='Chest & abdominal exercises'
                    color='#E0D2FD'
                    accentColor={"#F2EBFE"}
                />
                <ExerciseCard
                    title='Chest & abdominal exercises'
                    color={"#DC7D85"}
                    accentColor={"#ED9C9B"}
                />
            </View>
        </View>
    );
}
