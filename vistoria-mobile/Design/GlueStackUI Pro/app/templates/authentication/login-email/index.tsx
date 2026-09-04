import React from "react";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";

export default function index() {
  return (
    <VStack className=" bg-background-0 h-full gap-8 pt-8 px-5">
      <VStack className="max-w-2xl mx-auto h-full" space="md">
        <VStack space="md">
          <Heading size="xl" className="font-bold text-typography-700">
            Log in / Sign up
          </Heading>
          <Text className="text-lg  text-typography-400">
            Enter your email to sign up or login using your email.
          </Text>
        </VStack>
        <Input
          variant="underlined"
          size="xl"
          className="data-[focus=true]:border-primary-600 text-typography-300"
        >
          <InputField
            placeholder="Your email"
            className="font-proximaNova text-typography-900 border-background-300"
          />
        </Input>
        <Button size="lg">
          <ButtonText className="text-lg font-roboto">
            Continue with email
          </ButtonText>
        </Button>
      </VStack>
    </VStack>
  );
}
