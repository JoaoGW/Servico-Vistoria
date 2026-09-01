import React, { useState } from "react";
import { ScrollView } from "@/components/ui/scroll-view";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge, BadgeText } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { Plus, ChevronLeft } from "lucide-react-native";
import { mockPaymentMethods } from "./data";
import { PaymentMethod, PaymentMethodScreenProps } from "./types";

const PaymentMethodScreen: React.FC<PaymentMethodScreenProps> = ({
  onSelectMethod,
  onAddNew,
  selectedMethodId,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(
    selectedMethodId || null
  );

  const handleMethodSelect = (method: PaymentMethod) => {
    setSelectedMethod(method.id);
    onSelectMethod?.(method);
  };

  const handleAddNew = () => {
    onAddNew?.();
  };

  const renderPaymentMethod = (method: PaymentMethod) => {
    const isSelected = selectedMethod === method.id;

    return (
      <Card
        key={method.id}
        size="lg"
        variant="outline"
        className={`${
          isSelected ? "border-primary-500" : "border-outline-100"
        }`}
      >
        <Button
          size="lg"
          variant="link"
          onPress={() => handleMethodSelect(method)}
          className="w-full p-0"
        >
          <HStack space="md" className="items-center justify-between w-full">
            <HStack space="lg" className="items-center flex-1">
              <Icon as={method.iconComponent} className="h-8 w-8" />

              <VStack space="xs" className="flex-1">
                <HStack space="sm" className="items-center">
                  <Text size="lg" className="text-typography-950 font-semibold">
                    {method.name}
                  </Text>
                  {method.isDefault && (
                    <Badge size="sm" variant="solid" action="success">
                      <BadgeText>Default</BadgeText>
                    </Badge>
                  )}
                </HStack>

                <Text size="sm" className="text-typography-400">
                  {method.lastFour ? `•••• ${method.lastFour}` : ""}
                  {method.expiryDate ? ` • Expires ${method.expiryDate}` : ""}
                  {method.bankName ? ` • ${method.bankName}` : ""}
                  {method.walletType ? ` • ${method.walletType}` : ""}
                </Text>
              </VStack>
            </HStack>
          </HStack>
        </Button>
      </Card>
    );
  };

  const handleContinue = () => {
    if (selectedMethod) {
      const method = mockPaymentMethods.find((m) => m.id === selectedMethod);
      if (method) {
        onSelectMethod?.(method);
      }
    }
  };

  return (
    <Box className="flex-1 bg-background-0">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box className="px-4 pt-6 pb-8">
          <VStack space="xl">
            {/* Header */}
            <VStack space="sm">
              <Heading size="xl" className="text-typography-950">
                Payment Methods
              </Heading>

              <Text size="lg" className="text-typography-400">
                Choose your preferred payment method
              </Text>
            </VStack>

            {/* Payment Methods List */}
            <VStack space="md">
              {mockPaymentMethods.map(renderPaymentMethod)}
            </VStack>

           
          </VStack>
        </Box>
      </ScrollView>
      <Box className="p-6 pb-safe">
        <Button
          size="lg"
          variant="solid"
          action="primary"
          className="w-full"
          onPress={handleContinue}
          isDisabled={!selectedMethod}
        >
          <ButtonText size="lg">Continue with selected method</ButtonText>
        </Button>
      </Box>
    </Box>
  );
};

export default PaymentMethodScreen;
