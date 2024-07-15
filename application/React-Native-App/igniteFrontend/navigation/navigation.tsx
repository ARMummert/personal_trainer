// Filename: navigation.tsx

export type RootStackParamList = {
    HomeScreen: undefined;
    WorkoutScreen: { workouts: Workouts[] };
};

export interface Workouts {
    id: number;
    WorkoutName: string;
    exercises: Exercises[];
}

export interface Exercises {
    exerciseName: string;
    image: string;
    sets: number;
    reps: number;
    instructions: string;
    equipment: string;
}

export interface UsersLogin {
    id: number;
    Username: string;
    Password: string;
}

export interface UserInfo  {
    id: number;
    Name: string;
    Email: string;
    Age: number;
    WorkoutStreak: number;
    WorkoutsCompleted: number;
    Height: number;
    Weight: number;

}