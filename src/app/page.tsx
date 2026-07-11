import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { RoastExamples } from "@/components/landing/roast-examples";
import { Footer } from "@/components/landing/footer";
import { ParticleBg } from "@/components/shared/particle-bg";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <ParticleBg />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Features />
        <RoastExamples />
        <Footer />
      </div>
    </main>
  );
}
