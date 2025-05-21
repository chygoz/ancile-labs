import Team from "@/components/company/team";
import ContactSection from "@/components/common/contact-section";
import CompanyHero from "@/components/company/company-hero";
import TestimonialCarousel from "@/components/home/testimonial-carousel";
import SimplifyTech from "@/components/company/simplify-tech";
import AncileFaces from "@/components/home/ancile-faces";
import Mission from "@/components/company/mission";

export default function CompanyPage() {
  return (
    <div>
      <CompanyHero />
      <SimplifyTech />
      <Mission />
      <TestimonialCarousel />
      <Team />
      <AncileFaces />
      <ContactSection />
    </div>
  );
}
