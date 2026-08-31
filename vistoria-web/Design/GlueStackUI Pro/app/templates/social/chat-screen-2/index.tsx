import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, Alert } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Input, InputField, InputSlot } from "@/components/ui/input";
import { Icon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { ScrollView } from "@/components/ui/scroll-view";
import { Send, Paperclip, MoreHorizontal } from "lucide-react-native";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";

import { GroupMessage } from "./types";
import { groupMembers, initialMessages, getUserById } from "./data";
import { Heading } from "@/components/ui/heading";

// --- Components ---

const ChatHeader = () => (
  <HStack className="items-center justify-start px-6 py-3">
    <HStack space="md" className="items-center flex-1">
      <HStack className="items-center">
        {groupMembers.slice(0, 3).map((member, index) => (
          <Avatar
            key={member.id}
            size="md"
            style={index > 0 ? { marginLeft: -12 } : undefined}
          >
            <AvatarFallbackText>{member.name.charAt(0)}</AvatarFallbackText>
            <AvatarImage source={{ uri: member.avatar }} />
          </Avatar>
        ))}
        <Avatar
          size="md"
          className="bg-background-100"
          style={{ marginLeft: -12 }}
        >
          <Text className="text-typography-950 font-medium">+1</Text>
        </Avatar>
      </HStack>
      <VStack space="xs">
        <Heading size="xl" className="text-typography-950 font-semibold">
          Project Team
        </Heading>
        <Text size="lg" className="text-typography-400">
          4 members, 2 online
        </Text>
      </VStack>
    </HStack>
  </HStack>
);

const MessageItem = ({
  message,
  isCurrentUser,
}: {
  message: GroupMessage;
  isCurrentUser: boolean;
}) => {
  const user = getUserById(message.userId);

  return (
    <VStack
      key={message.id}
      className={`w-full mb-4 ${isCurrentUser ? "items-end" : "items-start"}`}
    >
      <VStack
        className={`max-w-[60%] rounded-xl p-3 ${
          isCurrentUser
            ? "bg-primary-500 rounded-br-none"
            : "bg-background-50 rounded-tl-none"
        }`}
      >
        {!isCurrentUser && (
          <Text size="sm" className={`font-semibold mb-1 ${user.color}`}>
            {user.name}
          </Text>
        )}

        {/* Image Message */}
        {message.type === "image" && message.image && (
          <VStack space="sm">
            <Image
              source={{ uri: message.image }}
              className="w-full h-32 rounded-lg"
              resizeMode="cover"
              alt="Shared image"
            />
            {message.text && (
              <Text
                size="md"
                className={`font-medium ${
                  !isCurrentUser ? "text-typography-950" : "text-white"
                }`}
              >
                {message.text}
              </Text>
            )}
          </VStack>
        )}

        {/* Text Message */}
        {message.type === "text" && (
          <Text
            size="md"
            className={`font-medium  ${
              !isCurrentUser ? "text-typography-950" : "text-white"
            }`}
          >
            {message.text}
          </Text>
        )}
      </VStack>

      <Text size="sm" className="text-typography-600 mt-1">
        {message.timestamp}
      </Text>
    </VStack>
  );
};

const ChatInput = ({ newMessage, setNewMessage, handleSend }: any) => (
  <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={80}
  >
    <Box className="w-full py-3 px-6 web:pb-5">
      <Input
        size="xl"
        variant="outline"
        className="bg-background-50 border-0 px-4 rounded-full"
      >
        <InputSlot>
          <Icon as={Paperclip} size="xl" className="text-typography-600 ml-2" />
        </InputSlot>
        <InputField
          className="text-typography-950"
          placeholder="Type your message..."
          value={newMessage}
          onChangeText={setNewMessage}
          onSubmitEditing={handleSend}
        />
        <InputSlot>
          <Button size="lg" className="bg-transparent" onPress={handleSend}>
            <ButtonIcon as={Send} />
          </Button>
        </InputSlot>
      </Input>
    </Box>
  </KeyboardAvoidingView>
);

// --- Main Screen ---

export default function GroupChatScreen() {
  const [messages, setMessages] = useState<GroupMessage[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const newMsg: GroupMessage = {
      id: (messages.length + 1).toString(),
      userId: "1", // current user
      text: newMessage,
      timestamp: "Just now",
      type: "text",
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  const handleImageSelect = () => {
    // In a real app, you would use ImagePicker here
    // For demo purposes, we'll simulate adding an image
    Alert.alert("Select Image", "Choose image source", [
      {
        text: "Camera",
        onPress: () => simulateImageMessage("camera"),
      },
      {
        text: "Gallery",
        onPress: () => simulateImageMessage("gallery"),
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  const simulateImageMessage = (source: string) => {
    // Simulate adding an image message
    const sampleImages = [
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=900&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=60",
    ];

    const randomImage =
      sampleImages[Math.floor(Math.random() * sampleImages.length)];

    const newMsg: GroupMessage = {
      id: (messages.length + 1).toString(),
      userId: "1",
      image: randomImage,
      text: source === "camera" ? "📷 Just took this!" : "🖼️ From gallery",
      timestamp: "Just now",
      type: "image",
    };

    setMessages([...messages, newMsg]);
  };

  return (
    <Box className="flex-1 bg-background-0 pb-safe">
      <ChatHeader />
      <Box className="flex-1 px-4">
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack className="py-4">
            {messages.map((message) => (
              <MessageItem
                key={message.id}
                message={message}
                isCurrentUser={message.userId === "1"}
              />
            ))}
          </VStack>
        </ScrollView>
      </Box>

      <ChatInput
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSend={handleSend}
      />
    </Box>
  );
}
