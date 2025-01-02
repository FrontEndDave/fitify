import Hero from "@/components/water-tracker/Hero";
import { StatusBar } from "expo-status-bar";
import { ScrollView, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function WaterTrackerScreen() {
    return (
        <SafeAreaProvider>
            <StatusBar
                style='light'
                animated
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ width: "100%" }}>
                <View style={{ flex: 1 }}>
                    <Hero />
                </View>
            </ScrollView>
        </SafeAreaProvider>
    );
}
