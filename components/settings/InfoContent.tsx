import { View, Text } from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import Constants from "expo-constants";

const InfoContent = () => {
    const { t } = useTranslation();

    const appVersion = Constants.expoConfig?.version || "1.0.0";

    return (
        <View className='flex flex-col mt-8 gap-5'>
            <View>
                <Text className='font-manrope-bold text-2xl text-secondary-500'>{t("info.authors")}</Text>
                <Text className='font-manrope-medium text-xl text-secondary-400'>Dawid Piela, Maciej Wardach</Text>
            </View>
            <View>
                <Text className='font-manrope-bold text-2xl text-secondary-500'>{t("info.technology")}</Text>
                <Text className='font-manrope-medium text-xl text-secondary-400'>{t("info.technology-content")}</Text>
            </View>
            <View>
                <Text className='font-manrope-bold text-2xl text-secondary-500'>{t("info.version")}</Text>
                <Text className='font-manrope-medium text-xl text-secondary-400'>{appVersion}</Text>
            </View>
            <View>
                <Text className='font-manrope-bold text-2xl text-secondary-500'>{t("info.description")}</Text>
                <Text className='font-manrope-medium text-xl text-secondary-400'>{t("info.description-content")}</Text>
            </View>
        </View>
    );
};

export default InfoContent;
