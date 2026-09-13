import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const root = path.resolve('dist');
const routes = ['index.html','about/index.html','contact/index.html','legal/index.html'];
const checked = new Set();
for (const route of routes) {
  const html = await fs.readFile(path.join(root,route),'utf8');
  assert(html.includes('name="viewport"'), `${route}: viewport is missing`);
  assert(html.includes('href="/favicon.svg"'), `${route}: favicon is missing`);
  assert(!html.includes('gaMeasurementId:"G-'), `${route}: analytics must be disabled`);
  for (const match of html.matchAll(/(?:src|href|xlink:href)="(\/(?!\/)[^"#?]*)/g)) {
    const resource = match[1];
    if (checked.has(resource)) continue;
    checked.add(resource);
    const file = path.join(root, path.extname(resource) ? resource : `${resource}/index.html`);
    assert((await fs.stat(file)).isFile(), `${route}: missing ${resource}`);
  }
}
for (const file of await fs.readdir(path.join(root,'_nuxt'))) {
  if (!file.endsWith('.js')) continue;
  const source = await fs.readFile(path.join(root,'_nuxt',file),'utf8');
  for (const m of source.matchAll(/(?:from|import\()["']\.\/([^"']+\.js)["']/g)) {
    assert((await fs.stat(path.join(root,'_nuxt',m[1]))).isFile(), `Missing imported chunk ${m[1]}`);
  }
}
console.log(`PASS: ${routes.length} pages, ${checked.size} linked resources, and all static JS imports.`);
