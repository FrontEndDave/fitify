export interface Exercise {
    id?: string;
    name: string;
    color: string;
    accentColor: string;
    textColor: string;
    description: string;
    plDescription: string;
    exercises: number;
    image: string;
    episodes: {
        duration: number;
        name: string;
        video?: string;
        thumbnail?: string;
        reps?: number;
        sets?: number;
    }[];
}

export interface Episode {
    episode: {
        duration: number;
        name: string;
        video?: string;
        thumbnail?: string;
        reps?: number;
        sets?: number;
    }[];
}

export interface User {
    uid: string;
    name: string;
    createdAt: number;
    totalCalories: number;
    totalMinutes: number;
    activeWorkout: {
        workoutId: string;
        currentExerciseIndex: number;
        startTime: number;
    } | null;
    completedWorkouts: {
        [workoutId: string]: {
            [exerciseId: string]: boolean;
        };
    };
    dailyStats: {
        [date: string]: {
            calories: number;
            exercises: string[];
        };
    };
}

export type FirebaseExercisePaths = {
    exercises: () => string;
    exerciseById: (id: string) => string;
};
