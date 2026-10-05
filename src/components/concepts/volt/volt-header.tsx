"use client";

import { useRef, useState } from "react";
import { voltNavigation } from "@/data/volt";
import { VoltMotionToggle } from "./volt-motion";
import styles from "./volt.module.css";

export function VoltHeader() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);
  return (
    <header className={styles.header}>
      <a className={styles.brand} href="#inicio" aria-label="VOLT — início">
        VOLT<span>/27</span>
      </a>
      <button
        ref={menuRef}
        className={styles.menuButton}
        aria-expanded={open}
        aria-controls="volt-nav"
        onClick={() => setOpen(!open)}
      >
        {open ? "Fechar −" : "Menu +"}
      </button>
      <nav
        id="volt-nav"
        aria-label="Navegação VOLT"
        className={open ? styles.navOpen : ""}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setOpen(false);
            menuRef.current?.focus();
          }
        }}
      >
        {voltNavigation.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
      </nav>
      <span className={styles.headerDate}>18—20 SET / SP</span>
      <VoltMotionToggle />
    </header>
  );
}
