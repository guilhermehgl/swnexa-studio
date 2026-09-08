import { ArrowUpRight, Plus } from "lucide-react";
import { steps, faqs } from "@/data/content";
export function Beyond() {
  return (
    <section className="beyond">
      <div className="shell beyond-grid">
        <div>
          <span className="eyebrow">ALÉM DA PRIMEIRA IMPRESSÃO</span>
          <h2>
            Precisa de mais
            <br />
            do que um site<span className="accent">?</span>
          </h2>
          <p>
            Por trás de uma boa experiência, pode existir uma operação inteira.
            Criamos sistemas web que simplificam rotinas, conectam informações e
            abrem novas possibilidades.
          </p>
          <a href="#contato" className="text-link">
            Vamos entender seu desafio <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="system-art" aria-hidden="true">
          <span className="orbit orbit-one" />
          <span className="orbit orbit-two" />
          <span className="orbit orbit-three" />
          <div className="system-core">
            SWN<span>sob medida</span>
          </div>
          <span className="system-label label-one">INTEGRAÇÕES</span>
          <span className="system-label label-two">SUA OPERAÇÃO</span>
          <span className="system-label label-three">NOVAS POSSIBILIDADES</span>
        </div>
      </div>
    </section>
  );
}
export function Process() {
  return (
    <section id="processo" className="shell section">
      <div className="section-heading">
        <span className="eyebrow">03 / COMO ACONTECE</span>
        <h2>
          Da primeira conversa
          <br />
          ao último detalhe.
        </h2>
      </div>
      <div className="process-grid">
        {steps.map(([title, text], i) => (
          <article key={title}>
            <span>0{i + 1}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
      <div className="difference">
        <p>
          O cuidado aparece
          <br />
          em cada camada.
        </p>
        <div>
          <span>Design com intenção</span>
          <span>Tecnologia bem construída</span>
          <span>Comunicação próxima</span>
          <span>Espaço para evoluir</span>
        </div>
      </div>
    </section>
  );
}
export function Budget() {
  return (
    <section className="shell budget">
      <span className="eyebrow">SEU PROJETO COMEÇA COM UMA CONVERSA</span>
      <div>
        <h2>
          Cada projeto é único.
          <br />O orçamento também.
        </h2>
        <a
          className="round-link"
          href="#contato"
          aria-label="Solicitar orçamento"
        >
          <ArrowUpRight size={44} strokeWidth={1.3} />
        </a>
      </div>
      <p>
        Escopo, complexidade e objetivos: entendemos o cenário
        <br className="desktop-break" /> para construir uma proposta que faça
        sentido.
      </p>
      <a className="text-link" href="#contato">
        Solicitar orçamento <ArrowUpRight size={17} />
      </a>
    </section>
  );
}
export function FAQ() {
  return (
    <section className="shell section faq">
      <div>
        <span className="eyebrow">04 / SEM PONTAS SOLTAS</span>
        <h2>
          Antes de
          <br />
          começar.
        </h2>
      </div>
      <div>
        {faqs.map(([question, answer]) => (
          <details key={question}>
            <summary>
              {question}
              <Plus size={20} />
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
