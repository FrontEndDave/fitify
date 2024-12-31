import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
import { LeftArrow } from "@/assets/svg/Arrow";
import More from "@/assets/svg/More";
import Colors from "@/constants/Colors";

type HeroProps = {
    title: string;
};

export default function Hero({ title }: HeroProps) {
    return (
        <View style={{ marginTop: 20, paddingHorizontal: 25, position: "relative" }}>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <TouchableOpacity onPress={() => router.back()}>
                    <LeftArrow />
                </TouchableOpacity>
                <Text style={{ fontFamily: "Manrope-ExtraBold", fontSize: 18, color: Colors.primary }}>{title}</Text>
                <TouchableOpacity>
                    <More />
                </TouchableOpacity>
            </View>
        </View>
    );
}
