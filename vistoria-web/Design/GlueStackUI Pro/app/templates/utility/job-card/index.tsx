import React, { useState } from "react";
import { ScrollView } from "@/components/ui/scroll-view";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField, InputSlot, InputIcon } from "@/components/ui/input";
import { Icon } from "@/components/ui/icon";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Search, MapPin, DollarSign, Briefcase } from "lucide-react-native";
import { FilterOption } from "./types";
import { mockJobs, filterOptions } from "./data";

const JobCardListScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] =
    useState<FilterOption["type"]>("All");

  const filters = filterOptions;
  const allJobs = mockJobs;

  const filteredJobs = allJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === "All" || job.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <Box className="flex-1 bg-background-0">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box className="px-4 pt-6 pb-8">
          <VStack space="xl">
            {/* Header */}
            <VStack space="sm">
              <Heading size="xl">Find Your Next Opportunity</Heading>
              <Text size="lg" className="text-typography-400">
                Browse and filter through available positions
              </Text>
            </VStack>

            {/* Search Bar */}
            <Input size="xl" className="bg-background-100 rounded-full border-0">
              <InputSlot className="pl-3">
                <InputIcon as={Search} className="text-typography-950" />
              </InputSlot>
              <InputField
                placeholder="Search jobs, companies, locations..."
                value={searchQuery}
                className="text-typography-950"
                onChangeText={setSearchQuery}
              />
            </Input>

            {/* Filter Chips */}

            <HStack space="lg" className="border-b border-outline-100">
              {filters.map((filter) => (
                <Button
                  key={filter.id}
                  size="lg"
                  onPress={() => setSelectedFilter(filter.type)}
                  variant="link"
                  className={`rounded-none ${
                    selectedFilter === filter.type
                      ? "border-b-2 border-primary-500"
                      : ""
                  }`}
                >
                  <ButtonText
                    className={`${
                      selectedFilter === filter.type
                        ? "text-primary-500"
                        : "text-typography-500"
                    }`}
                  >
                    {filter.label}
                  </ButtonText>
                </Button>
              ))}
            </HStack>

            {/* Results Count */}
            <Text size="sm" className="text-typography-500">
              {filteredJobs.length} {filteredJobs.length === 1 ? "job" : "jobs"}{" "}
              found
            </Text>

            {/* Job Cards */}
            <VStack space="xl">
              {filteredJobs.map((job) => (
                  <VStack space="sm" key={job.id} className="bg-background-50/50 p-4 rounded-xl">
                    {/* Company & Badge */}
                    <HStack space="md" className="justify-between items-start">
                      <HStack space="md" className="flex-1 items-center">
                        <Avatar size="md">
                          <AvatarFallbackText>
                            {job.companyInitials}
                          </AvatarFallbackText>
                          <AvatarImage source={{ uri: job.companyLogo }} />
                        </Avatar>
                        <VStack space="xs" className="flex-1">
                          <Heading size="lg">{job.title}</Heading>
                          <Text size="sm" className="text-typography-600">
                            {job.company}
                          </Text>
                        </VStack>
                      </HStack>
                    </HStack>

                    {/* Description */}
                    <Text size="md" className="text-typography-400">
                      {job.description}
                    </Text>

                    {/* Job Details */}
                    <VStack space="sm">
                      <HStack space="sm" className="items-center">
                        <Icon
                          as={MapPin}
                          size="sm"
                          className="text-typography-400"
                        />
                        <Text size="sm" className="text-typography-400">
                          {job.location}
                        </Text>
                      </HStack>

                      <HStack space="sm" className="items-center">
                        <Icon
                          as={DollarSign}
                          size="sm"
                          className="text-typography-400"
                        />
                        <Text size="sm" className="text-typography-400">
                          {job.salary}
                        </Text>
                      </HStack>
                    </VStack>
                  </VStack>
              ))}
            </VStack>

            {/* Empty State */}
            {filteredJobs.length === 0 && (
              <Card size="lg" variant="outline" className="bg-background-0">
                <VStack space="md" className="items-center py-8">
                  <Icon
                    as={Briefcase}
                    size="xl"
                    className="text-typography-400"
                  />
                  <VStack space="xs" className="items-center">
                    <Heading size="lg">No jobs found</Heading>
                    <Text size="md" className="text-typography-600 text-center">
                      Try adjusting your search or filters to find more
                      opportunities
                    </Text>
                  </VStack>
                  <Button
                    size="lg"
                    variant="solid"
                    action="primary"
                    onPress={() => {
                      setSearchQuery("");
                      setSelectedFilter("All");
                    }}
                  >
                    <ButtonText>Clear Filters</ButtonText>
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

export default JobCardListScreen;
