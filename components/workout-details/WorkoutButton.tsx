import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { router } from "expo-router";

export default function WorkoutButton() {
    return (
        <View style={{ paddingHorizontal: 25 }}>
            <TouchableOpacity
                onPress={() =>
                    router.push({
                        pathname: "/workout/[name]",
                        params: { name: "Hand Workout" },
                    })
                }
                style={{
                    borderRadius: 1000,
                    backgroundColor: Colors.success_400,
                    width: "100%",
                    paddingVertical: 16,
                    paddingHorizontal: 25,
                    position: "fixed",
                    bottom: 0,
                    shadowColor: "rgba(0,0,0,0.25)",
                    shadowOffset: { width: 0, height: 10 },
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                    zIndex: 100,
                }}>
                <Text style={{ fontFamily: "Manrope-Bold", fontSize: 20, color: Colors.primary, textAlign: "center", lineHeight: 32 }}>Continue Workout</Text>
            </TouchableOpacity>
        </View>
    );
}
