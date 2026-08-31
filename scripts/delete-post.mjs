import fs from 'node:fs';
import { parseArgs } from 'node:util';

const {positionals} = parseArgs({
    args: process.argv.slice(2),
    allowPositionals: true 
});
console.log(positionals);

fs.rmSync(`src/content/blog/${positionals[0]}.md`);
fs.rmSync(`src/pages/blog/${positionals[0]}.astro`);