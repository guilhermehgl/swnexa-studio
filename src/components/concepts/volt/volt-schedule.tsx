"use client";

import { useState, type KeyboardEvent } from "react";
import { voltArtists, voltDays } from "@/data/volt";
import styles from "./volt.module.css";

export function VoltSchedule() {
  const [selected, setSelected] = useState(0);
  function changeWithKeyboard(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    const next =
      event.key === "ArrowRight"
        ? (index + 1) % 3
        : event.key === "ArrowLeft"
          ? (index + 2) % 3
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? 2
              : null;
    if (next === null) return;
    event.preventDefault();
    setSelected(next);
    document.getElementById(`volt-day-${next}`)?.focus();
  }
  return (
    <section
      id="programacao"
      className={styles.schedule}
      aria-labelledby="schedule-title"
    >
      <div className={styles.sectionTop}>
        <span>03 / PROGRAMAÇÃO</span>
        <span>DO PRIMEIRO SOM À ÚLTIMA ONDA</span>
      </div>
      <h2 id="schedule-title" className={styles.display}>
        ESCOLHA SUA
        <br />
        FREQUÊNCIA<span className={styles.orange}>.</span>
      </h2>
      <div
        className={styles.scheduleTabs}
        role="tablist"
        aria-label="Dia da programação"
      >
        {voltDays.map((day, index) => (
          <button
            key={day.id}
            id={`volt-day-${index}`}
            role="tab"
            aria-selected={selected === index}
            aria-controls={`volt-panel-${index}`}
            tabIndex={selected === index ? 0 : -1}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => changeWithKeyboard(event, index)}
          >
            <span>{day.weekday}</span>
            <strong>{day.label}</strong>
            <span aria-hidden="true">↗</span>
          </button>
        ))}
      </div>
      {voltDays.map((day, index) => (
        <div
          key={day.id}
          role="tabpanel"
          id={`volt-panel-${index}`}
          aria-labelledby={`volt-day-${index}`}
          hidden={selected !== index}
          tabIndex={0}
        >
          <div className={styles.stages}>
            {(["VOLT", "NORTE"] as const).map((stage, stageIndex) => (
              <div key={stage}>
                <h3>
                  <span>0{stageIndex + 1}</span> PALCO {stage}
                </h3>
                <ol>
                  {voltArtists
                    .filter(
                      (artist) =>
                        artist.day === day.id && artist.stage === stage,
                    )
                    .map((artist) => (
                      <li key={artist.name}>
                        <time dateTime={`${artist.time}:00`}>
                          {artist.time}
                        </time>
                        <span>{artist.name}</span>
                        <span aria-hidden="true">↗</span>
                      </li>
                    ))}
                </ol>
              </div>
            ))}
          </div>
          <p className={styles.scheduleNote}>
            Horários ilustrativos. As apresentações após 00h acontecem na
            madrugada seguinte.
          </p>
        </div>
      ))}
    </section>
  );
}
