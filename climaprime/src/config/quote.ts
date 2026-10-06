/**
 * ============================================================================
 *  FORMULÁRIO "MONTE SEU ORÇAMENTO"
 * ============================================================================
 *  Etapas, opções e o modelo da mensagem enviada ao WhatsApp.
 *  Tudo acontece no navegador: nenhum dado vai para servidor
 *  (exceto se o Firebase estiver ligado em integrations.ts — aí o pedido
 *  também é salvo como lead no Firestore, sem atrasar o WhatsApp).
 * ============================================================================
 */

export type QuoteOption = {
  id: string;
  label: string;
  /** Texto que vai na mensagem (se diferente do label). */
  messageLabel?: string;
  icon?: string;
  hint?: string;
};

export const quote = {
  title: 'Monte seu orçamento em menos de 1 minuto',
  subtitle:
    'Responda 5 perguntas rápidas. No final, abrimos o WhatsApp com a mensagem pronta — é só enviar.',

  steps: {
    service: {
      question: 'Qual serviço você precisa?',
      options: [
        { id: 'instalacao', label: 'Instalação', icon: 'wrench', hint: 'Aparelho novo ou troca' },
        { id: 'limpeza', label: 'Limpeza', icon: 'sparkles', hint: 'Higienização completa' },
        { id: 'manutencao', label: 'Manutenção', icon: 'settings', hint: 'Preventiva ou conserto' },
        { id: 'empresa', label: 'Empresa', messageLabel: 'Atendimento para empresa', icon: 'building-2', hint: 'Vários aparelhos ou contrato' },
        { id: 'nao-sei', label: 'Ainda não sei', messageLabel: 'Ainda não sei — preciso de orientação', icon: 'circle-help', hint: 'Ajudamos a identificar' },
      ] as QuoteOption[],
    },
    quantity: {
      question: 'Quantos aparelhos?',
      options: [
        { id: '1', label: '1' },
        { id: '2', label: '2' },
        { id: '3', label: '3' },
        { id: '4+', label: '4 ou mais', messageLabel: '4 ou mais' },
        { id: 'nao-sei', label: 'Não sei', messageLabel: 'Não sei informar' },
      ] as QuoteOption[],
    },
    place: {
      question: 'Qual o tipo do local?',
      options: [
        { id: 'residencia', label: 'Residência', icon: 'house', hint: 'Casa ou apartamento' },
        { id: 'comercio', label: 'Comércio', icon: 'store', hint: 'Loja, clínica, salão' },
        { id: 'empresa', label: 'Empresa', icon: 'building', hint: 'Escritório, indústria' },
      ] as QuoteOption[],
    },
    location: {
      question: 'Qual a sua cidade ou bairro?',
      label: 'Cidade ou bairro',
      placeholder: 'Ex.: Setor Bueno, Goiânia',
      help: 'Usamos para confirmar o atendimento na sua região.',
      /** Quantos atalhos (cidades/bairros de company.ts) mostrar abaixo do campo. */
      quickPicks: 6,
    },
    name: {
      question: 'Como podemos te chamar?',
      label: 'Seu nome',
      placeholder: 'Digite seu nome',
      help: 'Só para personalizar o atendimento.',
    },
  },

  submitLabel: 'Solicitar orçamento no WhatsApp',
  successTitle: 'Pedido pronto!',
  successText: 'Abrimos o WhatsApp com a sua mensagem. Agora é só tocar em enviar.',
  fallbackText: 'O WhatsApp não abriu?',

  /**
   * Inclui a origem da visita (utm_source / utm_campaign) no fim da mensagem.
   * Útil para saber qual campanha gerou o orçamento. false para ocultar.
   */
  includeOriginInMessage: true,

  /** Linhas da mensagem. Campos vazios são removidos automaticamente. */
  message: {
    greeting: 'Olá! Encontrei vocês pelo site e gostaria de solicitar um orçamento.',
    labels: {
      service: 'Serviço',
      quantity: 'Quantidade de aparelhos',
      place: 'Local',
      location: 'Cidade/Bairro',
      name: 'Nome',
      origin: 'Origem',
    },
    closing: 'Gostaria de saber valores e disponibilidade.',
  },
};

export type QuoteConfig = typeof quote;
