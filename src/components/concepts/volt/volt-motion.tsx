"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import styles from "./volt.module.css";

const MotionContext = createContext({ paused: false, toggle: () => {} });
export function VoltMotion({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false);
  return (
    <MotionContext.Provider
      value={{ paused, toggle: () => setPaused((value) => !value) }}
    >
      <div className={styles.page} data-paused={paused}>
        {children}
      </div>
    </MotionContext.Provider>
  );
}
export function VoltMotionToggle() {
  const { paused, toggle } = useContext(MotionContext);
  return (
    <button
      className={styles.motionToggle}
      onClick={toggle}
      aria-pressed={paused}
      aria-label={paused ? "Retomar animações" : "Pausar animações"}
    >
      <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span>
      <span>{paused ? "Retomar" : "Pausar"} movimento</span>
    </button>
  );
}
export function VoltReveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "span";
}) {
  const reduced = useReducedMotion();
  const { paused } = useContext(MotionContext);
  const Element = as === "span" ? motion.span : motion.div;
  return (
    <Element
      className={className}
      initial={false}
      whileInView={{ x: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      style={{ x: reduced || paused ? 0 : 24 }}
      transition={{
        duration: reduced || paused ? 0 : 0.5,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </Element>
  );
}
export function VoltScrollWord() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { paused } = useContext(MotionContext);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const secondX = useTransform(scrollYProgress, [0, 1], ["8%", "-15%"]);
  return (
    <div ref={ref} className={styles.scrollWords} aria-hidden="true">
      <motion.span style={{ x: reduced || paused ? 0 : x }}>
        VOLT / 27
      </motion.span>
      <motion.span style={{ x: reduced || paused ? 0 : secondX }}>
        VOLT / 27
      </motion.span>
    </div>
  );
}
