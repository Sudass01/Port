/**
 * ============================================================================
 *  TEXTOS DO SITE
 * ============================================================================
 *  Os textos já usam os dados de company.ts (nome, cidade, região). Trocando a
 *  empresa em company.ts, estes textos se ajustam sozinhos. Edite aqui apenas
 *  se quiser mudar o discurso.
 *
 *  Regra do template: texto objetivo, que responde dúvidas reais do cliente.
 *  Nada de números inventados, selos, certificações ou "anos de mercado"
 *  que a empresa não possa comprovar.
 * ============================================================================
 */
import { company } from './company';

const short = company.shortName;
const theShort = `${company.article} ${short}`; // "a ClimaPrime"
const city = company.location.city;
const region = company.location.regionShort;

export const navigation = [
  { label: 'Início', href: '/#inicio' },
  { label: 'Serviços', href: '/#servicos' },
  { label: 'Por que escolher', href: '/#diferenciais' },
  { label: 'Projetos', href: '/#projetos' },
  { label: 'Avaliações', href: '/#avaliacoes' },
  { label: 'Áreas atendidas', href: '/#areas' },
  { label: 'FAQ', href: '/#faq' },
];

export const hero = {
  eyebrow: `Ar-condicionado em ${region}`,
  title: 'Climatização profissional para sua casa ou empresa',
  highlight: `Instalação, limpeza e manutenção de ar-condicionado em ${region}.`,
  subtitle: 'Atendimento rápido, serviço especializado e orçamento fácil pelo WhatsApp.',
  primaryCta: 'Solicitar orçamento',
  secondaryCta: 'Conhecer serviços',
  trust: ['Atendimento residencial e empresarial', 'Profissionais especializados', region],
  image: {
    src: '/images/hero-tecnico.svg',
    alt: 'Técnico de climatização instalando um ar-condicionado split na parede de uma sala',
  },
  cards: {
    rating: { stars: 5, title: 'Clientes satisfeitos', text: 'Residências e empresas' },
    fast: { title: 'Atendimento rápido', text: 'Solicite pelo WhatsApp' },
    temperature: { value: '23°', label: 'Conforto ideal', mode: 'Modo econômico' },
    badge: 'Atendendo hoje',
  },
};

export const trustBar = [
  { icon: 'house', label: 'Atendimento residencial' },
  { icon: 'store', label: 'Atendimento comercial' },
  { icon: 'building-2', label: 'Atendimento empresarial' },
  { icon: 'message-circle', label: 'Orçamento pelo WhatsApp' },
  { icon: 'map-pin', label: region },
];

export const servicesSection = {
  eyebrow: 'Serviços',
  title: 'Soluções completas em climatização',
  subtitle:
    'Do aparelho da sala de casa aos contratos de manutenção de empresas com dezenas de equipamentos: instalamos, limpamos e mantemos seu ar-condicionado funcionando.',
};

export const benefitsSection = {
  eyebrow: 'Diferenciais',
  title: `Por que escolher ${theShort}?`,
  subtitle: 'O que você pode esperar do primeiro contato até depois do serviço.',
  items: [
    { icon: 'timer', title: 'Atendimento rápido', text: 'Resposta pelo WhatsApp e agendamento conforme a sua urgência.' },
    { icon: 'hard-hat', title: 'Profissionais especializados', text: 'Técnicos treinados para instalação, higienização e diagnóstico.' },
    { icon: 'sparkles', title: 'Serviço limpo e organizado', text: 'Proteção do ambiente durante o serviço e tudo arrumado no final.' },
    { icon: 'building-2', title: 'Residencial e empresarial', text: 'Do apartamento ao escritório com vários aparelhos.' },
    { icon: 'message-circle', title: 'Orçamento sem complicação', text: 'Você manda as informações e recebe o valor antes de agendar.' },
    { icon: 'headset', title: 'Suporte após o serviço', text: 'Ficou alguma dúvida depois? É só chamar no mesmo WhatsApp.' },
  ],
};

