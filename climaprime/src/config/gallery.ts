/**
 * ============================================================================
 *  GALERIA DE TRABALHOS + ANTES/DEPOIS
 * ============================================================================
 *  As imagens atuais são ILUSTRAÇÕES PROVISÓRIAS (public/images/galeria).
 *  Para usar fotos reais do cliente:
 *    1. Coloque as fotos em public/images/galeria/ (JPG ou WebP, ~1600px de
 *       largura, até ~300 KB cada — use squoosh.app para comprimir).
 *    2. Troque `image` pelo caminho da foto e ajuste título, local e `alt`.
 *  `category` precisa ser um dos ids de `galleryCategories`.
 *  Proporção recomendada: 4:3 (ex.: 1600x1200).
 * ============================================================================
 */

export const galleryCategories = [
  { id: 'instalacao', label: 'Instalação' },
  { id: 'limpeza', label: 'Limpeza' },
  { id: 'manutencao', label: 'Manutenção' },
  { id: 'empresarial', label: 'Empresarial' },
] as const;

export type GalleryCategory = (typeof galleryCategories)[number]['id'];

export type GalleryItem = {
  image: string;
  alt: string;
  title: string;
  description: string;
  location: string;
  category: GalleryCategory;
  width?: number;
  height?: number;
};

export const gallerySection = {
  title: 'Alguns dos nossos serviços',
  subtitle: 'Instalações, limpezas e manutenções feitas em residências, comércios e empresas da região.',
};

export const gallery: GalleryItem[] = [
  {
    image: '/images/galeria/instalacao-split-sala.svg',
    alt: 'Técnico em escada instalando ar-condicionado split na parede de uma sala de estar',
    title: 'Instalação Split Inverter',
    description: 'Instalação em sala de estar com tubulação embutida.',
    location: 'Setor Bueno - Goiânia',
    category: 'instalacao',
  },
  {
    image: '/images/galeria/limpeza-evaporadora.svg',
    alt: 'Evaporadora aberta durante a higienização, com bolsa coletora instalada',
    title: 'Limpeza completa',
    description: 'Higienização de evaporadora com bolsa coletora.',
    location: 'Jardim Goiás - Goiânia',
    category: 'limpeza',
  },
  {
    image: '/images/galeria/manutencao-escritorio.svg',
    alt: 'Escritório com vários aparelhos de ar-condicionado e técnico conferindo o funcionamento',
    title: 'Manutenção empresarial',
    description: 'Revisão programada de aparelhos em escritório.',
    location: 'Aparecida de Goiânia',
    category: 'empresarial',
  },
  {
    image: '/images/galeria/instalacao-condensadora.svg',
    alt: 'Técnico fixando condensadora de ar-condicionado em suporte na parede externa',
    title: 'Instalação de condensadora',
    description: 'Unidade externa fixada em suporte reforçado.',
    location: 'Setor Marista - Goiânia',
    category: 'instalacao',
  },
  {
    image: '/images/galeria/manutencao-condensadoras.svg',
    alt: 'Técnico medindo pressão em condensadoras instaladas lado a lado',
    title: 'Manutenção preventiva',
    description: 'Medição de pressão e limpeza de condensadoras.',
    location: 'Setor Oeste - Goiânia',
    category: 'manutencao',
  },
  {
    image: '/images/galeria/higienizacao-consultorio.svg',
    alt: 'Consultório com ar-condicionado recém-higienizado',
    title: 'Higienização em consultório',
    description: 'Limpeza periódica em ambiente de saúde.',
    location: 'Setor Universitário - Goiânia',
    category: 'limpeza',
  },
  {
    image: '/images/galeria/diagnostico-gas.svg',
    alt: 'Manômetros conectados à condensadora durante diagnóstico e carga de gás',
    title: 'Diagnóstico e carga de gás',
    description: 'Teste de vazamento antes de completar o gás.',
    location: 'Senador Canedo',
    category: 'manutencao',
  },
  {
    image: '/images/galeria/climatizacao-loja.svg',
    alt: 'Loja climatizada com aparelhos de ar-condicionado instalados nas paredes',
    title: 'Climatização de loja',
    description: 'Instalação de três aparelhos em área de vendas.',
    location: 'Trindade',
    category: 'empresarial',
  },
];

/** Comparação antes/depois (slider). Use fotos com o MESMO enquadramento. */
export const beforeAfter = [
  {
    title: 'Evaporadora antes e depois da higienização',
    before: { image: '/images/antes-depois/evaporadora-antes.svg', label: 'Antes', alt: 'Serpentina da evaporadora suja, com poeira e manchas escuras' },
    after: { image: '/images/antes-depois/evaporadora-depois.svg', label: 'Depois', alt: 'Serpentina da evaporadora limpa após higienização profissional' },
    caption: 'Evaporadora antes da higienização × após higienização profissional',
  },
];
