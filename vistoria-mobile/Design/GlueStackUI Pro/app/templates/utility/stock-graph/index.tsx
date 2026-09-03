import { Badge, BadgeIcon, BadgeText } from "@/components/ui/badge";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import React, { useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";
import Svg, { Circle, Line, Polyline, Text as SvgText } from "react-native-svg";

import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  Star,
  TrendingDown,
  TrendingUp,
} from "lucide-react-native";

interface StockData {
  ticker: string;
  name: string;
  currentPrice: number;
  previousClose: number;
  open: number;
  high: number;
  low: number;
  volume: string;
  marketCap: string;
}

interface TimeRange {
  id: string;
  label: string;
  dataPoints: number[];
  labels: string[];
}

interface LineChartProps {
  data: number[];
  labels: string[];
  width: number;
  height: number;
  color: string;
}

const CustomLineChart: React.FC<LineChartProps> = ({
  data,
  labels,
  width,
  height,
  color,
}) => {
  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const minValue = Math.min(...data);
  const maxValue = Math.max(...data);
  const valueRange = maxValue - minValue || 1;

  const points = data
    .map((value, index) => {
      const x = padding + (index / (data.length - 1)) * chartWidth;
      const y =
        padding + chartHeight - ((value - minValue) / valueRange) * chartHeight;
      return `${x},${y}`;
    })
    .join(" ");

  const gridLines = 5;
  const horizontalLines = Array.from({ length: gridLines }, (_, i) => {
    const y = padding + (i / (gridLines - 1)) * chartHeight;
    return y;
  });

  return (
    <Svg width={width} height={height}>
      {/* Horizontal grid lines */}
      {horizontalLines.map((y, i) => (
        <Line
          key={`h-line-${i}`}
          x1={padding}
          y1={y}
          x2={width - padding}
          y2={y}
          stroke="#b6b9bf"
          strokeWidth="1"
          opacity="0.5"
        />
      ))}

      {/* Y-axis labels */}
      {horizontalLines.map((y, i) => {
        const value = maxValue - (i / (gridLines - 1)) * valueRange;
        return (
          <SvgText
            key={`y-label-${i}`}
            x={padding - 10}
            y={y + 4}
            fontSize="10"
            fill="#6b7280"
            textAnchor="end"
          >
            {value.toFixed(0)}
          </SvgText>
        );
      })}

      {/* Line chart */}
      <Polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Data points */}
      {data.map((value, index) => {
        const x = padding + (index / (data.length - 1)) * chartWidth;
        const y =
          padding +
          chartHeight -
          ((value - minValue) / valueRange) * chartHeight;
        return (
          <Circle
            key={`point-${index}`}
            cx={x}
            cy={y}
            r="4"
            fill={color}
            stroke="#ffffff"
            strokeWidth="2"
          />
        );
      })}

      {/* X-axis labels */}
      {labels.map((label, index) => {
        const x = padding + (index / (data.length - 1)) * chartWidth;
        return (
          <SvgText
            key={`x-label-${index}`}
            x={x}
            y={height - padding + 20}
            fontSize="10"
            fill="#6b7280"
            textAnchor="middle"
          >
            {label}
          </SvgText>
        );
      })}
    </Svg>
  );
};

