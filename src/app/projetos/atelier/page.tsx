import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { ArchitecturalStudy } from "@/components/concepts/atelier/architectural-study";
import { AtelierReveal } from "@/components/concepts/atelier/atelier-motion";
import { ConceptReturn } from "@/components/concepts/concept-return";
import styles from "@/components/concepts/atelier/atelier.module.css";

const title = "ATELIER 01 | Experiência editorial da SWNexa Studio";
const description =
  "Experiência 01 — Editorial Arquitetônico. Uma exploração conceitual da SWNexa Studio sobre direção de arte, tipografia e identidade digital. Marcas, projetos e conteúdos fictícios.";
export const metadata: Metadata = pageMetadata(
  title,
  description,
  "/projetos/atelier",
);

const spaces = [
  {
    name: "Casa N.",
    city: "Lisboa",
    year: "2026",
    material: "Calcário / Carvalho / Luz natural",
    variant: "house",
  },
  {
    name: "Pavilhão 02",
    city: "Copenhague",
    year: "2025",
    material: "Concreto / Paisagem / Ar",
    variant: "pavilion",
  },
  {
    name: "Residência M.",
    city: "São Paulo",
    year: "2026",
    material: "Superfícies minerais / Luz quente",
    variant: "residence",
  },
] as const;

