import {
  WorkoutStats,
  RecentWorkout,
  HeartRateData,
  NutritionData,
} from "./types";

export const mockWorkoutStats: WorkoutStats[] = [
  {
    id: "1",
    name: "Steps Today",
    value: 12450,
    unit: "steps",
    change: 8.2,
    icon: "Footprints",
  },
  {
    id: "2",
    name: "Calories Burned",
    value: 420,
    unit: "cal",
    change: 12.5,
    icon: "Flame",
  },
  {
    id: "3",
    name: "Active Minutes",
    value: 45,
    unit: "min",
    change: -2.1,
    icon: "Clock",
  },
  {
    id: "4",
    name: "Distance",
    value: 8.2,
    unit: "km",
    change: 5.7,
    icon: "MapPin",
  },
];

export const weeklyStepsData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      data: [8500, 9200, 11800, 12450, 15600, 13200, 9800],
    },
  ],
};

export const weeklyCaloriesData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      data: [320, 380, 420, 450, 520, 480, 360],
    },
  ],
};

export const recentWorkouts: RecentWorkout[] = [
  {
    id: "1",
    name: "Morning Run",
    duration: "32 min",
    calories: 280,
    type: "Cardio",
    date: "Today",
  },
  {
    id: "2",
    name: "Strength Training",
    duration: "45 min",
    calories: 180,
    type: "Strength",
    date: "Yesterday",
  },
  {
    id: "3",
    name: "Yoga Session",
    duration: "25 min",
    calories: 120,
    type: "Flexibility",
    date: "2 days ago",
  },
];

// Heart Rate Data
export const heartRateData: HeartRateData = {
  resting: 62,
  max: 180,
  current: 85,
  zone: "Fat Burn",
};

export const hourlyHeartRateData = {
  labels: ["6AM", "9AM", "12PM", "3PM", "6PM", "9PM"],
  datasets: [
    {
      data: [65, 72, 78, 85, 88, 70],
    },
  ],
};

// Nutrition Data
export const nutritionData: NutritionData = {
  protein: 45,
  carbs: 35,
  fat: 20,
  fiber: 25,
};
