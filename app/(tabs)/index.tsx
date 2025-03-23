import MyGoals from "@/components/common/MyGoals";
import TodayActivity from "@/components/common/TodayActivity";
import Hero from "@/components/home/Hero";
import WorkoutProgress from "@/components/home/WorkoutProgress";
import React, { useState } from "react";
import { RefreshControl, ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1500);
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView className='flex-1 w-full bg-background'>
                <StatusBar
                    barStyle='dark-content'
                    animated
                />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }>
                    <View className='flex-1 px-6'>
                        <Hero />
                        <WorkoutProgress />
                        <TodayActivity />
                        <MyGoals />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
