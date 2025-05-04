import SendIcon from "@/assets/svg/Send";
import Message from "@/components/chat/Message";
import Response from "@/components/chat/Response";
import DetailsHero from "@/components/common/DetailsHero";
import { fetch } from "expo/fetch";
import React, { useState } from "react";
import { ActivityIndicator, FlatList, KeyboardAvoidingView, Platform, StatusBar, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Constants from "expo-constants";
import { useTranslation } from "react-i18next";

const API_URL = "https://api.routes.expo.app";

const generateAPIUrl = (relativePath: string) => {
    console.log("Constants", Constants.experienceUrl);

    const origin = Constants?.experienceUrl?.replace("exp://", "http://") || API_URL;

    const path = relativePath.startsWith("/") ? relativePath : `/${relativePath}`;

    if (process.env.NODE_ENV === "development") {
        return origin?.concat(path);
    }

    if (!API_URL) {
        throw new Error("API_URL environment variable is not defined");
    }

    return API_URL.concat(path);
};

interface MessageItem {
    id: string;
    type: "user" | "bot";
    text: string;
    timestamp: Date;
}

const ChatScreen = () => {
    const { t } = useTranslation();
    const flatListRef = React.useRef<FlatList>(null);

    const [inputText, setInputText] = React.useState("");
    const [isSending, setIsSending] = React.useState(false);

    const [messages, setMessages] = useState<MessageItem[]>([
        {
            id: "1",
            type: "bot",
            text: t("chat.message"),
            timestamp: new Date(),
        },
    ]);

    async function fetchAI() {
        const userMessage: MessageItem = {
            id: Date.now().toString(),
            type: "user",
            text: inputText,
            timestamp: new Date(),
        };

        // Tymczasowa wiadomość bota
        const tempBotMessage: MessageItem = {
            id: "temp",
            type: "bot",
            text: "",
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage, tempBotMessage]);

        try {
            const response = await fetch(generateAPIUrl("/api/ai"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ content: inputText }),
            });

            if (!response.ok) throw new Error("Request failed");

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let fullText = "";

            while (true) {
                const { done, value } = await reader!.read();
                if (done) break;

                const textChunk = decoder.decode(value, { stream: true });
                fullText += textChunk;

                setMessages((prev) => {
                    const newMessages = [...prev];
                    const lastMessage = newMessages[newMessages.length - 1];
                    if (lastMessage.id === "temp") {
                        lastMessage.text = fullText;
                    }
                    return newMessages;
                });
            }

            setMessages((prev) => [
                ...prev.slice(0, -1),
                {
                    id: Date.now().toString(),
                    type: "bot",
                    text: fullText,
                    timestamp: new Date(),
                },
            ]);
        } catch (error) {
            console.error(error);
            setMessages((prev) => [
                ...prev.slice(0, -1),
                {
                    id: Date.now().toString(),
                    type: "bot",
                    text: "❌ Wystąpił błąd, spróbuj ponownie później",
                    timestamp: new Date(),
                },
            ]);
        } finally {
            setIsSending(false);
            setInputText("");
        }
    }

    const handleSend = () => {
        fetchAI();
        setIsSending(true);
    };

    return (
        <SafeAreaView
            edges={["top", "left", "right", "bottom"]}
            className='flex-1 w-full bg-background'>
            <StatusBar
                barStyle='dark-content'
                animated
            />

            <View className='flex-1 flex h-full flex-col justify-between relative px-6'>
                <DetailsHero text={t("chat.title")} />

                <FlatList
                    className='mt-2'
                    ref={flatListRef}
                    data={messages}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) =>
                        item.type === "user" ? (
                            <Message
                                message={item.text}
                                timestamp={item.timestamp}
                            />
                        ) : (
                            <Response
                                text={item.text}
                                timestamp={item.timestamp}
                            />
                        )
                    }
                    contentContainerStyle={{ paddingBottom: 80 }}
                    onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                    onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
                />

                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 75 : 0}
                    className='will-change-transform transition-all duration-100'>
                    <View className='flex flex-row items-center justify-between w-full h-fit max-h-16'>
                        <TextInput
                            value={inputText}
                            onChangeText={setInputText}
                            className='flex-1 h-full placeholder:text-secondary-500 bg-white/70 rounded-full border border-secondary-200 px-4 flex items-center justify-center '
                            placeholder={t("chat.placeholder")}
                            onSubmitEditing={handleSend}
                            editable={!isSending}
                        />

                        <TouchableOpacity
                            onPress={handleSend}
                            disabled={isSending || !inputText}
                            className='h-full w-auto aspect-square bg-black rounded-full ml-2 flex justify-center items-center'>
                            {isSending ? (
                                <ActivityIndicator color='#64748b' />
                            ) : (
                                <SendIcon
                                    width={22}
                                    height={22}
                                />
                            )}
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    );
};

export default ChatScreen;
