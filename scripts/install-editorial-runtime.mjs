import fs from 'node:fs/promises';
async function patch(file,oldText,newText){
 let text=await fs.readFile(file,'utf8');
 if(text.includes(newText))return;
 if(!text.includes(oldText))throw new Error(`Patch target not found: ${file}`);
 await fs.writeFile(file,text.replace(oldText,newText));
}
await patch('content/quanta.mjs','const link =',"import {applyEditorialArt} from './apply-editorial-art.mjs';\nimport editorialSizes from './editorial-sizes.json' with {type:'json'};\nconst link =");
await patch('content/quanta.mjs','// This notice describes',"applyEditorialArt(data,editorialSizes);\n\n// This notice describes");
await patch('scripts/render-pages.mjs',"import {data,site,contact,routeKeys}","import editorialSizes from '../content/editorial-sizes.json' with {type:'json'};\nimport {data,site,contact,routeKeys}");
await patch('scripts/render-pages.mjs','window.__QUANTA_CONTENT__=${json(data)};', 'window.__QUANTA_ASSET_META__=${json(editorialSizes)};\\nwindow.__QUANTA_CONTENT__=${json(data)};');
await patch('public/_nuxt/BzEkBf2h.js','N("img",{...s,src:n.value})','N("img",{...s,src:n.value,...(()=>{const name=t.assetId?.split("/").pop()?.replace(".webp",""),meta=window.__QUANTA_ASSET_META__?.[name];if(!meta)return{};const base=t.assetId.replace(".webp","");return{width:meta.width,height:meta.height,decoding:"async",srcset:`${base}-480.webp 480w, ${base}-960.webp 960w, ${t.assetId} ${meta.width}w`,sizes:s.sizes||(name==="capability-emblem"?"160px":name.startsWith("benefit-")||name.startsWith("principle-")?"100vw":"(max-width: 767px) 85vw, (max-width: 1023px) 60vw, 45vw")}})()})');
await patch('public/_nuxt/BAugoq4T.js','/assets/quanta/pipeline.svg','/assets/editorial/process-iteration.webp');
await patch('public/_nuxt/BAugoq4T.js','{src:ms,class:', '{src:ms,srcset:"/assets/editorial/process-iteration-480.webp 480w, /assets/editorial/process-iteration-960.webp 960w",sizes:"110px",alt:"an unfinished plaster spiral beside its refined ceramic counterpart",class:');
console.log('Editorial content and responsive image rendering installed.');
