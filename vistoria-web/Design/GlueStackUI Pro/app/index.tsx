import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { CircleIcon, Icon } from "@/components/ui/icon";
import { Heading } from "@/components/ui/heading";
import { Button, ButtonText } from "@/components/ui/button";
import { Alert, Linking } from "react-native";
import { useDrawer } from "@/utils/drawer-context";
// import { RTLDemo } from "@/components/demo/rtl-lang-demo";
import { useRTL } from "@/utils/rtl-lang-context";

export default function App() {
  const { openDrawer } = useDrawer();
  const { isRTL } = useRTL();
  const handleBuyNow = async () => {
    const url = "https://theappmarket.io/buy/gluestack-pro/gluestack-pro";
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  return (
    <Box className="bg-background-0 flex-1 justify-center items-center">
      <VStack className="max-w-[880px] gap-4 px-10 justify-center items-center">
        <HStack className="gap-2 justify-start items-center">
          <Text size="xs" className="uppercase font-semibold font-space-mono">
            Copy
          </Text>
          <Icon
            as={CircleIcon}
            size="xs"
            className="text-typography-400 fill-[#8D69E1] stroke-none"
          />
          <Text size="xs" className="uppercase font-semibold font-jakarta">
            Paste
          </Text>
          <Icon
            as={CircleIcon}
            size="xs"
            className="text-typography-400 fill-[#F473C1] stroke-none"
          />
          <Text size="xs" className="uppercase font-semibold font-space-mono">
            Ship
          </Text>
        </HStack>
        <Heading
          size="4xl"
          className="text-left leading-[54px] sm:text-center text-typography-950 md:text-[54px] font-plus-jakarta md:leading-[1.3em] -tracking-[0.02em] font-bold items-center max-w-[800px]"
        >
          Premium React Native templates that just work.
        </Heading>
        <Text className="text-left sm:text-center text-typography-700 md:text-lg text-lg font-normal mt-4 ">
          A universal library of premium React Native ui screens to ship apps
          faster
        </Text>
        <HStack className="gap-4 mt-4">
          <Button size="lg" onPress={handleBuyNow} action="secondary">
            <ButtonText>Buy Now →</ButtonText>
          </Button>
          <Button size="lg" onPress={openDrawer} action="secondary">
            <ButtonText>View Templates</ButtonText>
          </Button>
        </HStack>

        {/* RTL Demo Section */}
        {/* <Box className="mt-8 w-full">
          <RTLDemo />
        </Box> */}
      </VStack>
    </Box>
  );
}
