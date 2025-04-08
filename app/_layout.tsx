import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import "./globals.css";
import * as React from "react";
import { useEffect } from "react";

import "@/services/i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "@/services/i18next";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { initializeUser } from "@/services/firebase/user";
import useTimeSpentTracker from "@/hooks/useTimeSpentTracker";

export default function RootLayout() {
    const [loaded, error] = useFonts({
        "Manrope-ExtraBold": require("../assets/fonts/Manrope-ExtraBold.ttf"), // 800
        "Manrope-Bold": require("../assets/fonts/Manrope-Bold.ttf"), // 700
        "Manrope-SemiBold": require("../assets/fonts/Manrope-SemiBold.ttf"), // 600
        "Manrope-Medium": require("../assets/fonts/Manrope-Medium.ttf"), // 500
        "Manrope-Regular": require("../assets/fonts/Manrope-Regular.ttf"), // 400
        "Manrope-Light": require("../assets/fonts/Manrope-Light.ttf"), // 300
        "Manrope-ExtraLight": require("../assets/fonts/Manrope-ExtraLight.ttf"), // 200
    });

    useEffect(() => {
        if (error) throw error;
    }, [error]);

    const timeSpentMinutes = useTimeSpentTracker();

    useEffect(() => {
        if (loaded) {
            const initializeApp = async () => {
                await fetchLanguage();
                await initializeUser();
                SplashScreen.hideAsync();
            };
            initializeApp();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    if (!loaded) {
        return null;
    }

    const fetchLanguage = async () => {
        const savedLanguage = await AsyncStorage.getItem("appLanguage");
        if (savedLanguage) {
            await i18n.changeLanguage(savedLanguage);
        }
    };

    return (
        <SafeAreaProvider>
            <RootLayoutNav />
        </SafeAreaProvider>
    );
}

function RootLayoutNav() {
    return (
        <Stack>
            <Stack.Screen
                name='(tabs)'
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name='workout-details/[name]'
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name='workout/[name]'
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name='exercises'
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name='(settings)'
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    );
}
