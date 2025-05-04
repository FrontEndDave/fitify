import { PauseIcon, PlayIcon } from "@/assets/svg/Controls";
import formatExerciseTime from "@/utils/formatExerciseTime";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";

type ExerciseDetailsProps = {
    duration: number;
    isPlaying: boolean;
    player: any;
    reps: number;
    sets: number;
};

const ExerciseDetails = ({ player, reps, sets, duration }: ExerciseDetailsProps) => {
    const { t } = useTranslation();
    const [isTimerActive, setIsTimerActive] = useState(true);
    const [timeLeft, setTimeLeft] = useState(duration);
    const [currentSet, setCurrentSet] = useState(1);
    const [isRestPeriod, setIsRestPeriod] = useState(false);
    const restDuration = 1000 * 60 * 2;

    useEffect(() => {
        setTimeLeft(duration);
        setIsTimerActive(true);
        setIsRestPeriod(false);
        setCurrentSet(1);
    }, [duration, sets]);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;

        if (isTimerActive) {
            interval = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime === 0) {
                        if (!isRestPeriod) {
                            if (currentSet < sets) {
                                setIsRestPeriod(true);
                                return restDuration;
                            } else {
                                setIsTimerActive(false);
                                return 0;
                            }
                        } else {
                            setIsRestPeriod(false);
                            setCurrentSet((prevSet) => prevSet + 1);
                            return duration;
                        }
                    }
                    return prevTime - 1000;
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isTimerActive, isRestPeriod, currentSet, sets, restDuration, duration]);

    const handleButtonPress = () => {
        if (isTimerActive) {
            player.pause();
            setIsTimerActive(false);
        } else {
            player.play();
            setIsTimerActive(true);
        }
    };

    return (
        <View className='w-full pb-[50px]'>
            <View className='flex flex-col items-center justify-center px-6 gap-7'>
                <View className='items-center absolute -top-14'>
                    <Text className='font-manrope-bold text-3xl text-primary'>{formatExerciseTime(timeLeft)}</Text>
                </View>

                <View className='flex flex-row items-center gap-3.5 w-full'>
                    <View className='flex-1 bg-[rgba(245,245,245,0.10)] p-3.5 rounded-2xl w-[110px] h-20 flex flex-col items-start justify-center'>
                        <Text className='font-manrope-medium text-[14.5px] text-secondary-300'>{t("workout.duration")}</Text>
                        <Text className='font-manrope-bold text-lg text-primary'>{formatExerciseTime(duration)}</Text>
                    </View>

                    <TouchableOpacity
                        onPress={handleButtonPress}
                        className='p-5 rounded-full bg-success-500 justify-center items-center'>
                        {!isTimerActive ? (
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
            </View>
        </View>
    );
};

export default ExerciseDetails;
