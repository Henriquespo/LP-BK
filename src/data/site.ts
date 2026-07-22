export const CONTACT = {
  address: 'Rua Relíquia, 565 – Casa Verde – São Paulo – SP',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Buffet+Kawai+Rua+Rel%C3%ADquia+565+Casa+Verde+S%C3%A3o+Paulo',
  mapsEmbedUrl:
    'https://www.google.com/maps?q=Buffet+Kawai,+Rua+Rel%C3%ADquia,+565,+Casa+Verde,+S%C3%A3o+Paulo&output=embed',
  email: 'contato@buffetkawai.com.br',
  whatsapp: {
    display: '(11) 96111-2083',
    number: '5511961112083',
    href: 'https://api.whatsapp.com/send?phone=5511961112083',
  },
  hours: [
    { days: 'Segunda a quinta', time: '14:00 – 18:00 (agendar)' },
    { days: 'Sexta, sábado e domingo', time: 'Somente com agendamento' },
  ],
  social: {
    facebook: 'https://www.facebook.com/buffetkawai/',
    instagram: 'https://www.instagram.com/buffetkawai/',
    youtube: 'https://www.youtube.com/channel/UCnXN0KFf_isiaXF-kDZFl0w',
  },
} as const

export const NAV_ITEMS = [
  { label: 'O Buffet', href: '#buffet' },
  { label: 'Estrutura', href: '#estrutura' },
  { label: 'Cardápio', href: '#cardapio' },
  { label: 'Diversão', href: '#atracoes' },
  { label: 'Contato', href: '#contato' },
] as const

export const TRUST_ITEMS = [
  { icon: 'calendar', value: '+3.000', label: 'festas realizadas' },
  { icon: 'pizza', value: 'Rodízio', label: 'de pizzas e salgados' },
  { icon: 'play', value: 'Diversão', label: 'para todas as idades' },
] as const

export const STRUCTURE_HIGHLIGHTS = [
  { icon: 'calendar', title: '+3.000 festas', detail: 'Experiência construída em cada celebração.' },
  { icon: 'play', title: 'Diversão', detail: 'Brinquedos para diferentes idades.' },
  { icon: 'award', title: 'Experiência completa', detail: 'Alimentação e atendimento no mesmo lugar.' },
] as const

export const FOOD_FEATURES = [
  { icon: 'pizza', title: 'Pizzas fresquinhas', detail: 'Sabores variados servidos durante a festa.' },
  { icon: 'serving', title: 'Buffet completo', detail: 'Salgadinhos, massas e pratos quentes.' },
  { icon: 'drink', title: 'Bebidas e doces', detail: 'Refrigerantes, sucos, bolo e doces.' },
] as const

export const FUN_POINTS = [
  { title: 'Brincadeira durante a festa', detail: 'Um ambiente preparado para a criançada aproveitar cada momento.' },
  { title: 'Para diferentes idades', detail: 'Consulte a equipe sobre as atrações disponíveis para a sua data.' },
  { title: 'Equipe presente', detail: 'Atendimento atencioso para crianças, pais e convidados.' },
] as const

export const PROCESS_STEPS = [
  { icon: 'whatsapp', number: '1', title: 'Fale com a equipe', detail: 'Conte sua ideia e tire as primeiras dúvidas pelo WhatsApp.' },
  { icon: 'clipboard', number: '2', title: 'Escolha e personalize', detail: 'Defina a data, o cardápio e os detalhes da celebração.' },
  { icon: 'confetti', number: '3', title: 'Curta cada momento', detail: 'A equipe cuida da festa para você aproveitar sem preocupação.' },
] as const

export const FAQS = [
  {
    question: 'Quais opções de cardápio estão disponíveis?',
    answer:
      'O Buffet Kawai trabalha com Festa de Pizza, Macarronada e Pratos Quentes. Todos incluem salgadinhos, bebidas, bolo e doces conforme o cardápio apresentado no site.',
  },
  {
    question: 'Como funciona o rodízio de pizzas?',
    answer:
      'A Festa de Pizza reúne sabores variados, salgadinhos, refrigerantes e sucos. O cardápio completo pode ser consultado nesta página e confirmado com a equipe no orçamento.',
  },
  {
    question: 'Como faço para pedir um orçamento?',
    answer:
      'Você pode abrir uma conversa direta no WhatsApp ou preencher os detalhes da festa no formulário. A mensagem é preparada automaticamente para facilitar o atendimento.',
  },
  {
    question: 'Onde fica o Buffet Kawai?',
    answer: 'O buffet fica na Rua Relíquia, 565, Casa Verde, São Paulo – SP.',
  },
  {
    question: 'Como funciona o atendimento?',
    answer:
      'De segunda a quinta, o atendimento acontece das 14h às 18h com agendamento. Às sextas, sábados e domingos, o atendimento é realizado somente com agendamento.',
  },
] as const

