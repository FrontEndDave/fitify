import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import PersonLiftingWeights from "@/assets/svg/PersonLiftingWeights";
import { SecondGradient } from "@/assets/svg/SecGradient";
import Svg, { FeColorMatrix, Filter, Image } from "react-native-svg";
import { router } from "expo-router";
import { useExercises } from "@/hooks/useExercises";
import { useTranslation } from "react-i18next";

const ScreenHeight = Dimensions.get("window").height;

const List = () => {
    const { exercises } = useExercises();
    const { t } = useTranslation();

    return (
        <View className='flex flex-col gap-4 pt-4 pb-6'>
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
                        backgroundColor: item.color,
                    }}
                    className='w-full h-[170px] bg-secondary-800 rounded-[30px] flex flex-col overflow-hidden relative'>
                    <View className='w-full h-full relative flex flex-col justify-between'>
                        <Text className='font-manrope-bold text-[32px] text-primary pr-10 p-6'>{item.name}</Text>

                        <View className='absolute bottom-0 left-[15rem] w-full -z-10'>
                            <Svg
                                height='270px'
                                width='300px'>
                                <Filter id='myFilter'>
                                    <FeColorMatrix
                                        type='saturate'
                                        values='0'
                                    />
                                </Filter>
                                <Image
                                    href={{ uri: item.image }}
                                    height='350px'
                                    width='280px'
                                    filter='url(#myFilter)'
                                />
                            </Svg>
                        </View>
                        <View className='flex flex-row items-center gap-2 p-6'>
                            <View
                                style={{
                                    backgroundColor: item.accentColor ?? "#6C7278",
                                }}
                                className='bg-secondary-400 p-1.5 flex justify-center items-center rounded-[9px]'>
                                <PersonLiftingWeights
                                    width={20}
                                    height={20}
                                />
                            </View>
                            <Text className='font-manrope-medium text-[15.5px] text-primary'>
                                {item.exercises} {t("workout.exercises")}
                            </Text>
                        </View>
                    </View>

                    <View
                        style={{
                            height: ScreenHeight * 0.18,
                        }}
                        className='w-full absolute left-0 bottom-0 flex -z-20'>
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
        </View>
    );
};

export default List;
