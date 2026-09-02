import React, { useContext, useState } from "react";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Icon } from "@/components/ui/icon";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Grid, GridItem } from "@/components/ui/grid";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { ScrollView } from "@/components/ui/scroll-view";
import { Image } from "@/components/ui/image";
import { Heading } from "@/components/ui/heading";
import { ThemeContext } from "@/utils/theme-context";

import { ArrowLeft, Heart, Share, Download } from "lucide-react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

import { PersonPhoto, PhotoModalProps } from "./types";
import { personPhotos } from "./data";

// Components
const Header: React.FC = () => {
  return (
    <HStack className="items-center justify-between px-6 py-3">
      <HStack space="md" className="items-center">
        <Avatar size="lg">
          <AvatarFallbackText>John Doe</AvatarFallbackText>
          <AvatarImage
            source={{
              uri: "https://images.unsplash.com/photo-1502764613149-7f1d229e230f?w=400&h=400&fit=crop",
            }}
          />
        </Avatar>
        <VStack space="xs">
          <Heading size="xl" className="text-typography-950 font-semibold">
            John Doe
          </Heading>
          <Text size="lg" className="text-typography-400">Photography Portfolio</Text>
        </VStack>
      </HStack>
    </HStack>
  );
};

const PhotoModal: React.FC<PhotoModalProps> = ({ photo, onClose }) => {
  const [isLiked, setIsLiked] = useState(false);
  const { colorMode } = useContext(ThemeContext);

  return (
    <BlurView
      tint={colorMode === "dark" ? "dark" : "light"}
      intensity={colorMode === "dark" ? 30 : 50}
      className="absolute inset-0 z-50"
    >
      <Box className="flex-1">
        <VStack className="flex-1">
          {/* Header */}
          <HStack className="justify-between items-center px-4 py-3">
            <Button size="lg" onPress={onClose} className="bg-transparent">
              <ButtonIcon as={ArrowLeft} className="text-typography-950" />
            </Button>
            <HStack space="md">
              <Button size="lg" className="bg-transparent">
                <ButtonIcon as={Share} className="text-typography-950" />
              </Button>
              <Button size="lg" className="bg-transparent">
                <ButtonIcon as={Download} className="text-typography-950" />
              </Button>
            </HStack>
          </HStack>

          {/* Photo */}
          <Box className="flex-1 items-center justify-center px-4">
            <Box className="w-full aspect-square rounded-xl overflow-hidden max-h-96">
              <Image
                source={{ uri: photo.image }}
                className="w-full h-full"
                resizeMode="contain"
              />
            </Box>
          </Box>

          {/* Photo Info */}
          <Box className="py-6 bg-background-0/70 rounded-t-xl px-5 pb-safe">
            <HStack className="justify-between items-center mb-4">
              <HStack space="md" className="items-center">
                <Avatar size="lg">
                  <AvatarFallbackText>
                    {photo.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallbackText>
                  <AvatarImage source={{ uri: photo.image }} />
                </Avatar>
                <VStack space="xs">
                  <Text size="xl" className="text-typography-950 font-semibold">
                    {photo.name}
                  </Text>
                  <Text size="sm" className="text-typography-600">
                    Professional Model
                  </Text>
                </VStack>
              </HStack>
              <Button
                size="lg"
                className="bg-transparent"
                onPress={() => setIsLiked(!isLiked)}
              >
                <HStack space="xs" className="items-center">
                  <Icon
                    as={Heart}
                    size="lg"
                    className={
                      isLiked
                        ? "text-error-500 fill-error-500"
                        : "text-typography-600"
                    }
                  />
                  <Text size="lg" className="text-typography-950 font-semibold">
                    {photo.likes}
                  </Text>
                </HStack>
              </Button>
            </HStack>

            <Text size="md" className="text-typography-600">
              Professional portrait photography featuring {photo.name}
            </Text>
          </Box>
        </VStack>
      </Box>
    </BlurView>
  );
};

// Main Component
export default function PhotoGalleryScreen() {
  const [selectedPhoto, setSelectedPhoto] = useState<PersonPhoto | null>(null);

  const handlePhotoPress = (photo: PersonPhoto) => {
    setSelectedPhoto(photo);
  };

  const handleCloseModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <Box className="flex-1 bg-background-0">
      <VStack className="flex-1">
        <Header />

        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          <Box className="p-4">
            <Grid
              className="gap-2"
              _extra={{
                className:
                  "grid-cols-3 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-8 xl:grid-cols-9",
              }}
            >
              {personPhotos.map((photo) => (
                <GridItem
                  key={photo.id}
                  className="aspect-[9/14] rounded-lg overflow-hidden relative"
                  _extra={{ className: "col-span-1" }}
                >
                  <Button
                    variant="link"
                    className="w-full h-full p-0"
                    onPress={() => handlePhotoPress(photo)}
                  >
                    <Box className="w-full h-full relative">
                      <Image
                        source={{ uri: photo.image }}
                        className="w-full h-full"
                        resizeMode="cover"
                      />

                      {/* Overlay with info */}
                      <Box className="absolute bottom-0 left-0 right-0">
                        <LinearGradient
                          colors={["rgba(0,0,0)", "transparent"]}
                          start={{ x: 0, y: 1 }}
                          end={{ x: 0, y: 0 }}
                          className=" h-full"
                        >
                          <VStack space="xs" className="p-4">
                            <Text
                              size="sm"
                              className="text-white font-semibold"
                            >
                              {photo.name}
                            </Text>
                            <HStack space="xs" className="items-center">
                              <Icon
                                as={Heart}
                                size="xs"
                                className="text-error-400"
                              />
                              <Text size="xs" className="text-white">
                                {photo.likes}
                              </Text>
                            </HStack>
                          </VStack>
                        </LinearGradient>
                      </Box>
                    </Box>
                  </Button>
                </GridItem>
              ))}
            </Grid>
          </Box>
        </ScrollView>
      </VStack>

      {selectedPhoto && (
        <PhotoModal photo={selectedPhoto} onClose={handleCloseModal} />
      )}
    </Box>
  );
}
