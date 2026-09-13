// Supplement the captured reference with descriptive names for icon links.
function enhanceAccessibility() {
  const labels = {'/':'Oevra home','linkedin.com':'Oevra on LinkedIn','instagram.com/oevra':'Oevra on Instagram','discord.gg':'Join the Oevra community'};
  document.querySelectorAll('a').forEach(link => {
    if (link.textContent.trim() || link.hasAttribute('aria-label')) return;
    const href = link.getAttribute('href') || '';
    const key = Object.keys(labels).find(key => key === '/' ? href === '/' : href.includes(key));
    if (key) link.setAttribute('aria-label', labels[key]);
  });
  document.querySelectorAll('.inputWrapper').forEach(wrapper => {
    const field = wrapper.querySelector('input,textarea');
    const label = wrapper.querySelector('.inputLabel');
    if (field && label && !field.hasAttribute('aria-label')) field.setAttribute('aria-label',label.textContent.trim());
  });
  const navigation = document.querySelector('.nav-links');
  const menu = document.querySelector('.btn-hm');
  if (navigation && menu) {
    navigation.id = 'main-navigation';
    menu.setAttribute('aria-controls','main-navigation');
    const open = navigation.style.pointerEvents === 'auto' && matchMedia('(max-width:1023px)').matches;
    menu.setAttribute('aria-expanded',String(open));
    navigation.querySelectorAll('button[aria-hidden]').forEach(button=>button.removeAttribute('aria-hidden'));
  }
}
enhanceAccessibility();
let pending = false;
new MutationObserver(() => {
  if (pending) return;
  pending = true;
  requestAnimationFrame(() => { pending = false; enhanceAccessibility(); });
}).observe(document.body, {childList:true,subtree:true});
document.addEventListener('click', () => setTimeout(enhanceAccessibility,650));
document.addEventListener('keydown',event => {
  if (event.key !== 'Escape') return;
  const navigation = document.querySelector('.nav-links');
  if (navigation?.style.pointerEvents === 'auto' && matchMedia('(max-width:1023px)').matches) {
    navigation.querySelector('button')?.click();
    document.querySelector('.btn-hm')?.focus();
    setTimeout(enhanceAccessibility,650);
  }
});

// Keep the reference's contact service, while making pending and failure states
// usable. No message is sent until the visitor submits a valid form.
document.addEventListener('submit',async event => {
  const form = event.target;
  if (location.pathname.replace(/\/$/,'') !== '/contact' || !(form instanceof HTMLFormElement)) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  if (!form.reportValidity() || form.dataset.sending === 'true') return;
  form.dataset.sending = 'true';
  const submit = form.querySelector('[type="submit"]');
  if (submit) submit.disabled = true;
  let status = form.querySelector('.replica-form-status');
  if (!status) {
    status = document.createElement('p');
    status.className = 'replica-form-status';
    status.setAttribute('role','status');
    status.setAttribute('aria-live','polite');
    form.append(status);
  }
  status.dataset.state = 'pending';
  status.textContent = 'Sending your message…';
  try {
    const response = await fetch('https://formspree.io/f/xpwyekda', {
      method:'POST', headers:{Accept:'application/json'},
      body:new FormData(form), signal:AbortSignal.timeout(15000)
    });
    const result = await response.json();
    if (!response.ok || !result.ok) throw new Error('Message not accepted');
    status.dataset.state = 'success';
    status.textContent = 'Thank you. Your message has been sent.';
    form.reset();
    form.querySelectorAll('.inputLabel.active,textarea.active').forEach(e=>e.classList.remove('active'));
  } catch {
    status.dataset.state = 'error';
    status.textContent = 'Your message could not be sent. Please check your connection and try again. Your message is still here.';
  } finally {
    form.dataset.sending = 'false';
    if (submit) submit.disabled = false;
  }
},true);
