import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/work";
import { Projects } from "@/components/sections/projects";
import { Beyond, Process, Budget, FAQ } from "@/components/sections/approach";
import { Contact } from "@/components/sections/contact";
import { Reveal } from "@/components/ui/reveal";
import styles from "./homepage.module.css";
export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo" className={styles.homepage}>
        <Hero />
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
