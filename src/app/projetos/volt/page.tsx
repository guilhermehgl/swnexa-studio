import type { Metadata } from "next";
import Link from "next/link";
import { ConceptReturn } from "@/components/concepts/concept-return";
import { VoltHeader } from "@/components/concepts/volt/volt-header";
import { VoltGraphic } from "@/components/concepts/volt/volt-graphic";
import {
  VoltMotion,
  VoltReveal,
  VoltScrollWord,
} from "@/components/concepts/volt/volt-motion";
import { VoltLineup } from "@/components/concepts/volt/volt-lineup";
import { VoltSchedule } from "@/components/concepts/volt/volt-schedule";
import { VoltInteractive } from "@/components/concepts/volt/volt-interactive";
import { VoltTickets } from "@/components/concepts/volt/volt-tickets";
import { voltExperiences } from "@/data/volt";
import styles from "@/components/concepts/volt/volt.module.css";

export const metadata: Metadata = {
  title: "VOLT | Música, arte e movimento — experiência conceitual",
  description:
    "Um festival imaginado em três noites. Direção de arte, cultura e movimento em uma experiência conceitual da SWNexa Studio.",
};

function VoltHero() {
  return (
    <section id="inicio" className={styles.hero} aria-labelledby="volt-title">
      <VoltHeader />
      <div className={styles.heroMeta}>
        <span>FESTIVAL DE MÚSICA & CULTURA</span>
        <span>18—20 SET / SÃO PAULO / 2027</span>
      </div>
      <div className={styles.heroPoster}>
        <h1 id="volt-title">VOLT</h1>
        <VoltGraphic kind="star" className={styles.heroStar} />
        <span className={styles.edition}>27</span>
      </div>
      <div className={styles.heroTag}>
        <span>MÚSICA · ARTE · MOVIMENTO</span>
        <span>SEM SILÊNCIO ENTRE NÓS. ↙</span>
      </div>
      <div className={styles.heroBottom}>
        <h2>
          A cidade
          <br />
          <span>aumenta o volume.</span>
        </h2>
        <div>
          <p>
            Três noites de música, encontros e experiências feitas para
            acontecer ao vivo.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.primary} href="#programacao">
              VER PROGRAMAÇÃO <span aria-hidden="true">↗</span>
            </a>
            <a className={styles.textLink} href="#manifesto">
              EXPLORAR O VOLT ↓
            </a>
          </div>
        </div>
      </div>
      <div className={styles.heroStats}>
        {[
          ["03", "NOITES"],
          ["24", "ARTISTAS"],
          ["01", "CIDADE"],
        ].map(([number, label]) => (
          <span key={label}>
            <strong>{number}</strong>
            {label}
          </span>
        ))}
        <span className={styles.heroCoordinates}>
          23°33′ S / 46°38′ O<br />O PONTO DE ENCONTRO É A CIDADE.
        </span>
      </div>
    </section>
  );
}
function VoltMarquee() {
  const text = "VOLT 2027 — MÚSICA — ARTE — CIDADE — 18/19/20 SET — ";
  return (
    <div className={styles.marquee}>
      <span className={styles.srOnly}>{text}</span>
      <div className={styles.marqueeTrack} aria-hidden="true">
        <span>
          {text}
          {text}
        </span>
        <span>
          {text}
          {text}
        </span>
      </div>
    </div>
  );
}
function VoltManifesto() {
  return (
    <section
      id="manifesto"
      className={styles.manifesto}
      aria-labelledby="manifesto-title"
    >
      <div className={styles.sectionTop}>
        <span>01 / NÃO É SÓ SOBRE O PALCO</span>
        <span>O SOM COMEÇA. A CIDADE RESPONDE.</span>
      </div>
      <h2 id="manifesto-title" className={styles.manifestoTitle}>
        <VoltReveal as="span">Algumas noites</VoltReveal>
        <VoltReveal as="span" delay={0.07}>
          não foram feitas
        </VoltReveal>
        <VoltReveal as="span" delay={0.14}>
          para passar
        </VoltReveal>
        <VoltReveal as="span" delay={0.21}>
          <span>despercebidas.</span>
        </VoltReveal>
      </h2>
      <div className={styles.manifestoBottom}>
        <span>
          01 / SOM
          <br />
          02 / ARTE
          <br />
          03 / ENCONTRO
          <br />
          04 / CIDADE
        </span>
        <p>
          O VOLT ocupa a cidade com música, encontros e experiências que começam
          no palco e continuam muito depois dele.
        </p>
      </div>
      <VoltScrollWord />
    </section>
  );
}
function VoltExperiences() {
  return (
    <section
      id="experiencias"
      className={styles.experiences}
      aria-labelledby="experiences-title"
    >
      <div className={styles.sectionTop}>
        <span>05 / ALÉM DO SOM</span>
        <span>O INTERVALO TAMBÉM ACONTECE.</span>
      </div>
      <h2 id="experiences-title" className={styles.display}>
        ENTRE UM PALCO
        <br />E OUTRO,
        <br />
        <span>A CIDADE CONTINUA.</span>
      </h2>
      <div>
        {voltExperiences.map((item, index) => (
          <VoltReveal key={item.number} delay={index * 0.06}>
            <article className={styles.experience}>
              <span className={styles.experienceNumber}>{item.number}</span>
              <div>
                <h3>{item.name}</h3>
                <small>{item.detail}</small>
              </div>
              <p>{item.text}</p>
              <span className={styles.experienceArrow} aria-hidden="true">
                ↗
              </span>
            </article>
          </VoltReveal>
        ))}
      </div>
    </section>
  );
}
function VoltFinalCTA() {
  return (
    <section className={styles.final} aria-labelledby="volt-final-title">
      <span className={styles.eyebrow}>04 / SUA PRÓXIMA EXPERIÊNCIA</span>
      <h2 id="volt-final-title">
        Toda marca pode ser sentida
        <br />
        antes mesmo de ser explicada.
      </h2>
      <div className={styles.finalSignal}>
        <p>
          OCUPAR A CENA<span aria-hidden="true">↗</span>
        </p>
        <span>IDENTIDADE / PRESENÇA / DIREÇÃO CRIATIVA</span>
      </div>
      <div className={styles.finalActions}>
        <p>
          VOLT é apenas uma das direções possíveis. Criamos experiências
          digitais sob medida para transformar identidade, estratégia e
          tecnologia em presença.
        </p>
        <div className={styles.finalLinks}>
          <Link className={styles.primary} href="/#contato">
            Criar uma experiência com a SWNexa <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
      <footer className={styles.footer}>
        <div>
          <span className={styles.brand}>VOLT / 2027</span>
          <p>MÚSICA · ARTE · MOVIMENTO</p>
        </div>
        <div>
          <p>VOLT é uma experiência conceitual criada pela SWNexa Studio.</p>
          <small>Festival, artistas, programação e valores fictícios.</small>
        </div>
        <span>EXPERIÊNCIA 04</span>
      </footer>
    </section>
  );
}
export default function VoltPage() {
  return (
    <VoltMotion>
      <main id="conteudo" lang="pt-BR">
        <ConceptReturn />
        <VoltHero />
        <VoltMarquee />
        <VoltManifesto />
        <VoltLineup />
        <VoltSchedule />
        <VoltInteractive />
        <VoltExperiences />
        <VoltTickets />
        <VoltFinalCTA />
      </main>
    </VoltMotion>
  );
}
