import Hero from "@/components/home/hero";
import TeamShowcase from "@/components/home/team-showcase";
import LogosMarquee from "@/components/common/logos-marquee";
import TalentSection from "@/components/home/talent-section";
import ServicesSection from "@/components/home/services-section";
import ContactSection from "@/components/common/contact-section";
import TestimonialCarousel from "@/components/home/testimonial-carousel";
import SoftwareDevelopmentSection from "@/components/home/software-development-section";

export default function Home() {
  return (
    <div>
      <Hero />
      <TalentSection />
      <div className="py-10 bg-[#FDF5D9]">
        <LogosMarquee />
      </div>
      <SoftwareDevelopmentSection />
      <TestimonialCarousel />
      <TeamShowcase />
      <ServicesSection />
      <ContactSection />
    </div>
  );
}
