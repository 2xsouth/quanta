import fs from 'node:fs';
function decode(values) {
  const memo=new Map();
  function get(i) {
    if(i===-1)return undefined;
    if(memo.has(i))return memo.get(i);
    const v=values[i];
    if(v===null||typeof v!=='object')return v;
    if(Array.isArray(v)&&typeof v[0]==='string') {
      if(v[0]==='Set')return [];
      return get(v[1]);
    }
    const out=Array.isArray(v)?[]:{};memo.set(i,out);
    for(const [key,val]of Object.entries(v))out[key]=get(val);
    return out;
  }
  return get(0);
}
for(const name of ['home','about','contact','legal']) {
 const file=name==='home'?'public/index.html':`public/${name}/index.html`;
 const html=fs.readFileSync(file,'utf8');
 const payload=JSON.parse(html.match(/<script[^>]*id="__NUXT_DATA__"[^>]*>([\s\S]*?)<\/script>/)[1]);
 const decoded=decode(payload);
 fs.mkdirSync('reference',{recursive:true});
 fs.writeFileSync(`reference/${name}-content.json`,JSON.stringify(decoded.data,null,2));
 console.log(name,Object.entries(decoded.data).map(([key,v])=>[key,Object.keys(v||{})]));
}
