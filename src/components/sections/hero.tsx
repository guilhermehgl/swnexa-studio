"use client";
import { useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import background from "@/assets/background.png";
import styles from "./hero.module.css";
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 24]);
  return (
    <section
      ref={ref}
      id="studio-hero"
      className={styles.hero}
      aria-labelledby="hero-title"
    >
      <motion.div className={styles.parallax} style={{ y: reduced ? 0 : y }}>
        <div className={styles.imageReveal}>
          <Image
            src={background}
            alt=""
            fill
            preload
            sizes="100vw"
            className={styles.image}
          />
        </div>
      </motion.div>
      <div className={styles.content}>
        <div className={styles.headline}>
          <span className={styles.label}>DESIGN & TECNOLOGIA SOB MEDIDA</span>
          <h1 id="hero-title" className={styles.title}>
            {["Sites que", "impressionam.", "Sistemas que", "resolvem."].map(
              (line, index) => (
                <span
                  key={line}
                  className={`${styles.mask} ${index === 2 ? styles.secondThought : ""}`}
                >
                  <span
                    className={styles.line}
                    style={{ animationDelay: `${280 + index * 110}ms` }}
                  >
                    {line}
                    {index === 3 && (
                      <i className={styles.dot} aria-hidden="true" />
                    )}
                  </span>
                  {index < 3 ? " " : null}
                </span>
              ),
            )}
          </h1>
        </div>
        <div className={styles.copy}>
          <p>
            Desenvolvemos experiências digitais e sistemas web sob medida para
            transformar ideias em produtos reais.
          </p>
          <a className={styles.cta} href="#contato">
            Quero meu projeto <ArrowUpRight size={19} strokeWidth={1.5} />
          </a>
        </div>
        <a className={styles.explore} href="#projetos">
          <ArrowDown size={16} strokeWidth={1.5} /> Explorar projetos
        </a>
      </div>
    </section>
  );
}
