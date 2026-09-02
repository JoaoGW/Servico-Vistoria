import React from "react";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { Badge, BadgeText } from "@/components/ui/badge";
import {
  Radio,
  RadioIndicator,
  RadioIcon,
  RadioLabel,
} from "@/components/ui/radio";
import { Icon } from "@/components/ui/icon";
import { CheckCircle, Circle } from "lucide-react-native";
import { DeliveryMethod, TimeSlot } from "./types";

interface DeliveryMethodCardProps {
  method: DeliveryMethod;
  isSelected: boolean;
}

export const DeliveryMethodCard: React.FC<DeliveryMethodCardProps> = ({
  method,
  isSelected,
}) => (
  <Radio value={method.id}>
    <RadioLabel className="w-full">
      <Card
        size="lg"
        variant="elevated"
        className={`w-full bg-background-50 p-4 ${
          isSelected ? "border-outline-500/50 border-2" : "border-outline-100"
        }`}
      >
        <VStack space="md">
          <HStack space="md" className="justify-between items-start">
            <HStack space="md" className="flex-1">
              <Icon
                as={method.icon}
                size="xl"
                className="text-typography-950"
              />
              <VStack space="xs" className="flex-1">
                <HStack space="sm" className="items-center">
                  <Heading size="md">{method.name}</Heading>
                  {method.isPopular && (
                    <Badge size="sm" variant="solid" action="success">
                      <BadgeText>Popular</BadgeText>
                    </Badge>
                  )}
                </HStack>
                <Text  className="text-typography-400">
                  {method.description}
                </Text>
                <HStack space="md" className="items-center">
                  <Text  className="text-typography-700">
                    Est. {method.estimatedTime}
                  </Text>
                  <Text size="lg" className="font-semibold text-typography-950">
                    ${method.price.toFixed(2)}
                  </Text>
                </HStack>
              </VStack>
            </HStack>
            <RadioIndicator>
              <RadioIcon as={Circle} />
            </RadioIndicator>
          </HStack>

          <VStack space="xs">
            {method.features.map((feature, index) => (
              <HStack key={index} space="sm" className="items-center">
                <Icon as={CheckCircle} size="sm" className="text-success-500" />
                <Text size="sm" className="text-typography-600">
                  {feature}
                </Text>
              </HStack>
            ))}
          </VStack>
        </VStack>
      </Card>
    </RadioLabel>
  </Radio>
);

interface TimeSlotCardProps {
  slot: TimeSlot;
  isSelected: boolean;
}

export const TimeSlotCard: React.FC<TimeSlotCardProps> = ({
  slot,
  isSelected,
}) => (
  <Radio value={slot.id} disabled={!slot.available}>
    <RadioLabel className="w-full">
      <Card
        size="md"
        variant="elevated"
        className={`w-full bg-background-50 ${
          isSelected ? "border-outline-200 border-2" : ""
        } ${!slot.available ? "opacity-50" : ""}`}
      >
        <HStack space="md" className="justify-between items-center">
          <VStack space="xs">
            <Text size="md" className="font-medium text-typography-950">
              {slot.time}
            </Text>
            <Text size="sm" className="text-typography-600">
              {slot.date}
            </Text>
          </VStack>
          <HStack space="sm" className="items-center">
            {!slot.available && (
              <Badge size="sm" variant="outline" action="error">
                <BadgeText>Unavailable</BadgeText>
              </Badge>
            )}
            <RadioIndicator>
              <RadioIcon as={Circle} />
            </RadioIndicator>
          </HStack>
        </HStack>
      </Card>
    </RadioLabel>
  </Radio>
);

interface DeliverySummaryProps {
  selectedMethod: DeliveryMethod | undefined;
  selectedTimeSlot: TimeSlot | undefined;
}

export const DeliverySummary: React.FC<DeliverySummaryProps> = ({
  selectedMethod,
  selectedTimeSlot,
}) => (
  <Card size="lg" variant="elevated" className="bg-background-50">
    <VStack space="md">
      <Heading size="lg">Delivery Summary</Heading>
      <VStack space="sm">
        <HStack space="md" className="justify-between items-center">
          <Text size="md" className="text-typography-600">
            Delivery Method
          </Text>
          <Text size="md" className="font-medium text-typography-950">
            {selectedMethod?.name}
          </Text>
        </HStack>
        <HStack space="md" className="justify-between items-center">
          <Text size="md" className="text-typography-600">
            Delivery Time
          </Text>
          <Text size="md" className="font-medium text-typography-950">
            {selectedTimeSlot?.time}
          </Text>
        </HStack>
        <HStack space="md" className="justify-between items-center">
          <Text size="md" className="text-typography-600">
            Delivery Date
          </Text>
          <Text size="md" className="font-medium text-typography-950">
            {selectedTimeSlot?.date}
          </Text>
        </HStack>
        <Box className="h-px bg-outline-100" />
        <HStack space="md" className="justify-between items-center">
          <Text size="lg" className="font-semibold text-typography-950">
            Delivery Fee
          </Text>
          <Text size="lg" className="font-bold text-typography-950">
            ${selectedMethod?.price.toFixed(2)}
          </Text>
        </HStack>
      </VStack>
    </VStack>
  </Card>
);
