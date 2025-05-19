"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

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
import Container from "../container";
import { AnimatedHeading } from "./animated-heading";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

export default function ContactSection() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

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

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Log the form data to console
    console.log("Form submitted with values:", values);

    form.reset();
  }

  return (
    <section className="w-full bg-[#FDF5D9]" ref={sectionRef} id="contact">
      <Container className="pb-16 md:pb-24">
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

                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    variant={"pink"}
                    className="w-full rounded-full bg-[#EFD2DC] text-black hover:bg-[#EFD2DC]/90 lg:h-12"
                  >
                    Send Message
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
