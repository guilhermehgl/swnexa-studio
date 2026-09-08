"use client";
import { motion, useReducedMotion } from "framer-motion";
export function Reveal({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={false}
      whileInView={reduced ? undefined : { y: [18, 0] }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
