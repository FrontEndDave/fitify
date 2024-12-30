import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { SecondGradient } from "@/assets/svg/SecGradient";
import Svg, { FeColorMatrix, Filter, Image } from "react-native-svg";
import PersonLiftingWeights from "@/assets/svg/PersonLiftingWeights";
import { LeftArrow } from "@/assets/svg/Arrow";
import More from "@/assets/svg/More";
import { router } from "expo-router";

type HeroProps = {
    name: string;
};

export default function Hero({ name }: HeroProps) {
    return (
        <View style={{ width: "100%", backgroundColor: Colors.secondary_800, height: 230, borderRadius: 26, zIndex: 0 }}>
            <View style={{ width: "100%", padding: 22, height: "100%" }}>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <LeftArrow />
                    </TouchableOpacity>
                    <Text style={{ fontFamily: "Manrope-ExtraBold", fontSize: 17, color: Colors.primary }}>Details</Text>
                    <TouchableOpacity>
                        <More />
                    </TouchableOpacity>
                </View>

                <Text style={{ fontFamily: "Manrope-Bold", fontSize: 48, color: Colors.primary, lineHeight: 50, letterSpacing: -1.5, marginTop: 20 }}>{name}</Text>

                <View style={{ position: "absolute", bottom: 0, right: 10, zIndex: -1 }}>
                    <Svg
                        height='340px'
                        width='200px'>
                        <Filter id='myFilter'>
                            <FeColorMatrix
                                type='saturate'
                                values='0'
                            />
                        </Filter>
                        <Image
                            href={require("@/assets/images/handworkout.png")}
                            height='490px'
                            width='280px'
                            filter='url(#myFilter)'
                        />
                    </Svg>
                </View>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", bottom: 20, gap: 8, marginLeft: 22, position: "absolute" }}>
                    <View style={{ backgroundColor: Colors.secondary_400, padding: 5, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 9 }}>
                        <PersonLiftingWeights
                            width={20}
                            height={20}
                        />
                    </View>
                    <Text style={{ fontFamily: "Manrope-Bold", fontSize: 15.5, color: Colors.primary }}>12 Exercise</Text>
                </View>
            </View>

            <View style={{ width: "100%", height: 140, position: "absolute", left: 0, bottom: 0, flex: 1, zIndex: -2 }}>
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
        </View>
    );
}
