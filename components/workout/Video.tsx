import { View, Text, Dimensions } from "react-native";
import React from "react";
import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { LinearGradient } from "expo-linear-gradient";
import ExerciseDetails from "./ExerciseDetails";

const ScreenHeight = Dimensions.get("screen").height;

const videoSource = "https://video-previews.elements.envatousercontent.com/69528e41-1ef1-48e6-9226-1b56ac753426/watermarked_preview/watermarked_preview.mp4";

interface VideoProps {
    handleSwipeUp: (event: any) => void;
    videoUrl: string;
    reps: number;
    sets: number;
    duration: number;
}

const Video = ({ handleSwipeUp, videoUrl, reps, sets, duration }: VideoProps) => {
    const player = useVideoPlayer(videoSource, (player) => {
        player.loop = true;
        player.muted = true;
        player.play();
    });

    const { isPlaying } = useEvent(player, "playingChange", { isPlaying: player.playing });

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
                handleSwipeUp={handleSwipeUp}
                reps={reps}
                sets={sets}
                duration={duration}
            />
        </View>
    );
};

export default Video;
