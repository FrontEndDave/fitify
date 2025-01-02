import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { router } from "expo-router";
import Colors from "@/constants/Colors";

import formatExerciseTime from "@/services/formatTime";

import { PlayIcon } from "@/assets/svg/Controls";
import { VideoIcon } from "@/assets/svg/Video";
import { CompleteIcon, IncompleteIcon } from "@/assets/svg/Status";

interface EpisodeCardProps {
    title: string;
    time: number;
    completed: boolean;
    thumbnail?: string;
}

export default function EpisodeCard({ title, time, completed, thumbnail }: EpisodeCardProps) {
    return (
        <TouchableOpacity
            onPress={() =>
                router.push({
                    pathname: "/workout/[name]",
                    params: { name: "Diamond pushup" },
                })
            }
            style={{ backgroundColor: Colors.primary, width: "100%", padding: 18, borderRadius: 24, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 10 }}>
                {completed ? (
                    <CompleteIcon
                        width={28}
                        height={28}
                        color={Colors.success_400}
                    />
                ) : (
                    <IncompleteIcon
                        width={28}
                        height={28}
                    />
                )}
                <View style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <Text style={{ fontFamily: "Manrope-Bold", fontSize: 16, color: Colors.secondary_500, letterSpacing: -0.24 }}>{title}</Text>
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 5 }}>
                        <VideoIcon
                            width={13}
                            height={13}
                            color={Colors.secondary_300}
                        />
                        <Text style={{ fontFamily: "Manrope-SemiBold", fontSize: 14, color: Colors.secondary_300, letterSpacing: -0.45 }}>{formatExerciseTime(time)}</Text>
                    </View>
                </View>
            </View>

            <View style={{ backgroundColor: "#000", width: 75, height: 55, borderRadius: 14, display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
                <ImageBackground
                    source={{ uri: thumbnail }}
                    style={{ width: "100%", height: "100%", borderRadius: 14, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <View style={{ backgroundColor: "rgba(255,255,255,0.50)", borderRadius: 1000, padding: 6, display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <PlayIcon
                            width={16}
                            height={16}
                        />
                    </View>
                </ImageBackground>
            </View>
        </TouchableOpacity>
    );
}
