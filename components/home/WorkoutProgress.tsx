import { Text, TouchableOpacity, View } from "react-native";
import Colors from "@/constants/Colors";
import ProgressCircle from "../ProgressCircle";
import { LinearGradient } from "expo-linear-gradient";
import RightArrow from "@/assets/svg/RightArrow";
import { BlurView } from "expo-blur";

export default function WorkoutProgress() {
    return (
        <View style={{ width: "100%", height: 120, borderRadius: 25, overflow: "hidden" }}>
            <LinearGradient
                colors={["#12100E", "#2B4162"]}
                start={[0, 1]}
                end={[1, 0]}
                style={{ flex: 1 }}>
                <View
                    style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 25,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingHorizontal: 20,
                    }}>
                    <View style={{ display: "flex", flexDirection: "column", gap: 3, justifyContent: "flex-start", alignItems: "flex-start" }}>
                        <Text style={{ fontFamily: "Manrope-Bold", fontSize: 21, color: Colors.primary }}>Workout Progress</Text>
                        {/* <Text style={{ fontFamily: "Manrope-Medium", fontSize: 16, color: Colors.secondary_300 }}>12 Exercise left</Text> */}

                        <View style={{ marginTop: 20, borderRadius: 1000, overflow: "hidden" }}>
                            <BlurView
                                intensity={350}
                                tint='light'
                                style={{
                                    position: "absolute",
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: 1000,
                                }}
                            />
                            <TouchableOpacity
                                style={{
                                    paddingHorizontal: 5,
                                    paddingLeft: 13,
                                    paddingVertical: 5,
                                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                                    borderRadius: 1000,
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 9,
                                }}>
                                <Text style={{ fontFamily: "Manrope-SemiBold", fontSize: 13, color: Colors.secondary_500 }}>View Details</Text>
                                <View
                                    style={{
                                        width: 26,
                                        height: 26,
                                        borderRadius: 1000,
                                        backgroundColor: Colors.secondary_500,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}>
                                    <RightArrow
                                        width={18}
                                        height={18}
                                        color={Colors.primary}
                                        strokeWidth={1}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ width: 70, height: 70, display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <ProgressCircle
                            size={80}
                            progress={65}
                            color={Colors.primary}
                            backgroundColor={Colors.secondary_300}
                        />
                        <Text style={{ fontFamily: "Manrope-Bold", fontSize: 19, color: Colors.primary, position: "absolute" }}>65%</Text>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
}
