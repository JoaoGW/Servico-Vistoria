import React, { useState } from "react";
import { ScrollView } from "@/components/ui/scroll-view";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";

export default function OTPVerification() {
  const [otp, setOtp] = useState("");
  
  return (
    <Box className="flex-1 bg-background-0">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box className="px-6 py-8">
          <VStack space="lg">
            {/* Header Section */}
            <VStack space="md">
              <Heading size="xl" className="text-typography-900">
                User verification
              </Heading>
              <Text size="lg" className="text-typography-400">
                OTP has been sent to your mobile number as we as your e-mail
                address, please enter any one of the OTP in the bottom.
              </Text>
            </VStack>

            {/* Lock Icon Illustration */}
            <VStack space="lg" className="mt-8 items-center py-8">
              <VStack className="relative w-32 h-28">
                {/* Lock Shackle */}
                <VStack className="absolute -top-8 left-1/2 -translate-x-1/2 w-20 h-16 border-8 border-typography-600 rounded-t-full" />

                {/* Lock Body */}
                <VStack className="w-32 h-24 bg-background-300 rounded-lg relative items-center justify-end pb-4">
                  {/* Blue Card with Dots */}
                  <HStack
                    space="sm"
                    className="w-24 h-8 bg-primary-500 rounded absolute top-2/3 transform -translate-y-2/3 -right-[30px] items-center justify-center"
                  >
                    <VStack className="w-2 h-2 bg-white rounded-full" />
                    <VStack className="w-2 h-2 bg-white rounded-full" />
                    <VStack className="w-2 h-2 bg-white rounded-full" />
                    <VStack className="w-2 h-2 bg-white rounded-full" />
                  </HStack>
                </VStack>
              </VStack>
            </VStack>

            {/* OTP Input Section */}
            <VStack space="md" className="pt-6">
              <Heading size="lg" className="text-typography-900">
                Enter OTP here
              </Heading>

              <Input className="rounded-xl" size="xl" variant="outline">
                <InputField
                  placeholder="6 digit OTP code"
                  className="text-center"
                  value={otp}
                  onChangeText={setOtp}
                  keyboardType="number-pad"
                  maxLength={6}
                />
              </Input>

              {/* Verify Button */}
              <Button
                size="lg"
                variant="solid"
                action="primary"
              >
                <ButtonText>Verify</ButtonText>
              </Button>
            </VStack>
          </VStack>
        </Box>
      </ScrollView>
    </Box>
  );
}
