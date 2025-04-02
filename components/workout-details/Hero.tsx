import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SecondGradient } from "@/assets/svg/SecGradient";
import Svg, { FeColorMatrix, Filter, Image } from "react-native-svg";
import PersonLiftingWeights from "@/assets/svg/PersonLiftingWeights";
import { LeftArrow } from "@/assets/svg/Arrow";
import More from "@/assets/svg/More";
import { router } from "expo-router";

interface Props {
    exercise: {
        name: string;
        description: string;
        color: string;
        accentColor: string;
        textColor: string;
        exercises: number;
        image: string;
    };
}

export default function Hero({ exercise }: Props) {
    return (
        <View
            style={{
                backgroundColor: exercise.color,
            }}
            className='w-full bg-secondary-800 h-[230px] rounded-[1.8rem] z-0 overflow-hidden'>
            <View className='w-full p-6 h-full'>
                <View className='flex flex-row justify-between items-center'>
                    <TouchableOpacity onPress={() => router.back()}>
                        <LeftArrow />
                    </TouchableOpacity>
                    <Text className='font-manrope-extrabold text-[17px] text-primary'>Details</Text>
                    <TouchableOpacity>
                        <More />
                    </TouchableOpacity>
                </View>

                <Text className='font-manrope-bold text-5xl text-primary tracking-[-1.5px] pt-8 w-2/3'>{exercise.name}</Text>

                <View className='absolute bottom-0 right-0 z-[-1]'>
                    <Svg
                        height='260px'
                        width='230px'>
                        <Filter id='myFilter'>
                            <FeColorMatrix
                                type='saturate'
                                values='0'
                            />
                        </Filter>
                        {exercise.image && (
                            <Image
                                href={{ uri: exercise.image }}
                                height='290px'
                                width='350px'
                                filter='url(#myFilter)'
                            />
                        )}
                    </Svg>
                </View>
                <View className='flex flex-row items-center absolute bottom-[20px] gap-[8px] ml-[22px]'>
                    <View
                        style={{
                            backgroundColor: exercise.accentColor ?? "#6C7278",
                        }}
                        className='p-[5px] flex justify-center items-center rounded-[9px]'>
                        <PersonLiftingWeights
                            width={20}
                            height={20}
                        />
                    </View>
                    <Text className='font-manrope-bold text-[15.5px] text-primary'>{exercise.exercises} Exercise</Text>
                </View>
            </View>

            <View className='w-full h-[140px] absolute left-0 bottom-0 flex-1 z-[-2]'>
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
        </View>
    );
}
