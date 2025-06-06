import { useAllActiveWorkoutsArray } from "@/hooks/useActiveWorkout";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import CountingText from "../common/CountingText";
import ProgressCircle from "../common/ProgressCircle";

export default function WorkoutProgress() {
    const { t } = useTranslation();
    const { workouts } = useAllActiveWorkoutsArray();

    const totalEpisodesCount = workouts.reduce((total, workout) => total + workout.totalEpisodes, 0);
    const completedEpisodesCount = workouts.reduce((total, workout) => total + (workout.completedEpisodes?.length || 0), 0);

    const progressPercentage = totalEpisodesCount > 0 ? Math.min(100, Math.round((completedEpisodesCount / totalEpisodesCount) * 100)) : 0;

    const currentDate = new Date();
    const dayOfMonth = currentDate.getDate();
    const monthIndex = currentDate.getMonth();
    const monthName = t(`months.${monthIndex}`);

    return (
        <View className='w-full h-[135px] rounded-3xl overflow-hidden mt-5'>
            <LinearGradient
                colors={["#12100E", "#2D3436"]}
                start={[0, 1]}
                end={[1, 0]}
                className='flex-1'>
                <View className='w-full h-full rounded-3xl flex flex-row justify-between items-center px-5'>
                    <View className='flex flex-col gap-2.5 items-start'>
                        <View className='bg-gray-700 px-3 py-1 rounded-full'>
                            <Text className='font-manrope-semibold text-md text-white'>
                                {monthName} {dayOfMonth}
                            </Text>
                        </View>

                        <Text className='font-manrope-bold text-[17px] text-white'>{t("workout-progress.title")}</Text>

                        <View className='flex flex-row items-end gap-1'>
                            <Text className='font-manrope-bold text-xl text-white'>
                                {completedEpisodesCount}/{totalEpisodesCount}
                            </Text>
                            <Text className='font-manrope-semibold text-md text-white opacity-80 pb-0.5'>{t("workout-progress.completed")}</Text>
                        </View>
                    </View>
                    <View className='w-[70px] h-[70px] flex justify-center items-center mr-2.5'>
                        <ProgressCircle
                            size={90}
                            progress={progressPercentage}
                            color='white'
                            backgroundColor='gray'
                            duration={2000}
                        />
                        <CountingText
                            value={progressPercentage}
                            duration={2000}
                            style={{ position: "absolute", fontFamily: "Manrope-Bold", fontSize: 18, color: "white" }}
                            formatter={(v) => `${v}%`}
                        />
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
}
