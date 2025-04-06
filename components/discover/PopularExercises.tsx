import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { Suspense } from "react";
import RightArrow from "@/assets/svg/RightArrow";
import { SecondGradient } from "@/assets/svg/SecGradient";
import Svg, { FeColorMatrix, Filter, Image } from "react-native-svg";
import PersonLiftingWeights from "@/assets/svg/PersonLiftingWeights";
import { router } from "expo-router";
import { useExercises } from "@/hooks/useExercises";
import { useTranslation } from "react-i18next";

const SkeletonLoading = () => {
    return (
        <View className='flex-1 flex flex-row justify-start items-start mt-5 gap-[16px]'>
            <View className='w-[260px] h-[200px] rounded-[30px] bg-secondary-200 animate-pulse' />
            <View className='w-[260px] h-[200px] rounded-[30px] bg-secondary-200 animate-pulse' />
            <View className='w-[260px] h-[200px] rounded-[30px] bg-secondary-200 animate-pulse' />
            <View className='w-[260px] h-[200px] rounded-[30px] bg-secondary-200 animate-pulse' />
        </View>
    );
};

export default function PopularExercises() {
    const { t } = useTranslation();
    const { exercises, loading, error } = useExercises();

    return (
        <View>
            <View className='flex flex-row justify-between items-center px-6'>
                <Text className='font-manrope-bold text-[21px] text-secondary-500'>{t("discover.popular")}</Text>
                <TouchableOpacity
                    onPress={() =>
                        router.push({
                            pathname: "/exercises",
                        })
                    }
                    className='flex flex-row items-center gap-2'>
                    <Text className='font-manrope-semibold text-lg text-secondary-400'>{t("see-more")}</Text>
                    <RightArrow
                        width={18}
                        height={19}
                    />
                </TouchableOpacity>
            </View>

            {loading && (
                <View className='flex-1 flex-row justify-start items-start pl-6 gap-[16px]'>
                    <SkeletonLoading />
                </View>
            )}

            <Suspense fallback={<SkeletonLoading />}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: 16,
                    }}
                    className='mt-5 w-full'>
                    {exercises.map((item, index) => (
                        <TouchableOpacity
                            onPress={() =>
                                router.push({
                                    pathname: "/workout-details/[name]",
                                    params: { name: item.name },
                                })
                            }
                            key={index}
                            style={{
                                marginRight: index === 4 ? 0 : 16,
                                backgroundColor: item.color ?? "#080B11",
                            }}
                            className='w-[260px] h-[200px] rounded-[30px] flex flex-col overflow-hidden relative'>
                            <View className='p-6 w-full h-full relative flex flex-col justify-between'>
                                <Text
                                    style={{
                                        color: item.textColor === "white" ? "#FFFFFF" : "#0D1015",
                                    }}
                                    className={`font-manrope-bold text-[32px] pr-10`}>
                                    {item.name}
                                </Text>

                                <View className='absolute bottom-0 left-[60px] -z-10'>
                                    <Svg
                                        height='260px'
                                        width='200px'>
                                        <Filter id='myFilter'>
                                            <FeColorMatrix
                                                type='saturate'
                                                values='0'
                                            />
                                        </Filter>
                                        {item.image && (
                                            <Image
                                                href={{ uri: item.image }}
                                                height='320px'
                                                width='320px'
                                                filter='url(#myFilter)'
                                            />
                                        )}
                                    </Svg>
                                </View>
                                <View className='flex flex-row items-center gap-2'>
                                    <View
                                        style={{ backgroundColor: item.accentColor ?? "#6C7278" }}
                                        className='p-1.5 flex justify-center items-center rounded-[9px]'>
                                        <PersonLiftingWeights
                                            width={20}
                                            height={20}
                                        />
                                    </View>
                                    <Text
                                        style={{
                                            color: item.textColor === "white" ? "#FFFFFF" : "#0D1015",
                                        }}
                                        className={`font-manrope-medium text-[15.5px] `}>
                                        {item.exercises} {t("workout.exercises")}
                                    </Text>
                                </View>
                            </View>

                            <View className='w-full h-[120px] absolute left-0 bottom-0 flex -z-20'>
                                <SecondGradient
                                    style={{
                                        position: "absolute",
                                        bottom: 0,
                                        left: 0,
                                        minWidth: "100%",
                                        height: 20,
                                    }}
                                />
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </Suspense>
        </View>
    );
}
