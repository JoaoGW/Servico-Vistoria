import React from "react";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import {
  Icon,
  ChevronUpIcon,
  ChevronDownIcon,
  createIcon,
} from "@/components/ui/icon";
import { ScrollView } from "@/components/ui/scroll-view";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { Path, Rect } from "react-native-svg";
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
import { ArrowLeft } from "lucide-react-native";
import { Image } from "@/components/ui/image";

export const GiftIcon = createIcon({
  viewBox: "0 0 24 24",
  path: (
    <>
      <Rect width={18} height={4} x={3} y={8} rx={1} />
      <Path d="M12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
    </>
  ),
});

const faqData = [
  {
    id: "a",
    question: "Can I upgrade my bundle later?",
    answer:
      "Yes, you can upgrade to a higher tier bundle at any time. You'll only pay the prorated difference.",
  },
  {
    id: "b",
    question: "What happens if I cancel?",
    answer:
      "You can cancel anytime with 30-day money-back guarantee. No questions asked.",
  },
  {
    id: "c",
    question: "Do bundles include all features?",
    answer:
      "Each bundle includes all listed features and services. Higher tiers include additional premium features.",
  },
  {
    id: "d",
    question: "Is there a free trial available?",
    answer:
      "Yes! All bundle packages come with a 30-day free trial. No credit card required to get started.",
  },
];

const HeroSection: React.FC = () => (
  <VStack space="lg" className="mb-8 px-6">
    <VStack space="sm" className="">
      <Heading size="xl">Your data is protected</Heading>
      <Text size="lg" className=" text-typography-400">
        Get everything you need in one package and save up to 45%.
      </Text>
    </VStack>

    <HStack
      space="md"
      className="items-center bg-success-50/30 px-3 py-3 rounded-lg justify-center"
    >
      <Box className="bg-success-400 items-center justify-center p-3 rounded-full">
        <Icon as={GiftIcon} size="lg" className="text-white stroke-2" />
      </Box>
      <Text className="flex-1 text-typography-600">
        30-day money-back guarantee
      </Text>
    </HStack>
  </VStack>
);

const FAQ: React.FC = () => (
  <VStack space="lg" className="mx-6 mb-8">
    <HStack space="md" className="items-center">
      <Heading size="xl">Frequently Asked Questions</Heading>
    </HStack>

    <Accordion
      size="md"
      variant="unfilled"
      type="single"
      isCollapsible={true}
      isDisabled={false}
      className="w-full rounded-3xl"
    >
      {faqData.map((faq) => (
        <React.Fragment key={faq.id}>
          <AccordionItem
            className="bg-background-50 my-1 rounded-lg"
            value={faq.id}
          >
            <AccordionHeader>
              <AccordionTrigger>
                {({ isExpanded }: any) => (
                  <>
                    <AccordionTitleText className="font-semibold text-typography-700">
                      {faq.question}
                    </AccordionTitleText>
                    <AccordionIcon
                      as={isExpanded ? ChevronUpIcon : ChevronDownIcon}
                      className="ml-3"
                    />
                  </>
                )}
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <AccordionContentText className="text-typography-600">
                {faq.answer}
              </AccordionContentText>
            </AccordionContent>
          </AccordionItem>
        </React.Fragment>
      ))}
    </Accordion>
  </VStack>
);

const BottomCTA: React.FC = () => {
  const handleContactPress = (): void => {
    // Handle contact sales
  };

  const handleTrialPress = (): void => {
    // Handle start free trial
  };

  return (
    <VStack
      space="md"
      className="pt-6 px-6 web:pb-5"
    >
      <Text size="lg" className="text-center text-typography-400">
        Need a custom bundle for your organization?
      </Text>

      <Button
        size="lg"
        variant="solid"
        action="primary"
        className="rounded-xl w-full"
        onPress={handleTrialPress}
      >
        <ButtonText>Start Your Free Trial</ButtonText>
      </Button>
    </VStack>
  );
};

const BundleTierScreen: React.FC = () => {
  return (
    <VStack className="h-full bg-background-0 pb-safe">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-11 lg:px-10"
      >
        <VStack className="pt-6">
          <HeroSection />

          <FAQ />
        </VStack>
      </ScrollView>
      <BottomCTA />
    </VStack>
  );
};

export default BundleTierScreen;
