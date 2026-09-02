import React, { useState } from "react";
import { ScrollView } from "@/components/ui/scroll-view";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { Icon } from "@/components/ui/icon";
import { Grid, GridItem } from "@/components/ui/grid";
import {
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
} from "@/components/ui/checkbox";
import { Check, Image as ImageIcon, Video, Grid3x3 } from "lucide-react-native";

// Types
interface MediaItem {
  id: string;
  uri: string;
  type: "photo" | "video";
  duration?: string;
}

type MediaFilter = "all" | "photos" | "videos";

// Mock Data
const generateMockMedia = (): MediaItem[] => {
  const items: MediaItem[] = [];
  for (let i = 1; i <= 6; i++) {
    items.push({
      id: `media-${i}`,
      uri: `https://picsum.photos/seed/${i}/400/400`,
      type: i % 3 === 0 ? "video" : "photo",
      duration: i % 3 === 0 ? `0:${15 + (i % 30)}` : undefined,
    });
  }
  return items;
};

const MediaGalleryPicker: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [activeFilter, setActiveFilter] = useState<MediaFilter>("all");
  const [mediaItems] = useState<MediaItem[]>(generateMockMedia());

  // Filter media based on active filter
  const filteredMedia = mediaItems.filter((item) => {
    if (activeFilter === "photos") return item.type === "photo";
    if (activeFilter === "videos") return item.type === "video";
    return true;
  });

  const toggleSelection = (id: string) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleDone = () => {
    console.log("Selected items:", Array.from(selectedItems));
    // Handle done action
  };

  const handleCancel = () => {
    setSelectedItems(new Set());
    // Handle cancel action
  };

  const renderMediaItem = (item: MediaItem) => {
    const isSelected = selectedItems.has(item.id);

    return (
      <GridItem
        key={item.id}
        className="aspect-square"
        _extra={{ className: "col-span-1" }}
      >
        <Button
          variant="link"
          onPress={() => toggleSelection(item.id)}
          className="p-0 m-0 w-full h-full"
        >
          <Box className="relative bg-background-100 w-full h-full">
            <Image
              source={{ uri: item.uri }}
              alt={`Media ${item.id}`}
              className="w-full h-full"
            />

            {/* Video indicator */}
            {item.type === "video" && (
              <Box className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded-md">
                <Text size="xs" className="text-white">
                  {item.duration}
                </Text>
              </Box>
            )}

            {/* Selection overlay */}
            {isSelected && (
              <Box className="absolute inset-0 bg-primary-500/10 border-[1.5px] border-primary-500" />
            )}

            {/* Checkbox */}
            <Box className="absolute top-2 right-2">
              <Checkbox
                size="md"
                value={item.id}
                isChecked={isSelected}
                onChange={() => {
                  toggleSelection(item.id);
                }}
                className=""
              >
                <CheckboxIndicator>
                  <CheckboxIcon as={Check} className="text-white" />
                </CheckboxIndicator>
              </Checkbox>
            </Box>
          </Box>
        </Button>
      </GridItem>
    );
  };

  return (
    <VStack space="2xl" className="flex-1 bg-background-0">
      {/* Header */}
      <HStack
        space="sm"
        className="px-4 py-4 justify-between items-center"
      >
        <Heading size="xl">Select Photos</Heading>

        <Button
          size="lg"
          variant="link"
          action="primary"
          onPress={handleDone}
          disabled={selectedItems.size === 0}
        >
          <ButtonText>Done</ButtonText>
        </Button>
      </HStack>

      {/* Filter Tabs */}
      <HStack space="sm" className="px-4">
        <Button
          size="lg"
          variant={activeFilter === "all" ? "solid" : "outline"}
          action={activeFilter === "all" ? "primary" : "secondary"}
          onPress={() => setActiveFilter("all")}
          className="flex-1"
        >
          <ButtonText>All</ButtonText>
        </Button>

        <Button
          size="lg"
          variant={activeFilter === "photos" ? "solid" : "outline"}
          action={activeFilter === "photos" ? "primary" : "secondary"}
          onPress={() => setActiveFilter("photos")}
          className="flex-1"
        >
          <ButtonText>Photos</ButtonText>
        </Button>

        <Button
          size="lg"
          variant={activeFilter === "videos" ? "solid" : "outline"}
          action={activeFilter === "videos" ? "primary" : "secondary"}
          onPress={() => setActiveFilter("videos")}
          className="flex-1"
        >
          <ButtonText>Videos</ButtonText>
        </Button>
      </HStack>

      {/* Media Grid */}
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {filteredMedia.length > 0 ? (
          <Grid
            className="gap-0"
            _extra={{
              className: "grid-cols-3",
            }}
          >
            {filteredMedia.map((item) => renderMediaItem(item))}
          </Grid>
        ) : (
          <VStack space="md" className="items-center justify-center py-20">
            <Icon
              as={activeFilter === "videos" ? Video : ImageIcon}
              size="xl"
              className="text-typography-400"
            />
            <Text size="lg" className="text-typography-500 text-center">
              No {activeFilter === "all" ? "media" : activeFilter} found
            </Text>
          </VStack>
        )}
      </ScrollView>

      {/* Bottom Selection Bar */}
      {selectedItems.size > 0 && (
        <Box className="px-4 py-4 bg-background-50 pb-safe web:pb-6">
          <HStack space="md" className="items-center justify-between">
            <HStack space="sm" className="items-center flex-1">
              <VStack>
                <Text size="lg" className="text-typography-950">
                  {selectedItems.size} item
                  {selectedItems.size !== 1 ? "s" : ""} selected
                </Text>
                <Text className="text-typography-500">Ready to upload</Text>
              </VStack>
            </HStack>

            <Button
              size="lg"
              className="rounded-xl"
              variant="solid"
              action="primary"
              onPress={handleDone}
            >
              <ButtonText>Add to Post</ButtonText>
            </Button>
          </HStack>
        </Box>
      )}
    </VStack>
  );
};

export default MediaGalleryPicker;
