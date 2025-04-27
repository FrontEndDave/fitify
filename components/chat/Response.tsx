import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import Markdown from "react-native-markdown-display";

export default function Response({ text, timestamp }: { text: string; timestamp: Date }) {
    const { t } = useTranslation();

    return (
        <View style={styles.response}>
            <View style={styles.header}>
                <Text style={styles.name}>{t("chat.title")}</Text>
                <Text style={styles.time}>{timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</Text>
            </View>
            <Markdown>{text}</Markdown>
        </View>
    );
}

const styles = StyleSheet.create({
    response: {
        backgroundColor: "#fafafa",
        marginBottom: 8,
        padding: 16,
        borderRadius: 16,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    name: {
        fontWeight: "600",
    },
    time: {
        fontSize: 10,
        fontWeight: "600",
        color: "#666",
    },
});
