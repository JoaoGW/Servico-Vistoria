import React, { useState } from "react";
import { ScrollView } from "@/components/ui/scroll-view";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import {
  Avatar,
  AvatarImage,
  AvatarFallbackText,
} from "@/components/ui/avatar";
import { Button, ButtonText } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import {
  Bell,
  Heart,
  AtSign,
  AlertCircle,
  UserPlus,
  MessageCircle,
  CheckCheck,
} from "lucide-react-native";

interface Notification {
  id: string;
  type: "mention" | "like" | "system" | "follow" | "comment";
  user?: {
    name: string;
    avatar: string;
  };
  message: string;
  content?: string;
  timestamp: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "mention",
    user: {
      name: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    message: "mentioned you in a comment",
    content: '"@you Great work on the latest project! The design is amazing."',
    timestamp: "2m ago",
    read: false,
  },
  {
    id: "2",
    type: "like",
    user: {
      name: "Michael Chen",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    message: "liked your post",
    content: "Building beautiful mobile apps with React Native",
    timestamp: "15m ago",
    read: false,
  },
  {
    id: "3",
    type: "follow",
    user: {
      name: "Emma Wilson",
      avatar: "https://i.pravatar.cc/150?img=9",
    },
    message: "started following you",
    timestamp: "1h ago",
    read: false,
  },
  {
    id: "4",
    type: "comment",
    user: {
      name: "David Brown",
      avatar: "https://i.pravatar.cc/150?img=15",
    },
    message: "commented on your post",
    content: '"This is exactly what I was looking for. Thanks for sharing!"',
    timestamp: "2h ago",
    read: true,
  },
  {
    id: "5",
    type: "system",
    message: "Your profile was viewed 47 times this week",
    timestamp: "3h ago",
    read: true,
  },
  {
    id: "6",
    type: "like",
    user: {
      name: "Lisa Anderson",
      avatar: "https://i.pravatar.cc/150?img=20",
    },
    message: "and 12 others liked your photo",
    timestamp: "5h ago",
    read: true,
  },
  {
    id: "7",
    type: "mention",
    user: {
      name: "James Miller",
      avatar: "https://i.pravatar.cc/150?img=8",
    },
    message: "mentioned you in a post",
    content: '"Check out @you\'s amazing portfolio!"',
    timestamp: "1d ago",
    read: true,
  },
  {
    id: "8",
    type: "system",
    message: "Your post reached 1,000 views milestone!",
    timestamp: "2d ago",
    read: true,
  },
];

const NotificationsFeed: React.FC = () => {
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<"all" | "mentions" | "likes" | "system">(
    "all"
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "mention":
        return AtSign;
      case "like":
        return Heart;
      case "follow":
        return UserPlus;
      case "comment":
        return MessageCircle;
      case "system":
        return AlertCircle;
      default:
        return Bell;
    }
  };

  const getIconColor = (type: Notification["type"]) => {
    switch (type) {
      case "mention":
        return "text-primary-500";
      case "like":
        return "text-error-500";
      case "follow":
        return "text-success-500";
      case "comment":
        return "text-info-500";
      case "system":
        return "text-warning-500";
      default:
        return "text-typography-500";
    }
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "all") return true;
    if (filter === "mentions") return notification.type === "mention";
    if (filter === "likes") return notification.type === "like";
    if (filter === "system") return notification.type === "system";
    return true;
  });

  return (
    <Box className="flex-1 bg-background-0">
      {/* Header */}
      <Box className="px-4 pt-6 pb-4 bg-background-50 rounded-b-xl">
        <VStack space="md">
          <HStack space="md" className="items-center justify-between">
            <VStack space="xs">
              <Heading size="xl">Notifications</Heading>
              {unreadCount > 0 && (
                <Text size="lg" className="text-typography-400">
                  {unreadCount} unread notification
                  {unreadCount !== 1 ? "s" : ""}
                </Text>
              )}
            </VStack>
            {unreadCount > 0 && (
              <Button
                size="lg"
                variant="link"
                action="primary"
                onPress={markAllAsRead}
              >
                <ButtonText>Mark all read</ButtonText>
              </Button>
            )}
          </HStack>

          {/* Filter Tabs */}
          <HStack space="sm" className="pt-2">
            <Button
              size="lg"
              variant={filter === "all" ? "solid" : "outline"}
              action={filter === "all" ? "primary" : "secondary"}
              onPress={() => setFilter("all")}
            >
              <ButtonText>All</ButtonText>
            </Button>
            <Button
              size="lg"
              variant={filter === "mentions" ? "solid" : "outline"}
              action={filter === "mentions" ? "primary" : "secondary"}
              onPress={() => setFilter("mentions")}
            >
              <ButtonText>Mentions</ButtonText>
            </Button>
            <Button
              size="lg"
              variant={filter === "likes" ? "solid" : "outline"}
              action={filter === "likes" ? "primary" : "secondary"}
              onPress={() => setFilter("likes")}
            >
              <ButtonText>Likes</ButtonText>
            </Button>
            <Button
              size="lg"
              variant={filter === "system" ? "solid" : "outline"}
              action={filter === "system" ? "primary" : "secondary"}
              onPress={() => setFilter("system")}
            >
              <ButtonText>System</ButtonText>
            </Button>
          </HStack>
        </VStack>
      </Box>

      {/* Notifications List */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box className="px-4 py-2 pb-safe">
          <VStack space="sm">
            {filteredNotifications.map((notification) => (
              <Box
                key={notification.id}
                className={`p-4 rounded-xl ${
                  notification.read
                    ? "bg-background-50"
                    : "bg-background-100/80"
                }`}
              >
                <HStack space="md" className="items-start">
                  {/* Avatar or Icon */}
                  {notification.user ? (
                    <Avatar size="md">
                      <AvatarFallbackText>
                        {notification.user.name}
                      </AvatarFallbackText>
                      <AvatarImage source={{ uri: notification.user.avatar }} />
                    </Avatar>
                  ) : (
                    <Box className="w-12 h-12 rounded-full items-center justify-center">
                      <Icon
                        as={getNotificationIcon(notification.type)}
                        size="lg"
                        className={getIconColor(notification.type)}
                      />
                    </Box>
                  )}

                  {/* Content */}
                  <VStack space="xs" className="flex-1">
                    <HStack space="sm" className="">
                      <Text
                        size="md"
                        className="font-semibold text-typography-950"
                      >
                        {notification.user && notification.user.name}{" "}
                        <Text size="md" className="text-typography-600">
                          {notification.message}
                        </Text>
                      </Text>
                    </HStack>

                    {notification.content && (
                      <Text size="sm" className="text-typography-500 italic">
                        {notification.content}
                      </Text>
                    )}

                    <HStack space="sm" className="items-center">
                      <Text size="sm" className="text-typography-400">
                        {notification.timestamp}
                      </Text>
                      {!notification.read && (
                        <Box className="w-2 h-2 rounded-full bg-primary-500" />
                      )}
                    </HStack>
                  </VStack>

                  {/* Read indicator */}
                  {notification.read && (
                    <Icon
                      as={CheckCheck}
                      size="sm"
                      className="text-typography-300"
                    />
                  )}
                </HStack>
              </Box>
            ))}
          </VStack>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default NotificationsFeed;
