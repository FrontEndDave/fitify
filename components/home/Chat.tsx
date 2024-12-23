import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { SecondGradient } from "@/assets/svg/SecGradient";
import { LinearGradient } from "expo-linear-gradient";

export default function Chat() {
    return (
        <View style={{ paddingBottom: 40 }}>
            <TouchableOpacity style={{ width: "100%", height: 110, borderRadius: 30, zIndex: 1, overflow: "hidden" }}>
                <LinearGradient
                    colors={["#12100E", "#2B4162"]}
                    start={[0, 1]}
                    end={[1, 0]}>
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", height: 110, justifyContent: "flex-start", padding: 24, gap: 18 }}>
                        {/* <View style={{ backgroundColor: Colors.secondary_300, width: 60, height: 60, borderRadius: 13, display: "flex", justifyContent: "center", alignItems: "center" }}></View> */}

                        <View style={{ display: "flex", flexDirection: "column", paddingRight: 50 }}>
                            <Text style={{ fontFamily: "Manrope-ExtraBold", fontSize: 18.5, color: Colors.primary }}>Your AI Fitness Coach</Text>
                            <Text style={{ fontFamily: "Manrope-Medium", fontSize: 15.5, color: Colors.primary, opacity: 0.7 }}>Personalized fitness and diet advice anytime!</Text>
                        </View>
                    </View>

                    {/* <View style={{ width: "100%", height: 140, position: "absolute", left: 0, bottom: 0, flex: 1, zIndex: -2 }}>
                        <SecondGradient />
                    </View> */}
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
}
