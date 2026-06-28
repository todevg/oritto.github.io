# Implementation Plan — ORITTO LED Lights Website

Build a responsive, accessible, SEO-ready website for **ORITTO LED Lights** from the requirements in `ORITTO Sitemap 11062025 (1).pptx`. The initial release will be a static marketing and product-catalogue website deployed through **GitHub Pages**. Features requiring persistent data, authentication, administration, notifications, or complaint-system integration are separated into a later application phase.

## Current Repository Baseline

- The repository is hosted on GitHub and already contains `.github/workflows/static.yml`.
- Static site files currently exist both at the repository root and under `public/`; these copies are identical and must not remain two independent sources of truth.
- `.gitlab-ci.yml` is obsolete unless GitLab becomes an explicitly approved deployment target.
- `docs/` is ignored, which also excludes this plan and the source deck from version control.
- GitHub Pages must be enabled with **GitHub Actions** as its publishing source before the deployment workflow can succeed.
- With the current repository owner, the default project-site URL is `https://todevg.github.io/oritto.github.io/`. A branded domain requires a separate DNS and canonical-domain decision.

## User Decisions Required

> [!IMPORTANT]
> Implementation should not begin until the following decisions are recorded.

1. **Canonical domain:** choose one primary domain from `oritto.com`, `oritto.in`, or `oritto.co.in`; define redirects for the others. Until then, use the default GitHub Pages project URL.
2. **Release scope:** confirm that Phase 1 is a static marketing/catalogue release and that CMS, customer registration, administration, and customer-management features are deferred.
3. **Form handling:** approve the production endpoint or managed form service for sales, service, quick enquiry, and distribution forms.
4. **Complaint tracking:** provide an existing complaint API and authentication model, or replace tracking with a support contact flow. Do not publish simulated complaint statuses.
5. **Content approval:** provide approved product data, specifications, certifications, policies, contact details, social links, and downloadable files.
6. **Analytics and privacy:** provide analytics/Search Console identifiers and approve the privacy, cookie-consent, and data-retention requirements.

## Scope

### Phase 1 — Static Website

- Corporate brand story, vision, mission, values, milestones, manufacturing, certifications, team, clientele, gallery, and contact details.
- Product catalogue covering every approved category in the sitemap, with search and category/model/application filtering.
- Solutions and solar sections with indexable content and clear enquiry calls to action.
- Support, downloads, grievance, sales enquiry, service request, and distribution enquiry interfaces.
- Persistent chat and quick-enquiry controls, using verified contact channels or an approved form endpoint.
- Complete footer sitemap, social links, legal links, and contact details.
- Responsive, accessible navigation and page layouts.
- Technical SEO, analytics integration, performance optimization, and GitHub Pages deployment.

### Phase 2 — Application Services

Phase 2 requires an approved backend architecture and is not implementable as browser-only static JavaScript.

- User registration and authentication.
- Product/content administration and CMS workflows.
- Customer management.
- Persistent enquiry records and notification alerts.
- Real complaint creation, lookup, and status tracking.
- Role-based administration, audit logging, backups, monitoring, and operator training.

## Proposed Repository Changes

### Deployment and Source Control

#### [MODIFY] `.github/workflows/static.yml`

- Keep GitHub Pages as the only deployment pipeline.
- Upload `public/` as the Pages artifact instead of the repository root.
- Run validation before artifact upload.
- Deploy only from the default branch and retain manual `workflow_dispatch` support.
- Use least-privilege `contents: read`, `pages: write`, and `id-token: write` permissions.

#### [DELETE] `.gitlab-ci.yml`

- Remove the unused GitLab Pages pipeline after GitHub Pages is confirmed as the deployment target.

#### [MODIFY] `.gitignore`

- Track Markdown requirements and implementation plans under `docs/`.
- Ignore only raw source binaries such as `docs/*.pptx` and `docs/*.pdf` when those files should remain local.
- Keep common OS, IDE, dependency, and generated-output exclusions.

#### [REMOVE] Root website duplicates

- Treat `public/` as the sole deployable site directory.
- Remove root copies of `index.html`, `css/`, `js/`, and `assets/` only after the workflow publishes `public/` successfully.
- Add a contributor note stating that deployable files must be changed only under `public/`.

### Information Architecture

Use separate, crawlable HTML pages for primary content rather than hash-only routing:

- `public/index.html`
- `public/company/index.html`
- `public/products/index.html`
- `public/solutions/index.html`
- `public/solar/index.html`
- `public/support/index.html`
- `public/distribution/index.html`
- `public/privacy/index.html`
- `public/terms/index.html`
- `public/sitemap/index.html`

Use relative URLs so navigation and assets work under both the GitHub project-site base path and an approved custom domain. Product category pages may be added when sufficient approved copy and product data are available.

### Shared Frontend

#### [MODIFY] `public/css/style.css`

- Establish design tokens for color, typography, spacing, breakpoints, focus states, and motion.
- Preserve the vibrant professional LED-lighting direction without sacrificing contrast or readability.
- Support mobile navigation, dropdown menus, filters, modals, forms, and responsive media.
- Respect `prefers-reduced-motion` and avoid motion that blocks interaction.

#### [MODIFY] `public/js/app.js`

- Use progressive enhancement: core navigation and content must remain usable without JavaScript.
- Implement accessible navigation, filters, search, modal controls, and form states.
- Remove fake complaint results and unconditional success alerts.
- Display success only after a confirmed endpoint response; display actionable validation, network, and server errors.
- Never embed API secrets or privileged credentials in client-side code.

