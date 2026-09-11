"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import styles from "./header.module.css";
const links = [
  ["Projetos", "#projetos"],
  ["Serviços", "#servicos"],
  ["Processo", "#processo"],
  ["Contato", "#contato"],
];
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 0);
    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 761px)");
    const close = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", close);
    return () => desktop.removeEventListener("change", close);
  }, []);
  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${open ? styles.open : ""}`}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <div className={styles.inner}>
        <a
          href="#studio-hero"
          className={styles.brand}
          aria-label="SWNexa Studio início"
          onClick={() => setOpen(false)}
        >
          SWNexa
          <span>Studio</span>
        </a>
        <nav className={styles.desktop} aria-label="Navegação principal">
          {links.map(([label, href]) => (
            <a href={href} key={href}>
              {label}
            </a>
          ))}
        </nav>
        <a className={styles.cta} href="#contato" aria-label="Solicitar projeto">
          <span className={styles.ctaText} aria-hidden="true">
            <span className={styles.ctaDefault}>Solicitar projeto</span>
            <span className={styles.ctaHover}>Conte sua ideia</span>
          </span>
          <span className={styles.ctaArrow} aria-hidden="true">
            <ArrowUpRight size={16} strokeWidth={1.5} />
          </span>
        </a>
        <button
          ref={toggle}
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={19} strokeWidth={1.5} /> : <Menu size={19} strokeWidth={1.5} />}
        </button>
      </div>
      <nav
        id="mobile-nav"
        className={styles.mobile}
        aria-label="Navegação mobile"
        hidden={!open}
      >
        {links.map(([label, href]) => (
          <a href={href} key={href} onClick={() => setOpen(false)}>
            {label}
            <ArrowUpRight size={20} />
          </a>
        ))}
        <a href="#contato" onClick={() => setOpen(false)}>
          Solicitar projeto <ArrowUpRight size={20} />
        </a>
      </nav>
    </header>
  );
}
