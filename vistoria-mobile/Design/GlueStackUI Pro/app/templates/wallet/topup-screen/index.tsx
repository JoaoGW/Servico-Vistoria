import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
} from "@/components/ui/actionsheet";
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import {
  AddIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  Icon,
  SearchIcon,
} from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import React, { useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";

// Mock data for contacts
const recentContacts = [
  {
    id: 1,
    name: "Arnold",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
    color: "#FF6B9D",
  },
  {
    id: 2,
    name: "Eliezer",
    avatar: "https://images.unsplash.com/photo-1685688852738-9ad14dbd3d51",
    color: "#9B6BFF",
  },
  {
    id: 3,
    name: "Sophia",
    avatar: "https://images.unsplash.com/photo-1701615004837-40d8573b6652",
    color: "#FF8566",
  },
  {
    id: 4,
    name: "Nora",
    avatar: "https://images.unsplash.com/photo-1549473448-b11beaee2986",
    color: "#FF6B9D",
  },
];

const allContacts = [
  {
    id: 1,
    name: "Aonnor Mahmud Nik",
    phone: "+880-1234-5678",
    initial: "A",
    color: "#6B9FFF",
  },
  {
    id: 2,
    name: "Aky Webster",
    phone: "+880-9876-5432",
    initial: "A",
    color: "#FF6B9D",
  },
  {
    id: 3,
    name: "Aliezer Faulkner",
    phone: "+406-321-1781",
    initial: "A",
    color: "#52b788",
  },
  {
    id: 4,
    name: "Brancesca Cardenas",
    phone: "+406-637-0949",
    initial: "B",
    color: "#FF6B9D",
  },
  {
    id: 5,
    name: "Backery Davidson",
    phone: "+406-555-0123",
    initial: "B",
    color: "#6B9FFF",
  },
];

export default function TopupScreen() {
  const [currentScreen, setCurrentScreen] = useState("contacts");
  const [showActionsheet, setShowActionsheet] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(20);
  const [customAmount, setCustomAmount] = useState("50");
  const [selectedCard, setSelectedCard] = useState({
    type: "Debit",
    balance: 1857.5,
  });

  const quickAmounts = [5, 10, 15, 20, 50, 100, 200, 500];

  const handleOpenAmount = () => {
    setCurrentScreen("amount");
    setShowActionsheet(true);
  };

  const handleTopup = () => {
    setShowActionsheet(false);
    setTimeout(() => {
      setCurrentScreen("success");
      setShowActionsheet(true);
    }, 300);
  };

  const handleGoHome = () => {
    setShowActionsheet(false);
    setCurrentScreen("contacts");
    setCustomAmount("50");
  };

  return (
    <Box className="flex-1 bg-background-0">
      {/* Main Contacts Screen */}
      <VStack className="flex-1 px-6 pt-6">
        <HStack className="items-center mb-6">
          <Icon as={ChevronLeftIcon} size="xl" />
          <Heading size="xl" className="ml-4">
            Topup
          </Heading>
        </HStack>

        {/* Phone Number Section */}
        <Box className="mb-6">
          <Text className="text-typography-700 font-semibold mb-2">
            Phone Number
          </Text>
          <Input
            size="xl"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
            className="items-center justify-between bg-background-50 rounded-full h-12"
          >
            <InputSlot>
              <HStack className="items-center pl-4">
                <Text className="text-typography-700 font-medium">+880</Text>
                <InputIcon as={ChevronDownIcon} size="sm" className=" ml-1" />
              </HStack>
            </InputSlot>
            <InputField
              placeholder="1952 88 88 25"
              className="text-typography-700 outline-none"
              placeholderTextColor="#9CA3AF"
            />
          </Input>
        </Box>

        {/* Recent Contacts */}
        <Box className="mb-6">
          <Text className="text-typography-700 font-semibold mb-3">Recent</Text>
          <HStack className="gap-4">
            {recentContacts.map((contact) => (
              <VStack key={contact.id} className="items-center">
                {/* <Text className="text-2xl">{contact.avatar}</Text> */}
                <Avatar size="lg">
                  <AvatarFallbackText>Jane Doe</AvatarFallbackText>
                  <AvatarImage source={{ uri: contact.avatar }} />
                  <AvatarBadge />
                </Avatar>
                <Text className="text-sm text-typography-700">
                  {contact.name}
                </Text>
              </VStack>
            ))}
          </HStack>
        </Box>

        {/* All Contacts */}
        <Box className="flex-1">
          <Text className="text-typography-700 font-semibold mb-3">
            All Contacts
          </Text>

          <Box className="mb-4">
            <Input
              size="xl"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
              className="items-center bg-background-50 rounded-full h-12"
            >
              <InputSlot className="ml-4 mr-2">
                <InputIcon as={SearchIcon} size="sm" />
              </InputSlot>
              <InputField
                placeholder="Search Name or Number"
                className="text-typography-700 outline-none"
                placeholderTextColor="#9CA3AF"
              />
            </Input>
          </Box>

          <ScrollView showsVerticalScrollIndicator={false}>
            {allContacts.map((contact, index) => (
              <TouchableOpacity key={contact.id} onPress={handleOpenAmount}>
                <HStack className="items-center py-3">
                  {index === 0 ||
                  allContacts[index - 1].initial !== contact.initial ? (
                    <Box
                      className="w-8 h-8 rounded-full items-center justify-center mr-3"
                      style={{ backgroundColor: "#E8EEFF" }}
                    >
                      <Text className="text-blue-600 font-semibold">
                        {contact.initial}
                      </Text>
                    </Box>
                  ) : (
                    <Box className="w-8 mr-3" />
                  )}
                  <Box
                    className="w-12 h-12 rounded-full items-center justify-center mr-3"
                    style={{ backgroundColor: contact.color + "30" }}
                  >
                    <Text
                      className="text-lg font-semibold"
                      style={{ color: contact.color }}
                    >
                      {contact.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </Text>
                  </Box>
                  <VStack className="flex-1">
                    <Text className="text-typography-800 font-semibold">
                      {contact.name}
                    </Text>
                    <Text className="text-typography-400 text-sm">
                      {contact.phone}
                    </Text>
                  </VStack>
                </HStack>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Box>
      </VStack>

      {/* Amount Selection Actionsheet */}
      <Actionsheet
        isOpen={showActionsheet && currentScreen === "amount"}
        onClose={() => setShowActionsheet(false)}
      >
        <ActionsheetBackdrop />
        <ActionsheetContent className="px-6 py-6">
          <VStack className="w-full" space="lg">
            {/* Card Selection */}
            <HStack className="items-center justify-between p-4 bg-background-100 rounded-2xl">
              <HStack className="items-center" space="md">
                <Box className="w-12 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg items-center justify-center">
                  <Text className="text-typography-950 web:text-white text-xs font-bold">
                    CARD
                  </Text>
                </Box>
                <Text className="text-typography-700 font-medium">
                  {selectedCard.type}
                </Text>
              </HStack>
              <HStack className="items-center" space="sm">
                <Text className="text-typography-800 font-bold">
                  ${selectedCard.balance}
                </Text>
                <Icon
                  as={ChevronDownIcon}
                  size="sm"
                  className="text-typography-600"
                />
              </HStack>
            </HStack>

            {/* Amount */}
            <VStack space="md">
              <Text className="text-typography-700 font-semibold">Amount</Text>

              <HStack className="items-center justify-center" space="sm">
                <Text className="text-5xl font-bold text-typography-800">
                  ${customAmount}
                </Text>
                <TouchableOpacity className="w-8 h-8 bg-blue-500 rounded-full items-center justify-center">
                  <Icon as={AddIcon} size="sm" className="text-white" />
                </TouchableOpacity>
              </HStack>

              {/* Slider placeholder */}
              <Box className="h-1 bg-background-200 rounded-full my-4 relative">
                <Box
                  className="absolute left-0 h-1 bg-blue-500 rounded-full"
                  style={{ width: "40%" }}
                />
                <Box
                  className="absolute w-6 h-6 bg-blue-500 rounded-full -top-2.5"
                  style={{ left: "40%" }}
                >
                  <Box className="w-3 h-3 bg-white rounded-full absolute top-1.5 left-1.5" />
                </Box>
              </Box>

              {/* Quick Amount Buttons */}
              <HStack className="flex-wrap justify-between">
                {quickAmounts.slice(0, 4).map((amount) => (
                  <TouchableOpacity
                    key={amount}
                    onPress={() => setCustomAmount(amount.toString())}
                    className={`w-[23%] py-3 rounded-xl mb-3 items-center ${
                      selectedAmount === amount
                        ? "bg-blue-500"
                        : "bg-background-100"
                    }`}
                  >
                    <Text
                      className={
                        selectedAmount === amount
                          ? "text-white font-semibold"
                          : "text-typography-700"
                      }
                    >
                      ${amount}
                    </Text>
                  </TouchableOpacity>
                ))}
              </HStack>
              <HStack className="flex-wrap justify-between">
                {quickAmounts.slice(4).map((amount) => (
                  <TouchableOpacity
                    key={amount}
                    onPress={() => setCustomAmount(amount.toString())}
                    className="w-[23%] py-3 bg-background-100 rounded-xl items-center"
                  >
                    <Text className="text-typography-700">${amount}</Text>
                  </TouchableOpacity>
                ))}
              </HStack>
            </VStack>

            {/* Action Buttons */}
            <HStack space="md" className="mt-4">
              <Button
                size="lg"
                variant="outline"
                className="flex-1 border-gray-300 max-w-[50%]"
                onPress={() => setShowActionsheet(false)}
              >
                <ButtonText className="text-typography-700">Cancel</ButtonText>
              </Button>
              <Button
                size="lg"
                className=" bg-blue-500 web:max-w-[50%] web:w-full max-w-fit"
                onPress={handleTopup}
              >
                <ButtonText className="text-typography-950">
                Topup
                </ButtonText>
              </Button>
            </HStack>
          </VStack>
        </ActionsheetContent>
      </Actionsheet>

      {/* Success Actionsheet */}
      <Actionsheet
        isOpen={showActionsheet && currentScreen === "success"}
        onClose={handleGoHome}
      >
        <ActionsheetBackdrop />
        <ActionsheetContent className="px-6 py-8">
          <VStack className="w-full items-center" space="xl">
            {/* Success Icon */}
            <Box className="w-10 h-10 bg-green-500 rounded-full items-center justify-center">
              <Icon as={CheckCircleIcon} size="md" className="text-white" />
            </Box>

            {/* Success Message */}
            <VStack space="xs" className="items-center">
              <Text className="text-blue-500 font-medium">Hurrah!</Text>
              <Heading size="xl" className="text-typography-800">
                Topup Successfully Done
              </Heading>
              <Text className="text-typography-500">You Earned 2 Points</Text>
            </VStack>

            {/* Home Button */}
            <Button
              size="lg"
              className="w-full bg-blue-500 rounded-xl mt-4"
              onPress={handleGoHome}
            >
              <ButtonText className="font-semibold text-typography-950">
                Go Back To Home
              </ButtonText>
            </Button>
          </VStack>
        </ActionsheetContent>
      </Actionsheet>
    </Box>
  );
}
