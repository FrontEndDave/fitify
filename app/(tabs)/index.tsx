import Colors from "@/constants/Colors";
import { SafeAreaView, ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Hero from "@/components/home/Hero";
import WorkoutProgress from "@/components/home/WorkoutProgress";
import TodayActivity from "@/components/home/TodayActivity";

export default function TabOneScreen() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, width: "100%", backgroundColor: Colors.background }}>
                <StatusBar
                    animated={true}
                    backgroundColor='transparent'
                />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ width: "100%" }}>
                    <View style={{ flex: 1, paddingHorizontal: 25 }}>
                        <Hero />
                        <WorkoutProgress />
                        <TodayActivity />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
