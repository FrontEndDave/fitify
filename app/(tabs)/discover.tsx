import { ScrollView, StatusBar, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";

import Hero from "@/components/discover/Hero";
import PopularExercises from "@/components/discover/PopularExercises";
import OurCollection from "@/components/discover/OurCollection";

export default function DiscoverScreen() {
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
                        <Hero />
                        <PopularExercises />
                        <OurCollection />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
