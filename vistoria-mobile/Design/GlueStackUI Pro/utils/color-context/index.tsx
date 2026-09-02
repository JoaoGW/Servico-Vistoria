import React, { createContext, useContext, useState, useEffect } from "react";
import { Platform } from "react-native";
import { ColorName, getPalette, isValidColor } from "../color-palette";
import { useTheme } from "../theme-context";

interface ColorContextType {
  currentColor: ColorName;
  setColor: (color: ColorName) => void;
}

const ColorContext = createContext<ColorContextType>({
  currentColor: "blue",
  setColor: () => {},
});

const ALLOWED_ORIGINS = [
  "https://pro.gluestack.io",
  "http://localhost:3000",
  "http://localhost:3001",
  // Add your production website URLs here (without trailing slashes)
];

export const ColorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentColor, setCurrentColor] = useState<ColorName>("blue");
  const { colorMode } = useTheme();

  // Apply color palette to CSS variables
  const applyColorPalette = (color: ColorName, mode: "light" | "dark") => {
    if (Platform.OS !== "web") return;

    const palette = getPalette(mode);
    const shades = palette[color];
    const root = document.documentElement;

    // Apply all primary shades
    root.style.setProperty("--color-primary-0", shades[0]);
    root.style.setProperty("--color-primary-50", shades[50]);
    root.style.setProperty("--color-primary-100", shades[100]);
    root.style.setProperty("--color-primary-200", shades[200]);
    root.style.setProperty("--color-primary-300", shades[300]);
    root.style.setProperty("--color-primary-400", shades[400]);
    root.style.setProperty("--color-primary-500", shades[500]);
    root.style.setProperty("--color-primary-600", shades[600]);
    root.style.setProperty("--color-primary-700", shades[700]);
    root.style.setProperty("--color-primary-800", shades[800]);
    root.style.setProperty("--color-primary-900", shades[900]);
    root.style.setProperty("--color-primary-950", shades[950]);
  };

  // HYBRID APPROACH: Read URL parameters on initial load
  useEffect(() => {
    if (Platform.OS === "web") {
      const params = new URLSearchParams(window.location.search);
      const colorParam = params.get("color");

      console.log("Color Context - URL color param:", colorParam);

      if (colorParam && isValidColor(colorParam)) {
        setCurrentColor(colorParam);
      }
    }
  }, []);

  // Apply color palette when color or mode changes
  useEffect(() => {
    if (Platform.OS === "web") {
      const mode = colorMode === "dark" ? "dark" : "light";
      applyColorPalette(currentColor, mode);
    }
  }, [currentColor, colorMode]);

  // Listen for messages from parent
  useEffect(() => {
    if (Platform.OS !== "web") return;

    const handleMessage = (event: MessageEvent) => {
      console.log("Color Context - Received message from:", event.origin);
      console.log("Color Context - Message data:", event.data);
      console.log("Color Context - Allowed origins:", ALLOWED_ORIGINS);

      if (!ALLOWED_ORIGINS.includes(event.origin)) {
        console.warn("Color Context - Origin not allowed:", event.origin);
        return;
      }

      if (event.data?.type === "PARENT_UPDATE" && event.data.color) {
        const colorName = event.data.color.toLowerCase();
        console.log("Color Context - Attempting to set color:", colorName);
        if (isValidColor(colorName)) {
          console.log("Color Context - Color is valid, applying:", colorName);
          setCurrentColor(colorName);
        } else {
          console.warn("Color Context - Invalid color:", colorName);
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const setColor = (color: ColorName) => {
    setCurrentColor(color);
  };

  return (
    <ColorContext.Provider value={{ currentColor, setColor }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColor = () => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error("useColor must be used within ColorProvider");
  }
  return context;
};