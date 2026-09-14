// Load the type system before the existing line-splitting animations initialize.
await Promise.all(['suisse-light','suisse-regular','space-regular'].map(family=>document.fonts.load(`16px ${family}`)));
await document.fonts.ready;
await import('/_nuxt/DC_P54Ec.js');
