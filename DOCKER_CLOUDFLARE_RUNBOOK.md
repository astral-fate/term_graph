# Term Graph Runbook (Docker + Cloudflare)

This guide is for running and deploying the project **without installing Node.js locally**.

## 1) Latest GitHub/Deploy Setup

- Auto deploy is configured in `.github/workflows/deploy.yml`.
- Any push to `main` triggers:
  1. Build (`node build.js`)
  2. Deploy to Cloudflare Pages (`wrangler pages deploy dist --project-name=term-graph --branch=main`)

Required GitHub repository secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

If those secrets are present, pushing to `main` is enough for auto-deploy.

## 2) Local Run (No Node.js Installed)

### Option A: Run static site directly from repo (fastest)

From project root (PowerShell):

```powershell
docker run --rm -it -p 8080:8080 -v "${PWD}:/site" -w /site python:3.12-slim python -m http.server 8080
```

Open:

- <http://localhost:8080/index.html>

### Option B: Build dist with Docker, then serve dist

Build `dist` using Docker Compose:

```powershell
docker compose run --rm build
```

Serve built output:

```powershell
docker run --rm -it -p 8080:8080 -v "${PWD}/dist:/site" -w /site python:3.12-slim python -m http.server 8080
```

Open:

- <http://localhost:8080/index.html>

## 3) Build Commands (Docker Only)

### Build artifacts

```powershell
docker compose run --rm build
```

This runs `node build.js` in container and outputs files to `dist/`.

## 4) Manual Cloudflare Deploy from Your Machine (Docker Only)

Set token in PowerShell:

```powershell
$env:CLOUDFLARE_API_TOKEN="YOUR_TOKEN_HERE"
```

Deploy using compose service:

```powershell
docker compose run --rm deploy
```

This executes:

```bash
npx wrangler pages deploy dist --project-name=term-graph --branch=main
```

## 5) Push to Trigger Auto Deploy

```powershell
git add index.html DOCKER_CLOUDFLARE_RUNBOOK.md
git commit -m "Fix language/detail rendering and add Docker+Cloudflare runbook"
git push origin main
```

After push, verify deployment in:

- GitHub Actions tab (workflow: `Deploy to Cloudflare Pages`)
- Cloudflare Pages project `term-graph`

## 6) Troubleshooting

- If deploy fails with auth errors:
  - Check `CLOUDFLARE_API_TOKEN` scope and validity.
  - Check `CLOUDFLARE_ACCOUNT_ID` secret in GitHub.
- If local Docker serve is blank:
  - Confirm you are in repo root.
  - Check file exists: `index.html` (or `dist/index.html` if serving dist).
- If build misses files:
  - Update copy lists in `build.js` and `build.ps1`.

