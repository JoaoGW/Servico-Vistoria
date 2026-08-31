import React, { useState, useCallback } from "react";
import { FlatList, RefreshControl } from "react-native";
import Svg, { Polyline } from "react-native-svg";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { Badge, BadgeText, BadgeIcon } from "@/components/ui/badge";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Input, InputField, InputSlot, InputIcon } from "@/components/ui/input";
import { Icon } from "@/components/ui/icon";
import {
  Search,
  Star,
  TrendingUp,
  TrendingDown,
  Filter,
} from "lucide-react-native";
import { CryptoData, MiniSparklineProps } from "./types";
import { getCryptoLogo } from "./icons";
import { mockCryptoData } from "./data";

const MiniSparkline: React.FC<MiniSparklineProps> = ({
  data,
  width,
  height,
  color,
}) => {
  const padding = 2;
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

  return (
    <Svg width={width} height={height}>
      <Polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

const CryptoTrackerScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [cryptoList, setCryptoList] = useState<CryptoData[]>(mockCryptoData);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setLastUpdate(new Date());
    }, 1500);
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setCryptoList((prevList) =>
      prevList.map((crypto) =>
        crypto.id === id
          ? { ...crypto, isFavorite: !crypto.isFavorite }
          : crypto
      )
    );
  }, []);

  const formatPrice = (price: number): string => {
    if (price < 1) {
      return `$${price.toFixed(4)}`;
    } else if (price < 100) {
      return `$${price.toFixed(2)}`;
    } else {
      return `$${price.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    }
  };

  const formatMarketCap = (value: number): string => {
    if (value >= 1000000000000) {
      return `$${(value / 1000000000000).toFixed(2)}T`;
    } else if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(2)}B`;
    } else if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    }
    return `$${value.toLocaleString()}`;
  };

  const filteredCryptoList = cryptoList.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderCryptoCard = ({ item }: { item: CryptoData }) => {
    const isPositive = item.priceChangePercent24h >= 0;

    return (
      <Card size="md" variant="elevated" className="bg-background-50 mb-3">
        <HStack space="md" className="items-center">
          {/* Crypto Icon & Info */}
          <VStack space="xs" className="flex-1">
            <HStack space="sm" className="items-center">
              {getCryptoLogo(item.symbol, 32)}
              <VStack space="xs">
                <Heading size="md">{item.symbol}</Heading>
                <Text size="xs" className="text-typography-500">
                  {item.name}
                </Text>
              </VStack>
            </HStack>
          </VStack>

          {/* Mini Chart */}
          <Box className="mx-2">
            <MiniSparkline
              data={item.sparklineData}
              width={100}
              height={40}
              color={isPositive ? "#22c55e" : "#ef4444"}
            />
          </Box>

          {/* Price & Change */}
          <VStack space="xs" className="items-end">
            <Text size="md" className="text-typography-950 font-semibold">
              {formatPrice(item.currentPrice)}
            </Text>
            <Badge
              size="sm"
              variant="solid"
              action={isPositive ? "success" : "error"}
            >
              <BadgeIcon as={isPositive ? TrendingUp : TrendingDown} />
              <BadgeText>
                {isPositive ? "+" : ""}
                {item.priceChangePercent24h.toFixed(2)}%
              </BadgeText>
            </Badge>
          </VStack>

          {/* Favorite Button */}
          <Button
            size="md"
            variant="link"
            action="primary"
            onPress={() => toggleFavorite(item.id)}
            className="ml-2"
          >
            <ButtonIcon
              as={Star}
              className={
                item.isFavorite ? "text-warning-500" : "text-typography-400"
              }
            />
          </Button>
        </HStack>

        {/* Additional Stats */}
        <Box className="mt-3 pt-3 border-t border-outline-100">
          <HStack space="md" className="justify-between">
            <VStack space="xs">
              <Text size="xs" className="text-typography-500">
                Market Cap
              </Text>
              <Text size="sm" className="text-typography-950">
                {formatMarketCap(item.marketCap)}
              </Text>
            </VStack>
            <VStack space="xs" className="items-end">
              <Text size="xs" className="text-typography-500">
                24h Volume
              </Text>
              <Text size="sm" className="text-typography-950">
                {formatMarketCap(item.volume24h)}
              </Text>
            </VStack>
            <VStack space="xs" className="items-end">
              <Text size="xs" className="text-typography-500">
                24h Change
              </Text>
              <Text
                size="sm"
                className={isPositive ? "text-success-600" : "text-error-600"}
              >
                {isPositive ? "+" : ""}
                {formatPrice(Math.abs(item.priceChange24h))}
              </Text>
            </VStack>
          </HStack>
        </Box>
      </Card>
    );
  };

  const totalMarketCap = cryptoList.reduce(
    (sum, crypto) => sum + crypto.marketCap,
    0
  );

  return (
    <Box className="flex-1 bg-background-0">
      <VStack space="md" className="px-4 pt-6 pb-4 min-h-fit">
        {/* Header */}
        <VStack space="sm">
          <HStack space="md" className="justify-between items-start">
            <VStack space="sm" className="flex-1">
              <Heading size="xl">Crypto Tracker</Heading>
              <Text size="lg" className="text-typography-400">
                Live cryptocurrency prices
              </Text>
            </VStack>
            <Badge size="sm" variant="solid" action="success">
              <BadgeText>Live</BadgeText>
            </Badge>
          </HStack>
        </VStack>

        {/* Market Stats Card */}
        <Card size="md" variant="elevated" className="bg-primary-50">
          <VStack space="sm">
            <Text size="sm" className="text-primary-700">
              Total Market Cap
            </Text>
            <Heading size="2xl" className="text-primary-950">
              {formatMarketCap(totalMarketCap)}
            </Heading>
            <Text size="xs" className="text-primary-600">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </Text>
          </VStack>
        </Card>

        {/* Search & Filter */}
        <HStack space="md" className="items-center">
          <Input size="xl" variant="outline" className="flex-1">
            <InputSlot className="pl-3">
              <InputIcon as={Search} />
            </InputSlot>
            <InputField
              placeholder="Search crypto..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </Input>
          <Button size="lg" variant="outline" action="secondary">
            <ButtonIcon as={Filter} />
          </Button>
        </HStack>
      </VStack>

      {/* Crypto List */}
      <FlatList
        data={filteredCryptoList}
        renderItem={renderCryptoCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 24,
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#3b82f6"
          />
        }
        ListEmptyComponent={
          <Card size="lg" variant="outline" className="bg-background-0 mt-8">
            <VStack space="md" className="items-center py-8">
              <Icon as={Search} size="xl" className="text-typography-400" />
              <VStack space="xs" className="items-center">
                <Text size="lg" className="text-typography-950">
                  No results found
                </Text>
                <Text size="sm" className="text-typography-500 text-center">
                  Try searching with a different keyword
                </Text>
              </VStack>
            </VStack>
          </Card>
        }
      />
    </Box>
  );
};

export default CryptoTrackerScreen;
