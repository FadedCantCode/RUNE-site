import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { CorrelationExample } from "@/components/CorrelationExample";
import { Status } from "@/components/Status";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-[100dvh]">
      <Nav />
      <Hero />
      <HowItWorks />
      <CorrelationExample />
      <Status />
      <Footer />
    </main>
  );
}
