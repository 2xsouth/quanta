import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {data,contact} from '../content/quanta.mjs';
const root = path.resolve('dist');
const routes = ['index.html','about/index.html','contact/index.html','legal/index.html'];
const checked = new Set();
for (const route of routes) {
  const html = await fs.readFile(path.join(root,route),'utf8');
  assert(html.includes('name="viewport"'), `${route}: viewport is missing`);
  assert(html.includes('href="/tabimage.svg"'), `${route}: favicon is missing`);
  assert(/<title>[^<]*quanta[^<]*<\/title>/.test(html), `${route}: quanta title is missing`);
  assert(!/oevra|œvra|free trial|7.day|sign up|signup|login|app download/i.test(html), `${route}: retired brand content remains`);
  assert(!html.includes('gaMeasurementId:"G-'), `${route}: analytics must be disabled`);
  for (const match of html.matchAll(/(?:src|href|xlink:href)="(\/(?!\/)[^"#?]*)/g)) {
    const resource = match[1];
    if (checked.has(resource)) continue;
    checked.add(resource);
    const file = path.join(root, path.extname(resource) ? resource : `${resource}/index.html`);
    assert((await fs.stat(file)).isFile(), `${route}: missing ${resource}`);
  }
}
const ignored=new Set(['_id','_ref','_key','_type','linkType','url','canonicalUrl','twitterCard','year']);
async function inspect(value,key=''){
 if(ignored.has(key))return;
 if(typeof value==='string'){
  assert(value===value.toLowerCase(),`Uppercase display copy: ${value}`);
  assert(!/oevra|œvra|\btrial\b|\bapp download\b|[$€£]|\blogin\b|\bsignup\b/i.test(value),`Retired content: ${value}`);
 }
 if(value&&typeof value==='object'){
  if(value.link?.url)assert.equal(value.link.url,'/contact','Conversion CTA must reach contact');
  if(value.asset?.url?.startsWith('/'))assert((await fs.stat(path.join(root,value.asset.url))).isFile(),`Missing ${value.asset.url}`);
  for(const [k,v]of Object.entries(value))await inspect(v,k);
 }
}
await inspect(data);
assert.equal(data['sanity-3cf9ZrerVg'].plans.length,2);
assert.equal(data['sanity-tU9tXQrhh6'].founderName,'south');
assert.equal(data['sanity-hvXIMglF5S'].primaryButton.text,'join us');
assert.equal(data['sanity-JT0kWakLg4'].buttonLabel,'');
assert(!data['sanity-zug1S6G4p9'].headerStrings.login);
assert(!data['sanity-zug1S6G4p9'].headerStrings.signUp);
for (const file of await fs.readdir(path.join(root,'_nuxt'))) {
  if (!file.endsWith('.js')) continue;
  const source = await fs.readFile(path.join(root,'_nuxt',file),'utf8');
  for (const m of source.matchAll(/(?:from|import\()["']\.\/([^"']+\.js)["']/g)) {
    assert((await fs.stat(path.join(root,'_nuxt',m[1]))).isFile(), `Missing imported chunk ${m[1]}`);
  }
}
console.log(`PASS: ${routes.length} pages, ${checked.size} linked resources, all static JS imports, lowercase content, founder assets and contact CTAs.`);
if(!contact.email&&!contact.endpoint)console.log('PENDING: quanta business email or form-service endpoint is needed for inquiry delivery.');
