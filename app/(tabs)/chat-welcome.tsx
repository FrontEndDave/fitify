import { StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Cards from "@/components/chat/Cards";
import ChatButton from "@/components/chat/ChatButton";
import Hero from "@/components/chat/Hero";

const ChatWelcomeScreen = () => {
    return (
        <SafeAreaView
            edges={["top", "left", "right", "bottom"]}
            className='flex-1 w-full bg-background '>
            <StatusBar
                barStyle='dark-content'
                animated
            />
            <SafeAreaView
                edges={["bottom"]}
                className='flex flex-col items-center justify-between h-full'>
                <View>
                    <Hero />
                    <Cards />
                </View>
                <ChatButton />
            </SafeAreaView>
        </SafeAreaView>
    );
};

export default ChatWelcomeScreen;
