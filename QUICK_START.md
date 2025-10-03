# 🚀 Quick Start - Site Pessoal

## ✅ Problema Resolvido

O erro `No matching version found for astro-i18next@^1.2.0` foi corrigido removendo a dependência problemática e implementando um sistema de i18n nativo com Astro.

## 🛠️ Como Executar

```bash
# 1. Instalar dependências (já feito)
npm install

# 2. Executar em desenvolvimento
npm run dev

# 3. Abrir no navegador
# http://localhost:4321
```

## 📝 Comandos Úteis

```bash
# Criar novo post
npm run new:post "Título do Post"

# Build para produção
npm run build

# Preview do build
npm run preview
```

## 🌐 Páginas Disponíveis

- **Home**: `/` (Português)
- **Home EN**: `/en` (Inglês)
- **Blog**: `/blog`
- **Contato**: `/contact`
- **Posts**: `/blog/[slug]`

## 📁 Estrutura Principal

```
src/
├── pages/              # Páginas do site
├── components/         # Componentes reutilizáveis
├── layouts/           # Layouts base
├── utils/             # Utilitários (i18n, SEO, blog)
├── i18n/              # Traduções (pt, en, es)
└── content/blog/      # Posts MDX
```

## 🎨 Personalização

1. **Cores**: Edite `tailwind.config.mjs`
2. **Conteúdo**: Edite arquivos em `src/i18n/locales/`
3. **Logo**: Substitua em `public/images/`
4. **Posts**: Use `npm run new:post`

## 🚀 Deploy

O projeto está pronto para deploy em:
- **Vercel**: `vercel`
- **Netlify**: Upload da pasta `dist/`
- **GitHub Pages**: Via GitHub Actions

## 📊 Status

✅ **Build**: Funcionando  
✅ **i18n**: Implementado  
✅ **SEO**: Completo  
✅ **Blog**: Funcional  
✅ **Responsivo**: Mobile-first  
✅ **Dark Mode**: Implementado  

---

**O site está pronto para uso!** 🎉

