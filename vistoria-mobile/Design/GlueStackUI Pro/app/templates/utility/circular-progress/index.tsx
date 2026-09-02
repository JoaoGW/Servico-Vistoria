import React, { useState, useEffect } from "react";
import Svg, { Circle, G } from "react-native-svg";
import { ScrollView } from "@/components/ui/scroll-view";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import {
  Activity,
  Flame,
  Heart,
  Droplet,
  Target,
  TrendingUp,
} from "lucide-react-native";

interface CircularProgressProps {
  size: number;
  strokeWidth: number;
  percentage: number;
  color: string;
  backgroundColor?: string;
  children?: React.ReactNode;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  size,
  strokeWidth,
  percentage,
  color,
  backgroundColor = "#e5e7eb",
  children,
}) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - (animatedPercentage / 100) * circumference;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedPercentage(percentage);
    }, 100);
    return () => clearTimeout(timeout);
  }, [percentage]);

  return (
    <Box
      className="items-center justify-center"
      style={{ width: size, height: size }}
    >
      <Svg width={size} height={size}>
        <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={backgroundColor}
            strokeWidth={strokeWidth}
            fill="none"
          />
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </G>
      </Svg>
      {children && (
        <Box className="absolute items-center justify-center">{children}</Box>
      )}
    </Box>
  );
};

