import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { BackArrow } from "@/assets/svg/Arrow";
import { useRouter } from "expo-router";

interface DetailsHeroProps {
    text: string;
}

const DetailsHero = ({ text }: DetailsHeroProps) => {
    const router = useRouter();

    return (
        <View className='flex flex-row items-center justify-center py-4 w-full'>
            <TouchableOpacity
                onPress={() => router.back()}
                className='flex justify-center items-center p-2 rounded-full border-2 border-secondary-200 absolute left-0'>
                <BackArrow />
            </TouchableOpacity>
            <Text className='font-manrope-bold text-[1.38rem] text-secondary-500'>{text}</Text>
        </View>
    );
};

export default DetailsHero;
