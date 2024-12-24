import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
    initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

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

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return <RootLayoutNav />;
}

function RootLayoutNav() {
    return (
        <Stack>
            <Stack.Screen
                name='(tabs)'
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='modal'
                options={{ presentation: "modal" }}
            />
            <Stack.Screen
                name='[workout-details]'
                options={{ headerShown: false }}
            />
        </Stack>
    );
}