const CircularProgressScreen: React.FC = () => {
  return (
    <Box className="flex-1 bg-background-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box className="px-4 pt-6 pb-8">
          <VStack space="xl">
            {/* Header */}
            <VStack space="sm">
              <Heading size="xl">Circular Progress</Heading>
              <Text size="lg" className="text-typography-400">
                Track your daily goals with circular indicators
              </Text>
            </VStack>

            {/* Main Progress Card */}
            <Card size="md" variant="elevated" className="bg-background-0">
              <VStack space="lg" className="items-center">
                <Heading size="lg">Overall Progress</Heading>

                <CircularProgress
                  size={200}
                  strokeWidth={16}
                  percentage={78}
                  color="#8b5cf6"
                  backgroundColor="#f3e8ff"
                >
                  <VStack space="xs" className="items-center">
                    <Text size="4xl" className="font-bold text-typography-900">
                      78%
                    </Text>
                    <Text size="sm" className="text-typography-600">
                      Complete
                    </Text>
                  </VStack>
                </CircularProgress>

                <Text size="sm" className="text-typography-500">
                  24 of 31 tasks completed
                </Text>
              </VStack>
            </Card>

            {/* Daily Goals Grid */}
            <Card size="md" variant="elevated" className="bg-background-0">
              <VStack space="lg">
                <Heading size="lg">Daily Goals</Heading>

                <HStack space="lg" className="justify-around">
                  <VStack space="sm" className="items-center">
                    <CircularProgress
                      size={120}
                      strokeWidth={10}
                      percentage={85}
                      color="#3b82f6"
                    >
                      <VStack space="xs" className="items-center">
                        <Icon
                          as={Activity}
                          size="xl"
                          className="text-primary-500"
                        />
                        <Text
                          size="xl"
                          className="font-bold text-typography-900"
                        >
                          85%
                        </Text>
                      </VStack>
                    </CircularProgress>
                    <Text size="sm" className="text-typography-600">
                      Steps
                    </Text>
                    <Text size="xs" className="text-typography-500">
                      8,542 / 10,000
                    </Text>
                  </VStack>

                  <VStack space="sm" className="items-center">
                    <CircularProgress
                      size={120}
                      strokeWidth={10}
                      percentage={65}
                      color="#10b981"
                    >
                      <VStack space="xs" className="items-center">
                        <Icon
                          as={Flame}
                          size="xl"
                          className="text-success-500"
                        />
                        <Text
                          size="xl"
                          className="font-bold text-typography-900"
                        >
                          65%
                        </Text>
                      </VStack>
                    </CircularProgress>
                    <Text size="sm" className="text-typography-600">
                      Calories
                    </Text>
                    <Text size="xs" className="text-typography-500">
                      1,625 / 2,500
                    </Text>
                  </VStack>
                </HStack>

                <HStack space="lg" className="justify-around">
                  <VStack space="sm" className="items-center">
                    <CircularProgress
                      size={120}
                      strokeWidth={10}
                      percentage={92}
                      color="#ef4444"
                    >
                      <VStack space="xs" className="items-center">
                        <Icon as={Heart} size="xl" className="text-error-500" />
                        <Text
                          size="xl"
                          className="font-bold text-typography-900"
                        >
                          92%
                        </Text>
                      </VStack>
                    </CircularProgress>
                    <Text size="sm" className="text-typography-600">
                      Heart
                    </Text>
                    <Text size="xs" className="text-typography-500">
                      68 BPM
                    </Text>
                  </VStack>

                  <VStack space="sm" className="items-center">
                    <CircularProgress
                      size={120}
                      strokeWidth={10}
                      percentage={73}
                      color="#06b6d4"
                    >
                      <VStack space="xs" className="items-center">
                        <Icon
                          as={Droplet}
                          size="xl"
                          className="text-info-500"
                        />
                        <Text
                          size="xl"
                          className="font-bold text-typography-900"
                        >
                          73%
                        </Text>
                      </VStack>
                    </CircularProgress>
                    <Text size="sm" className="text-typography-600">
                      Water
                    </Text>
                    <Text size="xs" className="text-typography-500">
                      2.2 / 3.0 L
                    </Text>
                  </VStack>
                </HStack>
              </VStack>
            </Card>

            {/* Small Progress Indicators */}
            <Card size="md" variant="elevated" className="bg-background-0">
              <VStack space="md">
                <Heading size="lg">Project Milestones</Heading>

                <VStack space="lg">
                  <HStack space="md" className="items-center">
                    <CircularProgress
                      size={80}
                      strokeWidth={8}
                      percentage={100}
                      color="#10b981"
                    >
                      <Icon
                        as={Target}
                        size="lg"
                        className="text-success-500"
                      />
                    </CircularProgress>
                    <VStack space="xs" className="flex-1">
                      <Text size="md" className="font-semibold">
                        Phase 1: Planning
                      </Text>
                      <Text size="sm" className="text-typography-600">
                        Completed successfully
                      </Text>
                    </VStack>
                    <Text size="lg" className="font-bold text-success-600">
                      100%
                    </Text>
                  </HStack>

                  <HStack space="md" className="items-center">
                    <CircularProgress
                      size={80}
                      strokeWidth={8}
                      percentage={67}
                      color="#f59e0b"
                    >
                      <Icon
                        as={TrendingUp}
                        size="lg"
                        className="text-warning-500"
                      />
                    </CircularProgress>
                    <VStack space="xs" className="flex-1">
                      <Text size="md" className="font-semibold">
                        Phase 2: Development
                      </Text>
                      <Text size="sm" className="text-typography-600">
                        In progress
                      </Text>
                    </VStack>
                    <Text size="lg" className="font-bold text-warning-600">
                      67%
                    </Text>
                  </HStack>

                  <HStack space="md" className="items-center">
                    <CircularProgress
                      size={80}
                      strokeWidth={8}
                      percentage={0}
                      color="#94a3b8"
                    >
                      <Icon
                        as={Target}
                        size="lg"
                        className="text-typography-400"
                      />
                    </CircularProgress>
                    <VStack space="xs" className="flex-1">
                      <Text size="md" className="font-semibold">
                        Phase 3: Testing
                      </Text>
                      <Text size="sm" className="text-typography-600">
                        Not started
                      </Text>
                    </VStack>
                    <Text size="lg" className="font-bold text-typography-400">
                      0%
                    </Text>
                  </HStack>
                </VStack>
              </VStack>
            </Card>
          </VStack>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default CircularProgressScreen;
