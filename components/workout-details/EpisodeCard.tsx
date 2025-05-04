import { router } from "expo-router";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";

import { PlayIcon } from "@/assets/svg/Controls";
import { CompleteIcon, IncompleteIcon } from "@/assets/svg/Status";
import { VideoIcon } from "@/assets/svg/Video";

function formatExerciseTime(milliseconds: number): string {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return seconds > 0 ? `${minutes} min ${seconds} s` : `${minutes} min`;
}

interface EpisodeCardProps {
    episodes: any[];
    title: string;
    time: number;
    completed: boolean;
    thumbnail?: string;
    video?: string;
    reps?: number;
    sets?: number;
}

export default function EpisodeCard({ title, time, completed, thumbnail, video, reps, sets, episodes }: EpisodeCardProps) {
    return (
        <TouchableOpacity
            onPress={() =>
                router.push({
                    pathname: "/workout/[name]",
                    params: { name: title, video: video, reps: reps ?? 6, sets: sets ?? 2, episodes: JSON.stringify(episodes), duration: time },
                })
            }
            className='bg-primary w-full p-4 rounded-2xl flex flex-row items-center justify-between'>
            <View className='flex flex-row items-center gap-2.5'>
                {completed ? (
                    <CompleteIcon
                        width={28}
                        height={28}
                        color={"#44D1BB"}
                    />
                ) : (
                    <IncompleteIcon
                        width={28}
                        height={28}
                    />
                )}
                <View className='flex flex-col gap-1.5'>
                    <Text className='font-manrope-bold text-lg text-secondary-500 tracking-tight'>{title}</Text>
                    <View className='flex flex-row items-center gap-1.5'>
                        <VideoIcon
                            width={13}
                            height={13}
                            color={"#ACB5BB"}
                        />
                        <Text className='font-manrope-semibold text-base text-secondary-300 tracking-tight'>{formatExerciseTime(time)}</Text>
                    </View>
                </View>
            </View>

            <View className='bg-black w-[75px] h-[55px] rounded-lg flex justify-center items-center overflow-hidden'>
                <ImageBackground
                    source={{ uri: thumbnail }}
                    className='w-full h-full rounded-lg flex justify-center items-center'>
                    <View className='bg-white/50 rounded-full p-1.5 flex justify-center items-center'>
                        <PlayIcon
                            width={16}
                            height={16}
                        />
                    </View>
                </ImageBackground>
            </View>
        </TouchableOpacity>
    );
}
