import React, { useState } from "react";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { ScrollView } from "@/components/ui/scroll-view";
import { Divider } from "@/components/ui/divider";
import {
  Plus,
  MapPin,
  Home,
  Building,
  Edit,
  Trash2,
  CheckCircle,
} from "lucide-react-native";

import { Address } from "./types";
import { initialAddresses } from "./data";

export default function AddressBookScreen() {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);

  const setAsPrimary = (id: string) => {
    setAddresses(
      addresses.map((address) => ({
        ...address,
        isPrimary: address.id === id,
      }))
    );
  };

  const deleteAddress = (id: string) => {
    setAddresses(addresses.filter((address) => address.id !== id));
  };

  return (
    <Box className="flex-1 bg-background-0 pb-6">
      {/* Header */}
      <Box className="p-4 bg-background-0 border-b border-outline-100 lg:px-10">
        <HStack className="justify-between items-center">
          <Heading size="xl" className="text-typography-950">
            Address Book
          </Heading>
          <Button size="lg" variant="solid" action="primary">
            <ButtonIcon as={Plus} />
            <ButtonText>Add New</ButtonText>
          </Button>
        </HStack>
      </Box>

      {/* Content */}
      <ScrollView
        className="flex-1 p-4 lg:px-10"
        showsVerticalScrollIndicator={false}
      >
        {addresses.length === 0 ? (
          <Box className="flex-1 justify-center items-center p-8">
            <Icon as={MapPin} size="xl" className="text-typography-400 mb-4" />
            <Heading size="lg" className="text-typography-950 mb-2">
              No Addresses Yet
            </Heading>
            <Text size="md" className="text-typography-600 text-center mb-6">
              Add your first address to get started with faster checkout
            </Text>
            <Button size="lg" variant="solid" action="primary">
              <ButtonText>Add Address</ButtonText>
            </Button>
          </Box>
        ) : (
          <VStack space="lg">
            <Text size="lg" className="text-typography-600">
              {addresses.length} saved address
              {addresses.length !== 1 ? "es" : ""}
            </Text>
            <VStack
              space="lg"
              className="lg:grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
            >
              {addresses.map((address) => (
                <Box
                  key={address.id}
                  className="bg-background-50 rounded-xl border border-outline-100 lg:max-w-[600px]"
                >
                  <Box className="p-4">
                    {/* Address header */}
                    <HStack className="justify-between items-start">
                      <HStack space="md" className="items-center">
                        <Icon
                          as={
                            address.type === "home"
                              ? Home
                              : address.type === "work"
                              ? Building
                              : MapPin
                          }
                          size="lg"
                          className="text-primary-500"
                        />
                        <VStack>
                          <HStack className="items-center gap-2">
                            <Heading size="lg" className="text-typography-950">
                              {address.name}
                            </Heading>
                            {address.isPrimary && (
                              <HStack
                                space="xs"
                                className="bg-success-100 px-2 py-1 rounded-full items-center"
                              >
                                <Icon
                                  as={CheckCircle}
                                  size="xs"
                                  className="text-success-600"
                                />
                                <Text
                                  size="xs"
                                  className="text-success-800 font-medium"
                                >
                                  Primary
                                </Text>
                              </HStack>
                            )}
                          </HStack>
                        </VStack>
                      </HStack>

                      <HStack space="sm">
                        {!address.isPrimary && (
                          <Button
                            size="md"
                            className="rounded-lg"
                            variant="outline"
                            action="secondary"
                            onPress={() => setAsPrimary(address.id)}
                          >
                            <ButtonText>Make Primary</ButtonText>
                          </Button>
                        )}
                      </HStack>
                    </HStack>

                    <Divider className="my-3" />

                    {/* Address details */}
                    <VStack space="xs" className="mb-4">
                      <Text size="md" className="text-typography-600">
                        {address.street}
                      </Text>
                      <Text size="md" className="text-typography-600">
                        {address.city}, {address.state} {address.zipCode}
                      </Text>
                      <Text size="md" className="text-typography-600">
                        {address.country}
                      </Text>
                    </VStack>

                    {/* Action buttons */}
                    <HStack space="md" className="items-center justify-center">
                      <Button
                        size="md"
                        variant="solid"
                        action="primary"
                        className="flex-1 rounded-lg"
                        onPress={() => console.log("Edit address", address.id)}
                      >
                        <ButtonIcon as={Edit} />
                        <ButtonText>Edit</ButtonText>
                      </Button>

                      <Button
                        size="md"
                        variant="outline"
                        action="secondary"
                        className="flex-1 rounded-lg"
                        onPress={() => deleteAddress(address.id)}
                      >
                        <ButtonIcon as={Trash2} />
                        <ButtonText>Delete</ButtonText>
                      </Button>
                    </HStack>
                  </Box>
                </Box>
              ))}
            </VStack>

            {/* Add new address card */}
            <Button
              size="lg"
              variant="outline"
              action="secondary"
              className="border-dashed border-outline-200 p-6 h-fit"
              onPress={() => console.log("Add new address")}
            >
              <VStack space="sm" className="items-center">
                <Icon as={Plus} size="lg" className="text-primary-500" />
                <Text size="md" className="text-primary-500 font-medium">
                  Add New Address
                </Text>
              </VStack>
            </Button>
          </VStack>
        )}
      </ScrollView>
    </Box>
  );
}
