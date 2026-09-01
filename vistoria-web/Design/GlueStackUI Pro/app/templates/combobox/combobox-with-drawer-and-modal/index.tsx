import React, { useState } from "react";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
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
  X,
  SlidersHorizontal,
} from "lucide-react-native";
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@/components/ui/modal";
import {
  Drawer,
  DrawerBackdrop,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@/components/ui/drawer";
import { OverlayProvider } from "@gluestack-ui/core/overlay/creator";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Modal states
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  // Drawer states
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  // Filter countries based on search query
  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.code.includes(searchQuery)
  );

  const handleSelectCountry = (country: Country) => {
    setSelectedCountry(country);
    setSearchQuery("");
    setShowCountryModal(false);
  };

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setShowCategoryModal(false);
  };

  const toggleFilter = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  return (
    <OverlayProvider>
      <Box className="flex-1 h-full bg-background-0">
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
              <Button
                variant="outline"
                action="secondary"
                size="sm"
                onPress={() => setShowFilterDrawer(true)}
              >
                <ButtonIcon
                  as={SlidersHorizontal}
                  className="text-typography-700"
                />
              </Button>
            </HStack>
          </Box>

          {/* Content */}
          <ScrollView className="flex-1 p-4 lg:px-10">
            <VStack space="xl" className="max-w-2xl mx-auto">
              {/* Country Selector with Modal */}
              <Box>
                <Text className="text-typography-900 font-medium mb-2">
                  Select Country
                </Text>
                <Button
                  size="lg"
                  variant="outline"
                  className="border border-outline-300 p-4 bg-background-0 justify-start"
                  onPress={() => setShowCountryModal(true)}
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
                      className="text-typography-400"
                    />
                  </HStack>
                </Button>
              </Box>

              {/* Category Selector with Modal */}
              <Box>
                <Text className="text-typography-900 font-medium mb-2">
                  Product Category
                </Text>
                <Button
                  variant="outline"
                  size="lg"
                  className="border border-outline-300 p-4 bg-background-0 justify-start"
                  onPress={() => setShowCategoryModal(true)}
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
                      className="text-typography-400"
                    />
                  </HStack>
                </Button>
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
                            selectedFilters.includes(option)
                              ? "solid"
                              : "outline"
                          }
                          action={
                            selectedFilters.includes(option)
                              ? "primary"
                              : "secondary"
                          }
                          className="rounded-full px-4 py-2 mb-2"
                          onPress={() => toggleFilter(option)}
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
                    setSelectedFilters([]);
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

          {/* Country Selection Modal */}
          <Modal
            isOpen={showCountryModal}
            onClose={() => setShowCountryModal(false)}
            size="md"
          >
            <ModalBackdrop />
            <ModalContent className="max-h-[80%]">
              <ModalHeader className="items-center">
                <Heading size="md" className="text-typography-900">
                  Select Country
                </Heading>
                <Button
                  variant="link"
                  action="secondary"
                  size="sm"
                  onPress={() => setShowCountryModal(false)}
                  className="absolute right-4 top-4"
                >
                  <ButtonIcon as={X} />
                </Button>
              </ModalHeader>
              <ModalBody className="px-0">
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

                <ScrollView className="max-h-80">
                  {filteredCountries.length > 0 ? (
                    filteredCountries.map((country) => (
                      <Button
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
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="outline"
                  action="secondary"
                  className="flex-1"
                  onPress={() => setShowCountryModal(false)}
                >
                  <ButtonText>Cancel</ButtonText>
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          {/* Category Selection Modal */}
          <Modal
            isOpen={showCategoryModal}
            onClose={() => setShowCategoryModal(false)}
            size="md"
          >
            <ModalBackdrop />
            <ModalContent className="max-h-[80%]">
              <ModalHeader className="items-center">
                <Heading size="md" className="text-typography-900">
                  Select Category
                </Heading>
                <Button
                  variant="link"
                  action="secondary"
                  size="sm"
                  onPress={() => setShowCategoryModal(false)}
                  className="absolute right-4 top-4"
                >
                  <ButtonIcon as={X} />
                </Button>
              </ModalHeader>
              <ModalBody className="px-0">
                <ScrollView className="max-h-80">
                  {categories.map((category) => (
                    <Button
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
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="outline"
                  action="secondary"
                  className="flex-1"
                  onPress={() => setShowCategoryModal(false)}
                >
                  <ButtonText>Cancel</ButtonText>
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          {/* Filter Drawer */}
          <Drawer
            isOpen={showFilterDrawer}
            onClose={() => setShowFilterDrawer(false)}
            anchor="right"
            size="sm"
          >
            <DrawerBackdrop />
            <DrawerContent className="w-[85%] md:w-[400px] py-safe">
              <DrawerHeader>
                <Heading size="md">Filters</Heading>
                <Button
                  variant="link"
                  action="secondary"
                  size="sm"
                  onPress={() => setShowFilterDrawer(false)}
                  className="absolute right-4 top-4"
                >
                  <ButtonIcon as={X} />
                </Button>
              </DrawerHeader>
              <DrawerBody>
                <VStack space="lg">
                  {/* Price Range */}
                  <Box>
                    <Text className="text-typography-900 font-medium mb-2">
                      Price Range
                    </Text>
                    <HStack space="md">
                      <Box className="flex-1">
                        <Input size="xl">
                          <InputField placeholder="Min" />
                        </Input>
                      </Box>
                      <Box className="flex-1">
                        <Input>
                          <InputField placeholder="Max" />
                        </Input>
                      </Box>
                    </HStack>
                  </Box>

                  {/* Category Filter */}
                  <Box>
                    <Text className="text-typography-900 font-medium mb-2">
                      Category
                    </Text>
                    <Box className="border border-outline-300 rounded-lg p-3">
                      {categories.map((category) => (
                        <Button
                          key={category.id}
                          variant="link"
                          className="py-2 flex-row items-center justify-between"
                        >
                          <HStack space="md" className="items-center">
                            <Icon
                              as={category.icon}
                              size="sm"
                              className="text-primary-500"
                            />
                            <Text className="text-typography-700">
                              {category.name}
                            </Text>
                          </HStack>
                          <Icon
                            as={Check}
                            size="sm"
                            className={
                              selectedFilters.includes(category.name)
                                ? "text-primary-500"
                                : "text-transparent"
                            }
                          />
                        </Button>
                      ))}
                    </Box>
                  </Box>

                  {/* Brand Filter */}
                  <Box>
                    <Text className="text-typography-900 font-medium mb-2">
                      Brand
                    </Text>
                    <Box className="border border-outline-300 rounded-lg p-3">
                      {["Apple", "Samsung", "Sony", "Nike", "Adidas"].map(
                        (brand) => (
                          <Button
                            key={brand}
                            variant="link"
                            className="py-2 flex-row items-center justify-between"
                            onPress={() => toggleFilter(brand)}
                          >
                            <Text className="text-typography-700">{brand}</Text>
                            <Icon
                              as={Check}
                              size="sm"
                              className={
                                selectedFilters.includes(brand)
                                  ? "text-primary-500"
                                  : "text-transparent"
                              }
                            />
                          </Button>
                        )
                      )}
                    </Box>
                  </Box>

                  {/* Rating Filter */}
                  <Box>
                    <Text className="text-typography-900 font-medium mb-2">
                      Rating
                    </Text>
                    <HStack space="md" className="flex-wrap">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Button
                          key={star}
                          variant={
                            selectedFilters.includes(`${star} stars`)
                              ? "solid"
                              : "outline"
                          }
                          action={
                            selectedFilters.includes(`${star} stars`)
                              ? "primary"
                              : "secondary"
                          }
                          className="rounded-full px-3 py-1"
                          onPress={() => toggleFilter(`${star} stars`)}
                        >
                          <ButtonText>{star}+ Stars</ButtonText>
                        </Button>
                      ))}
                    </HStack>
                  </Box>
                </VStack>
              </DrawerBody>
              <DrawerFooter className="gap-10">
                <Button
                  size="lg"
                  variant="outline"
                  action="secondary"
                  className="flex-1"
                  onPress={() => {
                    setSelectedFilters([]);
                    setShowFilterDrawer(false);
                  }}
                >
                  <ButtonText>Reset</ButtonText>
                </Button>
                <Button
                  size="lg"
                  variant="solid"
                  action="primary"
                  className="flex-1"
                  onPress={() => setShowFilterDrawer(false)}
                >
                  <ButtonText>Apply</ButtonText>
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </KeyboardAvoidingView>
      </Box>
    </OverlayProvider>
  );
}
