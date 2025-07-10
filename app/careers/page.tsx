import { Suspense } from "react";

import { getJobs } from "@/actions/jobs";
import CareersHero from "@/components/careers/careers-hero";
import JobsList from "@/components/careers/jobs-list";
import JobsListSkeleton from "@/components/careers/jobs-list-skeleton";

export const metadata = {
  title: "Careers - Ancile Canada Inc",
  description:
    "Join our team of problem-solvers helping businesses grow through smart IT consulting, scalable talent, and modern web solutions.",
};

export default async function CareersPage() {
  const jobs = await getJobs();

  return (
    <div>
      <CareersHero />
      <Suspense fallback={<JobsListSkeleton />}>
        <JobsList jobs={jobs} />
      </Suspense>
    </div>
  );
}
