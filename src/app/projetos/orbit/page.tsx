import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  Check,
  Database,
  Workflow,
  Sparkles,
  GitBranch,
  Bell,
} from "lucide-react";
import { ConceptReturn } from "@/components/concepts/concept-return";
import { OrbitCore } from "@/components/concepts/orbit/orbit-core";
import { OrbitDemo } from "@/components/concepts/orbit/orbit-demo";
import { OrbitReveal } from "@/components/concepts/orbit/orbit-motion";
import { orbitCapabilities, orbitFlow, orbitNavigation } from "@/data/orbit";
import styles from "@/components/concepts/orbit/orbit.module.css";

export const metadata: Metadata = pageMetadata(
  "ORBIT | Experiência conceitual da SWNexa Studio",
  "Experiência conceitual de uma plataforma corporativa que integra dados, processos e automações. Uma demonstração de produto digital criada pela SWNexa Studio.",
  "/projetos/orbit",
);
const flowIcons = [Database, Workflow, Sparkles, GitBranch, Bell];

export default function OrbitPage() {
  return (
    <main id="conteudo" lang="pt-BR" className={styles.page}>
      <ConceptReturn />
      <section
        id="platform"
        className={styles.hero}
        aria-labelledby="orbit-title"
      >
        <header className={styles.header}>
          <a
            className={styles.brand}
            href="#platform"
            aria-label="ORBIT — início da experiência"
          >
            orbit<span>°</span>
          </a>
          <nav aria-label="Navegação de ORBIT">
            {orbitNavigation.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <a className={styles.headerCta} href="#company">
            Solicitar projeto <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </header>
        <div className={styles.heroGrid}>
          <OrbitReveal className={styles.heroCopy}>
            <span className={styles.eyebrow}>
              <i className={styles.dot} /> OPERAÇÃO CONECTADA
            </span>
            <h1 id="orbit-title">
              Da complexidade
              <br />à <span>clareza operacional.</span>
            </h1>
            <p>
              Dados, automações e decisões reunidos em uma única experiência.
              Menos ruído entre processos. Mais clareza para operar, acompanhar
              e evoluir.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primary} href="#product">
                Explorar a plataforma{" "}
                <ArrowRight size={17} aria-hidden="true" />
              </a>
              <a className={styles.secondary} href="#product">
                Ver demonstração <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
            <div className={styles.heroProof}>
              <span>
                <Check size={14} aria-hidden="true" />
                Uma operação conectada
              </span>
              <span>
                <Check size={14} aria-hidden="true" />
                Informação no lugar certo
              </span>
            </div>
          </OrbitReveal>
          <OrbitReveal className={styles.heroProduct} delay={0.1}>
            <OrbitCore />
          </OrbitReveal>
        </div>
        <div className={styles.heroBottom}>
          <span>01 / ARQUITETURA DA PLATAFORMA</span>
          <a href="#solutions">
            Uma visão da operação <ArrowDown size={14} aria-hidden="true" />
          </a>
          <span>Conceito criado pela SWNexa Studio</span>
        </div>
      </section>
      <section
        id="solutions"
        className={styles.value}
        aria-labelledby="value-title"
      >
        <div className={styles.sectionHeading}>
          <span className={styles.eyebrow}>02 / CAPACIDADES CONECTADAS</span>
          <OrbitReveal>
            <h2 id="value-title">
              Tudo conectado.
              <br />
              <span>Nada perdido no processo.</span>
            </h2>
            <p>
              Informações, automações e decisões trabalhando juntas.
              <br />
              Uma operação que funciona como um sistema.
            </p>
          </OrbitReveal>
        </div>
        <div className={styles.capabilities}>
          {orbitCapabilities.map((item, index) => (
            <OrbitReveal
              key={item.name}
              delay={index * 0.08}
              className={styles.capability}
            >
              <span className={styles.capabilityNumber}>
                0{index + 1}
                <ArrowUpRight size={18} aria-hidden="true" />
              </span>
              <div
                className={`${styles.capabilityVisual} ${styles[item.pattern]}`}
                aria-hidden="true"
              >
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <span className={styles.capabilityNote}>{item.note}</span>
            </OrbitReveal>
          ))}
        </div>
      </section>
      <section
        id="product"
        className={styles.product}
        aria-labelledby="product-title"
      >
        <div className={styles.productIntro}>
          <div>
            <span className={styles.eyebrow}>03 / PRODUTO NA PRÁTICA</span>
            <h2 id="product-title">
              Veja o todo.
              <br />
              <span>Entenda o próximo passo.</span>
            </h2>
          </div>
          <p>
            Da visão geral ao detalhe operacional,
            <br />
            cada decisão ganha contexto.
            <span className={styles.tryDemo}>
              EXPLORE AS ABAS. SIMULE UM FLUXO.{" "}
              <ArrowDown size={14} aria-hidden="true" />
            </span>
          </p>
        </div>
        <OrbitReveal>
          <OrbitDemo />
        </OrbitReveal>
      </section>
      <section
        id="automation"
        className={styles.flow}
        aria-labelledby="flow-title"
      >
        <div className={styles.sectionHeading}>
          <span className={styles.eyebrow}>04 / DO INÍCIO À PRÓXIMA AÇÃO</span>
          <OrbitReveal>
            <h2 id="flow-title">
              O processo certo.
              <br />
              <span>No caminho certo.</span>
            </h2>
            <p>
              Uma sequência de tarefas se torna um fluxo contínuo.
              <br />
              Cada etapa recebe contexto e direciona a próxima.
            </p>
          </OrbitReveal>
        </div>
        <ol className={styles.flowTrack}>
          {orbitFlow.map((step, index) => {
            const Icon = flowIcons[index];
            return (
              <li key={step.id}>
                <OrbitReveal delay={index * 0.07} className={styles.flowNode}>
                  <span className={styles.micro}>
                    {step.type}
                    <span>{step.time}</span>
                  </span>
                  <Icon size={23} aria-hidden="true" />
                  <h3>{step.label}</h3>
                  <p>{step.detail}</p>
                  <div>
                    <span>{step.id}</span>
                    <span>
                      <i className={styles.dot} />
                      PRONTO
                    </span>
                  </div>
                </OrbitReveal>
                {index < orbitFlow.length - 1 && (
                  <span className={styles.flowConnector} aria-hidden="true">
                    <ArrowRight size={15} />
                  </span>
                )}
              </li>
            );
          })}
        </ol>
        <div className={styles.flowLegend}>
          <span>
            <i className={styles.dot} /> UM FLUXO CONECTADO
          </span>
          <span>
            Arquitetura demonstrativa. Sem serviços externos conectados.
          </span>
        </div>
      </section>
      <section
        id="company"
        className={styles.final}
        aria-labelledby="final-title"
      >
        <div className={styles.finalGrid} aria-hidden="true" />
        <OrbitReveal className={styles.finalCopy}>
          <span className={styles.eyebrow}>05 / SUA PRÓXIMA EXPERIÊNCIA</span>
          <h2 id="final-title">
            Construa o que faz
            <br />
            sua operação <span>avançar.</span>
          </h2>
          <p>
            Tecnologia sob medida para transformar processos complexos em
            produtos digitais simples de usar.
          </p>
          <Link href="/#contato" className={styles.primary}>
            Solicitar um projeto <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
          <small>
            Esta é uma experiência conceitual criada pela SWNexa Studio.
          </small>
        </OrbitReveal>
        <footer className={styles.footer}>
          <div>
            <span className={styles.brand}>orbit°</span>
            <p>Conceito criado pela SWNexa Studio</p>
          </div>
          <p>
            Orbit é uma experiência conceitual de plataforma corporativa.
            <br />
            Criada para demonstrar interface, tecnologia e direção digital.
          </p>
          <span>© 2026 / EXPERIÊNCIA 03</span>
        </footer>
      </section>
    </main>
  );
}
