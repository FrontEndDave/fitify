import AppIcon from "@/assets/svg/AppIcon";
import { useUser } from "@/hooks/useUser";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export default function Hero() {
    const { t } = useTranslation();
    const { user } = useUser();

    return (
        <View className='mt-3 w-full'>
            <View className='flex-row justify-between items-center w-full'>
                <View className='flex-row items-center gap-3'>
                    {user ? (
                        <>
                            <View className='w-[52px] h-[52px] rounded-full bg-success-500 flex justify-center items-center'>
                                <AppIcon
                                    fill='#fff'
                                    width={28}
                                    height={28}
                                    transform='rotate(-35)'
                                />
                            </View>
                            <View>
                                <Text className='font-manrope-medium text-lg text-secondary-400 leading-7'>{t("welcome-back")}</Text>
                                <Text className='font-manrope-bold text-2xl text-secondary-500 leading-7'>{user.displayName || "User"}!</Text>
                            </View>
                        </>
                    ) : (
                        <>
                            <View className='w-[52px] h-[52px] rounded-full bg-secondary-200 animate-pulse'></View>
                            <View>
                                <View className='w-[100px] h-[20px] bg-secondary-200 animate-pulse mb-2 rounded-md'></View>
                                <View className='w-[150px] h-[20px] bg-secondary-200 animate-pulse mb-2 rounded-md'></View>
                            </View>
                        </>
                    )}
                </View>
            </View>

            <View className='mt-4'>
                <Text className='font-manrope-extrabold text-4xl text-secondary-500'>{t("hero-title")}</Text>
            </View>
        </View>
    );
}
