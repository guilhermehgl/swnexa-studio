export type VisualAsset = {
  src: string | null;
  alt: string;
  theme: "studio" | "fluxio" | "produtiv";
};
// Troque null por caminhos locais em /images. Nunca usar imagens remotas.
export const images: Record<string, VisualAsset> = {
  hero: {
    src: null,
    alt: "Composição visual do SWNexa Studio",
    theme: "studio",
  },
  showreel: {
    src: null,
    alt: "Apresentação visual do Studio",
    theme: "studio",
  },
  fluxio: { src: null, alt: "Apresentação do Fluxio", theme: "fluxio" },
  produtiv: { src: null, alt: "Apresentação do Produtiv", theme: "produtiv" },
};
export const services = [
  {
    title: "Sites & experiências digitais",
    text: "Uma presença à altura da sua marca. Do primeiro impacto à próxima conversa.",
    items: [
      "Sites institucionais",
      "Landing pages",
      "Portais & áreas de cliente",
    ],
  },
  {
    title: "Sistemas & software sob medida",
    text: "Tecnologia que acompanha a sua operação. Construída em torno do que você precisa.",
    items: [
      "Sistemas web & administrativos",
      "Dashboards personalizados",
      "Integrações & automações",
    ],
  },
];
export const steps = [
  [
    "Conversamos",
    "Entendemos sua ideia, seus objetivos e o contexto do negócio.",
  ],
  [
    "Planejamos",
    "Definimos a estrutura, a experiência e o caminho do projeto.",
  ],
  ["Desenvolvemos", "Transformamos o planejamento em design e tecnologia."],
  [
    "Refinamos & publicamos",
    "Ajustamos os detalhes, validamos e colocamos o projeto no ar.",
  ],
];
export const faqs = [
  [
    "Quanto custa desenvolver um site?",
    "Cada proposta considera os objetivos, o escopo e a complexidade do projeto. Vamos entender sua necessidade antes de definir o investimento.",
  ],
  [
    "Quanto tempo um projeto leva?",
    "O prazo depende das funcionalidades, do conteúdo e das etapas de aprovação. O cronograma é combinado na proposta.",
  ],
  [
    "Vocês desenvolvem sistemas personalizados?",
    "Sim. Desenvolvemos aplicações web, portais, dashboards e sistemas administrativos de acordo com as necessidades de cada negócio.",
  ],
  [
    "O site funciona em celular e tablet?",
    "Sim. A experiência é planejada para diferentes tamanhos de tela, com atenção à navegação, à leitura e à performance.",
  ],
  [
    "Vocês podem cuidar da publicação e hospedagem?",
    "Podemos planejar a publicação e orientar a escolha de hospedagem. As responsabilidades e os custos são definidos na proposta.",
  ],
  [
    "Existe suporte após a entrega?",
    "As condições de suporte, manutenção e evolução são alinhadas no escopo de cada projeto.",
  ],
];
