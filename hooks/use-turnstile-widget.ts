"use client";

import { useState, useRef, useEffect, useCallback } from "react";

import { toast } from "sonner";
import { useTurnstileContext } from "@/providers/turnstile-context";

interface UseTurnstileWidgetOptions {
  siteKey?: string;
  theme?: "light" | "dark" | "auto";
  size?: "normal" | "compact";
  onSuccess?: (token: string) => void;
  onError?: () => void;
  onExpired?: () => void;
}

export function useTurnstileWidget(options: UseTurnstileWidgetOptions = {}) {
  const { isScriptLoaded, scriptError } = useTurnstileContext();
  const [token, setToken] = useState<string>("");
  const [isRendered, setIsRendered] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string>("");
  const renderAttempts = useRef(0);

  // Get the site key with proper fallback and validation
  const getSiteKey = useCallback(() => {
    const envSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    const propSiteKey = options.siteKey;

    // Use prop first, then env, then fallback
    const siteKey = propSiteKey || envSiteKey || "1x00000000000000000000AA";

    // Ensure it's a string
    const finalSiteKey =
      typeof siteKey === "string" ? siteKey : String(siteKey);

    return finalSiteKey;
  }, [options.siteKey]);

  const {
    theme = "light",
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
      !isRendered &&
      isScriptLoaded &&
      !hasError &&
      !scriptError
    ) {
      try {
        renderAttempts.current += 1;
        console.log(
          `Rendering Turnstile widget (attempt ${renderAttempts.current})`
        );

        const siteKey = getSiteKey();

        // Validate site key before rendering
        if (!siteKey || typeof siteKey !== "string") {
          throw new Error(
            `Invalid site key: ${siteKey} (type: ${typeof siteKey})`
          );
        }

        console.log("🔑 Using site key:", siteKey.substring(0, 10) + "...");

        setHasError(false);
        widgetId.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey, // Use the validated site key
          callback: (token: string) => {
            console.log("✅ Turnstile token received");
            setToken(token);
            setHasError(false);
            onSuccess?.(token);
          },
          "error-callback": () => {
            console.log("❌ Turnstile error callback triggered");
            setToken("");
            setHasError(true);
            toast.error("Security verification failed. Please try again.");
            onError?.();
          },
          "expired-callback": () => {
            console.log("⏰ Turnstile expired callback triggered");
            setToken("");
            setHasError(true);
            toast.error("Security verification expired. Please try again.");
            onExpired?.();
          },
          theme,
          size,
        });

        setIsRendered(true);
        console.log("✅ Turnstile widget rendered successfully");
      } catch (error) {
        console.error("❌ Error rendering Turnstile:", error);
        setHasError(true);

        if (renderAttempts.current >= 3) {
          console.error("Max render attempts reached");
          return;
        }
      }
    }
  }, [
    theme,
    size,
    isRendered,
    isScriptLoaded,
    hasError,
    scriptError,
    onSuccess,
    onError,
    onExpired,
    getSiteKey,
  ]);

  const reset = useCallback(() => {
    if (window.turnstile && widgetId.current && isRendered) {
      try {
        window.turnstile.reset(widgetId.current);
        setToken("");
        console.log("✅ Turnstile widget reset successfully");
      } catch (error) {
        console.error("❌ Error resetting Turnstile:", error);
        setIsRendered(false);
        widgetId.current = "";
        setTimeout(render, 100);
      }
    }
  }, [isRendered, render]);

  const retry = useCallback(async () => {
    console.log("Retrying Turnstile widget...");
    setIsRetrying(true);
    setHasError(false);

    if (window.turnstile && widgetId.current) {
      try {
        window.turnstile.remove(widgetId.current);
        console.log("✅ Existing widget removed");
      } catch (error) {
        console.error("❌ Error removing Turnstile:", error);
      }
    }

    widgetId.current = "";
    setIsRendered(false);
    setToken("");
    renderAttempts.current = 0;

    await new Promise((resolve) => setTimeout(resolve, 1000));

    render();
    setIsRetrying(false);
  }, [render]);

  // Handle initial render when script is loaded
  useEffect(() => {
    if (
      isScriptLoaded &&
      !isRendered &&
      !hasError &&
      !isRetrying &&
      !scriptError
    ) {
      const timer = setTimeout(() => {
        render();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isScriptLoaded, isRendered, hasError, isRetrying, scriptError, render]);

  // Handle render timeout
  useEffect(() => {
    if (
      isScriptLoaded &&
      !isRendered &&
      !hasError &&
      !isRetrying &&
      !scriptError
    ) {
      const timeout = setTimeout(() => {
        if (!isRendered && !token && renderAttempts.current === 0) {
          console.log("⏰ Turnstile render timeout");
          setHasError(true);
        }
      }, 15000);

      return () => clearTimeout(timeout);
    }
  }, [isScriptLoaded, isRendered, hasError, token, isRetrying, scriptError]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (window.turnstile && widgetId.current) {
        try {
          window.turnstile.remove(widgetId.current);
          console.log("✅ Turnstile widget cleaned up on unmount");
        } catch (error) {
          console.error("❌ Error removing Turnstile on unmount:", error);
        }
      }
    };
  }, []);

  return {
    token,
    isLoaded: isScriptLoaded,
    hasError: hasError || scriptError,
    isRetrying,
    containerRef,
    reset,
    retry,
  };
}
