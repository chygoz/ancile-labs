"use client";

import { Button } from "@/components/ui/button";
import { useTurnstileWidget } from "@/hooks/use-turnstile-widget";
import { useTurnstileContext } from "@/providers/turnstile-context";

import { RefreshCw } from "lucide-react";

interface TurnstileWidgetProps {
  siteKey?: string;
  theme?: "light" | "dark" | "auto";
  size?: "normal" | "compact";
  onSuccess?: (token: string) => void;
  onError?: () => void;
  onExpired?: () => void;
}

export function TurnstileWidget(props: TurnstileWidgetProps) {
  const { retryScriptLoad } = useTurnstileContext();
  const { token, isLoaded, hasError, isRetrying, containerRef, retry } =
    useTurnstileWidget(props);

  return (
    <div className="pt-4">
      <div className="flex flex-col items-center space-y-2">
        {!isLoaded && !hasError && (
          <div className="flex items-center space-x-2 text-sm text-[#8A846F]">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#8A846F]"></div>
            <span>Loading security verification...</span>
          </div>
        )}

        {isLoaded && !hasError && (
          <div className="w-full flex justify-center">
            <div ref={containerRef} className="cf-turnstile" />
          </div>
        )}

        {hasError && (
          <div className="flex flex-col items-center space-y-3">
            <div className="text-center">
              <p className="text-sm text-red-600 mb-2">
                Security verification failed to load
              </p>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={retry}
                  disabled={isRetrying}
                  className="text-xs bg-transparent border-red-300 text-red-600 hover:bg-red-50"
                >
                  {isRetrying ? (
                    <>
                      <RefreshCw className="animate-spin h-3 w-3 mr-2" />
                      Retrying Widget...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-3 w-3 mr-2" />
                      Retry Widget
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={retryScriptLoad}
                  className="text-xs bg-transparent border-red-300 text-red-600 hover:bg-red-50"
                >
                  <RefreshCw className="h-3 w-3 mr-2" />
                  Reload Script
                </Button>
              </div>
            </div>
          </div>
        )}

        <p className="text-xs text-[#8A846F] text-center">
          Protected by Cloudflare Turnstile
        </p>
      </div>
    </div>
  );
}
