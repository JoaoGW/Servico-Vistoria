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
import { Grid, GridItem } from "@/components/ui/grid";
import { Image } from "@/components/ui/image";
// Import Lucide React Native icons
import {
  Check,
  X,
  Zap,
  Crown,
  Shield,
  Users,
  Lock,
  BarChart3,
  Code,
  ArrowLeft,
} from "lucide-react-native";

// Types
interface PlanFeature {
  basic: boolean | string;
  pro: boolean | string;
  team: boolean | string;
}

interface FeatureCategory {
  name: string;
  icon: React.ComponentType;
  features: {
    name: string;
    values: PlanFeature;
  }[];
}

interface Plan {
  name: string;
  price: number;
  period: string;
  icon: React.ComponentType;
  popular: boolean;
  color: string;
}

// Comparison data
const plans: Plan[] = [
  {
    name: "Basic",
    price: 0,
    period: "month",
    icon: Zap,
    popular: false,
    color: "info",
  },
  {
    name: "Pro",
    price: 29,
    period: "month",
    icon: Crown,
    popular: true,
    color: "warning",
  },
  {
    name: "Team",
    price: 79,
    period: "month",
    icon: Shield,
    popular: false,
    color: "success",
  },
];

const featureCategories: FeatureCategory[] = [
  {
    name: "Collaboration",
    icon: Users,
    features: [
      {
        name: "Team Collaboration",
        values: {
          basic: false,
          pro: true,
          team: true,
        },
      },
      {
        name: "Real-time Sync",
        values: {
          basic: false,
          pro: true,
          team: true,
        },
      },
      {
        name: "Comments & Reviews",
        values: {
          basic: false,
          pro: true,
          team: true,
        },
      },
      {
        name: "Advanced Permissions",
        values: {
          basic: false,
          pro: false,
          team: true,
        },
      },
    ],
  },
  {
    name: "Analytics & Reporting",
    icon: BarChart3,
    features: [
      {
        name: "Basic Analytics",
        values: {
          basic: true,
          pro: true,
          team: true,
        },
      },
      {
        name: "Advanced Analytics",
        values: {
          basic: false,
          pro: true,
          team: true,
        },
      },
      {
        name: "Custom Reports",
        values: {
          basic: false,
          pro: false,
          team: true,
        },
      },
      {
        name: "Export Data",
        values: {
          basic: false,
          pro: true,
          team: true,
        },
      },
    ],
  },
  {
    name: "Security & Support",
    icon: Lock,
    features: [
      {
        name: "SSL Encryption",
        values: {
          basic: true,
          pro: true,
          team: true,
        },
      },
      {
        name: "Two-Factor Auth",
        values: {
          basic: false,
          pro: true,
          team: true,
        },
      },
      {
        name: "Priority Support",
        values: {
          basic: false,
          pro: true,
          team: true,
        },
      },
      {
        name: "Dedicated Support",
        values: {
          basic: false,
          pro: false,
          team: true,
        },
      },
    ],
  },
  {
    name: "Integrations",
    icon: Code,
    features: [
      {
        name: "API Access",
        values: {
          basic: false,
          pro: false,
          team: true,
        },
      },
      {
        name: "Webhooks",
        values: {
          basic: false,
          pro: false,
          team: true,
        },
      },
      {
        name: "Third-party Apps",
        values: {
          basic: false,
          pro: true,
          team: true,
        },
      },
      {
        name: "Custom Integrations",
        values: {
          basic: false,
          pro: false,
          team: true,
        },
      },
    ],
  },
];

const ComparisonHeader: React.FC = () => {
  const handleBackPress = (): void => {
    // Handle back navigation
  };

  return (
    <HStack className="justify-between items-center px-6 py-3">
      <Heading size="xl">Compare Plans</Heading>
    </HStack>
  );
};

