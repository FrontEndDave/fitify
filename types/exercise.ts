export type Exercise = {
    id: string;
    name: string;
    description: string;
    calories: number;
    episodes: Episode[];
};

export type Episode = {
    name: string;
    video: string;
    sets: number;
    reps: number;
    duration: number;
};

export type WorkoutProgress = {
    [workoutName: string]: {
        completedEpisodes: string[];
        startTime: number;
        endTime?: number;
    };
};

export type DailyStats = {
    date: string;
    totalCalories: number;
    completedExercises: string[];
};
