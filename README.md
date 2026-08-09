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

## Google Analytics (GA4)

Copie `.env.example` para `.env` e preencha o ID de medição:

```
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

O ID fica em **Admin > Fluxos de dados > Web** no GA4. Sem a variável, nenhum script
do Google é carregado e todos os eventos viram no-op — por isso o padrão em
desenvolvimento é deixar vazio, para não misturar testes com os dados reais. Como a
variável é lida em build, é preciso rebuildar depois de alterá-la.

Eventos enviados (`src/analytics.ts`):

| Evento | Quando | Parâmetros |
| --- | --- | --- |
| `whatsapp_cta_click` | Qualquer CTA que abre o modal de orçamento | `cta_intent` |
| `generate_lead` | Formulário enviado (evento recomendado do GA4) | `cta_intent`, `form_variant`, `tem_data`, `tem_convidados`, `rodizio` |
| `view_menu` | Cardápio aberto | `menu_name` |
| `whatsapp_direct_click` | Link direto de WhatsApp (topo, contato, rodapé) | `link_url` |
| `email_click` | Link `mailto:` | `link_url` |
| `maps_click` | Link do Google Maps | `link_url` |

Marque `generate_lead` como conversão no GA4 (**Admin > Eventos**) para medir o funil
até o WhatsApp.

### Consentimento (LGPD)

O `gtag.js` só é baixado depois de consentimento explícito — antes disso nenhum script
de terceiro entra na página e nenhum cookie é gravado. O banner (`ConsentBanner`) aparece
na primeira visita quando há ID configurado; "Recusar" e "Aceitar" têm o mesmo peso
visual e a mesma área de toque, como a lei exige de uma escolha livre.

A decisão fica em `localStorage` na chave `kawai:consentimento-analytics` e pode ser
revista a qualquer momento pelo botão **Preferências de cookies** no rodapé. Ao aceitar,
o Consent Mode v2 é configurado negando tudo por padrão e liberando apenas
`analytics_storage` — publicidade permanece negada, já que medição de audiência é o
único uso declarado no banner.

Sem `VITE_GA_MEASUREMENT_ID` não há coleta, então o banner e o botão do rodapé nem são
renderizados.

### Política de privacidade

Fica em `/politica-de-privacidade`, linkada no rodapé de todas as páginas. É uma rota
real: link direto e refresh funcionam porque o Express devolve o `index.html` em
qualquer caminho. O `router.ts` cobre as duas páginas sem trazer biblioteca de rotas.

O texto foi escrito a partir do que o site de fato coleta — inclusive o detalhe de que
o formulário não envia nada para servidor próprio, só monta a mensagem do WhatsApp.
**Ainda assim é um documento base e precisa de revisão jurídica antes de publicar.**
Faltam, por não estarem disponíveis no projeto: razão social e CNPJ, nome do encarregado
(DPO) exigido pelo artigo 41 da LGPD, e os prazos de retenção efetivamente praticados.

## Estrutura

```
├── index.html                 # entrada Vite, metadados e fontes Fredoka + Inter
├── vite.config.ts             # plugins React e Tailwind CSS v4
├── server/index.js            # servidor Express que serve o build de /dist
└── src/
    ├── App.tsx                # alterna entre a landing e a política de privacidade
    ├── analytics.ts           # carga condicional do GA4 e disparo de eventos
    ├── router.ts              # roteamento mínimo das duas páginas, sem dependência
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
        ├── PrivacyPolicy       # página /politica-de-privacidade
        ├── ConsentBanner       # consentimento LGPD que libera o analytics
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