const HeroSection: React.FC = () => (
  <VStack space="lg" className=" px-6">
    <VStack space="sm" className="">
      <HStack
        space="md"
        className="items-center justify-center mt-5 bg-warning-200/60 p-3 px-6 rounded-xl"
      >
        <Image source={require("./party.png")} className="h-8 w-8" />
        <Box className="flex-1">
          <Text size="lg" className="text-warning-900/80">
            Over 60000 users upgraded
          </Text>
        </Box>
      </HStack>
    </VStack>
  </VStack>
);

interface FeatureValueProps {
  value: boolean | string;
  planColor: string;
}

const FeatureValue: React.FC<FeatureValueProps> = ({ value, planColor }) => {
  if (typeof value === "string") {
    return (
      <Box className="px-2 py-1 bg-info-100 rounded-md">
        <Text size="xs" className="font-medium text-info-700 text-center">
          {value}
        </Text>
      </Box>
    );
  }

  return (
    <Box className="w-6 h-6 items-center justify-center">
      <Icon
        as={value ? Check : X}
        size="xl"
        className={
          value ? "text-success-600 stroke-2" : "text-error-600 stroke-2"
        }
      />
    </Box>
  );
};

interface CategorySectionProps {
  category: FeatureCategory;
  isLast: boolean;
}

const CategorySection: React.FC<CategorySectionProps> = ({
  category,
  isLast,
}) => (
  <Card
    size="lg"
    variant="elevated"
    className={` flex-1 ${!isLast ? "mb-0" : "mb-6"}`}
  >
    <VStack className="flex-1">
      <Heading size="xl" className="mb-6">
        {category.name}
      </Heading>

      <Grid
        _extra={{ className: "grid-cols-5 border-b border-b-outline-200 p-3" }}
      >
        <GridItem _extra={{ className: "col-span-2" }}>
          <Text size="lg" className="font-semibold">
            Features
          </Text>
        </GridItem>

        {plans.map((plan: Plan) => (
          <GridItem key={plan.name} _extra={{ className: "col-span-1" }}>
            <Box className="items-center">
              <Text size="lg" className="font-semibold text-center">
                {plan.name}
              </Text>
            </Box>
          </GridItem>
        ))}
      </Grid>

      <VStack className="mt-4">
        {category.features.map((feature, index) => (
          <Grid
            key={feature.name}
            className={` flex-1 items-center justify-center ${
              index !== 0 ? "mt-2" : ""
            }`}
            _extra={{ className: "grid-cols-5" }}
          >
            <GridItem _extra={{ className: "col-span-2" }} className="h-full">
              <Box className="items-start justify-center h-full">
                <Text>{feature.name}</Text>
              </Box>
            </GridItem>

            <GridItem _extra={{ className: "col-span-1" }}>
              <Box className="py-3 items-center">
                <FeatureValue value={feature.values.basic} planColor="info" />
              </Box>
            </GridItem>

            <GridItem _extra={{ className: "col-span-1" }}>
              <Box className="py-3 items-center">
                <FeatureValue value={feature.values.pro} planColor="warning" />
              </Box>
            </GridItem>

            <GridItem _extra={{ className: "col-span-1" }}>
              <Box className="py-3 items-center">
                <FeatureValue value={feature.values.team} planColor="success" />
              </Box>
            </GridItem>
          </Grid>
        ))}
      </VStack>
    </VStack>
  </Card>
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
        className="w-full max-w-2xl mx-auto"
        onPress={handleTrialPress}
      >
        <ButtonText>Start Your Free Trial</ButtonText>
      </Button>
    </VStack>
  );
};
const ComparisonScreen: React.FC = () => {
  return (
    <VStack className="h-full bg-background-0 pb-safe">
      <ComparisonHeader />
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-11"
      >
        <VStack className=" lg:px-10">
          <HeroSection />

          {featureCategories.map((category: FeatureCategory, index: number) => (
            <CategorySection
              key={category.name}
              category={category}
              isLast={index === featureCategories.length - 1}
            />
          ))}
        </VStack>
      </ScrollView>
      <BottomCTA />
    </VStack>
  );
};

export default ComparisonScreen;
