import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { PauseIcon, PlayIcon } from "@/assets/svg/Controls";
import { PanGestureHandler } from "react-native-gesture-handler";
import { UpArrow } from "@/assets/svg/Arrow";
import formatExerciseTime from "@/utils/formatExerciseTime";
import { useTranslation } from "react-i18next";

type ExerciseDetailsProps = {
    duration: number;
    isPlaying: boolean;
    player: any;
    handleSwipeUp: (event: any) => void;
    reps: number;
    sets: number;
};

const ExerciseDetails = ({ isPlaying, player, handleSwipeUp, reps, sets, duration }: ExerciseDetailsProps) => {
    const { t } = useTranslation();
    const [paused, setPaused] = useState(false);

    const handleButtonPress = () => {
        if (isPlaying) {
            player.pause();
            setPaused(true);
        } else {
            player.play();
            setPaused(false);
        }
    };

    return (
        <View className='w-full pb-10'>
            <View className='flex flex-col items-center justify-center px-6 gap-7'>
                <Text className='font-manrope-bold text-3xl text-primary absolute -top-14'>01:32</Text>

                <View className='flex flex-row items-center gap-3.5 w-full'>
                    <View className='flex-1 bg-[rgba(245,245,245,0.10)] p-3.5 rounded-2xl w-[110px] h-20 flex flex-col items-start justify-center'>
                        <Text className='font-manrope-medium text-[14.5px] text-secondary-300'>{t("workout.duration")}</Text>
                        <Text className='font-manrope-bold text-lg text-primary'>{formatExerciseTime(duration)}</Text>
                    </View>

                    <TouchableOpacity
                        onPress={handleButtonPress}
                        className='p-5 rounded-full bg-success-500 justify-center items-center'>
                        {paused ? (
                            <PlayIcon
                                width={30}
                                height={30}
                            />
                        ) : (
                            <PauseIcon
                                width={30}
                                height={30}
                            />
                        )}
                    </TouchableOpacity>

                    <View className='flex-1 bg-[rgba(245,245,245,0.10)] p-3.5 rounded-2xl w-[110px] h-20 flex flex-col items-start justify-center'>
                        <Text className='font-manrope-regular text-[14.5px] text-secondary-300'>{t("workout.exercise")}</Text>
                        <Text className='font-manrope-bold text-lg text-primary'>
                            {reps}X{sets}
                        </Text>
                    </View>
                </View>

                <PanGestureHandler
                    onGestureEvent={handleSwipeUp}
                    onHandlerStateChange={handleSwipeUp}>
                    <View className='flex justify-center items-center flex-col'>
                        <UpArrow
                            width={26}
                            height={26}
                        />
                        <Text className='font-manrope-regular text-lg text-secondary-300'>{t("workout.swipe")}</Text>
                    </View>
                </PanGestureHandler>
            </View>
        </View>
    );
};

export default ExerciseDetails;
