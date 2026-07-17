#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

docker info >/dev/null

if [ ! -f .env ]; then
  cp .env.example .env
  echo "已创建 .env，请按生产环境修改密码和密钥。"
fi

if [ -f delta-game-images.tar ] && ! docker image inspect delta-game-backend:latest delta-game-admin:latest delta-game-h5:latest mysql:8.0 redis:7-alpine >/dev/null 2>&1; then
  docker load -i delta-game-images.tar
fi

docker compose up -d
docker compose ps
echo "管理后台: http://localhost:8081"
echo "H5 页面:   http://localhost:8082"
