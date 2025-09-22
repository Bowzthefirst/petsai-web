import { Container } from "@/components/container";
import { Hero } from "@/components/hero";
import { Background } from "@/components/background";
import { Features } from "@/components/features";
import { Companies } from "@/components/companies";
import { GridFeatures } from "@/components/grid-features";
import { Testimonials } from "@/components/testimonials";
import { CTA } from "@/components/cta";
import { PetGrid } from "@/components/pet-grid";
import { PetBentoGrid } from "@/components/pet-bento-grid";

export default function Home() {
  return (
    <div className="relative">
      <div className="absolute inset-0 h-full w-full overflow-hidden ">
        <Background />
      </div>
      <Container className="flex flex-col items-center">
        <Hero />
      </Container>
      <PetBentoGrid />
      <PetGrid />
      {/* <div className="relative">
        <div className="absolute inset-0 h-full w-full overflow-hidden">
          <Background />
        </div>
        <PetBentoGrid />
      </div>
      <div className="relative">
        <div className="absolute inset-0 h-full w-full overflow-hidden">
          <Background />
        </div>
        <Container>
          <PetGrid />
        </Container>
      </div> */}
      <div className="relative">
        <div className="absolute inset-0 h-full w-full overflow-hidden">
          <Background />
        </div>
        <CTA />
      </div>
    </div>
  );
}
