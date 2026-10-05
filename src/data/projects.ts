export type ConceptProject = {
  slug: "atelier" | "amora" | "orbit" | "volt";
  number: string;
  name: string;
  category: string;
  description: string;
  status: "available" | "coming-soon";
  theme: { background: string; accent: string };
  route: `/projetos/${string}`;
};

// Independent concepts, never client cases. Only available routes are linked.
export const conceptProjects: ConceptProject[] = [
  {
    slug: "atelier",
    number: "01",
    name: "ATELIER",
    category: "Editorial Arquitetônico",
    description:
      "Experiência 01. Uma exploração de direção de arte e identidade digital.",
    status: "available",
    theme: { background: "#20201e", accent: "#ded5c6" },
    route: "/projetos/atelier",
  },
  {
    slug: "amora",
    number: "02",
    name: "AMORA",
    category: "Gastronomia & Hospitalidade",
    description:
      "Experiência 02. À mesa, o tempo desacelera. Sabores, encontros e gestos humanos.",
    status: "available",
    theme: { background: "#eee3cf", accent: "#843c35" },
    route: "/projetos/amora",
  },
  {
    slug: "orbit",
    number: "03",
    name: "ORBIT",
    category: "Tecnologia & Produto",
    description:
      "Experiência 03. Dados, processos e automações em uma operação conectada.",
    status: "available",
    theme: { background: "#f0f3f9", accent: "#4b5be7" },
    route: "/projetos/orbit",
  },
  {
    slug: "volt",
    number: "04",
    name: "VOLT",
    category: "Música, Cultura & Entretenimento",
    description:
      "Experiência 04. A cidade aumenta o volume. Música, arte e movimento em três noites.",
    status: "available",
    theme: { background: "#ff542d", accent: "#242020" },
    route: "/projetos/volt",
  },
];
