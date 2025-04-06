export interface Exercise {
    id?: string;
    name: string;
    color: string;
    accentColor: string;
    textColor: string;
    description: string;
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
    createdAt: number;
    totalCalories: number;
    totalMinutes: number;
}

export type FirebaseExercisePaths = {
    exercises: () => string;
    exerciseById: (id: string) => string;
};
