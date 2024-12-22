import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { SecondGradient } from "@/assets/svg/SecGradient";
import PersonLiftingWeights from "@/assets/svg/PersonLiftingWeights";
import Svg, { FeColorMatrix, Filter, Image } from "react-native-svg";

type ExerciseCardProps = {
    title: string;
    color: string;
    accentColor: string;
};

const ExerciseCard = ({ title, color, accentColor }: ExerciseCardProps) => {
    return (
        <TouchableOpacity
            style={{
                width: "100%",
                height: 160,
                backgroundColor: color,
                borderRadius: 30,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                position: "relative",
            }}>
            <View style={{ padding: 22, width: "100%", height: "100%", position: "relative" }}>
                <Text style={{ fontFamily: "Manrope-Bold", fontSize: 24, color: Colors.secondary_500 }}>{title}</Text>

                <View style={{ position: "absolute", bottom: 0, left: 50, zIndex: -1 }}>
                    <Svg
                        height='230px'
                        width='300px'>
                        <Filter id='myFilter'>
                            <FeColorMatrix
                                type='saturate'
                                values='0'
                            />
                        </Filter>
                        <Image
                            href={require("@/assets/images/handworkout.png")}
                            height='350px'
                            width='480px'
                            filter='url(#myFilter)'
                        />
                    </Svg>
                </View>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", height: "72%", gap: 8 }}>
                    <View style={{ backgroundColor: accentColor, padding: 5, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 9 }}>
                        <PersonLiftingWeights
                            width={20}
                            height={20}
                        />
                    </View>
                    <Text style={{ fontFamily: "Manrope-Medium", fontSize: 15.5, color: Colors.secondary_500 }}>12 Exercise</Text>
                </View>
            </View>

            <View style={{ width: "100%", height: 135, position: "absolute", left: 0, bottom: -20, flex: 1, zIndex: -2 }}>
                <SecondGradient />
            </View>
        </TouchableOpacity>
    );
};

export default function OurCollection() {
    return (
        <View style={{ marginTop: 20, width: "100%", paddingRight: 25 }}>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ fontFamily: "Manrope-Bold", fontSize: 20, color: Colors.secondary_500 }}>Our Collection</Text>
            </View>

            <View style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 20, paddingBottom: 40 }}>
                <ExerciseCard
                    title='Chest & abdominal exercises'
                    color='#FCDBB3'
                    accentColor={Colors.warning_100}
                />
                <ExerciseCard
                    title='Chest & abdominal exercises'
                    color='#E0D2FD'
                    accentColor={"#F2EBFE"}
                />
                <ExerciseCard
                    title='Chest & abdominal exercises'
                    color={Colors.error_400}
                    accentColor={Colors.error_200}
                />
            </View>
        </View>
    );
}
