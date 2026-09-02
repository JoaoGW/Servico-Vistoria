import React from "react";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import {
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
} from "@/components/ui/checkbox";
import { Icon } from "@/components/ui/icon";
import { Calendar, CheckCircle } from "lucide-react-native";
import { Task, TaskCategory } from "../types";

interface TaskCardProps {
  task: Task;
  categoryInfo: TaskCategory;
  onToggleCompletion: (taskId: string) => void;
  formatDueDate: (date: Date) => string;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  categoryInfo,
  onToggleCompletion,
  formatDueDate,
}) => {
  const isOverdue =
    task.dueDate && task.dueDate < new Date() && !task.completed;

  return (
    <Card
      size="lg"
      variant="elevated"
      className={`bg-background-0 px-0 items-center ${
        task.completed ? "opacity-60" : ""
      }`}
    >
      <HStack space="md" className="items-start">
        <Checkbox
          value={task.completed ? "checked" : "unchecked"}
          onChange={() => onToggleCompletion(task.id)}
          size="md"
          className="mt-1"
        >
          <CheckboxIndicator>
            <CheckboxIcon as={CheckCircle} />
          </CheckboxIndicator>
        </Checkbox>

        <VStack space="sm" className="flex-1">
          <HStack space="md" className="justify-between items-start">
            <VStack space="xs" className="flex-1">
              <Heading
                size="md"
                className={`${
                  task.completed
                    ? "line-through text-typography-400"
                    : "text-typography-950"
                }`}
              >
                {task.title}
              </Heading>
              {task.description && (
                <Text
                  size="sm"
                  className={`text-typography-600 ${
                    task.completed ? "line-through" : ""
                  }`}
                >
                  {task.description}
                </Text>
              )}
            </VStack>
          </HStack>

          {task.dueDate && (
            <HStack space="xs" className="items-center ">
              <Icon as={Calendar} size="xs" className="text-typography-900" />
              <Text
                size="sm"
                className={`${
                  isOverdue ? "text-typography-900" : "text-typography-600"
                }`}
              >
                {formatDueDate(task.dueDate)}
              </Text>
            </HStack>
          )}
        </VStack>
      </HStack>
    </Card>
  );
};

export default TaskCard;
