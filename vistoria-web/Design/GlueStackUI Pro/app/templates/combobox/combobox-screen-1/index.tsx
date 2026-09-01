import React, { useState } from "react";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Button, ButtonText } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { ScrollView } from "@/components/ui/scroll-view";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import {
  ChevronDown,
  Search,
  Home,
  User,
  ShoppingCart,
  Truck,
  Tag,
  Filter,
  Check,
} from "lucide-react-native";
import { KeyboardAvoidingView, Platform } from "react-native";

// Define the Country type
type Country = {
  id: string;
  name: string;
  code: string;
  flag: string;
};

// Define the Category type
type Category = {
  id: string;
  name: string;
  icon: any;
};

// Sample country data
const countries: Country[] = [
  { id: "us", name: "United States", code: "+1", flag: "🇺🇸" },
  { id: "ca", name: "Canada", code: "+1", flag: "🇨🇦" },
  { id: "uk", name: "United Kingdom", code: "+44", flag: "🇬🇧" },
  { id: "au", name: "Australia", code: "+61", flag: "🇦🇺" },
  { id: "de", name: "Germany", code: "+49", flag: "🇩🇪" },
  { id: "fr", name: "France", code: "+33", flag: "🇫🇷" },
  { id: "jp", name: "Japan", code: "+81", flag: "🇯🇵" },
  { id: "br", name: "Brazil", code: "+55", flag: "🇧🇷" },
];

// Sample categories
const categories: Category[] = [
  { id: "1", name: "Electronics", icon: ShoppingCart },
  { id: "2", name: "Clothing", icon: Tag },
  { id: "3", name: "Home & Kitchen", icon: Home },
  { id: "4", name: "Beauty", icon: User },
  { id: "5", name: "Sports", icon: Truck },
  { id: "6", name: "Books", icon: Filter },
];

