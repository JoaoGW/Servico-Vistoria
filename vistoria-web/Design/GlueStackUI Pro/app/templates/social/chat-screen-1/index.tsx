import React, { useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import {
  Avatar,
  AvatarImage,
  AvatarFallbackText,
  AvatarBadge,
} from "@/components/ui/avatar";
import { Input, InputField, InputSlot } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Paperclip, Send, MoreHorizontal } from "lucide-react-native";
import { ScrollView } from "@/components/ui/scroll-view";

import { Message, Chat } from "./types";
import { sampleChat } from "./data";
import { Heading } from "@/components/ui/heading";

function Header({ chat }: { chat: Chat }) {
  return (
    <HStack className="items-center justify-start px-6 py-3">
      <HStack space="md" className="items-center flex-1">
        <Avatar size="lg">
          <AvatarFallbackText>{chat.name}</AvatarFallbackText>
          <AvatarImage source={{ uri: chat.img_url }} />
          <AvatarBadge />
        </Avatar>
        <VStack space="xs">
          <Heading size="xl" className="text-typography-950 font-semibold">
            {chat.name}
          </Heading>
          {chat.online && (
            <Text size="lg" className="text-typography-400">
              Online
            </Text>
          )}
        </VStack>
      </HStack>
    </HStack>
  );
}

function MessageItem({ message, index }: { message: Message; index: number }) {
  const isCurrentUser = message.sender === "You";

  return (
    <VStack
      key={index}
      className={`w-full mb-4 ${isCurrentUser ? "items-end" : "items-start"}`}
    >
      <VStack
        className={`max-w-[60%] rounded-xl p-3 ${
          isCurrentUser
            ? "bg-primary-500 rounded-br-none"
            : "bg-background-50 rounded-tl-none"
        }`}
      >
        {/* Image Message */}
        {message.type === "image" && message.image && (
          <VStack space="sm">
            <Image
              source={{ uri: message.image }}
              className="w-full h-32 rounded-lg"
              resizeMode="cover"
              alt="Shared image"
            />

            {message.message && (
              <Text
                size="md"
                className={`font-medium ${
                  !isCurrentUser ? "text-typography-950" : "text-white"
                }`}
              >
                {message.message}
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
            {message.message}
          </Text>
        )}
      </VStack>

      <Text size="sm" className="text-typography-600 mt-1">
        {message.timestamp}
      </Text>
    </VStack>
  );
}

function ChatHistory({ messages }: { messages: Message[] }) {
  return (
    <Box className="flex-1 px-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack className="py-4">
          {messages.map((message, index) => (
            <MessageItem key={index} message={message} index={index} />
          ))}
        </VStack>
      </ScrollView>
    </Box>
  );
}

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

export default function ChatScreen() {
  const [messages, setMessages] = useState(sampleChat.chats_history);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const newMsg: Message = {
      sender: "You",
      message: newMessage,
      timestamp: "Just now",
      type: "text",
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  return (
    <Box className="flex-1 bg-background-0 pb-safe">
      <Header chat={sampleChat} />
      <ChatHistory messages={messages} />
      <ChatInput
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSend={handleSend}
      />
    </Box>
  );
}
