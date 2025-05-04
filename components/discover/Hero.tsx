import React from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export default function Hero() {
    const { t } = useTranslation();

    return (
        <View className='flex felx-row items-start justify-between mt-4 pb-7 px-6'>
            <Text className='font-manrope-bold text-3xl text-secondary-500'>{t("discover.title")}</Text>
        </View>
    );
}
