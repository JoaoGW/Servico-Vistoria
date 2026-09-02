import React from "react";
import { Card } from "@/components/ui/card";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import {
  Avatar,
  AvatarImage,
  AvatarFallbackText,
} from "@/components/ui/avatar";
import { Icon } from "@/components/ui/icon";
import { TrendingUp, TrendingDown } from "lucide-react-native";
import { Investment } from "../types";

interface InvestmentCardProps {
  investment: Investment;
  formatCurrency: (amount: number) => string;
  formatPercentage: (percentage: number) => string;
  getChangeColor: (change: number) => string;
  getChangeIcon: (change: number) => typeof TrendingUp | typeof TrendingDown;
}

const InvestmentCard: React.FC<InvestmentCardProps> = ({
  investment,
  formatCurrency,
  formatPercentage,
  getChangeColor,
  getChangeIcon,
}) => {
  return (
    <Card
      key={investment.id}
      size="sm"
      variant="elevated"
      className="bg-background-0 rounded-lg"
    >
      <HStack space="md" className="items-center">
        <Avatar size="sm">
          <AvatarFallbackText>{investment.symbol}</AvatarFallbackText>
          <AvatarImage source={{ uri: investment.logo }} />
        </Avatar>
        <VStack space="xs" className="flex-1">
          <HStack space="sm" className="justify-between items-center">
            <VStack >
              <Text size="md" className="text-typography-950 font-semibold">
                {investment.symbol}
              </Text>
              <Text size="sm" className="text-typography-600">
                {investment.name}
              </Text>
            </VStack>
            <VStack space="xs" className="items-end">
              <Text size="md" className="text-typography-950 font-semibold">
                {formatCurrency(investment.value)}
              </Text>
              <HStack space="xs" className="items-center">
                <Icon
                  as={getChangeIcon(investment.change)}
                  size="xs"
                  className={getChangeColor(investment.change)}
                />
                <Text size="sm" className={getChangeColor(investment.change)}>
                  {formatPercentage(investment.changePercentage)}
                </Text>
              </HStack>
            </VStack>
          </HStack>
        </VStack>
      </HStack>
    </Card>
  );
};

export default InvestmentCard;
