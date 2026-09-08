"use client";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <section id="contato" className="shell section contact">
      <div>
        <span className="eyebrow">
          <span className="status-dot" /> VAMOS CRIAR ALGO JUNTOS
        </span>
        <h2>
          O que você
          <br />
          tem em mente<span className="accent">?</span>
        </h2>
        <p>
          Conte um pouco sobre sua ideia.
          <br />
          Uma boa conversa pode ser o começo
          <br />
          de um grande projeto.
        </p>
        <span className="form-notice">
          Formulário demonstrativo. O envio será disponibilizado em breve.
        </span>
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          /* TODO: integrar envio somente quando o serviço de contato for definido. */ setSubmitted(
            true,
          );
        }}
      >
        <div className="form-grid">
          <label>
            Nome *
            <input
              name="name"
              autoComplete="name"
              placeholder="Como podemos chamar você?"
              required
              maxLength={120}
            />
          </label>
          <label>
            Empresa
            <input
              name="company"
              autoComplete="organization"
              placeholder="Nome da sua empresa"
              maxLength={160}
            />
          </label>
          <label>
            E-mail *
            <input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="voce@empresa.com"
              required
              maxLength={254}
            />
          </label>
          <label>
            WhatsApp
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="(00) 00000-0000"
              maxLength={30}
            />
          </label>
        </div>
        <label>
          Tipo de projeto *
          <select name="projectType" defaultValue="" required>
            <option value="" disabled>
              O que vamos construir?
            </option>
            {[
              "Site",
              "Landing page",
              "Sistema web",
              "Portal / área do cliente",
              "Outro",
            ].map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label>
          Conte sobre o projeto *
          <textarea
            name="message"
            placeholder="Sua ideia, seus objetivos, seu próximo passo..."
            rows={3}
            required
            maxLength={5000}
          />
        </label>
        <div className="form-submit">
          <span>* Campos obrigatórios</span>
          <button className="button button-dark" type="submit">
            Prévia da solicitação <ArrowUpRight size={18} />
          </button>
        </div>
        <p role="status" className="form-status">
          {submitted
            ? "Esta é uma demonstração. Nenhum dado foi enviado ou armazenado. O canal de contato será ativado em breve."
            : ""}
        </p>
      </form>
    </section>
  );
}