#### [MODIFY] `public/assets/`

- Keep only approved, licensed brand and product assets.
- Convert large raster images to optimized modern formats with responsive fallbacks where appropriate.
- Use descriptive filenames, dimensions, and alternative text.
- Add approved catalogues, certificates, warranties, and policies under a predictable download structure.

## Content and Data Requirements

- Create an approved content inventory mapping every sitemap requirement to a page, section, owner, and status.
- Verify product names, categories, wattages, lumen output, IP ratings, warranties, and descriptions with the product owner; do not publish fabricated specifications.
- Verify all addresses, telephone numbers, email addresses, grievance contacts, and social profiles.
- Replace copied or unverified references, including `support@polycab.com`, before publication.
- Correct spelling and naming inconsistencies such as ORITTO/Oritto, luminaires/luminaries, promoter, investor, Bhopal, and support.
- Record asset provenance and usage permission.
- Require stakeholder sign-off for legal policies, certifications, claims, and downloadable documents.

## Forms and Integrations

Each production form must define:

- Endpoint owner and request/response contract.
- Required and optional fields with server-side validation.
- Consent text, privacy-policy link, retention policy, and deletion process.
- Anti-spam and rate-limiting controls.
- Accessible pending, success, validation-error, and service-error states.
- Notification recipients without exposing internal addresses or credentials.
- Logging and monitoring that exclude unnecessary personal data.

If an approved endpoint is unavailable, publish a clearly labelled contact alternative instead of a non-functional form.

## SEO, Analytics, and Discoverability

- Provide unique page titles, meta descriptions, canonical URLs, headings, and descriptive link text.
- Add Open Graph metadata and suitable structured data for the organization, website, products, and breadcrumbs when approved content supports it.
- Create `public/robots.txt`, `public/sitemap.xml`, and the human-readable HTML sitemap.
- Use crawlable links rather than JavaScript-only or hash-only navigation for primary pages.
- Optimize image dimensions, loading priority, lazy loading, and compression.
- Add analytics and Search Console verification only after identifiers and consent requirements are approved.
- Prevent duplicate indexing across the GitHub Pages URL and branded domains through canonical URLs and redirects.

## Accessibility and Performance Requirements

- Target WCAG 2.2 AA for keyboard access, focus visibility, semantics, labels, alternatives, contrast, and error messaging.
- Support current desktop and mobile versions of Chrome, Edge, Firefox, and Safari.
- Test at 320 px, 375 px, 768 px, 1024 px, and 1440 px viewport widths.
- Avoid horizontal scrolling at supported widths.
- Target mobile Lighthouse scores of at least 90 for Performance and at least 95 for Accessibility, Best Practices, and SEO on representative pages.
- Ensure animations and third-party widgets do not prevent interaction or cause avoidable layout shifts.

## Verification Plan

### Repeatable Local Checks

Add project scripts so contributors and CI use the same commands:

```text
npm ci
npm run validate
npm run test:links
npm run test:a11y
npm run test:ui
npm run test:lighthouse
```

The validation setup must use pinned development dependencies and cover HTML, CSS, JavaScript syntax/style, internal links, accessibility, and representative browser interactions. Production output remains plain static HTML, CSS, JavaScript, and media.

For a quick local smoke test:

```text
python -m http.server 8000 --directory public
```

### Functional Acceptance

- All header, dropdown, mobile, footer, and breadcrumb links work from the GitHub project-site base path.
- Search and filters return correct results, support keyboard use, and provide an empty state.
- Modals trap focus, close by keyboard, restore focus, and remain usable on mobile.
- Forms reject invalid data and correctly display pending, success, and failure states against the approved endpoint.
- Downloads exist, use correct filenames, and open successfully.
- No placeholder links, fabricated statuses, console errors, mixed content, or missing assets remain.

### Content and SEO Acceptance

- Every approved sitemap item is mapped to published content or an explicitly deferred item.
- Titles, descriptions, canonical URLs, headings, structured data, `robots.txt`, XML sitemap, and HTML sitemap validate.
- Contact details, policies, product claims, certifications, analytics identifiers, and social links have stakeholder approval.
- The canonical domain and redirects resolve over HTTPS without duplicate-indexing paths.

### Deployment Acceptance

- GitHub Pages is configured with **GitHub Actions** as the source.
- The workflow validation and deployment jobs pass on the default branch.
- The deployed artifact contains `index.html` at its root and excludes repository-only files.
- The default Pages URL is smoke-tested before DNS or custom-domain changes.
- The production domain is verified after DNS propagation, HTTPS issuance, and redirect checks.

## Implementation Sequence

1. Record the required product, content, domain, form, complaint, and analytics decisions.
2. Normalize the source requirements into tracked Markdown and obtain content-owner sign-off.
3. Make `public/` the single site source and align the GitHub Pages workflow.
4. Establish crawlable page structure, shared navigation, footer, and responsive design tokens.
5. Implement approved content, products, solutions, solar, support, and distribution pages.
6. Connect approved forms and complaint services; otherwise provide honest fallback contact flows.
7. Add SEO, structured data, analytics consent, accessibility, and performance improvements.
8. Add repeatable validation and browser checks to the deployment workflow.
9. Complete stakeholder acceptance, deploy to the default Pages URL, then configure the approved custom domain.

## Definition of Done

The release is complete only when all Phase 1 requirements are mapped, approved, implemented, validated in CI, deployed successfully, and verified at the production URL. Deferred Phase 2 features must be clearly documented and must not be represented by simulated production behavior.
