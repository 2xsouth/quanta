// Remove only the MPO container's MPF directory. The original JPEG scan data,
// color profile and EXIF are copied byte-for-byte for image-tool compatibility.
import fs from 'node:fs/promises';
const source=await fs.readFile('public/DSC_2898.JPG.jpeg');
if(source[0]!==255||source[1]!==216)throw new Error('Not a JPEG source');
let at=2;const pieces=[source.subarray(0,2)];
while(at<source.length){
 const start=at;if(source[at++]!==255)throw new Error('Invalid JPEG marker');
 const marker=source[at++];
 if(marker===218){pieces.push(source.subarray(start));break;}
 const length=source.readUInt16BE(at);const end=at+length;
 const mpf=marker===226&&source.subarray(at+2,at+6).toString('ascii')==='MPF\0';
 if(!mpf)pieces.push(source.subarray(start,end));at=end;
}
await fs.mkdir('reference',{recursive:true});
await fs.writeFile('reference/south-reference.jpg',Buffer.concat(pieces));
console.log('Created a plain JPEG identity reference without changing image pixels.');
