import { View, Text } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

export default function OurCollection() {
    return (
        <View style={{ marginTop: 20 }}>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingRight: 25 }}>
                <Text style={{ fontFamily: "Manrope-Bold", fontSize: 22, color: Colors.secondary_500 }}>Our Collection</Text>
            </View>
        </View>
    );
}
