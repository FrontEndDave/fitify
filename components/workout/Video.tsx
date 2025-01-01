import { LinearGradient } from "expo-linear-gradient";
import { useVideoPlayer, VideoView } from "expo-video";
import { Dimensions, View } from "react-native";
import ExerciseDetails from "./ExerciseDetails";
import { useEvent } from "expo";

const ScreenHeight = Dimensions.get("window").height;

const videoSource = "https://video-previews.elements.envatousercontent.com/69528e41-1ef1-48e6-9226-1b56ac753426/watermarked_preview/watermarked_preview.mp4";

export default function VideoScreen() {
    const player = useVideoPlayer(videoSource, (player) => {
        player.loop = true;
        player.muted = true;
        player.play();
    });

    const { isPlaying } = useEvent(player, "playingChange", { isPlaying: player.playing });

    return (
        <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center", height: "100%" }}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", height: ScreenHeight * 0.65, width: "100%", position: "relative" }}>
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
            />
        </View>
    );
}
