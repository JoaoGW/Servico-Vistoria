import React from "react";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Icon } from "@/components/ui/icon";
import { ScrollView } from "@/components/ui/scroll-view";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionTitleText,
  AccordionContentText,
  AccordionIcon,
  AccordionContent,
} from "@/components/ui/accordion";

// Import Lucide React Native icons
import { Sparkles } from "lucide-react-native";
import { Badge, BadgeText, BadgeIcon } from "@/components/ui/badge";

const BundleHeader: React.FC = () => {
  return (
    <VStack space="sm" className="px-6 py-3">
      <Heading size="xl" className="text-typography-900">
        Bundle Packages
      </Heading>
      <Text size="lg" className="text-typography-400">
        Choose the perfect plan for your needs and save up to 45% with our
        bundle packages.
      </Text>
    </VStack>
  );
};

const pricingPlans = [
  {
    id: 1,
    name: "Starter",
    price: 29,
    period: "month",
    features: ["5 Projects", "10GB Storage", "Basic Support"],
  },
  {
    id: 2,
    name: "Professional",
    price: 79,
    period: "month",
    features: [
      "Unlimited Projects",
      "100GB Storage",
      "Priority Support",
      "24/7 Support",
      "Unlimited AI credits",
    ],
    popular: true,
  },
  {
    id: 3,
    name: "Enterprise",
    price: 199,
    period: "month",
    features: ["Unlimited Projects", "1TB Storage", "Priority Support", "24/7 Support", "Unlimited AI credits"],
    popular: false,
  },
];

const SavingsHighlight: React.FC = () => (
  <Box className="flex-1 w-full bg-background-0 p-6">
    <VStack space="lg" className="flex-1">
      <Box className="w-full bg-background-0 rounded-2xl">
        <VStack space="lg">
          <VStack space="md">
            {pricingPlans.map((plan) => {
              const isStarter = plan.id === 1;
              return (
                <Box
                  key={plan.id}
                  className={`rounded-xl border ${
                    plan.popular
                      ? "bg-background-50 border-none p-4"
                      : isStarter
                      ? "bg-background-0 border-outline-200 p-2.5"
                      : "bg-background-0 border-outline-200 p-4"
                  }`}
                >
                  <HStack className="items-center justify-between mb-1.5">
                    <VStack>
                      <Heading
                        size="lg"
                        className="text-typography-900"
                      >
                        {plan.name}
                      </Heading>
                      <HStack space="xs" className="items-baseline">
                        <Text
                          size="2xl"
                          className="text-typography-900 font-bold"
                        >
                          ${plan.price}
                        </Text>
                        <Text
                          size="sm"
                          className="text-typography-500"
                        >
                          /{plan.period}
                        </Text>
                      </HStack>
                    </VStack>
                    {plan.popular && (
                      <Badge
                        size="sm"
                        variant="solid"
                        action="primary"
                        className="rounded-full"
                      >
                        <BadgeText>Popular</BadgeText>
                      </Badge>
                    )}
                  </HStack>
                  <VStack
                    space={isStarter ? "xs" : plan.popular ? "xs" : "xs"}
                    className={isStarter ? "mt-2" : "mt-3"}
                  >
                    {plan.features.map((feature, index) => (
                      <HStack key={index} space="xs" className="items-center">
                        <Icon
                          as={Sparkles}
                          size= "sm"
                          className="text-typography-600"
                        />
                        <Text
                          size="sm"
                          className="text-typography-600"
                        >
                          {feature}
                        </Text>
                      </HStack>
                    ))}
                  </VStack>
                </Box>
              );
            })}
          </VStack>
        </VStack>
      </Box>
    </VStack>
  </Box>
);

const BundleTierScreen: React.FC = () => {
  return (
    <VStack className="h-full bg-background-0">
      <BundleHeader />
      <SavingsHighlight />
    
      <Box className="p-6 pb-safe">
        <Button
          size="lg"
          variant="solid"
          action="primary"
          className="w-full rounded-xl"
          onPress={() => console.log("7 day trial selected")}
        >
          <ButtonText size="lg">Choose 7 day trial</ButtonText>
        </Button>
      </Box>
    </VStack>
  );
};

export default BundleTierScreen;
