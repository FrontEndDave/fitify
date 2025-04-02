import { ActivityIndicator, ScrollView, StatusBar, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import Hero from "@/components/workout-details/Hero";
import Description from "@/components/workout-details/Description";
import WorkoutButton from "@/components/workout-details/WorkoutButton";
import Episodes from "@/components/workout-details/Episodes";
import { useExerciseByName } from "@/hooks/useExerciseByName";
import { SafeAreaView } from "react-native-safe-area-context";

const WorkoutDetails = () => {
    const { name } = useLocalSearchParams();
    const { exercise, loading, error } = useExerciseByName(String(name));

    if (loading) {
        return (
            <View className='flex-1 justify-center items-center'>
                <ActivityIndicator size='large' />
            </View>
        );
    }

    if (error) {
        return (
            <View className='flex-1 justify-center items-center'>
                <Text className='text-red-500'>{error}</Text>
            </View>
        );
    }

    if (!exercise) {
        return (
            <View className='flex-1 justify-center items-center'>
                <Text className='text-secondary-500'>Exercise not found</Text>
            </View>
        );
    }

    return (
        <SafeAreaView
            edges={["bottom"]}
            className='flex-1 w-full bg-background'>
            <StatusBar
                barStyle='default'
                animated
                translucent={true}
                backgroundColor={"transparent"}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className='flex-1 px-6 mt-20'>
                    <Hero exercise={exercise} />
                    <Description content={exercise.description} />
                    <Episodes episode={exercise.episodes} />
                </View>
            </ScrollView>
            <WorkoutButton name={exercise.name} />
        </SafeAreaView>
    );
};

export default WorkoutDetails;
