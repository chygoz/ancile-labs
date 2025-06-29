"use client";

import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { TurnstileWidget } from "../turnstile-widget";
import { useTurnstile } from "@/hooks/use-turnstile";
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

export default function ContactSection() {
  const pathname = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { token: turnstileToken, reset: resetTurnstile } = useTurnstile();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const isCareerWithId = /^\/careers\/[^/]+$/.test(pathname);

  if (isCareerWithId) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  async function onSubmit(values: ContactFormValues) {
    if (!turnstileToken) {
      toast.error("Please complete the security verification.");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitContactForm({
        formData: values,
        turnstileToken,
      });

      if (result.success) {
        toast.success(result.message);
        form.reset();
        resetTurnstile();
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
          <motion.div
            className="space-y-6"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <motion.p
              className="text-lg text-[#8A846F]"
              variants={itemVariants}
            >
              Whether you need one role filled or an entire product delivered —
              we&apos;re here to help. Reach out and let&apos;s discuss how
              Ancile Inc. can support your next step.
            </motion.p>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <motion.div
                  className="grid gap-8 md:grid-cols-2"
                  variants={containerVariants}
                >
                  <motion.div variants={itemVariants}>
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
                  </motion.div>

                  <motion.div variants={itemVariants}>
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
                  </motion.div>
                </motion.div>

                <motion.div variants={itemVariants}>
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
                </motion.div>

                <motion.div variants={itemVariants}>
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
                </motion.div>

                <TurnstileWidget />

                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
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
                </motion.div>
              </form>
            </Form>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
