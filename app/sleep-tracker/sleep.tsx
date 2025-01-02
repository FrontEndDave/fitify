import { ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";

export default function SleepTrackerScreen() {
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
                    <View style={{ flex: 1, paddingLeft: 25 }}>
                        <Text>Sleep Tracker</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
