import fs from 'node:fs';
import { parseArgs } from 'node:util';

const {positionals} = parseArgs({
    args: process.argv.slice(2),
    allowPositionals: true 
});

const title = positionals.join(' ');

if(!title){
    console.error('Uso: npm run new-post -- "Título del post"');
    process.exit(1);
}

const slug = title.toLowerCase().replace(/\s+/g,'-');
const pubDate = new Date().toISOString().split('T')[0];

const frontmatter = `---
titulo: "${title}"
descripcion: "Agregue aquí la descripción"
fechaPub: ${pubDate}
portada: "../../assets/gato.webp"
portadaAlt: "lol"
etiquetas: []
---

*Agregue aquí el contenido*
`


fs.writeFileSync(`src/content/blog/${slug}.md`,frontmatter);
fs.writeFileSync(`src/pages/blog/${slug}.astro`,codigo);

console.log(`Post creado: src/content/blog/${slug}.md`);
