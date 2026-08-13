#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

docker info >/dev/null

if [ ! -f .env ]; then
  cp .env.example .env
  echo "已创建 .env，请按生产环境修改密码和密钥。"
fi

echo "正在从 Docker Hub 拉取镜像..."
docker compose pull
docker compose up -d --remove-orphans
docker compose ps
echo "管理后台: http://localhost:8081"
echo "H5 页面:   http://localhost:8082"
