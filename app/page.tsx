import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import TwoWaysSection from "@/components/TwoWaysSection";
import Products from "@/components/Products";
import FactoryTour from "@/components/FactoryTour";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import SchemaOrg from "@/components/SchemaOrg";

export default function Home() {
  return (
    <main>
      <SchemaOrg type="home" />
      <Hero />
      <Stats />
      <About />
      <TwoWaysSection />
      <Products />
      <FactoryTour />
      <Testimonials />
      <CTASection />
      <FAQ />
      <Footer />
    </main>
  );
}
