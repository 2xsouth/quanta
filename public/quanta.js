// Accessibility and inquiry behavior shared by every route.
function enhance(){
 document.querySelectorAll('.feature-btn').forEach(button=>button.setAttribute('aria-pressed',String(button.classList.contains('active'))));
 document.querySelectorAll('.features-image').forEach((figure,index)=>{
  figure.setAttribute('role','button');figure.tabIndex=0;
  const title=window.__QUANTA_CONTENT__?.['sanity-lJDHgocMvY']?.features?.[index]?.title?.replace(/\n/g,' ');
  figure.setAttribute('aria-label',`show ${title||'capability'}`);figure.setAttribute('aria-pressed',String(figure.classList.contains('active')));
 });
 document.querySelectorAll('a').forEach(a=>{
  if(a.getAttribute('href')==='/'&&!a.textContent.trim())a.setAttribute('aria-label','quanta home');
  if(a.getAttribute('href')?.startsWith('/'))a.removeAttribute('target');
 });
 document.querySelectorAll('.inputWrapper').forEach(wrapper=>{
  const input=wrapper.querySelector('input,textarea'),label=wrapper.querySelector('.inputLabel');
  if(input&&label){input.setAttribute('aria-label',label.textContent.trim().toLowerCase());input.autocomplete=input.name==='email'?'email':input.name==='name'?'name':'off';}
 });
 const nav=document.querySelector('.nav-links'),menu=document.querySelector('.btn-hm');
 if(nav&&menu){
  nav.id='main-navigation';menu.setAttribute('aria-controls',nav.id);
  const mobile=matchMedia('(max-width:1023px)').matches,open=nav.style.pointerEvents==='auto';
  menu.setAttribute('aria-expanded',String(mobile&&open));nav.inert=mobile&&!open;
  const close=nav.querySelector('button');if(close){close.removeAttribute('aria-hidden');close.setAttribute('aria-label','close menu');}
 }
 // Keep brand contrast tied to the same header color used by the animation.
 const color=getComputedStyle(document.documentElement).getPropertyValue('--logo');
 document.querySelector('.header>.logo img')?.style.setProperty('filter',/255/.test(color)?'brightness(0) invert(1)':'brightness(0)');
}
let scheduled=false;
new MutationObserver(()=>{if(!scheduled){scheduled=true;requestAnimationFrame(()=>{scheduled=false;enhance();});}}).observe(document.body,{childList:true,subtree:true});
document.addEventListener('click',()=>setTimeout(enhance,400));
window.addEventListener('resize',enhance);
let headerResizeTimer;
window.addEventListener('resize',()=>{
 clearTimeout(headerResizeTimer);
 headerResizeTimer=setTimeout(()=>{
  const header=document.querySelector('.header');
  if(!header)return;
  // Breakpoint changes rebuild the original entrance timeline. The entrance
  // event has already fired, so restore the navigation after that rebuild.
  header.style.opacity='1';header.style.transform='translateY(0)';
  header.querySelectorAll('a').forEach(a=>{a.style.opacity='1';a.style.transform='none';});
  enhance();
 },350);
});
window.addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(()=>{scheduled=false;enhance();});}},{passive:true});
document.addEventListener('keydown',event=>{
 if((event.key==='Enter'||event.key===' ')&&event.target.matches('.features-image')){event.preventDefault();event.target.click();}
 const nav=document.querySelector('.nav-links'),menu=document.querySelector('.btn-hm');
 if(!nav||!matchMedia('(max-width:1023px)').matches||nav.style.pointerEvents!=='auto')return;
 if(event.key==='Escape'){nav.querySelector('button')?.click();menu?.focus();setTimeout(enhance,400);}
 if(event.key==='Tab'){
  const controls=Array.from(nav.querySelectorAll('a,button')).filter(e=>e.getClientRects().length);
  const first=controls[0],last=controls.at(-1);
  if(event.shiftKey&&(document.activeElement===first||document.activeElement===menu)){event.preventDefault();last?.focus();}
  else if(!event.shiftKey&&(document.activeElement===last||!nav.contains(document.activeElement))){event.preventDefault();first?.focus();}
 }
});
document.addEventListener('invalid',event=>{
 const field=event.target;
 if(field instanceof HTMLInputElement||field instanceof HTMLTextAreaElement){
  field.setCustomValidity(field.type==='checkbox'?'please confirm you have read the privacy notice.':field.validity.typeMismatch?'please enter a valid email address.':'please complete this field.');
 }
},true);
document.addEventListener('input',event=>event.target.setCustomValidity?.(''));
document.addEventListener('change',event=>event.target.setCustomValidity?.(''));
document.addEventListener('submit',async event=>{
 const form=event.target;
 if(!(form instanceof HTMLFormElement)||location.pathname.replace(/\/$/,'')!=='/contact')return;
 event.preventDefault();event.stopImmediatePropagation();
 if(!form.reportValidity()||form.dataset.sending==='true')return;
 const config=window.__QUANTA_CONTACT__||{},fields=new FormData(form);
 let status=form.querySelector('.quanta-form-status');
 if(!status){status=document.createElement('p');status.className='quanta-form-status';status.setAttribute('role','status');status.setAttribute('aria-live','polite');form.append(status);}
 if(!config.endpoint&&!config.email){status.dataset.state='error';status.textContent='inquiries are not available here yet. your message has not been sent.';return;}
 if(config.email&&!config.endpoint){
  const subject='project inquiry — quanta';
  const body=`name: ${fields.get('name')}\nemail: ${fields.get('email')}\n\n${fields.get('message')}`;
  location.href=`mailto:${config.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  status.dataset.state='success';status.textContent='your email draft is ready. send it from your email app to reach quanta.';return;
 }
 form.dataset.sending='true';const button=form.querySelector('[type="submit"]');if(button)button.disabled=true;
 status.dataset.state='pending';status.textContent='sending your inquiry…';
 try{
  const response=await fetch(config.endpoint,{method:'POST',headers:{Accept:'application/json'},body:fields,signal:AbortSignal.timeout(15000)});
  const result=await response.json();if(!response.ok||result.ok===false||result.error)throw new Error('delivery failed');
  status.dataset.state='success';status.textContent='thank you. your inquiry has been sent.';form.reset();form.querySelectorAll('.active').forEach(e=>e.classList.remove('active'));
 }catch{status.dataset.state='error';status.textContent='your inquiry could not be sent. your message is still here; please try again.';}
 finally{form.dataset.sending='false';if(button)button.disabled=false;}
},true);
enhance();
