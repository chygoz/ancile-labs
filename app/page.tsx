import ContactSection from "@/components/common/contact-section";
import LogosMarquee from "@/components/common/logos-marquee";
import Hero from "@/components/home/hero";
import ServicesSection from "@/components/home/services-section";
import SoftwareDevelopmentSection from "@/components/home/software-development-section";
import TalentSection from "@/components/home/talent-section";
import TeamShowcase from "@/components/home/team-showcase";
import TestimonialCarousel from "@/components/home/testimonial-carousel";

export default function Home() {
  return (
    <div>
      <Hero />
      <TalentSection />
      <LogosMarquee />
      <SoftwareDevelopmentSection />
      <TestimonialCarousel />
      <TeamShowcase />
      <ServicesSection />
      <ContactSection />
    </div>
  );
}