export const STATS = [
  { value: 18, suffix: ' anos', label: 'de existência e experiência' },
  { value: 3000, prefix: '+', label: 'festas realizadas' },
  { value: 65, prefix: '+', suffix: ' mil', label: 'pizzas servidas aos convidados' },
  { value: 100, suffix: '%', label: 'foco na alimentação e no atendimento' },
] as const

export interface Menu {
  id: string
  name: string
  tagline: string
  highlight: string
  items: { group: string; detail: string }[]
}

export const MENUS: Menu[] = [
  {
    id: 'pizzas',
    name: 'Festa de Pizza',
    tagline: 'Rodízio de pizzas e salgados',
    highlight: 'O carro-chefe da casa',
    items: [
      {
        group: 'Pizzas',
        detail:
          'Queijos, Alho, Baiana, Brócolis, Caipira, Calabresa, Do Chef, Francesa, Frango, Margarita, Milho Verde, Mussarela, Palmito, Portuguesa e Toscana',
      },
      {
        group: 'Salgados',
        detail:
          'Bolinha de queijo, bolinha de carne, coxinha de frango, esfiha de carne, kibe e risole misto',
      },
      { group: 'Cortesia', detail: 'Refrigerantes e sucos à vontade' },
      { group: 'Doces e bolo', detail: 'Bolo da festa e doces para a criançada' },
    ],
  },
  {
    id: 'massas',
    name: 'Macarronada',
    tagline: 'Rodízio de massas e salgados',
    highlight: 'Para quem ama massa fresquinha',
    items: [
      {
        group: 'Massas',
        detail: 'Penne, gravata ou espaguete — com molho branco ou ao sugo',
      },
      {
        group: 'Salgados',
        detail:
          'Bolinha de queijo, bolinha de carne, coxinha de frango, esfiha de carne, kibe e risole misto',
      },
      { group: 'Cortesia', detail: 'Refrigerantes e sucos à vontade' },
      { group: 'Doces e bolo', detail: 'Bolo da festa e doces para a criançada' },
    ],
  },
  {
    id: 'pratos-quentes',
    name: 'Pratos Quentes',
    tagline: 'Rodízio de pratos quentes e salgados',
    highlight: 'Almoço ou jantar completo',
    items: [
      {
        group: 'Pratos quentes',
        detail: 'Carne assada, strogonoff de carne ou strogonoff de frango, com acompanhamentos',
      },
      {
        group: 'Salgados',
        detail:
          'Bolinha de queijo, bolinha de carne, coxinha de frango, esfiha de carne, kibe e risole misto',
      },
      { group: 'Cortesia', detail: 'Refrigerantes e sucos à vontade' },
      { group: 'Doces e bolo', detail: 'Bolo da festa e doces para a criançada' },
    ],
  },
]

export const TESTIMONIALS = [
  {
    quote:
      'Excelente equipe! Contratei para a festa do meu filho. Buffet excelente, ótimos brinquedos, salgados, pizzas, doces — tudo à vontade mesmo e com qualidade. Parabéns!',
    author: 'Tatiana Rivas Regis',
  },
  {
    quote:
      'Fizemos a festa do nosso filho, amamos o lugar. Funcionários prestativos, ambiente muito bom pras crianças brincarem. Se tudo der certo faremos outra festa lá!',
    author: 'Alan Reichardt',
  },
  {
    quote:
      'Muito bom, festa com pizza e salgado à vontade, brinquedos todos ativos e funcionando, atendimento excelente.',
    author: 'Rafael Castro',
  },
  {
    quote: 'Ótimo lugar, bom atendimento, o self-service é ótimo. Encantada com o divertimento!',
    author: 'Eliane Rocha',
  },
  {
    quote:
      'Ótimo local para festa infantil. Self-service no buffet com pizzas, salgadinhos e bebidas. Brinquedos para divertir a criançada.',
    author: 'Marco Silva',
  },
  {
    quote: 'Comida à vontade!! Bom atendimento.',
    author: 'Abnaan Pedroso',
  },
] as const
