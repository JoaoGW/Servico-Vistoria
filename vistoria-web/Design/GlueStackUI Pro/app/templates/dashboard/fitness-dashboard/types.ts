export interface WorkoutStats {
  id: string;
  name: string;
  value: number;
  unit: string;
  change: number;
  icon: string;
}

export interface RecentWorkout {
  id: string;
  name: string;
  duration: string;
  calories: number;
  type: string;
  date: string;
}

export interface HeartRateData {
  resting: number;
  max: number;
  current: number;
  zone: string;
}

export interface NutritionData {
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}
