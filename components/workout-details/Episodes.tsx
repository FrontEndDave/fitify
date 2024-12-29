import { View, Text } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { VideoIcon } from "@/assets/svg/Video";
import EpisodeCard from "./EpisodeCard";

export default function Episodes() {
    return (
        <View style={{ marginTop: 32 }}>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ fontFamily: "Manrope-Bold", fontSize: 19, color: Colors.secondary_500 }}>All Episode</Text>
                <View style={{ display: "flex", alignItems: "center", flexDirection: "row", gap: 8 }}>
                    <VideoIcon
                        width={14}
                        height={14}
                        color={Colors.secondary_400}
                    />
                    <Text style={{ fontFamily: "Manrope-SemiBold", fontSize: 17, color: Colors.secondary_400, letterSpacing: -0.45 }}>1 h 32 min</Text>
                </View>
            </View>

            <View style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center", justifyContent: "center", marginTop: 18, paddingBottom: 20 }}>
                {[1, 2, 3, 4, 5].map((episode) => (
                    <EpisodeCard
                        title='Diamond push up 13x2'
                        time={15 * 1000 * 60 + 10 * 1000}
                        completed={episode % 2 === 1}
                    />
                ))}
            </View>
        </View>
    );
}
