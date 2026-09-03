import React, { useContext } from "react";
import { ScrollView } from "@/components/ui/scroll-view";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Icon,ShareIcon } from "@/components/ui/icon";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge, BadgeText } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Pressable } from "@/components/ui/pressable";
import { Image } from "@/components/ui/image";
import {
  Settings,
  Edit,
  ShoppingBag,
  Heart,
  Star,
  Package,
  ShoppingCart,
  Truck,
  Award,
  Clock,
  ChevronLeft,
} from "lucide-react-native";
import { ThemeContext } from "@/utils/theme-context";
import { Order, WishlistItem } from "./types";
import { userProfile, recentOrders, wishlistItems, statsData } from "./data";

// Components
const ProfileHeader: React.FC = () => {
  return (
    <Box className="px-4 py-6 min-h-fit">
      <VStack space="md" className="items-center">
        <Box className="relative">
          <Avatar
            size="2xl"
            className="bg-primary-200 border-4 border-background-0"
          >
            <AvatarFallbackText className="text-primary-800 text-2xl font-bold">
              {userProfile.initials}
            </AvatarFallbackText>
            <AvatarImage source={{ uri: userProfile.avatar }} />
          </Avatar>
          <Button className="absolute bottom-2 right-2 h-6 w-6 p-0 items-center bg-warning-400 justify-center rounded-full">
            <ButtonIcon as={Edit} size="xs" className="text-white" />
          </Button>
        </Box>

        <VStack space="xs" className="items-center">
          <Heading size="xl" className="text-typography-900">
            {userProfile.name}
          </Heading>
          <Badge size="sm" className="bg-warning-500/20 rounded">
            <BadgeText className="text-warning-500">
              {userProfile.membership}
            </BadgeText>
          </Badge>
        </VStack>
      </VStack>
    </Box>
  );
};

const StatsSection: React.FC = () => {
  return (
    <Box className="px-4 py-6">
      <Heading size="lg" className="text-typography-950 mb-6">
        My Orders
      </Heading>
      <HStack space="md" className="justify-between max-w-xl">
        {statsData.map((stat) => (
          <VStack key={stat.id} space="xs" className="items-center">
            <Box className={`${stat.bgColor} p-4 rounded-full`}>
              <Icon as={stat.icon} size="xl" className={stat.iconColor} />
            </Box>
            <Text size="xl" className="font-bold text-typography-900">
              {stat.value}
            </Text>
            <Text size="sm" className="text-typography-600">
              {stat.label}
            </Text>
          </VStack>
        ))}
      </HStack>
    </Box>
  );
};

const OrderItem: React.FC<{ order: Order }> = ({ order }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "text-success-800 bg-success-100/40";
      case "shipped":
        return "text-info-800 bg-info-100/40";
      case "processing":
        return "text-warning-800 bg-warning-100/40";
      default:
        return "text-typography-800 bg-background-100/40";
    }
  };

  return (
    <Box className="bg-background-50 p-4 rounded-xl">
      <HStack space="md" className="items-center">
        <Image source={{ uri: order.image }} className="w-16 h-16 rounded-lg" />
        <VStack space="xs" className="flex-1">
          <Text size="md" className="font-semibold text-typography-900">
            {order.product}
          </Text>
          <HStack space="md" className="items-center justify-between">
            <Text size="sm" className="font-bold text-typography-600">
              ${order.price}
            </Text>
            <Text
              size="xs"
              className={`font-medium px-2 py-1 rounded-full ${getStatusColor(
                order.status
              )}`}
            >
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Text>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};

const RecentOrdersSection: React.FC = () => {
  return (
    <Box className="px-4 py-6">
      <HStack space="md" className="justify-between items-center mb-6">
        <Heading size="lg" className="text-typography-900">
          Recent Orders
        </Heading>
        <Pressable>
          <Text size="sm" className="text-typography-950 font-medium">
            View All
          </Text>
        </Pressable>
      </HStack>

      <VStack space="md">
        {recentOrders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </VStack>
    </Box>
  );
};

const WishlistItemCard: React.FC<{ item: WishlistItem }> = ({ item }) => {
  return (
    <VStack space="sm" className="bg-background-50 p-4 rounded-xl">
      <Box className="relative">
        <Image
          source={{ uri: item.image }}
          className="w-full h-32 rounded-lg"
        />
        {item.discount && (
          <Box className="absolute top-2 right-2 bg-error-500/80 px-2 py-1 rounded">
            <Text size="xs" className="text-white font-bold">
              -{item.discount}%
            </Text>
          </Box>
        )}
      </Box>

      <VStack space="xs">
        <Text size="sm" className="font-medium text-typography-900">
          {item.name}
        </Text>
        <HStack space="xs" className="items-center">
          <Text size="sm" className="font-bold text-typography-950">
            ${item.price}
          </Text>
          {item.originalPrice && (
            <Text size="xs" className="text-typography-500 line-through">
              ${item.originalPrice}
            </Text>
          )}
        </HStack>
        <Button size="sm" variant="solid" action="primary">
          <ButtonIcon as={ShoppingCart} />
          <ButtonText size="xs">Add to Cart</ButtonText>
        </Button>
      </VStack>
    </VStack>
  );
};

const WishlistSection: React.FC = () => {
  return (
    <Box className="px-4 py-6">
      <HStack space="md" className="justify-between items-center mb-6">
        <Heading size="lg" className="text-typography-900">
          Wishlist
        </Heading>
        <Pressable>
          <Text size="sm" className="text-typography-950 font-medium">
            View All
          </Text>
        </Pressable>
      </HStack>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <HStack space="md" className="px-1">
          {wishlistItems.map((item) => (
            <WishlistItemCard key={item.id} item={item} />
          ))}
        </HStack>
      </ScrollView>
    </Box>
  );
};

// Main Component
export default function UserProfileScreen() {
  return (
    <Box className="flex-1 bg-background-0">
      <ProfileHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack space="lg" className="pb-20">
          <StatsSection />
          <RecentOrdersSection />
          <WishlistSection />
        </VStack>
      </ScrollView>
    </Box>
  );
}
