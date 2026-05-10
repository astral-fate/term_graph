# Sync local huggingface-space/ → a clone of https://huggingface.co/spaces/FatimahEmadEldin/audit-proxy
# Run from repo root:  powershell -ExecutionPolicy Bypass -File scripts/publish-hf-space.ps1
#
# Prereqs: git, HF account. First run: git clone https://huggingface.co/spaces/FatimahEmadEldin/audit-proxy
#          (use HF token as password when prompted). Then set $CloneDir below to that folder.

param(
  [Parameter(Mandatory = $false)]
  [string] $CloneDir = ""
)

$ErrorActionPreference = "Stop"
$RepoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$Src = Join-Path $RepoRoot "huggingface-space"

if (-not (Test-Path $Src)) {
  Write-Error "Missing folder: $Src"
}

if (-not $CloneDir) {
  Write-Host @"

This script copies huggingface-space (backend + data + Dockerfile) into YOUR clone of the HF Space.

STEP 1 — Clone the Space once (outside this repo is fine):
  git clone https://huggingface.co/spaces/FatimahEmadEldin/audit-proxy
  cd audit-proxy

STEP 2 — Run this script with the full path to that clone:
  powershell -ExecutionPolicy Bypass -File scripts/publish-hf-space.ps1 -CloneDir "C:\path\to\audit-proxy"

STEP 3 — Commit and push:
  cd <clone>
  git add -A
  git status
  git commit -m "Add backend + embedded rubric for Docker Space"
  git push

Until you push, huggingface.co will only show Dockerfile/README from the initial Space commit.

"@ 
  exit 0
}

$CloneDir = Resolve-Path $CloneDir
Write-Host "Source: $Src"
Write-Host "Destination: $CloneDir"

robocopy $Src $CloneDir /E /XD .git /NFL /NDL /NJH /NJS | Out-Null
if ($LASTEXITCODE -ge 8) {
  Write-Error "robocopy failed with exit code $LASTEXITCODE"
}

Write-Host "Done. Next (from clone dir): git add -A && git commit && git push"
