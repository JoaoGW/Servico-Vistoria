import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  Icon,
  ChevronLeftIcon,
  MenuIcon,
  CloseIcon,
} from "@/components/ui/icon";
import { Platform, TouchableOpacity } from "react-native";
import data from "@/data.json";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import {
  Drawer,
  DrawerBackdrop,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
} from "@/components/ui/drawer";
import { Heading } from "@/components/ui/heading";
import { useDrawer } from "@/utils/drawer-context";
interface CustomHeaderProps {
  title?: string;
  showBackButton?: boolean;
}

export const CustomHeader: React.FC<CustomHeaderProps> = ({
  title = "",
  showBackButton = true,
}) => {
  const router = useRouter();
  const { isOpen, openDrawer, closeDrawer } = useDrawer();

  const navigateToScreen = (category: string, screen: string) => {
    router.push(`/templates/${category}/${screen}` as any);
  };

  const capitalizeTitle = (title: string) => {
    return title.charAt(0).toUpperCase() + title.slice(1);
  };

  const formatScreenName = (screenName: string) => {
    return screenName
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <Box className="pt-safe-offset-3 px-4 pb-3 flex-row items-center justify-between bg-background-0 web:py-5 web:border-b-[0.5px] border-b-typography-100">
      {showBackButton ? (
        <Pressable onPress={() => router.back()} className="mr-4">
          <Icon as={ChevronLeftIcon} size="xl" />
        </Pressable>
      ) : (
        <Box className="mr-4" />
      )}

      <Text className="text-lg font-semibold">{title}</Text>
      <>
        <Pressable onPress={openDrawer}>
          <Icon as={MenuIcon} size="xl" />
        </Pressable>
        <Drawer
          isOpen={isOpen}
          size={Platform.OS === "web" ? "xs" : "lg"}
          anchor="left"
          onClose={closeDrawer}
        >
          <DrawerBackdrop />
          <DrawerContent className="py-safe rounded-r-2xl">
            <DrawerHeader>
              <Heading size="lg">Templates</Heading>
              <DrawerCloseButton>
                <Icon as={CloseIcon} />
              </DrawerCloseButton>
            </DrawerHeader>
            <DrawerBody showsVerticalScrollIndicator={false}>
              <VStack className="flex-1 px-4">
                {data.templates.map((template, templateIndex) => (
                  <VStack key={templateIndex}>
                    <Text className="text-xl web:text-lg mt-8 text-typography-950 font-semibold">
                      {capitalizeTitle(template.title)}
                    </Text>

                    <VStack>
                      {template.screens.map((screen, screenIndex) => (
                        <TouchableOpacity
                          key={screenIndex}
                          onPress={() => {
                            navigateToScreen(template.title, screen);
                            closeDrawer();
                          }}
                        >
                          <Text className="text-lg web:text-sm mt-3">
                            {formatScreenName(screen)}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </VStack>
                  </VStack>
                ))}
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    </Box>
  );
};
