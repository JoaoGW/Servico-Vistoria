import React from "react";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { CheckCircle } from "lucide-react-native";
import { Task, TaskCategory, TaskFilter } from "../types";
import TaskCard from "./TaskCard";

interface TaskListProps {
  tasks: Task[];
  filter: TaskFilter;
  onToggleCompletion: (taskId: string) => void;
  formatDueDate: (date: Date) => string;
  getCategoryInfo: (categoryId: string) => TaskCategory;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  filter,
  onToggleCompletion,
  formatDueDate,
  getCategoryInfo,
}) => {
  if (tasks.length === 0) {
    return (
      <Card size="lg" variant="elevated" className="bg-background-50">
        <VStack space="md" className="items-center py-8">
          <Icon as={CheckCircle} size="2xl" className="text-typography-400" />
          <VStack space="xs" className="items-center">
            <Heading size="lg" className="text-typography-600">
              No tasks found
            </Heading>
            <Text size="md" className="text-typography-500 text-center">
              {filter.showCompleted
                ? "No completed tasks to show"
                : "All tasks are completed! Great job!"}
            </Text>
          </VStack>
        </VStack>
      </Card>
    );
  }

  return (
    <VStack space="sm">
      {tasks.map((task) => {
        const categoryInfo = getCategoryInfo(task.category);

        return (
          <TaskCard
            key={task.id}
            task={task}
            categoryInfo={categoryInfo}
            onToggleCompletion={onToggleCompletion}
            formatDueDate={formatDueDate}
          />
        );
      })}
    </VStack>
  );
};

export default TaskList;
