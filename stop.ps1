$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root
docker compose down
Write-Host '服务已停止，数据卷未删除。' -ForegroundColor Green
