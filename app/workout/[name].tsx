import { useLocalSearchParams } from "expo-router/build/hooks";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import Colors from "@/constants/Colors";
import Hero from "@/components/workout/Hero";
import { View } from "react-native";
import Video from "@/components/workout/Video";
import ExerciseDetails from "@/components/workout/ExerciseDetails";

export default function WorkoutDetails() {
    const { name } = useLocalSearchParams();
    const workoutName = name ? (Array.isArray(name) ? name[0] : name) : "Unknown Workout";

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, width: "100%", backgroundColor: Colors.secondary_600 }}>
                <StatusBar
                    style='light'
                    animated
                />
                <View style={{ flex: 1 }}>
                    <Hero title={workoutName} />
                    <Video />
                    {/* <ExerciseDetails /> */}
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
