import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Platform } from "react-native";

// Define the theme context type
interface ThemeContextType {
  colorMode: "light" | "dark";
  setColorMode: (mode: "light" | "dark") => void;
  handleColorMode: () => void;
  showFab: boolean;
  showHeader: boolean;
}

// Create the context with default values
export const ThemeContext = createContext<ThemeContextType>({
  colorMode: "light",
  setColorMode: () => {},
  handleColorMode: () => {},
  showFab: true,
  showHeader: true,
});

// Theme Provider Component
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [colorMode, setColorModeState] = useState<"light" | "dark">("dark");
  const [showFab, setShowFab] = useState<boolean>(true);
  const [showHeader, setShowHeader] = useState<boolean>(true);

  const setColorMode = (mode: "light" | "dark") => {
    setColorModeState(mode);

    // Notify parent website about theme change (if in iframe)
    if (Platform.OS === "web" && window.parent && window.parent !== window) {
      window.parent.postMessage(
        {
          type: "THEME_CHANGE",
          mode: mode,
        },
        "*"
      );
    }
  };

  const handleColorMode = () => {
    const newMode = colorMode === "light" ? "dark" : "light";
    setColorMode(newMode);
  };

  // HYBRID APPROACH: Read URL parameters on initial load
  useEffect(() => {
    if (Platform.OS === "web") {
      const params = new URLSearchParams(window.location.search);
      const modeParam = params.get("mode");
      const showFabParam = params.get("showFab");
      const showHeaderParam = params.get("showHeader");

      console.log("Theme Context - URL params:", {
        mode: modeParam,
        showFab: showFabParam,
        showHeader: showHeaderParam,
      });

      if (modeParam === "light" || modeParam === "dark") {
        setColorModeState(modeParam);
      }
      if (showFabParam !== null) {
        setShowFab(showFabParam === "true");
      }
      if (showHeaderParam !== null) {
        setShowHeader(showHeaderParam === "true");
      }
    }
  }, []);

  // Listen for messages from parent website (iframe communication)
  useEffect(() => {
    if (Platform.OS === "web") {
      const handleMessage = (event: MessageEvent) => {
        // Allowlist of parent origins (adjust for your deployment)
        // Match the same pattern as color-context for consistency
        const ALLOWED_PARENTS = [
          "https://pro.gluestack.io",
          "https://gluestack.pro", // Legacy domain
          "http://localhost:3000",
          "http://localhost:3001",
        ];

        console.log("Theme Context - Received message from:", event.origin);
        console.log("Theme Context - Message data:", event.data);
        console.log("Theme Context - Allowed origins:", ALLOWED_PARENTS);

        // Use simple includes check like color-context (works for exact matches)
        // Also handle trailing slashes by normalizing
        const normalizedOrigin = event.origin.replace(/\/$/, "");
        const isAllowed = ALLOWED_PARENTS.some(
          (allowed) => allowed.replace(/\/$/, "") === normalizedOrigin
        );

        if (!isAllowed) {
          console.warn("Theme Context - Origin not allowed:", event.origin);
          return;
        }

        // Handle PARENT_UPDATE message
        // Match color-context pattern: check type AND property exists
        if (event.data?.type === "PARENT_UPDATE" && event.data.mode) {
          const {
            mode,
            showFab: shouldShowFab,
            showHeader: shouldShowHeader,
            rtl,
          } = event.data;
          console.log("Theme Context - Received PARENT_UPDATE:", event.data);

          // Check if mode is valid (like color-context validates color)
          const modeValue = mode.toLowerCase();
          if (modeValue === "light" || modeValue === "dark") {
            console.log("Theme Context - Updating mode to:", modeValue);
            setColorModeState(modeValue as "light" | "dark");
          } else {
            console.warn(
              "Theme Context - Invalid mode received:",
              mode,
              "Expected 'light' or 'dark'"
            );
          }

          if (typeof shouldShowFab === "boolean") {
            console.log("Theme Context - Updating showFab to:", shouldShowFab);
            setShowFab(shouldShowFab);
          }

          if (typeof shouldShowHeader === "boolean") {
            console.log(
              "Theme Context - Updating showHeader to:",
              shouldShowHeader
            );
            setShowHeader(shouldShowHeader);
          }

          // Forward RTL updates to RTL context
          if (typeof rtl === "boolean") {
            console.log("Theme Context - Forwarding RTL update:", { rtl });
            // The RTL context will handle these updates through its own message listener
          }
        }
      };

      console.log("Theme Context - Setting up postMessage listener");
      window.addEventListener("message", handleMessage);

      return () => {
        console.log("Theme Context - Removing postMessage listener");
        window.removeEventListener("message", handleMessage);
      };
    }
  }, []);

  const value = {
    colorMode,
    setColorMode,
    handleColorMode,
    showFab,
    showHeader,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
