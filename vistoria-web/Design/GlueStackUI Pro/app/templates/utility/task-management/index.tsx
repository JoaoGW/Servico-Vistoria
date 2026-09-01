import React, { useState, useMemo } from "react";
import { ScrollView } from "@/components/ui/scroll-view";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { Plus, Filter } from "lucide-react-native";
import { Task, TaskFilter } from "./types";
import { mockTasks, taskCategories } from "./data";
import { StatsCards, QuickFilters, TaskList } from "./components";

const TaskManagement: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [filter, setFilter] = useState<TaskFilter>({
    showCompleted: false,
    dueDate: "today",
  });

  // Filter tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (!filter.showCompleted && task.completed) return false;
      if (filter.priority && task.priority !== filter.priority) return false;
      if (filter.category && task.category !== filter.category) return false;

      if (filter.dueDate) {
        const now = new Date();
        const today = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate()
        );
        const taskDate = task.dueDate
          ? new Date(
              task.dueDate.getFullYear(),
              task.dueDate.getMonth(),
              task.dueDate.getDate()
            )
          : null;

        if (!taskDate) return false;

        switch (filter.dueDate) {
          case "today":
            return taskDate.getTime() === today.getTime();
          case "thisWeek":
            const weekEnd = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
            return taskDate >= today && taskDate <= weekEnd;
          case "overdue":
            return taskDate < today && !task.completed;
          default:
            return true;
        }
      }

      return true;
    });
  }, [tasks, filter]);

  const toggleTaskCompletion = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed, updatedAt: new Date() }
          : task
      )
    );
  };

  const formatDueDate = (date: Date) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const taskDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const diffTime = taskDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays === -1) return "Yesterday";
    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
    if (diffDays <= 7) return `In ${diffDays} days`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const getCategoryInfo = (categoryId: string) => {
    return (
      taskCategories.find((cat) => cat.id === categoryId) || taskCategories[0]
    );
  };

  const completedCount = tasks.filter((task) => task.completed).length;
  const totalCount = tasks.length;
  const overdueCount = tasks.filter(
    (task) => task.dueDate && task.dueDate < new Date() && !task.completed
  ).length;

  return (
    <Box className="flex-1 bg-background-0">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box className="px-4 pt-6 pb-8">
          <VStack space="xl">
            {/* Header */}
            <VStack space="sm">
              <Heading size="xl">Task Management</Heading>
              <Text size="lg" className="text-typography-400">
                Stay organized and productive
              </Text>
            </VStack>

            {/* Stats Cards */}
            <StatsCards
              completedCount={completedCount}
              totalCount={totalCount}
              overdueCount={overdueCount}
            />

            {/* Filter and Add Task */}
            <HStack space="sm" className="items-center">
              <Button
                size="lg"
                variant="outline"
                action="secondary"
                onPress={() =>
                  setFilter((prev) => ({
                    ...prev,
                    showCompleted: !prev.showCompleted,
                  }))
                }
                className="flex-1 bg-background-100 border-0 rounded-2xl "
              >
                <ButtonIcon as={Filter} className="text-typography-900" />
                <ButtonText className="text-typography-900">
                  {filter.showCompleted ? "Hide Completed" : "Show Completed"}
                </ButtonText>
              </Button>

              <Button
                size="lg"
                variant="solid"
                action="primary"
                className="rounded-2xl"
                onPress={() => console.log("Add task")}
              >
                <ButtonIcon as={Plus} />
                <ButtonText>Add Task</ButtonText>
              </Button>
            </HStack>

            {/* Quick Filters */}
            <QuickFilters filter={filter} onFilterChange={setFilter} />

            {/* Tasks List */}
            <VStack space="md">
              <HStack space="md" className="justify-between items-center">
                <Heading size="lg">Tasks</Heading>
                <Text size="sm" className="text-typography-600">
                  {filteredTasks.length} tasks
                </Text>
              </HStack>

              <TaskList
                tasks={filteredTasks}
                filter={filter}
                onToggleCompletion={toggleTaskCompletion}
                formatDueDate={formatDueDate}
                getCategoryInfo={getCategoryInfo}
              />
            </VStack>
          </VStack>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default TaskManagement;
