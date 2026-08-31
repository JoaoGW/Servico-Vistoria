import React, { useState } from "react";
import { ScrollView } from "@/components/ui/scroll-view";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { RadioGroup } from "@/components/ui/radio";
import { ArrowLeft, CreditCard } from "lucide-react-native";
import { DeliveryMethod, TimeSlot } from "./types";
import { mockDeliveryMethods, mockTimeSlots } from "./data";
import {
  DeliveryMethodCard,
  TimeSlotCard,
  DeliverySummary,
} from "./components";

const DeliveryOptionsScreen: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>("standard");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("1");

  const selectedDeliveryMethod = mockDeliveryMethods.find(
    (method) => method.id === selectedMethod
  );

  const selectedTimeSlotData = mockTimeSlots.find(
    (slot) => slot.id === selectedTimeSlot
  );

  return (
    <Box className="flex-1 bg-background-0">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box className="px-4 pt-6 pb-8">
          <VStack space="xl">
            {/* Header */}
            <VStack space="sm">
              <HStack space="md" className="items-center">
                <Heading size="xl">Delivery Options</Heading>
              </HStack>
              <Text size="lg" className="text-typography-400">
                Choose your preferred delivery method and time slot
              </Text>
            </VStack>

            {/* Delivery Methods */}
            <VStack space="md">
              <RadioGroup value={selectedMethod} onChange={setSelectedMethod}>
                <VStack space="md">
                  {mockDeliveryMethods.map((method) => (
                    <DeliveryMethodCard
                      key={method.id}
                      method={method}
                      isSelected={selectedMethod === method.id}
                    />
                  ))}
                </VStack>
              </RadioGroup>
            </VStack>

            {/* Time Slots */}
            <VStack space="md">
              <Heading size="lg">Delivery Time</Heading>
              <RadioGroup
                value={selectedTimeSlot}
                onChange={setSelectedTimeSlot}
              >
                <VStack space="sm">
                  {mockTimeSlots.map((slot) => (
                    <TimeSlotCard
                      key={slot.id}
                      slot={slot}
                      isSelected={selectedTimeSlot === slot.id}
                    />
                  ))}
                </VStack>
              </RadioGroup>
            </VStack>

            {/* Delivery Summary */}
            <DeliverySummary
              selectedMethod={selectedDeliveryMethod}
              selectedTimeSlot={selectedTimeSlotData}
            />

            {/* Continue Button */}
            <Button
              size="lg"
              variant="solid"
              action="primary"
              className="w-full"
            >
              <ButtonIcon as={CreditCard} />
              <ButtonText>Continue to Payment</ButtonText>
            </Button>
          </VStack>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default DeliveryOptionsScreen;
