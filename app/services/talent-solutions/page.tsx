import { AnimatedSplitContent } from "@/components/common/animated-split-content";
import ContactSection from "@/components/common/contact-section";
import FeaturesGrid from "@/components/common/features-grid";
import LogosMarquee from "@/components/common/logos-marquee";
import Container from "@/components/container";
import ProcessSection from "@/components/process-section";
import ServiceDetailsSection from "@/components/service-details-section";
import TalentSolutionsHero from "@/components/talents-solutions/talent-solutions-hero";

const features = [
  { text: "Skilled developers" },
  { text: "Quick placement" },
  { text: "Cultural fit assessment" },
  { text: "Flexible engagement" },
  { text: "Ongoing support" },
  { text: "Quality assurance" },
  { text: "Competitive rates" },
  { text: "Proven track record" },
];

const TalentSolutionsPage = () => {
  return (
    <div>
      <TalentSolutionsHero />
      <ServiceDetailsSection
        image="/talents-solutions.webp"
        title="Scale Your Team with Top-Tier Tech Talent"
        description="Finding the right talent shouldn't slow down your growth. Our talent solutions connect you with skilled professionals who integrate seamlessly into your team and contribute from day one. Whether you need temporary support or permanent hires, we've got you covered."
        services={[
          {
            title: "Contract Staffing",
            description:
              "Access skilled professionals for project-based work with flexible terms and quick deployment.",
            backgroundColor: "#A20F0F",
          },
          {
            title: "Permanent Placement",
            description:
              "Find long-term team members who align with your company culture and technical requirements.",
            backgroundColor: "#330505",
          },
          {
            title: "Team Augmentation",
            description:
              "Scale your existing team with specialized expertise to accelerate project delivery.",
            backgroundColor: "#E7ADB2",
          },
        ]}
      />
      <div className="pb-10 lg:pb-20 bg-[#FDF5D9]">
        <Container>
          <AnimatedSplitContent
            primaryHeading="Why businesses trust us"
            secondaryHeading="for their talent needs"
            description="We understand that hiring the right people is critical to your success. Our rigorous vetting process, deep industry knowledge, and commitment to finding the perfect fit means you get professionals who don't just meet your technical requirements—they enhance your team."
            className="text-[#330505] md:flex-col md:gap-4"
            textClassName="text-[#8A846F]"
            headingClassName="md:w-2/3"
          />
        </Container>
      </div>
      <FeaturesGrid features={features} backgroundColor="#FDF5D9" columns={4} />
      <div className="pt-10 lg:pt-20 bg-[#FDF5D9]">
        <ProcessSection
          title="Our Talent Acquisition Process"
          steps={[
            {
              number: "01",
              title: "Requirements Analysis",
              description:
                "We dive deep into your project needs, team dynamics, and technical requirements.",
            },
            {
              number: "02",
              title: "Candidate Sourcing",
              description:
                "Leverage our extensive network to identify qualified candidates that match your criteria.",
            },
            {
              number: "03",
              title: "Rigorous Screening",
              description:
                "Comprehensive technical assessments and cultural fit evaluations ensure quality matches.",
            },
            {
              number: "04",
              title: "Seamless Integration",
              description:
                "Support the onboarding process to ensure smooth integration with your existing team.",
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

export default TalentSolutionsPage;
