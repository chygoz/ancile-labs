"use client";

import { MapPin, Clock } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useState, useRef, useMemo } from "react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnimatedSplitContent } from "@/components/common/animated-split-content";
import Link from "next/link";

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  is_active: boolean;
  created_at: string;
}

interface JobsListProps {
  jobs: Job[];
}

// Hardcoded filter options - industry standard approach
const FILTER_OPTIONS = {
  jobTypes: [
    { value: "full-time", label: "Full-time" },
    { value: "part-time", label: "Part-time" },
    { value: "contract", label: "Contract" },
    { value: "internship", label: "Internship" },
    { value: "freelance", label: "Freelance" },
    { value: "remote", label: "Remote" },
  ],
  departments: [
    { value: "engineering", label: "Engineering" },
    { value: "design", label: "Design" },
    { value: "product", label: "Product" },
    { value: "marketing", label: "Marketing" },
    { value: "sales", label: "Sales" },
    { value: "operations", label: "Operations" },
    { value: "finance", label: "Finance" },
    { value: "hr", label: "Human Resources" },
  ],
  locations: [
    { value: "remote", label: "Remote" },
    { value: "hybrid", label: "Hybrid" },
    { value: "new-york", label: "New York, NY" },
    { value: "san-francisco", label: "San Francisco, CA" },
    { value: "london", label: "London, UK" },
    { value: "toronto", label: "Toronto, CA" },
  ],
};

