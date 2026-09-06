<!-- BEGIN:nextjs-agent-rules -->

# Next.js: ALWAYS read docs before coding

Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`. Your training data is outdated — the docs are the source of truth.

<!-- END:nextjs-agent-rules -->

# AGENTS.md

Personal website (azal.im) built with Next.js App Router. Sections: homepage (experience, education, awards), blog, videos, movies, academics, projects, resume, and contact.

## Stack

- **Next.js 16** (App Router, React Server Components) with **React 19** and **Turbopack** (default for dev and build).
- **TypeScript 7** (strict mode; the native `tsc` type-checks, there is no JS compiler API), **Tailwind CSS v4**, **shadcn/ui** (new-york style, neutral base).
- **Oxlint** for linting (`.oxlintrc.json`) and **Prettier** for formatting.
- **Zod** for schema validation, **TanStack Query** for client data-fetching, **React Hook Form** for forms.
- **Shiki** / `rehype-pretty-code` for code highlighting, **next-mdx-remote-client** for MDX blog posts.
- **Nodemailer** (Gmail) for the contact form, **TMDB** + **Google Cloud Translation** APIs for movie data.

## Commands

```bash
npm run dev        # start dev server (Turbopack)
npm run build      # production build
npm run start      # serve production build
npm run lint       # oxlint (Next.js, React, jsx-a11y and import rules)
npm run typecheck  # tsc --noEmit (TypeScript 7 native compiler)
npm test           # vitest run
npm run resume:pdf # build, then print /resume to public/resume/<pdf> with local Chrome
```

Tests live in `lib/**/*.test.ts` and run with `npm test`. Before considering a change done, run `npm run lint` and `npm run typecheck`, and, for non-trivial changes, `npm run build` (the project uses `noEmit`, so types are only checked by `typecheck` and `build`).

## Project layout

- `app/` — App Router routes. Route-private components live in a `_components/` folder beside the route (e.g. `app/blog/_components/`). The homepage is the `app/(home)/` route group.
- `app/_components/` — shared components; `app/_components/ui/` holds shadcn/ui primitives.
- `app/api/` — route handlers: `contact` (sends email), `movies` (paginated movie list), `og` (Open Graph image generation).
- `lib/` — domain logic grouped by feature (`movies/`, `blog/`, `academics/`, `projects/`, `experiences/`, `education/`, `awards/`, `resume/`, etc.), each typically with a `types.ts` (Zod schemas + inferred types) and loader/helper modules. `lib/constants.ts` holds env vars and the `ROUTES` helper; `lib/utils.ts` has `cn()` and search-param helpers; `lib/dates.ts` handles `YYYY-MM` dates and LinkedIn-style durations; `lib/rich-text.ts` parses the `**bold**` markers allowed in data files.
- `data/` — content as static files: `movies.json`, `movies-metadata.json`, `courses.json`, `projects.json`, `experiences.json`, `education.json`, `awards.json`, `resume.json`, and `data/posts/*.mdx` for blog posts. Data is read from disk at module load (`process.cwd()` paths) and validated with Zod.
- `scripts/` — standalone scripts run with `tsx` (e.g. `build-resume-pdf.ts`).
- `public/` — static assets.

## Conventions

- **Imports** use the `@/*` alias mapped to the repo root (e.g. `@/lib/utils`, `@/app/_components/ui/card`).
- **Routing**: never hardcode URLs — use the `ROUTES` object in `lib/constants.ts`.
- **Validation**: define data shapes as Zod schemas and derive types with `z.infer`. Loaders parse and throw on invalid data; follow the existing pattern in `lib/academics/academics.ts` and `lib/blog/posts.tsx`.
- **Styling**: Tailwind utility classes; compose conditional classes with `cn()`. Class ordering is enforced by `prettier-plugin-tailwindcss` — run Prettier, don't hand-sort.
- **Components**: default to Server Components; add `"use client"` only when needed (interactivity, hooks, TanStack Query). Add new UI primitives via the shadcn CLI (config in `components.json`), not by hand.
- **Icons** come from `lucide-react`.
- Match the formatting and naming of surrounding files; Prettier + Oxlint are the source of truth.

## Environment

Copy `.env.example` to `.env`. Keys: `BASE_URL`, `GOOGLE_CLOUD_API_KEY`, `TMDB_API_KEY`, `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `CONTACT_EMAIL`. The contact form, movie metadata, and translation features depend on these; the site otherwise runs without them.

## Experience, education, awards, and resume

`data/experiences.json` and `data/education.json` are the single source of truth for professional experience and education; they are modeled after LinkedIn (employment type, location type, `YYYY-MM` dates with `null` meaning "Present", skills, career breaks). Each position carries two descriptions: `full` (as written on LinkedIn, with paragraphs and bullet highlights; rendered on the homepage) and `concise` (a single paragraph, no bullets; used by the resume). `data/awards.json` holds awards (name, issuer, occurrences) and drives both the homepage Awards section and the resume's "Academic Recognitions". Text fields may use `**bold**` markers.

`data/resume.json` holds resume-only content (header, contacts, summary, skills, languages). The resume page renders `app/resume/_components/ResumeDocument.tsx` as an A4 sheet; `npm run resume:pdf` builds the site and prints that page to `public/resume/luca-azalim-resume.pdf` with a locally installed Chrome/Chromium (override with `CHROME_PATH`). The PDF is committed, so regenerate it whenever experience, education, or resume data changes.

## Movie metadata

`lib/movies/metadata-builder.ts` enriches `data/movies.json` against TMDB and writes `data/movies-metadata.json`. It is a standalone script that loads `.env` directly and requires `TMDB_API_KEY`. Run it when adding new movies to refresh metadata before committing.

## Git

- Default branch is `main`. Only commit or push when asked; branch first if working off `main`.
- Don't commit `.env`, `.next/`, `node_modules/`, or `tsconfig.tsbuildinfo` (covered by `.gitignore` / build artifacts).
