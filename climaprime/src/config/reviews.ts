/**
 * ============================================================================
 *  AVALIAÇÕES — ⚠️ DADOS DE DEMONSTRAÇÃO
 * ============================================================================
 *  As avaliações abaixo são FICTÍCIAS e servem só para mostrar o layout.
 *  Antes de publicar para um cliente real, substitua pelas avaliações reais
 *  (Google, Instagram, WhatsApp — com autorização do cliente) e mude
 *  `company.demoMode` para false em company.ts.
 *
 *  Nunca publique avaliações inventadas como se fossem reais.
 *  `source` é opcional: 'Google', 'Instagram', 'WhatsApp'...
 * ============================================================================
 */

export type Review = {
  name: string;
  location: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  service?: string;
  source?: string;
};

export const reviewsSection = {
  title: 'Quem contrata recomenda',
  subtitle: 'O que clientes de residências, comércios e empresas falam do atendimento.',
  /** Link para o perfil com as avaliações reais (Google, por exemplo). Vazio = oculto. */
  moreReviewsUrl: '',
  moreReviewsLabel: 'Ver todas as avaliações no Google',
};

export const reviews: Review[] = [
  {
    name: 'Marcos A.',
    location: 'Goiânia - GO',
    rating: 5,
    service: 'Limpeza',
    text: 'Atendimento excelente. Solicitei uma limpeza e conseguiram me atender rapidamente.',
  },
  {
    name: 'Fernanda M.',
    location: 'Aparecida de Goiânia - GO',
    rating: 5,
    service: 'Instalação',
    text: 'Instalação muito organizada e equipe muito profissional.',
  },
  {
    name: 'Carlos R.',
    location: 'Goiânia - GO',
    rating: 5,
    service: 'Manutenção empresarial',
    text: 'Fizeram a manutenção dos aparelhos da empresa e o atendimento foi muito bom.',
  },
  {
    name: 'Juliana P.',
    location: 'Senador Canedo - GO',
    rating: 5,
    service: 'Limpeza',
    text: 'O ar estava com cheiro ruim e depois da higienização ficou outro. Deixaram tudo limpo, nem parecia que tinha tido serviço.',
  },
  {
    name: 'Ricardo S.',
    location: 'Goiânia - GO',
    rating: 5,
    service: 'Manutenção corretiva',
    text: 'Meu aparelho parou de gelar. Explicaram o problema, passaram o valor antes e resolveram no mesmo dia.',
  },
  {
    name: 'Patrícia L.',
    location: 'Trindade - GO',
    rating: 5,
    service: 'Manutenção preventiva',
    text: 'Tenho uma clínica com quatro aparelhos e agora a manutenção é programada. Não preciso mais me preocupar com isso.',
  },
];
