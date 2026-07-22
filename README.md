# Landing Page — Buffet Kawai

Landing page institucional e comercial do Buffet Kawai, reconstruída com foco em clareza,
conversão no WhatsApp, responsividade e uso responsável do conteúdo disponível.

**Stack:** React 19 + TypeScript + Vite + Tailwind CSS v4 + Lucide Icons e Node.js + Express para
servir o build de produção. O Tailwind usa o plugin oficial para Vite e detecção automática de
classes.

## Como rodar

```bash
npm install

# desenvolvimento (hot reload)
npm run dev

# produção: build + servidor Node/Express na porta 3000
npm start

# só servir um build já existente
npm run serve
```

A porta do servidor de produção pode ser alterada com a variável `PORT` (ex.: `PORT=8080 npm run serve`).

## Estrutura

```
├── index.html                 # entrada Vite, metadados e fontes Fredoka + Inter
├── vite.config.ts             # plugins React e Tailwind CSS v4
├── server/index.js            # servidor Express que serve o build de /dist
└── src/
    ├── App.tsx                # monta a landing page em fluxo contínuo
    ├── index.css              # import Tailwind, tema da marca e base acessível
    ├── ui.ts                  # utilitários compartilhados de container, botões e cards
    ├── assets/                # fotos reais, fallbacks e imagens ilustrativas otimizadas
    ├── data/site.ts           # contatos, horários, cardápios e depoimentos (conteúdo real do buffet)
    └── components/
        ├── Navbar              # barra fixa, menu mobile e comportamento por direção do scroll
        ├── Hero                # proposta de valor, CTAs, foto real e provas rápidas
        ├── About               # manifesto e história do buffet
        ├── Structure           # estrutura e experiência
        ├── Food                # alimentação, números e acesso aos 3 cardápios
        ├── MenuModal           # cardápio acessível em duas páginas com abertura animada
        ├── Fun                 # diversão com informação comercial responsável
        ├── Gallery             # mosaico editorial de ambientes e experiências
        ├── Process             # orçamento em três passos
        ├── Depoimentos         # avaliações reais de clientes
        ├── FAQ                 # respostas confirmadas em acordeão nativo
        ├── Orcamento           # CTA e formulário opcional que prepara a mensagem do WhatsApp
        ├── Contato             # endereço, horários, canais e mapa
        ├── Footer              # navegação, contatos, redes e parceria
        ├── Icon                # mapeamento central do sistema Lucide + marca do WhatsApp
        └── SectionHeading      # títulos editoriais reutilizáveis
```

## Conteúdo e destinos (mapeados do site atual buffetkawai.com.br)

- WhatsApp (11) 96111-2083 é o canal principal: promoções, parcerias e o formulário de
  orçamento abrem conversa com mensagem pré-preenchida.
- E-mail contato@buffetkawai.com.br.
- Endereço: Rua Relíquia, 565 – Casa Verde – São Paulo – SP (mapa embutido na seção Contato).
- O formulário de orçamento do site antigo (orca_completo.php, via iframe) está fora do ar
  ("Não foi possível conectar ao serviço do Banco de dados") — por isso o orçamento aqui é
  próprio e envia via WhatsApp, sem depender de backend.

## Direção visual e conteúdo

- Paleta preservada: laranja, amarelo, verde, creme e marrom da marca.
- Tipografia reduzida a Fredoka (títulos/CTAs) e Inter (texto/navegação).
- Componentes estilizados com utilitários Tailwind; não existem folhas CSS isoladas por seção.
- Os cardápios abrem em um modal responsivo no formato de livro, com navegação por teclado e CTA
  contextual para o WhatsApp.
- Uma única faixa curva marcante na hero; as demais seções se conectam por ritmo, cor e espaço,
  sem repetir divisores orgânicos.
- A foto da família na hero é um ativo real já existente no projeto.
- As imagens complementares de estrutura, alimentação e diversão são ilustrativas, estão
  identificadas na interface e possuem AVIF com fallback JPEG.
- Não foram inventados capacidade, estacionamento, formas de pagamento, decoração ou atrações
  específicas; esses pontos são direcionados para confirmação com a equipe.

## Qualidade

```bash
npm run lint
npm run build
```

Os breakpoints de validação são 360, 390, 768, 1024, 1280, 1440 e 1920 px. A página inclui
metadados Open Graph, JSON-LD de negócio local, foco visível, navegação mobile acessível e suporte
a `prefers-reduced-motion`.
