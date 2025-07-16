"use client";

import { Loader2 } from "lucide-react";
import { useRef, useState, useCallback } from "react"; // useRef is kept for sectionRef id
import { usePathname } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { TurnstileWidget } from "../turnstile-widget";
import { toast } from "sonner";
import { submitContactForm } from "@/actions/contact";
import { contactFormSchema, type ContactFormValues } from "@/lib/schamas";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Container from "@/components/container";
import { AnimatedHeading } from "@/components/common/animated-heading";
import { useForm } from "react-hook-form"; // Import useForm

export default function ContactSection() {
  const pathname = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const sectionRef = useRef(null); // Kept for the id="contact"

  const handleTurnstileSuccess = useCallback((token: string) => {
    console.log(
      "✅ Contact Section received Turnstile token:",
      token.substring(0, 50) + "..."
    );
    setTurnstileToken(token);
  }, []);

  const handleTurnstileError = useCallback(() => {
    console.log("❌ Contact Section: Turnstile error/expired");
    setTurnstileToken("");
  }, []);

  const isCareerWithId = /^\/careers\/[^/]+$/.test(pathname);
  if (isCareerWithId) {
    return null;
  }

  async function onSubmit(values: ContactFormValues) {
    console.log("🚀 Form submission started");
    console.log(
      "🔐 Current turnstile token:",
      turnstileToken
        ? "Present (" + turnstileToken.length + " chars)"
        : "Missing"
    );
    if (!turnstileToken) {
      toast.error("Please complete the security verification.");
      return;
    }
    setIsSubmitting(true);
    try {
      console.log("📤 Sending form data to server...");
      const result = await submitContactForm({
        formData: values,
        turnstileToken,
      });
      console.log("📥 Server response:", result);
      if (result.success) {
        toast.success(result.message);
        form.reset();
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

  return (
    <section className="w-full bg-[#FDF5D9]" ref={sectionRef} id="contact">
      <Container className="py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
          <div>
            <AnimatedHeading
              primaryText="Let's get you set up for success"
              textColor="#330505"
            />
          </div>
          <div className="space-y-6">
            {" "}
            <p className="text-lg text-[#8A846F]">
              {" "}
              Whether you need one role filled or an entire product delivered —
              we&apos;re here to help. Reach out and let&apos;s discuss how
              Ancile Canada Inc. can support your next step.
            </p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="grid gap-8 md:grid-cols-2">
                  {" "}
                  <div>
                    {" "}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div>
                              <p className="text-[#5a3d2d] font-medium lg:text-xl">
                                Name
                              </p>
                              <Input
                                {...field}
                                className="border-0 border-b border-[#5a3d2d] rounded-none px-0 py-2 bg-transparent focus-visible:ring-0 focus-visible:border-[#3a0e00]"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    {" "}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div>
                              <p className="text-[#5a3d2d] font-medium lg:text-xl">
                                Email
                              </p>
                              <Input
                                type="email"
                                {...field}
                                className="border-0 border-b border-[#5a3d2d] rounded-none px-0 py-2 bg-transparent focus-visible:ring-0 focus-visible:border-[#3a0e00]"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div>
                  {" "}
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div>
                            <p className="text-[#5a3d2d] font-medium lg:text-xl">
                              Subject
                            </p>
                            <Input
                              {...field}
                              className="border-0 border-b border-[#5a3d2d] rounded-none px-0 py-2 bg-transparent focus-visible:ring-0 focus-visible:border-[#3a0e00]"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  {" "}
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div>
                            <p className="text-[#5a3d2d] font-medium lg:text-xl">
                              Message
                            </p>
                            <Textarea
                              {...field}
                              className="min-h-[120px] border-0 border-b border-[#5a3d2d] rounded-none px-0 py-2 bg-transparent focus-visible:ring-0 focus-visible:border-[#3a0e00] resize-none"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <TurnstileWidget
                  onSuccess={handleTurnstileSuccess}
                  onError={handleTurnstileError}
                  onExpired={handleTurnstileError}
                />
                <div>
                  {" "}
                  <Button
                    type="submit"
                    variant={"pink"}
                    disabled={!turnstileToken || isSubmitting}
                    className="w-full rounded-full bg-[#EFD2DC] text-black hover:bg-[#EFD2DC]/90 lg:h-12"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="size-4 mr-2 animate-spin" />{" "}
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </Container>
    </section>
  );
}
