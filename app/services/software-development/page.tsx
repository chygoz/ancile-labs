import { AnimatedSplitContent } from "@/components/common/animated-split-content";
import FeaturesGrid from "@/components/common/features-grid";
import LogosMarquee from "@/components/common/logos-marquee";
import Container from "@/components/container";
import ProcessSection from "@/components/process-section";
import ServiceDetailsSection from "@/components/service-details-section";
import SoftwareDevelopmentHero from "@/components/software-development/software-development-hero";

const features = [
  { text: "Modern frameworks" },
  { text: "Responsive design" },
  { text: "Scalable architecture" },
  { text: "Performance optimized" },
  { text: "Security focused" },
  { text: "SEO friendly" },
  { text: "Ongoing maintenance" },
  { text: "User-centric approach" },
];

const SoftwareDevelopmentPage = () => {
  return (
    <div>
      <SoftwareDevelopmentHero />
      <ServiceDetailsSection
        image="/software-development.webp"
        title="Build Custom Software Solutions That Drive Results"
        description="From idea to execution, we engineer software tailored to your business goals. Whether it's web, mobile, or backend systems, our development team delivers scalable, intuitive, and high-performance solutions."
        services={[
          {
            title: "Custom Software Development",
            description:
              "End-to-end development of desktop, mobile, and web applications using modern technologies and best practices.",
            backgroundColor: "#A20F0F",
          },
          {
            title: "E-commerce Platforms",
            description:
              "Build secure and scalable online storefronts with full integration of payments, inventory, and customer management.",
            backgroundColor: "#330505",
          },
          {
            title: "API & System Integration",
            description:
              "Develop robust APIs and connect disparate systems to ensure seamless communication and data flow.",
            backgroundColor: "#E7ADB2",
          },
        ]}
      />

      <div className="pb-10 lg:pb-20 bg-[#FDF5D9]">
        <Container>
          <AnimatedSplitContent
            primaryHeading="Why choose us for"
            secondaryHeading="web development?"
            description="We don't just write code—we craft digital experiences. Our development process emphasizes clean, maintainable code, user experience, and scalable architecture. Every project is built with your long-term success in mind, ensuring your application can grow with your business."
            className="text-[#330505] md:flex-col md:gap-4"
            textClassName="text-[#8A846F]"
            headingClassName="md:w-2/3"
          />
        </Container>
      </div>
      <FeaturesGrid features={features} backgroundColor="#FDF5D9" columns={4} />

      <div className="pt-10 lg:pt-20 bg-[#FDF5D9]">
        <ProcessSection
          title="Our Development Process"
          steps={[
            {
              number: "01",
              title: "Discovery & Planning",
              description:
                "Understand your requirements, define project scope, and create detailed technical specifications.",
            },
            {
              number: "02",
              title: "Design & Prototyping",
              description:
                "Create wireframes and prototypes to visualize the user experience and gather feedback.",
            },
            {
              number: "03",
              title: "Development & Testing",
              description:
                "Build your application using agile methodologies with continuous testing and quality assurance.",
            },
            {
              number: "04",
              title: "Deployment & Support",
              description:
                "Launch your application and provide ongoing maintenance and support to ensure optimal performance.",
            },
          ]}
        />
      </div>
      <div className="pt-10 lg:pt-20 bg-[#FDF5D9]">
        <LogosMarquee />
      </div>
    </div>
  );
};

export default SoftwareDevelopmentPage;
