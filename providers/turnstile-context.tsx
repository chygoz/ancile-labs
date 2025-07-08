"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";

declare global {
  interface Window {
    turnstile: {
      render: (
        element: string | HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
          size?: "normal" | "compact";
        }
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

interface TurnstileContextType {
  isScriptLoaded: boolean;
  scriptError: boolean;
  retryScriptLoad: () => void;
}

const TurnstileContext = createContext<TurnstileContextType | undefined>(
  undefined
);

interface TurnstileProviderProps {
  children: ReactNode;
}

export function TurnstileProvider({ children }: TurnstileProviderProps) {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState(false);
  const [scriptElement, setScriptElement] = useState<HTMLScriptElement | null>(
    null
  );

  const loadScript = useCallback(() => {
    // Check if script is already loaded
    if (window.turnstile) {
      setIsScriptLoaded(true);
      return;
    }

    // Check if script is already in DOM
    const existingScript = document.querySelector('script[src*="turnstile"]');
    if (existingScript) {
      return;
    }

    console.log("Loading Turnstile script...");
    setScriptError(false);

    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      console.log("✅ Turnstile script loaded successfully");
      setIsScriptLoaded(true);
      setScriptError(false);
    };

    script.onerror = () => {
      console.error("❌ Failed to load Turnstile script");
      setScriptError(true);
      setIsScriptLoaded(false);
    };

    document.head.appendChild(script);
    setScriptElement(script);
  }, []);

  const retryScriptLoad = useCallback(() => {
    // Remove existing script if it exists
    if (scriptElement) {
      document.head.removeChild(scriptElement);
      setScriptElement(null);
    }

    // Reset states
    setIsScriptLoaded(false);
    setScriptError(false);

    // Retry loading
    setTimeout(loadScript, 1000);
  }, [scriptElement, loadScript]);

  useEffect(() => {
    loadScript();

    // Cleanup on unmount
    return () => {
      if (scriptElement) {
        try {
          document.head.removeChild(scriptElement);
        } catch (error) {
          console.error("Error removing Turnstile script:", error);
        }
      }
    };
  }, [loadScript]);

  return (
    <TurnstileContext.Provider
      value={{
        isScriptLoaded,
        scriptError,
        retryScriptLoad,
      }}
    >
      {children}
    </TurnstileContext.Provider>
  );
}

export function useTurnstileContext() {
  const context = useContext(TurnstileContext);
  if (context === undefined) {
    throw new Error(
      "useTurnstileContext must be used within a TurnstileProvider"
    );
  }
  return context;
}
