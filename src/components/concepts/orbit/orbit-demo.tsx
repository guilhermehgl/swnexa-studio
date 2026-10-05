"use client";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import {
  ArrowUpRight,
  Check,
  Play,
  RotateCcw,
  Activity,
  Layers,
  Command,
} from "lucide-react";
import {
  orbitTabs,
  orbitOverviewMetrics,
  orbitProcesses,
  orbitActivity,
} from "@/data/orbit";
import styles from "./orbit.module.css";

function Chart({ insights = false }: { insights?: boolean }) {
  return (
    <div className={styles.chart}>
      <div className={styles.panelTitle}>
        <div>
          <strong>
            {insights ? "Evolução da eficiência" : "Desempenho operacional"}
          </strong>
          <span>
            {insights
              ? "Indicadores ao longo das semanas."
              : "Uma leitura contínua da operação."}
          </span>
        </div>
        <span className={styles.chartLegend}>
          <i />
          {insights ? "Eficiência" : "Neste mês"}
        </span>
      </div>
      <svg
        viewBox="0 0 680 190"
        role="img"
        aria-label={
          insights
            ? "Gráfico demonstrativo de eficiência com tendência de crescimento em seis semanas"
            : "Gráfico demonstrativo de desempenho operacional ao longo do mês"
        }
      >
        {[30, 75, 120, 165].map((y) => (
          <line key={y} x1="40" x2="674" y1={y} y2={y} stroke="#e3e7ef" />
        ))}
        <path
          d={
            insights
              ? "M40 148 135 138 240 100 345 107 450 66 550 51 674 30V165H40Z"
              : "M40 150 95 142 150 147 205 116 260 120 315 92 370 107 425 65 480 73 535 40 590 53 674 21V165H40Z"
          }
          fill="#5b6cff"
          fillOpacity=".08"
        />
        <path
          d={
            insights
              ? "M40 148 135 138 240 100 345 107 450 66 550 51 674 30"
              : "M40 150 95 142 150 147 205 116 260 120 315 92 370 107 425 65 480 73 535 40 590 53 674 21"
          }
          fill="none"
          stroke="#4b5be7"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <g fill="#697182" fontSize="11" fontFamily="monospace">
          <text x="4" y="34">
            100
          </text>
          <text x="8" y="79">
            75
          </text>
          <text x="8" y="124">
            50
          </text>
          <text x="8" y="169">
            25
          </text>
        </g>
      </svg>
      <div className={styles.chartDates}>
        {(insights
          ? ["S01", "S02", "S03", "S04", "S05", "S06"]
          : ["01 JUN", "06 JUN", "12 JUN", "18 JUN", "24 JUN", "30 JUN"]
        ).map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
    </div>
  );
}

export function OrbitDemo() {
  const [active, setActive] = useState(0);
  const [executed, setExecuted] = useState(false);
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % 3;
    else if (event.key === "ArrowLeft") next = (index + 2) % 3;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = 2;
    else return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }
  return (
    <div className={styles.demoShell}>
      <div className={styles.demoTop}>
        <span className={styles.demoBrand}>
          <Command size={18} aria-hidden="true" /> orbit<span>ambiente</span>
        </span>
        <span className={styles.demoEnvironment}>
          <i className={styles.dot} />
          AMBIENTE DEMONSTRATIVO
        </span>
        <span className={styles.avatar} aria-label="Ambiente demonstrativo">
          O
        </span>
      </div>
      <div className={styles.demoBody}>
        <aside className={styles.demoRail} aria-label="Contexto da operação">
          <span>
            <Layers size={20} aria-hidden="true" />
          </span>
          <Activity size={18} aria-hidden="true" />
          <span className={styles.railLabel}>ORB / 03</span>
        </aside>
        <div className={styles.demoContent}>
          <div className={styles.demoHeading}>
            <div>
              <span className={styles.micro}>AMBIENTE / OPERAÇÃO</span>
              <h3>Visão geral da operação</h3>
              <p>Indicadores reunidos. Contexto para decidir.</p>
            </div>
            <span className={styles.period}>01 a 30 de junho de 2026</span>
          </div>
          <div
            className={styles.demoTabs}
            role="tablist"
            aria-label="Visões do produto"
          >
            {orbitTabs.map((tab, index) => (
              <button
                key={tab}
                ref={(el) => {
                  tabs.current[index] = el;
                }}
                id={`${id}-tab-${index}`}
                role="tab"
                aria-selected={active === index}
                aria-controls={`${id}-panel`}
                tabIndex={active === index ? 0 : -1}
                onClick={() => setActive(index)}
                onKeyDown={(e) => navigate(e, index)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div
            className={styles.tabPanel}
            key={active}
            id={`${id}-panel`}
            role="tabpanel"
            aria-labelledby={`${id}-tab-${active}`}
            tabIndex={0}
          >
            {active === 0 && (
              <>
                <div className={styles.metrics}>
                  {orbitOverviewMetrics.map((metric) => (
                    <div key={metric.label}>
                      <span>{metric.label}</span>
                      <strong>{metric.value}</strong>
                      <p>
                        <span>
                          <ArrowUpRight size={12} aria-hidden="true" />
                          {metric.change}
                        </span>{" "}
                        {metric.note}
                      </p>
                    </div>
                  ))}
                </div>
                <div className={styles.demoColumns}>
                  <Chart />
                  <ActivityFeed />
                </div>
                <ProcessList />
              </>
            )}
            {active === 1 && (
              <>
                <div className={styles.automationHead}>
                  <div>
                    <span className={styles.micro}>FLUXO / COMERCIAL-001</span>
                    <h4>Qualificação de leads</h4>
                    <p>Da entrada ao encaminhamento, com contexto.</p>
                  </div>
                  <button
                    className={styles.primary}
                    onClick={() => setExecuted(!executed)}
                  >
                    {executed ? (
                      <RotateCcw size={15} aria-hidden="true" />
                    ) : (
                      <Play size={15} aria-hidden="true" />
                    )}
                    {executed ? "Reiniciar demo" : "Simular fluxo"}
                  </button>
                </div>
                <div className={styles.execution} aria-live="polite">
                  <span className={styles.badge}>
                    {executed ? "CONCLUÍDO" : "PRONTO PARA SIMULAR"}
                  </span>
                  <strong>
                    {executed
                      ? "Entrada demonstrativa encaminhada."
                      : "Uma entrada. Cinco etapas conectadas."}
                  </strong>
                  <p>
                    {executed
                      ? "Validação, contexto, responsável e notificação concluídos nesta simulação local. Nenhum dado foi enviado."
                      : "Simule a execução para acompanhar cada etapa. Os dados são fictícios e não há sistemas externos conectados."}
                  </p>
                </div>
                <ol className={styles.executionSteps}>
                  {[
                    "Entrada recebida",
                    "Dados validados",
                    "Contexto adicionado",
                    "Responsável definido",
                    "Equipe notificada",
                  ].map((step, index) => (
                    <li key={step}>
                      <span>
                        {executed ? (
                          <Check size={15} aria-hidden="true" />
                        ) : (
                          String(index + 1).padStart(2, "0")
                        )}
                      </span>
                      <strong>{step}</strong>
                      <span>
                        {executed ? `00:0${index} · Concluído` : "Pendente"}
                      </span>
                    </li>
                  ))}
                </ol>
                <ProcessList />
              </>
            )}
            {active === 2 && (
              <>
                <div className={styles.insightSummary}>
                  <div>
                    <span className={styles.micro}>
                      INDICADORES / NESTE PERÍODO
                    </span>
                    <h4>
                      Menos distância entre
                      <br />
                      informação e ação.
                    </h4>
                    <p>
                      Este cenário demonstra como indicadores podem revelar o
                      impacto de fluxos conectados sobre tarefas repetitivas.
                    </p>
                  </div>
                  <div>
                    <strong>
                      18,4<span>%</span>
                    </strong>
                    <span>MENOS TAREFAS MANUAIS · DADO FICTÍCIO</span>
                  </div>
                </div>
                <div className={styles.demoColumns}>
                  <Chart insights />
                  <div className={styles.insightNotes}>
                    <span className={styles.micro}>PONTOS DE ATENÇÃO</span>
                    <h4>Onde olhar.</h4>
                    <p>
                      <span>01</span>Revisar a entrada de clientes.
                    </p>
                    <p>
                      <span>02</span>Conectar a fonte de dados pendente.
                    </p>
                    <p>
                      <span>03</span>Ampliar o fluxo de encaminhamento.
                    </p>
                    <small>
                      Análises ilustrativas, sem dados em tempo real.
                    </small>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className={styles.demoDisclaimer}>
            DEMONSTRAÇÃO INTERATIVA{" "}
            <span>Indicadores, atividades e fluxos são fictícios.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActivityFeed() {
  return (
    <div className={styles.activity}>
      <div className={styles.panelTitle}>
        <strong>Atividade recente</strong>
        <Activity size={15} aria-hidden="true" />
      </div>
      <ul>
        {orbitActivity.map((item) => (
          <li key={item.title}>
            <i className={styles.dot} />
            <div>
              <strong>{item.title}</strong>
              <span>{item.detail}</span>
            </div>
          </li>
        ))}
      </ul>
      <span className={styles.feedFoot}>SISTEMAS CONECTADOS</span>
    </div>
  );
}
function ProcessList() {
  return (
    <div className={styles.processList}>
      <div className={styles.panelTitle}>
        <strong>Processos conectados</strong>
        <span>03 / EM DESTAQUE</span>
      </div>
      {orbitProcesses.map((item) => (
        <div className={styles.processRow} key={item.name}>
          <div>
            <strong>{item.name}</strong>
            <span>{item.type}</span>
          </div>
          <span className={styles.badge}>{item.status}</span>
          <span>{item.volume}</span>
        </div>
      ))}
    </div>
  );
}
