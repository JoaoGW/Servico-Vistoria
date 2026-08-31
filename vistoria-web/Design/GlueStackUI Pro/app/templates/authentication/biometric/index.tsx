import React from "react";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { Icon } from "@/components/ui/icon";
import { Fingerprint } from "lucide-react-native";

export default function BiometricUnlock() {
  const handleBiometricLogin = () => {
    // Add biometric authentication logic here
  };

  return (
    <Box className="flex-1 bg-background-0">
      <VStack className="h-full justify-between px-6 py-12">
        {/* Center content */}
        <VStack space="2xl" className="items-center flex-1 justify-center">
          {/* Biometric icon with brand letter */}
          <VStack space="lg" className="items-center">
            <Box className="relative">
              {/* Outer ring */}
              <Box className="w-36 h-36 rounded-full items-center justify-center border-4 border-outline-50">
                {/* Inner circle with brand letter */}
                <Box className="w-24 h-24 rounded-full bg-primary-500 items-center justify-center shadow-lg">
                  <Heading size="3xl" className="text-white">
                    F
                  </Heading>
                </Box>
              </Box>
            </Box>

          
          </VStack>

          {/* Welcome text section */}
          <VStack space="md" className="items-center mt-4">
            <Text size="lg" className="text-typography-500">
              Welcome back.
            </Text>
            <Heading size="3xl" className="text-center">
              Unlock your{"\n"}account.
            </Heading>
          </VStack>

          {/* Description text */}
          <VStack space="xs" className="items-center px-8">
            <Text size="md" className="text-typography-500 text-center">
              You have a Flux account stored in your phone.
            </Text>
            <Text size="md" className="text-typography-500 text-center">
              Tap below to start the recovery process.
            </Text>
          </VStack>
        </VStack>

        {/* Bottom action button */}
        <VStack className="pb-8">
          <Button
            size="lg"
            variant="solid"
            action="primary"
            onPress={handleBiometricLogin}
          >
            <ButtonIcon as={Fingerprint} />
            <ButtonText>Login with Biometrics</ButtonText>
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
}
