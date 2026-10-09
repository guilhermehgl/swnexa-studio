import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { conceptProjects } from "@/data/projects";
import { ArchitecturalStudy } from "@/components/concepts/atelier/architectural-study";
import styles from "./projects.module.css";

const categories = {
  atelier: "Architecture & Interior",
  amora: "Food & Hospitality",
  orbit: "Technology & Product",
  volt: "Culture & Entertainment",
};

export function Projects() {
  return (
    <section
      id="projetos"
      className={`section ${styles.collection}`}
      aria-labelledby="projects-title"
    >
      <div className="shell">
        <div className="section-heading">
          <span className="eyebrow">02 / NOSSO UNIVERSO</span>
          <div>
            <h2 id="projects-title">
              Exemplos conceituais<span className="accent">.</span>
            </h2>
            <p>
              Quatro mercados. Quatro linguagens. Uma mesma capacidade de criar.
            </p>
          </div>
        </div>
        <div className={styles.intro}>
          <span>Conceitos autorais · sem clientes reais</span>
        </div>
        <div className={styles.grid}>
          {conceptProjects.map((project) => {
            const cover = (
              <div
                className={`${styles.cover} ${styles[project.slug]}`}
                style={
                  {
                    "--cover-background": project.theme.background,
                    "--cover-accent": project.theme.accent,
                  } as CSSProperties
                }
                aria-hidden="true"
              >
                <span className={styles.coverTop}>
                  <span>
                    SWNEXA /{" "}
                    {project.status === "available" ? "EXPERIÊNCIA" : "CONCEPT"}{" "}
                    {project.number}
                  </span>
                  <span>
                    {project.status === "available" ? "EXPLORAR ↗" : "EM BREVE"}
                  </span>
                </span>
                {project.slug === "atelier" && (
                  <>
                    <ArchitecturalStudy variant="hero" />
                    <span className={styles.atelierWord}>
                      ATELIER <small>01</small>
                    </span>
                    <span className={styles.coverBottom}>
                      Espaços feitos para permanecer.
                    </span>
                  </>
                )}
                {project.slug === "amora" && (
                  <>
                    <span className={styles.amoraPlate} />
                    <span className={styles.amoraLeaf} />
                    <span className={styles.amoraWord}>
                      amora<span>à mesa, juntos.</span>
                    </span>
                    <span className={styles.coverBottom}>
                      O tempo tem outro sabor.
                    </span>
                  </>
                )}
                {project.slug === "orbit" && (
                  <>
                    <div className={styles.orbitInterface}>
                      <span>
                        NÚCLEO ORBIT <i />
                      </span>
                      <div>
                        <span>DADOS / SINCRONIA</span>
                        <strong>98,7%</strong>
                        <span className={styles.orbitBars}>
                          <i />
                          <i />
                          <i />
                          <i />
                          <i />
                          <i />
                        </span>
                      </div>
                      <div>
                        <span>AUTOMAÇÃO</span>
                        <strong>
                          24 <small>fluxos ativos</small>
                        </strong>
                        <span className={styles.orbitSignal}>● CONECTADO</span>
                      </div>
                    </div>
                    <span className={styles.orbitWord}>
                      orbit<span>DA COMPLEXIDADE À CLAREZA.</span>
                    </span>
                    <span className={styles.coverBottom}>
                      [ PRODUTO / PRECISÃO / CLAREZA ]
                    </span>
                  </>
                )}
                {project.slug === "volt" && (
                  <>
                    <span className={styles.voltWord}>
                      VOLT
                      <br />
                      <span>VOLT</span>
                    </span>
                    <span className={styles.voltStamp}>
                      MAIS
                      <br />
                      VOLUME ↗
                    </span>
                    <span className={styles.coverBottom}>
                      MÚSICA · ARTE · MOVIMENTO / 04
                    </span>
                  </>
                )}
              </div>
            );
            return (
              <article className={styles.project} key={project.slug}>
                {project.status === "available" ? (
                  <Link
                    href={project.route}
                    className={styles.projectLink}
                    aria-label={`Explorar ${project.name}: ${project.category}`}
                  >
                    {cover}
                  </Link>
                ) : (
                  cover
                )}
                <div className={styles.caption}>
                  <div>
                    <h3>
                      {project.status === "available" ? (
                        <Link href={project.route}>
                          {project.name}
                          <ArrowUpRight size={20} />
                        </Link>
                      ) : (
                        project.name
                      )}
                    </h3>
                    <p>{categories[project.slug]}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
