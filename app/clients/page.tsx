import ClientsHero from "@/components/clients/clients-hero";
import { AnimatedSplitContent } from "@/components/common/animated-split-content";
import ContactSection from "@/components/common/contact-section";
import LogosMarquee from "@/components/common/logos-marquee";
import Container from "@/components/container";
import TestimonialCarousel from "@/components/home/testimonial-carousel";

const ClientsPage = () => {
  return (
    <div>
      <ClientsHero />
      <div className="py-10 lg:py-20 bg-[#FDF5D9]">
        <LogosMarquee animated={false} />
      </div>
      <div className="pb-10 lg:pb-20 bg-[#FDF5D9]">
        <Container>
          <AnimatedSplitContent
            primaryHeading="We're proud to work with Canada's finest"
            secondaryHeading="businesses"
            description="Across industries and across Canada, we’ve partnered with forward-thinking businesses to provide tailored IT consulting, top-tier tech talent, and reliable digital solutions — helping them grow, adapt, and lead in their space."
            className="text-[#330505] !flex-col !lg:flex-row"
            textClassName="text-[#8A846F]"
          />
        </Container>
      </div>
      <TestimonialCarousel />
      <ContactSection />
    </div>
  );
};

export default ClientsPage;
