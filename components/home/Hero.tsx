import NotificationIcon from "@/assets/svg/Notification";
import Colors from "@/constants/Colors";
import { Image, Text, View } from "react-native";

export default function Hero() {
    return (
        <View style={{ marginTop: 20, width: "100%", paddingBottom: 35 }}>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 12 }}>
                    <Image
                        source={{ uri: "https://t3.ftcdn.net/jpg/06/78/09/78/240_F_678097871_G7OpoHQmiZTj4bHB7YW2HoH1syWfCbB9.jpg" }}
                        style={{ width: 52, height: 52, borderRadius: 100 }}
                    />
                    <View>
                        <Text style={{ fontFamily: "Manrope-Medium", fontSize: 16, color: Colors.secondary_400 }}>Welcome Back</Text>
                        <Text style={{ fontFamily: "Manrope-Bold", fontSize: 25, color: Colors.secondary_500 }}>Dawid Piela!</Text>
                    </View>
                </View>

                <View style={{ position: "relative", paddingHorizontal: 10 }}>
                    <View style={{ backgroundColor: Colors.error_500, borderRadius: 5, width: 25, display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", top: -5, right: 0, zIndex: 21 }}>
                        <Text style={{ fontFamily: "Manrope-ExtraBold", fontSize: 14, color: Colors.primary }}>9+</Text>
                    </View>
                    <NotificationIcon />
                </View>
            </View>
        </View>
    );
}
