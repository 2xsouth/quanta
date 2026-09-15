# quanta

The quanta website presents an ai engineering and automation company across four routes. It preserves the existing compiled Vue/Nuxt components, GSAP scroll choreography, WebGL background and locally hosted typography. The editorial content is now owned locally, with no connection to the former brand's CMS or inquiry service.

## Run

Requires Node.js 20 or newer. No dependency installation is needed.

```sh
npm run dev
# http://localhost:3000
npm run build
npm run check
```

The production output is `dist/`. The development server supports `--port 3001`; to serve production files use `node scripts/serve.mjs --production`.

## Structure

- `content/quanta.mjs`: all authored page copy, metadata, and public contact configuration. Keep display copy lowercase and preserve technical identifiers.
- `scripts/render-pages.mjs`: generates all four route documents and local content payloads during development startup and production builds.
- `public/`: self-hosted HTML, runtime, fonts and optimized editorial artwork.
- `content/editorial-art.mjs` and `apply-editorial-art.mjs`: distinct visual concepts, alt text and section assignments.
- `docs/editorial-generation.json`: exact generation prompts and original asset paths.
- `public/quanta.css` and `public/quanta.js`: brand, accessibility, responsive and inquiry refinements.
- `public/boot.js`: waits for the fonts before starting line-splitting animations.
- `scripts/build.mjs`: dependency-free static production build.
- `scripts/check.mjs`: page, resource and module integrity checks.
- Capture, inspection and migration scripts are historical maintenance utilities. Do not rerun them during routine editing; they can restore an earlier runtime state. The original component keys remain for compatibility; this checkout does not contain the original Vue source.

## Inquiry delivery configuration

Set `contact.email` or `contact.endpoint` in `content/quanta.mjs` to the destination supplied by quanta, then rebuild and publish. These values are public client configuration; never put service secrets in them.

With an approved form-service endpoint, the form posts name, email and message as form data, checks the response, and preserves input on failure. With an email address only, it opens an email draft and asks the visitor to send it. An email app must be configured for that option.

No destination has been provided yet. The form validates entries and honestly reports that the message has not been sent. A real delivery check remains pending destination configuration. Google Analytics is disabled.

## Brand and visual assets

The supplied `complete.svg` is used in the header, mobile menu and footer. `tabimage.svg` is the favicon. Both founder images are new collectible-figure interpretations of south, generated using the supplied photograph as the identity reference. The direct photograph is not displayed or shipped.

`public/assets/editorial/` contains 25 unique artworks generated in built-in ImageGen mode. The collection uses warm ivory, muted sage, frosted glass, ceramic and soft industrial materials. Each artwork is assigned to one content role; an existing continuous gallery or FLIP transition can show that role in multiple animated views. No separate sections share an artwork. Each image has 480px, 960px and full-size WebP versions; the shared image component chooses an appropriate size. The entire responsive collection is approximately 3.7 MB. The previous social preview image remains only in page metadata.

For future artwork changes, use the exact prompts in the generation manifest and run `scripts/prepare-editorial-assets.mjs` with a completed source manifest and the installed Sharp module path. `scripts/install-editorial-runtime.mjs` records the idempotent runtime changes; do not rerun the older migration scripts.

Use-case descriptions are illustrative capabilities, not client testimonials. The founder copy contains no invented awards, qualifications, client counts or employment history. Commercial scope is agreed with each client.
