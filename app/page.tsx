import ContactSection from "@/components/common/contact-section";
import LogosMarquee from "@/components/common/logos-marquee";
import Hero from "@/components/home/hero";

export default function Home() {
  return (
    <div>
      <Hero />
      <LogosMarquee />
      <ContactSection />
    </div>
  );
}
