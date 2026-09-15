// Image generation owns the pixels. This step only encodes web-sized copies;
// originals and exact prompts remain in the generator's source manifest.
import fs from 'node:fs/promises';
import path from 'node:path';
import {createRequire} from 'node:module';
import {artRoles} from '../content/editorial-art.mjs';
const [manifestPath,sharpPath]=process.argv.slice(2);
if(!manifestPath||!sharpPath)throw new Error('Supply the generated image manifest and installed sharp module path.');
const sharp=createRequire(import.meta.url)(sharpPath);
const manifest=JSON.parse(await fs.readFile(manifestPath,'utf8'));
const entries=Array.isArray(manifest)?manifest:manifest.assets;
const directory=path.resolve('public/assets/editorial');await fs.mkdir(directory,{recursive:true});
const metadata={};
for(const name of Object.keys(artRoles)){
 const entry=entries.find(e=>(e.name||e.id)===name);
 const source=entry?.path||entry?.sourcePath;
 if(!source)throw new Error(`Missing generated image: ${name}`);
 const input=sharp(source);const info=await input.metadata();
 if(!info.width||!info.height)throw new Error(`Invalid dimensions: ${name}`);
 const width=Math.min(info.width,1536),height=Math.round(info.height*width/info.width);
 await input.clone().resize({width,withoutEnlargement:true}).webp({quality:87,effort:5}).toFile(path.join(directory,`${name}.webp`));
 for(const size of [480,960])await input.clone().resize({width:size,withoutEnlargement:true}).webp({quality:85,effort:5}).toFile(path.join(directory,`${name}-${size}.webp`));
 metadata[name]={width,height};
}
await fs.writeFile('content/editorial-sizes.json',JSON.stringify(metadata,null,2)+'\n');
await fs.mkdir('docs',{recursive:true});
await fs.writeFile('docs/editorial-generation.json',JSON.stringify({mode:'built-in image_gen',assets:entries.map(e=>({...e,webPath:`/assets/editorial/${e.name||e.id}.webp`}))},null,2)+'\n');
console.log(`Prepared ${Object.keys(metadata).length} distinct artworks in three responsive sizes.`);
