import fs from 'node:fs/promises';
import path from 'node:path';
const origin = 'https://cdn.sanity.io/images/';
async function files(dir) {
  const entries = await fs.readdir(dir,{withFileTypes:true});
  return (await Promise.all(entries.map(e => e.isDirectory() ? files(path.join(dir,e.name)) : path.join(dir,e.name)))).flat();
}
const all = (await files('public')).filter(p=>/\.(html|js)$/.test(p));
const images = new Set();
for (const filename of all) {
  let source = await fs.readFile(filename,'utf8');
  for (const m of source.matchAll(/https:\/\/cdn\.sanity\.io\/images\/([^\s"'<>?]+)/g)) images.add(m[1]);
  for (const m of source.matchAll(/image-([a-f0-9]{40})-(\d+x\d+)-(jpg|png|webp)/g)) images.add(`711c6jto/production/${m[1]}-${m[2]}.${m[3]}`);
  // Keep the preserved public content and application destinations, but do not
  // report replica visitors to the original site's Google Analytics property.
  source = source.replace(/gaMeasurementId:"[^"]*"/g,'gaMeasurementId:""');
  source = source.replaceAll('https://cdn.sanity.io/images', '/media/images');
  source = source.replaceAll('https://yourdomain.com', 'https://oevra-recreation.warm-ape-8392.chatgpt.site');
  if (filename.endsWith('.html')) source = source.replace('</head>','<link rel="icon" type="image/svg+xml" href="/favicon.svg">\n</head>');
  await fs.writeFile(filename,source);
}
const pending = [...images];
while (pending.length) {
  await Promise.all(pending.splice(0,6).map(async image => {
    const target = path.join('public/media/images', image);
    await fs.mkdir(path.dirname(target),{recursive:true});
    const res = await fetch(`${origin}${image}?w=1920&q=90`);
    if (!res.ok) throw new Error(`Image download failed: ${res.status} ${image}`);
    await fs.writeFile(target,Buffer.from(await res.arrayBuffer()));
    console.log(image);
  }));
}
console.log(`Localized ${images.size} original images.`);
