/**
 * ============================================================================
 *  DADOS DA EMPRESA — o arquivo mais importante do template
 * ============================================================================
 *
 *  Para adaptar o site para outra empresa, comece por aqui. Nome, contato,
 *  cidade, regiões atendidas, horário e cores são lidos por TODOS os
 *  componentes, páginas, mensagens de WhatsApp, SEO e JSON-LD.
 *
 *  Ordem sugerida (detalhes no README):
 *    1. este arquivo (company.ts)
 *    2. services.ts      → serviços e páginas de serviço
 *    3. reviews.ts       → avaliações reais do cliente
 *    4. gallery.ts       → fotos reais de trabalhos
 *    5. content.ts       → textos institucionais (só se quiser ajustar)
 *    6. integrations.ts  → Analytics, GTM, Meta Pixel e Firebase
 *
 *  ATENÇÃO: ClimaPrime é uma empresa FICTÍCIA usada para demonstração.
 *  Todos os dados abaixo são de exemplo e devem ser substituídos.
 * ============================================================================
 */

export const company = {
  /** Nome completo (aparece no rodapé, SEO e JSON-LD). */
  name: 'ClimaPrime Climatização',
  /** Nome curto (usado em textos como "Por que escolher a ClimaPrime?"). */
  shortName: 'ClimaPrime',
  /** Artigo usado antes do nome curto nos textos ("a ClimaPrime" / "o ArFrio"). */
  article: 'a' as 'a' | 'o',

  /**
   * Logo. Enquanto `image` for null, o site desenha uma logo provisória em
   * código (ícone + nome). Para usar a logo real do cliente, coloque o arquivo
   * em /public/images/ e informe o caminho, ex.: '/images/logo.svg'.
   * `imageOnDark` é opcional (versão clara, usada no rodapé escuro).
   */
  logo: {
    image: null as string | null,
    imageOnDark: null as string | null,
    width: 168,
    height: 40,
    /** Texto da logo provisória: wordmark em duas partes + descrição menor. */
    wordmarkStart: 'Clima',
    wordmarkEnd: 'Prime',
    descriptor: 'Climatização',
  },

  /**
   * MODO DEMONSTRAÇÃO
   * true  → exibe avisos discretos de "empresa fictícia" e "avaliações
   *          ilustrativas". Use enquanto o template estiver com dados de exemplo.
   * false → remove os avisos. Mude para false SOMENTE depois de colocar
   *          dados, avaliações e fotos reais do cliente.
   */
  demoMode: true,

  /** Endereço público do site. Troque pelo domínio final (sem barra no fim). */
  url: 'https://climaprime.netlify.app',

  /** Frase curta que resume o que a empresa faz (SEO e rodapé). */
  description:
    'Instalação, limpeza e manutenção de ar-condicionado com atendimento rápido em Goiânia e região.',

  contact: {
    /** WhatsApp só com números: 55 + DDD + número. */
    whatsapp: '5562900000000',
    whatsappDisplay: '(62) 90000-0000',
    /** Telefone para ligação (formato internacional para o link tel:). */
    phone: '+5562900000000',
    phoneDisplay: '(62) 90000-0000',
    /** Deixe vazio ('') para não exibir e-mail em lugar nenhum. */
    email: '',
  },

  social: {
    instagram: {
      handle: 'climaprimeclimatizacao',
      url: 'https://www.instagram.com/climaprimeclimatizacao',
    },
    /** Deixe vazio para ocultar. */
    facebook: '',
  },

  location: {
    city: 'Goiânia',
    state: 'GO',
    stateName: 'Goiás',
    /** Usado em frases como "Atendimento em Goiânia e região". */
    regionShort: 'Goiânia e região',
    regionLong: 'Goiânia e região metropolitana',
    /**
     * Endereço. Empresa fictícia: só cidade/estado. Para um cliente real,
     * preencha rua, bairro e CEP — eles entram no rodapé, na página de contato
     * e no JSON-LD. Campos vazios são ignorados.
     */
    address: {
      street: '',
      district: '',
      postalCode: '',
    },
    /** Coordenadas aproximadas (centro de Goiânia) — usadas no JSON-LD. */
    geo: { lat: -16.6869, lng: -49.2648 },
    /**
     * Mapa. `mapEmbedUrl` vazio = gera automaticamente um mapa da busca
     * `mapQuery`. Para usar o pin exato do Google Maps: Google Maps → Compartilhar
     * → Incorporar um mapa → copie só a URL do atributo src e cole aqui.
     */
    mapQuery: 'Goiânia, GO',
    mapEmbedUrl: '',
    /** Link "Abrir no Google Maps" (perfil da empresa no Google, se houver). */
    mapLink: 'https://www.google.com/maps/search/?api=1&query=Goi%C3%A2nia%2C%20GO',
  },

  /** Horário de atendimento (rodapé, contato e JSON-LD). */
  hours: [
    { label: 'Segunda a sexta', open: '08:00', close: '18:00', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] },
    { label: 'Sábado', open: '08:00', close: '13:00', days: ['Saturday'] },
  ],
  hoursNote: 'Domingos e feriados: mensagens respondidas no próximo dia útil.',

  /** Regiões atendidas. Aparecem na home, na página de áreas, no orçamento e no SEO. */
  serviceAreas: {
    cities: [
      { name: 'Goiânia', note: 'Todas as regiões' },
      { name: 'Aparecida de Goiânia', note: 'Atendimento regular' },
      { name: 'Senador Canedo', note: 'Atendimento regular' },
      { name: 'Trindade', note: 'Sob agendamento' },
      { name: 'Goianira', note: 'Sob agendamento' },
    ],
    neighborhoods: [
      'Setor Bueno',
      'Jardim Goiás',
      'Setor Marista',
      'Setor Oeste',
      'Setor Universitário',
      'Setor Sul',
      'Jardim América',
      'Parque Amazônia',
    ],
  },

  /**
   * Cores da marca. Elas viram variáveis CSS e se propagam pelo site todo.
   * Mantenha bom contraste: `primary` recebe texto branco nos botões.
   */
  theme: {
    /** Botões principais e links (texto branco por cima — contraste AA). */
    primary: '#0369A1',
    /** Hover dos botões e fundos escuros de destaque. */
    primaryDeep: '#075985',
    /** Azul vibrante para ícones, detalhes e destaques. */
    brand: '#0284C7',
    /** Azul claro para brilhos, gráficos e detalhes sobre fundo escuro. */
    brandLight: '#38BDF8',
    /** Texto principal. */
    ink: '#0F172A',
    /** Texto secundário. */
    muted: '#526077',
    /** Fundo alternado das seções. */
    surface: '#F8FAFC',
    /** Botões de WhatsApp (verde escuro para manter contraste com texto branco). */
    whatsapp: '#15803D',
    whatsappHover: '#166534',
    /** Cor da barra do navegador no celular. */
    browserBar: '#075985',
  },

  /** Mensagem padrão dos botões de WhatsApp que não são o orçamento. */
  whatsappMessages: {
    default: 'Olá! Encontrei vocês pelo site e gostaria de solicitar um orçamento.',
    specialist: 'Olá! Encontrei vocês pelo site e gostaria de falar com um especialista sobre meu ar-condicionado.',
    commercial:
      'Olá! Encontrei vocês pelo site e gostaria de solicitar uma proposta comercial de climatização para minha empresa.',
    question: 'Olá! Encontrei vocês pelo site e tenho uma dúvida: ',
    area: 'Olá! Encontrei vocês pelo site e gostaria de saber se vocês atendem a minha região. Meu bairro/cidade é: ',
  },
};

export type Company = typeof company;
