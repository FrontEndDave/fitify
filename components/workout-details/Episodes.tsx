import { View, Text } from "react-native";
import React from "react";
import { VideoIcon } from "@/assets/svg/Video";
import EpisodeCard from "./EpisodeCard";
import { Episode } from "@/types";

function formatExerciseTime(milliseconds: number): string {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
        const parts = [];
        if (hours > 0) parts.push(`${hours} h`);
        if (minutes > 0) parts.push(`${minutes} min`);
        if (seconds > 0) parts.push(`${seconds} s`);
        return parts.join(" ");
    }

    return seconds > 0 ? `${minutes} min ${seconds} s` : `${minutes} min`;
}

export default function Episodes({ episode }: Episode) {
    const getEpisodeTime = (episode: { duration: number; name: string; video?: string }[]) => {
        return episode.reduce((acc, episode) => acc + episode.duration * 60 * 1000, 0);
    };

    return (
        <View className='mt-8'>
            <View className='flex flex-row justify-between items-center'>
                <Text className='font-manrope-bold text-[19px] text-secondary-500'>All Episode</Text>
                <View className='flex flex-row items-center space-x-2'>
                    <VideoIcon
                        width={14}
                        height={14}
                        color={"#6C7278"}
                    />
                    <Text className='font-manrope-medium text-[17px] text-secondary-400 tracking-tight'>{formatExerciseTime(getEpisodeTime(episode))}</Text>
                </View>
            </View>

            <View className='flex flex-col gap-3 items-center justify-center mt-4 pb-5'>
                {episode.map((item, key) => (
                    <EpisodeCard
                        key={key}
                        episodes={episode}
                        title={item.name}
                        reps={item.reps}
                        sets={item.sets}
                        completed={false}
                        time={item.duration * 60 * 1000}
                        video={item.video}
                        thumbnail={
                            item.thumbnail ??
                            "https://res.cloudinary.com/peloton-cycle/image/fetch/f_auto,c_limit,w_3840,q_90/https://images.ctfassets.net/6ilvqec50fal/JdeBsAsNI2XepyM4IDL1U/ef2c96e26f7c3af5bce6db428cd1237f/Screenshot_2024-03-21_at_12.36.05_PM.png"
                        }
                    />
                ))}
            </View>
        </View>
    );
}