const StockGraphScreen: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("1D");
  const [currentPrice, setCurrentPrice] = useState<number>(248.75);
  const [isWatchlisted, setIsWatchlisted] = useState<boolean>(false);

  const stockData: StockData = {
    ticker: "AAPL",
    name: "Apple Inc.",
    currentPrice: currentPrice,
    previousClose: 245.32,
    open: 246.15,
    high: 250.22,
    low: 245.8,
    volume: "52.4M",
    marketCap: "3.85T",
  };

  const timeRanges: Record<string, TimeRange> = {
    "1D": {
      id: "1d",
      label: "1D",
      dataPoints: [246.15, 247.2, 246.8, 248.5, 247.9, 249.1, 248.75],
      labels: ["9:30", "11:00", "12:30", "14:00", "15:00", "15:30", "16:00"],
    },
    "1W": {
      id: "1w",
      label: "1W",
      dataPoints: [242.5, 244.2, 243.8, 246.2, 247.5, 248.75],
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Now"],
    },
    "1M": {
      id: "1m",
      label: "1M",
      dataPoints: [238.5, 240.2, 242.8, 244.5, 246.2, 247.1, 248.75],
      labels: ["W1", "W2", "W3", "W4", "W5", "W6", "Now"],
    },
    "3M": {
      id: "3m",
      label: "3M",
      dataPoints: [225.5, 230.2, 235.8, 240.2, 245.5, 248.75],
      labels: ["Sep", "Oct", "Nov", "Dec", "Jan", "Now"],
    },
    "1Y": {
      id: "1y",
      label: "1Y",
      dataPoints: [185.2, 195.5, 205.8, 215.2, 225.5, 235.8, 248.75],
      labels: ["Q1", "Q2", "Q3", "Q4", "Q1", "Q2", "Now"],
    },
    ALL: {
      id: "all",
      label: "ALL",
      dataPoints: [120.5, 145.2, 165.8, 185.5, 205.2, 225.8, 248.75],
      labels: ["2019", "2020", "2021", "2022", "2023", "2024", "2025"],
    },
  };

  const periods = ["1D", "1W", "1M", "3M", "1Y", "ALL"];

  const priceChange = stockData.currentPrice - stockData.previousClose;
  const priceChangePercent = (priceChange / stockData.previousClose) * 100;
  const isPositive = priceChange >= 0;

  const { width: screenWidth } = useWindowDimensions();

  // Simulate real-time price updates for 1D view
  useEffect(() => {
    if (selectedPeriod === "1D") {
      const interval = setInterval(() => {
        const change = (Math.random() - 0.5) * 0.5;
        setCurrentPrice((prev) => Number((prev + change).toFixed(2)));
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [selectedPeriod]);

  const renderStatItem = (label: string, value: string) => (
    <VStack space="xs" className="flex-1">
      <Text size="sm" className="text-typography-500">
        {label}
      </Text>
      <Text size="md" className="text-typography-950">
        {value}
      </Text>
    </VStack>
  );

  return (
    <Box className="flex-1 bg-background-0">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box className="px-4 pt-6 pb-8">
          <VStack space="xl">
            {/* Header with Stock Info */}
            <VStack space="md">
         
                <VStack space="xs" className="flex-1">
                  <Heading size="xl">{stockData.ticker}</Heading>
                  <Text size="lg" className="text-typography-400">
                    {stockData.name}
                  </Text>
                </VStack>
        


              {/* Current Price & Change */}
              <HStack space="md" className="items-center">
                <Heading size="2xl">
                  ${stockData.currentPrice.toFixed(2)}
                </Heading>
                <Badge
                  size="sm"
                  className="rounded-md"
                  variant="solid"
                  action={isPositive ? "success" : "error"}
                >
                  <BadgeIcon as={isPositive ? TrendingUp : TrendingDown} />
                  <BadgeText>
                    {isPositive ? "+" : ""}
                    {priceChange.toFixed(2)} ({priceChangePercent.toFixed(2)}%)
                  </BadgeText>
                </Badge>
              </HStack>
            </VStack>

            {/* Time Period Selector */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="-mx-4 px-4"
            >
              <HStack space="sm">
                {periods.map((period) => (
                  <Button
                    key={period}
                    size="md"
                    variant={selectedPeriod === period ? "solid" : "outline"}
                    action={selectedPeriod === period ? "primary" : "secondary"}
                    onPress={() => setSelectedPeriod(period)}
                  >
                    <ButtonText>{period}</ButtonText>
                  </Button>
                ))}
              </HStack>
            </ScrollView>

            {/* Chart Card */}
            <Card size="lg" variant="elevated" className="bg-background-50">
              <VStack space="md">
                <HStack space="sm" className="justify-between items-center">
                  <Text size="md" className="text-typography-600">
                    Price Chart
                  </Text>
                  {selectedPeriod === "1D" && (
                    <Badge size="sm" variant="solid" action="success">
                      <BadgeText>Live</BadgeText>
                    </Badge>
                  )}
                </HStack>

                <Box className="items-center">
                  {screenWidth > 0 && (
                    <CustomLineChart
                      data={timeRanges[selectedPeriod].dataPoints}
                      labels={timeRanges[selectedPeriod].labels}
                      width={screenWidth - 64}
                      height={260}
                      color={isPositive ? "#22c55e" : "#ef4444"}
                    />
                  )}
                </Box>
              </VStack>
            </Card>

            {/* Statistics */}
            <Card size="lg" variant="elevated" className="bg-background-50">
              <VStack space="lg">
                <Heading size="lg">Statistics</Heading>

                <VStack space="md">
                  <HStack space="md">
                    {renderStatItem("Open", `$${stockData.open.toFixed(2)}`)}
                    {renderStatItem("High", `$${stockData.high.toFixed(2)}`)}
                  </HStack>

                  <HStack space="md">
                    {renderStatItem("Low", `$${stockData.low.toFixed(2)}`)}
                    {renderStatItem(
                      "Prev Close",
                      `$${stockData.previousClose.toFixed(2)}`
                    )}
                  </HStack>

                  <HStack space="md">
                    {renderStatItem("Volume", stockData.volume)}
                    {renderStatItem("Market Cap", stockData.marketCap)}
                  </HStack>
                </VStack>
              </VStack>
            </Card>

            {/* Action Buttons */}
            <HStack space="md">
              <Button size="lg" variant="solid" className="flex-1 rounded-xl">
                <ButtonIcon as={ArrowUpRight} />
                <ButtonText>Buy</ButtonText>
              </Button>
              <Button size="lg" variant="solid" className="flex-1 rounded-xl">
                <ButtonIcon as={ArrowDownRight} />
                <ButtonText>Sell</ButtonText>
              </Button>
            </HStack>

            {/* About Section */}
            <Card size="lg" variant="outline" className="bg-background-0">
              <VStack space="md">
                <Heading size="lg">About {stockData.name}</Heading>
                <Text size="md" className="text-typography-600">
                  Apple Inc. designs, manufactures, and markets smartphones,
                  personal computers, tablets, wearables, and accessories
                  worldwide. The company serves consumers, and small and
                  mid-sized businesses; and the education, enterprise, and
                  government markets.
                </Text>
                <Button size="md" variant="link" action="primary">
                  <ButtonText>Read More</ButtonText>
                </Button>
              </VStack>
            </Card>

            {/* Market Status */}
            <Card size="md" variant="outline" className="bg-background-0">
              <HStack space="md" className="items-center">
                <Box className="w-2 h-2 rounded-full bg-success-500" />
                <VStack space="xs" className="flex-1">
                  <Text size="sm" className="text-typography-950">
                    Market Open
                  </Text>
                  <Text size="xs" className="text-typography-500">
                    Closes at 4:00 PM EST
                  </Text>
                </VStack>
              </HStack>
            </Card>
          </VStack>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default StockGraphScreen;
