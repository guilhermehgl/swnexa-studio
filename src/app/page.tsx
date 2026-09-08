import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Showreel, Services, Projects } from "@/components/sections/work";
import { Beyond, Process, Budget, FAQ } from "@/components/sections/approach";
import { Contact } from "@/components/sections/contact";
import { Reveal } from "@/components/ui/reveal";
export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <Showreel />
        <Reveal>
          <Services />
        </Reveal>
        <Reveal>
          <Projects />
        </Reveal>
        <Beyond />
        <Reveal>
          <Process />
        </Reveal>
        <Budget />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
