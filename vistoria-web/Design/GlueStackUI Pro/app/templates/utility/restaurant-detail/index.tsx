import React, { useState } from "react";
import { ScrollView } from "@/components/ui/scroll-view";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { Badge, BadgeText, BadgeIcon } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { Icon } from "@/components/ui/icon";
import { Phone, MapPin, Clock, Star } from "lucide-react-native";
import { restaurantData } from "./data";

const RestaurantDetail: React.FC = () => {
  const handleCall = () => {};

  const handleDirections = () => {};

  return (
    <Box className="flex-1 bg-background-0">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Navigation Header */}

        {/* Restaurant Image */}
        <Box className="relative px-4">
          <Image
            source={{ uri: restaurantData.image }}
            className="w-full h-64"
          />

          {/* Status Badge */}
          <Badge
            size="sm"
            action={restaurantData.isOpen ? "success" : "error"}
            className="absolute top-8 right-8 bg-success-500/70 rounded"
          >
            <BadgeIcon className="mr-1 text-success-50" as={Clock} />
            <BadgeText className="text-success-50 font-semibold">
              {restaurantData.isOpen ? "Open" : "Closed"}
            </BadgeText>
          </Badge>
        </Box>

        {/* Restaurant Info */}
        <VStack space="lg" className="px-4 pt-6 pb-8">
          {/* Basic Info */}
          <VStack space="md">
            <HStack space="md" className="items-center justify-between">
              <Heading size="2xl">{restaurantData.name}</Heading>
              <Text size="lg" className="text-typography-950 font-semibold">
                {restaurantData.priceRange}
              </Text>
            </HStack>

            <Text size="md" className="text-typography-600">
              {restaurantData.cuisine} • {restaurantData.address}
            </Text>

            {/* Rating */}
            <HStack space="sm" className="items-center">
              <HStack space="xs">
                {[...Array(5)].map((_, index) => (
                  <Icon
                    key={index}
                    as={Star}
                    size="sm"
                    className={
                      index < Math.floor(restaurantData.rating)
                        ? "text-warning-500 fill-warning-500 stroke-warning-500"
                        : "text-typography-300"
                    }
                  />
                ))}
              </HStack>
              <Text size="md" className="text-typography-600">
                {restaurantData.rating} ({restaurantData.reviewCount} reviews)
              </Text>
            </HStack>
          </VStack>

          {/* Quick Actions */}
          <HStack space="sm">
            <Button
              size="lg"
              variant="solid"
              action="primary"
              className="flex-1 rounded-xl"
              onPress={handleCall}
            >
              <ButtonIcon as={Phone} />
              <ButtonText>Call</ButtonText>
            </Button>

            <Button
              size="lg"
              variant="solid"
              className="flex-1 rounded-xl bg-background-100"
              onPress={handleDirections}
            >
              <ButtonIcon className="text-typography-950" as={MapPin} />
              <ButtonText className="text-typography-950">Directions</ButtonText>
            </Button>
          </HStack>

          {/* Delivery Info */}
          <Card size="lg" variant="elevated" className="bg-background-50">
            <HStack space="md" className="items-center justify-between">
              <VStack space="xs">
                <Text size="sm" className="text-typography-600">
                  Delivery Time
                </Text>
                <Text size="md" className="font-semibold">
                  {restaurantData.deliveryTime}
                </Text>
              </VStack>
              <VStack space="xs" className="items-center">
                <Text size="sm" className="text-typography-600">
                  Fee
                </Text>
                <Text size="md" className="font-semibold">
                  ${restaurantData.deliveryFee}
                </Text>
              </VStack>
              <VStack space="xs" className="items-end">
                <Text size="sm" className="text-typography-600">
                  Min Order
                </Text>
                <Text size="md" className="font-semibold">
                  ${restaurantData.minimumOrder}
                </Text>
              </VStack>
            </HStack>
          </Card>

          {/* About Section */}
          <Card size="lg" variant="elevated" className="px-0">
            <VStack space="md">
              <Heading size="lg">About</Heading>
              <Text size="md" className="text-typography-600 leading-relaxed">
                {restaurantData.description}
              </Text>
            </VStack>
          </Card>

          {/* Contact & Hours */}
          <Card size="lg" variant="elevated" className="px-0">
            <VStack space="md">
              <Heading size="lg">Contact & Hours</Heading>

              <VStack space="sm">
                <HStack space="md" className="items-center">
                  <Icon as={MapPin} size="md" className="text-primary-500" />
                  <Text size="md" className="text-typography-600 flex-1">
                    {restaurantData.address}
                  </Text>
                </HStack>

                <HStack space="md" className="items-center">
                  <Icon as={Phone} size="md" className="text-primary-500" />
                  <Text size="md" className="text-typography-600">
                    {restaurantData.phone}
                  </Text>
                </HStack>

                <HStack space="md" className="items-center">
                  <Icon as={Clock} size="md" className="text-primary-500" />
                  <Text size="md" className="text-typography-600">
                    {restaurantData.hours}
                  </Text>
                </HStack>
              </VStack>
            </VStack>
          </Card>
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default RestaurantDetail;
