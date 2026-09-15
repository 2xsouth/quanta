import {artRoles,groups} from './editorial-art.mjs';

export function applyEditorialArt(data,sizes){
 const image=name=>{
  const url=`/assets/editorial/${name}.webp`;
  if(!sizes[name])throw new Error(`Missing editorial dimensions: ${name}`);
  return {alt:artRoles[name].alt,asset:{_id:url,_ref:url,url,metadata:{dimensions:sizes[name]}},crop:null,hotspot:null};
 };
 data['sanity-HfYZGxTrQA'].intro.forEach((item,i)=>item.image=image(groups.benefits[i]));
 const capabilities=data['sanity-lJDHgocMvY'];
 capabilities.backgroundImage=image('capability-emblem');
 capabilities.features.forEach((item,i)=>item.image=image(groups.capabilities[i]));
 // The middle introduction image becomes the first principle through the
 // existing continuous FLIP transition; these are two views of one object.
 data['sanity-rQ0VsJec8G'].backgroundImages=['about-observe','principle-understand','about-purpose'].map(image);
 data['sanity-0NY6cQqjeq'].backgroundImage=null;
 data['sanity-LZiTgcvNqi'].insights.forEach((item,i)=>item.backgroundImage=image(groups.principles[i]));
 data['sanity-tU9tXQrhh6'].mainPortrait=image('founder-portrait');
 data['sanity-tU9tXQrhh6'].workspaceImage=image('founder-seated');
 data['sanity-BRXXtfZ2Io'].decorativeElement=image('process-iteration');
 data['sanity-hvXIMglF5S'].backgroundImages=groups.collaboration.map(image);
 data['sanity-ABfqmSee7p'].contactImage=image('contact-conversation');
}
