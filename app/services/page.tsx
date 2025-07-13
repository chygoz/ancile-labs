import { AnimatedSplitContent } from "@/components/common/animated-split-content";
import FeaturesGrid from "@/components/common/features-grid";
import LogosMarquee from "@/components/common/logos-marquee";
import Container from "@/components/container";
import Approval from "@/components/services/approval";
import ExpertiseShowcase from "@/components/services/expertise-showcase";
import ServicesHero from "@/components/services/services-hero";

const features = [
  { text: "Professional & courteous" },
  { text: "Highly skilled talent" },
  { text: "Timely delivery" },
  { text: "Detailed briefing" },
  { text: "Great post project support" },
  { text: "Modern & creative" },
  { text: "Extremely passsionate" },
  { text: "Quality development" },
];

const ServicesPage = () => {
  return (
    <div>
      <ServicesHero />
      <ExpertiseShowcase />
      <div className="pb-10 lg:pb-20 bg-[#FDF5D9]">
        <Container>
          <AnimatedSplitContent
            primaryHeading="Why clients choose us"
            secondaryHeading="for their projects?"
            description="At Ancile Canada Inc., we offer a powerful mix of IT consulting, talent solutions, and web application development — designed to help you scale smarter, build faster, and operate with confidence. Whether you're launching a product, expanding your team, or rethinking your tech strategy, we’ve got you covered."
            className="text-[#330505] md:flex-col md:gap-4"
            textClassName="text-[#8A846F]"
            headingClassName="md:w-2/3"
          />
        </Container>
      </div>
      <FeaturesGrid features={features} backgroundColor="#FDF5D9" columns={4} />
      <Approval />
      <div className="pt-10 lg:pt-20 bg-[#FDF5D9]">
        <LogosMarquee />
      </div>
    </div>
  );
};

export default ServicesPage;
