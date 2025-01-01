import { PauseIcon, PlayIcon } from "@/assets/svg/Controls";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";

import { UpArrow } from "@/assets/svg/Arrow";
import Colors from "@/constants/Colors";

export default function ExerciseDetails({ isPlaying, player, handleSwipeUp }: { isPlaying: boolean; player: any; handleSwipeUp: any }) {
    const [paused, setPaused] = useState(false);

    const handleButtonPress = () => {
        if (isPlaying) {
            player.pause();
            setPaused(true);
        } else {
            player.play();
            setPaused(false);
        }
    };

    return (
        <View style={{ width: "100%" }}>
            <View style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingHorizontal: 25, gap: 30 }}>
                <Text style={{ fontFamily: "Manrope-Bold", fontSize: 32, color: Colors.primary, position: "absolute", top: -55 }}>01:32</Text>

                <View style={{ flexDirection: "row", alignItems: "center", gap: 14, width: "100%" }}>
                    <View style={{ flex: 1, backgroundColor: "rgba(245,245,245,0.10)", padding: 14, borderRadius: 20, width: 110, height: 80, display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center" }}>
                        <Text style={{ fontFamily: "Manrope-Regular", fontSize: 14.5, color: Colors.secondary_300 }}>Time Workout</Text>
                        <Text style={{ fontFamily: "Manrope-Bold", fontSize: 20, color: Colors.primary }}>15m 10s</Text>
                    </View>

                    <TouchableOpacity
                        onPress={handleButtonPress}
                        style={{
                            padding: 22,
                            borderRadius: 1000,
                            backgroundColor: Colors.success_500,
                            justifyContent: "center",
                            alignItems: "center",
                            shadowColor: "rgba(205,254,194,0.5)",
                            shadowOffset: { width: 0, height: 0 },
                            shadowOpacity: 0.23,
                            shadowRadius: 12,
                        }}>
                        {paused ? (
                            <PlayIcon
                                width={30}
                                height={30}
                            />
                        ) : (
                            <PauseIcon
                                width={30}
                                height={30}
                            />
                        )}
                    </TouchableOpacity>
                    <View style={{ flex: 1, backgroundColor: "rgba(245,245,245,0.10)", padding: 14, borderRadius: 20, width: 110, height: 80, display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center" }}>
                        <Text style={{ fontFamily: "Manrope-Regular", fontSize: 14.5, color: Colors.secondary_300 }}>Exercise</Text>
                        <Text style={{ fontFamily: "Manrope-Bold", fontSize: 20, color: Colors.primary }}>25X2</Text>
                    </View>
                </View>

                <PanGestureHandler
                    onGestureEvent={handleSwipeUp}
                    onHandlerStateChange={handleSwipeUp}>
                    <View style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                        <UpArrow
                            width={26}
                            height={26}
                        />
                        <Text style={{ fontFamily: "Manrope-Regular", fontSize: 16, color: Colors.secondary_300 }}>Swipe for more episodes</Text>
                    </View>
                </PanGestureHandler>
            </View>
        </View>
    );
}
