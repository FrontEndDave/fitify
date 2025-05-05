import Hero from "@/components/workout/Hero";
import Video from "@/components/workout/Video";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const Workout = () => {
    const parms = useLocalSearchParams();
    const workoutName = Array.isArray(parms.workoutName) ? parms.workoutName[0] : parms.workoutName || "";

    const exerciseData = {
        name: Array.isArray(parms.name) ? parms.name[0] : parms.name || "",
        video: Array.isArray(parms.video) ? parms.video[0] : parms.video || "",
        sets: Number(Array.isArray(parms.sets) ? parms.sets[0] : parms.sets || 0),
        reps: Number(Array.isArray(parms.reps) ? parms.reps[0] : parms.reps || 0),
        duration: Number(Array.isArray(parms.duration) ? parms.duration[0] : parms.duration || 8),
        episodes: Number(Array.isArray(parms.episodes) ? parms.episodes[0] : parms.episodes || 0),
        kcalPerMinute: Number(Array.isArray(parms.kcal) ? parms.kcal[0] : parms.kcal || 5),
        workoutName: Array.isArray(parms.workoutName) ? parms.workoutName[0] : parms.workoutName || "",
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
                        exerciseData={exerciseData}
                        videoUrl={exerciseData.video}
                        workoutName={workoutName}
                    />
                </GestureHandlerRootView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default Workout;
