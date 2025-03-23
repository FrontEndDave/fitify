import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { RelativePathString, router } from "expo-router";
import RightArrow from "@/assets/svg/RightArrow";
import CaloriesActivity from "./CaloriesActivity";
import colors from "@/constants/colors";
import { useTranslation } from "react-i18next";

type ActivityCardProps = {
    title: string;
    description: string;
    value: number;
    type: "water" | "sleep" | "steps";
    color: string;
};

const ActicityCard = ({ title, description, value, type, color }: ActivityCardProps) => {
    const routePath: { water: "/water-tracker/water"; sleep: "/sleep-tracker/sleep"; steps: "/step-tracker/steps" } = {
        water: "/water-tracker/water",
        sleep: "/sleep-tracker/sleep",
        steps: "/step-tracker/steps",
    };

    return (
        <TouchableOpacity
            onPress={() => router.push(routePath[type] as RelativePathString)}
            className='flex flex-row items-center justify-between p-4 pt-3'>
            <View className='flex flex-row items-start gap-3'>
                <View className={`bg-[${color}] w-[9px] h-[22px] rounded-[8px]`} />
                <View>
                    <Text className='font-manrope-bold text-[19px] text-secondary-500'>{title}</Text>
                    <Text className='font-manrope-medium text-[15px] text-secondary-300'>{description}</Text>
                </View>
            </View>
            <View className='flex flex-row items-end gap-1'>
                <Text className='font-manrope-extrabold text-[24px] text-secondary-500'>{value}</Text>
                {type === "water" ? <Text className='font-manrope-medium text-[18px] text-secondary-300 pb-[2.1px]'>L</Text> : null}
                {type === "steps" ? <Text className='font-manrope-medium text-[18px] text-secondary-300 pb-[2.1px]' /> : null}
                {type === "sleep" ? <Text className='font-manrope-medium text-[18px] text-secondary-300 pb-[2.1px]'>hr</Text> : null}
            </View>
        </TouchableOpacity>
    );
};

export default function TodayActivity() {
    const { t } = useTranslation();

    return (
        <View className='mt-8'>
            <View className='flex flex-row justify-between items-center'>
                <Text className='font-manrope-bold text-[20px] text-secondary-500'>{t("today-activity.title")}</Text>
            </View>

            <View className='flex flex-row gap-4 items-center mt-5 h-[250px] w-full'>
                <CaloriesActivity />
                <View className='h-full flex-1 bg-primary rounded-[30px] flex flex-col justify-evenly'>
                    <ActicityCard
                        title='Sleep'
                        description='8hrs of sleep'
                        value={7}
                        type='sleep'
                        color={colors.success_400}
                    />
                    <ActicityCard
                        title={t("today-activity.water")}
                        description='2L water daily'
                        value={1.4}
                        type='water'
                        color={colors.information_400}
                    />
                    <ActicityCard
                        title={t("today-activity.steps")}
                        description='10K steps'
                        value={100}
                        type='steps'
                        color={colors.warning_300}
                    />
                </View>
            </View>
        </View>
    );
}
