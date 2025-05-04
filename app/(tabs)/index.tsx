import MyWorkout from "@/components/common/MyWorkout";
import TodayActivity from "@/components/common/TodayActivity";
import Hero from "@/components/home/Hero";
import WorkoutProgress from "@/components/home/WorkoutProgress";
import { useState } from "react";
import { RefreshControl, ScrollView, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1500);
    };

    return (
        <SafeAreaView
            edges={["top"]}
            className='w-full'>
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
                    <MyWorkout />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Index;
