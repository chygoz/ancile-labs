"use client";

import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState, useEffect, useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { submitGetStartedForm } from "@/actions/get-started";
import { getStartedFormSchema, type GetStartedFormValues } from "@/lib/schamas";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { AnimatedHeading } from "@/components/common/animated-heading";
import { TurnstileWidget } from "./turnstile-widget";

interface GetStartedModalProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultService?: string;
}

export default function GetStartedModal({
  isOpen,
  onOpenChange,
  defaultService = "",
}: GetStartedModalProps = {}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  // Add internal state for when component is used standalone
  const [internalIsOpen, setInternalIsOpen] = useState(false);

  // Use external props if provided, otherwise use internal state
  const modalIsOpen = isOpen !== undefined ? isOpen : internalIsOpen;
  const setModalOpen = onOpenChange || setInternalIsOpen;

  const form = useForm<GetStartedFormValues>({
    resolver: zodResolver(getStartedFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      serviceRequest: defaultService,
      message: "",
    },
  });

  // Update form when defaultService changes
  useEffect(() => {
    if (defaultService) {
      form.setValue("serviceRequest", defaultService);
    }
  }, [defaultService, form]);

  // Handle Turnstile success
  const handleTurnstileSuccess = useCallback((token: string) => {
    console.log(
      "Get Started Modal received Turnstile token:",
      token.substring(0, 20) + "..."
    );
    setTurnstileToken(token);
  }, []);

  // Handle Turnstile error/expiry
  const handleTurnstileError = useCallback(() => {
    console.log("Get Started Modal: Turnstile error/expired");
    setTurnstileToken("");
  }, []);

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

  async function onSubmit(values: GetStartedFormValues) {
    if (!turnstileToken) {
      toast.error("Please complete the security verification.");
      return;
    }

    setIsSubmitting(true);

    // try {
    //   const result = await submitGetStartedForm({
    //     formData: values,
    //     turnstileToken,
    //   });

    //   if (result.success) {
    //     toast.success(result.message);
    //     form.reset();
    //     setTurnstileToken("");
    //     setTimeout(() => setModalOpen(false), 1500);
    //   } else {
    //     toast.error(result.message);
    //     setTurnstileToken("");
    //   }
    // } catch (error) {
    //   console.error("Submission error:", error);
    //   toast.error("An unexpected error occurred. Please try again.");
    //   setTurnstileToken("");
    // } finally {
    //   setIsSubmitting(false);
    // }

    try {
      console.log("📤 Sending form data to server...");
      const result = await submitGetStartedForm({
        formData: values,
        turnstileToken,
      });

      console.log("📥 Server response:", result);

      if (result.success) {
        toast.success(result.message);
        form.reset();
        // Only clear token after successful submission
        setTurnstileToken("");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("💥 Submission error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleOpenChange = (open: boolean) => {
    setModalOpen(open);
    if (!open) {
      form.reset();
      setTurnstileToken("");
    }
  };

  return (
    <Dialog open={modalIsOpen} onOpenChange={handleOpenChange}>
      {!isOpen && (
        <DialogTrigger asChild>
          <Button className="font-medium transition-colors bg-[#EFD2DC] text-[#330505] hover:bg-[#EFD2DC]/90 rounded-full px-6 py-2">
            Get Started
          </Button>
        </DialogTrigger>
      )}

      <DialogContent className="sm:max-w-[900px] p-4 lg:p-6 bg-[#FDF5D9] border-[#330505] h-[95vh] max-h-[95vh] w-[95vw] sm:w-full flex flex-col overflow-hidden">
        <div className="flex flex-col h-full">
          <DialogHeader className="text-center p-4 pb-6 flex-shrink-0">
            <AnimatedHeading
              primaryText="GET STARTED"
              className="text-[#330505] text-center"
            />
            <DialogDescription className="text-center mt-2 text-[#8A846F] text-xs max-w-[500px] mx-auto leading-relaxed">
              Ready to transform your business with smart solutions? Share your
              project details below and let&apos;s start the conversation.
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
                                    value={field.value}
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

                      {/* Only render Turnstile when modal is open */}
                      {modalIsOpen && (
                        <motion.div variants={itemVariants}>
                          <TurnstileWidget
                            onSuccess={handleTurnstileSuccess}
                            onError={handleTurnstileError}
                            onExpired={handleTurnstileError}
                          />
                        </motion.div>
                      )}
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
                    <Loader2 className="size-4 mr-2 animate-spin" /> Sending...
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
  );
}
