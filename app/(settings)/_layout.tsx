import { Stack } from "expo-router";
import { SafeAreaView, StatusBar } from "react-native";

export default function SettingsLayout() {
    return (
        <SafeAreaView className='flex-1 bg-[#fff]'>
            <StatusBar
                barStyle='dark-content'
                animated
            />

            <Stack
                screenOptions={{
                    headerShown: false,
                    animation: "default",
                    contentStyle: {
                        backgroundColor: "transparent",
                        paddingHorizontal: 24,
                    },
                }}
            />
        </SafeAreaView>
    );
}
