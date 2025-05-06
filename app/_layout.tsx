import * as SplashScreen from "expo-splash-screen";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";

import { SafeAreaProvider } from "react-native-safe-area-context";

import useTimeSpentTracker from "@/hooks/useTimeSpentTracker";
import { auth } from "@/services/firebase/config";
import i18next, { initI18n } from "@/services/i18next";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import "./globals.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState<any | null>(null);

    useEffect(() => {
        (async () => {
            await initI18n();
            setInitializing(true);
        })();
    }, []);

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
                SplashScreen.hideAsync();
            };
            initializeApp();
        }
    }, [loaded, error]);

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

    if (initializing || !loaded) {
        return null;
    }

    return (
        <SafeAreaProvider>
            <I18nextProvider i18n={i18next}>
                <RootLayoutNav user={user} />
            </I18nextProvider>
        </SafeAreaProvider>
    );
}

function RootLayoutNav({ user }: { user: any | null }) {
    return (
        <Stack screenOptions={{ headerShown: false, animation: "default" }}>
            <Stack.Screen
                name='(auth)'
                options={{ presentation: "modal" }}
            />

            {user && (
                <>
                    <Stack.Screen name='(tabs)' />
                    <Stack.Screen name='workout-details/[name]' />
                    <Stack.Screen name='workout/[name]' />
                    <Stack.Screen name='exercises' />
                    <Stack.Screen name='chat' />
                    <Stack.Screen name='(settings)' />
                </>
            )}
        </Stack>
    );
}
