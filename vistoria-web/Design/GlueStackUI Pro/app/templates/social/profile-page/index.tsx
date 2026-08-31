import React, { useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Input, InputField, InputSlot } from "@/components/ui/input";
import { ScrollView } from "@/components/ui/scroll-view";
import { Image } from "@/components/ui/image";
import {
  ArrowLeft,
  MoreHorizontal,
  Heart,
  MessageCircle,
  Share,
  Bookmark,
  Send,
} from "lucide-react-native";

import { Comment } from "./types";
import { comments } from "./data";

// Components

const PostHeader: React.FC = () => {
  return (
    <Box className="relative">
      {/* Profile Image */}
      <Box className="h-96 relative bg-background-50">
        <Image
          className="w-full h-full mx-auto"
          resizeMode="cover"
          source={{
            uri: "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWVufGVufDB8fDB8fHww",
          }}
        />

        {/* Navigation overlay */}
        <Box className="absolute top-2 left-0 right-0">
          <HStack className="justify-between items-center px-4">
            <Button size="lg" className="bg-transparent">
              <ButtonIcon as={ArrowLeft} className="text-white" />
            </Button>
            <Button size="lg" className="bg-transparent">
              <ButtonIcon as={MoreHorizontal} className="text-white" />
            </Button>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};

const PostActions: React.FC = () => {
  const [isLiked, setIsLiked] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <Box className="px-4 py-3">
      <HStack className="justify-between items-center">
        <HStack space="lg">
          <Button
            size="sm"
            className="bg-transparent"
            onPress={() => setIsLiked(!isLiked)}
          >
            <HStack space="xs" className="items-center">
              <Icon
                as={Heart}
                size="md"
                className={
                  isLiked
                    ? "fill-primary-500 stroke-none"
                    : "stroke-primary-500 fill-none"
                }
              />
              <Text size="md" className="text-typography-950 font-medium">
                247
              </Text>
            </HStack>
          </Button>

          <Button size="sm" className="bg-transparent">
            <HStack space="xs" className="items-center">
              <Icon
                as={MessageCircle}
                size="md"
                className="text-typography-600"
              />
              <Text size="md" className="text-typography-950 font-medium">
                67
              </Text>
            </HStack>
          </Button>

          <Button size="sm" className="bg-transparent">
            <HStack space="xs" className="items-center">
              <Icon as={Share} size="md" className="text-typography-600" />
              <Text size="md" className="text-typography-950 font-medium">
                33
              </Text>
            </HStack>
          </Button>
        </HStack>

        <Button
          size="sm"
          className="bg-transparent"
          onPress={() => setIsBookmarked(!isBookmarked)}
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

const CommentItem: React.FC<{ comment: Comment; index: number }> = ({
  comment,
  index,
}) => {
  const [isLiked, setIsLiked] = useState(comment.isLiked);

  return (
    <Box className={`px-4 py-3 ${index === 0 ? "bg-background-50" : ""}`}>
      <HStack space="sm" className="items-start">
        <Avatar size="sm" className="mt-1">
          <AvatarFallbackText>{comment.avatar}</AvatarFallbackText>
          <AvatarImage source={{ uri: comment.image }} />
        </Avatar>

        <VStack className="flex-1" space="xs">
          <HStack className="items-center" space="sm">
            <Text size="lg" className="font-semibold text-typography-950">
              {comment.user}
            </Text>
            <Text size="sm" className="text-typography-600">
              {comment.timestamp}
            </Text>
          </HStack>

          <Text size="md" className="text-typography-950 leading-5">
            {comment.content}
          </Text>

          <HStack className="items-center mt-1" space="sm">
            <Button
              size="sm"
              className="bg-transparent"
              onPress={() => setIsLiked(!isLiked)}
            >
              <HStack space="xs" className="items-center">
                <Icon
                  as={Heart}
                  size="sm"
                  className={
                    isLiked
                      ? "fill-primary-500 stroke-none"
                      : "stroke-primary-500 fill-none"
                  }
                />
                <Text size="sm" className="text-typography-600">
                  {comment.likes}
                </Text>
              </HStack>
            </Button>

            <Button size="md" className="bg-transparent">
              <ButtonText className="text-typography-600">
                Reply
              </ButtonText>
            </Button>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};

const CommentInput: React.FC = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
    >
      <Box className="px-4 py-3 pb-safe web:pb-5">
        <HStack space="sm" className="items-center">
          {/* <Avatar size="sm">
            <AvatarFallbackText>You</AvatarFallbackText>
            <AvatarImage
              source={{
                uri: "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWVufGVufDB8fDB8fHww",
              }}
            />
          </Avatar> */}
          <Input
            size="xl"
            variant="outline"
            className="flex-1 bg-background-50 border-0 rounded-full"
          >
            <InputField
              placeholder="Add a comment..."
              className="text-typography-950"
            />
            <InputSlot className="mr-3">
              <Button size="lg" className="bg-transparent">
                <ButtonIcon as={Send} className="text-typography-950" />
              </Button>
            </InputSlot>
          </Input>
        </HStack>
      </Box>
    </KeyboardAvoidingView>
  );
};

// Main Component
export default function SocialPostScreen() {
  return (
    <Box className="flex-1 bg-background-0">
      <VStack className="flex-1 max-w-3xl web:mx-auto">
        <PostHeader />
        <PostActions />

        <Box className="flex-1">
          <ScrollView showsVerticalScrollIndicator={false}>
            <VStack>
              {comments.map((comment, index) => (
                <CommentItem key={comment.id} comment={comment} index={index} />
              ))}
              <Box className="h-20" />
            </VStack>
          </ScrollView>
        </Box>

        <CommentInput />
      </VStack>
    </Box>
  );
}
