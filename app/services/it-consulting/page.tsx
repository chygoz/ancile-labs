import { AnimatedSplitContent } from "@/components/common/animated-split-content";
import ContactSection from "@/components/common/contact-section";
import FeaturesGrid from "@/components/common/features-grid";
import LogosMarquee from "@/components/common/logos-marquee";
import Container from "@/components/container";
import ITConsultingHero from "@/components/it-consulting/it-consulting-hero";
import ProcessSection from "@/components/process-section";
import ServiceDetailsSection from "@/components/service-details-section";

const features = [
  { text: "Strategic IT planning" },
  { text: "Digital transformation" },
  { text: "Technology assessment" },
  { text: "System optimization" },
  { text: "Security consulting" },
  { text: "Cloud migration" },
  { text: "Training programs" },
  { text: "Ongoing support" },
];

const ITConsultingPage = () => {
  return (
    <div>
      <ITConsultingHero />
      <ServiceDetailsSection
        image="/it-consulting.webp"
        title="Transform Your Business with Expert IT Consulting"
        description="Our IT consulting services help businesses navigate complex technology decisions, optimize their systems, and build scalable solutions that drive growth. From strategic planning to hands-on implementation, we're your trusted technology partner."
        services={[
          {
            title: "Strategic IT Planning",
            description:
              "Develop comprehensive technology roadmaps aligned with your business objectives and growth plans.",
            backgroundColor: "#A20F0F",
          },
          {
            title: "Digital Transformation",
            description:
              "Modernize your operations with cutting-edge technologies and streamlined digital processes.",
            backgroundColor: "#330505",
          },
          {
            title: "Corporate Training",
            description:
              "Upskill your team with customized training programs on the latest technologies and best practices.",
            backgroundColor: "#E7ADB2",
          },
        ]}
      />
      <div className="pb-10 lg:pb-20 bg-[#FDF5D9]">
        <Container>
          <AnimatedSplitContent
            primaryHeading="Why choose our"
            secondaryHeading="IT consulting services?"
            description="With years of experience helping businesses across Canada optimize their technology infrastructure, we bring deep expertise, proven methodologies, and a commitment to your success. Our consultants don't just advise—we partner with you to implement solutions that work."
            className="text-[#330505] md:flex-col md:gap-4"
            textClassName="text-[#8A846F]"
            headingClassName="md:w-2/3"
          />
        </Container>
      </div>
      <FeaturesGrid features={features} backgroundColor="#FDF5D9" columns={4} />
      <div className="pt-10 lg:pt-20 bg-[#FDF5D9]">
        <ProcessSection
          title="Our Consulting Process"
          steps={[
            {
              number: "01",
              title: "Discovery & Assessment",
              description:
                "We analyze your current technology landscape and identify opportunities for improvement.",
            },
            {
              number: "02",
              title: "Strategy Development",
              description:
                "Create a customized roadmap that aligns technology initiatives with your business goals.",
            },
            {
              number: "03",
              title: "Implementation Support",
              description:
                "Guide you through the execution phase with hands-on support and expert guidance.",
            },
            {
              number: "04",
              title: "Training & Optimization",
              description:
                "Ensure your team is equipped with the knowledge and tools to maximize your technology investment.",
            },
          ]}
        />
      </div>
      <div className="pt-10 lg:pt-20 bg-[#FDF5D9]">
        <LogosMarquee />
      </div>
      <ContactSection />
    </div>
  );
};

export default ITConsultingPage;
