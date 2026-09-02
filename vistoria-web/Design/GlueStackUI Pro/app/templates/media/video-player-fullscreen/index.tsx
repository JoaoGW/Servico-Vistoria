import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { X, Play, Pause, RotateCcw, RotateCw } from "lucide-react-native";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@/components/ui/slider";
import { Image } from "@/components/ui/image";
import { VideoPlayerProps } from "./types";

const VideoPlayerFullscreen: React.FC<VideoPlayerProps> = ({
  video,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  // Fix duration error - provide safe default
  const duration = video?.duration || 3600; // 60 minutes default

  // Auto-update current time when playing
  useEffect(() => {
    let interval: number;

    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => {
          const newTime = prevTime + 1;
          // Stop at the end of the video
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

      {/* Video Container */}
      <Box className="flex-1 relative">
        {/* Video Image */}
        <Image
          source={{
            uri:
              video?.thumbnail ||
              "https://images.unsplash.com/photo-1600240644455-3edc55c375fe?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bGFuZHNjYXBlfGVufDB8MXwwfHx8MA%3D%3D",
          }}
          alt={video?.title || "Video"}
          className="w-full h-full"
        />

        {/* Top Controls */}
        <Box className="absolute top-0 left-0 right-0 bg-background-0/80 pt-12 pb-4">
          <HStack className="px-4 items-center justify-between">
            <Button size="lg" variant="link" onPress={onClose} className="p-2">
              <ButtonIcon as={X} className="text-typography-950" />
            </Button>
          </HStack>
        </Box>

        {/* Center Play Button */}
        {!isPlaying && (
          <Box className="absolute inset-0 items-center justify-center">
            <Button
              size="lg"
              variant="link"
              onPress={handlePlayPause}
              className="p-6 bg-background-0/50 rounded-full"
            >
              <ButtonIcon
                as={Play}
                size="lg"
                className="text-typography-950 ml-1"
              />
            </Button>
          </Box>
        )}

        {/* Bottom Controls */}
        <Box className="absolute bottom-0 left-0 right-0 bg-background-0/80 pt-4 pb-8">
          <VStack space="md" className="px-4">
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

            {/* Control Buttons */}
            <HStack space="lg" className="items-center justify-between">
              <HStack space="md" className="items-center">
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
                  onPress={handlePlayPause}
                  className="p-3"
                >
                  <ButtonIcon
                    as={isPlaying ? Pause : Play}
                    size="xl"
                    className="text-typography-950"
                  />
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

              <Text size="sm" className="text-typography-950">
                {formatTime(currentTime)} / {formatTime(duration)}
              </Text>
            </HStack>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};

export default VideoPlayerFullscreen;
