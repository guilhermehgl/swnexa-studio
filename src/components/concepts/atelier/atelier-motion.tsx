"use client";

import { motion, useReducedMotion } from "framer-motion";

export function AtelierReveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={reduced ? undefined : { y: [24, 0], opacity: [0.65, 1] }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
