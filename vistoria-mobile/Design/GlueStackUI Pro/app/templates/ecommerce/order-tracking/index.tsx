import React from "react";
import { ScrollView } from "react-native";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Button, ButtonText } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Divider } from "@/components/ui/divider";
import { Badge, BadgeText } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Package,
  MapPin,
  Clock,
  CheckCircle2,
  Truck,
  Home,
  Phone,
  Mail,
  ChevronRight,
} from "lucide-react-native";
import { Heading } from "@/components/ui/heading";

const OrderTrackingScreen = () => {
  const orderDetails = {
    orderId: "ORD-2024-10847",
    estimatedDelivery: "Oct 10, 2025",
    trackingNumber: "TRK9845621037",
    status: "In Transit",
  };

  const timelineSteps = [
    {
      id: 1,
      title: "Order Placed",
      description: "Your order has been confirmed",
      timestamp: "Oct 05, 2025 - 10:30 AM",
      location: "Mumbai, Maharashtra",
      icon: CheckCircle2,
      completed: true,
    },
    {
      id: 2,
      title: "Processing",
      description: "Package is being prepared",
      timestamp: "Oct 06, 2025 - 02:15 PM",
      location: "Warehouse - Bangalore",
      icon: Package,
      completed: true,
    },
    {
      id: 3,
      title: "In Transit",
      description: "Package is on the way",
      timestamp: "Oct 07, 2025 - 08:45 AM",
      location: "Distribution Center - Karnataka",
      icon: Truck,
      completed: false,
      active: true,
    },
    {
      id: 4,
      title: "Out for Delivery",
      description: "Package is out for delivery",
      timestamp: "Expected today",
      location: "Doddaballapura, Karnataka",
      icon: MapPin,
      completed: false,
    },
    {
      id: 5,
      title: "Delivered",
      description: "Package has been delivered",
      timestamp: "Pending",
      location: "Your doorstep",
      icon: Home,
      completed: false,
    },
  ];

  const packageItems = [
    { name: "Wireless Headphones Pro", quantity: 1, price: "₹8,999" },
    { name: "USB-C Fast Charger", quantity: 2, price: "₹1,499" },
  ];

  const renderTimelineItem = (step: any, index: number) => {
    const IconComponent = step.icon;
    const isLast = index === timelineSteps.length - 1;

    return (
      <HStack key={step.id} className="mb-2">
        <VStack className="items-center mr-4">
          <Box
            className={`w-12 h-12 rounded-full items-center justify-center ${
              step.completed
                ? "bg-success-500/50"
                : step.active
                ? "bg-info-500/50"
                : "bg-outline-100/50"
            }`}
          >
            <Icon as={IconComponent} size="lg" className="text-white" />
          </Box>
          {!isLast && (
            <Box
              className={`w-1 h-20 mt-2 ${
                step.completed ? "bg-green-500" : "bg-gray-700"
              }`}
            />
          )}
        </VStack>

        <VStack className="flex-1 pt-2">
          <HStack className="items-center mb-1">
            <Text className="text-lg font-bold text-typography-950 mr-2">
              {step.title}
            </Text>
            {step.active && (
              <Badge action="info" variant="solid" size="sm">
                <BadgeText>Current</BadgeText>
              </Badge>
            )}
          </HStack>
          <Text className="text-typography-700 mb-1">{step.description}</Text>
          <HStack className="items-center mb-1">
            <Icon as={Clock} size="xs" className="text-gray-500 mr-1" />
            <Text className="text-sm text-gray-500">{step.timestamp}</Text>
          </HStack>
          <HStack className="items-center">
            <Icon as={MapPin} size="xs" className="text-gray-500 mr-1" />
            <Text className="text-sm text-gray-500">{step.location}</Text>
          </HStack>
        </VStack>
      </HStack>
    );
  };

  return (
    <ScrollView
      className="flex-1 bg-background-0"
      showsVerticalScrollIndicator={false}
    >
      <Box className="px-4 pt-8 pb-6">
        {/* Header */}
        <VStack className="mb-6" space="sm">
          <Heading size="xl" className=" text-typography-950">
            Track Your Order
          </Heading>
          <Text className="text-typography-400" size="lg">
            Order ID: {orderDetails.orderId}
          </Text>
        </VStack>

        {/* Status Card */}
        <Card className="bg-primary-500 p-6 rounded-2xl mb-6 border-0">
          <VStack>
            <HStack className="items-center justify-between mb-4">
              <Icon as={Package} size="xl" className="text-white" />
            </HStack>
            <Text className="text-white text-xl font-bold mb-2">
              Estimated Delivery
            </Text>
            <Text className="text-white text-3xl font-bold mb-1">
              {orderDetails.estimatedDelivery}
            </Text>
            <Text className="text-white text-sm">
              Tracking: {orderDetails.trackingNumber}
            </Text>
          </VStack>
        </Card>

        {/* Timeline Section */}
        <Card className="bg-background-50 p-6 rounded-xl mb-6 ">
          <Text className="text-xl font-bold text-typography-950 mb-6">
            Delivery Timeline
          </Text>
          <VStack>
            {timelineSteps.map((step, index) =>
              renderTimelineItem(step, index)
            )}
          </VStack>
        </Card>

        {/* Package Details */}
        <Card className="bg-background-0 p-6 rounded-2xl mb-6 border border-outline-100">
          <Text className="text-xl font-bold text-typography-950 mb-4">
            Package Details
          </Text>
          <VStack className="space-y-3">
            {packageItems.map((item, index) => (
              <HStack
                key={index}
                className="justify-between py-3 border-b border-outline-100"
              >
                <VStack className="flex-1">
                  <Text className="text-typography-950 font-semibold">
                    {item.name}
                  </Text>
                  <Text className="text-typography-700 text-sm">
                    Qty: {item.quantity}
                  </Text>
                </VStack>
                <Text className="text-typography-950 font-bold">
                  {item.price}
                </Text>
              </HStack>
            ))}
            <HStack className="justify-between pt-2">
              <Text className="text-typography-950 font-bold text-lg">
                Total
              </Text>
              <Text className="text-blue-400 font-bold text-lg">₹10,498</Text>
            </HStack>
          </VStack>
        </Card>

        {/* Delivery Address */}
        <Card className="bg-background-0 p-6 rounded-2xl mb-6 border border-outline-100">
          <HStack className="justify-between items-start mb-4">
            <Text className="text-xl font-bold text-typography-950">
              Delivery Address
            </Text>
            <Icon as={MapPin} size="lg" className="text-blue-400" />
          </HStack>
          <VStack className="space-y-2">
            <Text className="text-typography-950 font-semibold">John Doe</Text>
            <Text className="text-typography-700">
              123 Main Street, Apartment 4B
            </Text>
            <Text className="text-typography-700">
              Doddaballapura, Karnataka 561203
            </Text>
            <Text className="text-typography-700">India</Text>
            <Divider className="my-3 bg-outline-100" />
            <HStack className="items-center">
              <Icon as={Phone} size="sm" className="text-typography-700 mr-2" />
              <Text className="text-typography-600">+91 98765 43210</Text>
            </HStack>
            <HStack className="items-center">
              <Icon as={Mail} size="sm" className="text-typography-700 mr-2" />
              <Text className="text-typography-600">john.doe@example.com</Text>
            </HStack>
          </VStack>
        </Card>

        {/* Action Buttons */}
        <VStack className="gap-3 mb-2">
          <Button size="lg">
            <ButtonText className="font-semibold text-white">
              Contact Courier
            </ButtonText>
          </Button>
          <Button size="lg" variant="outline">
            <ButtonText className="text-typography-950 font-semibold">
              View Invoice
            </ButtonText>
            <Icon
              as={ChevronRight}
              size="sm"
              className="text-typography-950 ml-2"
            />
          </Button>
        </VStack>
      </Box>
    </ScrollView>
  );
};

export default OrderTrackingScreen;
