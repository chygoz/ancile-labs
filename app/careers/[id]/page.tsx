import { getJob } from "@/actions/jobs";
import JobPageClient from "./job-client";

interface JobPageProps {
  params: Promise<{ id: string }>;
}

export default async function JobPage({ params }: JobPageProps) {
  const resolvedParams = await params;
  return <JobPageClient params={resolvedParams} />;
}

export async function generateMetadata({ params }: JobPageProps) {
  const resolvedParams = await params;
  const job = await getJob(resolvedParams.id);

  if (!job) {
    return {
      title: "Job Not Found - Ancile Labs",
    };
  }

  return {
    title: `${job.title} - Careers - Ancile Labs`,
    description: `Apply for ${job.title} position at Ancile Labs. ${job.department} • ${job.location} • ${job.type}`,
  };
}
