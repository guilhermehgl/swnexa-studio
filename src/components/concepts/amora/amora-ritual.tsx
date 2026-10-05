"use client";
import { useId, useRef, useState } from "react";
import { amoraRituals } from "@/data/amora";
import styles from "./amora.module.css";

export function AmoraRitual() {
  const [active, setActive] = useState(0);
  const id = useId();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const ritual = amoraRituals[active];
  return (
    <section
      id="rituais"
      className={styles.ritual}
      aria-labelledby="ritual-title"
    >
      <div className={styles.ritualIntro}>
        <span className={styles.eyebrow}>02 / O QUE COMPÕE UM MOMENTO</span>
        <h2 id="ritual-title">
          Um gesto de cada vez.
          <br />
          <em>Um prato por inteiro.</em>
        </h2>
        <p>
          Explore os quatro gestos. A composição ganha novas camadas, sem
          apressar o encontro.
        </p>
      </div>
      <div className={styles.ritualLayout}>
        <div
          role="tablist"
          aria-label="Gestos que compõem o prato"
          className={styles.ritualTabs}
          aria-orientation="vertical"
        >
          {amoraRituals.map((item, index) => (
            <button
              key={item.name}
              ref={(node) => {
                buttons.current[index] = node;
              }}
              role="tab"
              type="button"
              id={`${id}-tab-${index}`}
              aria-controls={`${id}-panel`}
              aria-selected={active === index}
              tabIndex={active === index ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => {
                let next = active;
                if (event.key === "ArrowDown" || event.key === "ArrowRight")
                  next = (active + 1) % amoraRituals.length;
                else if (event.key === "ArrowUp" || event.key === "ArrowLeft")
                  next =
                    (active + amoraRituals.length - 1) % amoraRituals.length;
                else if (event.key === "Home") next = 0;
                else if (event.key === "End") next = amoraRituals.length - 1;
                else return;
                event.preventDefault();
                setActive(next);
                buttons.current[next]?.focus();
              }}
            >
              <span>0{index + 1}</span>
              <span>
                <strong>{item.name}</strong>
                <small>{item.text}</small>
              </span>
              <span aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
        <div
          role="tabpanel"
          id={`${id}-panel`}
          aria-labelledby={`${id}-tab-${active}`}
          tabIndex={0}
          className={styles.ritualPanel}
        >
          <div className={styles.plateStage}>
            <svg viewBox="0 0 600 600" aria-hidden="true" focusable="false">
              <ellipse cx="320" cy="340" rx="215" ry="192" fill="#713d2818" />
              <circle cx="300" cy="300" r="218" fill="#efe5cc" />
              <circle
                cx="300"
                cy="300"
                r="184"
                fill="#f6edda"
                stroke="#cbb797"
              />
              <circle cx="300" cy="300" r="149" fill="#ece1c6" />
              <g className={styles.ingredient} key="leaves">
                <path
                  d="M210 355c-91-6-124-84-96-140 77 1 126 57 96 140Z"
                  fill="#69744a"
                />
                <path
                  d="M290 290c-51-81-17-165 49-176 53 72 37 148-49 176Z"
                  fill="#849060"
                />
                <path
                  d="m135 234 72 111m100-66 28-144"
                  stroke="#d9dfb8"
                  strokeWidth="3"
                />
              </g>
              {active >= 1 && (
                <g className={styles.ingredient} key="bread">
                  <path
                    d="M207 180c48-67 163-66 195-8 22 43-18 70-53 67l-107-5c-41 5-56-30-35-54Z"
                    fill="#bb783b"
                  />
                  <path
                    d="M228 181c37-41 115-41 139-9 15 22-8 37-35 32l-89-2c-21 0-31-6-15-21Z"
                    fill="#e2b273"
                  />
                  <path
                    d="m259 159-12 24m44-29-9 30m39-26-7 27"
                    stroke="#9c632e"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </g>
              )}
              {active >= 2 && (
                <g className={styles.ingredient} key="tomato">
                  <circle cx="347" cy="347" r="69" fill="#b9563c" />
                  <circle cx="347" cy="347" r="52" fill="#d97950" />
                  <path
                    d="M347 300v93m-42-70 83 48m-85 0 87-48"
                    stroke="#e9a471"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  <ellipse
                    cx="243"
                    cy="378"
                    rx="52"
                    ry="43"
                    transform="rotate(-24 243 378)"
                    fill="#b94b36"
                  />
                  <path
                    d="m226 339 20 21 18-20"
                    stroke="#728451"
                    strokeWidth="6"
                  />
                </g>
              )}
              {active >= 3 && (
                <g className={styles.ingredient} key="fig">
                  <path
                    d="M410 252c-50 7-79 42-60 74 21 37 86 12 104-27 7-19-14-38-44-47Z"
                    fill="#754452"
                  />
                  <path
                    d="M410 263c-40 7-60 33-45 51 17 22 61 4 74-23 3-10-10-24-29-28Z"
                    fill="#c88986"
                  />
                  <path
                    d="m389 285 25 17m-20-30 13 11m20 5-5 19"
                    stroke="#edd3a5"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle cx="225" cy="285" r="5" fill="#b9914d" />
                  <circle cx="275" cy="435" r="4" fill="#b9914d" />
                </g>
              )}
              <path
                d="m195 439 12-9m166-5 14 5m45-63 8-4"
                stroke="#687443"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
            <span className={styles.plateNote}>
              COMPOSIÇÃO ILUSTRADA / 0{active + 1}
            </span>
          </div>
          <div className={styles.ritualDescription} aria-live="polite">
            <span>{ritual.ingredient}</span>
            <p>{ritual.detail}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
