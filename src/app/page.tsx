import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import PainPoints from "@/components/sections/PainPoints";
import Programs from "@/components/sections/Programs";
import Mentors from "@/components/sections/Mentors";
import HowItWorks from "@/components/sections/HowItWorks";
import CheckoutForm from "@/components/sections/CheckoutForm";
import Faq from "@/components/sections/Faq";
import Footer from "@/components/sections/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans overflow-x-hidden selection:bg-pink-200 selection:text-pink-900">
      <Navbar />
      <Hero />
      <PainPoints />
      <Programs />
      <Mentors />
      <HowItWorks />
      <CheckoutForm />
      <Faq />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
