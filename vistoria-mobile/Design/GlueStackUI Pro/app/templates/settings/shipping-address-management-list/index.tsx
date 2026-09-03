import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import {
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
} from "@/components/ui/radio";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import {
  Building2,
  Circle,
  Home,
  MapPin,
  Plus,
  Trash2
} from "lucide-react-native";
import React, { useState } from "react";
import { mockAddresses } from "./data";
import { Address } from "./types";

const ShippingAddressManagementList: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses);
  const [defaultAddressId, setDefaultAddressId] = useState<string>("1");

  const handleSetDefault = (id: string) => {
    setDefaultAddressId(id);
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  const handleDelete = (id: string) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  const handleEdit = (id: string) => {
    // Edit functionality placeholder
    console.log("Edit address:", id);
  };

  const handleAddNew = () => {
    // Add new address placeholder
    console.log("Add new address");
  };

  return (
    <Box className="flex-1 bg-background-0">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
       
          <VStack space="lg" className="px-4 pt-6">
            <VStack space="xs" className="flex-1">
              <Heading size="xl" className="text-typography-950">
                Shipping Addresses
              </Heading>
              <Text size="sm" className="text-typography-500">
                {addresses.length}{" "}
                {addresses.length === 1 ? "address" : "addresses"} saved
              </Text>
            </VStack>
          </VStack>
        <Box className="px-5 pt-6 pb-8">
          <VStack space="lg">
            {/* Add New Address Button */}
            <Button
              size="lg"
              variant="solid"
              action="primary"
              onPress={handleAddNew}
              className="rounded-xl"
            >
              <ButtonIcon as={Plus} />
              <ButtonText>Add New Address</ButtonText>
            </Button>

            {/* Address List */}
            <RadioGroup value={defaultAddressId} onChange={handleSetDefault}>
              <VStack space="lg">
                {addresses.map((address, index) => (
                  <Card
                    key={address.id}
                    size="md"
                    variant="elevated"
                    className="bg-background-0 border border-outline-100"
                  >
                    <VStack space="lg">
                      {/* Header Section */}
                      <VStack space="md">
                        <HStack
                          space="md"
                          className="justify-between items-center"
                        >
                          <HStack space="sm" className="items-center flex-1">
                            <Radio value={address.id}>
                              <RadioIndicator>
                                <RadioIcon as={Circle} />
                              </RadioIndicator>
                            </Radio>

                            {address.label && (
                              <HStack space="lg" className="items-center">
                                <Box className="bg-background-50 p-2 rounded-lg">
                                  <Icon
                                    as={
                                      address.label === "Home"
                                        ? Home
                                        : address.label === "Work"
                                        ? Building2
                                        : MapPin
                                    }
                                    size="sm"
                                    className="text-typography-700"
                                  />
                                </Box>
                                <VStack space="">
                                  <Text
                                    size="md"
                                    className="text-typography-950 font-semibold"
                                  >
                                    {address.label}
                                  </Text>
                                  <Text
                                    size="xs"
                                    className="text-typography-500"
                                  >
                                    {address.name}
                                  </Text>
                                </VStack>
                              </HStack>
                            )}
                          </HStack>

                          <HStack space="xs">
                            <Button
                              size="sm"
                              variant="outline"
                              action="secondary"
                              onPress={() => handleDelete(address.id)}
                              className="rounded-lg border-0 bg-background-50"
                            >
                              <ButtonIcon
                                as={Trash2}
                                className="text-error-700"
                              />
                            </Button>
                          </HStack>
                        </HStack>
                      </VStack>

                      <Divider />

                      {/* Address Details */}
                      <VStack space="md">
                        <VStack space="sm">
                          <HStack space="xs" className="items-center">
                            <Icon
                              as={MapPin}
                              size="sm"
                              className="text-typography-500"
                            />
                            <Text
                              size="sm"
                              className="text-typography-500 uppercase tracking-wide font-semibold"
                            >
                              Address
                            </Text>
                          </HStack>
                          <HStack space="xs" className="">
                            <Text size="sm" className="text-typography-800">
                              {address.street}
                            </Text>
                            <Text size="sm" className="text-typography-600">
                              {address.city}, {address.state} {address.zipCode}
                            </Text>
                            <Text size="sm" className="text-typography-600">
                              {address.country}
                            </Text>
                          </HStack>
                        </VStack>

                        <VStack space="xs">
                          <Text
                            size="xs"
                            className="text-typography-500 uppercase tracking-wide font-semibold"
                          >
                            Phone Number
                          </Text>
                          <Text size="sm" className="text-typography-800">
                            {address.phone}
                          </Text>
                        </VStack>
                      </VStack>
                    </VStack>
                  </Card>
                ))}
              </VStack>
            </RadioGroup>

            {/* Empty State (shown when no addresses) */}
            {addresses.length === 0 && (
              <Card
                size="lg"
                variant="elevated"
                className="bg-background-0 border border-outline-100"
              >
                <VStack space="xl" className="items-center py-12">
                  <Box className="bg-background-100 p-6 rounded-2xl">
                    <Icon as={MapPin} size="xl" className="text-primary-500" />
                  </Box>
                  <VStack space="sm" className="items-center max-w-xs">
                    <Heading size="xl" className="text-typography-950">
                      No Addresses Yet
                    </Heading>
                    <Text size="md" className="text-typography-500 text-center">
                      Add your first shipping address to make checkout faster
                      and easier
                    </Text>
                  </VStack>
                  <Button
                    size="lg"
                    variant="solid"
                    action="primary"
                    onPress={handleAddNew}
                    className="rounded-xl mt-4"
                  >
                    <ButtonIcon as={Plus} />
                    <ButtonText>Add Address Now</ButtonText>
                  </Button>
                </VStack>
              </Card>
            )}
          </VStack>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default ShippingAddressManagementList;
