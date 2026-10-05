"use client";

import { useState } from "react";
import { voltArtists, voltDays } from "@/data/volt";
import { VoltGraphic } from "./volt-graphic";
import styles from "./volt.module.css";

export function VoltLineup() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <section
      id="lineup"
      className={styles.lineup}
      aria-labelledby="lineup-title"
    >
      <div className={styles.sectionTop}>
        <span>02 / QUEM FAZ A NOITE</span>
        <span>TRÊS NOITES. DIFERENTES FREQUÊNCIAS.</span>
      </div>
      <h2 id="lineup-title" className={styles.lineupTitle}>
        LINE-UP<span>↗</span>
      </h2>
      <p className={styles.lineupHint}>
        24 nomes criados para este universo. Toque ou passe o cursor para
        explorar.
      </p>
      <div className={styles.artistDays}>
        {voltDays.map((day) => (
          <div key={day.id}>
            <h3>
              <time dateTime={day.date}>{day.label}</time>
              <span>{day.weekday}</span>
            </h3>
            {voltArtists
              .filter((artist) => artist.day === day.id)
              .map((artist) => (
                <div
                  key={artist.name}
                  className={styles.artist}
                  data-active={active === artist.name}
                >
                  <button
                    aria-expanded={active === artist.name}
                    aria-controls={`artist-${voltArtists.indexOf(artist)}`}
                    onMouseEnter={() => setActive(artist.name)}
                    onFocus={() => setActive(artist.name)}
                    onClick={() => setActive(artist.name)}
                  >
                    <span>{artist.name}</span>
                    <span className={styles.artistTime}>
                      {artist.time}
                      <span>↗</span>
                    </span>
                  </button>
                  <div
                    id={`artist-${voltArtists.indexOf(artist)}`}
                    className={styles.artistDetail}
                    hidden={active !== artist.name}
                  >
                    <VoltGraphic kind={artist.graphic} />
                    <p>
                      {artist.direction}
                      <span>
                        PALCO {artist.stage} / {day.label}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </section>
  );
}
