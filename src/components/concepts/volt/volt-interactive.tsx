"use client";

import { useState } from "react";
import { voltFrequencies } from "@/data/volt";
import { VoltGraphic } from "./volt-graphic";
import styles from "./volt.module.css";

export function VoltInteractive() {
  const [selected, setSelected] = useState(0);
  const frequency = voltFrequencies[selected];
  return (
    <section
      className={styles.interactive}
      data-frequency={frequency.id}
      aria-labelledby="frequency-title"
    >
      <div className={styles.sectionTop}>
        <h2 id="frequency-title">04 / MUDE A FREQUÊNCIA</h2>
        <span>TOQUE. EXPLORE. MUDE O PONTO DE VISTA.</span>
      </div>
      <div className={styles.frequencyGrid}>
        <div
          className={styles.frequencyButtons}
          role="group"
          aria-label="Universos VOLT"
        >
          {voltFrequencies.map((item, index) => (
            <button
              key={item.id}
              aria-pressed={selected === index}
              onMouseEnter={() => setSelected(index)}
              onFocus={() => setSelected(index)}
              onClick={() => setSelected(index)}
            >
              <span>{item.label}</span>
              <span aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
        <div className={styles.frequencyVisual}>
          <VoltGraphic kind={frequency.graphic} />
          <span>{frequency.note}</span>
        </div>
      </div>
      <p className={styles.frequencyDescription} aria-live="polite">
        {frequency.text}
      </p>
    </section>
  );
}
