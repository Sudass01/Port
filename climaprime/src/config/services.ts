/**
 * ============================================================================
 *  SERVIÇOS
 * ============================================================================
 *  Cada item vira um card na home e em /servicos.
 *  Itens com `page` também geram uma página própria em /servicos/<slug>,
 *  pensada para SEO local (H1 com a cidade, FAQ específico, CTA e áreas).
 *
 *  `quote` liga o card ao formulário de orçamento: ao clicar em
 *  "Solicitar orçamento", o formulário já abre com o serviço selecionado.
 *    option → id de uma opção da etapa 1 (veja quote.ts)
 *    label  → texto exato que vai na mensagem do WhatsApp
 *
 *  `icon` usa nomes do Lucide (https://lucide.dev/icons).
 *  Textos podem usar {city} e {region} — são trocados pelos dados de company.ts.
 * ============================================================================
 */

export type ServiceFaq = { q: string; a: string };

export type ServicePage = {
  /** H1 da página. */
  h1: string;
  /** <title> da página (até ~60 caracteres). */
  seoTitle: string;
  /** Meta description (até ~155 caracteres). */
  seoDescription: string;
  intro: string;
  image: { src: string; alt: string };
  benefits: { icon: string; title: string; text: string }[];
  whenTitle: string;
  when: string[];
  signsTitle: string;
  signs: string[];
  steps: { title: string; text: string }[];
  faq: ServiceFaq[];
};

export type Service = {
  id: string;
  slug?: string;
  icon: string;
  title: string;
  description: string;
  quote: { option: string; label: string };
  page?: ServicePage;
};

