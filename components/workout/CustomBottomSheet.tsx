import { View, Text } from "react-native";
import React, { forwardRef } from "react";
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";
import Colors from "@/constants/Colors";
import WorkoutCard from "./WorkoutCard";

const CustomBottomSheet = forwardRef<BottomSheet, {}>((_, ref) => {
    return (
        <BottomSheet
            ref={ref}
            index={-1}
            snapPoints={["65%"]}
            enablePanDownToClose={true}
            backgroundStyle={{ backgroundColor: Colors.secondary_600, borderTopStartRadius: 20, borderTopEndRadius: 20 }}
            handleStyle={{ backgroundColor: "rgba(32,35,40,0.9)", borderTopStartRadius: 20, borderTopEndRadius: 20 }}
            handleIndicatorStyle={{ backgroundColor: "#FFF" }}>
            <BottomSheetScrollView style={{ flex: 1, padding: 25, backgroundColor: Colors.secondary_600 }}>
                <View style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center", justifyContent: "center", paddingBottom: 20 }}>
                    {[1, 2, 3, 4, 5].map((episode, key) => (
                        <WorkoutCard
                            key={key}
                            title='Diamond push up 13x2'
                            time={15 * 1000 * 60 + 10 * 1000}
                            completed={episode % 2 === 1}
                            thumbnail='https://res.cloudinary.com/peloton-cycle/image/fetch/f_auto,c_limit,w_3840,q_90/https://images.ctfassets.net/6ilvqec50fal/JdeBsAsNI2XepyM4IDL1U/ef2c96e26f7c3af5bce6db428cd1237f/Screenshot_2024-03-21_at_12.36.05_PM.png'
                        />
                    ))}
                </View>
            </BottomSheetScrollView>
        </BottomSheet>
    );
});

export default CustomBottomSheet;
