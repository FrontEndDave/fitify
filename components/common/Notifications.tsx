import NotificationIcon from "@/assets/svg/Notification";
import Colors from "@/constants/Colors";
import { Text, View } from "react-native";

export default function Notifications() {
    return (
        <View style={{ position: "relative", paddingHorizontal: 10 }}>
            <View style={{ backgroundColor: Colors.error_500, borderRadius: 5, width: 25, display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", top: -5, right: 0, zIndex: 21 }}>
                <Text style={{ fontFamily: "Manrope-ExtraBold", fontSize: 14, color: Colors.primary }}>9+</Text>
            </View>
            <NotificationIcon />
        </View>
    );
}
