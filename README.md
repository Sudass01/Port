# Rafael Toffoli — Portfólio / Hub profissional

Site pessoal completo em **Next.js 15 (App Router) + TypeScript + Tailwind CSS + Framer Motion**,
com painel administrativo em **Firebase** (autenticação, banco e upload de imagens).

Uma única URL reunindo desenvolvimento web, SaaS e sistemas, edição de vídeo, design, UI/UX,
projetos pessoais, currículo e contato — em português e inglês.

---

## 1. Rodando o projeto

> **Só quer publicar?** Pule para a [seção 9](#9-deploy-na-netlify-sem-instalar-nada-no-computador):
> dá para colocar o site no ar pela Netlify sem instalar nada. Rodar localmente é opcional,
> útil apenas para ver as mudanças antes de publicar.

```bash
npm install
npm run dev          # http://localhost:3000
```

Outros comandos:

```bash
npm run build        # build de produção
npm run start        # servir o build
npm run typecheck    # checagem de tipos
npm run lint         # ESLint
```

> Requer Node.js 18.18+ (recomendado 20+).

---

## 2. Primeiros 10 minutos — o que preencher

Na ordem, é isto que transforma o projeto no **seu** site:

| # | Arquivo | O que fazer |
|---|---|---|
| 1 | `src/data/site.ts` | Trocar tudo que está como `PREENCHER`: WhatsApp, GitHub, LinkedIn, Instagram, YouTube, URL final do site e o caminho do PDF do currículo. |
| 2 | `src/data/projects.ts` | Conferir os anos, ajustar textos e trocar as capas por imagens reais. |
| 3 | `src/data/resume.ts` | Confirmar os períodos em `experience` e preencher `education`. |
| 4 | `src/data/editing.ts` | Adicionar vídeos (ou cadastrar pelo painel). |
| 5 | `src/data/design.ts` | Adicionar peças de design (ou cadastrar pelo painel). |

**Regra do projeto:** qualquer link deixado como `PREENCHER` **não aparece no site**.
Nada de número inventado, cliente fictício ou depoimento falso — se o dado não existe, a seção
simplesmente não é exibida.

### Cor de destaque

Uma linha em `src/app/globals.css`:

```css
--accent: #4d7cfe;
```

### Selo "Disponível para projetos freelance"

`src/data/site.ts` → `availableForWork: true | false`.

---

## 3. Estrutura

```
src/
├── app/                      # rotas (App Router)
│   ├── layout.tsx            # fontes, metadados globais, providers
│   ├── page.tsx              # Home
│   ├── work/                 # /work e /work/[slug] (case studies)
│   ├── web/ saas/ editing/   # páginas por área
│   ├── design/ uiux/ projects/
│   ├── about/ resume/ contact/
│   ├── admin/                # painel (noindex)
│   ├── sitemap.ts robots.ts  # SEO
│   ├── icon.svg              # favicon
│   └── opengraph-image.png   # imagem de compartilhamento
│
├── components/               # componentes reutilizáveis
│   ├── Navbar, MobileMenu, Footer, SiteChrome, PageTransition
│   ├── Hero, Disciplines, SectionHeader, PageHero, CTA, EmptyState
│   ├── ProjectShowcase, ProjectCard, ProjectGrid, FilterBar
│   ├── CaseStudy, VideoCard, DesignGallery, Lightbox, Media
│   ├── Skills, Tools, Reveal, ContactForm, LanguageToggle
│   ├── pages/                # composição de cada rota
│   └── admin/                # painel administrativo
│
├── data/                     # >>> TODO O CONTEÚDO MORA AQUI <<<
│   ├── site.ts               # identidade, contato, navegação
│   ├── projects.ts           # projetos + case studies
│   ├── disciplines.ts        # as 5 áreas da home
│   ├── editing.ts            # vídeos e antes/depois
│   ├── design.ts             # peças de design
│   ├── uiux.ts               # estudos de UI/UX
│   ├── about.ts              # texto pessoal
│   └── resume.ts             # currículo
│
├── i18n/                     # PT/EN (provider + dicionário de interface)
└── lib/                      # tipos, Firebase, hooks de conteúdo, utils
```

---

## 4. Adicionando um projeto

Abra `src/data/projects.ts`, copie um objeto existente e ajuste:

```ts
{
  slug: 'nome-do-projeto',          // vira /work/nome-do-projeto
  title: 'Nome do Projeto',
  discipline: 'web',                // web | saas | editing | design | uiux | personal
  alsoIn: ['uiux'],                 // opcional: aparece também em outras áreas
  categoryLabel: { pt: 'Web Development / Varejo', en: 'Web Development / Retail' },
  year: '2026',
  featured: true,                   // aparece em "Projetos selecionados" na home
  order: 6,                         // menor = primeiro
  concept: false,                   // true mostra o selo "Projeto conceitual"
  summary: { pt: '…', en: '…' },    // frase curta (card)
  description: { pt: '…', en: '…' },// parágrafo (topo do case)
  tags: ['Web', 'Firebase'],
  cover: '/projects/nome.svg',
  gallery: ['/projects/nome-02.svg'],
  webKind: 'business',              // só para discipline: 'web'
  caseStudy: { /* opcional — veja os exemplos no arquivo */ },
}
```

Nada mais precisa ser alterado: home, `/work`, filtros, páginas de área, sitemap e metadados
passam a incluir o projeto automaticamente.

### Imagens

As capas em `public/projects/*.svg` são **placeholders** gerados (wireframes abstratos).
Troque por prints ou mockups reais — basta colocar o arquivo em `public/projects/` e apontar
o caminho em `cover`. Formatos recomendados: WebP ou PNG, proporção 16:10.

---

## 5. Painel administrativo (Firebase)

O painel fica em **`/admin`** e permite cadastrar projetos, vídeos e designs **com upload de
imagem**, além de ler as mensagens do formulário de contato.

### 5.1. Criar o projeto no Firebase

1. [console.firebase.google.com](https://console.firebase.google.com) → **Adicionar projeto**.
2. Em **Criação → Authentication**, ative o provedor **E-mail/senha**.
3. Em **Criação → Firestore Database**, crie o banco (modo produção).
4. Em **Criação → Storage**, ative o armazenamento.
5. Em **Configurações do projeto → Seus apps → Web (`</>`)**, registre um app e copie as chaves.

### 5.2. Variáveis de ambiente

Crie `.env.local` na raiz (use `.env.example` como base):

```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu-projeto
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu-projeto.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

Reinicie o `npm run dev` depois de criar o arquivo.

### 5.3. Criar o seu usuário

**Authentication → Users → Adicionar usuário** (e-mail + senha). É com ele que você entra em
`/admin`. Não existe cadastro aberto no site.

### 5.4. Regras de segurança

Copie o conteúdo de `firestore.rules` e `storage.rules` (na raiz do projeto) para as abas
**Regras** do Firestore e do Storage no console. Elas garantem que:

- qualquer pessoa **lê** projetos, vídeos e designs;
- só usuário autenticado **escreve**;
- qualquer visitante **cria** uma mensagem de contato, mas só você **lê**;
- upload aceita apenas imagens de até 8 MB.

### 5.5. Como o conteúdo se combina

O site renderiza primeiro os dados de `src/data/` (bom para SEO e para nunca ficar em branco) e
depois mescla o que existe no Firestore:

- **projeto com slug novo** → é adicionado;
- **projeto com slug já existente no código** → substitui o estático;
- **remover o documento no painel** → o projeto do código volta a valer.

No painel, a lista "No código" tem o botão **Editar aqui**, que carrega o projeto estático no
formulário — ao salvar, ele passa a ser gerenciado pelo painel.

Coleções usadas: `projects`, `videos`, `designs`, `messages`, `settings`.

### Sem Firebase

O site funciona normalmente sem nenhuma variável configurada. Nesse caso o `/admin` mostra as
instruções de configuração e o formulário de contato abre o e-mail já preenchido em vez de
gravar no banco.

---

## 6. Idiomas (PT / EN)

O seletor **PT / EN** fica no header (e no menu mobile). A escolha é salva no navegador.

- Textos de interface: `src/i18n/dictionary.ts`
- Conteúdo: todo campo `{ pt: '…', en: '…' }` nos arquivos de `src/data/`

Para adicionar um terceiro idioma, acrescente a chave no tipo `Localized`
(`src/lib/types.ts`) e no `LanguageProvider`.

---

## 7. Currículo em PDF

1. Coloque o arquivo em `public/`, por exemplo `public/rafael-toffoli-cv.pdf`.
2. Em `src/data/site.ts`:

```ts
resumePdf: {
  pt: '/rafael-toffoli-cv.pdf',
  en: '/rafael-toffoli-resume.pdf',
},
```

O botão de download só aparece quando o caminho está preenchido. A página `/resume` também tem
botão **Imprimir**, com folha de estilo própria para impressão em fundo branco.

---

## 8. SEO e performance

Já configurado:

- metadados por página, com `title` template e canonical;
- Open Graph e Twitter Card (`src/app/opengraph-image.png`);
- dados estruturados JSON-LD (`Person`) no layout;
- `sitemap.xml` e `robots.txt` gerados automaticamente (incluindo cada projeto);
- `/admin` marcado como `noindex`;
- fontes otimizadas via `next/font` (sem requisição externa em runtime);
- imagens locais via `next/image` (AVIF/WebP) e `loading="lazy"` nas remotas;
- HTML semântico, skip link, foco visível e respeito a `prefers-reduced-motion`.

Depois do deploy, defina a variável `NEXT_PUBLIC_SITE_URL` com o endereço real do site — ela
alimenta canonical, sitemap e Open Graph. Sem ela, vale o valor de `site.url` em
`src/data/site.ts`.

---

## 9. Deploy na Netlify (sem instalar nada no computador)

Este projeto tem uma etapa de build (é uma aplicação Next.js, não um HTML solto),
então o arrastar-e-soltar da Netlify não funciona diretamente. O caminho abaixo roda
**inteiro no navegador** — sem VS Code, sem Node, sem terminal — porque quem faz o build
é o servidor da Netlify.

### Passo 1 — Colocar o código no GitHub

1. Descompacte o `.zip` no seu computador (botão direito → Extrair).
2. Entre em [github.com](https://github.com) e crie a conta, se ainda não tiver.
3. Clique em **+** (canto superior direito) → **New repository**.
   - **Repository name:** `portfolio`
   - Marque **Private** se não quiser o código público.
   - **Não** marque "Add a README file".
   - **Create repository**.
4. Na tela seguinte, clique em **uploading an existing file**.
5. Abra a pasta descompactada, selecione **tudo que está dentro dela** e arraste para a
   área de upload. (Arraste o *conteúdo* da pasta, não a pasta em si.)
6. Espere a barra terminar e clique em **Commit changes**.

> Se aparecer aviso sobre arquivos ocultos (`.gitignore`, `.nvmrc`), pode ignorar —
> o `netlify.toml`, que é o importante, não é oculto.

### Passo 2 — Conectar na Netlify

1. Entre em [app.netlify.com](https://app.netlify.com) e faça login **com a conta do GitHub**.
2. **Add new site** → **Import an existing project** → **GitHub**.
3. Autorize a Netlify e escolha o repositório `portfolio`.
4. A Netlify preenche o build sozinha (ela lê o `netlify.toml`). Confira:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
5. **Deploy site**. O primeiro build leva de 2 a 4 minutos.

Pronto — o site já está no ar em um endereço tipo `nome-aleatorio.netlify.app`.
Em **Site configuration → Change site name** você troca para algo como
`rafael-toffoli.netlify.app`.

### Passo 3 — Variáveis de ambiente

Em **Site configuration → Environment variables → Add a variable**, adicione:

| Chave | Valor |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | o endereço final do site (ex.: `https://rafael-toffoli.netlify.app`) |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | do console do Firebase |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | do console do Firebase |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | do console do Firebase |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | do console do Firebase |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | do console do Firebase |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | do console do Firebase |

Estas variáveis entram no site **durante o build**. Depois de adicionar ou mudar
qualquer uma, vá em **Deploys → Trigger deploy → Clear cache and deploy site**.

As do Firebase são opcionais: sem elas o site funciona normalmente com os dados de
`src/data/`, só o painel `/admin` fica desligado.

### Passo 4 — Liberar o domínio no Firebase

Se você usa o painel, adicione o domínio da Netlify em
**Firebase → Authentication → Settings → Authorized domains**, senão o login em `/admin`
é bloqueado.

### Depois: editando sem programa nenhum

Você nunca mais precisa mexer em arquivo local. Para mudar textos ou adicionar projetos:

1. Abra o repositório no GitHub.
2. Navegue até o arquivo (ex.: `src/data/projects.ts`) e clique no **lápis**.
3. Edite e clique em **Commit changes**.
4. A Netlify detecta e republica sozinha em ~2 minutos.

E para projetos, vídeos e designs, o caminho mais rápido continua sendo o painel em
`/admin` — ali a mudança aparece na hora, sem novo deploy.

### Domínio próprio

**Domain management → Add a domain** e siga as instruções de DNS. Depois atualize
`NEXT_PUBLIC_SITE_URL` para o domínio novo e refaça o deploy.

### Deu erro no build?

Abra **Deploys → (o deploy vermelho) → Deploy log** e procure a linha que começa com
`Error:`. Os dois motivos mais comuns são arquivo que faltou no upload e variável de
ambiente escrita errada.

### Outras hospedagens

O mesmo repositório funciona na Vercel (`vercel.com/new` → importar do GitHub) e no
Cloudflare Pages, sem alterar nada do projeto.

## 10. Convenções do design system

| Token | Uso |
|---|---|
| `--bg` `#08090a` | fundo da página |
| `--elev` `--surface` | painéis e cards |
| `--fg` `--muted` `--dim` | hierarquia de texto |
| `--accent` `#4d7cfe` | **uma única** cor de destaque, só para ação e ênfase |

Classes utilitárias em `globals.css`: `.shell`, `.section`, `.display-xl/lg/md/sm`, `.lead`,
`.eyebrow`, `.mono-xs`, `.btn`, `.panel`, `.tag`, `.media`, `.link-underline`, `.grid-veil`.

Animação: `Reveal` (entrada no scroll), `RevealMask` (títulos), `PageTransition` (troca de rota).
Tudo desliga sozinho quando o sistema pede menos movimento.

---

## 11. Rotas

| Rota | Conteúdo |
|---|---|
| `/` | Hero, áreas de atuação, projetos selecionados, CTA |
| `/work` | Todos os projetos com filtros |
| `/work/[slug]` | Case study individual |
| `/web` | Web Development |
| `/saas` | SaaS & Systems (apresentados como produtos) |
| `/editing` | Video Editing + Antes/Depois |
| `/design` | Design |
| `/uiux` | UI/UX (rota independente) |
| `/projects` | Projetos pessoais |
| `/about` | Sobre |
| `/resume` | Currículo |
| `/contact` | Contato |
| `/admin` | Painel administrativo |