export default function ComboBoxScreen() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState("Standard");

  // Filter countries based on search query
  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.code.includes(searchQuery)
  );

  const handleSelectCountry = (country: Country) => {
    setSelectedCountry(country);
    setIsCountryDropdownOpen(false);
    setSearchQuery("");
  };

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setIsCategoryDropdownOpen(false);
  };

  return (
    <Box className="flex-1 bg-background-0 h-full py-4">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100}
        className="flex-1"
      >
        {/* Header */}
        <Box className="p-4 bg-background-0 border-b border-outline-200 lg:px-10">
          <HStack className="justify-between items-center">
            <Heading size="xl" className="text-typography-900">
              Combobox Controls
            </Heading>
          </HStack>
        </Box>

        {/* Content */}
        <ScrollView className="flex-1 p-4 lg:px-10">
          <VStack space="xl" className="max-w-2xl mx-auto">
            {/* Country Selector */}
            <Box>
              <Text className="text-typography-900 font-medium mb-2">
                Select Country
              </Text>
              <Button
                size="lg"
                variant="outline"
                className="border border-outline-300 p-4 bg-background-0 justify-start"
                onPress={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
              >
                <HStack className="justify-between items-center">
                  {selectedCountry ? (
                    <HStack space="md" className="items-center">
                      <Text className="text-2xl">{selectedCountry.flag}</Text>
                      <VStack>
                        <Text className="text-typography-900">
                          {selectedCountry.name}
                        </Text>
                        <Text className="text-typography-500 text-sm">
                          {selectedCountry.code}
                        </Text>
                      </VStack>
                    </HStack>
                  ) : (
                    <Text className="text-typography-500">
                      Select a country
                    </Text>
                  )}
                  <Icon
                    as={ChevronDown}
                    size="md"
                    className={`text-typography-400 ${
                      isCountryDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </HStack>
              </Button>

              {isCountryDropdownOpen && (
                <Box className="border border-outline-300 rounded-lg mt-1 bg-background-0 shadow-sm">
                  <Box className="p-3 border-b border-outline-200">
                    <Input size="xl">
                      <InputField
                        placeholder="Search countries..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                      />
                      <InputSlot className="pr-3">
                        <InputIcon as={Search} />
                      </InputSlot>
                    </Input>
                  </Box>

                  <ScrollView className="max-h-60">
                    {filteredCountries.length > 0 ? (
                      filteredCountries.map((country) => (
                        <Button
                          size="lg"
                          key={country.id}
                          variant="link"
                          className="p-4 border-b border-outline-100 flex-row items-center justify-between"
                          onPress={() => handleSelectCountry(country)}
                        >
                          <HStack space="md" className="items-center">
                            <Text className="text-2xl">{country.flag}</Text>
                            <VStack>
                              <Text className="text-typography-900">
                                {country.name}
                              </Text>
                              <Text className="text-typography-500 text-sm">
                                {country.code}
                              </Text>
                            </VStack>
                          </HStack>
                          {selectedCountry?.id === country.id && (
                            <Icon
                              as={Check}
                              size="md"
                              className="text-primary-500"
                            />
                          )}
                        </Button>
                      ))
                    ) : (
                      <Box className="p-4">
                        <Text className="text-typography-500 text-center">
                          No countries found
                        </Text>
                      </Box>
                    )}
                  </ScrollView>
                </Box>
              )}
            </Box>

            {/* Category Selector */}
            <Box>
              <Text className="text-typography-900 font-medium mb-2">
                Product Category
              </Text>
              <Button
                size="lg"
                variant="outline"
                className="border border-outline-300 p-4 bg-background-0 justify-start"
                onPress={() =>
                  setIsCategoryDropdownOpen(!isCategoryDropdownOpen)
                }
              >
                <HStack className="justify-between items-center">
                  {selectedCategory ? (
                    <HStack space="md" className="items-center">
                      {categories
                        .filter((cat) => cat.id === selectedCategory)
                        .map((category) => (
                          <React.Fragment key={category.id}>
                            <Icon
                              as={category.icon}
                              size="md"
                              className="text-primary-500"
                            />
                            <Text className="text-typography-900">
                              {category.name}
                            </Text>
                          </React.Fragment>
                        ))}
                    </HStack>
                  ) : (
                    <Text className="text-typography-500">
                      Select a category
                    </Text>
                  )}
                  <Icon
                    as={ChevronDown}
                    size="md"
                    className={`text-typography-400 ${
                      isCategoryDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </HStack>
              </Button>

              {isCategoryDropdownOpen && (
                <Box className="border border-outline-300 rounded-lg mt-1 bg-background-0 shadow-sm">
                  <ScrollView className="max-h-60">
                    {categories.map((category) => (
                      <Button
                        size="lg"
                        key={category.id}
                        variant="link"
                        className="p-4 border-b border-outline-100 flex-row items-center justify-between"
                        onPress={() => handleSelectCategory(category.id)}
                      >
                        <HStack space="md" className="items-center">
                          <Icon
                            as={category.icon}
                            size="md"
                            className="text-primary-500"
                          />
                          <Text className="text-typography-900">
                            {category.name}
                          </Text>
                        </HStack>
                        {selectedCategory === category.id && (
                          <Icon
                            as={Check}
                            size="md"
                            className="text-primary-500"
                          />
                        )}
                      </Button>
                    ))}
                  </ScrollView>
                </Box>
              )}
            </Box>

            {/* Multiple Selection Example */}
            <Box>
              <Text className="text-typography-900 font-medium mb-2">
                Multiple Selection
              </Text>
              <Box className="border border-outline-300 rounded-lg p-4 bg-background-0">
                <Text className="text-typography-500 mb-3">
                  Select delivery options:
                </Text>
                <HStack space="md" className="flex-wrap">
                  {["Standard", "Express", "Same-day", "International"].map(
                    (option) => (
                      <Button
                        key={option}
                        variant={
                          option === selectedDelivery ? "solid" : "outline"
                        }
                        action={
                          option === selectedDelivery ? "primary" : "secondary"
                        }
                        className="rounded-full px-4 py-2 mb-2"
                        onPress={() => {
                          setSelectedDelivery(option);
                        }}
                      >
                        <ButtonText>{option}</ButtonText>
                      </Button>
                    )
                  )}
                </HStack>
              </Box>
            </Box>

            {/* Search Combobox */}
            <Box>
              <Text className="text-typography-900 font-medium mb-2">
                Search Combobox
              </Text>
              <Box className="border border-outline-300 rounded-lg bg-background-0">
                <Input size="xl">
                  <InputField placeholder="Search products..." />
                  <InputSlot className="pr-3">
                    <InputIcon as={Search} />
                  </InputSlot>
                </Input>
              </Box>
            </Box>

            {/* Action Buttons */}
            <HStack space="md" className="mt-4">
              <Button
                size="lg"
                variant="outline"
                action="secondary"
                className="flex-1"
                onPress={() => {
                  setSelectedCountry(null);
                  setSelectedCategory(null);
                }}
              >
                <ButtonText>Reset</ButtonText>
              </Button>
              <Button
                size="lg"
                variant="solid"
                action="primary"
                className="flex-1"
              >
                <ButtonText>Apply</ButtonText>
              </Button>
            </HStack>
          </VStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </Box>
  );
}
