import { useUser } from "@/hooks/useUser";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
    const { user, loading } = useUser();

    if (loading) return null;

    if (user) {
        return <Redirect href='/(tabs)' />;
    }

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                animation: "slide_from_right",
            }}
            initialRouteName='login'>
            <Stack.Screen
                name='login'
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='register'
                options={{ headerShown: false }}
            />
        </Stack>
    );
}
