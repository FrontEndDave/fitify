import React from "react";
import { useTranslation } from "react-i18next";
import { Platform, Text, View } from "react-native";
import Markdown from "react-native-markdown-display";

export default function Response({ text, timestamp }) {
    const { t } = useTranslation();
    const isIOS = Platform.OS === "ios";

    return (
        <View className='p-4 rounded-2xl mb-2 bg-[#fafafa]'>
            <View className='flex-row justify-between mb-2'>
                <Text className='font-manrope-semibold text-secondary-600'>{t("chat.title")}</Text>
                <Text className='text-[11px] font-manrope-bold text-[#666]'>
                    {timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </Text>
            </View>

            <Markdown
                rules={{
                    paragraph: (node, children) => (
                        <Text
                            key={node.key}
                            selectable={isIOS}
                            selectionColor='#ff0'
                            className='font-manrope-medium text-secondary-600 mb-2'>
                            {children}
                        </Text>
                    ),
                    heading1: (node, children) => (
                        <Text
                            key={node.key}
                            selectable={isIOS}
                            selectionColor='orange'
                            className='font-manrope-bold text-lg text-secondary-700 mb-2'>
                            {children}
                        </Text>
                    ),
                    list_item: (node, children, parent, styles) => (
                        <View
                            key={node.key}
                            className='flex-row mb-1'>
                            <Text className='mr-2'>•</Text>
                            <Text
                                selectable={isIOS}
                                selectionColor='orange'
                                className='flex-1 font-manrope-medium text-secondary-600'>
                                {children}
                            </Text>
                        </View>
                    ),
                }}>
                {text}
            </Markdown>
        </View>
    );
}
