import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { RelativePathString, router } from "expo-router";
import Colors from "@/constants/Colors";
import RightArrow from "@/assets/svg/RightArrow";
import CaloriesActivity from "./CaloriesActivity";
import { getTodayStepCount } from "@/services/stepCounter";
import { Accelerometer, Pedometer } from "expo-sensors";

type ActivityCardProps = {
    title: string;
    description: string;
    value: number;
    type: "water" | "sleep" | "steps";
    color: string;
};

const ActicityCard = ({ title, description, value, type, color }: ActivityCardProps) => {
    const routePath: { water: "/water-tracker/water"; sleep: "/sleep-tracker/sleep"; steps: "/step-tracker/steps" } = {
        water: "/water-tracker/water",
        sleep: "/sleep-tracker/sleep",
        steps: "/step-tracker/steps",
    };

    return (
        <TouchableOpacity
            onPress={() => router.push(routePath[type] as RelativePathString)}
            style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 16, paddingTop: 15 }}>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", gap: 12 }}>
                <View style={{ backgroundColor: color, width: 9, height: 22, borderRadius: 8 }}></View>
                <View>
                    <Text style={{ fontFamily: "Manrope-Bold", fontSize: 19, color: Colors.secondary_500 }}>{title}</Text>
                    <Text style={{ fontFamily: "Manrope-Medium", fontSize: 15, color: Colors.secondary_300 }}>{description}</Text>
                </View>
            </View>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "flex-end", gap: 1 }}>
                <Text style={{ fontFamily: "Manrope-ExtraBold", fontSize: 24, color: Colors.secondary_500 }}>{value}</Text>
                {type === "water" ? <Text style={{ fontFamily: "Manrope-Medium", fontSize: 18, color: Colors.secondary_300, paddingBottom: 2.1 }}>L</Text> : null}
                {type === "steps" ? <Text style={{ fontFamily: "Manrope-Medium", fontSize: 18, color: Colors.secondary_300, paddingBottom: 2.1 }}></Text> : null}
                {type === "sleep" ? <Text style={{ fontFamily: "Manrope-Medium", fontSize: 18, color: Colors.secondary_300, paddingBottom: 2.1 }}>hr</Text> : null}
            </View>
        </TouchableOpacity>
    );
};

export default function TodayActivity() {
    const [steps, setSteps] = useState<number>(0);
    const [activity, setActivity] = useState<string>("Standing");
    const [lastY, setLastY] = useState<number>(0);
    const [lastTimestamp, setLastTimestamp] = useState<number>(0);
    const [lastMovementTime, setLastMovementTime] = useState<number>(Date.now());
    const [lastStepTime, setLastStepTime] = useState<number>(Date.now());
    const stepInterval = 800;
    const sensitivity = 1.1;

    useEffect(() => {
        Accelerometer.setUpdateInterval(100);

        const subscription = Accelerometer.addListener((accelerometerData) => {
            const { x, y, z } = accelerometerData;

            const magnitude = Math.sqrt(x * x + y * y + z * z);

            const currentTimestamp = Date.now();
            if (magnitude > sensitivity) {
                const interval = currentTimestamp - lastTimestamp;
                const stepIntervalElapsed = currentTimestamp - lastStepTime;

                if (interval > 250 && stepIntervalElapsed > stepInterval) {
                    setSteps((prevSteps) => prevSteps + 1);
                    setLastTimestamp(currentTimestamp);
                    setLastStepTime(currentTimestamp);
                    setLastMovementTime(currentTimestamp);
                    setActivity("Walking");
                }
            } else {
                if (currentTimestamp - lastMovementTime > 3000) {
                    setActivity("Standing");
                }
            }

            setLastY(y);
        });

        return () => {
            subscription.remove();
        };
    }, [lastY, lastTimestamp, lastMovementTime, lastStepTime]);

    const resetSteps = () => setSteps(0);

    return (
        <View style={{ marginTop: 32 }}>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ fontFamily: "Manrope-Bold", fontSize: 19, color: Colors.secondary_500 }}>Today’s Activity</Text>
                <TouchableOpacity style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 7 }}>
                    <Text style={{ fontFamily: "Manrope-Semibold", fontSize: 16, color: Colors.secondary_400 }}>See details</Text>
                    <RightArrow
                        width={18}
                        height={19}
                    />
                </TouchableOpacity>
            </View>

            <View style={{ display: "flex", flexDirection: "row", gap: 14, alignItems: "center", marginTop: 20, height: 250, width: "100%" }}>
                <CaloriesActivity />
                <View style={{ height: "100%", flex: 1, backgroundColor: Colors.primary, borderRadius: 30, display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
                    <ActicityCard
                        title='Sleep'
                        description='8hrs of sleep'
                        value={7}
                        type='sleep'
                        color={Colors.success_400}
                    />
                    <ActicityCard
                        title='Water'
                        description='2L water daily'
                        value={1.4}
                        type='water'
                        color={Colors.information_400}
                    />
                    <ActicityCard
                        title='Steps'
                        description='10K steps'
                        value={steps}
                        type='steps'
                        color={Colors.warning_300}
                    />
                </View>
            </View>
        </View>
    );
}
