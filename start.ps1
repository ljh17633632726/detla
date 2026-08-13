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
    Write-Host "已创建 .env，请先填写其中的生产环境配置。"
}

Write-Host "正在从 Docker Hub 拉取镜像..."
docker compose pull
docker compose up -d --remove-orphans
docker compose ps
Write-Host "Admin: http://localhost:8081"
Write-Host "H5:    http://localhost:8082"