const JobsList = ({ jobs }: JobsListProps) => {
  const [location, setLocation] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [jobType, setJobType] = useState<string>("");
  const [hasSearched, setHasSearched] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Get available options from data (for showing counts or disabling unavailable options)
  const availableOptions = useMemo(() => {
    const locations = new Set(
      jobs.map((job) => job.location.toLowerCase().replace(/\s+/g, "-"))
    );
    const departments = new Set(
      jobs.map((job) => job.department.toLowerCase())
    );
    const jobTypes = new Set(
      jobs.map((job) => job.type.toLowerCase().replace(/\s+/g, "-"))
    );

    return { locations, departments, jobTypes };
  }, [jobs]);

  // Filter jobs with normalized comparison
  const filteredJobs = useMemo(() => {
    if (!hasSearched) return jobs;

    return jobs.filter((job) => {
      const normalizeString = (str: string) =>
        str.toLowerCase().replace(/\s+/g, "-");

      const matchesLocation =
        !location || normalizeString(job.location) === location;
      const matchesDepartment =
        !department || normalizeString(job.department) === department;
      const matchesJobType = !jobType || normalizeString(job.type) === jobType;

      return (
        matchesLocation && matchesDepartment && matchesJobType && job.is_active
      );
    });
  }, [jobs, location, department, jobType, hasSearched]);

  // Animation variants
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

  const handleSearch = () => {
    setHasSearched(true);
  };

  const handleClearFilters = () => {
    setLocation("");
    setDepartment("");
    setJobType("");
    setHasSearched(false);
  };

  // Helper function to get job count for each filter option
  const getJobCount = (
    filterType: "locations" | "departments" | "jobTypes",
    value: string
  ) => {
    const normalizeString = (str: string) =>
      str.toLowerCase().replace(/\s+/g, "-");

    return jobs.filter((job) => {
      switch (filterType) {
        case "locations":
          return normalizeString(job.location) === value && job.is_active;
        case "departments":
          return normalizeString(job.department) === value && job.is_active;
        case "jobTypes":
          return normalizeString(job.type) === value && job.is_active;
        default:
          return false;
      }
    }).length;
  };

  return (
    <div className="pt-10 lg:pt-20 max-w-7xl mx-auto px-4">
      {/* Header Section */}
      <AnimatedSplitContent
        primaryHeading="Current"
        secondaryHeading="Opportunities"
        description="We're always looking for talented individuals who share our passion for solving complex problems and delivering exceptional results. Join us in building the future of technology consulting."
        className="text-[#330505] md:flex-col md:gap-4 mb-16"
        textClassName="text-[#8A846F]"
        headingClassName="md:w-2/3"
      />

      {/* Job Search Filters */}
      <section
        ref={sectionRef}
        className="w-full mb-12 flex flex-col items-center justify-center"
      >
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="w-full"
        >
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 w-full"
          >
            {/* Location Filter */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="border-[#330505] text-[#330505] lg:px-8 uppercase rounded-full lg:!h-16 w-full [&_svg:not([class*='text-'])]:text-[#330505]">
                  <SelectValue placeholder="LOCATION" />
                </SelectTrigger>
                <SelectContent className="bg-[#FDF5D9]">
                  {FILTER_OPTIONS.locations.map((loc) => {
                    const count = getJobCount("locations", loc.value);
                    return (
                      <SelectItem
                        key={loc.value}
                        value={loc.value}
                        disabled={count === 0}
                        className="flex justify-between"
                      >
                        <span>{loc.label}</span>
                        <span className="text-xs text-gray-500 ml-2">
                          ({count})
                        </span>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </motion.div>

            {/* Department Filter */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger className="border-[#330505] text-[#330505] lg:px-8 uppercase rounded-full lg:!h-16 w-full [&_svg:not([class*='text-'])]:text-[#330505]">
                  <SelectValue placeholder="DEPARTMENT" />
                </SelectTrigger>
                <SelectContent className="bg-[#FDF5D9]">
                  {FILTER_OPTIONS.departments.map((dept) => {
                    const count = getJobCount("departments", dept.value);
                    return (
                      <SelectItem
                        key={dept.value}
                        value={dept.value}
                        disabled={count === 0}
                        className="flex justify-between"
                      >
                        <span>{dept.label}</span>
                        <span className="text-xs text-gray-500 ml-2">
                          ({count})
                        </span>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </motion.div>

            {/* Job Type Filter */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Select value={jobType} onValueChange={setJobType}>
                <SelectTrigger className="border-[#330505] text-[#330505] lg:px-8 uppercase rounded-full lg:!h-16 w-full [&_svg:not([class*='text-'])]:text-[#330505]">
                  <SelectValue placeholder="JOB TYPE" />
                </SelectTrigger>
                <SelectContent className="bg-[#FDF5D9]">
                  {FILTER_OPTIONS.jobTypes.map((type) => {
                    const count = getJobCount("jobTypes", type.value);
                    return (
                      <SelectItem
                        key={type.value}
                        value={type.value}
                        disabled={count === 0}
                        className="flex justify-between"
                      >
                        <span>{type.label}</span>
                        <span className="text-xs text-gray-500 ml-2">
                          ({count})
                        </span>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </motion.div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex w-full justify-end gap-4"
          >
            {hasSearched && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  onClick={handleClearFilters}
                  variant="outline"
                  className="border-[#330505] text-[#330505] rounded-full px-8 hover:bg-[#330505] hover:text-[#FDF5D9] bg-transparent"
                >
                  Clear Filters
                </Button>
              </motion.div>
            )}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                onClick={handleSearch}
                className="bg-[#330505] text-[#FDF5D9] rounded-full px-8 hover:bg-[#A20F0F]"
              >
                Search Jobs
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Job Results */}
      {hasSearched && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <p className="text-[#8A846F] text-sm">
            {filteredJobs.length === 0
              ? "No jobs found matching your criteria"
              : `Found ${filteredJobs.length} job${
                  filteredJobs.length === 1 ? "" : "s"
                } matching your criteria`}
          </p>
        </motion.div>
      )}

      {/* Jobs Display */}
      {(hasSearched ? filteredJobs : jobs) &&
      (hasSearched ? filteredJobs : jobs).length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid gap-6 lg:gap-8"
        >
          {(hasSearched ? filteredJobs : jobs).map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#330505] rounded-2xl p-6 lg:p-8 shadow-sm border border-[#A20F0F]/20 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="inline-block rounded-full bg-[#A20F0F] px-3 py-1 text-xs font-medium text-white">
                      {job.department}
                    </span>
                    <span className="text-sm text-[#FDF5D9]/80">
                      Posted {new Date(job.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-[#FDF5D9] mb-2">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-[#FDF5D9]/80 mb-4">
                    <div className="flex items-center capitalize gap-1">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center capitalize gap-1">
                      <Clock className="h-4 w-4" />
                      {job.type}
                    </div>
                    <div className="flex items-center capitalize gap-1">
                      <span className="font-medium text-[#FDF5D9]/80">
                        Experience:
                      </span>
                      {job.experience}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 lg:flex-col lg:w-48">
                  <Link href={`/careers/${job.id}`} passHref>
                    <Button
                      variant="outline"
                      className="border-[#FDF5D9] text-[#FDF5D9] hover:bg-[#FDF5D9] hover:text-[#330505] bg-transparent w-full"
                    >
                      View Details
                    </Button>
                  </Link>
                  <Link href={`/careers/${job.id}`} passHref>
                    <Button className="bg-[#A20F0F] hover:bg-[#E7ADB2] hover:text-[#330505] text-white w-full">
                      Apply Now
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center py-16"
        >
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-[#E7ADB2] rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-8 w-8 text-[#330505]" />
            </div>
            <h3 className="text-xl font-bold text-[#330505] mb-2">
              {hasSearched ? "No Jobs Found" : "No Current Openings"}
            </h3>
            <p className="text-[#8A846F] mb-6">
              {hasSearched
                ? "We don't have any openings matching your criteria at the moment. Try adjusting your filters or check back later."
                : "We don't have any open positions right now, but we're always interested in connecting with talented professionals. Send us your resume and we'll keep you in mind for future opportunities."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {hasSearched && (
                <Button
                  onClick={handleClearFilters}
                  variant="outline"
                  className="border-[#A20F0F] text-[#A20F0F] hover:bg-[#A20F0F] hover:text-white bg-transparent"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default JobsList;
