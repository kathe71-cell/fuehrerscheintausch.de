import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8');
const { render } = await import('./dist-ssr/entry-server.js');

const routesToPrerender = [
  {
    url: '/',
    title: 'Führerschein umtauschen 2026: Fristen, Rechner & Unterlagen',
    desc: 'Führerschein umtauschen: Wann müssen Sie Ihren alten Führerschein umtauschen? Fristenrechner 2026 nach Anlage 8e FeV, Gebühren & Unterlagen-Checkliste.'
  },
  {
    url: '/rechner-embed',
    title: 'Führerschein Fristenrechner Widget (Embed) | fuehrerscheintausch.de',
    desc: 'Kompakter Fristenrechner für den Pflichtumtausch alter Führerscheine zum Einbinden auf Fachportalen und Webseiten.'
  },
  {
    url: '/impressum',
    title: 'Impressum | fuehrerscheintausch.de',
    desc: 'Rechtliche Angaben und Kontaktdaten gemäß § 5 DDG für fuehrerscheintausch.de.'
  },
  {
    url: '/datenschutz',
    title: 'Datenschutzerklärung | fuehrerscheintausch.de',
    desc: 'Informationen zur Verarbeitung personenbezogener Daten auf fuehrerscheintausch.de gemäß DSGVO.'
  }
];

console.log(`Starting prerendering of ${routesToPrerender.length} routes for fuehrerscheintausch.de...`);

for (const route of routesToPrerender) {
  try {
    const { html: appHtml } = render(route.url);
    let rendered = template.replace(/<div id="root"[^>]*><\/div>/, `<div id="root">${appHtml}</div>`);
    rendered = rendered.replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`);
    rendered = rendered.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${route.desc}" />`);
    const fullUrl = `https://www.fuehrerscheintausch.de${route.url === '/' ? '' : route.url}`;
    rendered = rendered.replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${fullUrl}" />`);
    rendered = rendered.replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${fullUrl}" />`);
    rendered = rendered.replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${route.title}" />`);
    rendered = rendered.replace(/<meta property="twitter:title" content=".*?" \/>/, `<meta property="twitter:title" content="${route.title}" />`);
    rendered = rendered.replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${route.desc}" />`);
    rendered = rendered.replace(/<meta property="twitter:description" content=".*?" \/>/, `<meta property="twitter:description" content="${route.desc}" />`);

    const filePath = route.url === '/' ? 'dist/index.html' : `dist${route.url}/index.html`;
    const absolutePath = toAbsolute(filePath);
    fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
    fs.writeFileSync(absolutePath, rendered);
    console.log(`  ✓ ${route.url} -> ${filePath} (${(rendered.length / 1024).toFixed(1)} kB)`);
  } catch (err) {
    console.error(`  ✗ Error prerendering ${route.url}:`, err);
    process.exit(1);
  }
}

console.log('Prerendering complete!');
