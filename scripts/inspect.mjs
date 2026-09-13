import fs from 'node:fs';
const html = fs.readFileSync('reference/home.html','utf8');
const css = fs.readFileSync('reference/entry.css','utf8');
console.log(html.slice(0,6000));
console.log('FONTS', css.match(/@font-face[^}]+}/g));
console.log('SCRIPTS', [...html.matchAll(/<script[^>]*src=[^>]+>/g)].map(x=>x[0]));
console.log('ASSETS', [...html.matchAll(/(?:src|href)="(\/[^"#]+)/g)].map(x=>x[1]).filter((x,i,a)=>a.indexOf(x)===i));
