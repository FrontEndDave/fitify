import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { SecondGradient } from "@/assets/svg/SecGradient";
import PersonLiftingWeights from "@/assets/svg/PersonLiftingWeights";
import { Gradient } from "@/assets/svg/Gradient";

export default function Chat() {
    return (
        <TouchableOpacity style={{ width: "100%", backgroundColor: Colors.error_200, height: 110, borderRadius: 30, zIndex: 1, overflow: "hidden" }}>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", height: 110, justifyContent: "flex-start", padding: 24, gap: 18 }}>
                <View style={{ backgroundColor: Colors.error_300, width: 60, height: 60, borderRadius: 13, display: "flex", justifyContent: "center", alignItems: "center" }}></View>

                <View style={{ display: "flex", flexDirection: "column", paddingRight: 50 }}>
                    <Text style={{ fontFamily: "Manrope-ExtraBold", fontSize: 18.5, color: Colors.secondary_500 }}>Your AI Fitness Coach</Text>
                    <Text style={{ fontFamily: "Manrope-Medium", fontSize: 15.5, color: Colors.secondary_500, opacity: 0.7 }}>Personalized fitness and diet advice anytime!</Text>
                </View>
            </View>

            <View style={{ width: "100%", height: 140, position: "absolute", left: 0, bottom: 0, flex: 1, zIndex: -2 }}>
                <SecondGradient />
            </View>
        </TouchableOpacity>
    );
}
