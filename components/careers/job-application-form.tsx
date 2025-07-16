"use client";

import type React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useState, useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Upload, CheckCircle } from "lucide-react";
import {
  submitApplication,
  type ApplicationData,
} from "@/actions/applications";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  applicationFormSchema,
  type ApplicationFormValues,
} from "@/lib/schamas";
import { TurnstileWidget } from "@/components/turnstile-widget";

interface JobApplicationFormProps {
  jobId: string;
  jobTitle: string;
}

export default function JobApplicationForm({
  jobId,
  jobTitle,
}: JobApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      linkedin_url: "",
      portfolio_url: "",
      cover_letter: "",
      resume: undefined as any,
    },
  });

  // Handle Turnstile success
  const handleTurnstileSuccess = useCallback((token: string) => {
    console.log("Job Application Form received Turnstile token");
    setTurnstileToken(token);
  }, []);

  // Handle Turnstile error/expiry
  const handleTurnstileError = useCallback(() => {
    console.log("Job Application Form: Turnstile error/expired");
    setTurnstileToken("");
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = [".pdf", ".doc", ".docx"];
      const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();

      if (!allowedTypes.includes(fileExtension)) {
        toast.error("Please upload a PDF, DOC, or DOCX file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }

      setSelectedFile(file);
      form.setValue("resume", file);
      form.clearErrors("resume");
    }
  };

  const onSubmit = async (data: ApplicationFormValues) => {
    console.log("Job Application Form submission started");

    setIsSubmitting(true);

    if (!turnstileToken) {
      toast.error("Please complete the security verification");
      setIsSubmitting(false);
      return;
    }

    if (!selectedFile) {
      toast.error("Please upload your resume");
      setIsSubmitting(false);
      return;
    }

    const applicationData: ApplicationData = {
      job_id: jobId,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone: data.phone,
      linkedin_url: data.linkedin_url || undefined,
      portfolio_url: data.portfolio_url || undefined,
      cover_letter: data.cover_letter,
      resume: selectedFile,
    };

    try {
      const result = await submitApplication(applicationData);
      if (result.success) {
        setIsSubmitted(true);
        toast.success("Application submitted successfully!");
      } else {
        toast.error(result.error || "Failed to submit application");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <CheckCircle className="w-16 h-16 text-[#A20F0F] mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-2 text-[#330505]">
          Application Submitted!
        </h3>
        <p className="text-[#8A846F] mb-4">
          Thank you for your interest in the {jobTitle} position. We&apos;ll
          review your application and get back to you soon.
        </p>
      </motion.div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#330505] font-medium">
                  First Name *
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="John"
                    className="border-[#330505]/30 focus:border-[#A20F0F] text-[#330505]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#330505] font-medium">
                  Last Name *
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Doe"
                    className="border-[#330505]/30 focus:border-[#A20F0F] text-[#330505]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#330505] font-medium">
                Email *
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="john.doe@example.com"
                  className="border-[#330505]/30 focus:border-[#A20F0F] text-[#330505]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#330505] font-medium">
                Phone *
              </FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  className="border-[#330505]/30 focus:border-[#A20F0F] text-[#330505]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="linkedin_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#330505] font-medium">
                LinkedIn Profile
              </FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="https://linkedin.com/in/johndoe"
                  className="border-[#330505]/30 focus:border-[#A20F0F] text-[#330505]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="portfolio_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#330505] font-medium">
                Portfolio/Website
              </FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="https://johndoe.com"
                  className="border-[#330505]/30 focus:border-[#A20F0F] text-[#330505]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="resume"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#330505] font-medium">
                Resume *
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label
                    htmlFor="resume-upload"
                    className="flex items-center justify-center w-full p-3 border-2 border-dashed border-[#330505]/30 rounded-lg cursor-pointer hover:border-[#A20F0F] transition-colors bg-[#330505]/5"
                  >
                    <Upload className="w-5 h-5 mr-2 text-[#330505]" />
                    <span className="text-[#330505]">
                      {selectedFile
                        ? selectedFile.name
                        : "Upload Resume (PDF, DOC, DOCX)"}
                    </span>
                  </label>
                </div>
              </FormControl>
              <p className="text-xs text-[#8A846F] mt-1">Max file size: 5MB</p>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cover_letter"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#330505] font-medium">
                Cover Letter *
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  className="border-[#330505]/30 focus:border-[#A20F0F] text-[#330505] resize-none"
                  placeholder="Tell us why you're interested in this position and what makes you a great fit for our team..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <TurnstileWidget
          onSuccess={handleTurnstileSuccess}
          onError={handleTurnstileError}
          onExpired={handleTurnstileError}
        />

        <Button
          type="submit"
          disabled={isSubmitting || !turnstileToken}
          className="w-full bg-[#A20F0F] text-white hover:bg-[#330505] font-semibold py-3 rounded-full disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Submitting Application...
            </>
          ) : (
            "Submit Application"
          )}
        </Button>

        <p className="text-xs text-[#8A846F] text-center">
          By submitting this application, you agree to our privacy policy and
          terms of service.
        </p>
      </form>
    </Form>
  );
}
