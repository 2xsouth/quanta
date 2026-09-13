import fs from 'node:fs/promises';
import path from 'node:path';
const target = path.resolve('dist');
if (target !== path.join(process.cwd(), 'dist')) throw new Error('Invalid output path');
await fs.mkdir(target, {recursive:true});
await fs.cp('public', target, {recursive:true});
console.log('Built static site in dist/');
