import { useUser } from "@/hooks/useUser";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export default function Hero() {
    const { t } = useTranslation();
    const { user, loading } = useUser();

    const parseFormattedText = (text: string) => {
        const parts = text.split(/(<gray>|<\/gray>)/g);

        return parts.map((part, index) => {
            if (part === "<gray>" || part === "</gray>") {
                return null;
            }
            const isGray = parts[index - 1] === "<gray>";

            return (
                <Text
                    key={index}
                    style={{
                        color: isGray ? "#6C7278" : "#000000",
                        fontWeight: "bold",
                        lineHeight: 50,
                        fontSize: 38,
                    }}>
                    {part}
                </Text>
            );
        });
    };

    if (loading || !user.displayName) return null;

    const rawText = t("chat.subtitle", { user: user.displayName.split(" ")[0] });

    return (
        <View className='flex felx-row items-start justify-between mt-4 pb-7 px-6'>
            <Text className='font-manrope-bold text-2xl text-secondary-500'>{t("chat.title")}</Text>
            <Text className='font-manrope-bold text-4xl text-secondary-500 mt-10 pr-20'>{parseFormattedText(rawText)}</Text>
        </View>
    );
}
