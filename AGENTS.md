<!-- BEGIN:nextjs-agent-rules -->

# Next.js: ALWAYS read docs before coding

Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`. Your training data is outdated — the docs are the source of truth.

<!-- END:nextjs-agent-rules -->

# AGENTS.md

Personal website (azal.im) built with Next.js App Router. Sections: homepage (experience, education, awards, projects), blog, videos, movies, academics, resume, and contact.

## Stack

- **Next.js 16** (App Router, React Server Components) with **React 19** and **Turbopack** in dev.
- **TypeScript** (strict mode), **Tailwind CSS v4**, **shadcn/ui** (new-york style, neutral base).
- **Zod** for schema validation, **TanStack Query** for client data-fetching, **React Hook Form** for forms.
- **Shiki** / `rehype-pretty-code` for code highlighting, **next-mdx-remote-client** for MDX blog posts.
- **Nodemailer** (Gmail) for the contact form, **TMDB** + **Google Cloud Translation** APIs for movie data.

## Commands

```bash
npm run dev      # start dev server (Turbopack)
npm run build    # production build
npm run start    # serve production build
npm run lint     # eslint (next/core-web-vitals + prettier)
```

There is no test suite. Before considering a change done, run `npm run lint` and, for non-trivial changes, `npm run build` to catch type errors (the project uses `noEmit`, so types are only checked at build/lint time).

## Project layout

- `app/` — App Router routes. Route-private components live in a `_components/` folder beside the route (e.g. `app/blog/_components/`). The homepage is the `app/(home)/` route group.
- `app/_components/` — shared components; `app/_components/ui/` holds shadcn/ui primitives.
- `app/api/` — route handlers: `contact` (sends email), `movies` (paginated movie list), `og` (Open Graph image generation).
- `lib/` — domain logic grouped by feature (`movies/`, `blog/`, `academics/`, `projects/`, `resume/`, etc.), each typically with a `types.ts` (Zod schemas + inferred types) and loader/helper modules. `lib/constants.ts` holds env vars and the `ROUTES` helper; `lib/utils.ts` has `cn()` and search-param helpers.
- `data/` — content as static files: `movies.json`, `movies-metadata.json`, `courses.json`, `projects.json`, and `data/posts/*.mdx` for blog posts. Data is read from disk at module load (`process.cwd()` paths) and validated with Zod.
- `public/` — static assets.

## Conventions

- **Imports** use the `@/*` alias mapped to the repo root (e.g. `@/lib/utils`, `@/app/_components/ui/card`).
- **Routing**: never hardcode URLs — use the `ROUTES` object in `lib/constants.ts`.
- **Validation**: define data shapes as Zod schemas and derive types with `z.infer`. Loaders parse and throw on invalid data; follow the existing pattern in `lib/academics/academics.ts` and `lib/blog/posts.tsx`.
- **Styling**: Tailwind utility classes; compose conditional classes with `cn()`. Class ordering is enforced by `prettier-plugin-tailwindcss` — run Prettier, don't hand-sort.
- **Components**: default to Server Components; add `"use client"` only when needed (interactivity, hooks, TanStack Query). Add new UI primitives via the shadcn CLI (config in `components.json`), not by hand.
- **Icons** come from `lucide-react`.
- Match the formatting and naming of surrounding files; Prettier + ESLint are the source of truth.

## Environment

Copy `.env.example` to `.env`. Keys: `BASE_URL`, `GOOGLE_CLOUD_API_KEY`, `TMDB_API_KEY`, `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `CONTACT_EMAIL`. The contact form, movie metadata, and translation features depend on these; the site otherwise runs without them.

## Movie metadata

`lib/movies/metadata-builder.ts` enriches `data/movies.json` against TMDB and writes `data/movies-metadata.json`. It is a standalone script that loads `.env` directly and requires `TMDB_API_KEY`. Run it when adding new movies to refresh metadata before committing.

## Git

- Default branch is `main`. Only commit or push when asked; branch first if working off `main`.
- Don't commit `.env`, `.next/`, `node_modules/`, or `tsconfig.tsbuildinfo` (covered by `.gitignore` / build artifacts).
