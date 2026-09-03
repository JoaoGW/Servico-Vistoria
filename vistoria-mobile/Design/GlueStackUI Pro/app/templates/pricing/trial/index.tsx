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

// Import Lucide React Native icons
import { Check, ArrowLeft } from "lucide-react-native";

// Types
interface Plan {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  period: string;
  popular: boolean;
  description: string;
}

interface Feature {
  name: string;
  highlight?: boolean;
}

// Data
const plans: Plan[] = [
  {
    id: 1,
    name: "Basic",
    price: 0,
    period: "month",
    popular: false,
    description: "Perfect for getting started",
  },
  {
    id: 2,
    name: "Pro",
    price: 39.99,
    originalPrice: 199.99,
    period: "year",
    popular: true,
    description: "Most popular choice",
  },
  {
    id: 3,
    name: "Team",
    price: 79,
    period: "month",
    popular: false,
    description: "For growing teams",
  },
];

const features: Feature[] = [
  { name: "Everything in Free, plus:", highlight: false },
  { name: "Unlimited AI credits", highlight: true },
  { name: "5 GB storage", highlight: false },
  { name: "Unlimited project history", highlight: false },
  { name: "Calendar integration & syncing", highlight: false },
  { name: "Guest sharing and links", highlight: false },
];



const HeroSection: React.FC = () => (
  <VStack space="xl" className="mb-8 px-6">
    <Heading size="5xl" className="leading-tight">
      Start your membership now
    </Heading>

    {/* Features List */}
    <VStack space="lg">
      {features.map((feature, index) => (
        <HStack key={index} space="md" className="items-center">
          <Box className="w-8 h-8 rounded-full bg-primary-500/20 items-center justify-center">
            <Icon as={Check} size="lg" className="text-primary-500 stroke-2" />
          </Box>
          <Text
            size="2xl"
            className={
              feature.highlight
                ? "text-primary-500 font-bold"
                : "text-typography-900"
            }
          >
            {feature.name}
          </Text>
        </HStack>
      ))}
    </VStack>
  </VStack>
);

interface PlanCardProps {
  plan: Plan;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan }) => {
  const handleSelectPlan = (): void => {
    // Handle plan selection
  };

  return (
    <Card
      size="lg"
      variant="elevated"
      className="p-6 rounded-3xl bg-background-50"
    >
      <VStack space="lg">
        {/* Plan Header */}
        <VStack space="sm">
          <Text size="2xl" className="font-semibold">
            {plan.name} plan
          </Text>

          <HStack space="sm" className="items-end">
            {plan.originalPrice && (
              <Text size="lg" className="text-typography-500 line-through">
                ${plan.originalPrice}
              </Text>
            )}
            <Heading size="3xl">${plan.price}</Heading>
            <Text size="lg" className="text-typography-600 mb-1">
              /{plan.period}
            </Text>
          </HStack>
        </VStack>
      </VStack>
    </Card>
  );
};

const PricingScreen: React.FC = () => {
  return (
    <VStack className="h-full bg-background-0 pb-safe">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-11 lg:px-10"
      >
        <VStack className="pt-6">
          <HeroSection />

          {/* Plan Cards */}
          <VStack
            space="lg"
            className="px-6 mb-8 web:lg:grid web:lg:grid-cols-3"
          >
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </VStack>
        </VStack>
      </ScrollView>
    </VStack>
  );
};

export default PricingScreen;
