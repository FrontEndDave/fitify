import { useActiveWorkout } from "@/hooks/useActiveWorkout";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
    name: string;
    exercise: any;
}

const WorkoutButton = ({ name, exercise }: Props) => {
    const { t } = useTranslation();
    const router = useRouter();
    const { activeWorkout, startWorkout, resetWorkout } = useActiveWorkout(name);

    const handlePress = () => {
        const episodeNames = exercise.episodes.filter(Boolean).map((ep: any) => ep.name);

        if (!activeWorkout) {
            startWorkout(episodeNames);
        }

        const incompleteEpisode = episodeNames.find((epName: string) => !(activeWorkout?.completedEpisodes || []).includes(epName));

        const firstEpisode = incompleteEpisode || episodeNames[0];
        const targetEpisode = exercise.episodes.find((ep: any) => ep?.name === firstEpisode);

        if (activeWorkout) {
            if (activeWorkout.totalEpisodes === activeWorkout.completedEpisodes?.length) {
                resetWorkout();
            }
        }

        router.push({
            pathname: "/workout/[name]",
            params: {
                name: targetEpisode.name,
                video: targetEpisode.video || "",
                sets: targetEpisode.sets || 0,
                reps: targetEpisode.reps || 0,
                duration: targetEpisode.duration * 60 * 1000 || 8 * 60 * 1000,
                kcal: exercise.kcalPerMinute,
                workoutName: exercise.name,
            },
        });
    };

    return (
        <View className='px-6'>
            <TouchableOpacity
                onPress={handlePress}
                className='rounded-full bg-success-400 w-full py-4 px-6 fixed bottom-0 z-50'>
                <Text className='font-bold text-xl text-primary text-center leading-8'>{t(activeWorkout ? "workout-details.continue" : "workout-details.start")}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default WorkoutButton;
