import React from "react";
import NotificationIcon from "@/assets/svg/Notification";
import { Image, Text, View } from "react-native";
import { useTranslation } from "react-i18next";

export default function Hero() {
    const { t } = useTranslation();

    return (
        <View className='mt-3 w-full pb-35'>
            <View className='flex-row justify-between items-center w-full'>
                <View className='flex-row items-center gap-3'>
                    <Image
                        source={{ uri: "https://t3.ftcdn.net/jpg/06/78/09/78/240_F_678097871_G7OpoHQmiZTj4bHB7YW2HoH1syWfCbB9.jpg" }}
                        className='w-[52px] h-[52px] rounded-full'
                    />
                    <View>
                        <Text className='font-manrope-medium text-lg text-secondary-400 leading-7'>{t("welcome-back")}</Text>
                        <Text className='font-manrope-bold text-2xl text-secondary-500 leading-7'>Dawid Piela!</Text>
                    </View>
                </View>

                {/* <Notifications /> */}
            </View>

            <View className='mt-4'>
                <Text className='font-manrope-extrabold text-4xl text-secondary-500'>{t("hero-title")}</Text>
            </View>
        </View>
    );
}
