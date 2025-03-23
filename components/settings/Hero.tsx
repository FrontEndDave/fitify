import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Hero = () => {
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();

    return (
        <View
            className='bg-white flex flex-col gap-10 rounded-b-[2.25rem]'
            style={{
                paddingTop: insets.top + 18,
                paddingBottom: 20,
            }}>
            <View className='flex flex-row items-center justify-between w-full px-6'>
                <Text className='font-manrope-bold text-[1.4rem] text-secondary-500 leading-7'>{t("settings.title")}</Text>
                <TouchableOpacity>
                    <Text className='font-manrope-bold text-[1.3rem] text-error-500 leading-7'>{t("settings.logout")}</Text>
                </TouchableOpacity>
            </View>

            <View className='flex justify-center items-center'>
                <Text className='font-manrope-bold text-4xl text-secondary-500'>Dawid Piela</Text>
                <Text className='font-manrope-medium text-lg text-secondary-400'>Join since {new Date().getFullYear()}</Text>
            </View>

            <View className='flex flex-row items-center justify-between w-full px-5 gap-5'>
                <View className='bg-[#F5F5F5] p-4 rounded-2xl flex-1'>
                    <View className='flex flex-row items-start gap-3'>
                        <View className='bg-success-500 rounded-sm h-5 w-[0.35rem]  mt-1' />
                        <View className='flex flex-col'>
                            <Text className='font-manrope-bold text-2xl text-secondary-500'>10 h 52 m</Text>
                            <Text className='font-manrope-medium text-lg text-secondary-400'>Time Spending</Text>
                        </View>
                    </View>
                </View>

                <View className='bg-[#F5F5F5] p-4 rounded-2xl flex-1'>
                    <View className='flex flex-row items-start gap-3'>
                        <View className='bg-primary-500 rounded-sm h-5 w-[0.35rem] mt-1' />
                        <View className='flex flex-col'>
                            <Text className='font-manrope-bold text-2xl text-secondary-500'>10 h 52 m</Text>
                            <Text className='font-manrope-medium text-lg text-secondary-400'>Time Spending</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default Hero;
