import React, { useState } from "react";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField, InputSlot, InputIcon } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { ArrowLeft, Fingerprint } from "lucide-react-native";
import { MailIcon } from "./icons";
import { Pressable } from "@/components/ui/pressable";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    // Add your forgot password logic here
  };

  const handleBackToLogin = () => {
    // Add navigation logic here
  };

  return (
    <VStack className="h-full bg-background-0">
      <VStack className="flex-1 items-center justify-center px-6" space="3xl">
        <VStack className="w-[72] h-[72] bg-background-50 rounded-2xl items-center justify-center border border-background-200">
          <Icon as={Fingerprint} size="xl" className="text-typography-400" />
        </VStack>
        <VStack className="items-center">
          <Text
            size="3xl"
            className="font-bold text-typography-900 text-center"
          >
            Forgot Your Password
          </Text>
          <Text
            size="3xl"
            className="font-bold text-typography-900 text-center"
          >
            and Continue
          </Text>
        </VStack>
        <VStack className="w-full" space="md">
          <Input
            variant="outline"
            size="xl"
            className="bg-background-50 border-0 rounded-xl"
          >
            <InputSlot className="pl-3">
              <InputIcon
                as={MailIcon}
                size="xl"
                className="stroke-typography-400 fill-none"
              />
            </InputSlot>

            <InputField
              placeholder="Enter your email"
              className="text-typography-500 pl-2"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </Input>
          <Button
            size="lg"
            variant="solid"
            action="primary"
            onPress={handleSubmit}
          >
            <ButtonText>Submit Now</ButtonText>
          </Button>
        </VStack>
        <Pressable onPress={handleBackToLogin}>
          <HStack className="items-center mt-4" space="sm">
            <Icon as={ArrowLeft} size="lg" className="text-typography-900" />
            <Text size="lg" className="text-typography-900">
              back to login
            </Text>
          </HStack>
        </Pressable>
      </VStack>
    </VStack>
  );
}
