import React from "react";
import { Card } from "@/components/ui/card";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Progress, ProgressFilledTrack } from "@/components/ui/progress";
import { Icon } from "@/components/ui/icon";
import { Box } from "@/components/ui/box";
import { Shield, Home, BarChart3, Target } from "lucide-react-native";
import { FinancialGoal } from "../types";

interface FinancialGoalCardProps {
  goal: FinancialGoal;
  formatCurrency: (amount: number) => string;
  getGoalIcon: (
    iconName: string
  ) => typeof Shield | typeof Home | typeof BarChart3 | typeof Target;
}

const FinancialGoalCard: React.FC<FinancialGoalCardProps> = ({
  goal,
  formatCurrency,
  getGoalIcon,
}) => {
  return (
    <Card key={goal.id} size="md" variant="elevated" className=" rounded-xl">
      <HStack space="md" className="items-center">
        <Box className="w-12 h-12 bg-background-50 rounded-full items-center justify-center">
          <Icon
            as={getGoalIcon(goal.icon)}
            size="lg"
            className="text-typography-950 "
          />
        </Box>

        <VStack space="md" className="flex-1">
          <HStack space="md" className="items-center">
            <VStack space="xs" className="flex-1">
              <HStack space="sm" className="justify-between items-center">
                <Text size="md" className="text-typography-950 font-semibold">
                  {goal.title}
                </Text>
                <Text size="sm" className="text-typography-600">
                  {goal.deadline}
                </Text>
              </HStack>
              <HStack space="sm" className="justify-between items-center">
                <Text size="sm" className="text-typography-600">
                  {formatCurrency(goal.currentAmount)} of{" "}
                  {formatCurrency(goal.targetAmount)}
                </Text>
                <Text size="sm" className="text-typography-950 font-semibold">
                  {goal.progress}%
                </Text>
              </HStack>
            </VStack>
          </HStack>
          <Progress value={goal.progress} size="xs">
            <ProgressFilledTrack />
          </Progress>
        </VStack>
      </HStack>
    </Card>
  );
};

export default FinancialGoalCard;
