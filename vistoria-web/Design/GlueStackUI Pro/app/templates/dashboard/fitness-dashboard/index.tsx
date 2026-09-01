import { Badge, BadgeText } from "@/components/ui/badge";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useTheme } from "@/utils/theme-context";
import {
  Activity,
  Clock,
  Flame,
  Footprints,
  MapPin,
  TrendingDown,
  TrendingUp,
} from "lucide-react-native";
import React, { useState } from "react";
import { useWindowDimensions } from "react-native";
import { LineChart, PieChart } from "react-native-chart-kit";
import {
  hourlyHeartRateData,
  mockWorkoutStats,
  nutritionData,
  recentWorkouts,
  weeklyCaloriesData,
  weeklyStepsData,
} from "./data";

const FitnessDashboard: React.FC = () => {
  const { width: screenWidth } = useWindowDimensions();
  const [selectedTab, setSelectedTab] = useState<
    "steps" | "calories" | "heart" | "nutrition"
  >("steps");

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  };

  const formatPercentage = (percentage: number) => {
    const sign = percentage >= 0 ? "+" : "";
    return `${sign}${percentage.toFixed(1)}%`;
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? "text-success-500" : "text-error-500";
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "Footprints":
        return Footprints;
      case "Flame":
        return Flame;
      case "Clock":
        return Clock;
      case "MapPin":
        return MapPin;
      default:
        return Activity;
    }
  };

  const getWorkoutTypeColor = (type: string) => {
    switch (type) {
      case "Cardio":
        return "success";
      case "Strength":
        return "primary";
      case "Flexibility":
        return "info";
      default:
        return "secondary";
    }
  };
  const { colorMode } = useTheme();

  const getCurrentData = () => {
    switch (selectedTab) {
      case "steps":
        return weeklyStepsData;
      case "calories":
        return weeklyCaloriesData;
      case "heart":
        return hourlyHeartRateData;
      default:
        return weeklyStepsData;
    }
  };

  const getNutritionChartData = () => {
    return [
      {
        name: "Protein",
        population: nutritionData.protein,
        color: "#3b82f6",
        legendFontColor: "#7F7F7F",
        legendFontSize: 12,
      },
      {
        name: "Carbs",
        population: nutritionData.carbs,
        color: "#10b981",
        legendFontColor: "#7F7F7F",
        legendFontSize: 12,
      },
      {
        name: "Fat",
        population: nutritionData.fat,
        color: "#f59e0b",
        legendFontColor: "#7F7F7F",
        legendFontSize: 12,
      },
      {
        name: "Fiber",
        population: nutritionData.fiber,
        color: "#8b5cf6",
        legendFontColor: "#7F7F7F",
        legendFontSize: 12,
      },
    ];
  };

  const getTabTitle = () => {
    switch (selectedTab) {
      case "steps":
        return "Weekly Steps";
      case "calories":
        return "Weekly Calories";
      case "heart":
        return "Heart Rate";
      case "nutrition":
        return "Nutrition";
      default:
        return "Weekly Steps";
    }
  };

  const getChartConfig = () => {
    const getColor = (opacity = 1) => {
      switch (selectedTab) {
        case "steps":
          return `rgba(59, 130, 246, ${opacity})`;
        case "calories":
          return `rgba(239, 68, 68, ${opacity})`;
        case "heart":
          return `rgba(239, 68, 68, ${opacity})`;
        case "nutrition":
          return `rgba(34, 197, 94, ${opacity})`;
        default:
          return `rgba(59, 130, 246, ${opacity})`;
      }
    };

    return {
      backgroundColor: colorMode === "dark" ? "#000000" : "#ffffff",
      backgroundGradientFrom: colorMode === "dark" ? "#000000" : "#ffffff",
      backgroundGradientTo: colorMode === "dark" ? "#000000" : "#ffffff",
      decimalPlaces: 0,
      color: getColor,
      labelColor: (opacity = 1) =>
        colorMode === "dark"
          ? `rgba(255, 255, 255, ${opacity})`
          : `rgba(0, 0, 0, ${opacity})`,
      style: {
        borderRadius: 16,
      },
      propsForDots: {
        r: "4",
        strokeWidth: "2",
        stroke:
          selectedTab === "steps"
            ? "#3b82f6"
            : selectedTab === "nutrition"
            ? "#22c55e"
            : "#ef4444",
      },
    };
  };

  return (
    <Box className="flex-1 bg-background-0 pb-safe">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box className="px-4 pt-6 pb-8">
          <VStack space="xl">
            {/* Header */}
            <VStack space="sm">
              <Heading size="xl">Fitness Dashboard</Heading>
              <Text size="lg" className="text-typography-400">
                Track your daily fitness progress
              </Text>
            </VStack>

            {/* Stats Overview */}
            <VStack space="md">
              <Heading size="lg" className="mb-2">
                Today's Stats
              </Heading>
              <VStack space="xl" className="mb-2">
                {mockWorkoutStats.map((stat) => {
                  const IconComponent = getIconComponent(stat.icon);
                  return (
                    <HStack
                      key={stat.id}
                      space="md"
                      className="items-center justify-between"
                    >
                      <HStack space="md" className="items-center">
                        <Box className="p-3 bg-background-50 rounded-xl">
                          <Icon
                            as={IconComponent}
                            size="lg"
                            className="text-typography-950"
                          />
                        </Box>
                        <VStack space="xs">
                          <Text size="sm" className="text-typography-500">
                            {stat.name}
                          </Text>
                          <HStack space="xs" className="items-baseline">
                            <Text
                              size="xl"
                              className="text-typography-950 font-semibold"
                            >
                              {formatNumber(stat.value)}
                            </Text>
                            <Text size="sm" className="text-typography-500">
                              {stat.unit}
                            </Text>
                          </HStack>
                        </VStack>
                      </HStack>
                      <HStack space="xs" className="items-center">
                        <Icon
                          as={stat.change >= 0 ? TrendingUp : TrendingDown}
                          size="sm"
                          className={getChangeColor(stat.change)}
                        />
                        <Text size="sm" className={getChangeColor(stat.change)}>
                          {formatPercentage(stat.change)}
                        </Text>
                      </HStack>
                    </HStack>
                  );
                })}
              </VStack>
            </VStack>

            {/* Tabbed Analytics Section */}
            <VStack space="md">
              <Heading size="lg">{getTabTitle()}</Heading>

              {/* Tab Navigation */}
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <HStack space="xl" className="px-1">
                  <Button
                    size="sm"
                    className={`bg-transparent rounded-none p-0 ${
                      selectedTab === "steps"
                        ? "border-b-2 border-primary-500"
                        : "border-b-2 border-transparent"
                    }`}
                    onPress={() => setSelectedTab("steps")}
                  >
                    <ButtonText
                      className={`${
                        selectedTab === "steps"
                          ? "text-primary-500"
                          : "text-typography-600"
                      }`}
                    >
                      Steps
                    </ButtonText>
                  </Button>
                  <Button
                    size="sm"
                    className={`bg-transparent rounded-none p-0 ${
                      selectedTab === "calories"
                        ? "border-b-2 border-primary-500"
                        : "border-b-2 border-transparent"
                    }`}
                    onPress={() => setSelectedTab("calories")}
                  >
                    <ButtonText
                      className={`${
                        selectedTab === "calories"
                          ? "text-primary-500"
                          : "text-typography-600"
                      }`}
                    >
                      Calories
                    </ButtonText>
                  </Button>
                  <Button
                    size="sm"
                    className={`bg-transparent rounded-none p-0 ${
                      selectedTab === "heart"
                        ? "border-b-2 border-primary-500"
                        : "border-b-2 border-transparent"
                    }`}
                    onPress={() => setSelectedTab("heart")}
                  >
                    <ButtonText
                      className={`${
                        selectedTab === "heart"
                          ? "text-primary-500"
                          : "text-typography-600"
                      }`}
                    >
                      Heart
                    </ButtonText>
                  </Button>
                  <Button
                    size="sm"
                    className={`bg-transparent rounded-none p-0 ${
                      selectedTab === "nutrition"
                        ? "border-b-2 border-primary-500"
                        : "border-b-2 border-transparent"
                    }`}
                    onPress={() => setSelectedTab("nutrition")}
                  >
                    <ButtonText
                      className={`${
                        selectedTab === "nutrition"
                          ? "text-primary-500"
                          : "text-typography-600"
                      }`}
                    >
                      Nutrition
                    </ButtonText>
                  </Button>
                </HStack>
              </ScrollView>

              {/* Tab Content */}

              <VStack className="py-4">
                {/* Heart Rate Tab */}
                {selectedTab === "heart" && (
                  <>
                    <Box className="py-4">
                      {screenWidth > 0 && (
                        <LineChart
                          data={getCurrentData()}
                          width={screenWidth - 80}
                          height={180}
                          chartConfig={getChartConfig()}
                          bezier
                          style={{
                            marginVertical: 8,
                            borderRadius: 16,
                          }}
                        />
                      )}
                    </Box>
                  </>
                )}

                {/* Nutrition Tab */}
                {selectedTab === "nutrition" && (
                  <>
                    <Box className="py-4">
                      {screenWidth > 0 && (
                        <PieChart
                          data={getNutritionChartData()}
                          width={screenWidth - 80}
                          height={200}
                          chartConfig={{
                            color: (opacity = 1) =>
                              `rgba(255, 255, 255, ${opacity})`,
                          }}
                          accessor="population"
                          backgroundColor="transparent"
                          paddingLeft="15"
                          style={{
                            marginVertical: 8,
                            borderRadius: 16,
                          }}
                        />
                      )}
                    </Box>
                  </>
                )}

                {/* Steps and Calories Tabs */}
                {(selectedTab === "steps" || selectedTab === "calories") && (
                  <Box className="py-6">
                    {screenWidth > 0 && (
                      <LineChart
                        data={getCurrentData()}
                        width={screenWidth - 80}
                        height={220}
                        chartConfig={getChartConfig()}
                        bezier
                        style={{
                          marginVertical: 8,
                          borderRadius: 16,
                        }}
                      />
                    )}
                  </Box>
                )}
              </VStack>
            </VStack>

            {/* Recent Workouts */}
            <VStack space="md">
              <Heading size="lg" className="mb-2">
                Recent Workouts
              </Heading>

              <VStack space="xl">
                {recentWorkouts.map((workout) => (
                  <HStack
                    space="md"
                    className="items-center justify-between"
                    key={workout.id}
                  >
                    <VStack space="xs">
                      <Text
                        size="md"
                        className="text-typography-950 font-medium"
                      >
                        {workout.name}
                      </Text>
                      <HStack space="md">
                        <Text size="sm" className="text-typography-500">
                          {workout.duration}
                        </Text>
                        <Text size="sm" className="text-typography-500">
                          {workout.calories} cal
                        </Text>
                      </HStack>
                    </VStack>
                    <VStack space="xs" className="items-end">
                      <Badge
                        size="sm"
                        variant="solid"
                        className="rounded-lg"
                        action={getWorkoutTypeColor(workout.type) as any}
                      >
                        <BadgeText>{workout.type}</BadgeText>
                      </Badge>
                      <Text size="sm" className="text-typography-400">
                        {workout.date}
                      </Text>
                    </VStack>
                  </HStack>
                ))}
              </VStack>
            </VStack>
          </VStack>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default FitnessDashboard;
