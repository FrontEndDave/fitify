import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useTimeSpentTracker from "@/hooks/useTimeSpentTracker";
import formatTime from "@/utils/formatTime";
import i18n from "@/services/i18next";
import { useUser } from "@/hooks/useUser";

const Hero = () => {
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();
    const language = i18n.language;

    const { user, loading } = useUser();

    return (
        <View
            className='bg-white flex flex-col gap-10 rounded-b-[2.25rem]'
            style={{
                paddingTop: insets.top + 18,
                paddingBottom: 20,
            }}>
            <View className='flex flex-row items-center justify-between w-full px-6'>
                <Text className='font-manrope-bold text-[1.4rem] text-secondary-500 leading-7'>{t("settings.title")}</Text>
                {user && (
                    <TouchableOpacity>
                        <Text className='font-manrope-bold text-[1.3rem] text-error-500 leading-7'>{t("settings.delete-account")}</Text>
                    </TouchableOpacity>
                )}
            </View>

            {user ? (
                <View className='flex justify-center items-center'>
                    <Text className='font-manrope-bold text-4xl text-secondary-500'>Dawid Piela</Text>
                    <Text className='font-manrope-medium text-lg text-secondary-400'>
                        {t("settings.join")} {new Date(user.createdAt).toLocaleDateString(language, { year: "numeric", month: "long", day: "numeric" })}
                    </Text>
                </View>
            ) : (
                <View className='flex justify-center items-center flex-col gap-2'>
                    <View className=' bg-secondary-100 p-6 w-3/6 animate-pulse rounded-lg'></View>
                    <View className=' bg-secondary-100 p-6 w-2/6 animate-pulse rounded-lg'></View>
                </View>
            )}

            {user && !loading ? (
                <View className='flex flex-row items-center justify-between w-full px-5 gap-5 h-24'>
                    <View className='bg-[#F5F5F5] p-4 rounded-2xl flex-1'>
                        <View className='flex flex-row items-start gap-3'>
                            <View className='bg-success-500 rounded-sm h-5 w-[0.35rem] mt-1' />
                            <View className='flex flex-col'>
                                <Text className='font-manrope-bold text-2xl text-secondary-500'>{formatTime(user?.totalMinutes ?? 0)}</Text>
                                <Text className='font-manrope-medium text-lg text-secondary-400'>{t("settings.time")}</Text>
                            </View>
                        </View>
                    </View>

                    <View className='bg-[#F5F5F5] p-4 rounded-2xl flex-1'>
                        <View className='flex flex-row items-start gap-3'>
                            <View className='bg-primary-500 rounded-sm h-5 w-[0.35rem] mt-1' />
                            <View className='flex flex-col'>
                                <Text className='font-manrope-bold text-2xl text-secondary-500'>10</Text>
                                <Text className='font-manrope-medium text-lg text-secondary-400'>{t("settings.total-workouts")}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            ) : (
                <View className='w-full px-5 flex flex-1 flex-row justify-center items-center'>
                    <View className='w-full flex flex-row gap-5'>
                        <View className='flex-1 h-24 w-full bg-secondary-200 animate-pulse rounded-lg'></View>
                        <View className='flex-1 h-24 w-full bg-secondary-200 animate-pulse rounded-lg'></View>
                    </View>
                </View>
            )}
        </View>
    );
};

export default Hero;
