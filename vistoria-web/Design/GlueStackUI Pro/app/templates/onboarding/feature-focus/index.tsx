import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import {
  BarChart3,
  Bell,
  Sparkles,
} from "lucide-react-native";
import React, { useState } from "react";
import { featureSteps } from "./data";

const FeatureFocusOnboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = featureSteps.length;
  const step = featureSteps[currentStep];

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleGetStarted();
    }
  };

  const handleSkip = () => {
    handleGetStarted();
  };

  const handleGetStarted = () => {
    console.log("Getting started...");
  };

  const isLastStep = currentStep === totalSteps - 1;

  return (
    <Box className="flex-1 bg-background-0">
      <VStack className="flex-1">
        {/* Skip Button */}
        <HStack className="justify-end px-6 pt-12">
          <Button size="lg" variant="link" action="secondary" onPress={handleSkip}>
            <ButtonText>Skip</ButtonText>
          </Button>
        </HStack>

        {/* Feature Icon Section */}
        <Box className="flex-1 items-center justify-center px-6">
          <VStack space="2xl" className="items-center">
            <Icon as={step.icon} size="xl" className="text-typography-900" />

            {/* Feature Cards - Supporting Features */}
            <HStack space="md" className="justify-center mt-8">
              <Box className="w-16 h-16 bg-background-50 rounded-2xl items-center justify-center">
                <Icon as={Bell} size="xl" className="text-primary-500" />
              </Box>
              <Box className="w-16 h-16 bg-background-50 rounded-2xl items-center justify-center">
                <Icon as={BarChart3} size="xl" className="text-primary-500" />
              </Box>
              <Box className="w-16 h-16 bg-background-50 rounded-2xl items-center justify-center">
                <Icon as={Sparkles} size="xl" className="text-primary-500" />
              </Box>
            </HStack>
          </VStack>
        </Box>

        {/* Content Section */}
        <VStack space="xl" className="px-6 pb-12 pt-8">
          {/* Progress Indicators */}
          <HStack space="sm" className="justify-center">
            {featureSteps.map((_, index) => (
              <Box
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentStep
                    ? "w-8 bg-primary-500"
                    : "w-2 bg-outline-200"
                }`}
              />
            ))}
          </HStack>

          {/* Title and Description */}
          <VStack space="md" className="items-center">
            <Heading size="2xl" className="text-center">
              {step.title}
            </Heading>
            <Text size="md" className="text-typography-600 text-center">
              {step.description}
            </Text>
          </VStack>

          {/* Navigation Buttons */}
          <VStack space="md" className="w-full">
            <Button
              size="lg"
              variant="solid"
              action="primary"
              onPress={handleNext}
              className="w-full"
            >
              <ButtonText>{isLastStep ? "Get Started" : "Next"}</ButtonText>
            </Button>

            {/* Step Counter */}
            <Text size="sm" className="text-typography-500 text-center">
              {currentStep + 1} of {totalSteps}
            </Text>
          </VStack>
        </VStack>
      </VStack>
    </Box>
  );
};

export default FeatureFocusOnboarding;