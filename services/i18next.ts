import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import i18next, { changeLanguage as i18nextChangeLanguage } from "i18next";

import { initReactI18next } from "react-i18next";

import translationEn from "@/locales/en.json";
import translationPl from "@/locales/pl.json";

export const STORAGE_KEY = "appLanguage";
export const resources = {
    en: { translation: translationEn },
    pl: { translation: translationPl },
};

export async function initI18n() {
    let lng = await AsyncStorage.getItem(STORAGE_KEY);

    if (!lng) {
        lng = Localization.getLocales()[0]?.languageCode || "pl";
    }

    return (i18next as any).use(initReactI18next).init({
        resources,
        lng,
        fallbackLng: "pl",
        interpolation: { escapeValue: false },
        compatibilityJSON: "v4",
        react: { useSuspense: false },
    });
}

export async function changeAppLanguage(newLang: "pl" | "en") {
    await i18nextChangeLanguage(newLang);
    await AsyncStorage.setItem(STORAGE_KEY, newLang);
}

export default i18next;
