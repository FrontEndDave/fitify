import { View, Text } from "react-native";
import React from "react";
import { Gradient } from "@/assets/svg/Gradient";
import { GymIcon } from "@/assets/svg/Gym";
import { useTranslation } from "react-i18next";

export default function CaloriesActivity() {
    const { t } = useTranslation();

    return (
        <View className='h-full w-[110px] bg-success-500 rounded-[30px] flex flex-col justify-start items-center p-4 gap-3 relative overflow-hidden'>
            <View className='bg-success-600 w-[80px] h-[80px] rounded-[15px] flex justify-center items-center'>
                <GymIcon
                    width={42}
                    height={42}
                />
            </View>

            <View className='flex justify-center items-center flex-col'>
                <Text className='font-manrope-bold text-[26px] text-primary'>{`1.350`}</Text>
                <Text className='font-manrope-medium text-[17px] text-primary opacity-70'>{t("today-activity.calories")}</Text>
            </View>

            <View className='absolute top-0 left-0 right-0 bottom-[-110px]'>
                <Gradient style={{ width: "100%", height: "100%" }} />
            </View>
        </View>
    );
}
