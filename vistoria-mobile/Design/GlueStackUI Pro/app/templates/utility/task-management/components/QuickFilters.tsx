import React from "react";
import { ScrollView } from "@/components/ui/scroll-view";
import { HStack } from "@/components/ui/hstack";
import { Button, ButtonText } from "@/components/ui/button";
import { TaskFilter } from "../types";

interface QuickFiltersProps {
  filter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
}

const QuickFilters: React.FC<QuickFiltersProps> = ({
  filter,
  onFilterChange,
}) => {
  const handleTodayFilter = () => {
    onFilterChange({
      ...filter,
      dueDate: filter.dueDate === "today" ? undefined : "today",
    });
  };

  const handleThisWeekFilter = () => {
    onFilterChange({
      ...filter,
      dueDate: filter.dueDate === "thisWeek" ? undefined : "thisWeek",
    });
  };

  const handleOverdueFilter = () => {
    onFilterChange({
      ...filter,
      dueDate: filter.dueDate === "overdue" ? undefined : "overdue",
    });
  };

  const handleHighPriorityFilter = () => {
    onFilterChange({
      ...filter,
      priority: filter.priority === "high" ? undefined : "high",
    });
  };

  return (

      <HStack space="lg" className="border-b border-outline-100 w-full">
        <Button
          size="lg"
          onPress={handleTodayFilter}
          variant="link"
          className={`rounded-none ${
            filter.dueDate === "today" ? "border-b-2 border-primary-500" : ""
          }`}
        >
          <ButtonText
            className={`${
              filter.dueDate === "today"
                ? "text-primary-500"
                : "text-typography-500"
            }`}
          >
            Today
          </ButtonText>
        </Button>

        <Button
          size="lg"
          onPress={handleThisWeekFilter}
          variant="link"
          className={`rounded-none ${
            filter.dueDate === "thisWeek" ? "border-b-2 border-primary-500" : ""
          }`}
        >
          <ButtonText
            className={`${
              filter.dueDate === "thisWeek"
                ? "text-primary-500"
                : "text-typography-500"
            }`}
          >
            This Week
          </ButtonText>
        </Button>

        <Button
          size="lg"
          onPress={handleOverdueFilter}
          variant="link"
          className={`rounded-none ${
            filter.dueDate === "overdue" ? "border-b-2 border-primary-500" : ""
          }`}
        >
          <ButtonText
            className={`${
              filter.dueDate === "overdue"
                ? "text-primary-500"
                : "text-typography-500"
            }`}
          >
            Overdue
          </ButtonText>
        </Button>

        <Button
          size="lg"
          onPress={handleHighPriorityFilter}
          variant="link"
          className={`rounded-none ${
            filter.priority === "high" ? "border-b-2 border-primary-500" : ""
          }`}
        >
          <ButtonText
            className={`${
              filter.priority === "high"
                ? "text-primary-500"
                : "text-typography-500"
            }`}
          >
            High Priority
          </ButtonText>
        </Button>
      </HStack>
  );
};

export default QuickFilters;
