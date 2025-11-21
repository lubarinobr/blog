import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, '..', 'dist');

function formatXML(xmlString) {
  const PADDING = '  ';
  const reg = /(>)(<)(\/*)/g;
  let pad = 0;
  
  xmlString = xmlString.replace(reg, '$1\r\n$2$3');
  
  return xmlString.split('\r\n').map((node) => {
    let indent = 0;
    if (node.match(/.+<\/\w[^>]*>$/)) {
      indent = 0;
    } else if (node.match(/^<\/\w/) && pad > 0) {
      pad -= 1;
    } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
      indent = 1;
    } else {
      indent = 0;
    }
    
    const padding = PADDING.repeat(Math.max(0, pad - indent));
    pad += indent;
    
    return padding + node;
  }).join('\n').trim() + '\n';
}

function formatSitemap(filePath) {
  if (!fs.existsSync(filePath)) {
    console.warn(`Arquivo não encontrado: ${filePath}`);
    return;
  }
  
  const content = fs.readFileSync(filePath, 'utf-8');
  const formatted = formatXML(content);
  fs.writeFileSync(filePath, formatted, 'utf-8');
  console.log(`✓ Formatado: ${path.basename(filePath)}`);
}

const sitemapIndex = path.join(distDir, 'sitemap-index.xml');
const sitemap0 = path.join(distDir, 'sitemap-0.xml');

formatSitemap(sitemapIndex);
formatSitemap(sitemap0);

console.log('Sitemaps formatados com sucesso!');

