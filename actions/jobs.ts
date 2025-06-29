export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  is_active: boolean;
  created_at: string;
  _count?: {
    applications: number;
  };
}

export interface SingleJob {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string;
  benefits?: string;
  salary_range?: string;
  is_active: boolean;
  created_at: string;
  updated_at?: string;
}

export async function getJobs(): Promise<Job[]> {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_ADMIN_URL || "https://ancile-admin.vercel.app"
      }/api/jobs`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch jobs");
    }

    const jobs = await response.json();
    // Filter only active jobs for public display
    return jobs.filter((job: Job) => job.is_active);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
}

export async function getJob(id: string): Promise<SingleJob | null> {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_ADMIN_URL || "https://ancile-admin.vercel.app"
      }/api/jobs/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error("Failed to fetch job");
    }

    const job = await response.json();
    // Only return if job is active
    return job.is_active ? job : null;
  } catch (error) {
    console.error("Error fetching job:", error);
    return null;
  }
}
