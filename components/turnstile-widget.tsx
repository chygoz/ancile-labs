"use client";

import Script from "next/script";

import { Button } from "@/components/ui/button";
import { useTurnstile } from "@/hooks/use-turnstile";

interface TurnstileWidgetProps {
  siteKey?: string;
  theme?: "light" | "dark" | "auto";
  size?: "normal" | "compact";
  onSuccess?: (token: string) => void;
  onError?: () => void;
  onExpired?: () => void;
}

export function TurnstileWidget(props: TurnstileWidgetProps) {
  const {
    token,
    isLoaded,
    hasError,
    isRetrying,
    containerRef,
    retry,
    setIsLoaded,
  } = useTurnstile(props);

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        onLoad={() => setIsLoaded(true)}
        strategy="lazyOnload"
      />

      <div className="pt-4">
        <div className="flex flex-col items-center space-y-2">
          {!isLoaded && (
            <div className="flex items-center space-x-2 text-sm text-[#8A846F]">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#8A846F]"></div>
              <span>Loading security verification...</span>
            </div>
          )}

          {isLoaded && !hasError && (
            <div ref={containerRef} className="cf-turnstile"></div>
          )}

          {hasError && (
            <div className="flex flex-col items-center space-y-3">
              <div className="text-center">
                <p className="text-sm text-red-600 mb-2">
                  Security verification failed to load
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={retry}
                  disabled={isRetrying}
                  className="text-xs bg-transparent"
                >
                  {isRetrying ? (
                    <>
                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-current mr-2"></div>
                      Retrying...
                    </>
                  ) : (
                    "Retry Security Check"
                  )}
                </Button>
              </div>
            </div>
          )}

          <p className="text-xs text-[#8A846F] text-center">
            Protected by Cloudflare Turnstile
          </p>
        </div>
      </div>
    </>
  );
}
