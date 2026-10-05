export type AmoraImageKey = "hero" | "detail" | "table" | "food" | "space";

export const amoraNavigation = [
  { href: "#historia", label: "História" },
  { href: "#menu", label: "Menu" },
  { href: "#lugar", label: "Lugar" },
  { href: "#conversa", label: "Contato" },
];

// Replace src with finalSrc after adding the corresponding photo to public/images/amora.
export const amoraImages: Record<
  AmoraImageKey,
  { src: string; finalSrc: string; alt: string }
> = {
  hero: {
    src: "/images/amora/amora-hero.svg",
    finalSrc: "/images/amora/amora-hero.jpg",
    alt: "Composição ilustrada de um prato com tomates, folhas e azeite sobre uma mesa terracota",
  },
  detail: {
    src: "/images/amora/amora-detail-01.svg",
    finalSrc: "/images/amora/amora-detail-01.jpg",
    alt: "Estudo ilustrado de figos maduros, folhas e pequenos gestos à mesa",
  },
  table: {
    src: "/images/amora/amora-table-01.svg",
    finalSrc: "/images/amora/amora-table-01.jpg",
    alt: "Mesa ilustrada com pratos de cerâmica, tecido e lugares para compartilhar",
  },
  food: {
    src: "/images/amora/amora-food-01.svg",
    finalSrc: "/images/amora/amora-food-01.jpg",
    alt: "Composição ilustrada de pão, vegetais e ervas em uma travessa artesanal",
  },
  space: {
    src: "/images/amora/amora-space-01.svg",
    finalSrc: "/images/amora/amora-space-01.jpg",
    alt: "Ambiente imaginado com luz natural, uma mesa e cadeiras em tons quentes",
  },
};

export const amoraCopy = {
  hero: {
    label: "EXPERIÊNCIA 02 / GASTRONOMIA & HOSPITALIDADE",
    titleFirst: "Feito devagar.",
    titleSecond: "Servido no",
    titleItalic: "tempo certo.",
    text: "Uma experiência conceitual sobre comida, encontro e o prazer de fazer as coisas sem pressa.",
    signature: "Conceito desenvolvido pela SWNexa Studio.",
  },
  story: {
    label: "01 / UM JEITO DE RECEBER",
    title: "Algumas coisas",
    italic: "não precisam de pressa.",
    paragraphs: [
      "AMORA nasce como um exercício de identidade para lugares onde a experiência começa antes mesmo do primeiro prato.",
      "Da escolha dos ingredientes ao jeito de receber, cada detalhe participa da mesma história.",
      "Nesta exploração, identidade visual, fotografia, tipografia e interface trabalham juntas para transformar hospitalidade em linguagem digital.",
    ],
  },
  menu: {
    label: "03 / UM RECORTE DA ESTAÇÃO",
    title: "Um menu guiado",
    italic: "pela estação.",
    text: "Poucos ingredientes. Muitas maneiras de olhar para eles. Um exercício de hierarquia, sabor e intenção.",
    note: "Menu conceitual criado exclusivamente para esta experiência.",
  },
  moments: {
    label: "04 / PEQUENOS RITUAIS",
    title: "À mesa,",
    italic: "tudo se encontra.",
    text: "Texturas, sabores, pessoas e espaço fazem parte da mesma experiência.",
  },
  place: {
    label: "05 / O LUGAR IMAGINADO",
    title: "Um lugar feito",
    italic: "para ficar um pouco mais.",
    paragraphs: [
      "Luz natural, materiais quentes e uma atmosfera sem formalidades.",
      "AMORA imagina a hospitalidade como extensão da identidade — do primeiro contato na tela até o momento de sentar à mesa.",
    ],
    note: "Espaço imaginado para esta experiência.",
  },
  final: {
    label: "UMA EXPERIÊNCIA SWNEXA STUDIO",
    title: "Toda marca",
    italic: "tem seu próprio sabor.",
    text: "AMORA é uma exploração conceitual criada para mostrar como estratégia, identidade e interface podem construir uma presença digital completamente própria.",
    second: "Esta é apenas uma das direções possíveis.",
    cta: "Criar algo único com a SWNexa",
    note: "AMORA é uma experiência conceitual. Nome, conteúdo, imagens, produtos e demais elementos apresentados nesta página são fictícios e foram criados exclusivamente para fins de demonstração.",
  },
};

export const amoraRituals = [
  {
    name: "Origem",
    text: "Ingredientes escolhidos por estação.",
    detail:
      "Tudo começa com o que a terra oferece. Formas imperfeitas, cores naturais e uma identidade que encontra beleza na origem.",
    ingredient: "Folhas e ervas",
  },
  {
    name: "Tempo",
    text: "Preparos que respeitam seus próprios ritmos.",
    detail:
      "O pão cresce. Os aromas se aproximam. Na interface, o movimento também tem tempo para ser percebido.",
    ingredient: "Pão da casa",
  },
  {
    name: "Mesa",
    text: "Comida feita para ser dividida.",
    detail:
      "Um prato nunca existe sozinho. Composição, contraste e proximidade tornam cada elemento parte de uma conversa.",
    ingredient: "Tomates assados",
  },
  {
    name: "Memória",
    text: "Sabores simples tratados com intenção.",
    detail:
      "O que fica é a sensação. Um último detalhe muda o conjunto, assim como pequenos gestos dão personalidade a uma marca.",
    ingredient: "Figos da estação",
  },
] as const;

export const amoraMenu = [
  {
    category: "Para começar",
    items: [
      { name: "Pão da casa", description: "manteiga tostada, ervas frescas" },
      { name: "Tomates assados", description: "coalhada, azeite, folhas" },
    ],
  },
  {
    category: "Da cozinha",
    items: [
      { name: "Massa fresca", description: "cogumelos, queijo curado" },
      {
        name: "Peixe do dia",
        description: "legumes da estação, molho de limão",
      },
    ],
  },
  {
    category: "Da horta",
    items: [
      {
        name: "Abóbora dourada",
        description: "mel, castanhas, folhas amargas",
      },
    ],
  },
  {
    category: "Do forno",
    items: [
      {
        name: "Torta de cebolas",
        description: "massa leve, tomilho, queijo de cabra",
      },
    ],
  },
  {
    category: "Para terminar",
    items: [
      { name: "Chocolate & sal", description: "creme fresco, flor de sal" },
      { name: "Figos maduros", description: "iogurte, mel, amêndoas" },
    ],
  },
] as const;
