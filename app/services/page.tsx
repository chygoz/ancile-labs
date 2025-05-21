import ContactSection from "@/components/common/contact-section";
import LogosMarquee from "@/components/common/logos-marquee";
import ServicesHero from "@/components/services/services-hero";

const ServicesPage = () => {
  return (
    <div>
      <ServicesHero />
      <LogosMarquee />
      <ContactSection />
    </div>
  );
};

export default ServicesPage;
