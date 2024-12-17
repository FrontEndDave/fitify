import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import React from "react";

import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import Colors from "@/constants/Colors";

function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>["name"]; color: string }) {
    return (
        <FontAwesome
            size={28}
            style={{ marginBottom: -3 }}
            {...props}
        />
    );
}

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors.tint,
                headerShown: useClientOnlyValue(false, true),
            }}>
            <Tabs.Screen
                name='index'
                options={{
                    headerShown: false,
                    title: "Home",
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon
                            name='code'
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name='discover'
                options={{
                    headerShown: false,
                    title: "Tab Two",
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon
                            name='code'
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name='statistics'
                options={{
                    headerShown: false,
                    title: "Statistics",
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon
                            name='code'
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name='settings'
                options={{
                    headerShown: false,
                    title: "Settings",
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon
                            name='code'
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
