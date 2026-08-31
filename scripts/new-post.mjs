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
---

*Agregue aquí el contenido*
`
const codigo = `---
import { getEntry, render } from "astro:content";
const entry =  await getEntry('blog','${slug}');
if(!entry){
    throw new Error("Entrada no encontrada");
}
const { Content } = await render(entry);
---
<head>
    <meta charset="utf-8">
</head>
<h1>{entry.data.titulo}</h1>
<p>Publicado: {entry.data.fechaPub.toLocaleDateString("en-GB")}</p>
<Content />
`

fs.writeFileSync(`src/content/blog/${slug}.md`,frontmatter);
fs.writeFileSync(`src/pages/blog/${slug}.astro`,codigo);

console.log(`Post creado: src/content/blog/${slug}.md`);
