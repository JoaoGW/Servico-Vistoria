import React, { useState } from "react";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { ChevronRightIcon, Icon } from "@/components/ui/icon";
import { Badge, BadgeText } from "@/components/ui/badge";
import { Divider } from "@/components/ui/divider";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { ScrollView } from "@/components/ui/scroll-view";

// Import Lucide React Native icons
import {
  X,
  User,
  Heart,
  ShoppingBag,
  CreditCard,
  MapPin,
  Bell,
  HelpCircle,
  Star,
  Moon,
} from "lucide-react-native";

const FlyoutMenuScreen = ({ onClose }: any) => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const menuItems = [
    {
      icon: User,
      title: "My Profile",
      subtitle: "Manage your personal information",
      action: () => {
        // Handle profile navigation
      },
      showChevron: true,
    },
    {
      icon: ShoppingBag,
      title: "My Orders",
      subtitle: "Track and manage your orders",
      action: () => {
        // Handle orders navigation
      },
      badge: "3",
      showChevron: true,
    },
    {
      icon: Heart,
      title: "Wishlist",
      subtitle: "Save your favorite items",
      action: () => {
        // Handle wishlist navigation
      },
      badge: "12",
      showChevron: true,
    },
    {
      icon: CreditCard,
      title: "Payment Methods",
      subtitle: "Manage cards and payment options",
      action: () => {
        // Handle payment navigation
      },
      showChevron: true,
    },
    {
      icon: MapPin,
      title: "Addresses",
      subtitle: "Manage delivery addresses",
      action: () => {
        // Handle addresses navigation
      },
      showChevron: true,
    },
  ];

  const settingsItems = [
    {
      icon: Bell,
      title: "Notifications",
      subtitle: "Push notifications and alerts",
      hasSwitch: true,
      switchValue: notifications,
      onSwitchChange: setNotifications,
    },
    {
      icon: Moon,
      title: "Dark Mode",
      subtitle: "Toggle dark theme",
      hasSwitch: true,
      switchValue: darkMode,
      onSwitchChange: setDarkMode,
    },
  ];

  const supportItems = [
    {
      icon: HelpCircle,
      title: "Help & Support",
      subtitle: "Get help and contact support",
      action: () => {
        // Handle help navigation
      },
      showChevron: true,
    },
    {
      icon: Star,
      title: "Rate App",
      subtitle: "Share your feedback",
      action: () => {
        // Handle rate app
      },
      showChevron: true,
    },
  ];

  const MenuItem = ({ item }: any) => (
    <Button variant="link" onPress={item.action} className="w-full">
      <HStack className="items-center p-4 w-full" space="md">
        <Box className="w-10 h-10 items-center justify-center">
          <Icon as={item.icon} size="lg" />
        </Box>

        <VStack className="flex-1" space="xs">
          <HStack className="items-center justify-between">
            <Text size="md" className="text-typography-900 font-medium">
              {item.title}
            </Text>
            <HStack className="items-center" space="sm">
              {item.badge && (
                <Badge
                  size="sm"
                  variant="solid"
                  action="error"
                  className="rounded-full"
                >
                  <BadgeText>{item.badge}</BadgeText>
                </Badge>
              )}
              {item.showChevron && (
                <Icon
                  as={ChevronRightIcon}
                  size="lg"
                  className="text-typography-400"
                />
              )}
            </HStack>
          </HStack>
          <Text size="sm" className="text-typography-500">
            {item.subtitle}
          </Text>
        </VStack>
      </HStack>
    </Button>
  );

  const SettingsMenuItem = ({ item }: any) => (
    <HStack className="items-center p-4" space="md">
      <Box className="w-10 h-10 items-center justify-center">
        <Icon as={item.icon} size="lg" className="text-typography-600" />
      </Box>

      <VStack className="flex-1" space="xs">
        <Text size="md" className="text-typography-900 font-medium">
          {item.title}
        </Text>
        <Text size="sm" className="text-typography-500">
          {item.subtitle}
        </Text>
      </VStack>

      {item.hasSwitch && <Switch size="md" isDisabled={!item.switchValue} />}
    </HStack>
  );

  return (
    <ScrollView
      className="flex-1 bg-background-0 h-full"
      showsVerticalScrollIndicator={false}
      contentContainerClassName="pb-11 lg:px-5"
    >
      {/* Header */}
      <Box className="p-6 px-4 gap-2">
        <HStack className="items-center justify-between">
          <Heading size="lg">Menu</Heading>
          <Button variant="link" onPress={onClose} className="p-2">
            <ButtonIcon as={X} />
          </Button>
        </HStack>

        {/* User Profile Section */}
        <HStack
          className="items-center bg-primary-500/10 p-4 rounded-md"
          space="md"
        >
          <Avatar size="lg">
            <AvatarFallbackText>John Doe</AvatarFallbackText>
          </Avatar>
          <VStack className="flex-1">
            <Text size="lg" className="text-typography-800 font-semibold">
              John Doe
            </Text>
            <Text size="sm" className="text-typography-700">
              john.doe@example.com
            </Text>
            <Text size="xs" className="text-typography-600">
              Premium Member
            </Text>
          </VStack>
        </HStack>
      </Box>

      {/* Menu Content */}
      <VStack className="flex-1 lg:px-5 px-2">
        {/* Main Menu Items */}
        <VStack space="lg">
          {menuItems.map((item, index) => (
            <MenuItem key={index} item={item} />
          ))}
        </VStack>

        <Divider className="my-2" />

        {/* Settings Section */}
        <VStack>
          <Box className="px-4 py-2">
            <Text
              size="sm"
              className="text-typography-500 font-medium uppercase tracking-wide"
            >
              Settings
            </Text>
          </Box>
          {settingsItems.map((item, index) => (
            <SettingsMenuItem key={index} item={item} />
          ))}
        </VStack>

        <Divider className="my-2" />

        {/* Support Section */}
        <VStack>
          <Box className="px-4 py-2">
            <Text
              size="sm"
              className="text-typography-500 font-medium uppercase tracking-wide"
            >
              Support
            </Text>
          </Box>
          <VStack space="lg">
            {supportItems.map((item, index) => (
              <MenuItem key={index} item={item} />
            ))}
          </VStack>
        </VStack>

        {/* Spacer */}
        <Box className="flex-1" />

        {/* Logout Button */}
        <Box className="p-4">
          <Button
            size="lg"
            variant="solid"
            onPress={() => {
              // Handle logout
            }}
            className="w-full"
          >
            <ButtonText>Sign Out</ButtonText>
          </Button>
        </Box>

        {/* App Version */}
        <Box className="px-4 pb-4">
          <Text size="xs" className="text-typography-400 text-center">
            Version 2.1.0
          </Text>
        </Box>
      </VStack>
    </ScrollView>
  );
};

export default FlyoutMenuScreen;
