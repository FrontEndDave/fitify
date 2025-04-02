import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

export default function WorkoutButton({ name }: { name: string }) {
    return (
        <View className='px-6'>
            <TouchableOpacity
                onPress={() =>
                    router.push({
                        pathname: "/workout/[name]",
                        params: { name: name },
                    })
                }
                className='rounded-full bg-success-400 w-full py-4 px-6 fixed bottom-0 z-50'>
                <Text className='font-bold text-xl text-primary text-center leading-8'>Continue Workout</Text>
            </TouchableOpacity>
        </View>
    );
}
