import { Text, View } from "react-native";
import Colors from "@/constants/Colors";
import ProgressCircle from "../common/ProgressCircle";
import { LinearGradient } from "expo-linear-gradient";
import CountingText from "../common/CountingText";

export default function WorkoutProgress() {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const currentDate = new Date();
    const dayOfMonth = currentDate.getDate();
    const monthName = months[currentDate.getMonth()];

    return (
        <View style={{ width: "100%", height: 135, borderRadius: 25, overflow: "hidden" }}>
            <LinearGradient
                colors={["#12100E", "#2D3436"]}
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
                    <View style={{ display: "flex", flexDirection: "column", gap: 8, justifyContent: "flex-start", alignItems: "flex-start" }}>
                        <View style={{ backgroundColor: "#4f4f54", opacity: 1, paddingHorizontal: 9, paddingVertical: 3, borderRadius: 1000 }}>
                            <Text style={{ fontFamily: "Manrope-SemiBold", fontSize: 13, color: Colors.primary }}>
                                {monthName} {dayOfMonth}
                            </Text>
                        </View>

                        <Text style={{ fontFamily: "Manrope-Bold", fontSize: 17, color: Colors.primary }}>Workout Progress</Text>

                        <View style={{ display: "flex", flexDirection: "row", alignItems: "flex-end", gap: 5 }}>
                            <Text style={{ fontFamily: "Manrope-Bold", fontSize: 23, color: Colors.primary }}>30/40</Text>
                            <Text style={{ fontFamily: "Manrope-SemiBold", fontSize: 16, color: Colors.primary, opacity: 0.8, paddingBottom: 2 }}>Done</Text>
                        </View>
                    </View>
                    <View style={{ width: 70, height: 70, display: "flex", justifyContent: "center", alignItems: "center", marginRight: 10 }}>
                        <ProgressCircle
                            size={90}
                            progress={65}
                            color={Colors.primary}
                            backgroundColor={Colors.secondary_300}
                            duration={2000}
                        />
                        <CountingText
                            customStyle={{ fontFamily: "Manrope-Bold", fontSize: 21, color: Colors.primary, position: "absolute" }}
                            value={"65"}
                        />
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
}
