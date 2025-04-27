import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";

export default function Message({ message, timestamp }: { message: string; timestamp: Date }) {
    const { t } = useTranslation();

    return (
        <View style={styles.message}>
            <View style={styles.header}>
                <Text style={styles.name}>{t("chat.you")}</Text>
                <Text style={styles.time}>{timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</Text>
            </View>
            <Text style={styles.text}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    message: {
        backgroundColor: "#f1f2f3",
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
        fontWeight: "500",
    },
    time: {
        fontSize: 10,
        fontWeight: "600",
        color: "#666",
    },
    text: {
        fontSize: 14,
        color: "#000",
    },
});
