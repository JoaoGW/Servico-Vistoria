import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useTheme } from "@/utils/theme-context";
import React, { useState, useEffect } from "react";
import { useWindowDimensions, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import {
  CategoryCard,
  FinanceOverviewCard,
  TransactionCard,
} from "./components";
import {
  mockCategorySummary,
  mockChartData,
  mockFinanceOverview,
  mockTransactions,
} from "./data";

const FinanceDashboard: React.FC = () => {
  const { width: windowWidth } = useWindowDimensions();
  const [screenWidth, setScreenWidth] = useState<number>(350); // Default fallback width
  const [selectedTab, setSelectedTab] = useState<"transactions" | "categories">(
    "transactions"
  );

  useEffect(() => {
    // Handle initial dimension setup and changes
    const updateDimensions = () => {
      const { width } = Dimensions.get("window");
      if (width > 0) {
        setScreenWidth(width);
      } else if (windowWidth > 0) {
        setScreenWidth(windowWidth);
      }
    };

    // Set initial dimensions
    updateDimensions();

    // Listen for dimension changes
    const subscription = Dimensions.addEventListener(
      "change",
      updateDimensions
    );

    return () => subscription?.remove();
  }, [windowWidth]);

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };
  const { colorMode } = useTheme();
  const chartConfig = {
    backgroundColor: colorMode === "dark" ? "#000000" : "#ffffff",
    backgroundGradientFrom: colorMode === "dark" ? "#000000" : "#ffffff",
    backgroundGradientTo: colorMode === "dark" ? "#000000" : "#ffffff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "4",
      strokeWidth: "2",
      stroke: "#3b82f6",
    },
    propsForBackgroundLines: {
      strokeDasharray: "",
      stroke: `rgba(255, 255, 255,0.3)`,
      strokeWidth: 1,
    },
  };

  const chartData = {
    labels: mockChartData.map((point) => point.date),
    datasets: [
      {
        data: mockChartData.map((point) => point.value / 1000), // Convert to thousands
        color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
        strokeWidth: 3,
      },
    ],
  };

  return (
    <Box className="flex-1 bg-background-0">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box className="px-4 pt-6 pb-8">
          <VStack space="xl">
            {/* Header */}

            <VStack space="xs">
              <Heading size="xl">Finance Dashboard</Heading>
              <Text size="lg" className="text-typography-400">
                Track your financial health and spending
              </Text>
            </VStack>

            {/* Finance Overview */}
            <FinanceOverviewCard
              overview={mockFinanceOverview}
              formatCurrency={formatCurrency}
              formatPercentage={formatPercentage}
            />

            {/* Balance Trend Chart */}

            <VStack space="md">
              <HStack space="md" className="justify-between items-center">
                <VStack space="xs">
                  <Heading size="lg">Balance Trend</Heading>
                  <Text size="md" className="text-typography-400">
                    Last 7 months
                  </Text>
                </VStack>
              </HStack>
              <Box className="items-center justify-center">
                {screenWidth > 0 && (
                  <LineChart
                    data={chartData}
                    width={screenWidth - 32}
                    height={220}
                    chartConfig={chartConfig}
                    bezier
                    style={{
                      marginVertical: 8,
                      borderRadius: 16,
                      marginLeft: -30,
                    }}
                    withDots={true}
                    withShadow={false}
                    withScrollableDot={false}
                    withInnerLines={true}
                    withOuterLines={true}
                    withVerticalLines={false}
                    withHorizontalLines={true}
                    segments={4}
                  />
                )}
              </Box>
            </VStack>

            {/* Tab Navigation */}
            <HStack space="xl" className="border-b border-outline-100">
              <Button
                size="md"
                onPress={() => setSelectedTab("transactions")}
                className={`p-0 rounded-none bg-transparent border-0 border-b-2 ${
                  selectedTab === "transactions"
                    ? "border-b-primary-500"
                    : "border-b-transparent"
                }`}
              >
                <ButtonText
                  className={
                    selectedTab === "transactions"
                      ? "text-primary-500"
                      : "text-typography-600"
                  }
                >
                  Recent Transactions
                </ButtonText>
              </Button>
              <Button
                size="md"
                onPress={() => setSelectedTab("categories")}
                className={`p-0 rounded-none bg-transparent border-0 border-b-2 ${
                  selectedTab === "categories"
                    ? "border-b-primary-500"
                    : "border-b-transparent"
                }`}
              >
                <ButtonText
                  className={
                    selectedTab === "categories"
                      ? "text-primary-500"
                      : "text-typography-600"
                  }
                >
                  Spending by Category
                </ButtonText>
              </Button>
            </HStack>

            {/* Transactions Tab */}
            {selectedTab === "transactions" && (
              <VStack space="lg">
                <HStack space="md" className="justify-between items-center">
                  <Heading size="lg">Recent Transactions</Heading>
                  <Button size="sm" variant="link" action="primary">
                    <ButtonText>View All</ButtonText>
                  </Button>
                </HStack>

                <VStack space="xl">
                  {mockTransactions.slice(0, 5).map((transaction) => (
                    <TransactionCard
                      key={transaction.id}
                      transaction={transaction}
                      formatCurrency={formatCurrency}
                      formatDate={formatDate}
                    />
                  ))}
                </VStack>
              </VStack>
            )}

            {/* Categories Tab */}
            {selectedTab === "categories" && (
              <VStack space="lg">
                <HStack space="md" className="justify-between items-center">
                  <Heading size="lg">Spending by Category</Heading>
                  <Text size="sm" className="text-typography-600">
                    This month
                  </Text>
                </HStack>

                <VStack space="xl">
                  {mockCategorySummary.map((category) => (
                    <CategoryCard
                      key={category.category}
                      category={category}
                      formatCurrency={formatCurrency}
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

export default FinanceDashboard;
