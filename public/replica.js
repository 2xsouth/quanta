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
