import { useActiveWorkout } from "@/hooks/useActiveWorkout";
import { useDailyStats } from "@/hooks/useDailyStats";
import { useEvent } from "expo";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import React from "react";
import { Dimensions, View } from "react-native";
import ExerciseDetails from "./ExerciseDetails";

const ScreenHeight = Dimensions.get("screen").height;

const videoSource = "https://video-previews.elements.envatousercontent.com/69528e41-1ef1-48e6-9226-1b56ac753426/watermarked_preview/watermarked_preview.mp4";

interface VideoProps {
    workoutName: string;
    videoUrl: string;
    exerciseData: {
        name: string;
        video: string;
        sets: number;
        reps: number;
        duration: number;
        episodes: number;
        kcalPerMinute: number;
    };
}

const Video = ({ workoutName, videoUrl, exerciseData }: VideoProps) => {
    const { activeWorkout, completeEpisode } = useActiveWorkout(workoutName);
    const { addCompletedEpisode } = useDailyStats();

    const player = useVideoPlayer(videoSource, (player) => {
        player.loop = true;
        player.muted = true;
        player.play();
    });

    const { isPlaying } = useEvent(player, "playingChange", { isPlaying: player.playing });

    const handleExerciseComplete = () => {
        completeEpisode(exerciseData.name);

        addCompletedEpisode(exerciseData.name, exerciseData.kcalPerMinute, exerciseData.duration, exerciseData.sets, exerciseData.reps);

        const doneCount = (activeWorkout?.completedEpisodes?.length || 0) + 1;
        const totalCount = activeWorkout?.totalEpisodes || 0;

        if (doneCount >= totalCount) {
            router.back();
        } else {
            router.back();
        }
    };

    return (
        <View className='flex-1 flex justify-start items-center h-full'>
            <View
                className='flex-1 justify-center items-center relative w-full'
                style={{ height: ScreenHeight * 0.65 }}>
                <VideoView
                    style={{ width: "100%", height: "100%" }}
                    player={player}
                    nativeControls={false}
                    allowsFullscreen
                    contentFit='cover'
                    allowsPictureInPicture
                />
                <LinearGradient
                    start={[0.5, 0.03]}
                    end={[0.5, 0.95]}
                    colors={["rgba(19,22,25,1)", "rgba(16,17,16,0)", "rgba(16,17,16,0)", "rgba(19,22,25,1)"]}
                    style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
                />
            </View>
            <ExerciseDetails
                isPlaying={isPlaying}
                player={player}
                reps={exerciseData.reps}
                sets={exerciseData.sets}
                duration={exerciseData.duration}
                onExerciseComplete={handleExerciseComplete}
            />
        </View>
    );
};

export default Video;
