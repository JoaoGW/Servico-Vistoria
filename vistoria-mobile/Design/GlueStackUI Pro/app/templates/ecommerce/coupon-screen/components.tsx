import React from "react";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { Icon,AddIcon } from "@/components/ui/icon";
import { Gift, Clock } from "lucide-react-native";
import { BlurView } from "expo-blur";
import { ThemeContext, useTheme } from "@/utils/theme-context";
import { CouponWithColor } from "./types";
import { Heading } from "@/components/ui/heading";

interface CouponCardProps {
  coupon: CouponWithColor;
}

export const CouponCard: React.FC<CouponCardProps> = ({ coupon }) => {
  const { colorMode } = useTheme();
  return (
    <Box className="bg-background-50 rounded-lg relative">
      {/* Semi-circular notch on the right */}
      <Box
        className={`absolute right-0 z-10 top-10 w-4 h-8 bg-background-0 rounded-l-full`}
      />

      <HStack space="md" className="items-center">
        <VStack space="md" className="flex-1 p-4">
          <Text className={`text-${coupon.color} font-medium`}>
            {coupon.location}
          </Text>
          <Text size="xl" className="text-typography-950 font-medium">
            {coupon.title}
          </Text>
          <Text size="xs" className="text-typography-700">
            {coupon.date}
          </Text>
        </VStack>

        <HStack
          className={`items-center justify-between h-full rounded-r-lg pr-10 bg-${coupon.color}`}
        >
          <VStack space="xs" className="items-end p-4">
            <Text size="lg" className={`text-white text-4xl font-bold`}>
              {coupon.points.toString().padStart(2, "0")}
            </Text>
          </VStack>

          <Box className="ml-2">
            <Icon as={Gift} size="lg" className="text-white" />
          </Box>
        </HStack>
      </HStack>

      {/* Blur overlay for expired coupons */}
      {coupon.isExpired && (
        <BlurView
          intensity={40}
          tint={colorMode === "light" ? "light" : "dark"}
          className="absolute inset-0 rounded-lg"
        >
          <Box className="flex-1 items-center justify-center">
            <VStack space="sm" className="items-center">
              <Icon as={Clock} size="xl" className="text-typography-600" />
              <Text size="sm" className="text-typography-600 font-medium">
                Expired
              </Text>
            </VStack>
          </Box>
        </BlurView>
      )}
    </Box>
  );
};

interface PointsHeaderProps {
  totalPoints: number;
}

export const PointsHeader: React.FC<PointsHeaderProps> = ({ totalPoints }) => {
  return (
    <Box className="bg-background-0 rounded-2xl p-6 mb-6">
      <VStack space="sm" className="items-center">
        <Heading size="3xl" className="font-bold text-typography-950">
          {totalPoints}
        </Heading>
        <Text size="lg" className="text-typography-400">
          Points
        </Text>
      </VStack>
    </Box>
  );
};

interface FloatingActionButtonProps {
  onPress: () => void;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onPress,
}) => {
  return (
    <Button
      size="lg"
      variant="solid"
      action="primary"
      onPress={onPress}
      className="absolute bottom-6 right-6 w-14 h-14 rounded-full"
    >
      <ButtonIcon as={AddIcon} size="xl" className="web:scale-[400%]" />
    </Button>
  );
};
