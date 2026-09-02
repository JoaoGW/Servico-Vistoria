import React from "react";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Button, ButtonText } from "@/components/ui/button";
import { useRTL } from "@/utils/rtl-lang-context";

export const RTLDemo: React.FC = () => {
  const { isRTL, direction, toggleRTL, setRTL } = useRTL();

  return (
    <Box className="p-4 bg-background-0">
      <VStack space="lg" className="items-center">
        <Heading size="xl" className="text-center">
          RTL Demo
        </Heading>

        <VStack space="md" className="w-full max-w-md">
          <Box className="p-4 bg-background-100 rounded-lg">
            <Text size="sm" className="font-semibold mb-2">
              Current Settings:
            </Text>
            <Text size="sm">RTL: {isRTL ? "Yes" : "No"}</Text>
            <Text size="sm">Direction: {direction}</Text>
          </Box>

          <VStack space="sm">
            <Text size="md" className="font-semibold">
              Test Text Direction:
            </Text>
            <Box className="p-3 bg-primary-100 rounded">
              <Text size="sm" className="text-primary-900">
                {isRTL
                  ? "هذا نص تجريبي للاتجاه من اليمين إلى اليسار"
                  : "This is a sample text for left-to-right direction"}
              </Text>
            </Box>
          </VStack>

          <VStack space="sm">
            <Text size="md" className="font-semibold">
              Toggle RTL:
            </Text>
            <Button onPress={toggleRTL} variant="outline" size="sm">
              <ButtonText>
                {isRTL ? "Switch to LTR" : "Switch to RTL"}
              </ButtonText>
            </Button>
          </VStack>

          <VStack space="sm">
            <Text size="md" className="font-semibold">
              Direct RTL Control:
            </Text>
            <HStack space="sm" className="justify-center">
              <Button
                onPress={() => setRTL(false)}
                variant={!isRTL ? "solid" : "outline"}
                size="sm"
              >
                <ButtonText>LTR</ButtonText>
              </Button>
              <Button
                onPress={() => setRTL(true)}
                variant={isRTL ? "solid" : "outline"}
                size="sm"
              >
                <ButtonText>RTL</ButtonText>
              </Button>
            </HStack>
          </VStack>

          <VStack space="sm">
            <Text size="md" className="font-semibold">
              Layout Test:
            </Text>
            <HStack
              space="md"
              className="justify-between items-center p-3 bg-background-100 rounded"
            >
              <Text size="sm">Left Item</Text>
              <Text size="sm">Center Item</Text>
              <Text size="sm">Right Item</Text>
            </HStack>
          </VStack>
        </VStack>
      </VStack>
    </Box>
  );
};
