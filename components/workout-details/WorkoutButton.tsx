import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

export default function WorkoutButton() {
    return (
        <View style={{ paddingHorizontal: 25 }}>
            <TouchableOpacity style={{ borderRadius: 1000, backgroundColor: Colors.success_400, width: "100%", paddingVertical: 16, paddingHorizontal: 25, position: "fixed", bottom: 0 }}>
                <Text style={{ fontFamily: "Manrope-Bold", fontSize: 19, color: Colors.primary, textAlign: "center" }}>Continue Workout</Text>
            </TouchableOpacity>
        </View>
    );
}
