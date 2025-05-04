import Hero from "@/components/settings/Hero";
import Settings from "@/components/settings/Settings";
import { ScrollView, StatusBar, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Profile = () => {
    return (
        <SafeAreaProvider>
            <StatusBar
                barStyle='dark-content'
                animated
                translucent
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                bounces={false}>
                <View className='flex-1'>
                    <Hero />
                    <Settings />
                </View>
            </ScrollView>
        </SafeAreaProvider>
    );
};

export default Profile;
