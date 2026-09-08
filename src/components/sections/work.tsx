import { ArrowUpRight } from "lucide-react";
import { images, projects, services } from "@/data/content";
import { Visual } from "@/components/ui/visual";
export function Showreel() {
  return (
    <section
      className="shell showreel"
      aria-label="Apresentação visual do Studio"
    >
      <Visual asset={images.showreel} />
      <div className="visual-footnote">
        <span>ESTÉTICA QUE CONECTA. TECNOLOGIA QUE ENTREGA.</span>
        <span>Uma divisão da SWNexa ↗</span>
      </div>
    </section>
  );
}
export function Services() {
  return (
    <section id="servicos" className="shell section">
      <div className="section-heading">
        <span className="eyebrow">01 / O QUE CRIAMOS</span>
        <h2>
          Boas ideias merecem
          <br />
          uma execução à altura.
        </h2>
      </div>
      <div className="services">
        {services.map((service, i) => (
          <article className="service" key={service.title}>
            <span className="service-number">0{i + 1}</span>
            <div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <ul>
                {service.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <ArrowUpRight className="service-arrow" size={30} strokeWidth={1} />
          </article>
        ))}
      </div>
    </section>
  );
}
export function Projects() {
  return (
    <section id="projetos" className="shell section projects">
      <div className="section-heading">
        <span className="eyebrow">02 / NOSSO UNIVERSO</span>
        <div>
          <h2>
            Projetos selecionados<span className="accent">.</span>
          </h2>
          <p>
            Um espaço para as soluções que criamos.
            <br />
            Primeira seleção em preparação, com produtos da SWNexa.
          </p>
        </div>
      </div>
      <div className="project-grid">
        {projects.map((project) => (
          <article key={project.name}>
            <Visual asset={images[project.image]} compact />
            <div className="project-title">
              <h3>
                {project.href ? (
                  <a href={project.href}>
                    {project.name} <ArrowUpRight size={22} />
                  </a>
                ) : (
                  project.name
                )}
              </h3>
              <span>{project.year ?? "APRESENTAÇÃO EM BREVE"}</span>
            </div>
            <p className="project-category">{project.category}</p>
            <p className="project-description">{project.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
