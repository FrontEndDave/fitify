import { Text, View } from "react-native";
import Colors from "@/constants/Colors";
import Svg, { Circle } from "react-native-svg";
import ProgressCircle from "../ProgressCircle";

export default function WorkoutProgress() {
    return (
        <View style={{ backgroundColor: Colors.secondary_800, width: "100%", height: 102, borderRadius: 25, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View style={{ display: "flex", flexDirection: "column", paddingHorizontal: 30, gap: 3 }}>
                <Text style={{ fontFamily: "Manrope-Bold", fontSize: 21, color: Colors.primary }}>Workout Progress</Text>
                <Text style={{ fontFamily: "Manrope-Medium", fontSize: 16, color: Colors.secondary_300 }}>12 Exercise left</Text>
            </View>
            <View style={{ width: 70, height: 70, display: "flex", justifyContent: "center", alignItems: "center", marginRight: 20 }}>
                <ProgressCircle
                    size={75}
                    progress={65}
                />
                <Text style={{ fontFamily: "Manrope-Bold", fontSize: 18, color: Colors.primary, position: "absolute" }}>65%</Text>
            </View>
        </View>
    );
}
