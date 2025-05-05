import { Gradient } from "@/assets/svg/Gradient";
import { GymIcon } from "@/assets/svg/Gym";
import { useDailyStats } from "@/hooks/useDailyStats";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export default function CaloriesActivity() {
    const { t } = useTranslation();
    const { stats } = useDailyStats();

    const formatNumber = (num: number) => {
        const rounded = Math.round(num * 100) / 100;
        return num % 1 === 0 || Number.isInteger(num * 100) ? rounded.toString().replace(/\.0$/, "") : rounded.toFixed(2);
    };

    return (
        <View className='h-full w-[110px] bg-success-500 rounded-[30px] flex flex-col justify-start items-center p-4 gap-3 relative overflow-hidden'>
            <View className='bg-success-600 w-[80px] h-[80px] rounded-[15px] flex justify-center items-center'>
                <GymIcon
                    width={42}
                    height={42}
                />
            </View>

            <View className='flex justify-center items-center flex-col'>
                <Text className='font-manrope-bold text-[26px] text-primary'>{formatNumber(stats.calories)}</Text>
                <Text className='font-manrope-medium text-[17px] text-primary opacity-70'>{t("today-activity.calories")}</Text>
            </View>

            <View className='absolute top-0 left-0 right-0 bottom-[-110px]'>
                <Gradient style={{ width: "100%", height: "100%" }} />
            </View>
        </View>
    );
}
