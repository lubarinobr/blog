# Site Pessoal - Consultoria Empresarial

Um site estático profissional construído com Astro + React, focado em landing para consultorias e treinamentos corporativos com blog integrado.

## 🚀 Características

- **Astro SSG** com React Islands para interatividade
- **i18n** completo (Português, Inglês, Espanhol)
- **SEO otimizado** com Schema.org, Open Graph, Twitter Cards
- **Blog MDX** com frontmatter estruturado
- **Dark mode** com persistência
- **Performance** otimizada para Lighthouse 95+
- **Acessibilidade** AA compliant
- **Responsivo** e mobile-first

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
├── layouts/            # Layouts base
├── pages/              # Páginas do site
├── utils/              # Utilitários e helpers
├── types/              # Definições TypeScript
├── i18n/               # Traduções e configuração i18n
└── content/            # Conteúdo MDX do blog
    └── blog/           # Posts do blog organizados por slug
```

## 🛠️ Tecnologias

- **Astro** - Framework SSG
- **React** - Componentes interativos
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **MDX** - Conteúdo do blog
- **i18next** - Internacionalização

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## 📝 Como Criar um Post

### Usando o CLI

```bash
# Criar post em português
npm run new:post "Título do Post"

# Criar post em inglês
npm run new:post "Post Title" en

# Criar post em espanhol
npm run new:post "Título del Post" es
```

### Estrutura do Post

O CLI cria automaticamente a estrutura:

```
src/content/blog/slug-do-post/
└── index.pt.mdx
```

### Frontmatter

```yaml
---
title: "Título do Post"
description: "Descrição para SEO"
date: 2024-01-15
category: "Categoria"
tags: ["tag1", "tag2", "tag3"]
cover: "/images/blog/post-cover.jpg"
canonical: "https://consultoria-exemplo.com/blog/slug"
draft: false
locale: "pt"
---
```

### Campos Obrigatórios

- `title`: Título do post
- `description`: Descrição para SEO
- `date`: Data de publicação (YYYY-MM-DD)
- `category`: Categoria do post
- `locale`: Idioma (pt, en, es)

### Campos Opcionais

- `tags`: Array de tags
- `cover`: URL da imagem de capa
- `canonical`: URL canônica
- `draft`: Se true, não aparece no build

## 🌐 Internacionalização

### Adicionando Traduções

1. Edite os arquivos em `src/i18n/locales/[locale]/`
2. Adicione novas chaves nos arquivos JSON
3. Use `getTranslations()` nos componentes

### Estrutura de Traduções

```
src/i18n/locales/
├── pt/
│   ├── common.json
│   ├── home.json
│   ├── blog.json
│   └── ...
├── en/
│   └── ...
└── es/
    └── ...
```

### Usando Traduções

```astro
---
import { getTranslations } from '@/utils/i18n';
const t = await getTranslations('pt', 'common');
---

<h1>{t.nav.home}</h1>
```

## 🎨 Personalização

### Cores

Edite `tailwind.config.mjs` para personalizar o tema:

```js
theme: {
  extend: {
    colors: {
      primary: {
        // Suas cores personalizadas
      }
    }
  }
}
```

### Fontes

O projeto usa Inter por padrão. Para alterar:

1. Edite o link da fonte em `BaseLayout.astro`
2. Atualize `fontFamily` no `tailwind.config.mjs`

### Logo

Substitua os arquivos em `public/images/`:
- `logo.svg` - Logo principal
- `logo-white.svg` - Logo para fundo escuro

## 📊 SEO

### Meta Tags

O projeto inclui automaticamente:
- Open Graph
- Twitter Cards
- Schema.org (Organization, Article, Breadcrumb)
- Canonical URLs
- Hreflang para i18n

### Sitemap

Gerado automaticamente pelo Astro Sitemap:
- `/sitemap-index.xml`
- `/sitemap-0.xml`

### Robots.txt

Configurado em `public/robots.txt`

## 🔧 Configuração

### Variáveis de Ambiente

Crie `.env` para configurações:

```env
SITE_URL=https://consultoria-exemplo.com
CONTACT_EMAIL=contato@consultoria-exemplo.com
```

### Analytics

Para adicionar Google Analytics ou Plausible:

1. Adicione o script em `BaseLayout.astro`
2. Configure as variáveis de ambiente

## 📱 Funcionalidades

### Blog

- Listagem paginada
- Filtros por categoria e tag
- Busca de posts
- Posts relacionados
- TOC automático
- Navegação prev/next

### Formulários

- Formulário de contato com validação
- Proteção anti-spam (honeypot)
- Integração com Calendly
- Newsletter opcional

### Performance

- Lazy loading de imagens
- Otimização de fontes
- Minificação automática
- Cache de assets

## 🚀 Deploy

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Build
npm run build

# Deploy pasta dist/
```

### GitHub Pages

Configure GitHub Actions para deploy automático.

## 📈 Monitoramento

### Lighthouse

O site é otimizado para:
- Performance: 95+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

### Core Web Vitals

- LCP < 2.5s
- FID < 100ms
- CLS < 0.1

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para dúvidas ou suporte:
- Email: contato@consultoria-exemplo.com
- LinkedIn: [Consultoria Empresarial](https://linkedin.com/company/consultoria-exemplo)

---

Desenvolvido com ❤️ usando Astro + React
