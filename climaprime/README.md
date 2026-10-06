# ClimaPrime — template de site para empresas de climatização

Site completo e focado em gerar orçamentos pelo WhatsApp. Feito para ser **adaptado para outra empresa em poucos minutos**.

> ClimaPrime Climatização é uma **empresa fictícia**. Telefone, avaliações e fotos são dados de demonstração.

- **Stack:** [Astro 5](https://astro.build) (gera HTML estático) + CSS próprio + TypeScript. Sem framework de UI no navegador: cerca de 10 KB (gzip) de JS na home.
- **Hospedagem:** qualquer hospedagem estática (Netlify, Vercel, Cloudflare Pages, Hostinger…).
- **Banco de dados (opcional):** Firebase Firestore guarda cada pedido de orçamento e libera o painel `/admin`.

---

## 1. Publicar na Netlify

### Opção A — arrastar e soltar (sem instalar nada)
1. Acesse <https://app.netlify.com/drop>.
2. Arraste o arquivo **`climaprime-netlify-deploy.zip`** (ou a pasta `dist/` descompactada).
3. Pronto. Para trocar o endereço: *Site configuration → Change site name*.

Depois de definir o endereço final, ajuste `url` em `src/config/company.ts`, gere o build de novo e reenvie (o endereço alimenta canonical, sitemap e Open Graph).

### Opção B — via GitHub (recomendado para manutenção)
1. Suba esta pasta para um repositório no GitHub.
2. Netlify → *Add new site → Import an existing project* → escolha o repositório.
3. Se o template estiver numa subpasta, informe **Base directory: `climaprime`**. Build `npm run build`, publish `dist` (já vêm do `netlify.toml`).
4. A cada alteração no GitHub, a Netlify publica sozinha.

### Rodar no computador (opcional)
```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # gera dist/
npm run preview   # serve o dist/
```
Requer Node.js 18.20+ (recomendado 20).

---

## 2. Trocar a empresa (ex.: ClimaPrime → ArFrio Climatização)

**Toda informação importante está em `src/config/`.** Componentes não têm texto fixo de empresa.

| Ordem | Arquivo | O que muda |
|---|---|---|
| 1 | `company.ts` | Nome, WhatsApp, telefone, Instagram, cidade, regiões/bairros, endereço, mapa, horário, **cores**, logo, URL do site, `demoMode` |
| 2 | `services.ts` | Serviços (cards) e conteúdo das páginas `/servicos/...` |
| 3 | `reviews.ts` | Avaliações reais do cliente |
| 4 | `gallery.ts` | Fotos de trabalhos e antes/depois |
| 5 | `content.ts` | Textos institucionais, FAQ, menus, SEO (já usam os dados de `company.ts`) |
| 6 | `quote.ts` | Etapas e mensagem do formulário de orçamento |
| 7 | `integrations.ts` | Google Analytics, Tag Manager, Meta Pixel, Firebase |

Na prática, para uma empresa da mesma região, **só `company.ts` já troca nome, contato, cores, SEO, JSON-LD e todas as mensagens de WhatsApp**. Textos como "Por que escolher a ClimaPrime?" usam `shortName` e `article` automaticamente.

### Checklist antes de entregar ao cliente
- [ ] `company.ts`: dados reais, `url` com o domínio final, `demoMode: false`
- [ ] `reviews.ts`: avaliações reais (com autorização) — **nunca publique avaliações inventadas**
- [ ] `gallery.ts`: fotos reais dos trabalhos
- [ ] Logo do cliente (abaixo)
- [ ] `public/og-image.png` (1200×630) com a marca do cliente
- [ ] `public/favicon.svg` e `public/apple-touch-icon.png`
- [ ] FAQ (`content.ts`): formas de pagamento e garantia conforme o cliente

### Logo
A logo atual é desenhada em código (ícone + nome). Para usar a do cliente, coloque o arquivo em `public/images/` e preencha em `company.ts`:
```ts
logo: { image: '/images/logo.svg', imageOnDark: '/images/logo-branca.svg', width: 168, height: 40, ... }
```

### Cores
Em `company.ts → theme`. `primary` recebe texto branco nos botões: mantenha contraste (teste em <https://webaim.org/resources/contrastchecker/>, mínimo 4.5:1). Os tons claros e sombras são derivados automaticamente.

### Fotos
As imagens atuais são **ilustrações provisórias** (SVG) em `public/images/`. Para trocar por fotos reais:
- Galeria: `public/images/galeria/` — JPG/WebP, proporção 4:3, ~1600 px, até ~300 KB (comprima em <https://squoosh.app>).
- Hero: `content.ts → hero.image` (retrato, ~960×1120).
- Antes/depois: duas fotos com **o mesmo enquadramento** (`gallery.ts → beforeAfter`).
- Páginas de serviço: `services.ts → page.image`.

Todas as imagens abaixo da primeira dobra já usam `loading="lazy"`.

### Mapa
`company.ts → location.mapQuery` (busca) ou `mapEmbedUrl` (Google Maps → Compartilhar → Incorporar um mapa → copie só a URL do `src`). O mapa só carrega quando o visitante clica, para não pesar a página.

---

## 3. Estrutura

```
src/
├── config/          ← TUDO que muda de uma empresa para outra
├── components/
│   ├── layout/      Header (menu mobile), Footer, WhatsAppFloat, MobileCTA, Analytics
│   ├── sections/    Hero, TrustBar, Services, QuoteWizard, Benefits, CustomerTypes,
│   │                Gallery, BeforeAfter, Reviews, ServiceAreas, AttentionCTA,
│   │                HowItWorks, FAQ, MapSection, FinalCTA, ServiceDetail, AreasCompact
│   └── ui/          Button, Icon, Logo, SectionHeader, PageHero, Stars, Breadcrumbs
├── layouts/         BaseLayout (SEO, Open Graph, JSON-LD, tema)
├── lib/             whatsapp, mensagem do orçamento, JSON-LD, ícones, Firebase (leads)
├── scripts/         JS do navegador: orçamento, galeria, carrossel, FAQ, UTM, eventos
├── styles/          global.css (design system)
└── pages/           rotas
```

### Rotas
| Rota | Conteúdo |
|---|---|
| `/` | Landing page completa (funciona sozinha) |
| `/servicos` | Todos os serviços |
| `/servicos/instalacao-ar-condicionado` | Página de SEO local + orçamento |
| `/servicos/limpeza-ar-condicionado` | idem |
| `/servicos/manutencao-ar-condicionado` | idem |
| `/empresas` | Climatização para empresas + proposta comercial |
| `/areas-atendidas`, `/sobre`, `/contato` | Páginas institucionais |
| `/admin` | Painel de leads (só com Firebase; `noindex`) |
| `/sitemap-index.xml`, `/robots.txt` | Gerados no build |

Nova página de serviço: adicione um item com `slug` e `page` em `services.ts` — a rota, o sitemap e o JSON-LD são criados sozinhos. Use `{city}` e `{region}` nos textos.

Ícones: qualquer nome de <https://lucide.dev/icons> (ex.: `'snowflake'`), resolvidos no build (zero JS).

---

## 4. Formulário de orçamento → WhatsApp

5 etapas (serviço, aparelhos, local, cidade/bairro, nome), com validação, botão voltar, barra de progresso e estado de sucesso. Ao final, abre `wa.me` com a mensagem pronta:

```
Olá! Encontrei vocês pelo site e gostaria de solicitar um orçamento.

Serviço: Limpeza
Quantidade de aparelhos: 2
Local: Residência
Cidade/Bairro: Setor Bueno
Nome: Rafael

Gostaria de saber valores e disponibilidade.

Origem: Instagram (campanha: verao)
```

- Botão "Solicitar orçamento" de um card de serviço abre o formulário **com o serviço já selecionado**.
- Nenhum backend: tudo no navegador. Com Firebase ligado, o pedido também é salvo (sem atrasar o WhatsApp).

### Origem da campanha (UTM)
Links como `https://site.com/?utm_source=instagram&utm_campaign=verao` ficam guardados durante a visita (mesmo trocando de página) e entram:
- na mensagem do WhatsApp (`Origem: ...`) — desligue com `quote.includeOriginInMessage = false`;
- nos eventos de analytics;
- no lead do Firebase.

---

## 5. Analytics, Tag Manager e Meta Pixel

Preencha em `src/config/integrations.ts` (ou nas variáveis de ambiente do Netlify — veja `.env.example`). Vazio = script não carrega.

Eventos disparados (para dataLayer/GTM, GA4 e Pixel ao mesmo tempo):

| Evento | Quando |
|---|---|
| `whatsapp_click` | Qualquer botão de WhatsApp (Pixel: `Contact`) |
| `quote_started` | Primeira interação com o formulário |
| `quote_step` | Avanço de etapa |
| `quote_completed` | Envio do orçamento (Pixel: `Lead`) |
| `service_click` | "Solicitar orçamento" de um serviço |
| `commercial_quote_click` | "Solicitar proposta comercial" |
| `quote_cta_click` | Botões que levam ao formulário |
| `phone_click`, `instagram_click` | Links de telefone e Instagram |

Para testar: `PUBLIC_ANALYTICS_DEBUG=true` mostra cada evento no console. Para criar eventos novos, adicione `data-track="nome_evento"` em qualquer link/botão.

---

## 6. Firebase (leads + painel) — opcional

1. <https://console.firebase.google.com> → criar projeto.
2. **Firestore Database** → criar banco (modo produção). Aba **Regras**: cole `firestore.rules` e publique.
3. **Authentication** → ativar **E-mail/senha** → *Users → Add user* (e-mail e senha da empresa). Copie o **UID** do usuário.
4. Firestore → criar coleção **`admins`** → documento com ID = **UID** copiado (pode ficar com um campo qualquer, ex. `nome: "Dono"`).
5. Authentication → *Settings → User actions*: desmarque **"Enable create (sign-up)"** (impede cadastros pelo site).
6. *Configurações do projeto → Seus apps → Web* → copie as chaves para `integrations.ts → firebase` (ou variáveis `PUBLIC_FIREBASE_*`).
7. Authentication → *Settings → Authorized domains*: adicione o domínio do Netlify.
8. Gere o build de novo e publique.

Resultado: cada orçamento vira um documento em `leads` e o painel **`/admin`** lista os pedidos com busca, filtro, status (novo, em contato, orçamento enviado, fechado, perdido) e exportação CSV.

Sem Firebase, o site funciona 100% — o painel apenas mostra como ativar.

---

## 7. SEO, desempenho e acessibilidade (já configurado)

- `<title>`, meta description, canonical, Open Graph e Twitter Card por página
- JSON-LD: `HVACBusiness` (LocalBusiness) com endereço, horário, área atendida e serviços; `Service`, `FAQPage` e `BreadcrumbList` nas páginas internas — marcado no código onde substituir (`src/lib/schema.ts`). Avaliações de demonstração **não** entram no schema.
- `sitemap-index.xml` e `robots.txt` com a URL de `company.url`
- Um único H1 por página; H2 por seção
- HTML estático, fontes locais (sem Google Fonts), ícones inline, imagens com `width/height` e lazy load, mapa sob demanda
- Teclado e leitores de tela: skip link, foco visível, menu com trap de foco e Esc, accordion com `aria-expanded`, slider antes/depois com setas, lightbox com `<dialog>`
- Respeita "reduzir movimento" do sistema
- Celular: barra inferior (WhatsApp + Orçamento) que some no rodapé e no formulário; botão flutuante no desktop com "Solicite seu orçamento" ao passar o mouse

---

## 8. Regras do template

- Texto objetivo, que responde dúvidas reais. Nada de "excelência que transforma".
- Não inventar CNPJ, certificações, selos, número de clientes ou anos de mercado.
- Dados de demonstração ficam marcados no código e, com `demoMode: true`, sinalizados no site.
