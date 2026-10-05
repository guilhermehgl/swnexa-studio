"use client";
import { useState } from "react";
import {
  Database,
  Workflow,
  Sparkles,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import { orbitNodes } from "@/data/orbit";
import styles from "./orbit.module.css";

const icons = [Database, Workflow, Sparkles, Layers];
export function OrbitCore() {
  const [active, setActive] = useState(0);
  const node = orbitNodes[active];
  return (
    <div className={styles.coreVisual}>
      <div className={styles.coreToolbar}>
        <span>
          <i className={styles.dot} /> SISTEMA ATIVO
        </span>
        <span>ORB / 001</span>
      </div>
      <div className={styles.network}>
        <svg
          className={styles.connections}
          viewBox="0 0 600 370"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M120 105H220V185H300M480 105H380V185H300M120 265H220V185M480 265H380V185" />
          <path
            className={styles.activeConnection}
            d={
              [
                "M120 105H220V185H300",
                "M480 105H380V185H300",
                "M120 265H220V185H300",
                "M480 265H380V185H300",
              ][active]
            }
          />
        </svg>
        <div className={styles.coreCenter}>
          <div className={styles.coreMark} aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <strong>NÚCLEO ORBIT</strong>
          <span>OPERAÇÃO INTEGRADA</span>
        </div>
        {orbitNodes.map((item, index) => {
          const Icon = icons[index];
          return (
            <button
              key={item.id}
              className={`${styles.node} ${active === index ? styles.selectedNode : ""}`}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
              aria-pressed={active === index}
              aria-label={`Explorar módulo de ${item.label}`}
            >
              <span className={styles.nodeId}>
                MÓDULO / {item.id}
                <ArrowUpRight size={12} aria-hidden="true" />
              </span>
              <Icon size={20} aria-hidden="true" />
              <strong>{item.label}</strong>
              <span className={styles.nodeStatus}>Conectado</span>
            </button>
          );
        })}
      </div>
      <div className={styles.signalPanel} aria-live="polite">
        <div>
          <span className={styles.micro}>{node.metric}</span>
          <strong>{node.signal}</strong>
        </div>
        <div>
          <strong>{node.detail}</strong>
          <span>{node.status}</span>
        </div>
        <svg viewBox="0 0 110 42" aria-hidden="true">
          <path
            d="M0 38 12 32 22 34 34 21 46 24 58 14 70 17 82 7 94 10 110 2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>
      <div className={styles.coreFoot}>
        <span>SELECIONE UM MÓDULO</span>
        <span>DADOS DEMONSTRATIVOS</span>
      </div>
    </div>
  );
}
