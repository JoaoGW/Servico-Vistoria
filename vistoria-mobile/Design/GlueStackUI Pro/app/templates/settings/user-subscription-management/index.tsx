import React, { useState } from "react";
import { ScrollView } from "@/components/ui/scroll-view";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Badge, BadgeText, BadgeIcon } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import {
  Crown,
  Calendar,
  CreditCard,
  Check,
  ChevronRight,
  Download,
} from "lucide-react-native";
import {
  mockSubscription,
  mockPaymentMethod,
  mockBillingHistory,
} from "./data";

const UserSubscriptionManagement: React.FC = () => {
  const [showCancelModal, setShowCancelModal] = useState(false);

  const subscription = mockSubscription;
  const paymentMethod = mockPaymentMethod;
  const billingHistory = mockBillingHistory;

  const handleUpgrade = () => {
    console.log("Upgrade plan");
  };

  const handleCancelSubscription = () => {
    setShowCancelModal(true);
  };

  const handleUpdatePayment = () => {
    console.log("Update payment method");
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    console.log("Download invoice:", invoiceId);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge size="sm" variant="solid" action="success">
            <BadgeIcon as={Check} />
            <BadgeText>Active</BadgeText>
          </Badge>
        );
      case "cancelled":
        return (
          <Badge size="sm" variant="solid" action="error">
            <BadgeText>Cancelled</BadgeText>
          </Badge>
        );
      case "expired":
        return (
          <Badge size="sm" variant="solid" action="warning">
            <BadgeText>Expired</BadgeText>
          </Badge>
        );
      default:
        return null;
    }
  };

  const getInvoiceStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge size="sm" className="rounded" action="success">
            <BadgeText>Paid</BadgeText>
          </Badge>
        );
      case "pending":
        return (
          <Badge size="sm" className="rounded" action="warning">
            <BadgeText>Pending</BadgeText>
          </Badge>
        );
      case "failed":
        return (
          <Badge size="sm" className="rounded" action="error">
            <BadgeText>Failed</BadgeText>
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Box className="flex-1 bg-background-0">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box className="px-4 pt-6 pb-8">
          <VStack space="xl">
            {/* Header */}
            <VStack space="xs" className="flex-1">
              <Heading size="xl">Subscription</Heading>
              <Text size="lg" className="text-typography-400">
                Manage your plan and billing
              </Text>
            </VStack>

            {/* Current Plan Card */}
            <Card size="lg" variant="elevated" className="bg-background-0 px-0">
              <VStack space="lg">
                <HStack space="md" className="items-center justify-between">
                  <HStack space="md" className="items-center">
                    <Box className="w-10 h-10 rounded-full bg-primary-500 items-center justify-center">
                      <Icon as={Crown} size="lg" className="text-white" />
                    </Box>
                    <VStack space="">
                      <Heading size="lg">{subscription.name}</Heading>
                      <Text size="sm" className="text-typography-600">
                        ${subscription.price}/
                        {subscription.billingCycle === "monthly" ? "mo" : "yr"}
                      </Text>
                    </VStack>
                  </HStack>
                  {getStatusBadge(subscription.status)}
                </HStack>

                {/* Billing Info */}
                <VStack space="md">
                  <HStack space="md" className="items-center">
                    <Box className="w-10 h-10 rounded-full bg-background-50 items-center justify-center">
                      <Icon as={Calendar} size="xs" className="text-white" />
                    </Box>
                    <VStack space="" className="flex-1">
                      <Text size="sm" className="text-typography-600">
                        Next billing date
                      </Text>
                      <Text size="md" className="text-typography-900">
                        {new Date(
                          subscription.nextBillingDate
                        ).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </Text>
                    </VStack>
                  </HStack>

                  <HStack space="md" className="items-center">
                    <Box className="w-10 h-10 rounded-full bg-background-50 items-center justify-center">
                      <Icon
                        as={CreditCard}
                        size="xs"
                        className="text-typography-950"
                      />
                    </Box>
                    <VStack space="" className="flex-1">
                      <Text size="sm" className="text-typography-600">
                        Payment method
                      </Text>
                      <Text size="md" className="text-typography-900">
                        {paymentMethod.type} •••• {paymentMethod.last4}
                      </Text>
                    </VStack>
                    <Button
                      variant="link"
                      size="md"
                      onPress={handleUpdatePayment}
                    >
                      <ButtonText className="text-primary-500">Update</ButtonText>
                    </Button>
                  </HStack>
                </VStack>
              </VStack>
            </Card>

            {/* Features Included */}
            <VStack space="md">
              <Heading size="lg">Features Included</Heading>
              <Card size="md" variant="elevated" className="bg-background-50">
                <VStack space="sm">
                  {subscription.features.map((feature, index) => (
                    <HStack key={index} space="md" className="items-center">
                      <Box className="w-5 h-5 rounded-full bg-success-500 items-center justify-center">
                        <Icon as={Check} size="xs" className="text-white" />
                      </Box>
                      <Text size="md" className="text-typography-900 flex-1">
                        {feature}
                      </Text>
                    </HStack>
                  ))}
                </VStack>
              </Card>
            </VStack>

            {/* Action Buttons */}
            <VStack space="md">
              <Button
                size="lg"
                variant="solid"
                action="primary"
                onPress={handleUpgrade}
              >
                <ButtonText>Upgrade Plan</ButtonText>
                <ButtonIcon as={ChevronRight} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                action="negative"
                onPress={handleCancelSubscription}
              >
                <ButtonText>Cancel Subscription</ButtonText>
              </Button>
            </VStack>

            {/* Billing History */}
            <VStack space="md">
              <Heading size="lg">Billing History</Heading>
              <VStack space="xl">
                {billingHistory.map((invoice) => (
                  <Card
                    key={invoice.id}
                    size="md"
                    variant="elevated"
                    className="p-0"
                  >
                    <HStack space="md" className="items-center justify-between">
                      <VStack space="xs" className="flex-1">
                        <Text size="md" className="text-typography-950">
                          ${invoice.amount.toFixed(2)}
                        </Text>
                        <Text size="sm" className="text-typography-700">
                          {new Date(invoice.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </Text>
                      </VStack>
                      <HStack space="md" className="items-center">
                        {getInvoiceStatusBadge(invoice.status)}
                        <Button
                          variant="link"
                          size="md"
                          onPress={() => handleDownloadInvoice(invoice.id)}
                        >
                          <ButtonIcon
                            as={Download}
                            className="text-typography-900"
                          />
                        </Button>
                      </HStack>
                    </HStack>
                  </Card>
                ))}
              </VStack>
            </VStack>
          </VStack>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default UserSubscriptionManagement;
