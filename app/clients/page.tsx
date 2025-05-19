import ClientsHero from "@/components/clients/clients-hero";
import ContactSection from "@/components/common/contact-section";
import LogosMarquee from "@/components/common/logos-marquee";

const ClientsPage = () => {
  return (
    <div>
      <ClientsHero />
      <LogosMarquee />
      <ContactSection />
    </div>
  );
};

export default ClientsPage;
