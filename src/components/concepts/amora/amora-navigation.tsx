"use client";
import { useRef } from "react";
import { amoraNavigation } from "@/data/amora";
import styles from "./amora.module.css";

export function AmoraNavigation() {
  const details = useRef<HTMLDetailsElement>(null);
  const summary = useRef<HTMLElement>(null);
  function close() {
    if (details.current) details.current.open = false;
  }
  return (
    <details
      ref={details}
      className={styles.mobileNav}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          close();
          summary.current?.focus();
        }
      }}
    >
      <summary ref={summary} aria-label="Menu de navegação de AMORA">
        Menu <span aria-hidden="true">+</span>
      </summary>
      <nav aria-label="Navegação móvel de AMORA">
        {amoraNavigation.map((item) => (
          <a key={item.href} href={item.href} onClick={close}>
            {item.label}
          </a>
        ))}
        <a href="#conversa" onClick={close}>
          Reservar mesa — explorar o conceito ↗
        </a>
      </nav>
    </details>
  );
}
