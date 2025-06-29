"use client";

import { useState, useRef, useEffect, useCallback } from "react";

import { toast } from "sonner";

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

interface UseTurnstileOptions {
  siteKey?: string;
  theme?: "light" | "dark" | "auto";
  size?: "normal" | "compact";
  onSuccess?: (token: string) => void;
  onError?: () => void;
  onExpired?: () => void;
}

export function useTurnstile(options: UseTurnstileOptions = {}) {
  const [token, setToken] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string>("");

  const {
    siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
      "1x00000000000000000000AA",
    theme = "dark",
    size = "normal",
    onSuccess,
    onError,
    onExpired,
  } = options;

  const render = useCallback(() => {
    if (
      window.turnstile &&
      containerRef.current &&
      !widgetId.current &&
      !isRendered
    ) {
      try {
        setHasError(false);
        widgetId.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: (token: string) => {
            setToken(token);
            setHasError(false);
            onSuccess?.(token);
          },
          "error-callback": () => {
            setToken("");
            setHasError(true);
            toast.error("Security verification failed. Please try again.");
            onError?.();
          },
          "expired-callback": () => {
            setToken("");
            setHasError(true);
            toast.error("Security verification expired. Please try again.");
            onExpired?.();
          },
          theme,
          size,
        });
        setIsRendered(true);
      } catch (error) {
        console.error("Error rendering Turnstile:", error);
        setHasError(true);
      }
    }
  }, [siteKey, theme, size, isRendered, onSuccess, onError, onExpired]);

  const reset = useCallback(() => {
    if (window.turnstile && widgetId.current && isRendered) {
      try {
        window.turnstile.reset(widgetId.current);
        setToken("");
      } catch (error) {
        console.error("Error resetting Turnstile:", error);
        // If reset fails, try to re-render
        setIsRendered(false);
        widgetId.current = "";
        setTimeout(render, 100);
      }
    }
  }, [isRendered, render]);

  const retry = useCallback(async () => {
    setIsRetrying(true);
    setHasError(false);

    // Clean up existing widget
    if (window.turnstile && widgetId.current) {
      try {
        window.turnstile.remove(widgetId.current);
      } catch (error) {
        console.error("Error removing Turnstile:", error);
      }
    }

    // Reset state
    widgetId.current = "";
    setIsRendered(false);
    setToken("");

    // Wait a moment before retrying
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Try to render again
    render();
    setIsRetrying(false);
  }, [render]);

  // Handle initial render when loaded
  useEffect(() => {
    if (isLoaded && !isRendered) {
      const timer = setTimeout(render, 100);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, isRendered, render]);

  // Handle render timeout
  useEffect(() => {
    if (isLoaded && !isRendered && !hasError) {
      const timeout = setTimeout(() => {
        if (!isRendered && !token) {
          setHasError(true);
        }
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [isLoaded, isRendered, hasError, token]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (window.turnstile && widgetId.current) {
        try {
          window.turnstile.remove(widgetId.current);
        } catch (error) {
          console.error("Error removing Turnstile:", error);
        }
      }
    };
  }, []);

  return {
    token,
    isLoaded,
    hasError,
    isRetrying,
    containerRef,
    reset,
    retry,
    setIsLoaded,
  };
}
