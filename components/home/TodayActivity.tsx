import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import RightArrow from "@/assets/svg/RightArrow";

export default function TodayActivity() {
    return (
        <View style={{ marginTop: 32 }}>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ fontFamily: "Manrope-Bold", fontSize: 22, color: Colors.secondary_500 }}>Today’s Activity</Text>
                <TouchableOpacity style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 7 }}>
                    <Text style={{ fontFamily: "Manrope-Semibold", fontSize: 17, color: Colors.secondary_400 }}>See details</Text>
                    <RightArrow
                        width={18}
                        height={19}
                    />
                </TouchableOpacity>
            </View>

            <View style={{ display: "flex", flexDirection: "row", gap: 14, alignItems: "center", marginTop: 20, height: 220, width: "100%" }}>
                <View style={{ height: "100%", width: 120, backgroundColor: Colors.error_500, borderRadius: 30, display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", padding: 22 }}>
                    <View style={{ backgroundColor: Colors.error_600, width: 80, height: 80, borderRadius: 15, display: "flex", justifyContent: "center", alignItems: "center" }}></View>
                </View>
                <View style={{ height: "100%", flex: 1, backgroundColor: Colors.primary, borderRadius: 30 }}></View>
            </View>
        </View>
    );
}
