export const voltNavigation = [
  { label: "Line-up", href: "#lineup" },
  { label: "Programação", href: "#programacao" },
  { label: "Experiências", href: "#experiencias" },
  { label: "Ingressos", href: "#ingressos" },
];

// All names, venues, dates and prices are fictional creative material.
export const voltDays = [
  { id: "18", label: "18 SET", weekday: "Sábado", date: "2027-09-18" },
  { id: "19", label: "19 SET", weekday: "Domingo", date: "2027-09-19" },
  { id: "20", label: "20 SET", weekday: "Segunda", date: "2027-09-20" },
] as const;
export type VoltDay = (typeof voltDays)[number]["id"];
export type VoltArtist = {
  name: string;
  day: VoltDay;
  stage: "VOLT" | "NORTE";
  time: string;
  direction: string;
  graphic: "rings" | "bars" | "star" | "grid";
};
const names = [
  "VÉRTEX 09",
  "SINAL OITO",
  "FORMA NULA",
  "ELO 27",
  "RUA INVERSA",
  "PULSO ÍMPAR",
  "FASE TERRA",
  "DUO DESVIO",
  "NÓVIA 03",
  "MARÉ ZERO",
  "TRAMA ONZE",
  "LADO ÍON",
  "VIA SUBSOLO",
  "CORPO ECO",
  "VÃO SONORO",
  "LUME 72",
  "DOBRA 07",
  "QUASE ÓRBITA",
  "TRAÇO RARO",
  "MEIO ELÉTRICO",
  "NORTE VAZIO",
  "RITMO AVESSO",
  "ONDA NOVE",
  "FIM ABERTO",
];
const times = [
  "18:00",
  "19:30",
  "21:10",
  "23:00",
  "18:40",
  "20:20",
  "22:10",
  "00:20",
];
const graphics = ["rings", "bars", "star", "grid"] as const;
const directions = [
  "Eletrônica em movimento",
  "Voz, corpo e síntese",
  "Ritmos em colisão",
  "Som que ocupa o espaço",
];
export const voltArtists: VoltArtist[] = names.map((name, index) => ({
  name,
  day: voltDays[Math.floor(index / 8)].id,
  stage: index % 8 < 4 ? "VOLT" : "NORTE",
  time: times[index % 8],
  direction: directions[index % 4],
  graphic: graphics[index % 4],
}));

export const voltExperiences = [
  {
    number: "01",
    name: "Instalações",
    text: "Arte, luz e espaço transformando diferentes pontos do festival.",
    detail: "Percursos visuais / do entardecer à madrugada",
  },
  {
    number: "02",
    name: "Encontros",
    text: "Conversas, performances e colaborações que acontecem fora do palco principal.",
    detail: "Corpos em cena / ideias em circulação",
  },
  {
    number: "03",
    name: "Noite adentro",
    text: "Experiências pensadas para continuar quando a última música termina.",
    detail: "A cidade como extensão / novos caminhos",
  },
];
export const voltFrequencies = [
  {
    id: "som",
    label: "Som",
    graphic: "rings",
    text: "Uma frequência encontra a outra. O corpo acompanha.",
    note: "01 / ONDAS EM EXPANSÃO",
  },
  {
    id: "arte",
    label: "Arte",
    graphic: "grid",
    text: "Mude o ponto de vista. A forma também tem voz.",
    note: "02 / FORMAS EM COLISÃO",
  },
  {
    id: "luz",
    label: "Luz",
    graphic: "star",
    text: "O espaço acende. A noite ganha outra dimensão.",
    note: "03 / PRESENÇA ELÉTRICA",
  },
  {
    id: "cidade",
    label: "Cidade",
    graphic: "bars",
    text: "Ruas, encontros, desvios. Tudo faz parte do percurso.",
    note: "04 / TERRITÓRIO EM MOVIMENTO",
  },
] as const;
export const voltTickets = [
  {
    id: "dia",
    name: "1 DIA",
    price: "190",
    description: "Acesso ao festival durante o dia escolhido.",
    details: [
      "Um dia, dois palcos.",
      "Instalações e encontros incluídos.",
      "Escolha sua data na programação.",
    ],
    note: "UM RECORTE. TODO O VOLUME.",
  },
  {
    id: "pass",
    name: "PASS VOLT",
    price: "420",
    description: "Acesso aos três dias.",
    details: [
      "18, 19 e 20 de setembro.",
      "Toda a programação dos dois palcos.",
      "Instalações, encontros e percursos.",
    ],
    note: "TRÊS NOITES. SEM INTERVALO.",
  },
  {
    id: "plus",
    name: "VOLT +",
    price: "590",
    description: "Três dias + áreas e experiências exclusivas.",
    details: [
      "Todos os acessos do Pass VOLT.",
      "Área de descanso reservada.",
      "Visitas mediadas às instalações.",
    ],
    note: "MAIS ESPAÇO PARA A NOITE.",
  },
];
