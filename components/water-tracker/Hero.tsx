import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import More from "@/assets/svg/More";
import { LeftArrow } from "@/assets/svg/Arrow";
import { router } from "expo-router";
import Animated, { useAnimatedProps, useSharedValue } from "react-native-reanimated";
import Water from "./Water";

export default function Hero() {
    const [waterLevel, setWaterLevel] = useState(0);

    const handleDrink = () => {
        if (waterLevel < 4000) {
            setWaterLevel((prev) => Math.min(prev + 250, 4000));
        }
    };

    const percentage = (waterLevel / 4000) * 100;

    return (
        <View style={{ width: "100%", backgroundColor: Colors.secondary_700, paddingVertical: 20, borderBottomRightRadius: 23, borderBottomLeftRadius: 23, paddingHorizontal: 25 }}>
            <SafeAreaView style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%" }}>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingTop: 15, width: "100%" }}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <LeftArrow />
                    </TouchableOpacity>
                    <Text style={{ fontFamily: "Manrope-ExtraBold", fontSize: 18, color: Colors.primary }}>Water Tracker</Text>
                    <TouchableOpacity>
                        <More />
                    </TouchableOpacity>
                </View>

                <View style={{ paddingVertical: 30 }}>
                    <Water
                        size={175}
                        value={percentage}
                    />
                </View>

                <View style={{ display: "flex", flexDirection: "column", gap: 20, justifyContent: "center", alignItems: "center", paddingBottom: 10 }}>
                    <View style={{ display: "flex", flexDirection: "column", gap: 2, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontFamily: "Manrope-ExtraBold", fontSize: 32, color: Colors.primary }}>{percentage.toFixed(0)}%</Text>
                        <Text style={{ fontFamily: "Manrope-Medium", fontSize: 18, color: Colors.primary }}>{waterLevel} / 4000 ml</Text>
                    </View>
                    <TouchableOpacity
                        onPress={handleDrink}
                        style={{ paddingHorizontal: 40, height: 47, backgroundColor: Colors.information_500, borderRadius: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ fontFamily: "Manrope-Bold", fontSize: 19, color: Colors.primary }}>Drink</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}
