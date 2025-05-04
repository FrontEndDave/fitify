import AsyncStorage from "@react-native-async-storage/async-storage";

export const getCurrentLanguage = async () => {
    const lang = await AsyncStorage.getItem("appLanguage");

    if (lang) {
        return lang;
    }
};
