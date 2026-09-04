import React, { createContext, useContext, useState, useEffect } from "react";
import { Platform, I18nManager } from "react-native";

interface RTLContextType {
  isRTL: boolean;
  direction: "ltr" | "rtl";
  toggleRTL: () => void;
  setRTL: (rtl: boolean) => void;
}

const RTLContext = createContext<RTLContextType>({
  isRTL: false,
  direction: "ltr",
  toggleRTL: () => {},
  setRTL: () => {},
});

const ALLOWED_ORIGINS = [
  "https://pro.gluestack.io",
  "http://localhost:3000",
  "http://localhost:3001",
  // Add your production website URLs here (without trailing slashes)
];

export const RTLProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isRTL, setIsRTL] = useState<boolean>(false);
  const [direction, setDirection] = useState<"ltr" | "rtl">("ltr");

  // Apply RTL settings
  const applyRTLSettings = (rtl: boolean) => {
    const newDirection = rtl ? "rtl" : "ltr";
    setIsRTL(rtl);
    setDirection(newDirection);

    // Apply RTL to React Native I18nManager
    if (Platform.OS !== "web") {
      I18nManager.allowRTL(rtl);
      I18nManager.forceRTL(rtl);
    }

    // Apply RTL to web document
    if (Platform.OS === "web") {
      const root = document.documentElement;
      root.setAttribute("dir", newDirection);

      // Apply CSS custom properties for RTL support
      root.style.setProperty("--direction", newDirection);
      root.style.setProperty(
        "--text-align",
        newDirection === "rtl" ? "right" : "left"
      );
      root.style.setProperty(
        "--text-align-opposite",
        newDirection === "rtl" ? "left" : "right"
      );
    }
  };

  // HYBRID APPROACH: Read URL parameters on initial load
  useEffect(() => {
    if (Platform.OS === "web") {
      const params = new URLSearchParams(window.location.search);
      const rtlParam = params.get("rtl");

      console.log("RTL Context - URL params:", {
        rtl: rtlParam,
      });

      // Handle RTL parameter
      if (rtlParam !== null) {
        const shouldBeRTL = rtlParam === "true";
        applyRTLSettings(shouldBeRTL);
      }
    }
  }, []);

  // Listen for messages from parent
  useEffect(() => {
    if (Platform.OS !== "web") return;

    const handleMessage = (event: MessageEvent) => {
      console.log("RTL Context - Received message from:", event.origin);
      console.log("RTL Context - Message data:", event.data);
      console.log("RTL Context - Allowed origins:", ALLOWED_ORIGINS);

      if (!ALLOWED_ORIGINS.includes(event.origin)) {
        console.warn("RTL Context - Origin not allowed:", event.origin);
        return;
      }

      if (event.data?.type === "PARENT_UPDATE") {
        const { rtl } = event.data;

        // Handle RTL update
        if (typeof rtl === "boolean") {
          console.log("RTL Context - Updating RTL to:", rtl);
          applyRTLSettings(rtl);
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const setRTL = (rtl: boolean) => {
    applyRTLSettings(rtl);

    // Notify parent website about RTL change (if in iframe)
    if (Platform.OS === "web" && window.parent && window.parent !== window) {
      window.parent.postMessage(
        {
          type: "RTL_CHANGE",
          rtl: rtl,
        },
        "*"
      );
    }
  };

  const toggleRTL = () => {
    const newRTL = !isRTL;
    setRTL(newRTL);
  };

  return (
    <RTLContext.Provider
      value={{
        isRTL,
        direction,
        toggleRTL,
        setRTL,
      }}
    >
      {children}
    </RTLContext.Provider>
  );
};

export const useRTL = () => {
  const context = useContext(RTLContext);
  if (!context) {
    throw new Error("useRTL must be used within RTLProvider");
  }
  return context;
};
