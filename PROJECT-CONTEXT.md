# Eksenart — Project Context & Continuation Guide

_Last updated: 2026-07-01._ This single file captures everything needed to continue the
work on any machine. The actual code + live infra are all in the cloud (GitHub + Cloudflare
+ Supabase), so nothing is trapped on one computer.

## How to continue on another machine (laptop)

1. **Log into the cloud accounts** in your browser: Cloudflare (`Gmcftci@gmail.com`), Supabase, GoDaddy, GitHub (`mcftc`).
2. **Clone both repos:**
   ```bash
   gh repo clone mcftc/eksenart-mimarlik      # this repo (architecture site)
   gh repo clone mcftc/eksen-art-app          # the expo site (branch: seo-and-cloudflare-migration)
   ```
3. **Install tooling:** Node ≥ 22.12, `npm i -g wrangler` (or use `npx wrangler`), and `gh`.
4. **Start a new Claude Code session** inside a repo and tell it:
   > "Read `PROJECT-CONTEXT.md` (and the repo's HANDOFF/KULLANIM/CLAUDE.md), then continue."
   That gives Claude full context without needing this chat transcript.
5. (Optional) To carry the auto-memory notes too, copy the folder
   `~/.claude/projects/<this-project-hash>/memory/` from the old machine into the laptop's
   matching `~/.claude/projects/<...>/memory/`. Not required — this doc is the source of truth.

> Note: a Claude Code chat transcript is stored locally per machine; you don't move the
> transcript — you move the **state** (repos) + **context** (this doc + memory notes).

---

## The two projects

### 1) eksenart.com — Eksenart Fuar & Stand (exhibition stands)
- **Repo:** `github.com/mcftc/eksen-art-app` (PRIVATE) — branch **`seo-and-cloudflare-migration`** (PR #1, not merged; live worker deploys from this branch).
- **Stack:** Next.js 15.5 + React 19 + Supabase (Auth/DB/Storage) + Drizzle + **OpenNext → Cloudflare Workers**.
- **Live:** `https://eksenart.com` (Cloudflare Workers; **migrated off Vercel** — Vercel decommissioned). www → apex 308.
- **Deploy:** `cd eksen-art-app && export CLOUDFLARE_API_TOKEN=… CLOUDFLARE_ACCOUNT_ID=0474c2c63ffecf03181ffe8e4e1d9acc && npm run deploy` (= `opennextjs-cloudflare build && … deploy`). Needs `.env.local` with the **public** Supabase vars (URL + publishable key) — server secrets are NOT needed at runtime.
- Docs in repo: `HANDOFF.md`, `CLOUDFLARE_DEPLOYMENT.md`, `CLAUDE.md`.

### 2) mimarlik.eksenart.com — Eksenart Mimarlık (architecture office)
- **Repo:** `github.com/mcftc/eksenart-mimarlik` (PUBLIC) — branch `main`.
- **Stack:** **Astro 5 + Tailwind v4, 100% static** → Cloudflare Workers (Static Assets). Git-based CMS (**Sveltia**). No database.
- **Live:** `https://mimarlik.eksenart.com`.
- **Deploy:** push to `main` → **GitHub Action** auto-builds (Node 22) + deploys. Manual: `npm run build && npx wrangler deploy` (with CF env vars).
- **CMS:** `/admin` → "Sign In with Token" (GitHub fine-grained PAT, repo `eksenart-mimarlik`, Contents: read/write). CRUD for projects, services, bölgeler, rehber, **site settings**, image upload. Docs: `KULLANIM.md`.

Both sites cross-link (footer + eksenart first-visit modal). Same brand, two disciplines.

---

## What's done
- **eksenart.com SEO:** fixed www/non-www duplicate-host (308), Product→Service schema, seeded moduler/paket stand types, legacy 404 redirects, titles, 4 programmatic pages (istanbul/cnr/tüyap/m²-fiyatları), security headers, sitemap/robots on apex.
- **eksenart.com migration:** Vercel → Cloudflare (OpenNext); DNS cut over at GoDaddy; SSL live; email (Google MX) preserved; Vercel removed. Supabase Auth hardened (signups disabled, catalogs RLS, advisors). **Leaked secrets scrubbed from DEPLOYMENT.md** (rotate them — see below).
- **eksenart.com brand chooser:** first-visit modal (SEO-safe) + footer link to mimarlik.
- **mimarlik.eksenart.com:** full site (home, 6 service hubs, projeler + case studies, stüdyo, iletişim, 404), dark theme + animated background + theme toggle (brand-matched to eksenart), Sveltia CMS, JSON-LD, sitemap, robots.
- **mimarlik Phase 2 SEO:** **24 İstanbul district pages** (`/bolgeler/*`) + **6 rehber guides** (`/rehber/*`), unique content, in sitemap, CMS-editable.
- **Both:** `llms.txt` at root (AI/agent readiness); AI crawlers allowed in robots.

## Your action items (pending)
1. **🔴 Rotate every credential shared in chat** (see "Credentials" — they're exposed in this session's history): Supabase service_role key + DB password + PAT, Cloudflare API token + R2 keys, GoDaddy API key/secret. Scrub old secrets from git history (BFG/git-filter-repo).
2. **Google Search Console:** add `mimarlik.eksenart.com` as a property; resubmit **both** sitemaps; Request Indexing on key pages. (Biggest lever for ranking + AI Overview eligibility.)
3. **Real content:** upload real project photos + plan drawings via the mimarlik CMS (currently placeholders); set a free **Web3Forms** access key in `src/pages/iletisim.astro`.
4. **Optional:** eksenart Lighthouse/CWV pass (trim animated bg/JS); reduce mimarlik repo to private if you fix GitHub Actions billing (it's public to get free CI); add real OG images.

## Credentials — WHERE they live (values are NOT stored in the repos)
- **Cloudflare:** dashboard, account `0474c2c63ffecf03181ffe8e4e1d9acc`. API token used for deploys — **rotate**.
- **Supabase:** dashboard, project `abxxhysgdhrigvvrrczx` (eu-central-1). service_role + DB password + PAT — **rotate**.
- **GoDaddy:** registrar for eksenart.com (nameservers now point to Cloudflare). API key/secret — **rotate**.
- **GitHub:** `mcftc`, both repos. CF token is stored as an Actions **secret** on the mimarlik repo (not in code).
- All the above were pasted into the Claude chat during setup → treat as compromised → rotate.

## Key facts
- eksenart.com email = Google Workspace (`MX → smtp.google.com`) — preserved through the DNS move; don't break the MX record.
- Cloudflare zone for eksenart.com: `4e77bf8f287da97264c55303f761542e`. Both apex + www + mimarlik subdomain are Worker custom domains.
- mimarlik KV namespace (unused placeholder from an earlier attempt): fine to ignore.
- R2 is NOT enabled on the Cloudflare account (image uploads use the git repo via Sveltia, not R2).
