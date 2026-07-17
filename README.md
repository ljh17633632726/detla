# 护航小程序 Docker 部署包

本目录是可直接部署的 Docker 交付包，不包含项目源码，包含后端、PC 管理后台、H5 页面、MySQL、Redis 镜像及一键部署文件。

## 演示与测试账号

### 在线体验

| 入口 | 地址 | 登录说明 |
| --- | --- | --- |
| 小程序 H5 示例 | http://lenglengyou.top:81/ | 普通用户可随便输入手机号登录，固定验证码为 `123456`；客服请切换到账号密码登录 |
| PC 管理后台 | https://lenglengyou.top | 使用下方管理员或客服测试账号登录 |

> 打手端入口在用户端“我要入驻”一栏，需要申请并审核通过后再次点击进入。

### 测试账号

| 端 | 账号 | 密码 | 说明 |
| --- | --- | --- | --- |
| 管理员 | admin | UIUIUIUI | PC 管理后台登录 |
| 客服 | kefu | UIUIUIUI | PC 管理后台可登录；小程序客服端需切换到账号密码登录 |
| 打手 | 无 | 无 | 从用户端“我要入驻”申请 |

> 如果 `lenglengyou.top` 相关地址无法访问，请开启 VPN，服务器位于新加坡。

## 最近更新（2026-07-17）

- H5 页面已接入微信 H5 支付。
- 增加 Docker 离线镜像包和 Windows 一键部署能力。
- 微信支付配置支持后台动态维护。
- 增加余额充值套餐，支持充值金额和赠送金额配置。

## Docker 文件

| 文件 | 说明 |
| --- | --- |
| `delta-game-images.tar` | Docker 离线镜像包，需从下载地址获取 |
| `docker-compose.yml` | 服务编排文件 |
| `.env.example` | 环境配置模板 |
| `start.bat` / `start.ps1` | Windows 一键启动 |
| `stop.bat` / `stop.ps1` | Windows 停止服务 |
| `delta_game.sql` | 数据库初始化脚本 |
| `delta_game_recharge_migration.sql` | 已有数据库升级脚本 |
| `部署文档.md` | 完整部署说明 |

## 镜像下载

请将下载后的文件保存为本目录下的 `delta-game-images.tar`：

- 主下载地址：https://lenglengyou.top/upload/delta-game-images.tar
- 备用百度网盘：链接 https://pan.baidu.com/s/1v4SgG5p7Dey-ZjkU-0qgiA?pwd=ujdc，提取码：`ujdc`

主下载地址速度较慢时可尝试开启 VPN。

## Windows 一键部署

1. 下载 `delta-game-images.tar` 并放到本目录。
2. 复制 `.env.example` 为 `.env`。
3. 修改 `.env` 中的数据库密码、Redis 密码、JWT 密钥和 AES 密钥。
4. 双击 `start.bat`，或使用 PowerShell 执行 `./start.ps1`。

启动后访问：

- 管理后台：`http://localhost:8081`
- H5 页面：`http://localhost:8082`

## 微信支付

后台“系统管理 -> 系统配置”支持微信支付动态配置。H5 支付和支付回调需要使用公网 HTTPS 域名，具体配置以 `部署文档.md` 为准。

## 余额充值套餐

后台“系统管理 -> 余额充值套餐”可配置充值金额和赠送金额，用户从钱包进入充值页面购买，支付成功后自动入账。

已有数据库升级时，请执行目录中的 `delta_game_recharge_migration.sql`。

## 源码获取

本仓库展示和交付的是可部署打包版本，完整源码为收费内容。源码获取方式：

1. 前往 https://pay.ldxp.cn/item/f5w5kf 购买卡密。
2. 前往 http://lenglengyou.top:82/ 输入卡密进行校验。
3. 校验通过后按页面提示获取源码。

如果 `lenglengyou.top` 无法访问，请开启 VPN。请通过正规卡密渠道购买和校验，未完成卡密校验无法获取完整源码。如有问题请联系 QQ：2104924410。
