$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

docker info > $null 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Error "Docker engine is not running. Please start Docker Desktop."
    exit 1
}

if (!(Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "Created .env. Please update it for production."
}

$images = @(
    "delta-game-backend:latest",
    "delta-game-admin:latest",
    "delta-game-h5:latest",
    "mysql:8.0",
    "redis:7-alpine"
)
$imagesMissing = $false
foreach ($image in $images) {
    docker image inspect $image > $null 2>&1
    if ($LASTEXITCODE -ne 0) { $imagesMissing = $true }
}

if ((Test-Path "delta-game-images.tar") -and $imagesMissing) {
    Write-Host "Loading offline images..."
    docker load --input "delta-game-images.tar"
}

docker compose up -d
docker compose ps
Write-Host "Admin: http://localhost:8081"
Write-Host "H5:    http://localhost:8082"
