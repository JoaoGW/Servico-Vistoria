import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import {
  X,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  SkipBack,
  SkipForward,
} from "lucide-react-native";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@/components/ui/slider";
import { Image } from "@/components/ui/image";
import { MusicPlayerProps } from "./types";

const MusicPlayer: React.FC<MusicPlayerProps> = ({ music, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  // Fix duration error - provide safe default
  const duration = music?.duration || 240; // 4 minutes default

  // Auto-update current time when playing
  useEffect(() => {
    let interval: number;

    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => {
          const newTime = prevTime + 1;
          // Stop at the end of the song
          if (newTime >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return newTime;
        });
      }, 1000) as unknown as number;
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying, duration]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSkip = (seconds: number) => {
    const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
    setCurrentTime(newTime);
  };

  const handleSeek = (value: number) => {
    setCurrentTime(value);
  };

  return (
    <Box className="flex-1 bg-background-0">
      <StatusBar hidden />

      {/* Music Container */}
      <Box className="flex-1 relative">
        {/* Album Cover */}
        <Box className="flex-1 items-center justify-center px-8">
          <VStack space="xl" className="items-center">
            {/* Album Art */}
            <Box className="w-80 h-80 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                source={{
                  uri:
                    music?.coverImage ||
                    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center",
                }}
                alt={music?.title || "Album Cover"}
                className="w-full h-full"
              />
            </Box>

            {/* Song Info */}
            <VStack space="md" className="items-center">
              <Text
                size="2xl"
                className="text-typography-950 text-center font-bold"
              >
                {music?.title || "Amazing Song"}
              </Text>
              <Text size="lg" className="text-typography-600 text-center">
                {music?.artist || "Great Artist"}
              </Text>
              <Text size="md" className="text-typography-500 text-center">
                {music?.album || "Best Album"}
              </Text>
            </VStack>
          </VStack>
        </Box>

        {/* Top Controls */}
        <Box className="absolute top-0 left-0 right-0 bg-background-0/80 pt-12 pb-4">
          <HStack className="px-4 items-center justify-between">
            <Button size="lg" variant="link" onPress={onClose} className="p-2">
              <ButtonIcon as={X} className="text-typography-950" />
            </Button>
          </HStack>
        </Box>

        {/* Bottom Controls */}
        <Box className="absolute bottom-0 left-0 right-0 bg-background-0/80 pt-4 pb-8">
          <VStack space="lg" className="px-4">
            {/* Progress Slider */}
            <Box>
              <Slider
                value={currentTime}
                onChange={handleSeek}
                minValue={0}
                maxValue={duration}
                className="w-full"
              >
                <SliderTrack className="h-1 bg-typography-400">
                  <SliderFilledTrack className="bg-primary-500" />
                </SliderTrack>
                <SliderThumb className="w-4 h-4 bg-primary-500" />
              </Slider>
            </Box>

            {/* Time Display */}
            <HStack className="items-center justify-between">
              <Text size="sm" className="text-typography-600">
                {formatTime(currentTime)}
              </Text>
              <Text size="sm" className="text-typography-600">
                {formatTime(duration)}
              </Text>
            </HStack>

            {/* Control Buttons */}
            <HStack space="lg" className="items-center justify-center">
              <Button
                size="lg"
                variant="link"
                onPress={() => handleSkip(-10)}
                className="p-2"
              >
                <ButtonIcon as={RotateCcw} className="text-typography-950" />
              </Button>

              <Button
                size="lg"
                variant="link"
                onPress={() => handleSkip(-30)}
                className="p-2"
              >
                <ButtonIcon as={SkipBack} className="text-typography-950" />
              </Button>

              <Button
                size="lg"
                variant="link"
                onPress={handlePlayPause}
                className="p-4 bg-primary-500/20 rounded-full"
              >
                <ButtonIcon
                  as={isPlaying ? Pause : Play}
                  size="lg"
                  className="text-primary-500 ml-1"
                />
              </Button>

              <Button
                size="lg"
                variant="link"
                onPress={() => handleSkip(30)}
                className="p-2"
              >
                <ButtonIcon as={SkipForward} className="text-typography-950" />
              </Button>

              <Button
                size="lg"
                variant="link"
                onPress={() => handleSkip(10)}
                className="p-2"
              >
                <ButtonIcon as={RotateCw} className="text-typography-950" />
              </Button>
            </HStack>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};

export default MusicPlayer;
