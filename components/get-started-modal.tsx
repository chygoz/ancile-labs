"use client";

import Script from "next/script";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";

import { toast } from "sonner";
import { submitGetStartedForm } from "@/actions/get-started";
import { getStartedFormSchema, GetStartedFormValues } from "@/lib/schamas";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogTrigger } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import { AnimatedHeading } from "@/components/common/animated-heading";

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

export default function GetStartedModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileLoaded, setTurnstileLoaded] = useState(false);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string>("");
  const [turnstileRendered, setTurnstileRendered] = useState(false);
  const [turnstileError, setTurnstileError] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  const form = useForm<GetStartedFormValues>({
    resolver: zodResolver(getStartedFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      serviceRequest: "",
      message: "",
    },
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const renderTurnstile = () => {
    if (
      window.turnstile &&
      turnstileRef.current &&
      !widgetId.current &&
      !turnstileRendered
    ) {
      try {
        setTurnstileError(false);
        widgetId.current = window.turnstile.render(turnstileRef.current, {
          sitekey:
            process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
            "1x00000000000000000000AA",
          callback: (token: string) => {
            setTurnstileToken(token);
            setTurnstileError(false);
          },
          "error-callback": () => {
            setTurnstileToken("");
            setTurnstileError(true);
            toast.error("Security verification failed. Please try again.");
          },
          "expired-callback": () => {
            setTurnstileToken("");
            setTurnstileError(true);
            toast.error("Security verification expired. Please try again.");
          },
          theme: "dark",
          size: "normal",
        });
        setTurnstileRendered(true);
      } catch (error) {
        console.error("Error rendering Turnstile:", error);
        setTurnstileError(true);
      }
    }
  };

  useEffect(() => {
    if (turnstileLoaded && isOpen && !turnstileRendered) {
      const timer = setTimeout(renderTurnstile, 100);
      return () => clearTimeout(timer);
    }
  }, [turnstileLoaded, isOpen, turnstileRendered]);

  // Cleanup effect
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

  const retryTurnstile = async () => {
    setIsRetrying(true);
    setTurnstileError(false);

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
    setTurnstileRendered(false);
    setTurnstileToken("");

    // Wait a moment before retrying
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Try to render again
    renderTurnstile();
    setIsRetrying(false);
  };

  useEffect(() => {
    if (turnstileLoaded && !turnstileRendered && !turnstileError) {
      const timeout = setTimeout(() => {
        if (!turnstileRendered && !turnstileToken) {
          setTurnstileError(true);
        }
      }, 5000); // 5 second timeout

      return () => clearTimeout(timeout);
    }
  }, [turnstileLoaded, turnstileRendered, turnstileError, turnstileToken]);

  async function onSubmit(values: GetStartedFormValues) {
    if (!turnstileToken) {
      toast.error("Please complete the security verification.");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitGetStartedForm({
        formData: values,
        turnstileToken,
      });

      if (result.success) {
        toast.success(result.message);
        form.reset();
        resetTurnstile();
        setTimeout(() => setIsOpen(false), 1500);
      } else {
        toast.error(result.message);
        resetTurnstile();
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An unexpected error occurred. Please try again.");
      resetTurnstile();
    } finally {
      setIsSubmitting(false);
    }
  }

  const resetTurnstile = () => {
    if (window.turnstile && widgetId.current && turnstileRendered) {
      try {
        window.turnstile.reset(widgetId.current);
        setTurnstileToken("");
      } catch (error) {
        console.error("Error resetting Turnstile:", error);
        // If reset fails, try to re-render
        setTurnstileRendered(false);
        widgetId.current = "";
        setTimeout(renderTurnstile, 100);
      }
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      form.reset();
      setTurnstileToken("");
      setTurnstileRendered(false);
      if (widgetId.current) {
        try {
          window.turnstile.remove(widgetId.current);
        } catch (error) {
          console.error("Error removing Turnstile:", error);
        }
        widgetId.current = "";
      }
    }
  };

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        onLoad={() => setTurnstileLoaded(true)}
        strategy="lazyOnload"
      />

      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button className="font-medium transition-colors bg-[#EFD2DC] text-[#330505] hover:bg-[#EFD2DC]/90 rounded-full px-6 py-2">
            Get Started
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[900px] p-4 lg:p-6 bg-[#FDF5D9] border-[#330505] h-[95vh] max-h-[95vh] w-[95vw] sm:w-full flex flex-col overflow-hidden">
          <div className="flex flex-col h-full">
            <DialogHeader className="text-center p-4 pb-6 flex-shrink-0">
              <AnimatedHeading
                primaryText="GET STARTED"
                className="text-[#330505] text-center"
              />

              <DialogDescription className="text-center mt-2 text-[#8A846F] text-xs max-w-[500px] mx-auto leading-relaxed">
                Ready to transform your business with smart solutions? Share
                your project details below and let&apos;s start the
                conversation.
              </DialogDescription>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto px-4 scrollbar-thin scrollbar-thumb-[#8A846F]/30 scrollbar-track-transparent">
              <div className="pb-4">
                <AnimatePresence mode="wait">
                  <Form {...form}>
                    <form
                      id="get-started-form"
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="space-y-4"
                      >
                        {/* Name and Email Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <motion.div variants={itemVariants}>
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-[#8A846F] uppercase text-xs font-medium">
                                    Full Name
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      className="border-b border-t-0 border-l-0 border-r-0 border-[#8A846F] rounded-none focus-visible:ring-0 px-0 py-2 bg-transparent focus-visible:border-[#330505] text-sm"
                                      placeholder=""
                                    />
                                  </FormControl>
                                  <FormMessage className="text-red-500 text-xs mt-1" />
                                </FormItem>
                              )}
                            />
                          </motion.div>

                          <motion.div variants={itemVariants}>
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-[#8A846F] uppercase text-xs font-medium">
                                    Email Address
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="email"
                                      {...field}
                                      className="border-b border-t-0 border-l-0 border-r-0 border-[#8A846F] rounded-none focus-visible:ring-0 px-0 py-2 bg-transparent focus-visible:border-[#330505] text-sm"
                                      placeholder=""
                                    />
                                  </FormControl>
                                  <FormMessage className="text-red-500 text-xs mt-1" />
                                </FormItem>
                              )}
                            />
                          </motion.div>
                        </div>

                        {/* Phone and Service Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <motion.div variants={itemVariants}>
                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-[#8A846F] uppercase text-xs font-medium">
                                    Phone Number
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="tel"
                                      {...field}
                                      className="border-b border-t-0 border-l-0 border-r-0 border-[#8A846F] rounded-none focus-visible:ring-0 px-0 py-2 bg-transparent focus-visible:border-[#330505] text-sm"
                                      placeholder=""
                                    />
                                  </FormControl>
                                  <FormMessage className="text-red-500 text-xs mt-1" />
                                </FormItem>
                              )}
                            />
                          </motion.div>

                          <motion.div variants={itemVariants}>
                            <FormField
                              control={form.control}
                              name="serviceRequest"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-[#8A846F] uppercase text-xs font-medium">
                                    Service Request
                                  </FormLabel>
                                  <FormControl>
                                    <Select
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                    >
                                      <SelectTrigger className="border-b border-t-0 border-l-0 border-r-0 border-[#8A846F] rounded-none focus:ring-0 focus:border-[#330505] h-auto px-0 py-2 bg-transparent text-sm">
                                        <SelectValue placeholder="Select a service" />
                                      </SelectTrigger>
                                      <SelectContent className="bg-[#FDF5D9] border-[#8A846F]">
                                        <SelectItem value="tech-consulting">
                                          Tech Consulting
                                        </SelectItem>
                                        <SelectItem value="talents-solution">
                                          Talent Solutions
                                        </SelectItem>
                                        <SelectItem value="software-development">
                                          Software Development
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </FormControl>
                                  <FormMessage className="text-red-500 text-xs mt-1" />
                                </FormItem>
                              )}
                            />
                          </motion.div>
                        </div>

                        {/* Message */}
                        <motion.div variants={itemVariants}>
                          <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-[#8A846F] uppercase text-xs font-medium">
                                  Project Details
                                </FormLabel>
                                <FormControl>
                                  <Textarea
                                    {...field}
                                    className="min-h-[60px] border-b border-t-0 border-l-0 border-r-0 border-[#8A846F] rounded-none focus-visible:ring-0 px-0 py-2 bg-transparent focus-visible:border-[#330505] resize-none text-sm"
                                    placeholder=""
                                  />
                                </FormControl>
                                <FormMessage className="text-red-500 text-xs mt-1" />
                              </FormItem>
                            )}
                          />
                        </motion.div>

                        {/* Turnstile Widget */}
                        <motion.div variants={itemVariants} className="pt-4">
                          <div className="flex flex-col items-center space-y-2">
                            {!turnstileLoaded && (
                              <div className="flex items-center space-x-2 text-sm text-[#8A846F]">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#8A846F]"></div>
                                <span>Loading security verification...</span>
                              </div>
                            )}

                            {turnstileLoaded && !turnstileError && (
                              <div
                                ref={turnstileRef}
                                className="cf-turnstile"
                              ></div>
                            )}

                            {turnstileError && (
                              <div className="flex flex-col items-center space-y-3">
                                <div className="text-center">
                                  <p className="text-sm text-red-600 mb-2">
                                    Security verification failed to load
                                  </p>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={retryTurnstile}
                                    disabled={isRetrying}
                                    className="text-xs"
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
                        </motion.div>
                      </motion.div>
                    </form>
                  </Form>
                </AnimatePresence>
              </div>
            </div>

            <div className="flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full max-w-[300px] mx-auto"
              >
                <Button
                  type="submit"
                  form="get-started-form"
                  onClick={form.handleSubmit(onSubmit)}
                  disabled={!turnstileToken || isSubmitting}
                  className="w-full bg-[#330505] text-white hover:bg-[#330505]/90 h-10 font-semibold uppercase tracking-wide transition-all duration-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed rounded-full"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="size-4 mr-2 animate-spin" />{" "}
                      Sending...
                    </>
                  ) : (
                    "Send Request"
                  )}
                </Button>
              </motion.div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