export const customerTypesSection = {
  eyebrow: 'Para quem atendemos',
  title: 'Atendimento para cada tipo de cliente',
  subtitle: 'O serviço muda conforme o ambiente. A forma de atender também.',
  items: [
    {
      id: 'residencial',
      icon: 'house',
      title: 'Residencial',
      text: 'Casas e apartamentos que precisam de conforto e ar limpo.',
      items: ['Instalação', 'Limpeza', 'Manutenção'],
      cta: { label: 'Pedir orçamento', type: 'quote' as const, service: '' },
    },
    {
      id: 'comercial',
      icon: 'store',
      title: 'Comercial',
      text: 'Ambientes com clientes circulando, que não podem ficar sem ar.',
      items: ['Lojas', 'Consultórios', 'Salões', 'Restaurantes', 'Escritórios'],
      cta: { label: 'Pedir orçamento', type: 'quote' as const, service: '' },
    },
    {
      id: 'empresarial',
      icon: 'building-2',
      title: 'Empresarial',
      text: 'Empresas com vários aparelhos e necessidade de rotina de manutenção.',
      items: ['Múltiplos equipamentos', 'Manutenção preventiva', 'Contratos recorrentes', 'Atendimento programado'],
      cta: { label: 'Solicitar proposta comercial', type: 'commercial' as const, service: 'empresa' },
    },
  ],
};

export const areasSection = {
  eyebrow: 'Onde atendemos',
  title: `Atendimento em ${region}`,
  subtitle: `Atendemos ${city} e cidades da região metropolitana. Confira algumas das regiões:`,
  citiesTitle: 'Cidades',
  neighborhoodsTitle: `Alguns bairros em ${city}`,
  notFoundTitle: 'Não encontrou sua região?',
  notFoundText: 'Fale conosco para verificar disponibilidade.',
  notFoundCta: 'Verificar pelo WhatsApp',
};

export const attentionCta = {
  title: 'Seu ar-condicionado precisa de atenção?',
  text: 'Não espere um pequeno problema virar um gasto maior. Converse com nossa equipe e solicite seu orçamento.',
  cta: 'Falar com um especialista',
  signs: ['Não está gelando', 'Pingando água', 'Cheiro ruim', 'Barulho estranho'],
};

export const howItWorks = {
  eyebrow: 'Como funciona',
  title: 'Do pedido ao ar funcionando em 3 passos',
  steps: [
    { icon: 'message-circle', title: 'Você solicita seu orçamento', text: 'Pelo formulário ou direto no WhatsApp.' },
    { icon: 'clipboard-list', title: 'Nossa equipe entende sua necessidade', text: 'Tiramos dúvidas e passamos o valor.' },
    { icon: 'calendar-check', title: 'Combinamos o melhor atendimento para você', text: 'Data e horário que funcionam para você.' },
  ],
};

export const faqSection = {
  eyebrow: 'Dúvidas frequentes',
  title: 'Perguntas frequentes',
  subtitle: 'Não encontrou sua dúvida? Pergunte pelo WhatsApp.',
};

/** Perguntas da home (as páginas de serviço têm FAQ próprio em services.ts). */
export const faq = [
  {
    q: 'Vocês atendem minha região?',
    a: `Atendemos ${city} e região metropolitana, incluindo ${company.serviceAreas.cities
      .slice(1)
      .map((c) => c.name)
      .join(', ')}. Se o seu bairro ou cidade não estiver na lista, chame no WhatsApp que confirmamos a disponibilidade.`,
  },
  {
    q: 'Quanto custa uma limpeza de ar-condicionado?',
    a: 'O valor depende do tipo e da potência do aparelho (BTUs), da altura e do acesso ao equipamento e da quantidade de aparelhos. Envie essas informações pelo WhatsApp e passamos o valor antes de agendar.',
  },
  {
    q: 'Vocês fazem instalação?',
    a: 'Sim. Instalamos aparelhos split, hi-wall e inverter de qualquer marca, em residências, comércios e empresas, inclusive aparelhos comprados em loja ou pela internet.',
  },
  {
    q: 'Quanto tempo demora uma limpeza?',
    a: 'Em média de 1 a 2 horas por aparelho. O tempo muda conforme o modelo, o nível de sujeira e o acesso à unidade.',
  },
  {
    q: 'Vocês atendem empresas?',
    a: 'Sim. Atendemos escritórios, lojas, clínicas, restaurantes, academias e escolas, com visitas avulsas ou plano de manutenção programada para vários aparelhos.',
  },
  {
    q: 'Vocês trabalham com manutenção preventiva?',
    a: 'Sim. A preventiva inclui limpeza, verificação de gás, parte elétrica e funcionamento geral. Para empresas, montamos um cronograma de visitas.',
  },
  {
    q: 'O orçamento é gratuito?',
    a: 'Sim. O orçamento pelo WhatsApp é gratuito e sem compromisso. Se for necessária uma visita técnica para avaliar o local, isso é informado antes.',
  },
  {
    q: 'Quais formas de pagamento são aceitas?',
    a: 'Pix, cartão de débito, cartão de crédito e dinheiro. Para empresas, consulte as condições de faturamento.',
  },
  {
    q: 'Possuem garantia de serviço?',
    a: 'Sim. Todo serviço tem garantia. O prazo e as condições são informados no orçamento, de acordo com o tipo de serviço.',
  },
];

