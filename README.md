# 三角洲游戏平台 Docker 部署包

本目录为可直接上传和部署的 Docker 离线交付包，不包含项目源码。包含后端、PC 管理后台、H5 页面、MySQL、Redis 的镜像及一键部署文件。

## 包含内容

| 文件 | 说明 |
| --- | --- |
| `delta-game-images.tar` | Docker 离线镜像包，需从下方下载后放入本目录 |
| `docker-compose.yml` | 服务编排文件 |
| `.env.example` | 环境变量配置模板 |
| `start.bat` / `start.ps1` / `start.sh` | Windows/Linux 一键启动脚本 |
| `stop.bat` / `stop.ps1` / `stop.sh` | 停止服务脚本 |
| `delta_game.sql` | 数据库初始化脚本 |
| `delta_game_recharge_migration.sql` | 已有数据库升级脚本 |
| `部署文档.md` | 完整部署和配置说明 |

## 最近更新（2026-07-17）

- H5 页面已接入微信 H5 支付，支持手机浏览器完成订单支付和余额充值。
- 增加 Docker 离线镜像包和 Windows/Linux 一键部署能力，无需拉取项目源码。
- 微信支付配置支持后台动态维护，修改 AppID、商户号、回调地址、证书等内容后通常无需重启后端。
- 增加余额充值套餐，后台可配置“充值金额、赠送金额、启用状态和排序”。
- 用户从“我的 -> 钱包 -> 立即充值”进入充值页，支付成功后按“充值金额 + 赠送金额”入账并记录 `RECHARGE` 流水。
- 充值支付单保存当时的赠送金额，后台修改套餐不会影响已经发起的历史支付单。

## Docker 启动

### 镜像下载

镜像包不提交到 GitHub/Gitee 仓库，请先下载并保存为本目录下的 `delta-game-images.tar`：

- 主下载地址：https://lenglengyou.top/upload/delta-game-images.tar
- 备用百度网盘：链接 https://pan.baidu.com/s/1v4SgG5p7Dey-ZjkU-0qgiA?pwd=ujdc，提取码：`ujdc`

主下载地址速度较慢时可尝试开启 VPN；百度网盘用于备用下载。

### 运行要求

- Windows 安装 Docker Desktop；Linux 安装 Docker Engine。
- Docker Compose v2。
- 建议至少 2 核 CPU、4GB 内存、40GB 可用磁盘。
- H5 微信支付和支付回调必须使用公网 HTTPS 域名。

### Windows

1. 下载 `delta-game-images.tar` 并放到本目录。
2. 复制 `.env.example` 为 `.env`。
3. 修改 `.env` 中的数据库密码、Redis 密码、JWT 密钥和 AES 密钥。
4. 双击 `start.bat`，或在 PowerShell 执行 `./start.ps1`。

启动后访问：

- 管理后台：`http://localhost:8081`
- H5 页面：`http://localhost:8082`

### Linux

```bash
cp .env.example .env
vi .env
chmod +x start.sh stop.sh
./start.sh
```

常用命令：

```bash
docker compose ps
docker compose logs -f backend
docker compose restart backend
./stop.sh
```

启动脚本会自动检查同目录的 `delta-game-images.tar`，缺少镜像时自动加载离线镜像，然后执行 `docker compose up -d`。

## 微信支付配置

启动后登录后台，进入“系统管理 -> 系统配置 -> 微信支付配置”，配置：

1. 启用微信支付
2. 微信支付 AppID
3. 商户号
4. 支付回调地址，例如 `https://你的域名/api/pay/wx/notify`
5. API v3 密钥
6. 商户证书序列号
7. 微信支付公钥 ID
8. 上传商户私钥和微信支付公钥
9. H5 客户端类型，普通手机浏览器填写 `WAP`

保存后配置动态生效，通常不需要重启容器。支付证书保存在 `upload-data` Docker 卷，请勿删除。

H5 支付不能使用 `localhost` 或内网 IP，回调地址必须是微信可访问的 HTTPS 地址。

## 余额充值套餐

后台进入“系统管理 -> 余额充值套餐”，可配置套餐名称、充值金额、赠送金额、排序和启用状态。默认套餐为：

- 充值 100 元，赠送 10 元
- 充值 300 元，赠送 40 元
- 充值 500 元，赠送 100 元

已有数据库升级时，如果 `payment` 表没有 `recharge_bonus` 字段，执行：

```sql
ALTER TABLE payment
  ADD COLUMN recharge_bonus decimal(10,2) NOT NULL DEFAULT 0.00 COMMENT '余额充值赠送金额' AFTER amount;
```

也可以直接执行目录中的 `delta_game_recharge_migration.sql`。

## 数据和安全要求

- 首次启动 MySQL 会自动导入 `delta_game.sql`，已有数据卷不会重复导入。
- `mysql-data`、`redis-data`、`upload-data` 是持久化卷，不能随意删除。
- `docker compose down -v` 会删除数据库、Redis 和上传文件，只能用于测试环境。
- 不要对公网开放 MySQL 3306 和 Redis 6379。
- 不要把 `.env` 提交到代码仓库。

## 源码获取

本仓库展示和交付的是可部署打包版本，完整源码为收费内容。源码获取方式：

1. 前往 https://pay.ldxp.cn/item/f5w5kf 购买卡密。
2. 前往 http://lenglengyou.top:82/ 输入卡密进行校验。
3. 校验通过后按页面提示获取源码。

如果 `lenglengyou.top` 无法访问，请开启 VPN。请通过正规卡密渠道购买和校验，未完成卡密校验无法获取完整源码。如有问题请联系 QQ：2104924410。
