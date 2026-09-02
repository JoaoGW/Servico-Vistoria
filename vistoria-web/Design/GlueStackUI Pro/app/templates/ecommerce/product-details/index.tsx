import React, { useState } from "react";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Icon } from "@/components/ui/icon";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Input, InputField, InputSlot } from "@/components/ui/input";
import { ScrollView } from "@/components/ui/scroll-view";
import { KeyboardAvoidingView, Platform } from "react-native";
import {
  ArrowLeft,
  MoreHorizontal,
  Heart,
  MessageCircle,
  Share,
  Bookmark,
  Star,
} from "lucide-react-native";
import { Image } from "@/components/ui/image";
import { Review } from "./types";
import { product, reviews } from "./data";

const ProductHeader: React.FC = () => {
  return (
    <Box className="relative">
      {/* Product Image */}
      <Box className="h-96 bg-background-50 relative">
        <Image
          className="w-full h-full"
          source={{
            uri: product.image,
          }}
          alt="Product Image"
        />
      </Box>
    </Box>
  );
};

const ProductInfo: React.FC = () => {
  return (
    <Box className="px-4 py-4 bg-background-0">
      <VStack space="sm">
        <Text size="xl" className="font-bold text-typography-950">
          {product.name}
        </Text>
        <HStack className="items-center" space="md">
          <Text size="lg" className="font-bold text-typography-950">
            ${product.price}
          </Text>
          <Text size="sm" className="text-typography-500 line-through">
            ${product.originalPrice}
          </Text>
        </HStack>
        <HStack className="items-center" space="xs">
          {[1, 2, 3, 4, 5].map((i) => (
            <Icon
              key={i}
              as={Star}
              size="sm"
              className="fill-yellow-500 stroke-none"
            />
          ))}
          <Text size="sm" className="text-typography-600">
            {product.rating} ({product.reviewCount})
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
};

const ProductActions: React.FC = () => {
  const [isLiked, setIsLiked] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <Box className="px-4 py-3 bg-background-0 border-t border-b border-outline-100">
      <HStack className="justify-between items-center">
        <HStack space="lg">
          <Button
            variant="link"
            onPress={() => setIsLiked(!isLiked)}
            className="p-0"
          >
            <Icon
              as={Heart}
              size="md"
              className={
                isLiked
                  ? "fill-red-500 stroke-none"
                  : "stroke-typography-600 fill-none"
              }
            />
          </Button>

          <Button variant="link" className="p-0">
            <Icon
              as={MessageCircle}
              size="md"
              className="text-typography-600"
            />
          </Button>

          <Button variant="link" className="p-0">
            <Icon as={Share} size="md" className="text-typography-600" />
          </Button>
        </HStack>

        <Button
          variant="link"
          onPress={() => setIsBookmarked(!isBookmarked)}
          className="p-0"
        >
          <Icon
            as={Bookmark}
            size="md"
            className={
              isBookmarked ? "text-primary-500" : "text-typography-600"
            }
          />
        </Button>
      </HStack>
    </Box>
  );
};

const ReviewItem: React.FC<{ review: Review; index: number }> = ({
  review,
  index,
}) => {
  return (
    <VStack space="sm" className="px-4 py-3">
      <HStack space="md" className="items-center">
        <Avatar size="sm" className="bg-background-200">
          <AvatarFallbackText className="text-typography-950 font-bold">
            {review.avatar}
          </AvatarFallbackText>
          <AvatarImage source={{ uri: review.image }} alt="avatar" />
        </Avatar>

        <VStack className="flex-1" space="xs">
          <HStack className="items-center justify-between">
            <Text size="sm" className="font-bold text-typography-950">
              {review.user}
            </Text>
            <Text size="xs" className="text-typography-500">
              {review.timestamp}
            </Text>
          </HStack>
          <HStack space="xs">
            {[1, 2, 3, 4, 5].map((i) => (
              <Icon
                key={i}
                as={Star}
                size="xs"
                className={
                  i <= review.rating
                    ? "fill-yellow-500 stroke-none"
                    : "fill-none stroke-typography-300"
                }
              />
            ))}
          </HStack>
        </VStack>
      </HStack>

      <Text size="sm" className="text-typography-950 leading-5">
        {review.content}
      </Text>
    </VStack>
  );
};
const ReviewInput: React.FC = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <Box className="px-4 py-3 bg-background-0">
        <HStack space="sm" className="items-center">
          <Avatar
            size="sm"
            className="bg-background-200  border border-outline-100"
          >
            <AvatarFallbackText className="text-typography-950">
              You
            </AvatarFallbackText>
            <AvatarImage
              source={{
                uri: "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?w=150&h=150&fit=crop&crop=face",
              }}
              alt="avatar"
            />
          </Avatar>

          <Input
            size="xl"
            variant="outline"
            className="flex-1 rounded-full border-outline-100"
          >
            <InputField
              placeholder="Add a review..."
              className="text-typography-700"
            />
          </Input>
        </HStack>
      </Box>
    </KeyboardAvoidingView>
  );
};

// Main Component
export default function ProductDetailScreen() {
  return (
    <Box className="flex-1 bg-background-0 pb-safe">
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack className="flex-1">
          <ProductHeader />
          <ProductInfo />
          <ProductActions />

          {/* Reviews Section */}
          <VStack className="bg-background-0">
            <Box className="px-4 py-2">
              <Text size="md" className="font-bold text-typography-950">
                Reviews
              </Text>
            </Box>
            {reviews.map((review, index) => (
              <ReviewItem key={review.id} review={review} index={index} />
            ))}
            <Box className="h-16" />
          </VStack>
        </VStack>
      </ScrollView>
      <ReviewInput />
    </Box>
  );
}
