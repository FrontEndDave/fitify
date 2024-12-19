import NotificationIcon from "@/assets/svg/Notification";
import Colors from "@/constants/Colors";
import { Image, Text, View } from "react-native";
import Notifications from "../common/Notifications";

export default function Hero() {
    return (
        <View style={{ marginTop: 20, width: "100%", paddingBottom: 35, paddingRight: 25 }}>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                <Text style={{ fontFamily: "Manrope-Bold", fontSize: 28, color: Colors.secondary_500 }}>Discover</Text>

                <Notifications />
            </View>
        </View>
    );
}