export default function AtelierPage() {
  return (
    <main id="conteudo" className={styles.page} lang="pt-BR">
      <ConceptReturn />
      <section className={styles.hero} aria-labelledby="atelier-title">
        <header className={styles.header}>
          <a
            href="#atelier-top"
            className={styles.brand}
            aria-label="ATELIER 01 — início da experiência conceitual"
          >
            ATELIER <span>01</span>
          </a>
          <nav aria-label="Navegação da experiência">
            <a href="#spaces">Estudos</a>
            <a href="#philosophy">Conceito</a>
            <a href="#atelier-contact">Contato</a>
          </nav>
        </header>
        <div id="atelier-top" className={styles.heroVisual}>
          <ArchitecturalStudy variant="hero" />
        </div>
        <div className={styles.heroCopy}>
          <span className={styles.label}>
            EXPERIÊNCIA 01 / EDITORIAL / ARQUITETURA
          </span>
          <h1 id="atelier-title">
            Espaços feitos
            <br />
            para <em>permanecer.</em>
          </h1>
          <p>
            Uma exploração visual da SWNexa Studio
            <br />
            sobre arquitetura, silêncio e forma.
          </p>
        </div>
        <div className={styles.heroBottom}>
          <span>Uma experiência SWNexa Studio</span>
          <a href="#philosophy">
            CONTINUE A EXPLORAÇÃO <span aria-hidden="true">↓</span>
          </a>
          <span className={styles.heroEdition}>
            PROJETO CONCEITUAL • DIREÇÃO CRIATIVA
          </span>
        </div>
        <span className={styles.heroSide} aria-hidden="true">
          FORMA / LUZ / PERMANÊNCIA
        </span>
      </section>

      <section
        id="philosophy"
        className={styles.manifesto}
        aria-labelledby="philosophy-title"
      >
        <span className={styles.sectionLabel}>01 / CONCEITO</span>
        <AtelierReveal className={styles.manifestoCopy}>
          <h2 id="philosophy-title">
            Design que deixa
            <br />a obra <em>falar.</em>
          </h2>
          <div className={styles.manifestoText}>
            <span className={styles.tinyMark}>A / 01</span>
            <p>
              Nesta experiência, exploramos uma direção editorial sofisticada,
              baseada em tipografia expressiva, grandes áreas de respiro e uma
              paleta inspirada em materiais naturais.
            </p>
            <p>
              O objetivo não é apresentar um escritório real, mas mostrar como
              identidade, conteúdo e interface podem trabalhar juntos para
              transformar uma marca em uma experiência.
            </p>
          </div>
        </AtelierReveal>
        <span className={styles.manifestoFoot}>
          MENOS ELEMENTOS. MAIS INTENÇÃO.
        </span>
      </section>

      <section
        id="spaces"
        className={styles.spaces}
        aria-labelledby="spaces-title"
      >
        <div className={styles.spacesHeading}>
          <div>
            <span className={styles.sectionLabel}>02 / ESTUDOS VISUAIS</span>
            <h2 id="spaces-title">
              Uma linguagem.
              <br />
              Diferentes <em>possibilidades.</em>
            </h2>
          </div>
          <p>
            Composições conceituais criadas para explorar escalas, ritmos e
            diferentes aplicações da mesma identidade visual.
            <span>Um estudo de direção de arte em três cenários.</span>
          </p>
        </div>
        <div className={styles.spacesGrid}>
          {spaces.map((space, index) => (
            <AtelierReveal
              key={space.variant}
              className={`${styles.space} ${styles[space.variant]}`}
            >
              <article
                tabIndex={0}
                aria-label={`Estudo 0${index + 1}: ${space.name}, composição conceitual, ${space.city}, ${space.year}`}
              >
                <div className={styles.spaceVisual}>
                  <ArchitecturalStudy variant={space.variant} />
                  <span className={styles.spaceIndex}>
                    ESTUDO 0{index + 1} / COMPOSIÇÃO CONCEITUAL
                  </span>
                  <span className={styles.spaceMaterial}>{space.material}</span>
                </div>
                <div className={styles.spaceCaption}>
                  <h3>{space.name}</h3>
                  <span>
                    {space.city}, {space.year}
                    <br />
                    <span>Arquitetura & Interiores</span>
                  </span>
                </div>
              </article>
            </AtelierReveal>
          ))}
        </div>
      </section>

      <section className={styles.object} aria-labelledby="object-title">
        <AtelierReveal className={styles.objectVisual}>
          <ArchitecturalStudy variant="object" />
          <span className={styles.objectDrawing}>
            FIG. 03 — EXPLORAÇÃO DE MATERIALIDADE
          </span>
        </AtelierReveal>
        <AtelierReveal className={styles.objectCopy}>
          <span className={styles.sectionLabel}>
            03 / OBJETO & MATERIALIDADE
          </span>
          <h2 id="object-title">
            Matéria.
            <br />
            Estrutura.
            <br />
            <em>Luz.</em>
          </h2>
          <div className={styles.objectDescription}>
            <span>OBJETO Nº 03</span>
            <p>
              Cada detalhe participa da narrativa.
              <br />
              <br />
              Imagem, tipografia, movimento e espaço são tratados como partes de
              um mesmo sistema visual.
              <br />
              <br />
              Uma exploração conceitual sobre como interfaces digitais podem
              traduzir sensações normalmente associadas ao espaço físico.
            </p>
            <span className={styles.objectSpec}>
              TRAVERTINO / AÇO ESCOVADO
              <br />
              OBJETO CONCEITUAL · 2026
            </span>
          </div>
        </AtelierReveal>
      </section>

      <section
        id="atelier-contact"
        className={styles.final}
        aria-labelledby="contact-title"
      >
        <span className={styles.sectionLabel}>
          04 / SUA PRÓXIMA EXPERIÊNCIA
        </span>
        <AtelierReveal>
          <h2 id="contact-title">
            Sua marca também pode
            <br />
            ocupar um espaço <em>próprio.</em>
          </h2>
          <p className={styles.finalText}>
            Esta é apenas uma direção possível.
            <br />
            Criamos experiências digitais sob medida para cada identidade,
            objetivo e público.
          </p>
          <Link className={styles.contactLink} href="/#contato">
            Criar uma experiência com a SWNexa <span aria-hidden="true">↗</span>
          </Link>
        </AtelierReveal>
        <footer className={styles.footer}>
          <span className={styles.footerBrand}>
            ATELIER <small>01</small>
          </span>
          <p>
            Experiência conceitual desenvolvida pela SWNexa Studio.
            <br />
            <span>
              As marcas, projetos e conteúdos apresentados nesta página são
              fictícios.
            </span>
          </p>
          <span>© 2026 / SÉRIE DE EXPERIÊNCIAS CONCEITUAIS</span>
        </footer>
      </section>
    </main>
  );
}
