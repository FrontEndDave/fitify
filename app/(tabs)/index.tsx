import { ScrollView, StatusBar, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";

import Hero from "@/components/home/Hero";
import WorkoutProgress from "@/components/home/WorkoutProgress";
import TodayActivity from "@/components/home/TodayActivity";
import MyGoals from "@/components/home/MyGoals";
import Chat from "@/components/home/Chat";

export default function TabOneScreen() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, width: "100%", backgroundColor: Colors.background }}>
                <StatusBar
                    barStyle='dark-content'
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
                        <MyGoals />
                        <Chat />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
