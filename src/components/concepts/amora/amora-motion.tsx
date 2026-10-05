"use client";
import { motion, useReducedMotion } from "framer-motion";

export function AmoraReveal({
  children,
  className,
  tilt = 0,
}: {
  children: React.ReactNode;
  className?: string;
  tilt?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={
        reduced
          ? undefined
          : { x: [tilt * 3, 0], y: [20, 0], rotate: [tilt, 0] }
      }
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.95, ease: [0.25, 0.65, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
