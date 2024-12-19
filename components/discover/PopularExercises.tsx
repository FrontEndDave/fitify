import { View, Text, TouchableOpacity, ScrollView, Touchable } from "react-native";
import React from "react";
import RightArrow from "@/assets/svg/RightArrow";
import Colors from "@/constants/Colors";
import { SecondGradient } from "@/assets/svg/SecGradient";
import Svg, { FeColorMatrix, Filter, Image } from "react-native-svg";
import PersonLiftingWeights from "@/assets/svg/PersonLiftingWeights";

export default function PopularExercises() {
    return (
        <View>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingRight: 25 }}>
                <Text style={{ fontFamily: "Manrope-Bold", fontSize: 22, color: Colors.secondary_500 }}>Popular Exercises</Text>
                <TouchableOpacity style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 7 }}>
                    <Text style={{ fontFamily: "Manrope-Semibold", fontSize: 17, color: Colors.secondary_400 }}>See more</Text>
                    <RightArrow
                        width={18}
                        height={19}
                    />
                </TouchableOpacity>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginTop: 20 }}>
                {[1, 2, 3, 4, 5].map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={{
                            width: 240,
                            height: 200,
                            backgroundColor: Colors.secondary_800,
                            borderRadius: 30,
                            marginRight: 20,
                            display: "flex",
                            flexDirection: "column",
                            overflow: "hidden",
                            position: "relative",
                        }}>
                        <View style={{ padding: 22, width: "100%", height: "100%", position: "relative" }}>
                            <Text style={{ fontFamily: "Manrope-Bold", fontSize: 32, color: Colors.primary }}>Hand{"\n"}Workout</Text>

                            <View style={{ position: "absolute", bottom: 0, left: 50, zIndex: -1 }}>
                                <Svg
                                    height='270px'
                                    width='200px'>
                                    <Filter id='myFilter'>
                                        <FeColorMatrix
                                            type='saturate'
                                            values='0'
                                        />
                                    </Filter>
                                    <Image
                                        href={require("@/assets/images/handworkout.png")}
                                        height='350px'
                                        width='280px'
                                        filter='url(#myFilter)'
                                    />
                                </Svg>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", height: "70%", gap: 8 }}>
                                <View style={{ backgroundColor: Colors.secondary_400, padding: 5, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 9 }}>
                                    <PersonLiftingWeights
                                        width={20}
                                        height={20}
                                    />
                                </View>
                                <Text style={{ fontFamily: "Manrope-Medium", fontSize: 15.5, color: Colors.primary }}>12 Exercise</Text>
                            </View>
                        </View>

                        <View style={{ width: "100%", height: 120, position: "absolute", left: 0, bottom: 0, flex: 1, zIndex: -2 }}>
                            <SecondGradient
                                style={{
                                    position: "absolute",
                                    bottom: 0,
                                    left: 0,
                                    minWidth: "100%",
                                    height: 20,
                                }}
                            />
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}