export const mapSection = {
  eyebrow: 'Localização',
  title: 'Onde estamos',
  text: `Base em ${city} - ${company.location.state}, com atendimento no local em ${region}.`,
  mapButton: 'Carregar mapa',
  openInMaps: 'Abrir no Google Maps',
};

export const finalCta = {
  title: 'Pronto para deixar seu ambiente mais confortável?',
  text: 'Solicite seu orçamento e fale diretamente com nossa equipe.',
  primary: 'Solicitar orçamento',
  secondary: 'WhatsApp',
};

export const footer = {
  about: `Instalação, limpeza e manutenção de ar-condicionado para residências, comércios e empresas em ${region}.`,
  demoNotice: 'Empresa fictícia utilizada para demonstração.',
};

/** Página /empresas */
export const businessPage = {
  seoTitle: `Climatização para Empresas em ${city}`,
  seoDescription: `Manutenção preventiva, atendimento programado e contratos de climatização para empresas em ${region}. Solicite uma proposta comercial.`,
  eyebrow: 'Para empresas',
  h1: `Climatização para empresas em ${city}`,
  intro:
    'Ar-condicionado parado em empresa significa cliente desconfortável, equipe rendendo menos e conserto de urgência. Organizamos a manutenção dos seus aparelhos para que isso não aconteça.',
  audiences: [
    { icon: 'briefcase-business', label: 'Escritórios' },
    { icon: 'utensils', label: 'Restaurantes' },
    { icon: 'stethoscope', label: 'Clínicas' },
    { icon: 'shopping-bag', label: 'Lojas' },
    { icon: 'dumbbell', label: 'Academias' },
    { icon: 'graduation-cap', label: 'Escolas' },
    { icon: 'factory', label: 'Empresas em geral' },
  ],
  offers: [
    { icon: 'calendar-check', title: 'Manutenção preventiva', text: 'Limpeza, verificação de gás e parte elétrica em intervalos definidos para o seu uso.' },
    { icon: 'calendar-clock', title: 'Atendimento programado', text: 'Visitas no horário que não atrapalha a operação: antes da abertura, à noite ou aos sábados.' },
    { icon: 'layers', title: 'Múltiplos aparelhos', text: 'Inventário dos equipamentos e histórico do que foi feito em cada um.' },
    { icon: 'repeat', title: 'Contrato recorrente', text: 'Custo mensal previsível e prioridade no atendimento corretivo.' },
  ],
  howTitle: 'Como montamos a proposta',
  how: [
    { title: 'Levantamento', text: 'Quantidade, modelos, potência e local de cada aparelho.' },
    { title: 'Plano de manutenção', text: 'Frequência das visitas conforme o uso de cada ambiente.' },
    { title: 'Proposta comercial', text: 'Valores, cronograma e condições por escrito.' },
  ],
  faq: [
    { q: 'Vocês atendem fora do horário comercial?', a: 'Podemos programar visitas antes da abertura, à noite ou aos sábados, para não interromper o atendimento aos seus clientes.' },
    { q: 'Emitem nota fiscal?', a: 'Informe a necessidade de nota fiscal no pedido de proposta para que as condições sejam incluídas no orçamento.' },
    { q: 'Qual o mínimo de aparelhos para contrato?', a: 'Não existe um mínimo fixo. Avaliamos cada empresa e propomos o formato que fizer sentido — avulso ou recorrente.' },
    { q: 'Atendem empresas com unidades em mais de uma cidade?', a: `Sim, dentro da área de atendimento em ${region}. Envie a lista de endereços no pedido de proposta.` },
  ],
  cta: 'Solicitar proposta comercial',
};

