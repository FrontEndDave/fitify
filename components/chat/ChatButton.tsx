import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";

export default function ChatButton({ name }: { name?: string }) {
    const { t } = useTranslation();

    return (
        <View className='px-8 w-full'>
            <TouchableOpacity
                onPress={() => {
                    router.push({
                        pathname: "/chat",
                        params: { name: name ? name : "" },
                    });
                }}
                className='rounded-full bg-black w-full py-4 px-6 z-50'>
                <Text className='font-semibold text-xl text-primary text-center leading-8'>{t("chat.button")}</Text>
            </TouchableOpacity>
        </View>
    );
}
