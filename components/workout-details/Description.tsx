import React, { useState } from "react";
import { Text, View } from "react-native";

export default function Description({ content }: { content: string }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleText = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <View className='mt-5'>
            <View className='flex flex-col gap-2.5'>
                <Text className='font-manrope-regular text-xl text-secondary-400'>Description</Text>

                <View className='flex flex-row flex-wrap items-center justify-start'>
                    <Text
                        numberOfLines={isExpanded ? undefined : 3}
                        className='font-manrope-medium text-xl text-secondary-500 leading-7'>
                        {content}
                    </Text>
                    <Text
                        onPress={toggleText}
                        className='text-information-500 font-manrope-bold text-lg'>
                        {isExpanded ? " See Less" : " See More"}
                    </Text>
                </View>
            </View>
        </View>
    );
}
