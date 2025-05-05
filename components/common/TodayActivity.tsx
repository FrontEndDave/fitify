import colors from "@/constants/colors";
import { useDailyStats } from "@/hooks/useDailyStats";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import CaloriesActivity from "./CaloriesActivity";

type ActivityCardProps = {
    name: string;
    description: string;
    color: string;
};

const ActivityCard = ({ name, description, color }: ActivityCardProps) => (
    <View className='flex flex-row items-center justify-between p-4 pr-6 pt-3'>
        <View className='flex flex-row items-start gap-3 flex-1'>
            <View
                style={{ backgroundColor: color }}
                className='w-[9px] h-[22px] rounded-[8px]'
            />
            <View style={{ flexShrink: 1 }}>
                <Text
                    className='font-manrope-bold text-[19px] text-secondary-500'
                    numberOfLines={1}
                    ellipsizeMode='tail'>
                    {name}
                </Text>
                <Text className='font-manrope-medium text-[15px] text-secondary-300'>{description}</Text>
            </View>
        </View>
    </View>
);

export default function TodayActivity() {
    const { t } = useTranslation();
    const { stats } = useDailyStats();

    interface Episode {
        name: string;
        sets: number;
        reps: number;
        isPlaceholder?: boolean;
    }

    const filledEpisodes: Episode[] = React.useMemo(() => {
        const eps: Episode[] = [...stats.episodes];

        while (eps.length < 3) {
            eps.push({
                name: t("today-activity.no-exercise"),
                sets: 0,
                reps: 0,
                isPlaceholder: true,
            });
        }

        return eps.slice(0, 3);
    }, [stats.episodes, t]);
    return (
        <View className='mt-8'>
            <View className='flex flex-row justify-between items-center'>
                <Text className='font-manrope-bold text-[20px] text-secondary-500'>{t("today-activity.title")}</Text>
            </View>

            <View className='flex flex-row gap-4 items-center mt-5 h-[250px] w-full'>
                <CaloriesActivity />

                <View className='h-full flex-1 bg-primary rounded-[30px] flex flex-col justify-evenly'>
                    {filledEpisodes.map((ep, idx) => {
                        const color = idx === 0 ? colors.success_400 : idx === 1 ? colors.information_400 : colors.warning_300;

                        const name = ep.isPlaceholder ? t("today-activity.no-exercise") : ep.name;
                        const description = ep.isPlaceholder ? t("today-activity.no-exercise-description") : `${ep.sets}×${ep.reps}`;

                        return (
                            <ActivityCard
                                key={`${idx}-${name}`}
                                name={name}
                                description={description}
                                color={color}
                            />
                        );
                    })}
                </View>
            </View>
        </View>
    );
}
