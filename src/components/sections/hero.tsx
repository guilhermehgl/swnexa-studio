"use client";
import { useEffect, useRef, type PointerEvent } from "react";
import { ArrowDown } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { getImageProps } from "next/image";
import background from "@/assets/background.png";
import backgroundMobile from "@/assets/background-mobile.png";
import styles from "./hero.module.css";

const desktopLines = [
  ["Sites que", "impressionam."],
  ["Sistemas que", "resolvem."],
];
const mobileLines = ["Sites que", "impressionam.", "Sistemas que", "resolvem."];
const emphasisWords = new Set(["impressionam.", "resolvem."]);

const imageProps = { alt: "", sizes: "100vw", fill: true, loading: "eager" as const };
const {
  props: { srcSet: desktopImageSrcSet },
} = getImageProps({ ...imageProps, src: background });
const {
  props: { srcSet: mobileImageSrcSet, ...mobileImageProps },
} = getImageProps({ ...imageProps, src: backgroundMobile, fetchPriority: "high" });

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const titleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const exploreRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const updateWordLight = (event: PointerEvent<HTMLSpanElement>) => {
    if (event.pointerType !== "mouse") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const position = ((event.clientX - bounds.left) / bounds.width) * 100;
    event.currentTarget.style.setProperty("--light-x", `${Math.max(0, Math.min(position, 100))}%`);
  };
  useEffect(() => {
    const textElements = [labelRef.current, ...titleRefs.current, exploreRef.current];
    let frame = 0;

    const updateExitOpacity = () => {
      frame = 0;
      const headerBottom = document.querySelector<HTMLElement>("[data-site-header]")?.getBoundingClientRect().bottom ?? 0;
      const fadeStart = headerBottom + 100;
      const fadeEnd = headerBottom;

      textElements.forEach((element) => {
        if (!element) return;

        const distance = element.getBoundingClientRect().top;
        const opacity = reduced
          ? Number(distance > fadeEnd)
          : Math.max(0, Math.min(1, (distance - fadeEnd) / (fadeStart - fadeEnd)));

        element.style.setProperty("--hero-exit-opacity", String(opacity));
      });
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateExitOpacity);
    };

    updateExitOpacity();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reduced]);
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
          <picture className={styles.picture}>
            <source media="(min-width: 761px)" srcSet={desktopImageSrcSet} />
            <source media="(max-width: 760px)" srcSet={mobileImageSrcSet} />
            <img {...mobileImageProps} alt="" className={styles.image} />
          </picture>
        </div>
      </motion.div>
      <div className={styles.content}>
        <div className={styles.headline}>
          <div ref={labelRef} className={styles.exitFade}>
            <span className={styles.label}>DESIGN & TECNOLOGIA SOB MEDIDA</span>
          </div>
          <h1 id="hero-title" className={styles.title}>
            <span className={styles.desktopTitle}>
              {desktopLines.map(([prefix, emphasis], index) => (
                <span
                  ref={(element) => {
                    titleRefs.current[index] = element;
                  }}
                  key={emphasis}
                  className={`${styles.mask} ${styles.exitFade}`}
                >
                  <span
                    className={`${styles.line} ${index === 1 ? `${styles.lineSecondary} ${styles.lineFromRight}` : ""}`}
                    style={{ animationDelay: `${360 + index * 1500}ms` }}
                  >
                    <span className={styles.linePrefix}>{prefix} </span>
                    <span
                      className={styles.lineEmphasis}
                      data-word={emphasis}
                      onPointerMove={updateWordLight}
                    >
                      {emphasis}
                    </span>
                  </span>
                </span>
              ))}
            </span>
            <span className={styles.mobileTitle}>
              {[mobileLines.slice(0, 2), mobileLines.slice(2)].map((thought, thoughtIndex) => (
                <span
                  ref={(element) => {
                    titleRefs.current[thoughtIndex + 2] = element;
                  }}
                  key={thought[0]}
                  className={`${styles.exitFade} ${styles.mobileThought}`}
                >
                  {thought.map((line, lineIndex) => {
                    const index = thoughtIndex * 2 + lineIndex;
                    return (
                      <span
                        key={line}
                        className={`${styles.mask} ${index === 2 ? styles.mobileSecondThought : ""}`}
                      >
                        <span
                          className={`${styles.line} ${index >= 2 ? styles.lineFromRight : ""}`}
                          style={{ animationDelay: `${360 + Math.floor(index / 2) * 1500}ms` }}
                        >
                          {emphasisWords.has(line) ? (
                            <span
                              className={styles.lineEmphasis}
                              data-word={line}
                              onPointerMove={updateWordLight}
                            >
                              {line}
                            </span>
                          ) : (
                            <span className={styles.linePrefix}>{line}</span>
                          )}
                        </span>
                      </span>
                    );
                  })}
                </span>
              ))}
            </span>
          </h1>
        </div>
        <div ref={exploreRef} className={`${styles.exitFade} ${styles.exploreExit}`}>
          <a className={styles.explore} href="#projetos">
            <span>Explorar</span>
            <span className={styles.exploreArrow} aria-hidden="true">
              <ArrowDown size={16} strokeWidth={1.5} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
