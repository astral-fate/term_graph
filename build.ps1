# Term Graph Build Script (PowerShell Version)
# No Node.js required!

$distDir = "dist"

# Clean dist
if (Test-Path $distDir) {
    Remove-Item -Recurse -Force $distDir
}
New-Item -ItemType Directory -Path $distDir

# Folders to copy
$folders = @('assets', 'css', 'js', 'fonts', 'images', 'glossary_terms', 'functions')

# Files to copy from root
$files = @('index.html', 'landing.html', 'explore.html', 'glossary-ar.html', '_redirects', 'glossary_meta.json', 'glossary_enriched.json', 'glossary.jsonl')

# Copy folders
foreach ($f in $folders) {
    if (Test-Path $f) {
        Copy-Item -Recurse -Path $f -Destination (Join-Path $distDir $f)
        Write-Host "Copied folder: $f"
    }
}

# Copy root files
foreach ($f in $files) {
    if (Test-Path $f) {
        Copy-Item -Path $f -Destination (Join-Path $distDir $f)
        Write-Host "Copied file: $f"
    }
}

Write-Host "Build completed! Files are in the dist folder."
Write-Host "To deploy using Docker, run:"
Write-Host "docker run --rm -v ${PWD}:/app -w /app node:20-slim npx wrangler pages deploy dist --project-name=term-graph --branch=main"
