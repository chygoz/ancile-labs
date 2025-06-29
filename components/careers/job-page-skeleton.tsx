"use client";

import { motion } from "framer-motion";
import Container from "@/components/container";

export default function JobPageSkeleton() {
  const SkeletonShimmer = ({ className }: { className?: string }) => (
    <div className={`relative overflow-hidden bg-gray-200 ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
        animate={{ x: ["-100%", "100%"] }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 1.5,
          ease: "linear",
        }}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDF5D9]">
      <Container className="py-12">
        {/* Back Button Skeleton */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <SkeletonShimmer className="h-6 w-32 rounded" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Job Details Skeleton */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="bg-[#330505]/10 rounded-2xl p-8">
              {/* Header Skeleton */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <SkeletonShimmer className="h-6 w-20 rounded-full" />
                  <SkeletonShimmer className="h-4 w-24 rounded" />
                </div>
                <SkeletonShimmer className="h-10 w-3/4 mb-6 rounded" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <SkeletonShimmer key={i} className="h-6 w-full rounded" />
                  ))}
                </div>
              </div>

              {/* Salary Range Skeleton */}
              <div className="mb-8 p-4 bg-gray-100 rounded-lg">
                <SkeletonShimmer className="h-5 w-32 mb-2 rounded" />
                <SkeletonShimmer className="h-4 w-48 rounded" />
              </div>

              {/* Content Sections Skeleton */}
              <div className="space-y-8">
                {[1, 2, 3].map((section) => (
                  <div key={section}>
                    <SkeletonShimmer className="h-6 w-48 mb-4 rounded" />
                    <div className="space-y-2">
                      <SkeletonShimmer className="h-4 w-full rounded" />
                      <SkeletonShimmer className="h-4 w-5/6 rounded" />
                      <SkeletonShimmer className="h-4 w-4/5 rounded" />
                      <SkeletonShimmer className="h-4 w-3/4 rounded" />
                      <SkeletonShimmer className="h-4 w-5/6 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Application Form Skeleton */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-[#FDF5D9] border-2 border-[#330505]/20 rounded-2xl p-6 lg:p-8">
              <SkeletonShimmer className="h-8 w-3/4 mb-6 mx-auto rounded" />
              <div className="space-y-4">
                {/* Form Fields Skeleton */}
                {[1, 2, 3, 4, 5, 6].map((field) => (
                  <div key={field}>
                    <SkeletonShimmer className="h-4 w-24 mb-2 rounded" />
                    <SkeletonShimmer className="h-10 w-full rounded" />
                  </div>
                ))}
                {/* File Upload Skeleton */}
                <div>
                  <SkeletonShimmer className="h-4 w-20 mb-2 rounded" />
                  <SkeletonShimmer className="h-12 w-full rounded-lg" />
                </div>
                {/* Textarea Skeleton */}
                <div>
                  <SkeletonShimmer className="h-4 w-28 mb-2 rounded" />
                  <SkeletonShimmer className="h-24 w-full rounded" />
                </div>
                {/* Turnstile Skeleton */}
                <div className="flex justify-center pt-4">
                  <SkeletonShimmer className="h-16 w-64 rounded" />
                </div>
                {/* Submit Button Skeleton */}
                <SkeletonShimmer className="h-12 w-full rounded-full mt-6" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Loading indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-8"
        >
          <div className="flex items-center justify-center gap-2 text-[#8A846F]">
            <motion.div
              className="w-2 h-2 bg-[#A20F0F] rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: 0,
              }}
            />
            <motion.div
              className="w-2 h-2 bg-[#A20F0F] rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: 0.2,
              }}
            />
            <motion.div
              className="w-2 h-2 bg-[#A20F0F] rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: 0.4,
              }}
            />
            <span className="ml-2 text-sm">Loading job details...</span>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
