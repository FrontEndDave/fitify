import { View, Text } from "react-native";
import React from "react";
import { Gradient } from "@/assets/svg/Gradient";
import Colors from "@/constants/Colors";
import { GymIcon } from "@/assets/svg/Gym";

export default function CaloriesActivity() {
    return (
        <View
            style={{
                height: "100%",
                width: 110,
                backgroundColor: Colors.success_500,
                borderRadius: 30,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                padding: 16,
                gap: 13,
                position: "relative",
                overflow: "hidden",
            }}>
            <View style={{ backgroundColor: Colors.success_600, width: 80, height: 80, borderRadius: 15, display: "flex", justifyContent: "center", alignItems: "center" }}>
                <GymIcon
                    width={42}
                    height={42}
                />
            </View>

            <View style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <Text style={{ fontFamily: "Manrope-Bold", fontSize: 26, color: Colors.primary }}>1.350</Text>
                <Text style={{ fontFamily: "Manrope-Medium", fontSize: 17, color: Colors.primary, opacity: 0.7 }}>Calories</Text>
            </View>

            <View
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: -110,
                }}>
                <Gradient style={{ width: "100%", height: "100%" }} />
            </View>
        </View>
    );
}
