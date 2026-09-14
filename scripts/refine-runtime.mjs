import fs from 'node:fs/promises';
async function update(file,changes){let source=await fs.readFile(file,'utf8');for(const [a,b]of changes)source=source.replaceAll(a,b);await fs.writeFile(file,source);}
await update('public/_nuxt/BAugoq4T.js',[
 ['x(P.author)+" ("+x(P.year)+")"','x(P.author)'],
 ['e("a",{href:P.url,target:"_blank",rel:"noopener noreferrer",class:"block underline text-black"},x(P.title),9,Ht)','e("p",{class:"block text-black"},x(P.title),1)'],
 ['"View less"','"view less"'],['"View more"','"view more"'],['"View Sources"','"view details"'],
]);
for(const name of ['BAxHY7gD.js','BACiWNTW.js'])await update(`public/_nuxt/${name}`,[['default:"Nuxt"','default:"quanta"'],['default:"Server error"','default:"server error"'],['default:"Page not found"','default:"page not found"'],['This page is temporarily unavailable.','this page is temporarily unavailable.'],['Go back home','go back home']]);
// Retain the lazy chunk's public export for compatibility, without the obsolete
// waitlist form, old brand copy, images or third-party submission endpoint.
await fs.writeFile('public/_nuxt/SB_XoiFm.js','export default {name:"RetiredWaitlist",render(){return null;}};\n');
const sprite='public/assets/images/sprite.svg';
await fs.writeFile(sprite,(await fs.readFile(sprite,'utf8')).replace(/<symbol\b[^>]*id="(?:logo|logoType|ds|ig|ln|st)"[^>]*>[\s\S]*?<\/symbol>/g,''));
