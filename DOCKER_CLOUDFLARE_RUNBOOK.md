# Term Graph Runbook (Docker + Cloudflare)

This guide is for running and deploying the project **without installing Node.js locally**.

## 1) Latest GitHub/Deploy Setup

- Auto deploy is configured in `.github/workflows/deploy.yml`.
- Any push to `main` triggers:
  1. Build (`node build.js`)
  2. Deploy to Cloudflare Pages (`wrangler pages deploy --project-name=term-graph --branch=main` — uses root `wrangler.toml` so static files come from `dist/` and **Pages Functions** from `./functions`; passing only `dist` on the CLI can omit Functions and break `/api/v1/chat/completions`.)

Required GitHub repository secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

If those secrets are present, pushing to `main` is enough for auto-deploy.

### NVIDIA API (rewrite + deep dive)

The browser **never** stores the NVIDIA key. Chat calls go to **`/api/v1/chat/completions`**, implemented by `functions/api/v1/chat/completions.js`, which reads **`NVIDIA_API_KEY`** from the Worker/Pages environment.

In the Cloudflare dashboard: **Pages → your project → Settings → Environment variables** → add **`NVIDIA_API_KEY`** (encrypt). Redeploy after saving.

Local preview **with** Functions: build `dist`, then run Wrangler from repo root using **`.dev.vars`** (see `.dev.vars.example`). Plain `python -m http.server` **does not** run Functions, so chat requests will 404 until you use `wrangler pages dev` or the deployed site.

If DevTools shows **CORS errors for NVIDIA’s integrate host**, the tab is almost certainly running an **old JavaScript bundle** that called NVIDIA from the browser. Deploy the latest `main`, then **hard-refresh** (Ctrl+Shift+R). The app must call only **`/api/v1/chat/completions`** on your Pages origin.

## 2) Local Run (No Node.js Installed)

### Option 0: One-command preview with Docker Compose (recommended)

From project root (PowerShell):

```powershell
docker compose up serve
```

Open:

- <http://localhost:8080/index.html>

Stop:

```powershell
docker compose down
```

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

**You must set `CLOUDFLARE_API_TOKEN` every time (or Docker has no token and Wrangler opens OAuth in the container → `xdg-open` error).**  
`CLOUDFLARE_ACCOUNT_ID` alone is not enough.

### Recommended: project `.env` file (works in cmd and PowerShell)

1. Copy the example file:

   ```cmd
   copy .env.example .env
   ```

2. Edit `.env` and set your real **API token** and **Account ID** (no quotes, no spaces around `=`).

3. Build, then deploy:

   ```cmd
   docker compose run --rm build
   docker compose run --rm deploy
   ```

Docker Compose reads `.env` in the project folder and passes those values into the `deploy` service.

### Alternative: set variables only in the current terminal session

**PowerShell** (use these lines only in PowerShell, not in `cmd.exe`):

```powershell
$env:CLOUDFLARE_API_TOKEN="YOUR_TOKEN_HERE"
$env:CLOUDFLARE_ACCOUNT_ID="YOUR_ACCOUNT_ID_HERE"
```

**cmd.exe** (use `set` only in Command Prompt, not PowerShell-style `$env:`):

```cmd
set CLOUDFLARE_API_TOKEN=YOUR_TOKEN_HERE
set CLOUDFLARE_ACCOUNT_ID=YOUR_ACCOUNT_ID_HERE
```

If you run `$env:...` from **cmd**, Windows shows: `The filename, directory name, or volume label is incorrect` — that is expected; open **PowerShell** for `$env:` or use **`set`** in **cmd**.

Then:

```cmd
docker compose run --rm build
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

- If you see `The "CLOUDFLARE_API_TOKEN" variable is not set` when running **`build`**:
  - That was caused by old Compose files using `${CLOUDFLARE_API_TOKEN}` in the YAML (Compose interpolates the whole file). The repo now uses pass-through `environment` for `deploy` only, so `build` no longer needs Cloudflare env vars. Update `docker-compose.yaml` or pull latest.
- If deploy fails with auth errors:
  - Check `CLOUDFLARE_API_TOKEN` scope and validity.
  - Check `CLOUDFLARE_ACCOUNT_ID` secret in GitHub.
- If you see OAuth + `xdg-open` errors inside Docker:
  - Token was not passed into container.
  - In `cmd.exe`, use `set CLOUDFLARE_API_TOKEN=...` (not `$env:...`).
  - Then rerun `docker compose run --rm deploy`.
- If local Docker serve is blank:
  - Confirm you are in repo root.
  - Check file exists: `index.html` (or `dist/index.html` if serving dist).
- If build misses files:
  - Update copy lists in `build.js` and `build.ps1`.

