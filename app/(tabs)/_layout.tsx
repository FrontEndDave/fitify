import React from "react";
import { ActiveDiscoverIcon, DiscoverIcon } from "@/assets/svg/Discover";
import { ActiveHomeIcon, HomeIcon } from "@/assets/svg/Home";
import { ActiveSettingsIcon, SettingsIcon } from "@/assets/svg/Settings";
import { ActiveStatisticsIcon, StatisticsIcon } from "@/assets/svg/Statistics";
import { Tabs } from "expo-router";

const _layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#2f95dc",
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    borderTopWidth: 0,
                    shadowColor: "transparent",
                    height: 95,
                    paddingTop: 22,
                },
            }}>
            <Tabs.Screen
                name='index'
                options={{
                    headerShown: false,
                    title: "Home",
                    tabBarIcon: ({ focused }) => (
                        <>
                            {focused ? (
                                <ActiveHomeIcon
                                    width={28}
                                    height={28}
                                />
                            ) : (
                                <HomeIcon
                                    width={28}
                                    height={28}
                                />
                            )}
                        </>
                    ),
                }}
            />
            <Tabs.Screen
                name='discover'
                options={{
                    headerShown: false,
                    title: "Discover",
                    tabBarIcon: ({ focused }) => (
                        <>
                            {focused ? (
                                <ActiveDiscoverIcon
                                    width={28}
                                    height={28}
                                />
                            ) : (
                                <DiscoverIcon
                                    width={28}
                                    height={28}
                                />
                            )}
                        </>
                    ),
                }}
            />
            <Tabs.Screen
                name='statistics'
                options={{
                    headerShown: false,
                    title: "Statistics",
                    tabBarIcon: ({ focused }) => (
                        <>
                            {focused ? (
                                <ActiveStatisticsIcon
                                    width={28}
                                    height={28}
                                />
                            ) : (
                                <StatisticsIcon
                                    width={28}
                                    height={28}
                                />
                            )}
                        </>
                    ),
                }}
            />
            <Tabs.Screen
                name='settings'
                options={{
                    headerShown: false,
                    title: "Settings",
                    tabBarIcon: ({ focused }) => (
                        <>
                            {focused ? (
                                <ActiveSettingsIcon
                                    width={28}
                                    height={28}
                                />
                            ) : (
                                <SettingsIcon
                                    width={28}
                                    height={28}
                                />
                            )}
                        </>
                    ),
                }}
            />
        </Tabs>
    );
};

export default _layout;
