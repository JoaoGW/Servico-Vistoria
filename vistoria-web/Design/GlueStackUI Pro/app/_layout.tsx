import { CustomHeader } from "@/components/custom/header";
import { Box } from "@/components/ui/box";
import { Fab } from "@/components/ui/fab";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Icon, MoonIcon, SunIcon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import "@/global.css";
import { ColorProvider } from "@/utils/color-context";
import { DrawerProvider } from "@/utils/drawer-context";
import { RTLProvider, useRTL } from "@/utils/rtl-lang-context";
import { ThemeProvider, useTheme } from "@/utils/theme-context";
import { Stack, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "@/components/ui/view";
const AppContent = () => {
  const { colorMode, handleColorMode, showFab, showHeader } = useTheme();
  const { isRTL, direction } = useRTL();
  const pathname = usePathname();
  // Get the last segment
  const lastSegment = pathname.split("/").filter(Boolean).pop(); // filter(Boolean) removes empty strings
  return (
    <>
      <StatusBar
        style="auto"
        backgroundColor={colorMode === "light" ? "#F6F6F6" : "#272625"}
      />
      <GluestackUIProvider mode={colorMode}>
        <View className="flex-1 flex-col" style={{ direction: direction }}>
          {showHeader ? (
            <CustomHeader
              title={lastSegment ? lastSegment : "gluestack pro"}
              showBackButton={pathname === "/" ? false : true}
            />
          ) : (
            <Box className="bg-background-0 py-1.5 flex-row justify-between items-center">
              <Text className="text-typography-400 font-bold ml-5">8:15</Text>

              <Image
                source={require("@/assets/svg/statusicons.svg")}
                alt="menu-options"
                className="h-4 w-20 mr-5"
              />
            </Box>
          )}
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen
              name="index"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
        </View>
        {showFab && (
          <Fab
            className="bottom-10 sm:right-10 right-6 p-4 z-0"
            onPress={handleColorMode}
          >
            <Icon
              as={colorMode === "light" ? SunIcon : MoonIcon}
              className="text-typography-0"
            />
          </Fab>
        )}
      </GluestackUIProvider>
    </>
  );
};
export default function RootLayout() {
  return (
    <ThemeProvider>
      <ColorProvider>
        <RTLProvider>
          <DrawerProvider>
            <AppContent />
          </DrawerProvider>
        </RTLProvider>
      </ColorProvider>
    </ThemeProvider>
  );
}
