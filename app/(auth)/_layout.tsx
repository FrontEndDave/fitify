import { auth } from "@/services/firebase/config";
import { Redirect, Stack } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export default function AuthLayout() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

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
