import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Divider } from "@/components/ui/divider";
import { Grid, GridItem } from "@/components/ui/grid";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Calendar, MapPin, Star } from "lucide-react-native";
import React from "react";
import { stats, testimonials } from "./data";
import { Stat, Testimonial } from "./types";

const TestimonialsHeader: React.FC = () => {
  const handleBackPress = (): void => {
    // Handle back navigation
  };

  return (
    <HStack space="md" className="items-center px-6 py-6">
      <Heading size="xl" className="text-typography-900">
        What Our Customers Say about Us
      </Heading>
    </HStack>
  );
};

const StatsSection: React.FC = () => (
  <Box className="px-6 py-6">
    <Grid
      _extra={{ className: "grid-cols-2 md:grid-cols-4" }}
      className="gap-4"
    >
      {stats.map((stat: Stat, index: number) => (
        <GridItem key={index} _extra={{ className: "col-span-1" }}>
          <Card
            size="md"
            variant="elevated"
            className="p-2 border border-outline-50 bg-background-50 rounded-xl"
          >
            <VStack space="md">
              <Box className="w-full h-40 rounded-lg overflow-hidden">
                <Image
                  source={{ uri: stat.imageId }}
                  alt={stat.label}
                  className="w-full h-full object-cover rounded-xl"
                />
              </Box>
              <VStack space="xs" className="items-start">
                <Heading size="2xl" className="text-typography-900 font-[300]">
                  {stat.value}
                </Heading>
                <Text size="sm" className="text-typography-400 text-center">
                  {stat.label}
                </Text>
              </VStack>
            </VStack>
          </Card>
        </GridItem>
      ))}
    </Grid>
  </Box>
);

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
  index,
}) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        as={Star}
        size="md"
        className={
          index < rating
            ? "fill-warning-500 stroke-warning-500"
            : "fill-none stroke-typography-300"
        }
      />
    ));
  };

  return (
    <Card className="rounded-3xl p-0">
      <VStack space="lg">
        <HStack space="xs" className="items-center">
          {renderStars(testimonial.rating)}
        </HStack>

        <Text className="text-typography-700 leading-relaxed">
          "{testimonial.testimonial}"
        </Text>

        <HStack space="md" className="items-center">
          <Avatar size="lg">
            <AvatarFallbackText>
              {testimonial.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallbackText>
            <AvatarImage source={{ uri: testimonial.avatar }} />
          </Avatar>

          <VStack space="xs" className="flex-1">
            <Heading size="lg" className="text-typography-900">
              {testimonial.name}
            </Heading>
            <Text size="md" className="text-typography-600">
              {testimonial.role} at {testimonial.company}
            </Text>
            <HStack space="md" className="items-center">
              <HStack space="xs" className="items-center">
                <Icon as={MapPin} size="sm" className="text-error-500" />
                <Text size="sm" className="text-typography-500">
                  {testimonial.location}
                </Text>
              </HStack>
              <HStack space="xs" className="items-center">
                <Icon as={Calendar} size="sm" className="text-info-500" />
                <Text size="sm" className="text-typography-500">
                  {testimonial.date}
                </Text>
              </HStack>
            </HStack>
          </VStack>
        </HStack>
      </VStack>
      {index !== testimonials.length - 1 && <Divider className="mt-4" />}
    </Card>
  );
};

const BottomCTA: React.FC = () => {
  const handleTrialPress = (): void => {
    // Handle trial signup
  };

  return (
    <Box className="p-6 pb-safe web:pb-6">
      <Button
        size="lg"
        variant="solid"
        action="primary"
        className="w-full rounded-xl"
        onPress={handleTrialPress}
      >
        <ButtonText size="lg">Start Your Free Trial</ButtonText>
      </Button>
    </Box>
  );
};

const TestimonialsScreen: React.FC = () => {
  return (
    <Box className="flex-1 bg-background-0 web:pb-4">
      <TestimonialsHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack space="lg">
          <StatsSection />
          <VStack space="lg" className="px-6 pb-8">
            {testimonials.map((testimonial: Testimonial, index) => (
              <TestimonialCard
                testimonial={testimonial}
                key={testimonial.id}
                index={index}
              />
            ))}
          </VStack>
        </VStack>
      </ScrollView>
      <BottomCTA />
    </Box>
  );
};

export default TestimonialsScreen;
