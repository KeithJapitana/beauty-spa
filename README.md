# Beauty Spa

Marketing website for a beauty spa, with a content-managed blog, portfolio, webinar registration, and an admin dashboard.

Built as a full-stack Next.js application — public marketing pages plus an authenticated back office for managing content and inquiries.

## Features

### Public site
- **Marketing pages** — home, about, services, contact, plus privacy and terms
- **Blog** — posts authored through the admin dashboard
- **Portfolio** — gallery of work
- **Webinars** — listings with registration
- **Contact and inquiry forms** — validated with React Hook Form + Zod, protected by reCAPTCHA, delivered by email via Resend
- **GSAP animations** and dark/light theming
- **SEO** — sitemap generation via `next-sitemap`, GA4 and GTM analytics

### Admin dashboard (`/admin`)
- **Posts** — create and manage blog content with the Novel rich-text editor
- **Portfolio** — manage gallery entries
- **Webinars** — manage listings and registrations
- **Inquiries** — review contact form submissions
- **Users** — account management

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| UI | React 19, shadcn/ui, Base UI, Tailwind CSS 4 |
| Animation | GSAP + `@gsap/react` |
| Database & auth | Supabase (Postgres, `@supabase/ssr`) |
| Forms | React Hook Form + Zod |
| Editor | Novel |
| Email | Resend |
| SEO | `next-sitemap` |
| Deployment | Docker; see [`DEPLOYMENT.md`](DEPLOYMENT.md) and [`HOSTINGER_DEPLOYMENT.md`](HOSTINGER_DEPLOYMENT.md) |

## Getting started

### Prerequisites

- Node.js 20+
- A Supabase project
- A Resend account (email delivery) and Google reCAPTCHA keys (form protection)

### 1. Install

```bash
npm install
```

### 2. Configure environment

Create `.env.local`:

```bash
# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Email (Resend)
RESEND_API_KEY=
RESEND_FROM_EMAIL=
RESEND_TO_EMAIL=

# reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET_KEY=

# Analytics (optional)
NEXT_PUBLIC_GA4_ID=
NEXT_PUBLIC_GTM_ID=
```

> `SUPABASE_SERVICE_ROLE_KEY` and `RECAPTCHA_SECRET_KEY` are server-side only — never expose them to the client or commit them.

### 3. Apply database migrations

SQL migrations live in `supabase/migrations`. Apply them to your Supabase project before first run.

### 4. Run the dev server

```bash
npm run dev
```

Open http://localhost:3000.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `postbuild` | Generates the sitemap automatically after build |

## Project structure

```
src/app/
  page.tsx             Home
  about/  services/  contact/  privacy/  terms/  thank-you/
  blog/                Public blog
  portfolio/           Public gallery
  webinars/            Listings and registration
  login/               Admin authentication
  admin/               Back office
    posts/  portfolio/  webinars/  inquiries/  users/
  api/                 Route handlers
supabase/migrations/   Database schema
public/                Static assets
```

## Deployment

Dockerfile included. Deployment notes are in [`DEPLOYMENT.md`](DEPLOYMENT.md), with a Hostinger-specific walkthrough in [`HOSTINGER_DEPLOYMENT.md`](HOSTINGER_DEPLOYMENT.md).
