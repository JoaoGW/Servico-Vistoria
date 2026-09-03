import React from "react";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";

interface StatsCardsProps {
  completedCount: number;
  totalCount: number;
  overdueCount: number;
}

const StatsCards: React.FC<StatsCardsProps> = ({
  completedCount,
  totalCount,
  overdueCount,
}) => {
  return (
    <HStack space="md">
      <Card size="md" variant="elevated" className="flex-1 bg-background-50">
        <VStack space="xs" className="items-center rounded-2xl">
          <Text size="md" className="text-typography-900">
            Completed
          </Text>
          <Heading size="2xl" className="text-success-500">
            {completedCount}
          </Heading>
          <Text size="sm" className="text-typography-700">
            of {totalCount} tasks
          </Text>
        </VStack>
      </Card>

      <Card size="md" variant="elevated" className="flex-1 bg-background-50">
        <VStack space="xs" className="items-center rounded-2xl">
          <Text size="md" className="text-typography-900">
            Overdue
          </Text>
          <Heading size="2xl" className="text-error-500">
            {overdueCount}
          </Heading>
          <Text size="sm" className="text-typography-700">
            tasks
          </Text>
        </VStack>
      </Card>
    </HStack>
  );
};

export default StatsCards;
