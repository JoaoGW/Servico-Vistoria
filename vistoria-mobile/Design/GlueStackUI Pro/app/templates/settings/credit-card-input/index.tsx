import React, { useState } from "react";
import { ScrollView } from "@/components/ui/scroll-view";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField, InputSlot, InputIcon } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { CreditCard, Lock, Shield, Calendar, User } from "lucide-react-native";

interface CardFormData {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

const CreditCardInputForm: React.FC = () => {
  const [formData, setFormData] = useState<CardFormData>({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState<Partial<CardFormData>>({});

  const formatCardNumber = (value: string): string => {
    const cleaned = value.replace(/\s/g, "");
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(" ") : cleaned;
  };

  const formatExpiryDate = (value: string): string => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  const handleCardNumberChange = (value: string) => {
    const cleaned = value.replace(/\s/g, "");
    if (cleaned.length <= 16 && /^\d*$/.test(cleaned)) {
      const formatted = formatCardNumber(cleaned);
      setFormData({ ...formData, cardNumber: formatted });
      setErrors({ ...errors, cardNumber: "" });
    }
  };

  const handleCardNameChange = (value: string) => {
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setFormData({ ...formData, cardName: value.toUpperCase() });
      setErrors({ ...errors, cardName: "" });
    }
  };

  const handleExpiryDateChange = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length <= 4) {
      const formatted = formatExpiryDate(cleaned);
      setFormData({ ...formData, expiryDate: formatted });
      setErrors({ ...errors, expiryDate: "" });
    }
  };

