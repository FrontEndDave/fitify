import RightArrow from "@/assets/svg/RightArrow";
import Message from "@/components/chat/Message";
import Response from "@/components/chat/Response";
import DetailsHero from "@/components/common/DetailsHero";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StatusBar, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetch } from "expo/fetch";

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
            edges={["top"]}
            className='flex-1 w-full bg-background'>
            <StatusBar
                barStyle='dark-content'
                animated
            />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 85 : 0}
                className='flex-1'>
                <View className='flex-1 px-6'>
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

                    <View className='flex-row items-center gap-2 mb-4'>
                        <TextInput
                            value={inputText}
                            onChangeText={setInputText}
                            className='flex-1 p-4 bg-slate-200 rounded-2xl'
                            placeholder='Ask anything...'
                            onSubmitEditing={handleSend}
                            editable={!isSending}
                            multiline
                            blurOnSubmit={false}
                        />

                        <TouchableOpacity
                            onPress={handleSend}
                            disabled={isSending}
                            className='p-2'>
                            {isSending ? <ActivityIndicator color='#64748b' /> : <RightArrow />}
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default ChatScreen;
