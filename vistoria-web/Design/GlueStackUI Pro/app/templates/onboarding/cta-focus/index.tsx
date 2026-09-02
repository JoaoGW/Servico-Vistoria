import React from "react";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Badge, BadgeText, BadgeIcon } from "@/components/ui/badge";
import {
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  Users,
  Star,
} from "lucide-react-native";

interface Benefit {
  id: string;
  text: string;
  icon: any;
}

const benefits: Benefit[] = [
  {
    id: "1",
    text: "Unlimited access to all premium features",
    icon: Zap,
  },
  {
    id: "2",
    text: "Bank-level security for your data",
    icon: Shield,
  },
  {
    id: "3",
    text: "Collaborate with unlimited team members",
    icon: Users,
  },
];

const CTAFocusOnboarding: React.FC = () => {
  const handleGetStarted = () => {
    console.log("Getting started...");
  };

  const handleSignIn = () => {
    console.log("Signing in...");
  };

  return (
    <Box className="flex-1 bg-background-0">
      <VStack className="flex-1">
        {/* Hero Section with Gradient */}
        <Box className="flex-1 items-center justify-center px-6 pt-20">
          <VStack space="2xl" className="items-center w-full max-w-md">
            <Icon as={Star} size="4xl" />

            {/* Main Heading */}
            <VStack space="md" className="items-center">
              <Heading size="3xl" className="text-center">
                You're All Set!
              </Heading>
              <Text size="lg" className="text-typography-600 text-center">
                Join thousands of satisfied users and start your journey today
              </Text>
            </VStack>

            {/* Trust Badge */}
            <HStack space="md" className="items-center justify-center">
              <Badge size="md" variant="solid" action="success">
                <BadgeIcon as={Star} />
                <BadgeText>4.9/5 Rating</BadgeText>
              </Badge>
              <Badge size="md" variant="solid" action="info">
                <BadgeIcon as={Users} />
                <BadgeText>50k+ Users</BadgeText>
              </Badge>
            </HStack>

            {/* Benefits List */}
            <VStack space="md" className="w-full mt-4">
              {benefits.map((benefit) => (
                <HStack
                  key={benefit.id}
                  space="md"
                  className="items-start bg-background-50 px-4 py-3 rounded-xl"
                >
                  <Box className="w-6 h-6 bg-primary-500 rounded-full items-center justify-center mt-0.5">
                    <Icon as={CheckCircle} size="sm" className="text-white" />
                  </Box>
                  <Text size="md" className="flex-1 text-typography-900">
                    {benefit.text}
                  </Text>
                </HStack>
              ))}
            </VStack>
          </VStack>
        </Box>

        {/* CTA Section */}
        <VStack space="lg" className="px-6 pb-12 pt-8">
          {/* Primary CTA */}
          <Button
            size="lg"
            variant="solid"
            action="primary"
            onPress={handleGetStarted}
            className="w-full rounded-xl"
          >
            <ButtonText>Get Started Now</ButtonText>
            <ButtonIcon as={ArrowRight} />
          </Button>

          {/* Secondary CTA */}
          <VStack space="sm" className="items-center">
            <Text size="sm" className="text-typography-500">
              Already have an account?
            </Text>
            <Button
              size="lg"
              variant="link"
              action="primary"
              onPress={handleSignIn}

            >
              <ButtonText>Sign In</ButtonText>
            </Button>
          </VStack>

          {/* Trust Footer */}
          <HStack space="xs" className="justify-center items-center">
            <Icon as={Shield} size="sm" className="text-typography-400" />
            <Text size="xs" className="text-typography-400">
              Your data is secure and encrypted
            </Text>
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
};

export default CTAFocusOnboarding;