  const handleCvvChange = (value: string) => {
    if (value.length <= 4 && /^\d*$/.test(value)) {
      setFormData({ ...formData, cvv: value });
      setErrors({ ...errors, cvv: "" });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<CardFormData> = {};

    const cardNumberCleaned = formData.cardNumber.replace(/\s/g, "");
    if (!cardNumberCleaned || cardNumberCleaned.length < 13) {
      newErrors.cardNumber = "Invalid card number";
    }

    if (!formData.cardName.trim()) {
      newErrors.cardName = "Cardholder name is required";
    }

    if (!formData.expiryDate || formData.expiryDate.length < 5) {
      newErrors.expiryDate = "Invalid expiry date";
    } else {
      const [month, year] = formData.expiryDate.split("/");
      const monthNum = parseInt(month, 10);
      if (monthNum < 1 || monthNum > 12) {
        newErrors.expiryDate = "Invalid month";
      }
    }

    if (!formData.cvv || formData.cvv.length < 3) {
      newErrors.cvv = "Invalid CVV";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Form submitted:", formData);
      // Handle secure submission
    }
  };

  return (
    <Box className="flex-1 bg-background-0">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box className="px-4 pt-6 pb-8">
          <VStack space="xl">
            {/* Header */}
            <VStack space="sm">
              <Heading size="xl">Payment Method</Heading>
              <Text size="lg" className="text-typography-400">
                Enter your card details securely
              </Text>
            </VStack>

            {/* Security Badge */}
            <HStack space="md" className="items-center">
              <Icon
                as={Shield}
                size="lg"
                className="text-success-500 fill-success-500"
              />
              <VStack space="xs" className="flex-1">
                <Text size="sm" className="font-semibold text-typography-900">
                  PCI-DSS Compliant
                </Text>
                <Text size="xs" className="text-typography-500">
                  Your information is encrypted and secure
                </Text>
              </VStack>
            </HStack>

            {/* Form Fields */}
            <Card size="lg" variant="elevated" className="p-0">
              <VStack space="lg">
                {/* Card Number */}
                <VStack space="xs">
                  <Text size="sm" className="font-semibold text-typography-900">
                    Card Number
                  </Text>
                  <Input
                    size="xl"
                    variant="outline"
                    className="border-outline-100"
                  >
                    <InputSlot className="pl-4">
                      <InputIcon
                        as={CreditCard}
                        className="text-typography-400"
                      />
                    </InputSlot>
                    <InputField
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChangeText={handleCardNumberChange}
                      keyboardType="numeric"
                      maxLength={19}
                    />
                  </Input>
                  {errors.cardNumber ? (
                    <Text size="xs" className="text-error-500">
                      {errors.cardNumber}
                    </Text>
                  ) : null}
                </VStack>

                {/* Cardholder Name */}
                <VStack space="xs">
                  <Text size="sm" className="font-semibold text-typography-900">
                    Cardholder Name
                  </Text>
                  <Input
                    size="xl"
                    variant="outline"
                    className="border-outline-100"
                  >
                    <InputSlot className="pl-4">
                      <InputIcon as={User} className="text-typography-400" />
                    </InputSlot>
                    <InputField
                      placeholder="JOHN DOE"
                      value={formData.cardName}
                      onChangeText={handleCardNameChange}
                      autoCapitalize="characters"
                    />
                  </Input>
                  {errors.cardName ? (
                    <Text size="xs" className="text-error-500">
                      {errors.cardName}
                    </Text>
                  ) : null}
                </VStack>

                {/* Expiry Date and CVV */}
                <HStack space="md">
                  <VStack space="xs" className="flex-1">
                    <Text
                      size="sm"
                      className="font-semibold text-typography-900"
                    >
                      Expiry Date
                    </Text>
                    <Input
                      size="xl"
                      variant="outline"
                      className="border-outline-100"
                    >
                      <InputSlot className="pl-4">
                        <InputIcon
                          as={Calendar}
                          className="text-typography-400"
                        />
                      </InputSlot>
                      <InputField
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChangeText={handleExpiryDateChange}
                        keyboardType="numeric"
                        maxLength={5}
                      />
                    </Input>
                    {errors.expiryDate ? (
                      <Text size="xs" className="text-error-500">
                        {errors.expiryDate}
                      </Text>
                    ) : null}
                  </VStack>

                  <VStack space="xs" className="flex-1">
                    <Text
                      size="sm"
                      className="font-semibold text-typography-900"
                    >
                      CVV
                    </Text>
                    <Input
                      size="xl"
                      variant="outline"
                      className="border-outline-100"
                    >
                      <InputSlot className="pl-4">
                        <InputIcon as={Lock} className="text-typography-400" />
                      </InputSlot>
                      <InputField
                        placeholder="123"
                        value={formData.cvv}
                        onChangeText={handleCvvChange}
                        keyboardType="numeric"
                        maxLength={4}
                        secureTextEntry
                      />
                    </Input>
                    {errors.cvv ? (
                      <Text size="xs" className="text-error-500">
                        {errors.cvv}
                      </Text>
                    ) : null}
                  </VStack>
                </HStack>

                {/* CVV Info */}
                <Box className="bg-info-50 p-3 rounded-lg mt-2">
                  <Text size="xs" className="text-info-700">
                    The CVV is the 3-digit code on the back of your card (4
                    digits for Amex)
                  </Text>
                </Box>
              </VStack>
            </Card>

            {/* Security Notice */}
            <Card size="md" className="bg-background-50 ">
              <HStack space="md" className="items-center">
                <Icon as={Lock} size="lg" className="text-success-600" />
                <VStack space="xs" className="flex-1">
                  <Text size="sm" className="font-semibold text-typography-900">
                    Secure Payment
                  </Text>
                  <Text size="xs" className="text-typography-600">
                    All transactions are encrypted with 256-bit SSL
                  </Text>
                </VStack>
              </HStack>
            </Card>

            {/* Submit Button */}
            <VStack space="md" className="mt-8">
              <Button
                size="lg"
                variant="solid"
                action="primary"
                onPress={handleSubmit}
              >
                <ButtonText>Add Payment Method</ButtonText>
              </Button>

              <Button size="lg" variant="outline" action="secondary">
                <ButtonText>Cancel</ButtonText>
              </Button>
            </VStack>

            {/* Footer Note */}
            <Text size="xs" className="text-typography-500 text-center">
              By adding a payment method, you agree to our Terms of Service and
              Privacy Policy
            </Text>
          </VStack>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default CreditCardInputForm;
