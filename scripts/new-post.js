#!/usr/bin/env node

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get command line arguments
const args = process.argv.slice(2);
const title = args[0];
const locale = args[1] || 'pt';

if (!title) {
  console.error('Usage: npm run new:post "Post Title" [locale]');
  console.error('Example: npm run new:post "Meu Novo Post" pt');
  process.exit(1);
}

// Generate slug from title
const slug = title
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '') // Remove accents
  .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
  .replace(/\s+/g, '-') // Replace spaces with hyphens
  .replace(/-+/g, '-') // Replace multiple hyphens with single
  .trim();

// Create directory
const postDir = join(__dirname, '..', 'src', 'content', 'blog', slug);
if (!existsSync(postDir)) {
  mkdirSync(postDir, { recursive: true });
}

// Generate frontmatter
const date = new Date().toISOString().split('T')[0];
const frontmatter = `---
title: "${title}"
description: "Descrição do post sobre ${title.toLowerCase()}"
date: ${date}
category: "Categoria"
tags: ["tag1", "tag2", "tag3"]
cover: "/images/blog/${slug}.jpg"
canonical: "https://consultoria-exemplo.com/blog/${slug}"
draft: true
locale: "${locale}"
---

# ${title}

Escreva o conteúdo do seu post aqui...

## Subtítulo

Conteúdo da seção...

### Subseção

Mais conteúdo...

## Conclusão

Conclusão do post...

---

*Quer saber mais sobre este tema? [Entre em contato conosco](/contact) para uma consultoria personalizada.*
`;

// Write file
const filename = `index.${locale}.mdx`;
const filepath = join(postDir, filename);
writeFileSync(filepath, frontmatter);

console.log(`✅ Post criado com sucesso!`);
console.log(`📁 Diretório: ${postDir}`);
console.log(`📄 Arquivo: ${filename}`);
console.log(`🔗 Slug: ${slug}`);
console.log(`🌐 Locale: ${locale}`);
console.log(`📝 Lembre-se de:`);
console.log(`   - Editar a descrição e categoria`);
console.log(`   - Adicionar tags relevantes`);
console.log(`   - Adicionar imagem de capa em /public/images/blog/${slug}.jpg`);
console.log(`   - Definir draft: false quando estiver pronto para publicar`);
