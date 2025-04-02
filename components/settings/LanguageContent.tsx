import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Search from "@/assets/svg/Search";
import { SecondRightArrow } from "@/assets/svg/Arrow";
import { CheckedIcon } from "@/assets/svg/Checked";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Language {
    code: string;
    title: string;
    nativeName: string;
}

const LanguageContent = () => {
    const { t, i18n } = useTranslation();
    const [searchValue, setSearchValue] = useState("");

    const languages: Language[] = [
        {
            code: "pl",
            title: t("language.polish"),
            nativeName: "Polski",
        },
        {
            code: "en",
            title: t("language.english"),
            nativeName: "English",
        },
    ];

    const filteredLanguages = languages.filter((language) => {
        const searchLower = searchValue.trim().toLowerCase();
        return language.title.toLowerCase().includes(searchLower) || language.nativeName.toLowerCase().includes(searchLower);
    });

    const handleChangeLanguage = async (code: string) => {
        try {
            await i18n.changeLanguage(code);
            await AsyncStorage.setItem("appLanguage", code);
        } catch (error) {
            console.error("Error changing or saving language:", error);
        }
    };
    const handleSearchChange = (text: string) => {
        setSearchValue(text);
    };

    return (
        <View className='flex flex-col mt-8 gap-5'>
            <View className='h-[4rem]'>
                <TextInput
                    onChangeText={handleSearchChange}
                    value={searchValue}
                    placeholderTextColor={"#989898"}
                    placeholder={t("language.SearchPlaceholder")}
                    className='w-full h-full bg-[#F5F5F5] rounded-2xl pl-12 px-4 font-manrope-medium text-base text-secondary-500'
                />
                <View className='absolute left-4 flex items-start justify-center h-full'>
                    <Search
                        width={22}
                        height={22}
                        opacity={0.4}
                    />
                </View>
            </View>

            <View className='flex flex-col gap-3'>
                {filteredLanguages.map((language) => {
                    const isActive = i18n.language === language.code;

                    return (
                        <TouchableOpacity
                            onPress={() => handleChangeLanguage(language.code)}
                            className='w-full bg-[#F5F5F5] p-5 rounded-[1.15rem] flex flex-row justify-between items-center'
                            key={language.code}>
                            <Text className='font-manrope-medium text-lg text-secondary-500'>{language.title}</Text>
                            {isActive ? <CheckedIcon /> : <SecondRightArrow />}
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

export default LanguageContent;
