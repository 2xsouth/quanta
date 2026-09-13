# Oevra recreation

A high fidelity, locally served recreation of the public website at https://oevra.com, captured September 2026. It preserves the reference's compiled Vue/Nuxt components, GSAP scroll choreography, WebGL background, typography, content, artwork, feature tabs, accordions, testimonials, responsive navigation, and four public pages. This is an asset-preserving static recreation, not a rewrite of its original Vue source.

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

- `public/`: self-hosted HTML, runtime, fonts, graphics and original photographs.
- `public/replica.css` and `public/replica.js`: accessibility and responsive refinements.
- `scripts/build.mjs`: dependency-free static production build.
- `scripts/check.mjs`: page, resource and module integrity checks.
- `scripts/capture-reference.mjs`: explicit upstream recapture utility. Not used by normal development or builds.
- `scripts/localize.mjs`: one-time asset localization for the capture.

## Service boundaries

Login, signup, trial and subscription links intentionally retain the original `app.oevra.com` destinations. Accounts, paid subscriptions, and the private Oevra app are outside this public-website recreation. Contact retains the reference's Formspree destination; submission is a real message to Oevra, and must not be used for automated tests. The public Sanity content API may be used by the preserved runtime during client navigation. Images, fonts, CSS and JavaScript are hosted locally. Google Analytics is disabled for the recreation. Original author and image credits are retained.

Before adapting this for a different brand, replace the account links, contact form destination, legal terms, and content source with your own services.
