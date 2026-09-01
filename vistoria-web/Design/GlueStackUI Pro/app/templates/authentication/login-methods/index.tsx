import React, { useState } from "react";
import { ScrollView } from "@/components/ui/scroll-view";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { Divider } from "@/components/ui/divider";
import { GoogleIcon, AppleIcon } from "./icons";

export default function LoginScreen() {
  return (
    <Box className="flex-1 bg-background-0">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box className="px-4 pt-8 pb-8">
          <VStack space="2xl" className="max-w-2xl web:mx-auto">
            {/* Header Section */}
            <VStack space="md">
              <Heading size="xl" className="text-typography-950">
                Log in / Sign up
              </Heading>
              <Text size="lg" className="text-typography-400">
                Enter your email to sign up or login using your email.
              </Text>
            </VStack>

            {/* Email Form */}
            <VStack space="xl">
              <Input size="xl" variant="outline" className="border-0 border-b">
                <InputField
                  placeholder="Your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </Input>

              <Button
                size="lg"
                variant="solid"
                action="primary"
              >
                <ButtonText>Continue with email</ButtonText>
              </Button>
            </VStack>

            {/* Divider */}
            <HStack space="md" className="items-center">
              <Divider className="flex-1" />
              <Text size="md" className="text-typography-500">
                or
              </Text>
              <Divider className="flex-1" />
            </HStack>

            {/* Social Login Buttons */}
            <VStack space="md">
              <Button
                size="lg"
                variant="outline"
                action="secondary"
              >
                <ButtonIcon as={GoogleIcon} />
                <ButtonText className="text-typography-950">
                  Continue with Google
                </ButtonText>
              </Button>

              <Button
                size="lg"
                variant="outline"
                action="secondary"
              >
                <ButtonIcon as={AppleIcon} className="fill-typography-950" />
                <ButtonText className="text-typography-950">
                  Continue with Apple
                </ButtonText>
              </Button>
            </VStack>
          </VStack>
        </Box>
      </ScrollView>
    </Box>
  );
}
