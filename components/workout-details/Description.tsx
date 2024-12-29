import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";

export default function Description() {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleText = () => {
        setIsExpanded(!isExpanded);
    };

    const fullText =
        "One of the key benefits of home workouts is that they are cost-effective since they don't require a gym membership or expensive equipment. Additionally, they offer the convenience of being done at any time and in the comfort of your own home. With just a few basic tools, such as resistance bands or dumbbells, you can effectively train different muscle groups and improve your strength and flexibility. Furthermore, home workouts often provide a wide variety of online resources and apps to guide you through your fitness journey, making it easier to stay motivated and on track.";
    const shortText = "One of the key benefits of home workouts is that they are cost-effective since they don't require a gym membership or expensive equipment...";

    return (
        <View style={{ marginTop: 20 }}>
            <View style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <Text style={{ fontFamily: "Manrope-Regular", fontSize: 16, color: Colors.secondary_400 }}>Description</Text>

                <View style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "flex-start" }}>
                    <Text
                        style={{
                            fontFamily: "Manrope-Medium",
                            fontSize: 17,
                            color: Colors.secondary_500,
                            lineHeight: 30,
                        }}>
                        {isExpanded ? fullText : shortText}
                        <Text
                            onPress={toggleText}
                            style={{
                                color: Colors.information_500,
                                fontFamily: "Manrope-ExtraBold",
                                fontSize: 17,
                            }}>
                            {isExpanded ? " See Less" : " See More"}
                        </Text>
                    </Text>
                </View>
            </View>
        </View>
    );
}
