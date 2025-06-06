import { ActiveChatIcon, ChatIcon } from "@/assets/svg/Chat";
import { ActiveDiscoverIcon, DiscoverIcon } from "@/assets/svg/Discover";
import { ActiveHomeIcon, HomeIcon } from "@/assets/svg/Home";
import { ActiveSettingsIcon, SettingsIcon } from "@/assets/svg/Settings";
import { useUser } from "@/hooks/useUser";
import { Redirect, Tabs } from "expo-router";

const Layout = () => {
    const { user, loading } = useUser();

    if (loading) return null;
    if (!user) return <Redirect href='/(auth)/login' />;

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
                    tabBarIcon: ({ focused }: { focused: boolean }) => (
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
                    tabBarIcon: ({ focused }: { focused: boolean }) => (
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
                name='chat-welcome'
                options={{
                    headerShown: false,
                    title: "Personal Treiner",
                    tabBarIcon: ({ focused }: { focused: boolean }) => (
                        <>
                            {focused ? (
                                <ActiveChatIcon
                                    width={28}
                                    height={28}
                                />
                            ) : (
                                <ChatIcon
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
                    tabBarIcon: ({ focused }: { focused: boolean }) => (
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

export default Layout;
