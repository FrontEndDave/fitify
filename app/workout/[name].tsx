import { StatusBar } from "react-native";
import React, { useRef } from "react";
import { useLocalSearchParams } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Hero from "@/components/workout/Hero";
import BottomSheet from "@gorhom/bottom-sheet";
import Video from "@/components/workout/Video";
import CustomBottomSheet from "@/components/workout/CustomBottomSheet";

const Workout = () => {
    const parms = useLocalSearchParams();
    const bottomSheetRef = useRef<BottomSheet>(null);

    const handleSwipeUp = (event: any) => {
        if (event.nativeEvent.translationY < -50) {
            bottomSheetRef.current?.expand();
        }
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView
                edges={["top", "left", "right"]}
                className='bg-secondary-600 flex-1 w-full'>
                <StatusBar
                    barStyle='light-content'
                    animated
                />
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <Hero title={Array.isArray(parms.name) ? parms.name.join(", ") : parms.name || "Default Title"} />
                    <Video
                        handleSwipeUp={handleSwipeUp}
                        reps={Array.isArray(parms.reps) ? parseInt(parms.reps[0], 10) : parseInt(parms.reps || "0", 10)}
                        sets={Array.isArray(parms.sets) ? parseInt(parms.sets[0], 10) : parseInt(parms.sets || "0", 10)}
                        duration={Array.isArray(parms.duration) ? parseInt(parms.duration[0], 10) : parseInt(parms.duration || "0", 10)}
                        videoUrl={Array.isArray(parms.video) ? parms.video[0] : parms.video || ""}
                    />
                    <CustomBottomSheet
                        ref={bottomSheetRef}
                        episodes={parms.episodes ? JSON.parse(Array.isArray(parms.episodes) ? parms.episodes[0] : parms.episodes) : []}
                    />
                </GestureHandlerRootView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default Workout;
