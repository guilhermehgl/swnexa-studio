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
    const hero = document.getElementById("studio-hero");
    if (!hero) return;
    // Change before the lower edge of the hero reaches the fixed navigation.
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { rootMargin: "-100px 0px 0px 0px", threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
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
          <span>
            Studio<span className={styles.degree}>°</span>
          </span>
        </a>
        <nav className={styles.desktop} aria-label="Navegação principal">
          {links.map(([label, href]) => (
            <a href={href} key={href}>
              {label}
            </a>
          ))}
        </nav>
        <a className={styles.cta} href="#contato">
          Solicitar projeto <ArrowUpRight size={16} strokeWidth={1.5} />
        </a>
        <button
          ref={toggle}
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
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