export const services: Service[] = [
  {
    id: 'instalacao',
    slug: 'instalacao-ar-condicionado',
    icon: 'wrench',
    title: 'Instalação de ar-condicionado',
    description:
      'Instalação segura e profissional para garantir eficiência e maior vida útil do equipamento.',
    quote: { option: 'instalacao', label: 'Instalação' },
    page: {
      h1: 'Instalação de ar-condicionado em {city}',
      seoTitle: 'Instalação de Ar-Condicionado em {city}',
      seoDescription:
        'Instalação de ar-condicionado split e inverter em {region}, com avaliação do local, infraestrutura correta e teste final. Orçamento pelo WhatsApp.',
      intro:
        'Uma instalação bem feita define quanto o aparelho vai gelar, quanto vai gastar de energia e quanto tempo vai durar. Avaliamos o ambiente, indicamos a melhor posição para as unidades e entregamos o equipamento testado.',
      image: { src: '/images/galeria/instalacao-split-sala.svg', alt: 'Técnico instalando ar-condicionado split na parede de uma sala' },
      benefits: [
        { icon: 'gauge', title: 'Rendimento correto', text: 'Tubulação, vácuo e fixação dentro do que o fabricante pede para o aparelho entregar a potência indicada.' },
        { icon: 'zap', title: 'Menos consumo', text: 'Posição e dimensionamento adequados evitam que o compressor trabalhe além do necessário.' },
        { icon: 'shield-check', title: 'Mais segurança', text: 'Ligação elétrica dedicada e suportes firmes para a evaporadora e a condensadora.' },
        { icon: 'sparkles', title: 'Obra limpa', text: 'Proteção de móveis e piso durante o serviço e ambiente organizado ao final.' },
      ],
      whenTitle: 'Quando chamar para instalação',
      when: [
        'Compra de um aparelho novo (split, hi-wall ou inverter)',
        'Mudança de casa, apartamento ou sala comercial',
        'Troca de um aparelho antigo por um modelo mais econômico',
        'Reforma ou mudança de posição das unidades',
      ],
      signsTitle: 'Sinais de uma instalação mal feita',
      signs: [
        'Água pingando da evaporadora',
        'Aparelho que não gela o ambiente mesmo no máximo',
        'Barulho ou vibração na condensadora',
        'Disjuntor desarmando quando o ar liga',
        'Gelo na tubulação ou nas conexões',
      ],
      steps: [
        { title: 'Avaliação', text: 'Entendemos o ambiente, a potência do aparelho e o melhor trajeto para a tubulação.' },
        { title: 'Instalação', text: 'Fixação das unidades, tubulação, dreno, parte elétrica e vácuo no sistema.' },
        { title: 'Teste e orientação', text: 'Ligamos, medimos o funcionamento e explicamos os cuidados de uso.' },
      ],
      faq: [
        { q: 'Vocês instalam aparelho comprado em loja ou pela internet?', a: 'Sim. Instalamos aparelhos de qualquer marca. Envie o modelo e a potência (BTUs) pelo WhatsApp para recebermos o orçamento certo.' },
        { q: 'Quanto tempo demora uma instalação?', a: 'Uma instalação padrão costuma ser feita no mesmo dia. O tempo varia conforme a distância entre as unidades, a altura e a necessidade de passar tubulação por dentro da parede.' },
        { q: 'O material de instalação está incluso?', a: 'O orçamento informa tudo o que será usado (tubulação de cobre, cabos, suportes e dreno). Você sabe o valor completo antes de agendar.' },
        { q: 'Preciso de um ponto elétrico exclusivo?', a: 'O ideal é que o aparelho tenha circuito próprio. Na avaliação verificamos a parte elétrica e indicamos se é preciso algum ajuste.' },
      ],
    },
  },
  {
    id: 'limpeza',
    slug: 'limpeza-ar-condicionado',
    icon: 'sparkles',
    title: 'Limpeza e higienização',
    description:
      'Remoção de sujeira, poeira e resíduos acumulados para melhorar a qualidade do ar e o desempenho.',
    quote: { option: 'limpeza', label: 'Limpeza' },
    page: {
      h1: 'Limpeza de ar-condicionado em {city}',
      seoTitle: 'Limpeza de Ar-Condicionado em {city}',
      seoDescription:
        'Limpeza e higienização de ar-condicionado em {region}. Remoção de poeira, fungos e mau cheiro, com o aparelho funcionando melhor. Orçamento pelo WhatsApp.',
      intro:
        'Com o uso, filtro, serpentina e turbina acumulam poeira e umidade. O resultado é cheiro ruim, ar menos gelado e conta de energia mais alta. A higienização remove essa sujeira e devolve o desempenho do aparelho.',
      image: { src: '/images/galeria/limpeza-evaporadora.svg', alt: 'Evaporadora de ar-condicionado aberta durante higienização com bolsa coletora' },
      benefits: [
        { icon: 'wind', title: 'Ar mais limpo', text: 'Remoção de poeira, fungos e bactérias acumulados no filtro, na serpentina e na turbina.' },
        { icon: 'thermometer-snowflake', title: 'Gela melhor', text: 'Com a serpentina limpa, a troca de calor volta a acontecer como deveria.' },
        { icon: 'zap', title: 'Menos energia', text: 'Aparelho sujo trabalha mais para chegar na temperatura. Limpo, ele desliga o compressor antes.' },
        { icon: 'droplets', title: 'Sem mau cheiro', text: 'Acaba com o cheiro de mofo que aparece quando o aparelho liga.' },
      ],
      whenTitle: 'Com que frequência limpar',
      when: [
        'Residências: a cada 6 meses, ou antes se o uso for diário',
        'Comércios e escritórios: a cada 3 meses, em média',
        'Clínicas, consultórios e ambientes sensíveis: conforme o plano de manutenção',
        'Sempre que o aparelho ficar muito tempo desligado',
      ],
      signsTitle: 'Sinais de que o aparelho precisa de limpeza',
      signs: [
        'Cheiro de mofo ou de "guardado" ao ligar',
        'Ar saindo mais fraco ou menos gelado',
        'Pontos pretos nas aletas de saída de ar',
        'Água pingando da evaporadora',
        'Crises de rinite ou alergia mais frequentes em casa',
      ],
      steps: [
        { title: 'Proteção do ambiente', text: 'Instalamos a bolsa coletora e protegemos parede, móveis e piso.' },
        { title: 'Higienização completa', text: 'Lavagem do filtro, serpentina, bandeja, dreno e turbina com produtos próprios.' },
        { title: 'Teste e entrega', text: 'Montagem, teste de funcionamento e ambiente limpo ao final.' },
      ],
      faq: [
        { q: 'Quanto tempo demora a limpeza?', a: 'Em média de 1 a 2 horas por aparelho, dependendo do modelo, do nível de sujeira e do acesso à unidade.' },
        { q: 'Suja a casa?', a: 'Não. Usamos bolsa coletora para a água e a sujeira, e protegemos a área ao redor do aparelho.' },
        { q: 'Precisa tirar o aparelho da parede?', a: 'Na higienização padrão, não. A limpeza é feita com o aparelho instalado.' },
        { q: 'A limpeza da condensadora (unidade externa) está inclusa?', a: 'Pode ser incluída. Informe no pedido de orçamento se deseja a limpeza da unidade externa também.' },
      ],
    },
  },
  {
    id: 'preventiva',
    slug: 'manutencao-ar-condicionado',
    icon: 'calendar-check',
    title: 'Manutenção preventiva',
    description:
      'Revisões periódicas para reduzir falhas, consumo excessivo e gastos inesperados.',
    quote: { option: 'manutencao', label: 'Manutenção preventiva' },
    page: {
      h1: 'Manutenção de ar-condicionado em {city}',
      seoTitle: 'Manutenção de Ar-Condicionado em {city}',
      seoDescription:
        'Manutenção preventiva e corretiva de ar-condicionado em {region}. Diagnóstico, reparo, carga de gás e planos para empresas. Orçamento pelo WhatsApp.',
      intro:
        'A manutenção preventiva encontra o problema antes de o aparelho parar. A corretiva resolve quando ele já parou. Atendemos os dois casos, em residências, comércios e empresas com vários equipamentos.',
      image: { src: '/images/galeria/manutencao-condensadoras.svg', alt: 'Técnico fazendo manutenção preventiva em condensadoras de ar-condicionado' },
      benefits: [
        { icon: 'activity', title: 'Menos paradas', text: 'Revisões periódicas identificam desgaste antes de virar defeito.' },
        { icon: 'circle-dollar-sign', title: 'Gasto previsível', text: 'Pequenos ajustes custam menos que trocar peças danificadas.' },
        { icon: 'gauge', title: 'Desempenho medido', text: 'Verificação de pressão, corrente elétrica e temperatura de saída do ar.' },
        { icon: 'clipboard-check', title: 'Histórico do aparelho', text: 'Registro do que foi feito em cada visita — útil para empresas com vários equipamentos.' },
      ],
      whenTitle: 'O que entra na manutenção',
      when: [
        'Limpeza de filtros, serpentina e dreno',
        'Verificação de pressão do gás refrigerante',
        'Medição de corrente e conferência das conexões elétricas',
        'Inspeção da condensadora, ventiladores e suportes',
        'Relatório do estado do aparelho e recomendações',
      ],
      signsTitle: 'Sinais de que o aparelho precisa de manutenção',
      signs: [
        'O aparelho liga, mas não gela',
        'Barulhos diferentes na unidade interna ou externa',
        'Luz piscando ou código de erro no display',
        'Conta de energia subiu sem mudança no uso',
        'Gelo na tubulação ou na serpentina',
      ],
      steps: [
        { title: 'Diagnóstico', text: 'Verificamos o aparelho e explicamos o problema encontrado.' },
        { title: 'Orçamento claro', text: 'Você aprova o serviço sabendo o que será feito e quanto custa.' },
        { title: 'Reparo e teste', text: 'Executamos o serviço e testamos o funcionamento antes de sair.' },
      ],
      faq: [
        { q: 'Qual a diferença entre manutenção preventiva e corretiva?', a: 'A preventiva é feita com o aparelho funcionando, para evitar defeitos. A corretiva é o reparo de um problema que já aconteceu, como falta de gás, peça queimada ou vazamento.' },
        { q: 'De quanto em quanto tempo fazer a preventiva?', a: 'Em residências, a cada 6 meses é uma boa referência. Em comércios e empresas com uso intenso, o ideal costuma ser trimestral ou mensal, conforme o plano.' },
        { q: 'Vocês fazem carga de gás?', a: 'Sim. Antes de completar o gás, verificamos se existe vazamento — sem corrigir o vazamento, o gás volta a faltar.' },
        { q: 'Atendem empresas com vários aparelhos?', a: 'Sim. Montamos um cronograma de visitas para todos os equipamentos e mantemos o histórico de cada um.' },
      ],
    },
  },
  {
    id: 'corretiva',
    icon: 'settings',
    title: 'Manutenção corretiva',
    description: 'Diagnóstico e reparo de problemas no equipamento.',
    quote: { option: 'manutencao', label: 'Manutenção corretiva' },
  },
  {
    id: 'gas-diagnostico',
    icon: 'gauge',
    title: 'Carga de gás e diagnóstico',
    description: 'Avaliação técnica para identificar problemas de refrigeração e desempenho.',
    quote: { option: 'manutencao', label: 'Carga de gás e diagnóstico' },
  },
  {
    id: 'empresarial',
    icon: 'building-2',
    title: 'Climatização empresarial',
    description:
      'Atendimento para escritórios, lojas, clínicas, restaurantes e empresas com múltiplos equipamentos.',
    quote: { option: 'empresa', label: 'Climatização empresarial' },
  },
];

/** Serviços que possuem página própria. */
export const servicePages = services.filter(
  (s): s is Service & { slug: string; page: ServicePage } => Boolean(s.slug && s.page),
);

/** Link de cada serviço: página própria quando existe; senão, a página da empresa (empresarial) ou a lista. */
export function serviceHref(service: Service): string {
  if (service.slug && service.page) return `/servicos/${service.slug}`;
  if (service.id === 'empresarial') return '/empresas';
  return '/servicos';
}
