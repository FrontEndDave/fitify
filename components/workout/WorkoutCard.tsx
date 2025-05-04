import { PlayIcon } from "@/assets/svg/Controls";
import { CompleteIcon, IncompleteIcon } from "@/assets/svg/Status";
import { VideoIcon } from "@/assets/svg/Video";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";

interface EpisodeCardProps {
    title: string;
    time: number;
    completed: boolean;
    thumbnail?: string;
}

function formatExerciseTime(milliseconds: number): string {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return seconds > 0 ? `${minutes} min ${seconds} s` : `${minutes} min`;
}

export default function WorkoutCard({ title, time, completed, thumbnail }: EpisodeCardProps) {
    return (
        <TouchableOpacity className='bg-[rgba(29,32,35,0.95)] w-full p-4 rounded-3xl flex flex-row items-center justify-between'>
            <View className='flex flex-row items-center gap-2.5'>
                {completed ? (
                    <CompleteIcon
                        width={28}
                        height={28}
                        color='#44D1BB'
                    />
                ) : (
                    <IncompleteIcon
                        width={28}
                        height={28}
                        color='#6C7278'
                        strokeColor={"rgba(59,52,55,0.95)"}
                    />
                )}
                <View className='flex flex-col gap-1.5'>
                    <Text className='font-manrope-bold text-lg text-primary tracking-[-0.24px]'>{title}</Text>
                    <View className='flex flex-row items-center gap-1.5'>
                        <VideoIcon
                            width={13}
                            height={13}
                            color='#ACB5BB'
                        />
                        <Text className='font-manrope-semibold text-base text-secondary-300 tracking-[-0.45px]'>{formatExerciseTime(time)}</Text>
                    </View>
                </View>
            </View>

            <View className='bg-black w-[75px] h-[55px] rounded-xl flex justify-center items-center overflow-hidden'>
                <ImageBackground
                    source={{ uri: thumbnail }}
                    className='w-full h-full rounded-xl flex justify-center items-center'>
                    <View className='bg-[rgba(255,255,255,0.50)] rounded-full p-1.5 flex justify-center items-center'>
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
