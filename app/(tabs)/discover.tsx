import { SafeAreaView, ScrollView, StatusBar, Text, View } from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import Hero from "@/components/discover/Hero";
import PopularExercises from "@/components/discover/PopularExercises";
import OurCollection from "@/components/discover/OurCollection";

const discover = () => {
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

export default discover;
