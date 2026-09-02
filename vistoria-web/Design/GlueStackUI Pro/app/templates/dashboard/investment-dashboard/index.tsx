import React, { useState } from "react";
import { ScrollView } from "@/components/ui/scroll-view";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import {
  TrendingUp,
  TrendingDown,
  Shield,
  Home,
  BarChart3,
  Target,
} from "lucide-react-native";
import {
  mockInvestments,
  mockTrendingStocks,
  mockFinancialGoals,
} from "./data";
import {
  InvestmentCard,
  TrendingStockCard,
  FinancialGoalCard,
} from "./components";

const FinancialDashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<
    "portfolio" | "market" | "goals"
  >("portfolio");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatPercentage = (percentage: number) => {
    const sign = percentage >= 0 ? "+" : "";
    return `${sign}${percentage.toFixed(2)}%`;
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? "text-success-500" : "text-error-500";
  };

  const getChangeIcon = (change: number) => {
    return change >= 0 ? TrendingUp : TrendingDown;
  };

  const getGoalIcon = (iconName: string) => {
    switch (iconName) {
      case "shield":
        return Shield;
      case "home":
        return Home;
      case "trending-up":
        return BarChart3;
      default:
        return Target;
    }
  };

  const getInsightBadgeAction = (impact: string) => {
    switch (impact) {
      case "positive":
        return "success";
      case "negative":
        return "error";
      default:
        return "info";
    }
  };

  return (
    <Box className="flex-1 bg-background-0">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box className="px-4 pt-6 pb-8">
          <VStack space="xl">
            {/* Header */}
            <HStack space="md" className="justify-between items-center">
              <VStack space="xs">
                <Heading size="xl">Financial Dashboard</Heading>
                <Text size="lg" className="text-typography-400">
                  Track your investments and financial goals
                </Text>
              </VStack>
            </HStack>

            {/* Portfolio Overview */}
            <VStack space="lg" className="p-4 bg-background-50 rounded-2xl">
              <HStack space="md" className="justify-between items-center">
                <VStack space="xs">
                  <Text size="lg" className="text-typography-600">
                    Total Portfolio Value
                  </Text>
                  <Heading size="xl">$125,430.50</Heading>
                </VStack>
                <VStack space="xs" className="items-end">
                  <HStack space="xs" className="items-center">
                    <Icon
                      as={TrendingUp}
                      size="sm"
                      className="text-success-700"
                    />
                    <Text size="sm" className="text-success-700">
                      +$1,250.75 (+1.01%)
                    </Text>
                  </HStack>
                </VStack>
              </HStack>

              <HStack space="lg">
                <VStack  className="flex-1">
                  <Text className="text-typography-400">
                    Total Gain
                  </Text>
                  <HStack space="xs" className="items-center">
                    <Icon
                      as={TrendingUp}
                      size="sm"
                      className="text-success-500"
                    />
                    <Text size="lg" className="text-success-700">
                      +$15,430.50
                    </Text>
                  </HStack>
                </VStack>
                <VStack  className="flex-1">
                  <Text  className="text-typography-400">
                    All Time
                  </Text>
                  <Text size="lg" className="text-typography-950">
                    $110,000.00
                  </Text>
                </VStack>
              </HStack>
            </VStack>

            {/* Tab Navigation */}
            <HStack space="xl" className="border-b border-outline-100">
              <Button
                size="md"
                onPress={() => setSelectedTab("portfolio")}
                className={`p-0 rounded-none bg-transparent border-0 border-b-2 ${
                  selectedTab === "portfolio"
                    ? "border-b-primary-500"
                    : "border-b-transparent"
                }`}
              >
                <ButtonText
                  className={
                    selectedTab === "portfolio"
                      ? "text-primary-500"
                      : "text-typography-600"
                  }
                >
                  Portfolio
                </ButtonText>
              </Button>
              <Button
                size="md"
                onPress={() => setSelectedTab("market")}
                className={`p-0 rounded-none bg-transparent border-0 border-b-2 ${
                  selectedTab === "market"
                    ? "border-b-primary-500"
                    : "border-b-transparent"
                }`}
              >
                <ButtonText
                  className={
                    selectedTab === "market"
                      ? "text-primary-500"
                      : "text-typography-600"
                  }
                >
                  Market
                </ButtonText>
              </Button>
              <Button
                size="md"
                onPress={() => setSelectedTab("goals")}
                className={`p-0 rounded-none bg-transparent border-0 border-b-2 ${
                  selectedTab === "goals"
                    ? "border-b-primary-500"
                    : "border-b-transparent"
                }`}
              >
                <ButtonText
                  className={
                    selectedTab === "goals"
                      ? "text-primary-500"
                      : "text-typography-600"
                  }
                >
                  Goals
                </ButtonText>
              </Button>
            </HStack>

            {/* Portfolio Tab */}
            {selectedTab === "portfolio" && (
              <VStack space="lg">
                <Heading size="lg">Your Investments</Heading>

                <VStack space="md">
                  {mockInvestments.map((investment) => (
                    <InvestmentCard
                      key={investment.id}
                      investment={investment}
                      formatCurrency={formatCurrency}
                      formatPercentage={formatPercentage}
                      getChangeColor={getChangeColor}
                      getChangeIcon={getChangeIcon}
                    />
                  ))}
                </VStack>
              </VStack>
            )}

            {/* Market Tab */}
            {selectedTab === "market" && (
              <VStack space="lg">
                <Heading size="lg">Market Insights</Heading>

                <VStack space="md">
                  {mockTrendingStocks.map((stock) => (
                    <TrendingStockCard
                      key={stock.id}
                      stock={stock}
                      formatCurrency={formatCurrency}
                      formatPercentage={formatPercentage}
                      getChangeColor={getChangeColor}
                      getChangeIcon={getChangeIcon}
                    />
                  ))}
                </VStack>
              </VStack>
            )}

            {/* Goals Tab */}
            {selectedTab === "goals" && (
              <VStack space="lg">
                <Heading size="lg">Financial Goals</Heading>

                <VStack space="md">
                  {mockFinancialGoals.map((goal) => (
                    <FinancialGoalCard
                      key={goal.id}
                      goal={goal}
                      formatCurrency={formatCurrency}
                      getGoalIcon={getGoalIcon}
                    />
                  ))}
                </VStack>
              </VStack>
            )}
          </VStack>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default FinancialDashboard;
