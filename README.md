# Shiva Rami Reddy Madira — Portfolio

Live portfolio with automated CI/CD via GitHub Actions → GitHub Pages.

---

## Architecture Decision: Why No Docker?

This is a **single static HTML file** with zero runtime dependencies — no Node.js, no Python, no server.  
Containerizing it would mean:
- Wrapping `nginx` + one HTML file into a Docker image (~50MB for a ~90KB file)
- Needing a container registry (Docker Hub / GHCR)
- Needing a paid container host (Fly.io, Render, Railway) instead of free GitHub Pages
- Adding image scanning, push secrets, and registry auth for zero added security value

**The right tool for a static site is a static host.** GitHub Pages is free, fast, CDN-backed, and built exactly for this. Docker belongs in this workflow only if a backend is ever added.

---

## CI/CD Pipeline

```
Push / PR to main
       │
       ▼
┌─────────────────────────────┐
│   JOB 1 — Quality Gates     │  runs on every push + PR
│                             │
│  ① HTML Validation          │  HTMLHint — catches broken markup
│  ② Secret Scanning          │  Gitleaks — detects leaked keys/tokens
│  ③ Lighthouse CI            │  Performance ≥85 · A11y ≥90 · SEO ≥90
└─────────────┬───────────────┘
              │ passes
              ▼
┌─────────────────────────────┐
│   JOB 2 — Deploy            │  only on push to main
│                             │
│  GitHub Pages deployment    │
│  Live URL printed to log    │
└─────────────────────────────┘
```

**PRs:** Quality checks run, deploy is blocked until merged to `main`.  
**Direct push to main:** Quality → Deploy. Site updates in ~60 seconds.

---

## One-Time Setup

### 1. Create the GitHub repository

```bash
# Name it exactly this for the cleanest URL (madirashivaram.github.io)
# Go to github.com → New repository
# Repository name: madirashivaram.github.io
# Visibility: Public
# Do NOT initialise with README
```

### 2. Push your code

```bash
# In the folder containing index.html and these config files:
git init
git add .
git commit -m "feat: initial portfolio"
git branch -M main
git remote add origin https://github.com/madirashivaram/madirashivaram.github.io.git
git push -u origin main
```

### 3. Enable GitHub Pages with Actions

```
GitHub repo → Settings → Pages
  Source: GitHub Actions   ← select this (not "Deploy from a branch")
```

### 4. Enable branch protection (prevents broken code reaching live site)

```
GitHub repo → Settings → Branches → Add rule
  Branch name pattern: main
  ✅ Require status checks to pass before merging
      → Add: "Quality & Security Checks"
  ✅ Require pull request reviews before merging (optional but recommended)
  ✅ Do not allow bypassing the above settings
```

### 5. Verify secret scanning is on (it's free)

```
GitHub repo → Settings → Security → Code security and analysis
  ✅ Secret scanning          → Enable
  ✅ Push protection          → Enable   (blocks commits containing secrets)
  ✅ Dependabot alerts        → Enable
  ✅ Dependabot security updates → Enable
```

That's it. Your live URL will be: **https://madirashivaram.github.io**

---

## Making Updates

```bash
# Edit index.html locally, then:
git add index.html
git commit -m "feat: update experience section"
git push origin main

# Pipeline runs automatically:
# HTML lint → Secret scan → Lighthouse → Deploy (~60 sec total)
```

---

## Security Layers in Place

| Layer | Tool | What it catches |
|---|---|---|
| HTML validation | HTMLHint | Broken markup, missing alt tags, duplicate IDs |
| Secret scanning | Gitleaks | Accidentally committed API keys, tokens, passwords |
| Secret push protection | GitHub native | Blocks the push before it ever reaches the repo |
| Quality gates | Lighthouse CI | Performance regression, accessibility issues, SEO drops |
| Dependency updates | Dependabot | Outdated/vulnerable GitHub Actions versions |
| Deployment control | Branch protection | Nothing reaches `main` without passing all checks |

---

## Repository Structure

```
madirashivaram.github.io/
├── index.html                        # The entire portfolio (single file)
├── .htmlhintrc                       # HTML linting rules
├── .lighthouserc.json                # Lighthouse CI thresholds
├── .gitleaks.toml                    # Secret scan allowlist (base64 photo)
├── .github/
│   ├── dependabot.yml                # Auto-update Actions dependencies
│   └── workflows/
│       └── ci-cd.yml                 # Full CI/CD pipeline
└── README.md
```
