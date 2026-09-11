"use client";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { images, projects, services } from "@/data/content";
import { Visual } from "@/components/ui/visual";
export function Services() {
  const [activeService, setActiveService] = useState(0);

  return (
    <section id="servicos" className="shell section servicesSection">
      <div className="section-heading servicesHeading">
        <span className="eyebrow">01 / O QUE CRIAMOS</span>
        <h2>
          Boas ideias merecem
          <br />
          uma execução à altura.
        </h2>
      </div>
      <div className="servicesEditorial" data-active={activeService}>
        <div className="servicesEditorialList">
        {services.map((service, i) => (
          <button
            type="button"
            className="serviceFeature"
            key={service.title}
            data-active={activeService === i}
            aria-label={`Serviço ${i + 1}: ${service.title}`}
            aria-pressed={activeService === i}
            onMouseEnter={() => setActiveService(i)}
            onMouseLeave={() => setActiveService(0)}
            onFocus={() => setActiveService(i)}
            onClick={() => setActiveService(i)}
          >
            <span className="serviceFeatureIndex">0{i + 1}</span>
            <div className="serviceFeatureBody">
              <div className="serviceFeatureTitle">
                <h3>{service.title}</h3>
                <ArrowUpRight className="serviceFeatureArrow" size={28} strokeWidth={1.25} />
              </div>
              <p>{service.text}</p>
              <p className="serviceFeatureCategories">{service.items.join(" / ")}</p>
            </div>
          </button>
        ))}
        </div>
        <div className="servicePreview" aria-hidden="true">
          <div className="servicePreviewFrame previewSite">
            <span className="previewSiteChrome" />
            <span className="previewSiteEyebrow" />
            <span className="previewSiteTitle" />
            <span className="previewSiteTitle previewSiteTitleShort" />
            <span className="previewSiteColumns">
              <i />
              <i />
              <i />
            </span>
            <span className="previewSiteLine" />
          </div>
          <div className="servicePreviewFrame previewSystem">
            <span className="previewSystemHeading" />
            <span className="previewSystemStat"><i /><i /></span>
            <span className="previewSystemRows">
              <i />
              <i />
              <i />
              <i />
            </span>
            <span className="previewSystemChart"><i /><i /><i /><i /><i /></span>
          </div>
        </div>
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
