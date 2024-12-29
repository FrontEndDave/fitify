import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { VideoIcon } from "@/assets/svg/Video";
import { CompleteIcon, IncompleteIcon } from "@/assets/svg/Status";
import formatExerciseTime from "@/services/formatTime";

interface EpisodeCardProps {
    title: string;
    time: number;
    completed: boolean;
}

export default function EpisodeCard({ title, time, completed }: EpisodeCardProps) {
    return (
        <TouchableOpacity style={{ backgroundColor: Colors.primary, width: "100%", padding: 18, borderRadius: 24, display: "flex", flexDirection: "row", alignItems: "center" }}>
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
        </TouchableOpacity>
    );
}
