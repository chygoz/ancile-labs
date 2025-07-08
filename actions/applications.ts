export interface ApplicationData {
  job_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  linkedin_url?: string;
  portfolio_url?: string;
  cover_letter: string;
  resume: File;
}

export async function submitApplication(
  data: ApplicationData
): Promise<{ success: boolean; error?: string }> {
  try {
    const formData = new FormData();

    // Append all form fields
    formData.append("job_id", data.job_id);
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("cover_letter", data.cover_letter);
    formData.append("resume", data.resume);

    if (data.linkedin_url) {
      formData.append("linkedin_url", data.linkedin_url);
    }

    if (data.portfolio_url) {
      formData.append("portfolio_url", data.portfolio_url);
    }

    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_ADMIN_URL || "https://ancile-admin.vercel.app"
      }/api/applications`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to submit application");
    }

    return { success: true };
  } catch (error) {
    console.error("Error submitting application:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to submit application",
    };
  }
}
