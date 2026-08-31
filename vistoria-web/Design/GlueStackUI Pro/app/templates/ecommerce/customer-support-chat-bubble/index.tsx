import React, { useState } from "react";
import { ScrollView } from "@/components/ui/scroll-view";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import {
  Avatar,
  AvatarImage,
  AvatarFallbackText,
} from "@/components/ui/avatar";
import { Input, InputField } from "@/components/ui/input";
import { Icon } from "@/components/ui/icon";
import {
  MessageCircle,
  X,
  Send,
  Package,
  RotateCcw,
  CreditCard,
  HelpCircle,
  Truck,
  ShoppingBag,
  ChevronLeft,
} from "lucide-react-native";
import { KeyboardAvoidingView, Platform } from "react-native";

interface QuickOption {
  id: string;
  icon: typeof Package;
  label: string;
  message: string;
}

interface Message {
  id: string;
  text: string;
  sender: "user" | "agent";
  timestamp: string;
}

const CustomerSupportChatBubble: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm Sarah, your support agent. How can I help you today?",
      sender: "agent",
      timestamp: "10:30 AM",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const quickOptions: QuickOption[] = [
    {
      id: "1",
      icon: Package,
      label: "Track Order",
      message: "I would like to track my order",
    },
    {
      id: "2",
      icon: RotateCcw,
      label: "Return Request",
      message: "I need help with a return",
    },
    {
      id: "3",
      icon: CreditCard,
      label: "Payment Issue",
      message: "I have a payment issue",
    },
    {
      id: "4",
      icon: HelpCircle,
      label: "Product Info",
      message: "I need more product information",
    },
    {
      id: "5",
      icon: Truck,
      label: "Delivery Status",
      message: "What is my delivery status?",
    },
    {
      id: "6",
      icon: ShoppingBag,
      label: "Order Issue",
      message: "I have an issue with my order",
    },
  ];

  const handleQuickOptionPress = (option: QuickOption) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text: option.message,
      sender: "user",
      timestamp: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }),
    };
    setMessages([...messages, newMessage]);

    setTimeout(() => {
      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I understand you need help with that. Let me connect you with the right team member who can assist you further.",
        sender: "agent",
        timestamp: new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, agentResponse]);
    }, 1500);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputMessage,
        sender: "user",
        timestamp: new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newMessage]);
      setInputMessage("");

      setTimeout(() => {
        const agentResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: "Thank you for your message. Our team will respond shortly.",
          sender: "agent",
          timestamp: new Date().toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
          }),
        };
        setMessages((prev) => [...prev, agentResponse]);
      }, 1500);
    }
  };

  return (
    <Box className="flex-1 bg-background-0">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={80}
        className="flex-1"
      >

        {!isChatOpen ? (
          <Box className="flex-1 items-center justify-center px-4">
            <VStack space="xl" className="items-center max-w-md">
              <Box className="bg-primary-100 w-24 h-24 rounded-full items-center justify-center">
                <Icon
                  as={MessageCircle}
                  size="xl"
                  className="text-primary-600"
                />
              </Box>

              <VStack space="sm" className="items-center">
                <Heading size="2xl" className="text-center">
                  Need Help?
                </Heading>
                <Text size="md" className="text-typography-600 text-center">
                  Chat with our support team for quick assistance
                </Text>
              </VStack>

              <Button
                size="lg"
                variant="solid"
                action="primary"
                onPress={() => setIsChatOpen(true)}
              >
                <ButtonIcon as={MessageCircle} />
                <ButtonText>Start Chat</ButtonText>
              </Button>
            </VStack>
          </Box>
        ) : (
          <Box className="flex-1">
            <Box className="border-b border-outline-100 bg-background-50 px-4 py-3">
              <HStack space="md" className="items-center justify-between">
                <HStack space="md" className="items-center flex-1">
                  <Avatar size="md">
                    <AvatarFallbackText>Sarah Johnson</AvatarFallbackText>
                    <AvatarImage
                      source={{ uri: "https://i.pravatar.cc/150?img=5" }}
                    />
                  </Avatar>
                  <VStack space="xs" className="flex-1">
                    <Text size="md" className="font-semibold">
                      Sarah Johnson
                    </Text>
                    <HStack space="xs" className="items-center">
                      <Box className="w-2 h-2 rounded-full bg-success-500" />
                      <Text size="sm" className="text-typography-600">
                        Online
                      </Text>
                    </HStack>
                  </VStack>
                </HStack>
                <Button
                  size="md"
                  variant="link"
                  onPress={() => setIsChatOpen(false)}
                  className="p-0"
                >
                  <ButtonIcon as={X} className="text-typography-600" />
                </Button>
              </HStack>
            </Box>

            <ScrollView
              showsVerticalScrollIndicator={false}
              className="flex-1 px-4 py-4"
            >
              <VStack space="md">
                {messages.map((message) => (
                  <Box
                    key={message.id}
                    className={
                      message.sender === "user" ? "items-end" : "items-start"
                    }
                  >
                    <Box
                      className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                        message.sender === "user"
                          ? "bg-primary-500 rounded-br-sm"
                          : "bg-background-100 rounded-bl-sm"
                      }`}
                    >
                      <Text
                        size="md"
                        className={
                          message.sender === "user"
                            ? "text-white"
                            : "text-typography-900"
                        }
                      >
                        {message.text}
                      </Text>
                    </Box>
                    <Text size="xs" className="text-typography-500 mt-1">
                      {message.timestamp}
                    </Text>
                  </Box>
                ))}

                {messages.length === 1 && (
                  <VStack space="md" className="mt-4">
                    <HStack space="sm" className="items-center">
                      <Box className="h-px flex-1 bg-outline-100" />
                      <Text size="sm" className="text-typography-500">
                        Quick Options
                      </Text>
                      <Box className="h-px flex-1 bg-outline-100" />
                    </HStack>

                    <VStack space="sm">
                      {quickOptions.map((option) => (
                        <Button
                          key={option.id}
                          size="lg"
                          variant="outline"
                          onPress={() => handleQuickOptionPress(option)}
                          className="justify-start"
                        >
                          <ButtonIcon as={option.icon} />
                          <ButtonText>{option.label}</ButtonText>
                        </Button>
                      ))}
                    </VStack>
                  </VStack>
                )}
              </VStack>
            </ScrollView>

            <Box className="bg-background-0 px-4 py-3 pb-safe web:pb-5">
              <HStack space="sm" className="items-center">
                <Input size="xl" variant="outline" className="flex-1">
                  <InputField
                    placeholder="Type your message..."
                    value={inputMessage}
                    onChangeText={setInputMessage}
                    onSubmitEditing={handleSendMessage}
                  />
                </Input>
                <Button
                  size="lg"
                  variant="solid"
                  action="primary"
                  onPress={handleSendMessage}
                  isDisabled={!inputMessage.trim()}
                >
                  <ButtonIcon as={Send} />
                </Button>
              </HStack>
            </Box>
          </Box>
        )}
      </KeyboardAvoidingView>
    </Box>
  );
};

export default CustomerSupportChatBubble;
