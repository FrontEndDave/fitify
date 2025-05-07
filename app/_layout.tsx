import useTimeSpentTracker from "@/hooks/useTimeSpentTracker";
import { useUser } from "@/hooks/useUser";
import i18next, { initI18n } from "@/services/i18next";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./globals.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [appReady, setAppReady] = useState(false);
    const { user, loading: userLoading } = useUser();

    useEffect(() => {
        const initializeApp = async () => {
            await initI18n();
            await SplashScreen.preventAutoHideAsync();
            setAppReady(true);
        };

        initializeApp();
    }, []);

    const [fontsLoaded] = useFonts({
        "Manrope-ExtraBold": require("../assets/fonts/Manrope-ExtraBold.ttf"),
        "Manrope-Bold": require("../assets/fonts/Manrope-Bold.ttf"),
        "Manrope-SemiBold": require("../assets/fonts/Manrope-SemiBold.ttf"),
        "Manrope-Medium": require("../assets/fonts/Manrope-Medium.ttf"),
        "Manrope-Regular": require("../assets/fonts/Manrope-Regular.ttf"),
        "Manrope-Light": require("../assets/fonts/Manrope-Light.ttf"),
        "Manrope-ExtraLight": require("../assets/fonts/Manrope-ExtraLight.ttf"),
    });

    useEffect(() => {
        if (appReady && fontsLoaded && !userLoading) {
            SplashScreen.hideAsync();
        }
    }, [appReady, fontsLoaded, userLoading, user]);

    useTimeSpentTracker();

    if (!appReady || !fontsLoaded) {
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
        <Stack
            screenOptions={{
                headerShown: false,
                animation: "default",
                gestureEnabled: false,
            }}>
            {!user ? (
                <Stack.Screen name='(auth)' />
            ) : (
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
