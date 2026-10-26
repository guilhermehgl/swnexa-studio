import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { amoraCopy as copy, amoraMenu, amoraNavigation } from "@/data/amora";
import { AmoraImage } from "@/components/concepts/amora/amora-image";
import { AmoraReveal } from "@/components/concepts/amora/amora-motion";
import { AmoraRitual } from "@/components/concepts/amora/amora-ritual";
import { AmoraNavigation } from "@/components/concepts/amora/amora-navigation";
import { ConceptReturn } from "@/components/concepts/concept-return";
import styles from "@/components/concepts/amora/amora.module.css";

const title = "AMORA | Experiência 02 — SWNexa Studio";
const description =
  "Uma experiência conceitual de gastronomia e hospitalidade criada pela SWNexa Studio. Uma exploração de identidade, direção de arte e interface; não representa um restaurante ou cliente real.";
export const metadata: Metadata = pageMetadata(
  title,
  description,
  "/projetos/amora",
);

function Flower({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M50 44C13-4-3 27 42 50 0 62 21 96 48 58c4 55 45 37 10-7 50 17 58-25 0-6C81-1 39-6 50 44Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="50" cy="50" r="6" fill="currentColor" />
    </svg>
  );
}

export default function AmoraPage() {
  return (
    <main id="conteudo" lang="pt-BR" className={styles.page}>
      <ConceptReturn />
      <header className={styles.header}>
        <div className={styles.headerMain}>
          <a
            className={styles.brand}
            href="#amora-inicio"
            aria-label="AMORA — início da experiência"
          >
            amora<span>EXPERIÊNCIA 02</span>
          </a>
          <nav className={styles.desktopNav} aria-label="Navegação de AMORA">
            {amoraNavigation.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <a href="#conversa" className={styles.reserve}>
            Reservar mesa <span aria-hidden="true">↗</span>
          </a>
          <AmoraNavigation />
        </div>
      </header>

      <section
        id="amora-inicio"
        className={styles.hero}
        aria-labelledby="amora-title"
      >
        <AmoraReveal className={styles.heroCopy}>
          <span className={styles.eyebrow}>{copy.hero.label}</span>
          <h1 id="amora-title">
            {copy.hero.titleFirst}
            <br />
            {copy.hero.titleSecond}
            <br />
            <em>{copy.hero.titleItalic}</em>
          </h1>
          <p>{copy.hero.text}</p>
          <a className={styles.textLink} href="#historia">
            Puxe uma cadeira <span aria-hidden="true">↓</span>
          </a>
          <small>{copy.hero.signature}</small>
        </AmoraReveal>
        <div className={styles.heroComposition}>
          <AmoraReveal tilt={-2} className={styles.heroPicture}>
            <AmoraImage
              asset="hero"
              sizes="(max-width: 760px) 85vw, 44vw"
              eager
            />
          </AmoraReveal>
          <AmoraReveal tilt={3} className={styles.heroDetail}>
            <AmoraImage asset="detail" sizes="(max-width: 760px) 30vw, 17vw" />
          </AmoraReveal>
          <span className={styles.heroStamp}>
            à mesa,
            <br />
            <em>juntos.</em>
            <Flower />
          </span>
          <span className={styles.heroAnnotation}>
            ESTUDO DE COR, TEXTURA E ENCONTRO
          </span>
        </div>
        <div className={styles.heroFoot}>
          <span>COMIDA, TEMPO & CONVERSA</span>
          <span>Um conceito. Muitas sensações.</span>
        </div>
      </section>

      <section
        id="historia"
        className={styles.story}
        aria-labelledby="story-title"
      >
        <AmoraReveal tilt={-1} className={styles.storyPicture}>
          <AmoraImage asset="table" sizes="(max-width: 760px) 70vw, 40vw" />
          <span>PEQUENOS RITUAIS, GRANDES ENCONTROS.</span>
        </AmoraReveal>
        <AmoraReveal className={styles.storyCopy}>
          <Flower className={styles.storyFlower} />
          <span className={styles.eyebrow}>{copy.story.label}</span>
          <h2 id="story-title">
            {copy.story.title}
            <br />
            <em>{copy.story.italic}</em>
          </h2>
          {copy.story.paragraphs.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </AmoraReveal>
      </section>

      <AmoraRitual />

      <section id="menu" className={styles.menu} aria-labelledby="menu-title">
        <div className={styles.menuIntro}>
          <span className={styles.eyebrow}>{copy.menu.label}</span>
          <h2 id="menu-title">
            {copy.menu.title}
            <br />
            <em>{copy.menu.italic}</em>
          </h2>
          <p>{copy.menu.text}</p>
          <div className={styles.menuPicture}>
            <AmoraImage asset="food" sizes="(max-width: 760px) 45vw, 26vw" />
          </div>
          <small>{copy.menu.note}</small>
        </div>
        <AmoraReveal className={styles.menuList}>
          {amoraMenu.map((category, index) => (
            <div className={styles.menuCategory} key={category.category}>
              <h3>
                <span>0{index + 1}</span>
                {category.category}
              </h3>
              <ul>
                {category.items.map((item) => (
                  <li key={item.name}>
                    <span>{item.name}</span>
                    <p>{item.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </AmoraReveal>
      </section>

      <section className={styles.moments} aria-labelledby="moments-title">
        <div className={styles.momentsHeading}>
          <span className={styles.eyebrow}>{copy.moments.label}</span>
          <h2 id="moments-title">
            {copy.moments.title}
            <br />
            <em>{copy.moments.italic}</em>
          </h2>
          <p>{copy.moments.text}</p>
          <Flower />
        </div>
        <div className={styles.gallery}>
          {(
            [
              {
                asset: "food",
                caption: "O cuidado no preparo.",
                className: styles.galleryFood,
                tilt: -2,
              },
              {
                asset: "table",
                caption: "O espaço entre as conversas.",
                className: styles.galleryTable,
                tilt: 1,
              },
              {
                asset: "detail",
                caption: "A beleza de um pequeno detalhe.",
                className: styles.galleryDetail,
                tilt: -1,
              },
            ] as const
          ).map((image) => (
            <AmoraReveal
              key={image.asset}
              className={image.className}
              tilt={image.tilt}
            >
              <figure>
                <div>
                  <AmoraImage
                    asset={image.asset}
                    sizes="(max-width: 760px) 62vw, 34vw"
                  />
                </div>
                <figcaption>{image.caption}</figcaption>
              </figure>
            </AmoraReveal>
          ))}
        </div>
      </section>

      <section
        id="lugar"
        className={styles.place}
        aria-labelledby="place-title"
      >
        <AmoraReveal className={styles.placePicture}>
          <AmoraImage asset="space" sizes="(max-width: 760px) 100vw, 60vw" />
          <span>ESPAÇO IMAGINADO / ESTUDO DE ATMOSFERA</span>
        </AmoraReveal>
        <AmoraReveal className={styles.placeCopy}>
          <span className={styles.eyebrow}>{copy.place.label}</span>
          <h2 id="place-title">
            {copy.place.title}
            <br />
            <em>{copy.place.italic}</em>
          </h2>
          {copy.place.paragraphs.map((text) => (
            <p key={text}>{text}</p>
          ))}
          <small>{copy.place.note}</small>
        </AmoraReveal>
      </section>

      <section
        id="conversa"
        className={styles.final}
        aria-labelledby="final-title"
      >
        <Flower className={styles.finalFlower} />
        <span className={styles.eyebrow}>{copy.final.label}</span>
        <AmoraReveal>
          <h2 id="final-title">
            {copy.final.title}
            <br />
            <em>{copy.final.italic}</em>
          </h2>
          <p>{copy.final.text}</p>
          <p className={styles.finalSecond}>{copy.final.second}</p>
          <div className={styles.finalActions}>
            <Link href="/#contato" className={styles.primaryCta}>
              {copy.final.cta}
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <small className={styles.reservationNote}>
            “Reservar mesa” conduz a esta seção conceitual. Não são realizadas
            reservas.
          </small>
        </AmoraReveal>
        <footer className={styles.footer}>
          <div>
            <span className={styles.footerBrand}>amora</span>
            <small>EXPERIÊNCIA 02</small>
          </div>
          <div>
            <span>SWNexa Studio</span>
            <small>Direção criativa e desenvolvimento</small>
          </div>
          <p>{copy.final.note}</p>
          <span className={styles.footerYear}>© 2026 / CONCEITOS AUTORAIS</span>
        </footer>
      </section>
    </main>
  );
}
