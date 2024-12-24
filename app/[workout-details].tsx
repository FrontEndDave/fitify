import { ScrollView, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { StatusBar } from "expo-status-bar";

import Colors from "@/constants/Colors";

import Hero from "@/components/workout-details/Hero";
import Description from "@/components/workout-details/Description";

export default function WorkoutDetails() {
    const { workout } = useLocalSearchParams();
    const workoutName = Array.isArray(workout) ? workout[0] : workout;

    console.log(workoutName);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, width: "100%", backgroundColor: Colors.background }}>
                <StatusBar
                    style='dark'
                    animated
                />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ width: "100%" }}>
                    <View style={{ flex: 1, paddingHorizontal: 25 }}>
                        <Hero name={workoutName} />
                        <Description />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
