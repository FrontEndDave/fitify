import { Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const WorkoutDetails = () => {
    const { name } = useLocalSearchParams();

    return (
        <View>
            <Text>ExerciseDetails {name}</Text>
        </View>
    );
};

export default WorkoutDetails;
