import { useActiveWorkout } from "@/hooks/useActiveWorkout";
import { useRouter } from "expo-router";
import { Button } from "react-native";

interface Props {
    name: string;
    exercise: any;
}

const WorkoutButton = ({ name, exercise }: Props) => {
    const router = useRouter();
    const { activeWorkout, startWorkout } = useActiveWorkout(name);

    const handlePress = () => {
        const episodeNames = exercise.episodes.filter(Boolean).map((ep: any) => ep.name);

        if (!activeWorkout) {
            startWorkout(episodeNames);
        }

        const incompleteEpisode = episodeNames.find((epName: string) => !(activeWorkout?.completedEpisodes || []).includes(epName));

        const firstEpisode = incompleteEpisode || episodeNames[0];
        const targetEpisode = exercise.episodes.find((ep: any) => ep?.name === firstEpisode);

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
        <Button
            title={activeWorkout ? "Kontynuuj ćwiczenie" : "Rozpocznij ćwiczenie"}
            onPress={handlePress}
        />
    );
};

export default WorkoutButton;
