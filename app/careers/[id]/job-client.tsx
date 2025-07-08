"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Users,
  Calendar,
  Briefcase,
} from "lucide-react";

import { getJob, type SingleJob } from "@/actions/jobs";
import JobApplicationForm from "@/components/careers/job-application-form";
import Container from "@/components/container";
import JobPageSkeleton from "@/components/careers/job-page-skeleton";

interface JobPageProps {
  params: { id: string };
}

export default function JobPageClient({ params }: JobPageProps) {
  const [job, setJob] = useState<SingleJob | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const fetchedJob = await getJob(params.id);
        if (!fetchedJob) {
          notFound();
        }
        setJob(fetchedJob);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch job:", error);
        notFound();
      }
    };

    fetchJob();
  }, [params.id]);

  if (loading) {
    return <JobPageSkeleton />;
  }

  if (!job) {
    return <div>Job not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#FDF5D9]">
      <Container className="py-12">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/careers"
            className="inline-flex items-center text-[#330505] hover:text-[#A20F0F] transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Careers
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Job Details - Takes up 2 columns */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="bg-[#330505] rounded-2xl p-8 shadow-lg text-[#FDF5D9]">
              {/* Job Header */}
              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="inline-block rounded-full bg-[#A20F0F] px-3 py-1 text-xs font-medium text-white">
                    {job.department}
                  </span>
                  <span className="text-sm text-[#FDF5D9]/80">
                    Posted {new Date(job.created_at).toLocaleDateString()}
                  </span>
                </div>

                <h1 className="text-3xl lg:text-4xl font-bold mb-6">
                  {job.title}
                </h1>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center text-[#FDF5D9]/80">
                    <MapPin className="w-4 h-4 mr-2 text-[#E7ADB2]" />
                    <span className="text-sm">{job.location}</span>
                  </div>
                  <div className="flex items-center text-[#FDF5D9]/80">
                    <Clock className="w-4 h-4 mr-2 text-[#E7ADB2]" />
                    <span className="text-sm">{job.type}</span>
                  </div>
                  <div className="flex items-center text-[#FDF5D9]/80">
                    <Users className="w-4 h-4 mr-2 text-[#E7ADB2]" />
                    <span className="text-sm">{job.department}</span>
                  </div>
                  <div className="flex items-center text-[#FDF5D9]/80">
                    <Briefcase className="w-4 h-4 mr-2 text-[#E7ADB2]" />
                    <span className="text-sm">{job.experience}</span>
                  </div>
                </div>
              </div>

              {/* Salary Range */}
              {job.salary_range && (
                <div className="mb-8 p-4 bg-[#A20F0F]/20 rounded-lg border border-[#A20F0F]/30">
                  <h3 className="font-semibold text-[#E7ADB2] mb-2 flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Salary Range
                  </h3>
                  <p className="text-[#FDF5D9]">{job.salary_range}</p>
                </div>
              )}

              {/* Job Description */}
              <div className="mb-8">
                <h3 className="font-semibold text-[#E7ADB2] mb-4 text-xl">
                  Job Description
                </h3>
                <div
                  className="text-[#FDF5D9]/90 prose prose-invert prose-sm max-w-none leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: job.description.replace(/\n/g, "<br>"),
                  }}
                />
              </div>

              {/* Requirements */}
              <div className="mb-8">
                <h3 className="font-semibold text-[#E7ADB2] mb-4 text-xl">
                  Requirements
                </h3>
                <div
                  className="text-[#FDF5D9]/90 prose prose-invert prose-sm max-w-none leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: job.requirements.replace(/\n/g, "<br>"),
                  }}
                />
              </div>

              {/* Benefits */}
              {job.benefits && (
                <div>
                  <h3 className="font-semibold text-[#E7ADB2] mb-4 text-xl">
                    Benefits
                  </h3>
                  <div
                    className="text-[#FDF5D9]/90 prose prose-invert prose-sm max-w-none leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: job.benefits.replace(/\n/g, "<br>"),
                    }}
                  />
                </div>
              )}
            </div>
          </motion.div>

          {/* Application Form - Takes up 1 column */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-[#FDF5D9] border-2 border-[#330505] rounded-2xl p-6 lg:p-8 sticky top-8">
              <h2 className="text-2xl font-bold mb-6 text-[#330505] text-center">
                Apply for this position
              </h2>
              <JobApplicationForm jobId={job.id} jobTitle={job.title} />
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}