/** Página /sobre */
export const aboutPage = {
  seoTitle: `Sobre ${theShort}`,
  seoDescription: `Conheça ${theShort}: instalação, limpeza e manutenção de ar-condicionado em ${region}, com atendimento pelo WhatsApp.`,
  eyebrow: 'Sobre nós',
  h1: `Sobre ${theShort}`,
  paragraphs: [
    `${company.name} atende residências, comércios e empresas em ${region} com instalação, limpeza, manutenção preventiva e corretiva de ar-condicionado.`,
    'Nosso jeito de trabalhar é simples: entender o problema, explicar o que precisa ser feito, passar o valor antes de começar e deixar o ambiente limpo ao terminar.',
    'O atendimento começa pelo WhatsApp. Você manda as informações do aparelho e do local, recebe o orçamento e escolhe o melhor dia para o serviço.',
  ],
  values: [
    { icon: 'message-circle', title: 'Clareza', text: 'Você sabe o que vai ser feito e quanto custa antes de aprovar.' },
    { icon: 'clock', title: 'Pontualidade', text: 'Horário combinado é horário cumprido. Se houver imprevisto, avisamos.' },
    { icon: 'sparkles', title: 'Cuidado com o ambiente', text: 'Proteção de móveis e piso durante o serviço e limpeza no final.' },
    { icon: 'headset', title: 'Pós-atendimento', text: 'Dúvidas depois do serviço são respondidas no mesmo canal.' },
  ],
};

/** Página /contato */
export const contactPage = {
  seoTitle: 'Contato e Orçamento',
  seoDescription: `Fale com ${theShort} pelo WhatsApp e solicite seu orçamento de instalação, limpeza ou manutenção de ar-condicionado em ${region}.`,
  eyebrow: 'Contato',
  h1: 'Fale com a nossa equipe',
  intro: 'O jeito mais rápido de falar com a gente é pelo WhatsApp. Se preferir, monte o orçamento abaixo e a mensagem já vai pronta.',
};

/** Página /areas-atendidas */
export const areasPage = {
  seoTitle: `Áreas Atendidas em ${region}`,
  seoDescription: `Cidades e bairros atendidos por ${theShort} em ${region}. Instalação, limpeza e manutenção de ar-condicionado.`,
  eyebrow: 'Áreas atendidas',
  h1: `Ar-condicionado em ${region}`,
  intro: `Atendemos residências, comércios e empresas em ${city} e cidades vizinhas. Veja as regiões e confirme a disponibilidade para o seu endereço.`,
};

/** Página /servicos */
export const servicesPage = {
  seoTitle: `Serviços de Ar-Condicionado em ${city}`,
  seoDescription: `Instalação, limpeza, manutenção preventiva e corretiva, carga de gás e climatização empresarial em ${region}.`,
  eyebrow: 'Serviços',
  h1: `Serviços de ar-condicionado em ${city}`,
  intro: 'Escolha o serviço para ver detalhes ou solicite o orçamento direto pelo WhatsApp.',
};

export const seo = {
  /** <title> e description da home. */
  homeTitle: `${company.name} | Ar-Condicionado em ${city}`,
  homeDescription: `Instalação, limpeza e manutenção de ar-condicionado em ${region}. Solicite seu orçamento pelo WhatsApp.`,
  /** Sufixo do <title> das páginas internas. */
  titleSuffix: ` | ${short}`,
  /** Imagem de compartilhamento (1200x630). */
  ogImage: '/og-image.png',
  locale: 'pt_BR',
};
