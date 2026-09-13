import fs from 'node:fs/promises';
import path from 'node:path';

// Preserve the publicly served site, including its animation runtime, locally.
// This runs only when intentionally updating the captured reference version.
const origin = 'https://oevra.com';
const output = path.resolve('public');
const seen = new Set();
const failures = [];
const queue = ['/', '/about', '/contact', '/legal'];
function enqueue(value, base) {
  try {
    const url = new URL(value, base);
    if (url.origin !== origin || !/^\/(?:_nuxt|assets)\//.test(url.pathname)) return;
    const key = url.pathname + url.search;
    if (!seen.has(key) && !queue.includes(key)) queue.push(key);
  } catch {}
}
async function capture(route) {
  if (seen.has(route)) return;
  seen.add(route);
  const url = new URL(route, origin);
  const res = await fetch(url);
  if (!res.ok) { failures.push(`${res.status} ${route}`); return; }
  const contentType = res.headers.get('content-type') || '';
  const bytes = Buffer.from(await res.arrayBuffer());
  let data = bytes;
  if (/text|javascript|json|svg/.test(contentType)) {
    let text = bytes.toString('utf8');
    const refs = [
      ...text.matchAll(/(?:src|href|xlink:href)=["']([^"'#]+)/g),
      ...text.matchAll(/(?:["'`])((?:\/assets\/|\/_nuxt\/|\.\/)[^"'`\s<>]+\.(?:js|css|woff2?|ttf|otf|png|jpg|jpeg|webp|svg|avif|mp4|webm|json))(?:["'`])/g),
      ...text.matchAll(/url\(["']?([^\s)"']+)/g),
    ];
    for (const m of refs) enqueue(m[1].split('#')[0], url);
    // Nuxt's lazy dependency map omits ./ on its chunk filenames.
    if (/javascript/.test(contentType)) {
      for (const m of text.matchAll(/["']([\w.-]+\.(?:js|css))["']/g)) enqueue(`./${m[1]}`, url);
    }
    if (/text\/html/.test(contentType)) {
      text = text.replace('</head>', '<link rel="stylesheet" href="/replica.css">\n</head>');
      text = text.replace('</body>', '<script src="/replica.js" defer></script>\n</body>');
    }
    data = Buffer.from(text);
  }
  const dest = path.join(output, /text\/html/.test(contentType) ? `${url.pathname}/index.html` : url.pathname);
  await fs.mkdir(path.dirname(dest), {recursive:true});
  await fs.writeFile(dest, data);
  console.log(`${route} (${data.length})`);
}
while (queue.length) {
  const batch = queue.splice(0, 8);
  await Promise.all(batch.map(route => capture(route).catch(e => failures.push(`${route}: ${e.message}`))));
}
await fs.writeFile('reference/capture-manifest.json', JSON.stringify({origin, capturedAt:new Date().toISOString(), files:[...seen], failures},null,2));
console.log('CAPTURE COMPLETE', seen.size, 'files', failures);
if (failures.length) process.exitCode = 1;
