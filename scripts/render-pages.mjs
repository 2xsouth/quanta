import fs from 'node:fs/promises';
import {data,site,contact,routeKeys} from '../content/quanta.mjs';
const json=value=>JSON.stringify(value).replaceAll('<','\\u003c');
function payload(route) {
 const values=[];
 const encode=v=>{if(v===undefined)return -1;const i=values.length;values.push(null);
 if(v&&v.tag)values[i]=[v.tag,...(v.tag==='Set'?[]:[encode(v.value)])];
 else if(Array.isArray(v))values[i]=v.map(encode);
 else if(v&&typeof v==='object')values[i]=Object.fromEntries(Object.entries(v).map(([k,val])=>[k,encode(val)]));
 else values[i]=v;return i;};
 encode({tag:'ShallowReactive',value:{data:{tag:'ShallowReactive',value:data},state:{tag:'Reactive',value:{}},once:{tag:'Set'},_errors:{tag:'ShallowReactive',value:{}},serverRendered:false,path:route,pinia:{}}});
 return json(values);
}
const head=(await fs.readFile('templates/head.html','utf8')).replace('src="/_nuxt/DC_P54Ec.js"','src="/boot.js"');
const config={public:{gaMeasurementId:'',sanity:{additionalClients:{},apiVersion:'2021-03-25',dataset:'production',disableSmartCdn:true,perspective:'raw',projectId:'quanta',stega:{},token:'',useCdn:false,visualEditing:false}},app:{baseURL:'/',buildId:'quanta-2026',buildAssetsDir:'/_nuxt/',cdnURL:''}};
await fs.writeFile('public/content.js',`window.__QUANTA_CONTENT__=${json(data)};\nwindow.__QUANTA_CONTACT__=${json(contact)};\n`);
for(const route of Object.keys(routeKeys)) {
 const metadata=data[routeKeys[route].find(k=>data[k]?.metaDescription)]||data['sanity-ROEJnGK6rN'];
 const esc=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
 const meta=`<title>${esc(metadata.title)}</title><meta name="description" content="${esc(metadata.metaDescription)}"><meta property="og:site_name" content="quanta"><meta property="og:title" content="${esc(metadata.title)}"><meta property="og:description" content="${esc(site.description)}"><meta property="og:type" content="website"><meta property="og:url" content="${site.origin+route}"><meta property="og:image" content="${site.origin}/assets/quanta/workflow.png"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(metadata.title)}"><meta name="twitter:description" content="${esc(site.description)}"><meta name="twitter:image" content="${site.origin}/assets/quanta/workflow.png"><link rel="canonical" href="${site.origin+route}"><link rel="icon" type="image/svg+xml" href="/tabimage.svg">`;
 const html=`<!doctype html><html lang="en"><head>${head}\n${meta}\n<script src="/content.js"></script></head><body><div id="__nuxt"></div><noscript><main style="padding:10vh 8vw;font:20px sans-serif"><img src="/complete.svg" alt="quanta" width="200"><h1>${esc(metadata.title)}</h1><p>${esc(site.description)}</p><p>please enable javascript to use the interactive website.</p><a href="/contact">contact quanta</a></main></noscript><script id="__NUXT_DATA__" type="application/json" data-ssr="false">${payload(route)}</script><script>window.__NUXT__={config:${json(config)}};</script><script src="/quanta.js" defer></script></body></html>`;
 const folder=route==='/'?'public':`public${route}`;await fs.mkdir(folder,{recursive:true});await fs.writeFile(`${folder}/index.html`,html);
}
console.log('Rendered all four quanta routes from the local content model.');
