import * as SplashScreen from "expo-splash-screen";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";

import i18n from "@/services/i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useTimeSpentTracker from "@/hooks/useTimeSpentTracker";
import { auth } from "@/services/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import "./globals.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState<any | null>(null);

    const [loaded, error] = useFonts({
        "Manrope-ExtraBold": require("../assets/fonts/Manrope-ExtraBold.ttf"), // 800
        "Manrope-Bold": require("../assets/fonts/Manrope-Bold.ttf"), // 700
        "Manrope-SemiBold": require("../assets/fonts/Manrope-SemiBold.ttf"), // 600
        "Manrope-Medium": require("../assets/fonts/Manrope-Medium.ttf"), // 500
        "Manrope-Regular": require("../assets/fonts/Manrope-Regular.ttf"), // 400
        "Manrope-Light": require("../assets/fonts/Manrope-Light.ttf"), // 300
        "Manrope-ExtraLight": require("../assets/fonts/Manrope-ExtraLight.ttf"), // 200
    });

    useTimeSpentTracker();

    useEffect(() => {
        if (loaded && !error) {
            const initializeApp = async () => {
                await fetchLanguage();
                SplashScreen.hideAsync();
            };
            initializeApp();
        }
    }, [loaded, error]);

    const fetchLanguage = async () => {
        const savedLanguage = await AsyncStorage.getItem("appLanguage");
        if (savedLanguage) {
            await i18n.changeLanguage(savedLanguage);
        }
    };

    useEffect(() => {
        const initializeApp = async () => {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                setUser(user);
                if (initializing) setInitializing(false);
            });

            return unsubscribe;
        };

        if (loaded) {
            initializeApp();
        }
    }, [initializing, loaded]);

    if (initializing) {
        return null;
    }

    return (
        <SafeAreaProvider>
            <RootLayoutNav user={user} />
        </SafeAreaProvider>
    );
}

function RootLayoutNav({ user }: { user: any | null }) {
    return (
        <Stack screenOptions={{ headerShown: false, animation: "default" }}>
            {user ? (
                <>
                    <Stack.Screen name='(tabs)' />
                    <Stack.Screen name='workout-details/[name]' />
                    <Stack.Screen name='workout/[name]' />
                    <Stack.Screen name='exercises' />
                    <Stack.Screen name='chat' />
                    <Stack.Screen name='(settings)' />
                </>
            ) : (
                <Stack.Screen name='(auth)' />
            )}
        </Stack>
    );
}
