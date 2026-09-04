import React from "react";
import { ScrollView } from "@/components/ui/scroll-view";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Button, ButtonText } from "@/components/ui/button";
import { useRTL } from "@/utils/rtl-lang-context";

export default function RTLTestPage() {
  const { isRTL, direction, toggleRTL, setRTL } = useRTL();

  return (
    <ScrollView className="flex-1 bg-background-0">
      <Box className="p-6">
        <VStack space="xl" className="items-center">
          <Heading size="2xl" className="text-center">
            RTL Test Page
          </Heading>

          <VStack space="lg" className="w-full max-w-2xl">
            {/* Current Settings */}
            <Box className="p-6 bg-background-100 rounded-xl">
              <Heading size="lg" className="mb-4">
                Current Settings
              </Heading>
              <VStack space="sm">
                <HStack className="justify-between">
                  <Text className="font-semibold">RTL Mode:</Text>
                  <Text>{isRTL ? "Yes" : "No"}</Text>
                </HStack>
                <HStack className="justify-between">
                  <Text className="font-semibold">Direction:</Text>
                  <Text>{direction}</Text>
                </HStack>
              </VStack>
            </Box>

            {/* Text Direction Test */}
            <Box className="p-6 bg-primary-50 rounded-xl">
              <Heading size="lg" className="mb-4">
                Text Direction Test
              </Heading>
              <VStack space="md">
                <Box className="p-4 bg-white rounded-lg">
                  <Text size="md" className="text-primary-900">
                    {isRTL
                      ? "هذا نص تجريبي للاتجاه من اليمين إلى اليسار. يجب أن يظهر النص من اليمين إلى اليسار عندما يكون RTL مفعلاً."
                      : "This is a sample text for left-to-right direction. The text should appear from left to right when RTL is disabled."}
                  </Text>
                </Box>
                <Box className="p-4 bg-white rounded-lg">
                  <Text size="sm" className="text-typography-600">
                    {isRTL
                      ? "النص أعلاه يجب أن يكون محاذياً إلى اليمين في وضع RTL"
                      : "The text above should be left-aligned in LTR mode"}
                  </Text>
                </Box>
              </VStack>
            </Box>

            {/* Layout Test */}
            <Box className="p-6 bg-background-100 rounded-xl">
              <Heading size="lg" className="mb-4">
                Layout Direction Test
              </Heading>
              <VStack space="md">
                <HStack className="justify-between items-center p-4 bg-white rounded-lg">
                  <Text size="sm" className="font-semibold">
                    Left Item
                  </Text>
                  <Text size="sm" className="font-semibold">
                    Center Item
                  </Text>
                  <Text size="sm" className="font-semibold">
                    Right Item
                  </Text>
                </HStack>
                <Text size="sm" className="text-typography-600 text-center">
                  {isRTL
                    ? "العناصر أعلاه يجب أن تظهر بالترتيب المعكوس في وضع RTL"
                    : "The items above should appear in reverse order in RTL mode"}
                </Text>
              </VStack>
            </Box>

            {/* Controls */}
            <Box className="p-6 bg-background-100 rounded-xl">
              <Heading size="lg" className="mb-4">
                Controls
              </Heading>
              <VStack space="md">
                <Button onPress={toggleRTL} variant="solid" size="lg">
                  <ButtonText>
                    {isRTL ? "Switch to LTR" : "Switch to RTL"}
                  </ButtonText>
                </Button>

                <VStack space="sm">
                  <Text className="font-semibold">Direct RTL Control:</Text>
                  <HStack space="sm" className="justify-center">
                    <Button
                      onPress={() => setRTL(false)}
                      variant={!isRTL ? "solid" : "outline"}
                      size="md"
                    >
                      <ButtonText>LTR</ButtonText>
                    </Button>
                    <Button
                      onPress={() => setRTL(true)}
                      variant={isRTL ? "solid" : "outline"}
                      size="md"
                    >
                      <ButtonText>RTL</ButtonText>
                    </Button>
                  </HStack>
                </VStack>
              </VStack>
            </Box>

            {/* URL Parameters Info */}
            <Box className="p-6 bg-info-50 rounded-xl">
              <Heading size="lg" className="mb-4">
                URL Parameters
              </Heading>
              <VStack space="sm">
                <Text size="sm" className="text-typography-700">
                  You can test this page with URL parameters:
                </Text>
                <Text size="sm" className="font-mono bg-white p-2 rounded">
                  ?rtl=true
                </Text>
                <Text size="sm" className="font-mono bg-white p-2 rounded">
                  ?rtl=false
                </Text>
                <Text size="sm" className="text-typography-600">
                  Use rtl=true to enable RTL mode, rtl=false to disable
                </Text>
              </VStack>
            </Box>
          </VStack>
        </VStack>
      </Box>
    </ScrollView>
  );
}
