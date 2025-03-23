import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { SecondRightArrow } from "@/assets/svg/Arrow";
import { RelativePathString, useRouter } from "expo-router";

const Settings = () => {
    const { t } = useTranslation();
    const router = useRouter();

    const settingsList = [
        {
            id: 1,
            type: "profile",
            name: t("profile.title"),
            icon: "person-outline",
            path: "(settings)/name",
        },
        {
            id: 2,
            type: "goal",
            name: t("goal.title"),
            icon: "flag-outline",
            path: "(settings)/goal",
        },
        {
            id: 3,
            type: "language",
            name: t("language.title"),
            icon: "language-outline",
            path: "(settings)/language",
        },
        {
            id: 4,
            type: "info",
            name: t("info.title"),
            icon: "information-circle-outline",
            path: "(settings)/info",
        },
    ];

    return (
        <View className='w-full flex justify-start items-center gap-3 px-6 py-5 h-full'>
            {settingsList.map((setting) => (
                <TouchableOpacity
                    className='w-full bg-white p-6 rounded-[1.25rem] flex flex-row justify-between items-center'
                    key={setting.id}
                    onPress={() => router.push(setting.path as RelativePathString)}>
                    <Text className='font-manrope-medium text-lg text-secondary-500'>{setting.name}</Text>
                    <SecondRightArrow />
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default Settings;
