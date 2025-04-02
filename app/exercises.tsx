import { View, StatusBar, ScrollView } from "react-native";
import React from "react";
import DetailsHero from "@/components/common/DetailsHero";
import List from "@/components/exercises/List";
import { SafeAreaView } from "react-native-safe-area-context";

const exercises = () => {
    return (
        <SafeAreaView
            edges={["top"]}
            className='flex-1 w-full bg-background'>
            <StatusBar
                barStyle='dark-content'
                animated
            />
            <View className='flex-1 px-6'>
                <DetailsHero text={"Exercises"} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <List />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default exercises;
