import Hero from "@/components/discover/Hero";
import OurCollection from "@/components/discover/OurCollection";
import PopularExercises from "@/components/discover/PopularExercises";
import { SafeAreaView, ScrollView, StatusBar, View } from "react-native";

const Discover = () => {
    return (
        <SafeAreaView className='flex-1 w-full bg-background'>
            <StatusBar
                barStyle='dark-content'
                animated
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className='flex-1'>
                    <Hero />
                    <PopularExercises />
                    <OurCollection />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Discover;
