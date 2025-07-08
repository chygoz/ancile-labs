"use client";

import { motion } from "framer-motion";

const JobsListSkeleton = () => {
  // Animation variants for shimmer effect
  const shimmerVariants = {
    initial: { x: "-100%" },
    animate: {
      x: "100%",
      transition: {
        repeat: Number.POSITIVE_INFINITY,
        duration: 1.5,
        ease: "linear",
      },
    },
  };

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
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Skeleton shimmer component
  const SkeletonShimmer = ({ className }: { className?: string }) => (
    <div className={`relative overflow-hidden bg-gray-200 ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
        variants={shimmerVariants}
        initial="initial"
        animate="animate"
      />
    </div>
  );

  return (
    <div className="pt-10 lg:pt-20 max-w-7xl mx-auto px-4">
      {/* Header Section Skeleton */}
      <div className="mb-16">
        <div className="text-center md:text-left">
          <SkeletonShimmer className="h-12 md:h-16 w-3/4 mx-auto md:mx-0 mb-4 rounded-lg" />
          <SkeletonShimmer className="h-6 w-full max-w-2xl mx-auto md:mx-0 mb-2 rounded" />
          <SkeletonShimmer className="h-6 w-4/5 max-w-xl mx-auto md:mx-0 rounded" />
        </div>
      </div>

      {/* Filters Section Skeleton */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full mb-12 flex flex-col items-center justify-center"
      >
        <motion.div variants={itemVariants} className="w-full">
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 w-full"
          >
            {/* Filter Skeletons */}
            {[1, 2, 3].map((index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative"
              >
                <SkeletonShimmer className="h-12 lg:h-16 w-full rounded-full border border-[#330505]/20" />
              </motion.div>
            ))}
          </motion.div>

          {/* Buttons Skeleton */}
          <motion.div
            variants={itemVariants}
            className="flex w-full justify-end gap-4"
          >
            <SkeletonShimmer className="h-10 w-32 rounded-full" />
            <SkeletonShimmer className="h-10 w-28 rounded-full bg-[#330505]/10" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Jobs List Skeleton */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid gap-6 lg:gap-8"
      >
        {/* Generate 3-5 job card skeletons */}
        {[1, 2, 3, 4].map((index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-[#330505]/5 rounded-2xl p-6 lg:p-8 shadow-sm border border-[#A20F0F]/10"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
              <div className="flex-1">
                {/* Tags and Date Skeleton */}
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <SkeletonShimmer className="h-6 w-20 rounded-full bg-[#A20F0F]/10" />
                  <SkeletonShimmer className="h-4 w-24 rounded bg-[#8A846F]/10" />
                </div>

                {/* Job Title Skeleton */}
                <SkeletonShimmer className="h-8 lg:h-10 w-3/4 mb-2 rounded bg-[#330505]/10" />

                {/* Job Details Skeleton */}
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <SkeletonShimmer className="h-4 w-4 rounded bg-[#8A846F]/10" />
                    <SkeletonShimmer className="h-4 w-16 rounded bg-[#8A846F]/10" />
                  </div>
                  <div className="flex items-center gap-1">
                    <SkeletonShimmer className="h-4 w-4 rounded bg-[#8A846F]/10" />
                    <SkeletonShimmer className="h-4 w-20 rounded bg-[#8A846F]/10" />
                  </div>
                  <div className="flex items-center gap-1">
                    <SkeletonShimmer className="h-4 w-16 rounded bg-[#8A846F]/10" />
                    <SkeletonShimmer className="h-4 w-12 rounded bg-[#8A846F]/10" />
                  </div>
                </div>
              </div>

              {/* Action Buttons Skeleton */}
              <div className="flex flex-col sm:flex-row gap-3 lg:flex-col lg:w-48">
                <SkeletonShimmer className="h-10 w-full rounded border border-[#330505]/20 bg-[#330505]/5" />
                <SkeletonShimmer className="h-10 w-full rounded bg-[#A20F0F]/10" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

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
          <span className="ml-2 text-sm">Loading opportunities...</span>
        </div>
      </motion.div>
    </div>
  );
};

export default JobsListSkeleton;
