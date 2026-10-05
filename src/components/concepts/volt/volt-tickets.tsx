"use client";

import { useState } from "react";
import { voltTickets } from "@/data/volt";
import styles from "./volt.module.css";

export function VoltTickets() {
  const [selected, setSelected] = useState<string | null>(null);
  const ticket = voltTickets.find((item) => item.id === selected);
  return (
    <section
      id="ingressos"
      className={styles.tickets}
      aria-labelledby="tickets-title"
    >
      <div className={styles.sectionTop}>
        <span>06 / SEU LUGAR NA NOITE</span>
        <span>VALORES DEMONSTRATIVOS</span>
      </div>
      <h2 id="tickets-title" className={styles.display}>
        ESCOLHA COMO
        <br />
        VOCÊ QUER VIVER
        <br />
        <span className={styles.orange}>O VOLT.</span>
      </h2>
      <div className={styles.ticketOptions}>
        {voltTickets.map((item, index) => (
          <article
            key={item.id}
            className={styles.ticket}
            data-selected={selected === item.id}
          >
            <span className={styles.ticketNumber}>0{index + 1} / ACESSO</span>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <div className={styles.price}>
              <span>R$</span>
              {item.price}
            </div>
            <small>{item.note}</small>
            <button
              onClick={() => setSelected(selected === item.id ? null : item.id)}
              aria-expanded={selected === item.id}
              aria-controls="volt-ticket-details"
            >
              {selected === item.id ? "FECHAR DETALHES" : "VER DETALHES"}
              <span aria-hidden="true">↗</span>
            </button>
          </article>
        ))}
      </div>
      <div
        id="volt-ticket-details"
        className={styles.ticketDetails}
        aria-live="polite"
      >
        {ticket ? (
          <>
            <h3>{ticket.name} / O QUE ESTÁ INCLUÍDO</h3>
            <ul>
              {ticket.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
            <p>
              Esta seleção apenas demonstra a interface. Não gera reserva,
              cobrança ou ingresso.
            </p>
          </>
        ) : (
          <p>Explore os acessos para conhecer cada possibilidade.</p>
        )}
      </div>
      <p className={styles.ticketDisclaimer}>
        EXPERIÊNCIA CONCEITUAL — COMPRA NÃO DISPONÍVEL
      </p>
    </section>
  );
}
