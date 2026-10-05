export const orbitNavigation = [
  { label: "Visão", href: "#platform" },
  { label: "Capacidades", href: "#solutions" },
  { label: "Produto", href: "#product" },
  { label: "Experiência", href: "#company" },
];

export const orbitNodes = [
  {
    label: "Dados",
    id: "01",
    detail: "Uma fonte de verdade.",
    status: "Informações conectadas.",
    signal: "98,7%",
    metric: "DISPONIBILIDADE OPERACIONAL",
  },
  {
    label: "Automação",
    id: "02",
    detail: "Menos tarefas repetidas.",
    status: "Fluxos integrados.",
    signal: "1,2 s",
    metric: "TEMPO DE EXECUÇÃO",
  },
  {
    label: "Inteligência",
    id: "03",
    detail: "Contexto para decidir.",
    status: "Indicadores reunidos.",
    signal: "94,2%",
    metric: "LEITURA DE INDICADORES",
  },
  {
    label: "Operação",
    id: "04",
    detail: "Equipes em sintonia.",
    status: "Etapas conectadas.",
    signal: "+18,4%",
    metric: "EFICIÊNCIA OPERACIONAL",
  },
] as const;

export const orbitCapabilities = [
  {
    name: "Dados",
    description: "Informação centralizada para toda a operação.",
    note: "Reúna contexto, histórico e indicadores em um só ambiente.",
    pattern: "data",
  },
  {
    name: "Automação",
    description: "Processos que avançam sem tarefas repetitivas.",
    note: "Transforme ações manuais em fluxos claros e automatizados.",
    pattern: "automation",
  },
  {
    name: "Inteligência",
    description: "Informação pronta para orientar decisões.",
    note: "Encontre padrões e identifique o que exige atenção.",
    pattern: "intelligence",
  },
] as const;

export const orbitTabs = ["Visão geral", "Automações", "Análises"] as const;
export const orbitOverviewMetrics = [
  {
    label: "Receita",
    value: "R$ 128.420",
    change: "+12,8%",
    note: "no período anterior",
  },
  {
    label: "Eficiência",
    value: "94,2%",
    change: "+8,4%",
    note: "na operação",
  },
  {
    label: "Automações",
    value: "1.284",
    change: "+24,1%",
    note: "execuções concluídas",
  },
  {
    label: "Fluxos ativos",
    value: "24",
    change: "+4",
    note: "processos conectados",
  },
];
export const orbitProcesses = [
  {
    name: "Qualificação de leads",
    type: "Operação comercial",
    status: "Ativo",
    volume: "482 execuções",
  },
  {
    name: "Conciliação de receitas",
    type: "Financeiro",
    status: "Ativo",
    volume: "316 execuções",
  },
  {
    name: "Entrada de novos clientes",
    type: "Relacionamento",
    status: "Em revisão",
    volume: "208 execuções",
  },
];
export const orbitActivity = [
  { title: "Nova entrada encaminhada", detail: "Fluxo comercial · há 2 min" },
  { title: "Fontes sincronizadas", detail: "Camada de dados · há 6 min" },
  { title: "Relatório semanal disponível", detail: "Análises · há 12 min" },
];
export const orbitFlow = [
  {
    label: "Nova entrada",
    type: "ENTRADA",
    id: "IN / 001",
    detail: "Formulário recebido",
    time: "00:00",
  },
  {
    label: "Validar",
    type: "PROCESSO",
    id: "PR / 002",
    detail: "Dados conferidos",
    time: "00:01",
  },
  {
    label: "Enriquecer",
    type: "INTELIGÊNCIA",
    id: "DT / 003",
    detail: "Contexto adicionado",
    time: "00:02",
  },
  {
    label: "Definir responsável",
    type: "DECISÃO",
    id: "DC / 004",
    detail: "Equipe definida",
    time: "00:03",
  },
  {
    label: "Notificar equipe",
    type: "AÇÃO",
    id: "AC / 005",
    detail: "Pronto para a próxima ação",
    time: "00:04",
  },
];
