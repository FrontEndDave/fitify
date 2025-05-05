import { LeftArrow } from "@/assets/svg/Arrow";
import More from "@/assets/svg/More";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type HeroProps = {
    title: string;
};

export default function Hero({ title }: HeroProps) {
    return (
        <View className='mt-5 px-6 relative'>
            <View className='flex flex-row justify-between items-center'>
                <TouchableOpacity onPress={() => router.replace("/(tabs)/discover")}>
                    <LeftArrow />
                </TouchableOpacity>
                <Text className='font-manrope-extrabold text-xl text-primary'>{title}</Text>
                <TouchableOpacity>
                    <More />
                </TouchableOpacity>
            </View>
        </View>
    );
}
