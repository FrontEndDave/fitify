import Description from "@/components/workout-details/Description";
import Episodes from "@/components/workout-details/Episodes";
import Hero from "@/components/workout-details/Hero";
import WorkoutButton from "@/components/workout-details/WorkoutButton";
import { useExerciseByName } from "@/hooks/useExerciseByName";
import { useLocalSearchParams } from "expo-router";
import i18next from "i18next";
import { ActivityIndicator, ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const WorkoutDetails = () => {
    const { name } = useLocalSearchParams();
    const { exercise, loading, error } = useExerciseByName(String(name));
    const language = i18next.language;

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
                    <Description content={language === "pl" ? exercise.plDescription : exercise.description} />
                    <Episodes
                        name={exercise.name}
                        exercise={exercise}
                    />
                </View>
            </ScrollView>
            <WorkoutButton
                name={exercise.name}
                exercise={exercise}
            />
        </SafeAreaView>
    );
};

export default WorkoutDetails;
