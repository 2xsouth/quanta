import fs from 'node:fs/promises';
async function update(file,changes){let source=await fs.readFile(file,'utf8');for(const [a,b]of changes)source=source.replaceAll(a,b);await fs.writeFile(file,source);}
await update('public/_nuxt/BAugoq4T.js',[
 ['x(P.author)+" ("+x(P.year)+")"','x(P.author)'],
 ['e("a",{href:P.url,target:"_blank",rel:"noopener noreferrer",class:"block underline text-black"},x(P.title),9,Ht)','e("p",{class:"block text-black"},x(P.title),1)'],
 ['"View less"','"view less"'],['"View more"','"view more"'],['"View Sources"','"view details"'],
 ['e("h1",Wt,x(c(n).sectionTitle),1)','e("h2",Wt,x(c(n).sectionTitle),1)'],
 ['h=()=>{a.value?.disableTrigger','h=()=>{if(!n.value||!a.value)return;a.value?.disableTrigger'],
]);
for(const name of ['BAxHY7gD.js','BACiWNTW.js'])await update(`public/_nuxt/${name}`,[['default:"Nuxt"','default:"quanta"'],['default:"Server error"','default:"server error"'],['default:"Page not found"','default:"page not found"'],['This page is temporarily unavailable.','this page is temporarily unavailable.'],['Go back home','go back home']]);
// Retain the lazy chunk's public export for compatibility, without the obsolete
// waitlist form, old brand copy, images or third-party submission endpoint.
await fs.writeFile('public/_nuxt/SB_XoiFm.js','export default {name:"RetiredWaitlist",render(){return null;}};\n');
await update('public/_nuxt/CdqELerl.js',[['class:"max-ds:pb-0 | ds:h-svh','class:"quanta-contact max-ds:pb-0 | ds:h-svh']]);
// A queued resize callback can outlive the page during a route transition.
await update('public/_nuxt/DtFrKc8W.js',[['const i=()=>{a.value?.disableTrigger','const i=()=>{if(!a.value?.$el)return;a.value?.disableTrigger']]);
const sprite='public/assets/images/sprite.svg';
await fs.writeFile(sprite,(await fs.readFile(sprite,'utf8')).replace(/<symbol\b[^>]*id="(?:logo|logoType|ds|ig|ln|st)"[^>]*>[\s\S]*?<\/symbol>/g,''));
for(const name of ['templates/head.html','public/_nuxt/entry.PTsdo3TA.css'])await fs.writeFile(name,(await fs.readFile(name,'utf8')).replace(/\.signup-button\[data-v-541ea801\]\{[^}]*\}/g,''));
