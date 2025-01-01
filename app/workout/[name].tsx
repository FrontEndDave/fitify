import { useLocalSearchParams } from "expo-router/build/hooks";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import CustomBottomSheet from "@/components/workout/CustomBottomSheet";
import Hero from "@/components/workout/Hero";
import Video from "@/components/workout/Video";
import Colors from "@/constants/Colors";
import BottomSheet from "@gorhom/bottom-sheet";
import { useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function WorkoutDetails() {
    const { name } = useLocalSearchParams();
    const workoutName = name ? (Array.isArray(name) ? name[0] : name) : "Unknown Workout";

    const bottomSheetRef = useRef<BottomSheet>(null);

    const handleSwipeUp = (event: any) => {
        if (event.nativeEvent.translationY < -50) {
            bottomSheetRef.current?.expand();
        }
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, width: "100%", backgroundColor: Colors.secondary_600 }}>
                <StatusBar
                    style='light'
                    animated
                />
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <Hero title={workoutName} />
                    <Video handleSwipeUp={handleSwipeUp} />
                    <CustomBottomSheet ref={bottomSheetRef} />
                </GestureHandlerRootView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
