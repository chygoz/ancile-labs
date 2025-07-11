"use client";

import { useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import Tej from "@/public/tej-kumar.jpeg";
import Chygoz from "@/public/chygoz.webp";
import Venkata from "@/public/venkata.jpeg";
import Container from "@/components/container";
import { AnimatedHeading } from "@/components/common/animated-heading";
import { Button } from "@/components/ui/button";
import { MessageSquareText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface TeamMember {
  id: number;
  name: string;
  position: string;
  company: string;
  image: string | StaticImageData;
  des: string;
}

// Sample team members data - replace with your actual data
const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Tej Kovelamudi",
    position: "Founder and President",
    company: "Ancile Canada Inc",
    image: Tej,
    des: "Tej Kovelamudi is the Founder and President of Ancile Canada Inc., an IT staffing and development firm. Over the past decade, he has helped grow the company from a two-person startup into a team of fifty, matching IT professionals with employers across Canada and building a practical, client-focused approach to workforce solutions. Ancile Canada has seen consistent revenue growth during its tenure and has placed more than 350 IT specialists in permanent and contract roles, strengthening its reputation for reliable, high-quality placements. The firm also serves as an implementing partner for ClickQA and Excellent IT Soft, delivering end-to-end quality assurance solutions that help clients maintain high standards in their software projects. Focused on delivering value to clients, Tej oversees Ancile Canada’s strategic direction, ensuring that solutions align with both organizational goals and employee development. He maintains an open-door policy for feedback and collaboration",
  },
  {
    id: 2,
    name: "Venkata Ramana Reddy",
    position: "QA Lead",
    company: "Ancile Canada Inc",
    image: Venkata,
    des: "I am QA Lead with over 7 years of hands-on experience in software quality assurance, automation frameworks, and test strategy and execution. In my recent roles, I have led the design and implementation of robust UI and API automation frameworks using Selenium (Java & Python) and REST Assured, integrated with CI/CD pipelines. I have worked extensively across E-commerce, Fintech and enterprise platforms, collaborating with cross-functional teams to ensure scalable, high-quality releases.As a QA Lead, I focus on both technical excellence and team leadership—mentoring junior testers, driving Agile test processes, streamlining automation efforts, and aligning quality goals with business objectives. My expertise spans across web, API, and performance testing, backed by strong experience in tools like Postman, JIRA, TestRail, and JMeter.",
  },
  {
    id: 3,
    name: "Chigozirim Obike",
    position: "IT Director/Consultant",
    company: "Ancile Canada Inc",
    image: Chygoz,
    des: "A dynamic entrepreneur and technocrat passionate about transforming industries and empowering communities. With a strong background in computer science, I have built a diverse portfolio of ventures that reflect  dedication to excellence, creativity, and impact.",
  },
  // {//   id: 4,//   name: "Sarah McAllister",//   position: "Product Lead",//   company: "BrightLayer Tech",//   image: AncilWoman1,// des: ""// },// {//   id: 5,//   name: "Sarah McAllister",//   position: "Product Lead",//   company: "BrightLayer Tech",//   image: Dude,// des: ""// },// {//   id: 6,//   name: "Sarah McAllister",//   position: "Product Lead",//   company: "BrightLayer Tech",//   image: AncilWoman2,// des: ""// },
];

export default function AncileFaces() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (member: TeamMember) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  return (
    <section className="bg-[#FDF5D9] py-16 md:py-24">
      <Container>
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="space-y-12"
        >
          <div className="mb-12 lg:mb-24">
            <AnimatedHeading primaryText="Meet the faces of Ancile Canada Inc." />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                className="flex flex-col items-center"
              >
                <motion.div className="relative w-[280px] h-[280px] rounded-full overflow-hidden mb-4 shadow-md">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-full"
                  />
                </motion.div>
                <motion.h3
                  className="text-lg font-bold text-[#3A1C1C]"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                >
                  {member.name}
                </motion.h3>
                <motion.p
                  className="text-sm text-[#5A3C3C]"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                >
                  {member.position} at {member.company}
                </motion.p>
                <Button
                  variant="ghost"
                  className="mt-4 text-[#B30000] hover:bg-[#B30000]/10"
                  onClick={() => handleOpenModal(member)}
                >
                  <MessageSquareText className="mr-2 h-4 w-4" />
                  Read Bio
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[525px] bg-[#FDF5D9] text-[#3A1C1C]">
          <DialogHeader>
            <DialogTitle className="text-[#B30000]">
              {selectedMember?.name}
            </DialogTitle>
            <DialogDescription className="text-[#5A3C3C]">
              {selectedMember?.position} at {selectedMember?.company}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] py-4 pr-4">
            <p className="text-sm leading-relaxed">{selectedMember?.des}</p>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </section>
  );
}
