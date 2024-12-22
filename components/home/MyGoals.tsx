import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import RightArrow from "@/assets/svg/RightArrow";
import Colors from "@/constants/Colors";
import PersonLiftingWeights from "@/assets/svg/PersonLiftingWeights";
import ProgressCircle from "../ProgressCircle";

type GoalCardProps = {
    title: string;
    description: string;
    progress: number;
    type: "weight" | "water" | "steps" | "sleep";
};

const GoalCard = ({ title, description, progress, type }: GoalCardProps) => {
    return (
        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 14 }}>
                <View style={{ backgroundColor: Colors.secondary_100, width: 50, height: 50, borderRadius: 13, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <PersonLiftingWeights
                        width={28}
                        height={28}
                    />
                </View>

                <View style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 1 }}>
                    <Text style={{ fontFamily: "Manrope-Medium", fontSize: 16, color: Colors.secondary_400 }}>{title}</Text>
                    <Text style={{ fontFamily: "Manrope-Bold", fontSize: 17, color: Colors.secondary_500 }}>{description}</Text>
                </View>
            </View>

            <View style={{ width: 70, height: 70, display: "flex", justifyContent: "center", alignItems: "center" }}>
                <ProgressCircle
                    size={60}
                    backgroundColor={Colors.secondary_100}
                    progress={progress}
                />
                <Text style={{ fontFamily: "Manrope-Bold", fontSize: 16, color: Colors.secondary_500, position: "absolute" }}>{progress}%</Text>
            </View>
        </View>
    );
};

export default function MyGoals() {
    return (
        <View style={{ marginTop: 32, paddingBottom: 30 }}>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ fontFamily: "Manrope-Bold", fontSize: 19, color: Colors.secondary_500 }}>My Goals</Text>
                <TouchableOpacity style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 7 }}>
                    <Text style={{ fontFamily: "Manrope-Semibold", fontSize: 16, color: Colors.secondary_400 }}>See all</Text>
                    <RightArrow
                        width={18}
                        height={19}
                    />
                </TouchableOpacity>
            </View>

            <View style={{ width: "100%", paddingHorizontal: 16, paddingVertical: 11.5, backgroundColor: Colors.primary, marginTop: 20, borderRadius: 20, gap: 22 }}>
                <GoalCard
                    title='Weight Loss'
                    description='Lose 5kg in 2 months'
                    progress={37}
                    type='weight'
                />
                <GoalCard
                    title='Drink Water'
                    description='2L water daily'
                    progress={79}
                    type='water'
                />
                <GoalCard
                    title='Sleep 8hrs'
                    description='8hrs of sleep daily'
                    progress={60}
                    type='sleep'
                />
                <GoalCard
                    title='Make 10k steps'
                    description='10k steps daily'
                    progress={19}
                    type='steps'
                />
            </View>
        </View>
    );
}
