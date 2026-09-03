import React, { useState } from "react";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge, BadgeText } from "@/components/ui/badge";
import { Icon,FavouriteIcon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { Input, InputField, InputSlot, InputIcon } from "@/components/ui/input";
import { ScrollView } from "@/components/ui/scroll-view";
import {
  ArrowLeft,
  Search,
  SlidersHorizontal,
  MapPin,
  Star,
  Heart,
  Wifi,
  Waves,
  Sparkles,
  Car,
  UtensilsCrossed,
  Dumbbell,
} from "lucide-react-native";
import { Hotel } from "./types";
import { mockHotels } from "./data";

const HotelSearchResults: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("New York Hotels");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (hotelId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(hotelId)) {
        newFavorites.delete(hotelId);
      } else {
        newFavorites.add(hotelId);
      }
      return newFavorites;
    });
  };

  const getAmenityIcon = (amenity: string) => {
    const iconMap: Record<string, typeof Wifi> = {
      wifi: Wifi,
      pool: Waves,
      spa: Sparkles,
      parking: Car,
      restaurant: UtensilsCrossed,
      gym: Dumbbell,
    };
    return iconMap[amenity] || Wifi;
  };

  const renderHotelCard = (hotel: Hotel) => (
    <Card
      key={hotel.id}
      size="md"
      variant="elevated"
      className="bg-background-0 mb-4 rounded-xl"
    >
      <VStack space="md">
        {/* Hotel Image */}
        <Box className="relative">
          <Image
            source={{ uri: hotel.image }}
            alt={hotel.name}
            className="w-full h-48 rounded-lg"
            resizeMode="cover"
          />

          <Button
            size="sm"
            variant="solid"
            action="secondary"
            className="absolute top-3 right-3 bg-background-0/80 rounded-full"
            onPress={() => toggleFavorite(hotel.id)}
          >
            <ButtonIcon
              as={FavouriteIcon}
              className={
                favorites.has(hotel.id)
                  ? "text-error-500"
                  : "text-typography-600"
              }
            />
          </Button>
        </Box>

        {/* Hotel Info */}
        <VStack space="sm">
          <HStack space="sm" className="justify-between items-start">
            <VStack space="xs" className="flex-1">
              <Heading size="lg">{hotel.name}</Heading>
              <HStack space="xs" className="items-center">
                <Icon as={MapPin} size="sm" className="text-typography-500" />
                <Text size="sm" className="text-typography-600">
                  {hotel.location}
                </Text>
              </HStack>
              <Text size="xs" className="text-typography-500">
                {hotel.distance}
              </Text>
            </VStack>
          </HStack>

          {/* Rating */}
          <HStack space="xs" className="items-center">
            <HStack space="xs" className="items-center">
              <Icon
                as={Star}
                size="sm"
                className="fill-yellow-400 stroke-yellow-400"
              />
              <Text size="sm" className="text-typography-900 font-semibold">
                {hotel.rating}
              </Text>
            </HStack>
            <Text size="sm" className="text-typography-500">
              ({hotel.reviewCount} reviews)
            </Text>
          </HStack>

          {/* Amenities */}

          {/* Price */}
          <HStack className=" items-center">
            <Heading size="md" className="text-primary-900">
              ${hotel.price}
            </Heading>
            <Text size="sm" className="text-typography-700">
              /night
            </Text>
          </HStack>
        </VStack>
      </VStack>
    </Card>
  );

  return (
    <Box className="flex-1 bg-background-0">
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack space="lg" className="px-4 pt-6 pb-8">
          <Heading size="xl" className="flex-1">
            Hotel Search
          </Heading>

          {/* Search Bar */}
          <Input size="xl" className="border-0 rounded-xl bg-background-100">
            <InputSlot className="pl-3">
              <InputIcon as={Search} className="text-typography-900" />
            </InputSlot>
            <InputField
              placeholder="Search hotels..."
              className="text-typography-900"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </Input>

          {/* Results */}
          <VStack space="md">
            {mockHotels.map((hotel) => renderHotelCard(hotel))}
          </VStack>
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default HotelSearchResults;
