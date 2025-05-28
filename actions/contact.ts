"use server";

import { ContactEmail } from "@/components/emails/contact-email";
import { contactFormSchema, ContactFormValues } from "@/lib/schamas";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SubmitContactFormParams {
  formData: ContactFormValues;
  turnstileToken: string;
}

export async function submitContactForm({
  formData,
  turnstileToken,
}: SubmitContactFormParams) {
  // Verify Turnstile token first
  const turnstileResponse = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET_KEY || "",
        response: turnstileToken,
      }),
    }
  );

  const turnstileResult = await turnstileResponse.json();

  if (!turnstileResult.success) {
    return {
      success: false,
      message: "Security verification failed. Please try again.",
    };
  }

  // Validate form data
  const validatedFields = contactFormSchema.safeParse(formData);

  // Return early if validation fails
  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please check the form for errors.",
    };
  }

  const { name, email, message, subject } = validatedFields.data;

  try {
    // Send email using Resend with the new ContactEmail component
    const { data, error } = await resend.emails.send({
      from: "contact@azacdev.com",
      to: ["azacdev@gmail.com"],
      subject: `New Contact from ${name}`,
      react: ContactEmail({
        name,
        email,
        subject,
        message,
      }),
    });

    if (error) {
      console.error("Error sending email:", error);
      return {
        success: false,
        message: "Failed to send your request. Please try again later.",
      };
    }

    return {
      success: true,
      message:
        "Your request has been sent successfully! We'll get back to you soon.",
    };
  } catch (error) {
    console.error("Error in contact form submission:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
}
