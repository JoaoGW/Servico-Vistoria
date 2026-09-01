import React from "react";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { Badge, BadgeText } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { Heading } from "@/components/ui/heading";
import { Progress, ProgressFilledTrack } from "@/components/ui/progress";
import {
  DollarSign,
  ShoppingCart,
  Home,
  Zap,
  Laptop,
  Car,
  Film,
  Heart,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
} from "lucide-react-native";
import { Transaction, CategorySummary } from "./types";

interface TransactionCardProps {
  transaction: Transaction;
  formatCurrency: (amount: number) => string;
  formatDate: (date: string) => string;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({
  transaction,
  formatCurrency,
  formatDate,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "dollar-sign":
        return DollarSign;
      case "shopping-cart":
        return ShoppingCart;
      case "home":
        return Home;
      case "zap":
        return Zap;
      case "laptop":
        return Laptop;
      case "car":
        return Car;
      case "film":
        return Film;
      case "heart":
        return Heart;
      default:
        return DollarSign;
    }
  };

  const IconComponent = getIcon(transaction.icon);

  return (
    <HStack space="md" className="items-center">
      <Box
        className={`w-8 h-8 rounded-full items-center justify-center bg-background-50`}
      >
        <Icon as={IconComponent} size="sm" className={`text-typography-950`} />
      </Box>

      <VStack space="xs" className="flex-1">
        <HStack space="md" className="justify-between items-center">
          <Text size="md" className="text-typography-950">
            {transaction.description}
          </Text>
          <Text
            size="md"
            className={
              transaction.type === "income"
                ? "text-success-600"
                : "text-error-600"
            }
          >
            {transaction.type === "income" ? "+" : "-"}
            {formatCurrency(transaction.amount)}
          </Text>
        </HStack>

        <HStack space="md" className="justify-between items-center">
          <Badge
            size="sm"
            className="rounded"
            action={transaction.type === "income" ? "success" : "error"}
          >
            <BadgeText>{transaction.category}</BadgeText>
          </Badge>
          <Text size="sm" className="text-typography-500">
            {formatDate(transaction.date)}
          </Text>
        </HStack>
      </VStack>
    </HStack>
  );
};

interface CategoryCardProps {
  category: CategorySummary;
  formatCurrency: (amount: number) => string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  formatCurrency,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "home":
        return Home;
      case "shopping-cart":
        return ShoppingCart;
      case "car":
        return Car;
      case "zap":
        return Zap;
      case "film":
        return Film;
      case "heart":
        return Heart;
      case "more-horizontal":
        return MoreHorizontal;
      default:
        return DollarSign;
    }
  };

  const IconComponent = getIcon(category.icon);

  return (
    <HStack space="md" className="justify-between items-center">
      <Box className="w-10 h-10 rounded-full bg-background-50 items-center justify-center">
        <Icon as={IconComponent} size="md" className="text-typography-950" />
      </Box>
      <VStack className="flex-1" space="lg">
        <HStack space="md" className="items-center">
          <VStack>
            <HStack space="md" className="items-center">
              <Text size="md" className="text-typography-950    ">
                {category.category}
              </Text>
              <Text size="sm" className="text-typography-500">
                {category.percentage.toFixed(1)}% of expenses
              </Text>
            </HStack>
            <Text size="lg" className="text-typography-950">
              {formatCurrency(category.amount)}
            </Text>
          </VStack>
        </HStack>

        <Progress value={category.percentage} size="xs">
          <ProgressFilledTrack />
        </Progress>
      </VStack>
    </HStack>
  );
};

interface FinanceOverviewCardProps {
  overview: {
    totalBalance: number;
    monthlyIncome: number;
    monthlyExpenses: number;
    savings: number;
    balanceChange: number;
    balanceChangePercentage: number;
  };
  formatCurrency: (amount: number) => string;
  formatPercentage: (percentage: number) => string;
}

export const FinanceOverviewCard: React.FC<FinanceOverviewCardProps> = ({
  overview,
  formatCurrency,
  formatPercentage,
}) => {
  const getChangeIcon = (change: number) => {
    return change >= 0 ? TrendingUp : TrendingDown;
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? "text-success-600" : "text-error-600";
  };

  const ChangeIcon = getChangeIcon(overview.balanceChange);

  return (
    <Card size="lg" variant="elevated" className="bg-background-50">
      <VStack space="lg">
        {/* Total Balance */}
        <VStack space="xs">
          <Text size="lg" className="text-typography-600">
            Total Balance
          </Text>
          <HStack space="md" className="justify-between items-center">
            <Heading size="2xl">
              {formatCurrency(overview.totalBalance)}
            </Heading>
            <HStack space="xs" className="items-center">
              <Icon
                as={ChangeIcon}
                size="sm"
                className={getChangeColor(overview.balanceChange)}
              />
              <Text
                size="sm"
                className={getChangeColor(overview.balanceChange)}
              >
                {formatPercentage(overview.balanceChangePercentage)}
              </Text>
            </HStack>
          </HStack>
        </VStack>

        {/* Monthly Stats */}
        <HStack space="lg">
          <VStack space="xs" >
            <Text size="md" className="text-typography-400">
              Monthly Income
            </Text>
            <Text size="lg" className="text-success-600">
              {formatCurrency(overview.monthlyIncome)}
            </Text>
          </VStack>
          <VStack space="xs" >
            <Text size="md" className="text-typography-400">
              Monthly Expenses
            </Text>
            <Text size="lg" className="text-success-600">
              {formatCurrency(overview.monthlyExpenses)}
            </Text>
          </VStack>
        </HStack>
      </VStack>
    </Card>
  );
};
