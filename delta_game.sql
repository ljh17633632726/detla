/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80040 (8.0.40)
 Source Host           : localhost:3306
 Source Schema         : delta_game

 Target Server Type    : MySQL
 Target Server Version : 80040 (8.0.40)
 File Encoding         : 65001

 Date: 12/03/2026 22:37:43
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '管理员ID',
  `username` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户名',
  `password` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '密码(BCrypt加密)',
  `nickname` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '昵称',
  `avatar` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '头像URL',
  `role` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '角色: ADMIN-管理员 CS-客服 BOTH-双重角色',
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '手机号',
  `status` tinyint NOT NULL DEFAULT 1 COMMENT '状态: 1-正常 0-禁用',
  `login_fail_count` int NOT NULL DEFAULT 0 COMMENT '连续登录失败次数',
  `lock_time` datetime NULL DEFAULT NULL COMMENT '锁定截止时间(失败5次锁定30分钟)',
  `last_login_at` datetime NULL DEFAULT NULL COMMENT '最后登录时间',
  `last_login_ip` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '最后登录IP',
  `deleted` tinyint NOT NULL DEFAULT 0 COMMENT '逻辑删除',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_username`(`username` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '管理员/客服表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES (1, 'admin', '$2a$10$7JB720yubVSZvUI0rEqK/.VqGOZTH.ulu33dHOiBE8ByOhJIrdAu2', '超级管理员', '', 'admin', '', 1, 0, NULL, '2026-03-10 22:38:39', '', 0, '2026-02-27 11:25:20', '2026-02-27 11:25:20');
INSERT INTO `admin` VALUES (2, 'kefu', '$2a$10$TOq/iEFL/HA115.09eatzu1lxhkTKlEQs.ChxQ/bnCVW4GyA0M2uS', '客服1', '', 'cs', '', 1, 0, NULL, '2026-03-06 18:43:28', '', 0, '2026-02-27 19:25:55', '2026-02-27 19:25:55');

-- ----------------------------
-- Table structure for banner
-- ----------------------------
DROP TABLE IF EXISTS `banner`;
CREATE TABLE `banner`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '轮播图ID',
  `image_url` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '图片URL',
  `link_type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'NONE' COMMENT '跳转类型: PRODUCT/CATEGORY/URL/NONE',
  `link_value` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '跳转值(商品ID/分类ID/外链URL)',
  `sort_order` int NOT NULL DEFAULT 0 COMMENT '排序',
  `status` tinyint NOT NULL DEFAULT 1 COMMENT '状态: 1-启用 0-禁用',
  `start_time` datetime NULL DEFAULT NULL COMMENT '生效开始时间',
  `end_time` datetime NULL DEFAULT NULL COMMENT '生效结束时间',
  `deleted` tinyint NOT NULL DEFAULT 0 COMMENT '逻辑删除',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_status_time`(`status` ASC, `start_time` ASC, `end_time` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '轮播图表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of banner
-- ----------------------------
INSERT INTO `banner` VALUES (1, 'http://localhost:8080/file/2026/03/01/ef45b3ece838493aade2af507a07ece8.webp', 'NONE', NULL, 0, 1, NULL, NULL, 0, '2026-03-01 15:30:19', '2026-03-01 15:30:19');
INSERT INTO `banner` VALUES (2, 'http://localhost:8080/file/2026/03/01/a08e8a86322b4f2bb6268738bdc7701a.webp', 'NONE', NULL, 0, 1, NULL, NULL, 0, '2026-03-01 15:30:25', '2026-03-01 15:30:25');

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '分类ID',
  `name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '分类名称',
  `icon` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '分类图标URL',
  `sort_order` int NOT NULL DEFAULT 0 COMMENT '排序(数字越小越靠前)',
  `status` tinyint NOT NULL DEFAULT 1 COMMENT '状态: 1-启用 0-禁用',
  `parent_id` bigint NOT NULL DEFAULT 0 COMMENT '父分类ID(预留，当前均为0)',
  `deleted` tinyint NOT NULL DEFAULT 0 COMMENT '逻辑删除',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '商品分类表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (1, '测试', '', 0, 1, 0, 1, '2026-02-27 18:16:39', '2026-03-01 16:04:36');
INSERT INTO `category` VALUES (2, '三角洲', 'http://localhost:8080/file/2026/03/01/aab654c5b3b541078df039fd882051ff.png', 0, 1, 0, 0, '2026-03-01 15:29:02', '2026-03-01 15:29:02');
INSERT INTO `category` VALUES (3, '玩法', '', 0, 1, 2, 0, '2026-03-06 19:00:57', '2026-03-06 19:00:57');

-- ----------------------------
-- Table structure for category_form_field
-- ----------------------------
DROP TABLE IF EXISTS `category_form_field`;
CREATE TABLE `category_form_field`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `category_id` bigint NOT NULL COMMENT '父分类ID',
  `field_key` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '字段键名(英文,存储用)',
  `field_label` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '字段显示名(中文)',
  `field_type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'TEXT' COMMENT '字段类型: TEXT/SELECT/TEXTAREA',
  `options` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'SELECT类型的选项,逗号分隔,如: 选项1,选项2,选项3',
  `placeholder` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '输入提示',
  `required` tinyint NOT NULL DEFAULT 1 COMMENT '是否必填: 1-是 0-否',
  `sort_order` int NOT NULL DEFAULT 0 COMMENT '排序(越小越靠前)',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_category_id`(`category_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '分类动态表单字段' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of category_form_field
-- ----------------------------
INSERT INTO `category_form_field` VALUES (1, 2, 'key1', '游戏名称', 'TEXT', '', '请输入游戏大区', 1, 0, '2026-03-10 22:39:15');
INSERT INTO `category_form_field` VALUES (2, 2, 'key2', '联系方式', 'TEXT', '', '输入联系方式', 0, 2, '2026-03-10 22:39:37');
INSERT INTO `category_form_field` VALUES (3, 2, 'key3', '备注', 'TEXT', '', '如有特殊需求请备注', 0, 3, '2026-03-10 22:39:58');

-- ----------------------------
-- Table structure for chat_message
-- ----------------------------
DROP TABLE IF EXISTS `chat_message`;
CREATE TABLE `chat_message`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '消息ID',
  `conversation_id` bigint NULL DEFAULT NULL,
  `session_id` bigint NOT NULL COMMENT '会话ID',
  `sender_type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '发送者类型: USER/PLAYER/CS/SYSTEM',
  `sender_id` bigint NULL DEFAULT NULL COMMENT '发送者ID(SYSTEM时为空)',
  `type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'TEXT' COMMENT '消息类型: TEXT/IMAGE/SYSTEM',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '消息内容(文本 或 图片URL)',
  `is_read` tinyint NOT NULL DEFAULT 0 COMMENT '是否已读: 1-已读 0-未读',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_session_created`(`session_id` ASC, `created_at` ASC) USING BTREE,
  INDEX `idx_created_at`(`created_at` ASC) USING BTREE,
  INDEX `idx_conv_time`(`conversation_id` ASC, `created_at` ASC) USING BTREE,
  INDEX `idx_conv_id`(`conversation_id` ASC, `id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 72 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '聊天消息表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of chat_message
-- ----------------------------

-- ----------------------------
-- Table structure for chat_session
-- ----------------------------
DROP TABLE IF EXISTS `chat_session`;
CREATE TABLE `chat_session`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id1` bigint NOT NULL COMMENT '参与者1编码ID(较小)',
  `id2` bigint NOT NULL COMMENT '参与者2编码ID(较大)',
  `status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT 'ACTIVE',
  `last_message_at` datetime NULL DEFAULT NULL,
  `created_at` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_id1_id2`(`id1` ASC, `id2` ASC) USING BTREE,
  INDEX `idx_id1`(`id1` ASC) USING BTREE,
  INDEX `idx_id2`(`id2` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '私聊会话(id1<id2)' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of chat_session
-- ----------------------------
INSERT INTO `chat_session` VALUES (1, 1000000002, 2000000002, 'ACTIVE', NULL, '2026-03-12 21:57:13', '2026-03-12 21:57:13');

-- ----------------------------
-- Table structure for complaint
-- ----------------------------
DROP TABLE IF EXISTS `complaint`;
CREATE TABLE `complaint`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '投诉ID',
  `order_id` bigint NOT NULL COMMENT '订单ID',
  `user_id` bigint NOT NULL COMMENT '投诉用户ID',
  `player_id` bigint NOT NULL COMMENT '被投诉打手ID(主接打手)',
  `type` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '投诉类型: SERVICE_QUALITY/TIMEOUT/ACCOUNT_ISSUE/FRAUD/OTHER',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '投诉内容',
  `images` json NULL COMMENT '证据图片URL数组',
  `expected_result` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '期望结果: FULL_REFUND/PARTIAL_REFUND/REDO',
  `status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'PENDING' COMMENT '状态: PENDING/PROCESSING/RESOLVED/APPEALED',
  `result` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '仲裁结果: FULL_REFUND/PARTIAL_REFUND/REJECT/REDO',
  `refund_amount` decimal(10, 2) NULL DEFAULT NULL COMMENT '裁定退款金额(部分退款时)',
  `result_reason` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '仲裁理由',
  `player_penalty` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '打手处罚: WARNING/DEDUCT_RATING/FREEZE/NONE',
  `operator_id` bigint NULL DEFAULT NULL COMMENT '处理客服ID',
  `resolved_at` datetime NULL DEFAULT NULL COMMENT '仲裁时间',
  `appeal_reason` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '申诉理由',
  `appeal_images` json NULL COMMENT '申诉证据图片',
  `appeal_result` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '终审结果',
  `appeal_operator_id` bigint NULL DEFAULT NULL COMMENT '终审处理人(管理员ID)',
  `appeal_resolved_at` datetime NULL DEFAULT NULL COMMENT '终审时间',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `cs_read_at` datetime NULL DEFAULT NULL COMMENT '客服查看时间（未读红点）',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_order_id`(`order_id` ASC) USING BTREE,
  INDEX `idx_user_id`(`user_id` ASC) USING BTREE,
  INDEX `idx_player_id`(`player_id` ASC) USING BTREE,
  INDEX `idx_status`(`status` ASC) USING BTREE,
  INDEX `idx_created_at`(`created_at` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '投诉表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of complaint
-- ----------------------------
INSERT INTO `complaint` VALUES (1, 7, 1, 1, '服务态度', '辱骂', NULL, NULL, 'RESOLVED', 'FULL_REFUND', NULL, '警告', 'WARNING', 2, '2026-03-04 17:03:40', NULL, NULL, NULL, NULL, NULL, '2026-03-04 17:01:08', '2026-03-04 17:01:08', NULL);
INSERT INTO `complaint` VALUES (2, 9, 1, 1, '服务态度', '111', NULL, NULL, 'RESOLVED', 'FULL_REFUND', NULL, '11', 'WARNING', 2, '2026-03-05 00:16:37', NULL, NULL, NULL, NULL, NULL, '2026-03-05 00:16:12', '2026-03-05 00:16:12', NULL);
INSERT INTO `complaint` VALUES (3, 13, 2, 2, '代练质量', '111111', NULL, '退款', 'RESOLVED', 'PARTIAL_REFUND', 5.00, '已经处理', 'WARNING', 1, '2026-03-05 13:40:56', NULL, NULL, NULL, NULL, NULL, '2026-03-05 13:40:00', '2026-03-05 13:40:00', NULL);

-- ----------------------------
-- Table structure for content_config
-- ----------------------------
DROP TABLE IF EXISTS `content_config`;
CREATE TABLE `content_config`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `config_key` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '配置键(如:about_us/faq/guide)',
  `config_value` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '配置值(富文本/JSON)',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注说明',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_config_key`(`config_key` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '内容配置表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of content_config
-- ----------------------------

-- ----------------------------
-- Table structure for notice
-- ----------------------------
DROP TABLE IF EXISTS `notice`;
CREATE TABLE `notice`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '公告ID',
  `title` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '公告标题',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '公告内容',
  `type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'SYSTEM' COMMENT '类型: SYSTEM-系统公告 ACTIVITY-活动公告',
  `status` tinyint NOT NULL DEFAULT 1 COMMENT '状态: 1-启用 0-禁用',
  `sort_order` int NOT NULL DEFAULT 0 COMMENT '排序',
  `popup_display` tinyint NOT NULL DEFAULT 0 COMMENT '是否首页弹窗展示: 1-是 0-否',
  `deleted` tinyint NOT NULL DEFAULT 0 COMMENT '逻辑删除',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_status`(`status` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '公告表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of notice
-- ----------------------------
INSERT INTO `notice` VALUES (1, '开服', '测试公告！！<br>测试', 'system', 1, 0, 0, 0, '2026-03-01 15:30:51', '2026-03-01 15:30:51');
INSERT INTO `notice` VALUES (2, '测试公告', '<ol><li>测试公告</li><li>测试XXX</li></ol>', 'system', 1, 0, 0, 0, '2026-03-03 12:53:36', '2026-03-03 12:53:36');

-- ----------------------------
-- Table structure for operation_log
-- ----------------------------
DROP TABLE IF EXISTS `operation_log`;
CREATE TABLE `operation_log`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '日志ID',
  `module` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '操作模块',
  `operation` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '操作类型(LOGIN/CREATE/UPDATE/DELETE等)',
  `operator_type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '操作者类型: ADMIN/CS',
  `operator_id` bigint NOT NULL COMMENT '操作者ID',
  `operator_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '操作者名称',
  `target_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '操作对象类型(如:ORDER/PLAYER/USER)',
  `target_id` bigint NULL DEFAULT NULL COMMENT '操作对象ID',
  `detail` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '操作详情',
  `ip` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '操作IP',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_operator`(`operator_type` ASC, `operator_id` ASC) USING BTREE,
  INDEX `idx_module`(`module` ASC) USING BTREE,
  INDEX `idx_created_at`(`created_at` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 63 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '操作日志表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of operation_log
-- ----------------------------
INSERT INTO `operation_log` VALUES (1, 'auth', 'login', 'BOTH', 1, '超级管理员', 'admin', 1, 'admin 以 BOTH 角色登录', '0:0:0:0:0:0:0:1', '2026-02-27 18:14:40');
INSERT INTO `operation_log` VALUES (2, 'auth', 'login', 'BOTH', 1, '超级管理员', 'admin', 1, 'admin 以 BOTH 角色登录', '0:0:0:0:0:0:0:1', '2026-02-27 18:15:42');
INSERT INTO `operation_log` VALUES (3, 'auth', 'login', 'BOTH', 1, '超级管理员', 'admin', 1, 'admin 以 BOTH 角色登录', '0:0:0:0:0:0:0:1', '2026-02-27 18:40:11');
INSERT INTO `operation_log` VALUES (4, 'auth', 'login', 'BOTH', 1, '超级管理员', 'admin', 1, 'admin 以 BOTH 角色登录', '0:0:0:0:0:0:0:1', '2026-02-27 18:45:30');
INSERT INTO `operation_log` VALUES (5, 'auth', 'login', 'BOTH', 1, '超级管理员', 'admin', 1, 'admin 以 BOTH 角色登录', '0:0:0:0:0:0:0:1', '2026-02-27 18:49:36');
INSERT INTO `operation_log` VALUES (6, 'auth', 'login', 'BOTH', 1, '超级管理员', 'admin', 1, 'admin 以 BOTH 角色登录', '0:0:0:0:0:0:0:1', '2026-02-27 18:58:47');
INSERT INTO `operation_log` VALUES (7, 'auth', 'login', 'CS', 2, '客服1', 'admin', 2, 'kefu 以 CS 角色登录', '0:0:0:0:0:0:0:1', '2026-02-27 19:26:08');
INSERT INTO `operation_log` VALUES (8, 'auth', 'login', 'ADMIN', 1, '超级管理员', 'admin', 1, 'admin 以 ADMIN 角色登录', '0:0:0:0:0:0:0:1', '2026-02-27 19:27:23');
INSERT INTO `operation_log` VALUES (9, 'auth', 'login', 'CS', 2, '客服1', 'admin', 2, 'kefu 以 CS 角色登录', '0:0:0:0:0:0:0:1', '2026-02-27 20:50:22');
INSERT INTO `operation_log` VALUES (10, 'auth', 'login', 'CS', 2, '客服1', 'admin', 2, 'kefu 以 CS 角色登录', '0:0:0:0:0:0:0:1', '2026-02-28 13:39:37');
INSERT INTO `operation_log` VALUES (11, 'auth', 'login', 'CS', 2, '客服1', 'admin', 2, 'kefu 以 CS 角色登录', '0:0:0:0:0:0:0:1', '2026-02-28 13:42:11');
INSERT INTO `operation_log` VALUES (12, 'auth', 'login', 'ADMIN', 1, '超级管理员', 'admin', 1, 'admin 以 ADMIN 角色登录', '0:0:0:0:0:0:0:1', '2026-03-01 14:11:12');
INSERT INTO `operation_log` VALUES (13, 'auth', 'login', 'ADMIN', 1, '超级管理员', 'admin', 1, 'admin 以 ADMIN 角色登录', '0:0:0:0:0:0:0:1', '2026-03-01 14:13:01');
INSERT INTO `operation_log` VALUES (14, 'auth', 'login', 'ADMIN', 1, '超级管理员', 'admin', 1, 'admin 以 ADMIN 角色登录', '0:0:0:0:0:0:0:1', '2026-03-01 14:17:14');
INSERT INTO `operation_log` VALUES (15, 'auth', 'login', 'CS', 2, '客服1', 'admin', 2, 'kefu 以 CS 角色登录', '0:0:0:0:0:0:0:1', '2026-03-02 13:18:43');
INSERT INTO `operation_log` VALUES (16, 'auth', 'login', 'CS', 2, '客服1', 'admin', 2, 'kefu 以 CS 角色登录', '0:0:0:0:0:0:0:1', '2026-03-02 16:03:32');
INSERT INTO `operation_log` VALUES (17, 'auth', 'login', 'CS', 2, '客服1', 'admin', 2, 'kefu 以 CS 角色登录', '0:0:0:0:0:0:0:1', '2026-03-02 17:59:31');
INSERT INTO `operation_log` VALUES (18, 'auth', 'login', 'CS', 2, '客服1', 'admin', 2, 'kefu 以 CS 角色登录', '0:0:0:0:0:0:0:1', '2026-03-02 18:07:37');
INSERT INTO `operation_log` VALUES (19, 'auth', 'login', 'CS', 2, '客服1', 'admin', 2, 'kefu 以 CS 角色登录', '0:0:0:0:0:0:0:1', '2026-03-02 18:43:49');
INSERT INTO `operation_log` VALUES (20, 'auth', 'login', 'ADMIN', 1, '超级管理员', 'admin', 1, 'admin 以 ADMIN 角色登录', '0:0:0:0:0:0:0:1', '2026-03-03 12:52:23');
INSERT INTO `operation_log` VALUES (21, 'auth', 'login', 'CS', 2, '客服1', 'admin', 2, 'kefu 以 CS 角色登录', '0:0:0:0:0:0:0:1', '2026-03-03 14:38:30');
INSERT INTO `operation_log` VALUES (22, 'auth', 'login', 'CS', 2, '客服1', 'admin', 2, 'kefu 以 CS 角色登录', '0:0:0:0:0:0:0:1', '2026-03-03 15:35:56');
INSERT INTO `operation_log` VALUES (23, 'auth', 'login', 'ADMIN', 1, '超级管理员', 'admin', 1, 'admin 以 ADMIN 角色登录', '0:0:0:0:0:0:0:1', '2026-03-03 16:08:38');
INSERT INTO `operation_log` VALUES (24, 'auth', 'login', 'CS', 2, '客服1', 'admin', 2, 'kefu 以 CS 角色登录', '0:0:0:0:0:0:0:1', '2026-03-03 16:40:41');
INSERT INTO `operation_log` VALUES (25, 'auth', 'login', 'ADMIN', 1, '超级管理员', 'admin', 1, 'admin 以 ADMIN 角色登录', '0:0:0:0:0:0:0:1', '2026-03-03 19:54:39');
INSERT INTO `operation_log` VALUES (26, 'auth', 'login', 'ADMIN', 1, '超级管理员', 'admin', 1, 'admin 以 ADMIN 角色登录', '0:0:0:0:0:0:0:1', '2026-03-04 16:16:30');
INSERT INTO `operation_log` VALUES (27, 'auth', 'login', 'CS', 2, '客服1', 'admin', 2, 'kefu 以 CS 角色登录', '0:0:0:0:0:0:0:1', '2026-03-04 16:16:49');
INSERT INTO `operation_log` VALUES (28, 'complaint', '创建投诉工单', 'CS', 2, '客服1', NULL, NULL, '创建投诉工单', '0:0:0:0:0:0:0:1', '2026-03-04 17:01:08');
INSERT INTO `operation_log` VALUES (29, 'complaint', '受理投诉', 'CS', 2, '客服1', 'complaint', 1, '受理投诉', '0:0:0:0:0:0:0:1', '2026-03-04 17:03:20');
INSERT INTO `operation_log` VALUES (30, 'complaint', '仲裁处理', 'CS', 2, '客服1', 'complaint', 1, '仲裁处理', '0:0:0:0:0:0:0:1', '2026-03-04 17:03:40');
INSERT INTO `operation_log` VALUES (31, 'auth', 'login', 'CS', 2, '客服1', 'admin', 2, 'kefu 以 CS 角色登录', '0:0:0:0:0:0:0:1', '2026-03-04 17:35:55');
INSERT INTO `operation_log` VALUES (32, 'auth', 'login', 'ADMIN', 1, '超级管理员', 'admin', 1, 'admin 以 ADMIN 角色登录', '0:0:0:0:0:0:0:1', '2026-03-04 17:37:57');
INSERT INTO `operation_log` VALUES (33, 'auth', 'login', 'ADMIN', 1, '超级管理员', 'admin', 1, 'admin 以 ADMIN 角色登录', '0:0:0:0:0:0:0:1', '2026-03-04 23:39:56');
INSERT INTO `operation_log` VALUES (34, 'auth', 'login', 'ADMIN', 1, '超级管理员', 'admin', 1, 'admin 以 ADMIN 角色登录', '0:0:0:0:0:0:0:1', '2026-03-04 23:53:41');
INSERT INTO `operation_log` VALUES (35, 'auth', 'login', 'CS', 2, '客服1', 'admin', 2, 'kefu 以 CS 角色登录', '0:0:0:0:0:0:0:1', '2026-03-05 00:04:10');
INSERT INTO `operation_log` VALUES (36, 'complaint', '创建投诉工单', 'CS', 2, '客服1', NULL, NULL, '创建投诉工单', '0:0:0:0:0:0:0:1', '2026-03-05 00:16:12');
INSERT INTO `operation_log` VALUES (37, 'complaint', '受理投诉', 'CS', 2, '客服1', 'complaint', 2, '受理投诉', '0:0:0:0:0:0:0:1', '2026-03-05 00:16:16');
INSERT INTO `operation_log` VALUES (38, 'complaint', '仲裁处理', 'CS', 2, '客服1', 'complaint', 2, '仲裁处理', '0:0:0:0:0:0:0:1', '2026-03-05 00:16:37');
INSERT INTO `operation_log` VALUES (39, 'auth', 'login', 'CS', 2, '客服1', 'admin', 2, 'kefu 以 CS 角色登录', '0:0:0:0:0:0:0:1', '2026-03-05 00:19:59');
INSERT INTO `operation_log` VALUES (40, 'auth', 'login', 'CS', 2, '客服1', 'admin', 2, 'kefu 以 CS 角色登录', '0:0:0:0:0:0:0:1', '2026-03-05 11:16:26');
INSERT INTO `operation_log` VALUES (41, 'auth', 'login', 'ADMIN', 1, '超级管理员', 'admin', 1, 'admin 以 ADMIN 角色登录', '0:0:0:0:0:0:0:1', '2026-03-05 11:28:04');
INSERT INTO `operation_log` VALUES (42, 'auth', 'login', 'CS', 2, '客服1', 'admin', 2, 'kefu 以 CS 角色登录', '0:0:0:0:0:0:0:1', '2026-03-05 12:07:49');
INSERT INTO `operation_log` VALUES (43, 'withdraw', '审批提现', 'CS', 2, '客服1', 'withdraw', 3, '审批提现', '0:0:0:0:0:0:0:1', '2026-03-05 12:08:23');
INSERT INTO `operation_log` VALUES (44, 'player', '审核通过', 'ADMIN', 1, '超级管理员', 'player', 2, '审核通过', '0:0:0:0:0:0:0:1', '2026-03-05 12:19:12');
INSERT INTO `operation_log` VALUES (45, 'auth', 'login', 'CS', 2, '客服1', 'admin', 2, 'kefu 以 CS 角色登录', '0:0:0:0:0:0:0:1', '2026-03-05 12:42:06');
INSERT INTO `operation_log` VALUES (46, 'auth', 'login', 'ADMIN', 1, '超级管理员', 'admin', 1, 'admin 以 ADMIN 角色登录', '0:0:0:0:0:0:0:1', '2026-03-05 12:45:24');
INSERT INTO `operation_log` VALUES (47, 'complaint', '受理投诉', 'ADMIN', 1, '超级管理员', 'complaint', 3, '受理投诉', '0:0:0:0:0:0:0:1', '2026-03-05 13:40:22');
INSERT INTO `operation_log` VALUES (48, 'complaint', '仲裁处理', 'ADMIN', 1, '超级管理员', 'complaint', 3, '仲裁处理', '0:0:0:0:0:0:0:1', '2026-03-05 13:40:56');
INSERT INTO `operation_log` VALUES (49, 'auth', 'login', 'CS', 2, '客服1', 'admin', 2, 'kefu 以 CS 角色登录', '0:0:0:0:0:0:0:1', '2026-03-05 14:30:57');
INSERT INTO `operation_log` VALUES (50, 'order', '同意换人', 'CS', 2, '客服1', 'order', 1, '同意换人', '0:0:0:0:0:0:0:1', '2026-03-05 14:31:04');
INSERT INTO `operation_log` VALUES (51, 'auth', 'login', 'CS', 2, '客服1', 'admin', 2, 'kefu 以 CS 角色登录', '0:0:0:0:0:0:0:1', '2026-03-05 14:33:30');
INSERT INTO `operation_log` VALUES (52, 'player', '审核打手', 'CS', 2, '客服1', 'player', 3, '审核打手', '0:0:0:0:0:0:0:1', '2026-03-05 14:34:34');
INSERT INTO `operation_log` VALUES (53, 'auth', 'login', 'ADMIN', 1, '超级管理员', 'admin', 1, 'admin 以 ADMIN 角色登录', '0:0:0:0:0:0:0:1', '2026-03-05 15:00:06');
INSERT INTO `operation_log` VALUES (54, 'auth', 'login', 'ADMIN', 1, '超级管理员', 'admin', 1, 'admin 以 ADMIN 角色登录', '0:0:0:0:0:0:0:1', '2026-03-05 15:08:34');
INSERT INTO `operation_log` VALUES (55, 'auth', 'login', 'CS', 2, '客服1', 'admin', 2, 'kefu 以 CS 角色登录', '0:0:0:0:0:0:0:1', '2026-03-05 17:28:03');
INSERT INTO `operation_log` VALUES (56, 'auth', 'login', 'CS', 2, '客服1', 'admin', 2, 'kefu 以 CS 角色登录', '0:0:0:0:0:0:0:1', '2026-03-06 18:43:28');
INSERT INTO `operation_log` VALUES (57, 'auth', 'login', 'ADMIN', 1, '超级管理员', 'admin', 1, 'admin 以 ADMIN 角色登录', '0:0:0:0:0:0:0:1', '2026-03-06 19:00:38');
INSERT INTO `operation_log` VALUES (58, 'system', '编辑管理员', 'ADMIN', 1, '超级管理员', NULL, NULL, '编辑管理员', '0:0:0:0:0:0:0:1', '2026-03-06 19:31:54');
INSERT INTO `operation_log` VALUES (59, 'auth', 'login', 'ADMIN', 1, '超级管理员', 'admin', 1, 'admin 以 ADMIN 角色登录', '0:0:0:0:0:0:0:1', '2026-03-06 19:32:08');
INSERT INTO `operation_log` VALUES (60, 'user', '调整用户余额', 'ADMIN', 1, '超级管理员', 'user', 4, '调整用户余额', '0:0:0:0:0:0:0:1', '2026-03-06 19:37:53');
INSERT INTO `operation_log` VALUES (61, 'auth', 'login', 'ADMIN', 1, '超级管理员', 'admin', 1, 'admin 以 ADMIN 角色登录', '0:0:0:0:0:0:0:1', '2026-03-07 19:45:43');
INSERT INTO `operation_log` VALUES (62, 'auth', 'login', 'ADMIN', 1, '超级管理员', 'admin', 1, 'admin 以 ADMIN 角色登录', '0:0:0:0:0:0:0:1', '2026-03-10 22:38:39');

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '订单ID',
  `order_no` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '订单号(雪花算法生成)',
  `user_id` bigint NOT NULL COMMENT '下单用户ID',
  `product_id` bigint NOT NULL COMMENT '商品ID',
  `product_name` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '商品名称(下单快照)',
  `spec_info` json NULL COMMENT '规格快照JSON',
  `amount` decimal(10, 2) NOT NULL COMMENT '订单金额',
  `commission_rate` decimal(5, 4) NULL DEFAULT NULL COMMENT '下单时快照的抽佣比例(0~1)',
  `game_account` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '游戏账号',
  `contact` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '联系方式',
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '用户备注',
  `extra_fields` json NULL COMMENT '动态表单字段JSON',
  `required_player_count` tinyint NOT NULL DEFAULT 1 COMMENT '需要打手数量(下单快照)',
  `designated_player_id` bigint NULL DEFAULT NULL COMMENT '用户指定打手ID(可为空)',
  `player_id` bigint NULL DEFAULT NULL COMMENT '主接打手ID',
  `status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'PENDING_PAYMENT' COMMENT '订单状态',
  `pay_deadline` datetime NULL DEFAULT NULL COMMENT '支付截止时间(创建时间+30min)',
  `assign_time` datetime NULL DEFAULT NULL COMMENT '指派时间',
  `accept_time` datetime NULL DEFAULT NULL COMMENT '接单时间',
  `teammate_deadline` datetime NULL DEFAULT NULL COMMENT '组队截止时间(仅多人订单)',
  `start_time` datetime NULL DEFAULT NULL COMMENT '服务开始时间',
  `complete_time` datetime NULL DEFAULT NULL COMMENT '服务完成时间',
  `confirm_time` datetime NULL DEFAULT NULL COMMENT '确认完成时间',
  `auto_confirm_deadline` datetime NULL DEFAULT NULL COMMENT '自动确认截止时间(完成+24h)',
  `settled` tinyint NOT NULL DEFAULT 0 COMMENT '是否已结算: 1-是 0-否',
  `settle_amount` decimal(10, 2) NULL DEFAULT NULL COMMENT '打手总结算金额(扣除平台抽成)',
  `settle_time` datetime NULL DEFAULT NULL COMMENT '结算时间',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_order_no`(`order_no` ASC) USING BTREE,
  INDEX `idx_user_id_status`(`user_id` ASC, `status` ASC) USING BTREE,
  INDEX `idx_player_id_status`(`player_id` ASC, `status` ASC) USING BTREE,
  INDEX `idx_status`(`status` ASC) USING BTREE,
  INDEX `idx_status_pay_deadline`(`status` ASC, `pay_deadline` ASC) USING BTREE,
  INDEX `idx_status_auto_confirm`(`status` ASC, `auto_confirm_deadline` ASC) USING BTREE,
  INDEX `idx_status_teammate_deadline`(`status` ASC, `teammate_deadline` ASC) USING BTREE,
  INDEX `idx_created_at`(`created_at` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '订单表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order
-- ----------------------------
INSERT INTO `order` VALUES (1, 'O2028041127357190144', 1, 1, '三角洲代打', NULL, 9.99, NULL, '1', '1', '1', NULL, 1, NULL, 1, 'REVIEWED', '2026-03-01 18:04:19', '2026-03-01 18:36:00', '2026-03-01 19:15:15', NULL, '2026-03-01 19:15:17', '2026-03-01 19:37:07', '2026-03-01 19:37:32', '2026-03-02 19:37:07', 1, 7.99, '2026-03-01 19:37:32', '2026-03-01 17:34:19', '2026-03-01 19:39:04');
INSERT INTO `order` VALUES (2, 'O2028075525016260608', 1, 2, '【CS测试】客服端商品', NULL, 10.00, NULL, '312', '123321', '12332132', NULL, 1, NULL, 1, 'CONFIRMED', '2026-03-01 20:21:00', '2026-03-01 20:03:00', '2026-03-01 20:06:08', NULL, '2026-03-01 20:06:40', '2026-03-01 20:06:42', '2026-03-01 20:07:27', '2026-03-02 20:06:42', 1, 8.00, '2026-03-01 20:07:27', '2026-03-01 19:51:00', '2026-03-01 20:07:27');
INSERT INTO `order` VALUES (3, 'O2028076876894965760', 1, 2, '【CS测试】客服端商品', NULL, 10.00, NULL, '453', '5434', '453354', NULL, 1, NULL, NULL, 'CANCELLED', '2026-03-01 20:26:22', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, '2026-03-01 19:56:22', '2026-03-01 19:59:24');
INSERT INTO `order` VALUES (4, 'O2028077060517400576', 1, 2, '【CS测试】客服端商品', NULL, 10.00, NULL, '1', '11', '1123124', NULL, 1, NULL, NULL, 'CANCELLED', '2026-03-01 20:27:06', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, '2026-03-01 19:57:06', '2026-03-01 19:59:20');
INSERT INTO `order` VALUES (5, 'O2028079188292014080', 1, 1, '三角洲代打', NULL, 9.99, NULL, '1', '1', '1', NULL, 1, NULL, NULL, 'REFUNDED', '2026-03-01 20:35:33', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, '2026-03-01 20:05:33', '2026-03-01 20:05:40');
INSERT INTO `order` VALUES (6, 'O2028080687390789632', 1, 1, '三角洲代打', NULL, 9.99, NULL, '21312', '213', '123', NULL, 1, NULL, 1, 'CONFIRMED', '2026-03-01 20:41:30', NULL, '2026-03-01 20:12:00', NULL, '2026-03-01 20:15:14', '2026-03-01 20:15:16', '2026-03-01 20:28:26', '2026-03-02 20:15:16', 1, 7.99, '2026-03-01 20:28:26', '2026-03-01 20:11:30', '2026-03-01 20:28:26');
INSERT INTO `order` VALUES (7, 'O2028094502425726976', 1, 2, '【CS测试】客服端商品', NULL, 10.00, NULL, '1', '1', '1', NULL, 1, NULL, 1, 'REFUNDED', '2026-03-01 21:36:24', NULL, '2026-03-01 21:09:23', NULL, '2026-03-01 21:09:28', '2026-03-01 21:09:29', '2026-03-01 21:09:42', '2026-03-02 21:09:29', 1, 8.00, '2026-03-01 21:09:42', '2026-03-01 21:06:24', '2026-03-04 17:03:40');
INSERT INTO `order` VALUES (8, 'O2028105007773126656', 1, 1, '三角洲代打', NULL, 9.99, NULL, '11', '111', '1111', NULL, 1, NULL, 1, 'CONFIRMED', '2026-03-01 22:18:09', NULL, '2026-03-01 21:48:29', NULL, '2026-03-01 21:48:33', '2026-03-01 21:48:35', '2026-03-01 21:48:49', '2026-03-03 21:48:35', 1, 8.99, '2026-03-01 21:48:49', '2026-03-01 21:48:09', '2026-03-01 21:48:49');
INSERT INTO `order` VALUES (9, 'O2029225273395908608', 1, 2, '【CS测试】客服端商品', NULL, 10.00, NULL, '11', '1', '111', NULL, 1, NULL, 1, 'REFUNDED', '2026-03-05 00:29:41', NULL, '2026-03-05 00:00:20', NULL, '2026-03-05 00:02:34', '2026-03-05 00:02:52', NULL, '2026-03-07 00:02:52', 0, NULL, NULL, '2026-03-04 23:59:41', '2026-03-05 00:16:37');
INSERT INTO `order` VALUES (10, 'O2029226623437508608', 1, 2, '【CS测试】客服端商品', NULL, 10.00, NULL, '1', '123', '333', NULL, 1, NULL, 1, 'ACCEPTED', '2026-03-05 00:35:03', NULL, '2026-03-05 00:05:30', NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, '2026-03-05 00:05:03', '2026-03-05 00:05:30');
INSERT INTO `order` VALUES (11, 'O2029228118929182720', 1, 1, '三角洲代打', NULL, 9.99, NULL, '1', '1', '11111', NULL, 1, NULL, 2, 'CONFIRMED', '2026-03-05 00:40:59', NULL, '2026-03-05 12:19:24', NULL, '2026-03-05 12:43:00', '2026-03-05 12:47:04', '2026-03-07 16:10:00', '2026-03-07 12:47:04', 1, 8.99, '2026-03-07 16:10:00', '2026-03-05 00:10:59', '2026-03-07 16:10:00');
INSERT INTO `order` VALUES (12, 'O2029228446206529536', 1, 1, '三角洲代打', NULL, 9.99, NULL, '233', '2323', '23', NULL, 1, NULL, 1, 'ASSIGNED', '2026-03-05 00:42:17', '2026-03-05 00:20:55', NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, '2026-03-05 00:12:17', '2026-03-05 00:20:55');
INSERT INTO `order` VALUES (13, 'O2029417498197233664', 2, 2, '【CS测试】客服端商品', NULL, 10.00, NULL, '11', '11', '11', NULL, 1, NULL, 2, 'REFUNDED', '2026-03-05 13:13:31', NULL, '2026-03-05 12:47:09', '2026-03-05 15:10:04', '2026-03-05 13:26:22', '2026-03-05 13:26:37', NULL, '2026-03-07 13:26:37', 0, NULL, NULL, '2026-03-05 12:43:31', '2026-03-05 13:40:56');
INSERT INTO `order` VALUES (14, 'O2029442145517178880', 2, 2, '【CS测试】客服端商品', NULL, 10.00, NULL, '222', '2', '2222', NULL, 1, NULL, 2, 'CONFIRMED', '2026-03-05 14:51:27', '2026-03-05 14:34:21', '2026-03-06 18:47:54', NULL, '2026-03-06 18:47:56', '2026-03-06 18:47:59', '2026-03-06 19:24:54', '2026-03-08 18:47:59', 1, 9.00, '2026-03-06 19:24:54', '2026-03-05 14:21:27', '2026-03-06 19:24:54');
INSERT INTO `order` VALUES (15, 'O2029868480114855936', 2, 2, '【CS测试】客服端商品', NULL, 10.00, NULL, '1', '1', '1', NULL, 1, NULL, NULL, 'CANCELLED', '2026-03-06 19:05:33', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, '2026-03-06 18:35:33', '2026-03-06 18:42:05');
INSERT INTO `order` VALUES (16, 'O2029870207241162752', 2, 2, '【CS测试】客服端商品', NULL, 10.00, NULL, '11', '2121', '221', NULL, 1, NULL, NULL, 'CANCELLED', '2026-03-06 19:12:25', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, '2026-03-06 18:42:25', '2026-03-06 19:15:00');
INSERT INTO `order` VALUES (17, 'O2031381268645679104', 2, 1, '三角洲代打', NULL, 9.99, 0.3000, '', '', '', '{\"备注\": \"2112122\", \"游戏名称\": \"2121\", \"联系方式\": \"212\"}', 1, NULL, 3, 'ASSIGNED', '2026-03-10 23:16:50', '2026-03-10 22:57:00', NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, '2026-03-10 22:46:50', '2026-03-10 22:57:00');
INSERT INTO `order` VALUES (18, 'O2031381616647081984', 2, 2, '【CS测试】客服端商品', NULL, 10.00, 0.1000, '', '', '', '{\"备注\": \"2\", \"游戏名称\": \"212121\", \"联系方式\": \"221\"}', 1, NULL, 3, 'ASSIGNED', '2026-03-10 23:18:13', '2026-03-12 21:57:00', NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, '2026-03-10 22:48:13', '2026-03-12 21:57:00');
INSERT INTO `order` VALUES (19, 'O2032093444209512448', 2, 1, '三角洲代打', NULL, 9.99, 0.3000, '', '', '', '{\"备注\": \"32231231\", \"游戏名称\": \"11111\", \"联系方式\": \"3312321\"}', 1, NULL, NULL, 'PAID', '2026-03-12 22:26:46', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, '2026-03-12 21:56:46', '2026-03-12 22:04:32');

-- ----------------------------
-- Table structure for order_player
-- ----------------------------
DROP TABLE IF EXISTS `order_player`;
CREATE TABLE `order_player`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `order_id` bigint NOT NULL COMMENT '订单ID',
  `player_id` bigint NOT NULL COMMENT '打手ID',
  `role` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '角色: PRIMARY-主接 TEAMMATE-队友',
  `status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'ACCEPTED' COMMENT '状态: INVITED/ACCEPTED/REJECTED/EXPIRED/RELEASED',
  `split_type` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '分成方式: FIFTY_FIFTY/FORTY_SIXTY/THIRTY_SEVENTY/CUSTOM',
  `split_ratio` decimal(5, 2) NULL DEFAULT NULL COMMENT '分成比例(%，如50.00表示50%)',
  `split_amount` decimal(10, 2) NULL DEFAULT NULL COMMENT '自定义金额(仅CUSTOM时有值)',
  `invited_by` bigint NULL DEFAULT NULL COMMENT '邀请人ID(队友记录时为主接打手ID)',
  `invited_at` datetime NULL DEFAULT NULL COMMENT '邀请时间',
  `invite_deadline` datetime NULL DEFAULT NULL COMMENT '邀请响应截止时间',
  `accepted_at` datetime NULL DEFAULT NULL COMMENT '接受时间',
  `rejected_at` datetime NULL DEFAULT NULL COMMENT '拒绝时间',
  `settle_amount` decimal(10, 2) NULL DEFAULT NULL COMMENT '个人结算金额',
  `settled_at` datetime NULL DEFAULT NULL COMMENT '结算时间',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_order_id`(`order_id` ASC) USING BTREE,
  INDEX `idx_player_id`(`player_id` ASC) USING BTREE,
  INDEX `idx_status_role`(`status` ASC, `role` ASC) USING BTREE,
  INDEX `idx_invite_deadline`(`status` ASC, `invite_deadline` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '订单参与打手表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order_player
-- ----------------------------
INSERT INTO `order_player` VALUES (1, 1, 1, 'PRIMARY', 'ACCEPTED', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-01 19:15:15', NULL, 7.99, '2026-03-01 19:37:32', '2026-03-01 19:15:15');
INSERT INTO `order_player` VALUES (2, 2, 1, 'PRIMARY', 'ACCEPTED', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-01 20:06:08', NULL, NULL, NULL, '2026-03-01 20:06:08');
INSERT INTO `order_player` VALUES (3, 6, 1, 'PRIMARY', 'ACCEPTED', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-01 20:12:00', NULL, NULL, NULL, '2026-03-01 20:12:00');
INSERT INTO `order_player` VALUES (4, 7, 1, 'PRIMARY', 'ACCEPTED', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-01 21:09:23', NULL, NULL, NULL, '2026-03-01 21:09:23');
INSERT INTO `order_player` VALUES (5, 8, 1, 'PRIMARY', 'ACCEPTED', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-01 21:48:29', NULL, NULL, NULL, '2026-03-01 21:48:29');
INSERT INTO `order_player` VALUES (6, 9, 1, 'PRIMARY', 'ACCEPTED', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-05 00:00:20', NULL, NULL, NULL, '2026-03-05 00:00:20');
INSERT INTO `order_player` VALUES (7, 10, 1, 'PRIMARY', 'ACCEPTED', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-05 00:05:30', NULL, NULL, NULL, '2026-03-05 00:05:30');
INSERT INTO `order_player` VALUES (8, 11, 2, 'PRIMARY', 'ACCEPTED', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-05 12:19:24', NULL, 8.99, '2026-03-07 16:10:00', '2026-03-05 12:19:24');
INSERT INTO `order_player` VALUES (9, 13, 2, 'PRIMARY', 'ACCEPTED', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-05 12:47:09', NULL, NULL, NULL, '2026-03-05 12:47:09');
INSERT INTO `order_player` VALUES (10, 13, 1, 'TEAMMATE', 'CANCELLED', 'CUSTOM', NULL, 9.00, 2, '2026-03-05 13:10:04', '2026-03-05 13:40:04', NULL, NULL, NULL, NULL, '2026-03-05 13:10:04');
INSERT INTO `order_player` VALUES (11, 14, 2, 'PRIMARY', 'REPLACED', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-05 14:21:55', NULL, NULL, NULL, '2026-03-05 14:21:55');
INSERT INTO `order_player` VALUES (12, 14, 2, 'PRIMARY', 'ACCEPTED', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-06 18:47:54', NULL, 9.00, '2026-03-06 19:24:54', '2026-03-06 18:47:54');
INSERT INTO `order_player` VALUES (13, 19, 2, 'PRIMARY', 'REPLACED', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-12 21:57:13', NULL, NULL, NULL, '2026-03-12 21:57:13');
INSERT INTO `order_player` VALUES (14, 19, 2, 'PRIMARY', 'REPLACED', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-12 22:01:15', NULL, NULL, NULL, '2026-03-12 22:01:15');
INSERT INTO `order_player` VALUES (15, 19, 3, 'TEAMMATE', 'REPLACED', 'CUSTOM', NULL, 2.00, 2, '2026-03-12 22:01:31', '2026-03-12 22:06:31', NULL, NULL, NULL, NULL, '2026-03-12 22:01:31');

-- ----------------------------
-- Table structure for order_progress
-- ----------------------------
DROP TABLE IF EXISTS `order_progress`;
CREATE TABLE `order_progress`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `order_id` bigint NOT NULL COMMENT '订单ID',
  `type` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '类型: STATUS_CHANGE/PROGRESS_UPDATE/TEAMMATE_INVITED/TEAMMATE_ACCEPTED/TEAMMATE_REJECTED/DISPUTE_CREATED/COMPLETED',
  `operator_type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '操作者类型: USER/PLAYER/CS/ADMIN/SYSTEM',
  `operator_id` bigint NULL DEFAULT NULL COMMENT '操作者ID(SYSTEM时为空)',
  `from_status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '变更前状态',
  `to_status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '变更后状态',
  `content` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '进度说明文字',
  `images` json NULL COMMENT '截图URL数组',
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_order_id`(`order_id` ASC) USING BTREE,
  INDEX `idx_created_at`(`created_at` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 115 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '订单进度记录表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order_progress
-- ----------------------------
INSERT INTO `order_progress` VALUES (1, 1, 'STATUS_CHANGE', 'USER', 1, NULL, 'PENDING_PAYMENT', '创建订单', NULL, NULL, '2026-03-01 17:34:19');
INSERT INTO `order_progress` VALUES (2, 1, 'STATUS_CHANGE', 'USER', 1, 'PENDING_PAYMENT', 'PAID', '余额支付成功', NULL, NULL, '2026-03-01 17:42:42');
INSERT INTO `order_progress` VALUES (3, 1, 'STATUS_CHANGE', 'SYSTEM', NULL, 'PAID', 'ASSIGNED', '系统自动指派打手', NULL, NULL, '2026-03-01 18:36:00');
INSERT INTO `order_progress` VALUES (4, 1, 'STATUS_CHANGE', 'PLAYER', 1, 'ASSIGNED', 'ACCEPTED', '打手接单', NULL, NULL, '2026-03-01 19:15:15');
INSERT INTO `order_progress` VALUES (5, 1, 'STATUS_CHANGE', 'PLAYER', 1, 'ACCEPTED', 'IN_PROGRESS', '开始服务', NULL, NULL, '2026-03-01 19:15:17');
INSERT INTO `order_progress` VALUES (6, 1, 'PROGRESS_UPDATE', 'PLAYER', 1, NULL, NULL, '好的', NULL, NULL, '2026-03-01 19:36:59');
INSERT INTO `order_progress` VALUES (7, 1, 'STATUS_CHANGE', 'PLAYER', 1, 'IN_PROGRESS', 'COMPLETED', '服务完成', NULL, NULL, '2026-03-01 19:37:07');
INSERT INTO `order_progress` VALUES (8, 1, 'STATUS_CHANGE', 'USER', 1, 'COMPLETED', 'CONFIRMED', '用户确认完成', NULL, NULL, '2026-03-01 19:37:32');
INSERT INTO `order_progress` VALUES (9, 1, 'STATUS_CHANGE', 'USER', 1, 'CONFIRMED', 'REVIEWED', '用户已评价', NULL, NULL, '2026-03-01 19:39:04');
INSERT INTO `order_progress` VALUES (10, 2, 'STATUS_CHANGE', 'USER', 1, NULL, 'PENDING_PAYMENT', '创建订单', NULL, NULL, '2026-03-01 19:51:00');
INSERT INTO `order_progress` VALUES (11, 2, 'STATUS_CHANGE', 'USER', 1, 'PENDING_PAYMENT', 'PAID', '余额支付成功', NULL, NULL, '2026-03-01 19:52:37');
INSERT INTO `order_progress` VALUES (12, 3, 'STATUS_CHANGE', 'USER', 1, NULL, 'PENDING_PAYMENT', '创建订单', NULL, NULL, '2026-03-01 19:56:22');
INSERT INTO `order_progress` VALUES (13, 3, 'STATUS_CHANGE', 'USER', 1, 'PENDING_PAYMENT', 'PAID', '余额支付成功', NULL, NULL, '2026-03-01 19:56:24');
INSERT INTO `order_progress` VALUES (14, 4, 'STATUS_CHANGE', 'USER', 1, NULL, 'PENDING_PAYMENT', '创建订单', NULL, NULL, '2026-03-01 19:57:06');
INSERT INTO `order_progress` VALUES (15, 4, 'STATUS_CHANGE', 'USER', 1, 'PENDING_PAYMENT', 'PAID', '余额支付成功', NULL, NULL, '2026-03-01 19:57:08');
INSERT INTO `order_progress` VALUES (16, 4, 'STATUS_CHANGE', 'USER', 1, 'PAID', 'CANCELLED', '用户取消已支付订单，触发退款', NULL, NULL, '2026-03-01 19:59:20');
INSERT INTO `order_progress` VALUES (17, 3, 'STATUS_CHANGE', 'USER', 1, 'PAID', 'CANCELLED', '用户取消已支付订单，触发退款', NULL, NULL, '2026-03-01 19:59:24');
INSERT INTO `order_progress` VALUES (18, 2, 'STATUS_CHANGE', 'SYSTEM', NULL, 'PAID', 'ASSIGNED', '系统自动指派打手', NULL, NULL, '2026-03-01 20:03:00');
INSERT INTO `order_progress` VALUES (19, 5, 'STATUS_CHANGE', 'USER', 1, NULL, 'PENDING_PAYMENT', '创建订单', NULL, NULL, '2026-03-01 20:05:33');
INSERT INTO `order_progress` VALUES (20, 5, 'STATUS_CHANGE', 'USER', 1, 'PENDING_PAYMENT', 'PAID', '余额支付成功', NULL, NULL, '2026-03-01 20:05:35');
INSERT INTO `order_progress` VALUES (21, 5, 'STATUS_CHANGE', 'USER', 1, 'PAID', 'REFUNDING', '用户申请退款', NULL, NULL, '2026-03-01 20:05:40');
INSERT INTO `order_progress` VALUES (22, 5, 'STATUS_CHANGE', 'SYSTEM', NULL, 'REFUNDING', 'REFUNDED', '退款完成: 用户取消订单退款', NULL, NULL, '2026-03-01 20:05:40');
INSERT INTO `order_progress` VALUES (23, 2, 'STATUS_CHANGE', 'PLAYER', 1, 'ASSIGNED', 'ACCEPTED', '打手接单', NULL, NULL, '2026-03-01 20:06:08');
INSERT INTO `order_progress` VALUES (24, 2, 'STATUS_CHANGE', 'PLAYER', 1, 'ACCEPTED', 'IN_PROGRESS', '开始服务', NULL, NULL, '2026-03-01 20:06:40');
INSERT INTO `order_progress` VALUES (25, 2, 'STATUS_CHANGE', 'PLAYER', 1, 'IN_PROGRESS', 'COMPLETED', '服务完成', NULL, NULL, '2026-03-01 20:06:42');
INSERT INTO `order_progress` VALUES (26, 2, 'STATUS_CHANGE', 'USER', 1, 'COMPLETED', 'CONFIRMED', '用户确认完成', NULL, NULL, '2026-03-01 20:07:27');
INSERT INTO `order_progress` VALUES (27, 6, 'STATUS_CHANGE', 'USER', 1, NULL, 'PENDING_PAYMENT', '创建订单', NULL, NULL, '2026-03-01 20:11:30');
INSERT INTO `order_progress` VALUES (28, 6, 'STATUS_CHANGE', 'USER', 1, 'PENDING_PAYMENT', 'PAID', '余额支付成功', NULL, NULL, '2026-03-01 20:11:33');
INSERT INTO `order_progress` VALUES (29, 6, 'STATUS_CHANGE', 'PLAYER', 1, 'PAID', 'ACCEPTED', '打手接单', NULL, NULL, '2026-03-01 20:12:00');
INSERT INTO `order_progress` VALUES (30, 6, 'STATUS_CHANGE', 'PLAYER', 1, 'ACCEPTED', 'IN_PROGRESS', '开始服务', NULL, NULL, '2026-03-01 20:15:14');
INSERT INTO `order_progress` VALUES (31, 6, 'STATUS_CHANGE', 'PLAYER', 1, 'IN_PROGRESS', 'COMPLETED', '服务完成', NULL, NULL, '2026-03-01 20:15:16');
INSERT INTO `order_progress` VALUES (32, 6, 'STATUS_CHANGE', 'USER', 1, 'COMPLETED', 'CONFIRMED', '用户确认完成', NULL, NULL, '2026-03-01 20:28:26');
INSERT INTO `order_progress` VALUES (33, 7, 'STATUS_CHANGE', 'USER', 1, NULL, 'PENDING_PAYMENT', '创建订单', NULL, NULL, '2026-03-01 21:06:24');
INSERT INTO `order_progress` VALUES (34, 7, 'STATUS_CHANGE', 'USER', 1, 'PENDING_PAYMENT', 'PAID', '余额支付成功', NULL, NULL, '2026-03-01 21:06:26');
INSERT INTO `order_progress` VALUES (35, 7, 'STATUS_CHANGE', 'PLAYER', 1, 'PAID', 'ACCEPTED', '打手接单', NULL, NULL, '2026-03-01 21:09:23');
INSERT INTO `order_progress` VALUES (36, 7, 'STATUS_CHANGE', 'PLAYER', 1, 'ACCEPTED', 'IN_PROGRESS', '开始服务', NULL, NULL, '2026-03-01 21:09:28');
INSERT INTO `order_progress` VALUES (37, 7, 'STATUS_CHANGE', 'PLAYER', 1, 'IN_PROGRESS', 'COMPLETED', '服务完成', NULL, NULL, '2026-03-01 21:09:29');
INSERT INTO `order_progress` VALUES (38, 7, 'STATUS_CHANGE', 'USER', 1, 'COMPLETED', 'CONFIRMED', '用户确认完成', NULL, NULL, '2026-03-01 21:09:42');
INSERT INTO `order_progress` VALUES (39, 8, 'STATUS_CHANGE', 'USER', 1, NULL, 'PENDING_PAYMENT', '创建订单', NULL, NULL, '2026-03-01 21:48:09');
INSERT INTO `order_progress` VALUES (40, 8, 'STATUS_CHANGE', 'USER', 1, 'PENDING_PAYMENT', 'PAID', '余额支付成功', NULL, NULL, '2026-03-01 21:48:11');
INSERT INTO `order_progress` VALUES (41, 8, 'STATUS_CHANGE', 'PLAYER', 1, 'PAID', 'ACCEPTED', '打手接单', NULL, NULL, '2026-03-01 21:48:29');
INSERT INTO `order_progress` VALUES (42, 8, 'STATUS_CHANGE', 'PLAYER', 1, 'ACCEPTED', 'IN_PROGRESS', '开始服务', NULL, NULL, '2026-03-01 21:48:33');
INSERT INTO `order_progress` VALUES (43, 8, 'STATUS_CHANGE', 'PLAYER', 1, 'IN_PROGRESS', 'COMPLETED', '服务完成', NULL, NULL, '2026-03-01 21:48:35');
INSERT INTO `order_progress` VALUES (44, 8, 'STATUS_CHANGE', 'USER', 1, 'COMPLETED', 'CONFIRMED', '用户确认完成', NULL, NULL, '2026-03-01 21:48:49');
INSERT INTO `order_progress` VALUES (45, 7, 'STATUS_CHANGE', 'USER', 1, 'CONFIRMED', 'DISPUTED', '用户发起投诉', NULL, NULL, '2026-03-04 17:01:08');
INSERT INTO `order_progress` VALUES (46, 7, 'STATUS_CHANGE', 'CS', 2, 'DISPUTED', 'ARBITRATED', '仲裁结果: FULL_REFUND', NULL, NULL, '2026-03-04 17:03:40');
INSERT INTO `order_progress` VALUES (47, 7, 'STATUS_CHANGE', 'SYSTEM', NULL, 'ARBITRATED', 'REFUNDING', '退款处理中: 仲裁全额退款: 警告', NULL, NULL, '2026-03-04 17:03:40');
INSERT INTO `order_progress` VALUES (48, 7, 'STATUS_CHANGE', 'SYSTEM', NULL, 'REFUNDING', 'REFUNDED', '退款完成: 仲裁全额退款: 警告', NULL, NULL, '2026-03-04 17:03:40');
INSERT INTO `order_progress` VALUES (49, 9, 'STATUS_CHANGE', 'USER', 1, NULL, 'PENDING_PAYMENT', '创建订单', NULL, NULL, '2026-03-04 23:59:41');
INSERT INTO `order_progress` VALUES (50, 9, 'STATUS_CHANGE', 'USER', 1, 'PENDING_PAYMENT', 'PAID', '余额支付成功', NULL, NULL, '2026-03-04 23:59:43');
INSERT INTO `order_progress` VALUES (51, 9, 'STATUS_CHANGE', 'PLAYER', 1, 'PAID', 'ACCEPTED', '打手接单', NULL, NULL, '2026-03-05 00:00:20');
INSERT INTO `order_progress` VALUES (52, 9, 'STATUS_CHANGE', 'PLAYER', 1, 'ACCEPTED', 'IN_PROGRESS', '开始服务', NULL, NULL, '2026-03-05 00:02:34');
INSERT INTO `order_progress` VALUES (53, 9, 'PROGRESS_UPDATE', 'PLAYER', 1, NULL, NULL, '1', NULL, NULL, '2026-03-05 00:02:42');
INSERT INTO `order_progress` VALUES (54, 9, 'PROGRESS_UPDATE', 'PLAYER', 1, NULL, NULL, 'weq ', NULL, NULL, '2026-03-05 00:02:48');
INSERT INTO `order_progress` VALUES (55, 9, 'STATUS_CHANGE', 'PLAYER', 1, 'IN_PROGRESS', 'COMPLETED', '服务完成', NULL, NULL, '2026-03-05 00:02:52');
INSERT INTO `order_progress` VALUES (56, 10, 'STATUS_CHANGE', 'USER', 1, NULL, 'PENDING_PAYMENT', '创建订单', NULL, NULL, '2026-03-05 00:05:03');
INSERT INTO `order_progress` VALUES (57, 10, 'STATUS_CHANGE', 'USER', 1, 'PENDING_PAYMENT', 'PAID', '余额支付成功', NULL, NULL, '2026-03-05 00:05:06');
INSERT INTO `order_progress` VALUES (58, 10, 'STATUS_CHANGE', 'PLAYER', 1, 'PAID', 'ACCEPTED', '打手接单', NULL, NULL, '2026-03-05 00:05:30');
INSERT INTO `order_progress` VALUES (59, 11, 'STATUS_CHANGE', 'USER', 1, NULL, 'PENDING_PAYMENT', '创建订单', NULL, NULL, '2026-03-05 00:10:59');
INSERT INTO `order_progress` VALUES (60, 11, 'STATUS_CHANGE', 'USER', 1, 'PENDING_PAYMENT', 'PAID', '余额支付成功', NULL, NULL, '2026-03-05 00:11:02');
INSERT INTO `order_progress` VALUES (61, 12, 'STATUS_CHANGE', 'USER', 1, NULL, 'PENDING_PAYMENT', '创建订单', NULL, NULL, '2026-03-05 00:12:17');
INSERT INTO `order_progress` VALUES (62, 12, 'STATUS_CHANGE', 'USER', 1, 'PENDING_PAYMENT', 'PAID', '余额支付成功', NULL, NULL, '2026-03-05 00:12:20');
INSERT INTO `order_progress` VALUES (63, 9, 'STATUS_CHANGE', 'USER', 1, 'COMPLETED', 'DISPUTED', '用户发起投诉', NULL, NULL, '2026-03-05 00:16:12');
INSERT INTO `order_progress` VALUES (64, 9, 'STATUS_CHANGE', 'CS', 2, 'DISPUTED', 'ARBITRATED', '仲裁结果: FULL_REFUND', NULL, NULL, '2026-03-05 00:16:37');
INSERT INTO `order_progress` VALUES (65, 9, 'STATUS_CHANGE', 'SYSTEM', NULL, 'ARBITRATED', 'REFUNDING', '退款处理中: 仲裁全额退款: 11', NULL, NULL, '2026-03-05 00:16:37');
INSERT INTO `order_progress` VALUES (66, 9, 'STATUS_CHANGE', 'SYSTEM', NULL, 'REFUNDING', 'REFUNDED', '退款完成: 仲裁全额退款: 11', NULL, NULL, '2026-03-05 00:16:37');
INSERT INTO `order_progress` VALUES (67, 12, 'STATUS_CHANGE', 'SYSTEM', NULL, 'PAID', 'ASSIGNED', '系统指派打手', NULL, NULL, '2026-03-05 00:20:55');
INSERT INTO `order_progress` VALUES (68, 11, 'STATUS_CHANGE', 'PLAYER', 2, 'PAID', 'ACCEPTED', '打手接单', NULL, NULL, '2026-03-05 12:19:24');
INSERT INTO `order_progress` VALUES (69, 11, 'STATUS_CHANGE', 'PLAYER', 2, 'ACCEPTED', 'IN_PROGRESS', '开始服务', NULL, NULL, '2026-03-05 12:43:00');
INSERT INTO `order_progress` VALUES (70, 13, 'STATUS_CHANGE', 'USER', 2, NULL, 'PENDING_PAYMENT', '创建订单', NULL, NULL, '2026-03-05 12:43:31');
INSERT INTO `order_progress` VALUES (71, 13, 'STATUS_CHANGE', 'USER', 2, 'PENDING_PAYMENT', 'PAID', '余额支付成功', NULL, NULL, '2026-03-05 12:46:39');
INSERT INTO `order_progress` VALUES (72, 11, 'STATUS_CHANGE', 'PLAYER', 2, 'IN_PROGRESS', 'COMPLETED', '服务完成', NULL, NULL, '2026-03-05 12:47:04');
INSERT INTO `order_progress` VALUES (73, 13, 'STATUS_CHANGE', 'PLAYER', 2, 'PAID', 'ACCEPTED', '打手接单', NULL, NULL, '2026-03-05 12:47:09');
INSERT INTO `order_progress` VALUES (74, 13, 'TEAMMATE_INVITED', 'PLAYER', 2, NULL, NULL, '邀请队友 lly，分成方式: CUSTOM', NULL, NULL, '2026-03-05 13:10:04');
INSERT INTO `order_progress` VALUES (75, 13, 'STATUS_CHANGE', 'PLAYER', 2, 'WAITING_TEAMMATE', 'IN_PROGRESS', '开始服务', NULL, NULL, '2026-03-05 13:26:22');
INSERT INTO `order_progress` VALUES (76, 13, 'STATUS_CHANGE', 'PLAYER', 2, 'IN_PROGRESS', 'COMPLETED', '服务完成', NULL, NULL, '2026-03-05 13:26:37');
INSERT INTO `order_progress` VALUES (77, 13, 'STATUS_CHANGE', 'USER', 2, 'COMPLETED', 'DISPUTED', '用户发起投诉', NULL, NULL, '2026-03-05 13:40:00');
INSERT INTO `order_progress` VALUES (78, 13, 'STATUS_CHANGE', 'CS', 1, 'DISPUTED', 'ARBITRATED', '仲裁结果: PARTIAL_REFUND', NULL, NULL, '2026-03-05 13:40:56');
INSERT INTO `order_progress` VALUES (79, 13, 'STATUS_CHANGE', 'SYSTEM', NULL, 'ARBITRATED', 'REFUNDING', '退款处理中: 仲裁部分退款: 已经处理', NULL, NULL, '2026-03-05 13:40:56');
INSERT INTO `order_progress` VALUES (80, 13, 'STATUS_CHANGE', 'SYSTEM', NULL, 'REFUNDING', 'REFUNDED', '退款完成: 仲裁部分退款: 已经处理', NULL, NULL, '2026-03-05 13:40:56');
INSERT INTO `order_progress` VALUES (81, 14, 'STATUS_CHANGE', 'USER', 2, NULL, 'PENDING_PAYMENT', '创建订单', NULL, NULL, '2026-03-05 14:21:27');
INSERT INTO `order_progress` VALUES (82, 14, 'STATUS_CHANGE', 'USER', 2, 'PENDING_PAYMENT', 'PAID', '余额支付成功', NULL, NULL, '2026-03-05 14:21:30');
INSERT INTO `order_progress` VALUES (83, 14, 'STATUS_CHANGE', 'PLAYER', 2, 'PAID', 'ACCEPTED', '打手接单', NULL, NULL, '2026-03-05 14:21:55');
INSERT INTO `order_progress` VALUES (84, 14, 'STATUS_CHANGE', 'PLAYER', 2, 'ACCEPTED', 'IN_PROGRESS', '开始服务', NULL, NULL, '2026-03-05 14:22:14');
INSERT INTO `order_progress` VALUES (85, 14, 'STATUS_CHANGE', 'CS', 2, 'IN_PROGRESS', 'PAID', '客服同意换人，订单等待重新指派', NULL, NULL, '2026-03-05 14:31:04');
INSERT INTO `order_progress` VALUES (86, 14, 'STATUS_CHANGE', 'SYSTEM', NULL, 'PAID', 'ASSIGNED', '系统指派打手', NULL, NULL, '2026-03-05 14:34:21');
INSERT INTO `order_progress` VALUES (87, 15, 'STATUS_CHANGE', 'USER', 2, NULL, 'PENDING_PAYMENT', '创建订单', NULL, NULL, '2026-03-06 18:35:34');
INSERT INTO `order_progress` VALUES (88, 15, 'STATUS_CHANGE', 'USER', 2, 'PENDING_PAYMENT', 'CANCELLED', '用户取消订单', NULL, NULL, '2026-03-06 18:42:05');
INSERT INTO `order_progress` VALUES (89, 16, 'STATUS_CHANGE', 'USER', 2, NULL, 'PENDING_PAYMENT', '创建订单', NULL, NULL, '2026-03-06 18:42:25');
INSERT INTO `order_progress` VALUES (90, 14, 'STATUS_CHANGE', 'PLAYER', 2, 'ASSIGNED', 'ACCEPTED', '打手接单', NULL, NULL, '2026-03-06 18:47:54');
INSERT INTO `order_progress` VALUES (91, 14, 'STATUS_CHANGE', 'PLAYER', 2, 'ACCEPTED', 'IN_PROGRESS', '开始服务', NULL, NULL, '2026-03-06 18:47:56');
INSERT INTO `order_progress` VALUES (92, 14, 'STATUS_CHANGE', 'PLAYER', 2, 'IN_PROGRESS', 'COMPLETED', '服务完成', NULL, NULL, '2026-03-06 18:47:59');
INSERT INTO `order_progress` VALUES (93, 16, 'STATUS_CHANGE', 'SYSTEM', NULL, 'PENDING_PAYMENT', 'CANCELLED', '超时未支付，系统自动取消', NULL, NULL, '2026-03-06 19:15:00');
INSERT INTO `order_progress` VALUES (97, 14, 'STATUS_CHANGE', 'USER', 2, 'COMPLETED', 'CONFIRMED', '用户确认完成', NULL, NULL, '2026-03-06 19:24:54');
INSERT INTO `order_progress` VALUES (98, 11, 'STATUS_CHANGE', 'SYSTEM', NULL, 'COMPLETED', 'CONFIRMED', '系统自动确认', NULL, NULL, '2026-03-07 16:10:00');
INSERT INTO `order_progress` VALUES (99, 17, 'STATUS_CHANGE', 'USER', 2, NULL, 'PENDING_PAYMENT', '创建订单', NULL, NULL, '2026-03-10 22:46:50');
INSERT INTO `order_progress` VALUES (100, 17, 'STATUS_CHANGE', 'USER', 2, 'PENDING_PAYMENT', 'PAID', '余额支付成功', NULL, NULL, '2026-03-10 22:46:53');
INSERT INTO `order_progress` VALUES (101, 18, 'STATUS_CHANGE', 'USER', 2, NULL, 'PENDING_PAYMENT', '创建订单', NULL, NULL, '2026-03-10 22:48:13');
INSERT INTO `order_progress` VALUES (102, 18, 'STATUS_CHANGE', 'USER', 2, 'PENDING_PAYMENT', 'PAID', '余额支付成功', NULL, NULL, '2026-03-10 22:48:16');
INSERT INTO `order_progress` VALUES (103, 17, 'STATUS_CHANGE', 'SYSTEM', NULL, 'PAID', 'ASSIGNED', '系统自动指派打手', NULL, NULL, '2026-03-10 22:57:00');
INSERT INTO `order_progress` VALUES (104, 19, 'STATUS_CHANGE', 'USER', 2, NULL, 'PENDING_PAYMENT', '创建订单', NULL, NULL, '2026-03-12 21:56:46');
INSERT INTO `order_progress` VALUES (105, 19, 'STATUS_CHANGE', 'USER', 2, 'PENDING_PAYMENT', 'PAID', '余额支付成功', NULL, NULL, '2026-03-12 21:56:50');
INSERT INTO `order_progress` VALUES (106, 18, 'STATUS_CHANGE', 'SYSTEM', NULL, 'PAID', 'ASSIGNED', '系统自动指派打手', NULL, NULL, '2026-03-12 21:57:00');
INSERT INTO `order_progress` VALUES (107, 19, 'STATUS_CHANGE', 'PLAYER', 2, 'PAID', 'ACCEPTED', '打手接单', NULL, NULL, '2026-03-12 21:57:13');
INSERT INTO `order_progress` VALUES (108, 19, 'STATUS_CHANGE', 'PLAYER', 2, 'ACCEPTED', 'IN_PROGRESS', '开始服务', NULL, NULL, '2026-03-12 21:57:19');
INSERT INTO `order_progress` VALUES (109, 19, 'PLAYER_REPLACED', 'PLAYER', 2, NULL, NULL, '接单员主动退出，订单回到接单大厅', NULL, NULL, '2026-03-12 21:57:21');
INSERT INTO `order_progress` VALUES (110, 19, 'STATUS_CHANGE', 'PLAYER', 2, 'PAID', 'ACCEPTED', '打手接单', NULL, NULL, '2026-03-12 22:01:15');
INSERT INTO `order_progress` VALUES (111, 19, 'STATUS_CHANGE', 'PLAYER', 2, 'ACCEPTED', 'IN_PROGRESS', '开始服务', NULL, NULL, '2026-03-12 22:01:19');
INSERT INTO `order_progress` VALUES (112, 19, 'TEAMMATE_INVITED', 'PLAYER', 2, NULL, NULL, '邀请队友 微信用户1，分成方式: 自定义金额', NULL, NULL, '2026-03-12 22:01:31');
INSERT INTO `order_progress` VALUES (113, 19, 'TEAMMATE_REPLACED', 'PLAYER', 2, NULL, NULL, '主接单员更换队友，可重新邀请', NULL, NULL, '2026-03-12 22:04:29');
INSERT INTO `order_progress` VALUES (114, 19, 'PLAYER_REPLACED', 'PLAYER', 2, NULL, NULL, '接单员主动退出，订单回到接单大厅', NULL, NULL, '2026-03-12 22:04:32');

-- ----------------------------
-- Table structure for order_relay_request
-- ----------------------------
DROP TABLE IF EXISTS `order_relay_request`;
CREATE TABLE `order_relay_request`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `order_id` bigint NOT NULL,
  `original_player_id` bigint NOT NULL,
  `split_type` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `split_amount` decimal(10, 2) NULL DEFAULT NULL,
  `reason` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `status` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'PENDING',
  `new_player_id` bigint NULL DEFAULT NULL,
  `reviewed_by` bigint NULL DEFAULT NULL,
  `reviewed_at` datetime NULL DEFAULT NULL,
  `reject_reason` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `created_at` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_order_id`(`order_id` ASC) USING BTREE,
  INDEX `idx_status`(`status` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '订单接力申请' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order_relay_request
-- ----------------------------

-- ----------------------------
-- Table structure for payment
-- ----------------------------
DROP TABLE IF EXISTS `payment`;
CREATE TABLE `payment`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '支付ID',
  `payment_no` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '支付单号',
  `order_id` bigint NULL DEFAULT NULL COMMENT '订单ID(押金支付时为空)',
  `user_id` bigint NOT NULL COMMENT '支付用户ID',
  `biz_type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'ORDER' COMMENT '业务类型: ORDER-订单支付 PLAYER_DEPOSIT-打手押金',
  `amount` decimal(10, 2) NOT NULL COMMENT '支付金额',
  `pay_method` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '支付方式: WECHAT-微信 BALANCE-余额',
  `status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'PAYING' COMMENT '状态: PAYING/PAID/FAILED/REFUNDING/REFUNDED',
  `wx_transaction_id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '微信支付交易号',
  `wx_prepay_id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '微信预支付ID',
  `refund_amount` decimal(10, 2) NULL DEFAULT NULL COMMENT '退款金额',
  `refund_no` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '退款单号',
  `refund_reason` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '退款原因',
  `refund_time` datetime NULL DEFAULT NULL COMMENT '退款完成时间',
  `paid_at` datetime NULL DEFAULT NULL COMMENT '支付成功时间',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_payment_no`(`payment_no` ASC) USING BTREE,
  INDEX `idx_order_id`(`order_id` ASC) USING BTREE,
  INDEX `idx_user_id`(`user_id` ASC) USING BTREE,
  INDEX `idx_status`(`status` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 23 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '支付记录表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of payment
-- ----------------------------
INSERT INTO `payment` VALUES (1, 'P2028042774829469696', 1, 1, 'ORDER', 9.99, 'WECHAT', 'PAYING', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-01 17:40:51', '2026-03-01 17:40:51');
INSERT INTO `payment` VALUES (2, 'P2028043237297623040', 1, 1, 'ORDER', 9.99, 'BALANCE', 'PAID', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-01 17:42:42', '2026-03-01 17:42:42', '2026-03-01 17:42:42');
INSERT INTO `payment` VALUES (3, 'P2028075540908478464', 2, 1, 'ORDER', 10.00, 'WECHAT', 'PAYING', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-01 19:51:03', '2026-03-01 19:51:03');
INSERT INTO `payment` VALUES (4, 'P2028075933092679680', 2, 1, 'ORDER', 10.00, 'BALANCE', 'PAID', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-01 19:52:37', '2026-03-01 19:52:37', '2026-03-01 19:52:37');
INSERT INTO `payment` VALUES (5, 'P2028076885866582016', 3, 1, 'ORDER', 10.00, 'BALANCE', 'PAID', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-01 19:56:24', '2026-03-01 19:56:24', '2026-03-01 19:56:24');
INSERT INTO `payment` VALUES (6, 'P2028077068574658560', 4, 1, 'ORDER', 10.00, 'BALANCE', 'PAID', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-01 19:57:08', '2026-03-01 19:57:08', '2026-03-01 19:57:08');
INSERT INTO `payment` VALUES (7, 'P2028079198211543040', 5, 1, 'ORDER', 9.99, 'BALANCE', 'REFUNDED', NULL, NULL, 9.99, 'P2028079218365173760', '用户取消订单退款', '2026-03-01 20:05:40', '2026-03-01 20:05:35', '2026-03-01 20:05:35', '2026-03-01 20:05:35');
INSERT INTO `payment` VALUES (8, 'P2028080698040127488', 6, 1, 'ORDER', 9.99, 'BALANCE', 'PAID', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-01 20:11:33', '2026-03-01 20:11:33', '2026-03-01 20:11:33');
INSERT INTO `payment` VALUES (9, 'P2028094510428459008', 7, 1, 'ORDER', 10.00, 'BALANCE', 'REFUNDED', NULL, NULL, 10.00, 'P2029120577842843648', '仲裁全额退款: 警告', '2026-03-04 17:03:40', '2026-03-01 21:06:26', '2026-03-01 21:06:26', '2026-03-01 21:06:26');
INSERT INTO `payment` VALUES (10, 'P2028105017717821440', 8, 1, 'ORDER', 9.99, 'BALANCE', 'PAID', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-01 21:48:11', '2026-03-01 21:48:11', '2026-03-01 21:48:11');
INSERT INTO `payment` VALUES (11, 'P2029225283206385664', 9, 1, 'ORDER', 10.00, 'BALANCE', 'REFUNDED', NULL, NULL, 10.00, 'P2029229532887781376', '仲裁全额退款: 11', '2026-03-05 00:16:37', '2026-03-04 23:59:43', '2026-03-04 23:59:43', '2026-03-04 23:59:43');
INSERT INTO `payment` VALUES (12, 'P2029226634141372416', 10, 1, 'ORDER', 10.00, 'BALANCE', 'PAID', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-05 00:05:05', '2026-03-05 00:05:05', '2026-03-05 00:05:05');
INSERT INTO `payment` VALUES (13, 'P2029228128605442048', 11, 1, 'ORDER', 9.99, 'BALANCE', 'PAID', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-05 00:11:02', '2026-03-05 00:11:02', '2026-03-05 00:11:02');
INSERT INTO `payment` VALUES (14, 'P2029228455094259712', 12, 1, 'ORDER', 9.99, 'BALANCE', 'PAID', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-05 00:12:20', '2026-03-05 00:12:20', '2026-03-05 00:12:20');
INSERT INTO `payment` VALUES (15, 'P2029417515947528192', 13, 2, 'ORDER', 10.00, 'WECHAT', 'PAYING', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-05 12:43:35', '2026-03-05 12:43:35');
INSERT INTO `payment` VALUES (16, 'P2029418286143377408', 13, 2, 'ORDER', 10.00, 'BALANCE', 'REFUNDED', NULL, NULL, 5.00, 'P2029431946119090176', '仲裁部分退款: 已经处理', '2026-03-05 13:40:56', '2026-03-05 12:46:39', '2026-03-05 12:46:39', '2026-03-05 12:46:39');
INSERT INTO `payment` VALUES (17, 'P2029442154975334400', 14, 2, 'ORDER', 10.00, 'BALANCE', 'PAID', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-05 14:21:30', '2026-03-05 14:21:30', '2026-03-05 14:21:30');
INSERT INTO `payment` VALUES (18, 'P2029868489107443712', 15, 2, 'ORDER', 10.00, 'WECHAT', 'PAYING', NULL, 'wx06183537657790c0e57838508f60f90000', NULL, NULL, NULL, NULL, NULL, '2026-03-06 18:35:36', '2026-03-06 18:35:36');
INSERT INTO `payment` VALUES (19, 'P2029870217164886016', 16, 2, 'ORDER', 10.00, 'WECHAT', 'PAYING', NULL, 'wx0618422951905092357151b7a5d0820000', NULL, NULL, NULL, NULL, NULL, '2026-03-06 18:42:28', '2026-03-06 18:42:28');
INSERT INTO `payment` VALUES (20, 'P2031381281555746816', 17, 2, 'ORDER', 9.99, 'BALANCE', 'PAID', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-10 22:46:53', '2026-03-10 22:46:53', '2026-03-10 22:46:53');
INSERT INTO `payment` VALUES (21, 'P2031381627128647680', 18, 2, 'ORDER', 10.00, 'BALANCE', 'PAID', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-10 22:48:16', '2026-03-10 22:48:16', '2026-03-10 22:48:16');
INSERT INTO `payment` VALUES (22, 'P2032093458944102400', 19, 2, 'ORDER', 9.99, 'BALANCE', 'PAID', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-12 21:56:50', '2026-03-12 21:56:50', '2026-03-12 21:56:50');

-- ----------------------------
-- Table structure for player
-- ----------------------------
DROP TABLE IF EXISTS `player`;
CREATE TABLE `player`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '打手ID',
  `openid` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '微信openid',
  `nickname` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '昵称',
  `avatar` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '头像URL',
  `real_name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '真实姓名',
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '联系方式',
  `skill_tags` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `game_level` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '游戏段位/等级',
  `proof_images` json NULL COMMENT '技能证明截图JSON数组',
  `service_types` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `avg_rating` decimal(3, 2) NOT NULL DEFAULT 5.00 COMMENT '平均评分(1.00~5.00)',
  `order_count` int NOT NULL DEFAULT 0 COMMENT '累计接单数',
  `complete_rate` decimal(5, 2) NOT NULL DEFAULT 100.00 COMMENT '完成率(%)',
  `status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'PENDING' COMMENT '状态: PENDING-待审核 ACTIVE-正常 REJECTED-已驳回 FROZEN-已冻结',
  `frozen_until` datetime NULL DEFAULT NULL COMMENT '冻结截止时间',
  `reject_reason` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '驳回原因',
  `deposit_payment_no` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '打手入驻押金支付单号(100元)',
  `last_online_at` datetime NULL DEFAULT NULL COMMENT '最后在线时间',
  `deleted` tinyint NOT NULL DEFAULT 0 COMMENT '逻辑删除',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_openid`(`openid` ASC) USING BTREE,
  INDEX `idx_status`(`status` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '打手表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of player
-- ----------------------------
INSERT INTO `player` VALUES (1, 'oNSQb62h87DFpGNnN5Sbxn5FY7kI', 'lly', '', '11', '1', '11', '1', '[\"http://localhost:8080/file/2026/03/01/aae86694ecc7491282b3c0ce90d1db01.png\"]', '1', 5.00, 0, 0.00, 'ACTIVE', NULL, '', NULL, NULL, 0, '2026-03-01 18:32:02', '2026-03-01 19:39:04');
INSERT INTO `player` VALUES (2, 'o839C3VE8erN2DX6AxxxDbHYedcw', '微信用户', '', '俩3', '17663362212', '2222', '22', '[]', '22', 0.00, 0, 0.00, 'ACTIVE', NULL, '', NULL, NULL, 0, '2026-03-05 12:19:05', '2026-03-05 12:19:12');
INSERT INTO `player` VALUES (3, '1222222', '微信用户1', '', '11', '111112', NULL, '', NULL, '', 5.00, 0, 100.00, 'ACTIVE', NULL, '', NULL, NULL, 0, '2026-03-05 13:02:24', '2026-03-05 14:34:34');

-- ----------------------------
-- Table structure for player_account
-- ----------------------------
DROP TABLE IF EXISTS `player_account`;
CREATE TABLE `player_account`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '账户ID',
  `player_id` bigint NOT NULL COMMENT '打手ID',
  `type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '账户类型: WECHAT-微信 ALIPAY-支付宝',
  `account_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '真实姓名',
  `account_no` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '账号',
  `qrcode_url` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '收款码图片URL（支付宝/微信）',
  `is_default` tinyint NOT NULL DEFAULT 0 COMMENT '是否默认: 1-是 0-否',
  `deleted` tinyint NOT NULL DEFAULT 0 COMMENT '逻辑删除',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_player_id`(`player_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '打手提现账户表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of player_account
-- ----------------------------
INSERT INTO `player_account` VALUES (1, 1, 'WECHAT', '213123', '1231', NULL, 0, 0, '2026-03-01 20:26:21', '2026-03-01 20:26:21');

-- ----------------------------
-- Table structure for player_replace_request
-- ----------------------------
DROP TABLE IF EXISTS `player_replace_request`;
CREATE TABLE `player_replace_request`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `order_id` bigint NOT NULL COMMENT '订单ID',
  `user_id` bigint NOT NULL COMMENT '申请用户ID',
  `old_player_id` bigint NULL DEFAULT NULL COMMENT '被换打手ID',
  `reason` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '换人原因',
  `status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'PENDING' COMMENT 'PENDING/APPROVED/REJECTED',
  `operator_id` bigint NULL DEFAULT NULL COMMENT '处理客服ID',
  `operator_remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '客服备注',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `processed_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_order_id`(`order_id` ASC) USING BTREE,
  INDEX `idx_status`(`status` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '换人申请' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of player_replace_request
-- ----------------------------
INSERT INTO `player_replace_request` VALUES (1, 14, 2, 2, '需要换人', 'APPROVED', 2, NULL, '2026-03-05 14:29:52', '2026-03-05 14:31:04');

-- ----------------------------
-- Table structure for player_wallet
-- ----------------------------
DROP TABLE IF EXISTS `player_wallet`;
CREATE TABLE `player_wallet`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '钱包ID',
  `player_id` bigint NOT NULL COMMENT '打手ID',
  `balance` decimal(12, 2) NOT NULL DEFAULT 0.00 COMMENT '可用余额',
  `frozen_amount` decimal(12, 2) NOT NULL DEFAULT 0.00 COMMENT '冻结金额(提现审核中)',
  `total_income` decimal(12, 2) NOT NULL DEFAULT 0.00 COMMENT '累计收入',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_player_id`(`player_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '打手钱包表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of player_wallet
-- ----------------------------
INSERT INTO `player_wallet` VALUES (1, 1, 0.00, 0.00, 32.98, '2026-03-01 20:07:27', '2026-03-01 20:07:27');
INSERT INTO `player_wallet` VALUES (5, 2, 17.99, 0.00, 17.99, '2026-03-06 19:24:54', '2026-03-06 19:24:54');

-- ----------------------------
-- Table structure for price_rule
-- ----------------------------
DROP TABLE IF EXISTS `price_rule`;
CREATE TABLE `price_rule`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '规则ID',
  `product_id` bigint NOT NULL COMMENT '商品ID',
  `spec_combination` json NOT NULL COMMENT '规格组合(如:{\"当前段位\":\"青铜\",\"目标段位\":\"白银\"})',
  `price` decimal(10, 2) NOT NULL COMMENT '售价',
  `original_price` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '原价(划线价)',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_product_id`(`product_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '价格规则表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of price_rule
-- ----------------------------

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '商品ID',
  `category_id` bigint NOT NULL COMMENT '所属分类ID',
  `name` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '商品名称',
  `subtitle` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '商品副标题',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '商品描述',
  `cover_image` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '封面图URL',
  `images` json NULL COMMENT '详情图URL数组',
  `required_player_count` tinyint NOT NULL DEFAULT 1 COMMENT '需要打手数量(1-单人 2-双人组队)',
  `status` tinyint NOT NULL DEFAULT 0 COMMENT '状态: 1-上架 0-下架',
  `sort_order` int NOT NULL DEFAULT 0 COMMENT '排序',
  `sales_count` int NOT NULL DEFAULT 0 COMMENT '销量',
  `avg_rating` decimal(3, 2) NOT NULL DEFAULT 5.00 COMMENT '平均评分',
  `commission_rate` decimal(5, 4) NULL DEFAULT NULL COMMENT '商品级抽佣比例(0~1),为NULL则使用系统默认',
  `review_count` int NOT NULL DEFAULT 0 COMMENT '评价数',
  `is_recommend` tinyint NOT NULL DEFAULT 0 COMMENT '是否推荐: 1-是 0-否',
  `recommend_category_id` bigint NULL DEFAULT NULL COMMENT '所属热门推荐分类',
  `deleted` tinyint NOT NULL DEFAULT 0 COMMENT '逻辑删除',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `price` decimal(10, 2) NULL DEFAULT NULL COMMENT '商品价格',
  `per_user_limit_enabled` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否开启每人限购（0关 1开）',
  `per_user_limit_count` int NULL DEFAULT NULL COMMENT '每个用户最多可购买次数',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_category_status`(`category_id` ASC, `status` ASC) USING BTREE,
  INDEX `idx_status_sort`(`status` ASC, `sort_order` ASC) USING BTREE,
  INDEX `idx_status_sales`(`status` ASC, `sales_count` ASC) USING BTREE,
  INDEX `idx_product_recommend_category`(`recommend_category_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '商品表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO `product` VALUES (1, 3, '三角洲代打', '测试测试测是', '', 'http://localhost:8080/file/2026/03/01/63cbbf922ff049e8a967fde939a4004e.png', '[\"http://localhost:8080/file/2026/03/01/1365647b6b1d4c73a3b9e6811a866632.png\"]', 1, 1, 0, 7, 5.00, 0.3000, 1, 1, 2, 0, '2026-02-27 19:26:40', '2026-03-10 22:40:12', 9.99, 0, NULL);
INSERT INTO `product` VALUES (2, 3, '【CS测试】客服端商品', '', '客服端保存测试', 'http://localhost:8080/file/2026/03/01/1aff090cb87440ce961862471751f443.webp', '[\"http://localhost:8080/file/2026/03/01/74d7b0ad5ec340b4b47a1468c3abce84.webp\"]', 1, 1, 1000, 7, 5.00, NULL, 0, 1, 1, 0, '2026-03-01 14:32:06', '2026-03-07 19:57:36', 10.00, 0, NULL);

-- ----------------------------
-- Table structure for product_spec
-- ----------------------------
DROP TABLE IF EXISTS `product_spec`;
CREATE TABLE `product_spec`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '规格ID',
  `product_id` bigint NOT NULL COMMENT '商品ID',
  `spec_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '规格名称(如:当前段位、目标段位)',
  `spec_values` json NOT NULL COMMENT '可选值列表(如:[\"青铜\",\"白银\",\"黄金\"])',
  `sort_order` int NOT NULL DEFAULT 0 COMMENT '排序',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_product_id`(`product_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '商品规格表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of product_spec
-- ----------------------------

-- ----------------------------
-- Table structure for quick_reply
-- ----------------------------
DROP TABLE IF EXISTS `quick_reply`;
CREATE TABLE `quick_reply`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `category` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '分类: ORDER-订单 COMPLAINT-投诉 GENERAL-通用',
  `content` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '回复内容',
  `sort_order` int NOT NULL DEFAULT 0 COMMENT '排序',
  `status` tinyint NOT NULL DEFAULT 1 COMMENT '状态: 1-启用 0-禁用',
  `deleted` tinyint NOT NULL DEFAULT 0 COMMENT '逻辑删除',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_category`(`category` ASC, `status` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '快捷回复表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of quick_reply
-- ----------------------------
INSERT INTO `quick_reply` VALUES (1, '问候', '你今天好吗', 0, 1, 0, '2026-03-03 19:56:54', '2026-03-03 19:56:54');

-- ----------------------------
-- Table structure for recommend_category
-- ----------------------------
DROP TABLE IF EXISTS `recommend_category`;
CREATE TABLE `recommend_category`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '编码',
  `name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '展示名称',
  `sort_order` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_code`(`code` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '热门推荐分类' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of recommend_category
-- ----------------------------
INSERT INTO `recommend_category` VALUES (1, 'HOT', '热门推荐', 0);
INSERT INTO `recommend_category` VALUES (2, 'ESCORT', '护航专区推荐', 1);

-- ----------------------------
-- Table structure for review
-- ----------------------------
DROP TABLE IF EXISTS `review`;
CREATE TABLE `review`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '评价ID',
  `order_id` bigint NOT NULL COMMENT '订单ID',
  `user_id` bigint NOT NULL COMMENT '评价用户ID',
  `player_id` bigint NOT NULL COMMENT '被评价打手ID(主接打手)',
  `product_id` bigint NOT NULL COMMENT '商品ID(便于按商品查评价)',
  `rating` tinyint NOT NULL COMMENT '星级评分(1-5)',
  `content` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '评价文字(最多200字)',
  `images` json NULL COMMENT '评价图片URL数组(最多3张)',
  `deleted` tinyint NOT NULL DEFAULT 0 COMMENT '逻辑删除(管理员可删违规评价)',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_order_id`(`order_id` ASC) USING BTREE,
  INDEX `idx_player_id`(`player_id` ASC) USING BTREE,
  INDEX `idx_product_id`(`product_id` ASC) USING BTREE,
  INDEX `idx_created_at`(`created_at` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '评价表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of review
-- ----------------------------
INSERT INTO `review` VALUES (1, 1, 1, 1, 1, 5, '11', NULL, 0, '2026-03-01 19:39:04');

-- ----------------------------
-- Table structure for sensitive_word
-- ----------------------------
DROP TABLE IF EXISTS `sensitive_word`;
CREATE TABLE `sensitive_word`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `word` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '敏感词',
  `category` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '分类: DIRTY/AD/POLITICAL/OTHER',
  `status` tinyint NOT NULL DEFAULT 1 COMMENT '状态: 1-启用 0-禁用',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_status`(`status` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '敏感词表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sensitive_word
-- ----------------------------

-- ----------------------------
-- Table structure for statistics_daily
-- ----------------------------
DROP TABLE IF EXISTS `statistics_daily`;
CREATE TABLE `statistics_daily`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `stat_date` date NOT NULL COMMENT '统计日期',
  `new_user_count` int NOT NULL DEFAULT 0 COMMENT '新增用户数',
  `active_user_count` int NOT NULL DEFAULT 0 COMMENT '活跃用户数',
  `new_order_count` int NOT NULL DEFAULT 0 COMMENT '新增订单数',
  `completed_order_count` int NOT NULL DEFAULT 0 COMMENT '完成订单数',
  `cancelled_order_count` int NOT NULL DEFAULT 0 COMMENT '取消订单数',
  `total_amount` decimal(12, 2) NOT NULL DEFAULT 0.00 COMMENT '成交总额',
  `platform_income` decimal(12, 2) NOT NULL DEFAULT 0.00 COMMENT '平台收入',
  `player_income` decimal(12, 2) NOT NULL DEFAULT 0.00 COMMENT '打手总收入',
  `new_player_count` int NOT NULL DEFAULT 0 COMMENT '新增打手数',
  `active_player_count` int NOT NULL DEFAULT 0 COMMENT '活跃打手数',
  `new_complaint_count` int NOT NULL DEFAULT 0 COMMENT '新增投诉数',
  `avg_order_amount` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '平均客单价',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_stat_date`(`stat_date` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '每日统计快照表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of statistics_daily
-- ----------------------------

-- ----------------------------
-- Table structure for subscribe_message_log
-- ----------------------------
DROP TABLE IF EXISTS `subscribe_message_log`;
CREATE TABLE `subscribe_message_log`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `user_type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '接收者类型: USER/PLAYER',
  `user_id` bigint NOT NULL COMMENT '接收者ID',
  `template_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '消息模板ID',
  `data` json NOT NULL COMMENT '发送数据JSON',
  `status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '发送状态: SUCCESS/FAIL',
  `error_msg` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '失败原因',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_user`(`user_type` ASC, `user_id` ASC) USING BTREE,
  INDEX `idx_created_at`(`created_at` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '微信订阅消息发送日志表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of subscribe_message_log
-- ----------------------------
INSERT INTO `subscribe_message_log` VALUES (1, 'USER', 2, 'sUrc4cGcXvz5Mi59q3b0Jp8jmNt9CGWd2_-pc0jiwGs', '{\"thing2\": \"三角洲代打\", \"amount3\": \"9.99元\", \"phrase4\": \"已被接单\", \"character_string1\": \"O2032093444209512448\"}', 'SUCCESS', NULL, '2026-03-12 21:57:13');
INSERT INTO `subscribe_message_log` VALUES (2, 'USER', 2, 'sUrc4cGcXvz5Mi59q3b0Jp8jmNt9CGWd2_-pc0jiwGs', '{\"thing2\": \"三角洲代打\", \"amount3\": \"9.99元\", \"phrase4\": \"已被接单\", \"character_string1\": \"O2032093444209512448\"}', 'FAIL', '错误代码：43101, 错误信息：用户拒绝接受消息，如果用户之前曾经订阅过，则表示用户取消了订阅关系，微信原始报文：{\"errcode\":43101,\"errmsg\":\"user refuse to accept the msg rid: 69b2c72e-1223c316-5aaab7f9\"}', '2026-03-12 22:01:15');

-- ----------------------------
-- Table structure for sys_config
-- ----------------------------
DROP TABLE IF EXISTS `sys_config`;
CREATE TABLE `sys_config`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `config_key` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '配置键',
  `config_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '配置名称',
  `config_value` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '配置值',
  `value_type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'text' COMMENT '值类型: text/number/boolean/textarea',
  `config_group` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '基础配置' COMMENT '配置分组',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注说明',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_config_key`(`config_key` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '系统配置表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_config
-- ----------------------------
INSERT INTO `sys_config` VALUES (10, 'settlement.commission_rate', '平台抽成比例', '0.1', 'text', '结算配置', '0~1之间的小数，如0.2表示20%抽成', '2026-03-01 21:15:50', '2026-03-01 21:15:50');
INSERT INTO `sys_config` VALUES (11, 'withdraw.min_amount', '最低提现金额', '10', 'number', '提现配置', '打手最低提现金额（元）', '2026-03-01 21:15:50', '2026-03-01 21:15:50');
INSERT INTO `sys_config` VALUES (12, 'withdraw.max_daily_count', '每日提现次数上限', '3', 'number', '提现配置', '每个打手每天最多提现次数', '2026-03-01 21:15:50', '2026-03-01 21:15:50');
INSERT INTO `sys_config` VALUES (13, 'order.auto_confirm_hours', '自动确认收货时间', '48', 'number', '订单配置', '用户未操作时自动确认的小时数', '2026-03-01 21:15:50', '2026-03-01 21:15:50');
INSERT INTO `sys_config` VALUES (14, 'order.pay_deadline_minutes', '支付超时时间', '30', 'number', '订单配置', '下单后多少分钟未支付自动取消', '2026-03-01 21:15:50', '2026-03-01 21:15:50');
INSERT INTO `sys_config` VALUES (15, 'order.max_active_per_player', '打手最大接单数', '1', 'number', '订单配置', '打手同时进行中的订单上限', '2026-03-01 21:15:50', '2026-03-01 21:15:50');
INSERT INTO `sys_config` VALUES (19, 'site_name', '平台名称', '三角洲护航系统', 'text', '站点配置', '显示在登录页、协议等处的平台名称', '2026-03-03 16:50:14', '2026-03-03 16:50:14');
INSERT INTO `sys_config` VALUES (20, 'site_subtitle', '平台副标题', '专业游戏护航平台', 'text', '站点配置', '显示在登录页名称下方', '2026-03-03 16:50:14', '2026-03-03 16:50:14');
INSERT INTO `sys_config` VALUES (21, 'site_logo', '平台Logo', '', 'image', '站点配置', 'Logo 图片URL，为空则使用默认', '2026-03-03 16:50:14', '2026-03-03 16:55:29');
INSERT INTO `sys_config` VALUES (22, 'site_admin_title', '后台标题', '三角洲管理后台', 'text', '站点配置', 'PC管理后台侧栏和登录页显示的标题', '2026-03-03 16:50:14', '2026-03-03 16:50:14');
INSERT INTO `sys_config` VALUES (23, 'player.deposit_required', '打手入驻押金', 'true', 'boolean', '打手配置', '开启后打手申请入驻需支付押金，关闭后无需押金即可申请', '2026-03-11 14:06:14', '2026-03-11 14:06:14');

-- ----------------------------
-- Table structure for system_notification
-- ----------------------------
DROP TABLE IF EXISTS `system_notification`;
CREATE TABLE `system_notification`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `receiver_type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'USER/PLAYER/CS',
  `receiver_id` bigint NOT NULL DEFAULT 0 COMMENT '接收者ID，CS 时 0 表示全体客服',
  `title` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `content` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `biz_type` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '业务类型 ORDER_ASSIGNED/ORDER_PAID 等',
  `related_id` bigint NULL DEFAULT NULL,
  `is_read` tinyint NOT NULL DEFAULT 0,
  `created_at` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_receiver`(`receiver_type` ASC, `receiver_id` ASC) USING BTREE,
  INDEX `idx_receiver_unread`(`receiver_type` ASC, `receiver_id` ASC, `is_read` ASC) USING BTREE,
  INDEX `idx_created`(`created_at` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '系统通知' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of system_notification
-- ----------------------------
INSERT INTO `system_notification` VALUES (1, 'USER', 2, 'ORDER_PAID', '订单支付成功，等待打手接单', 'ORDER_PAID', 17, 0, '2026-03-10 22:46:54');
INSERT INTO `system_notification` VALUES (2, 'USER', 2, 'ORDER_PAID', '订单支付成功，等待打手接单', 'ORDER_PAID', 18, 0, '2026-03-10 22:48:16');
INSERT INTO `system_notification` VALUES (3, 'PLAYER', 3, '新指派订单', '您有一笔新的指派订单，请确认', 'ORDER', 17, 0, '2026-03-10 22:57:00');
INSERT INTO `system_notification` VALUES (4, 'USER', 2, 'ORDER_PAID', '订单支付成功，等待打手接单', 'ORDER_PAID', 19, 0, '2026-03-12 21:56:50');
INSERT INTO `system_notification` VALUES (5, 'PLAYER', 3, '新指派订单', '您有一笔新的指派订单，请确认', 'ORDER', 18, 0, '2026-03-12 21:57:00');
INSERT INTO `system_notification` VALUES (6, 'USER', 2, 'ORDER_ACCEPTED', '您的订单已被打手接单', 'ORDER_ACCEPTED', 19, 0, '2026-03-12 21:57:13');
INSERT INTO `system_notification` VALUES (7, 'USER', 2, 'ORDER_BACK_TO_HALL', '接单员已退出，您的订单已重新回到接单大厅等待新的接单员', 'ORDER_BACK_TO_HALL', 19, 0, '2026-03-12 21:57:21');
INSERT INTO `system_notification` VALUES (8, 'USER', 2, 'ORDER_ACCEPTED', '您的订单已被打手接单', 'ORDER_ACCEPTED', 19, 0, '2026-03-12 22:01:15');
INSERT INTO `system_notification` VALUES (9, 'PLAYER', 3, 'TEAMMATE_INVITED', '您收到一份组队邀请，请尽快确认', 'TEAMMATE_INVITED', 19, 0, '2026-03-12 22:01:31');
INSERT INTO `system_notification` VALUES (10, 'PLAYER', 3, 'TEAMMATE_REMOVED', '您已被主接单员从订单中移除', 'TEAMMATE_REMOVED', 19, 0, '2026-03-12 22:04:29');
INSERT INTO `system_notification` VALUES (11, 'USER', 2, 'ORDER_BACK_TO_HALL', '接单员已退出，您的订单已重新回到接单大厅等待新的接单员', 'ORDER_BACK_TO_HALL', 19, 0, '2026-03-12 22:04:32');

-- ----------------------------
-- Table structure for transaction
-- ----------------------------
DROP TABLE IF EXISTS `transaction`;
CREATE TABLE `transaction`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '交易ID',
  `type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '类型: INCOME/CONSUMPTION/REFUND/WITHDRAW/WITHDRAW_REJECT/RECHARGE',
  `user_type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '账户类型: USER/PLAYER',
  `user_id` bigint NOT NULL COMMENT '用户/打手ID',
  `amount` decimal(12, 2) NOT NULL COMMENT '交易金额(正-入账 负-出账)',
  `balance_before` decimal(12, 2) NOT NULL COMMENT '变动前余额',
  `balance_after` decimal(12, 2) NOT NULL COMMENT '变动后余额',
  `related_order_id` bigint NULL DEFAULT NULL COMMENT '关联订单ID',
  `related_payment_id` bigint NULL DEFAULT NULL COMMENT '关联支付记录ID',
  `related_withdraw_id` bigint NULL DEFAULT NULL COMMENT '关联提现记录ID',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注(如:主接分成/队友分成)',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_user`(`user_type` ASC, `user_id` ASC) USING BTREE,
  INDEX `idx_type`(`type` ASC) USING BTREE,
  INDEX `idx_related_order`(`related_order_id` ASC) USING BTREE,
  INDEX `idx_created_at`(`created_at` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 38 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '交易流水表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of transaction
-- ----------------------------
INSERT INTO `transaction` VALUES (1, 'CONSUMPTION', 'USER', 1, -9.99, 10000.00, 9990.01, 1, 2, NULL, '余额支付', '2026-03-01 17:42:42');
INSERT INTO `transaction` VALUES (2, 'CONSUMPTION', 'USER', 1, -10.00, 9990.01, 9980.01, 2, 4, NULL, '余额支付', '2026-03-01 19:52:37');
INSERT INTO `transaction` VALUES (3, 'CONSUMPTION', 'USER', 1, -10.00, 9980.01, 9970.01, 3, 5, NULL, '余额支付', '2026-03-01 19:56:24');
INSERT INTO `transaction` VALUES (4, 'CONSUMPTION', 'USER', 1, -10.00, 9970.01, 9960.01, 4, 6, NULL, '余额支付', '2026-03-01 19:57:08');
INSERT INTO `transaction` VALUES (5, 'CONSUMPTION', 'USER', 1, -9.99, 9960.01, 9950.02, 5, 7, NULL, '余额支付', '2026-03-01 20:05:35');
INSERT INTO `transaction` VALUES (6, 'REFUND', 'USER', 1, 9.99, 9950.02, 9960.01, 5, 7, NULL, '退款: 用户取消订单退款', '2026-03-01 20:05:40');
INSERT INTO `transaction` VALUES (7, 'INCOME', 'PLAYER', 1, 8.00, 0.00, 8.00, 2, NULL, NULL, '订单金额:¥10.00, 平台抽成:20%, 抽成金额:¥2.00, 实际收入:¥8.00', '2026-03-01 20:07:27');
INSERT INTO `transaction` VALUES (8, 'CONSUMPTION', 'USER', 1, -9.99, 9960.01, 9950.02, 6, 8, NULL, '余额支付', '2026-03-01 20:11:33');
INSERT INTO `transaction` VALUES (9, 'INCOME', 'PLAYER', 1, 7.99, 8.00, 15.99, 6, NULL, NULL, '订单金额:¥9.99, 平台抽成:20%, 抽成金额:¥2.00, 实际收入:¥7.99', '2026-03-01 20:28:26');
INSERT INTO `transaction` VALUES (10, 'WITHDRAW', 'PLAYER', 1, -15.99, 15.99, 0.00, NULL, NULL, 1, '提现申请', '2026-03-01 20:28:38');
INSERT INTO `transaction` VALUES (11, 'WITHDRAW_REJECT', 'PLAYER', 1, 15.99, 0.00, 15.99, NULL, NULL, 1, '提现被拒绝，资金退回: 没钱', '2026-03-01 20:36:54');
INSERT INTO `transaction` VALUES (12, 'WITHDRAW', 'PLAYER', 1, -15.99, 15.99, 0.00, NULL, NULL, 2, '提现申请', '2026-03-01 20:39:31');
INSERT INTO `transaction` VALUES (13, 'WITHDRAW_COMPLETE', 'PLAYER', 1, -15.99, 0.00, 0.00, NULL, NULL, 2, '提现完成', '2026-03-01 20:46:44');
INSERT INTO `transaction` VALUES (14, 'CONSUMPTION', 'USER', 1, -10.00, 9950.02, 9940.02, 7, 9, NULL, '余额支付', '2026-03-01 21:06:26');
INSERT INTO `transaction` VALUES (15, 'INCOME', 'PLAYER', 1, 8.00, 0.00, 8.00, 7, NULL, NULL, '订单金额:¥10.00, 平台抽成:20%, 抽成金额:¥2.00, 实际收入:¥8.00', '2026-03-01 21:09:42');
INSERT INTO `transaction` VALUES (16, 'CONSUMPTION', 'USER', 1, -9.99, 9940.02, 9930.03, 8, 10, NULL, '余额支付', '2026-03-01 21:48:11');
INSERT INTO `transaction` VALUES (17, 'INCOME', 'PLAYER', 1, 8.99, 8.00, 16.99, 8, NULL, NULL, '订单金额:¥9.99, 平台抽成:10%, 抽成金额:¥1.00, 实际收入:¥8.99', '2026-03-01 21:48:49');
INSERT INTO `transaction` VALUES (18, 'REFUND', 'USER', 1, 10.00, 9930.03, 9940.03, 7, 9, NULL, '退款: 仲裁全额退款: 警告', '2026-03-04 17:03:40');
INSERT INTO `transaction` VALUES (19, 'CONSUMPTION', 'USER', 1, -10.00, 9940.03, 9930.03, 9, 11, NULL, '余额支付', '2026-03-04 23:59:43');
INSERT INTO `transaction` VALUES (20, 'CONSUMPTION', 'USER', 1, -10.00, 9930.03, 9920.03, 10, 12, NULL, '余额支付', '2026-03-05 00:05:05');
INSERT INTO `transaction` VALUES (21, 'WITHDRAW', 'PLAYER', 1, -16.99, 16.99, 0.00, NULL, NULL, 3, '提现申请', '2026-03-05 00:07:01');
INSERT INTO `transaction` VALUES (22, 'CONSUMPTION', 'USER', 1, -9.99, 9920.03, 9910.04, 11, 13, NULL, '余额支付', '2026-03-05 00:11:02');
INSERT INTO `transaction` VALUES (23, 'CONSUMPTION', 'USER', 1, -9.99, 9910.04, 9900.05, 12, 14, NULL, '余额支付', '2026-03-05 00:12:20');
INSERT INTO `transaction` VALUES (24, 'REFUND', 'USER', 1, 10.00, 9900.05, 9910.05, 9, 11, NULL, '退款: 仲裁全额退款: 11', '2026-03-05 00:16:37');
INSERT INTO `transaction` VALUES (25, 'WITHDRAW_COMPLETE', 'PLAYER', 1, -16.99, 0.00, 0.00, NULL, NULL, 3, '提现完成', '2026-03-05 12:08:23');
INSERT INTO `transaction` VALUES (26, 'CONSUMPTION', 'USER', 2, -10.00, 10000.00, 9990.00, 13, 16, NULL, '余额支付', '2026-03-05 12:46:39');
INSERT INTO `transaction` VALUES (27, 'REFUND', 'USER', 2, 5.00, 9990.00, 9995.00, 13, 16, NULL, '退款: 仲裁部分退款: 已经处理', '2026-03-05 13:40:56');
INSERT INTO `transaction` VALUES (28, 'CONSUMPTION', 'USER', 2, -10.00, 9995.00, 9985.00, 14, 17, NULL, '余额支付', '2026-03-05 14:21:30');
INSERT INTO `transaction` VALUES (32, 'INCOME', 'PLAYER', 2, 9.00, 0.00, 9.00, 14, NULL, NULL, '订单金额:¥10.00, 抽成:10%, 抽成¥1.00, 打手总收入¥9.00, 队友分成后实得¥9.00', '2026-03-06 19:24:54');
INSERT INTO `transaction` VALUES (33, 'ADMIN_RECHARGE', 'USER', 4, 10000.00, 0.00, 10000.00, NULL, NULL, NULL, '管理员调整: 充值', '2026-03-06 19:37:53');
INSERT INTO `transaction` VALUES (34, 'INCOME', 'PLAYER', 2, 8.99, 9.00, 17.99, 11, NULL, NULL, '订单金额:¥9.99, 抽成:10%, 抽成¥1.00, 打手总收入¥8.99, 队友分成后实得¥8.99', '2026-03-07 16:10:00');
INSERT INTO `transaction` VALUES (35, 'CONSUMPTION', 'USER', 2, -9.99, 9985.00, 9975.01, 17, 20, NULL, '余额支付', '2026-03-10 22:46:53');
INSERT INTO `transaction` VALUES (36, 'CONSUMPTION', 'USER', 2, -10.00, 9975.01, 9965.01, 18, 21, NULL, '余额支付', '2026-03-10 22:48:16');
INSERT INTO `transaction` VALUES (37, 'CONSUMPTION', 'USER', 2, -9.99, 9965.01, 9955.02, 19, 22, NULL, '余额支付', '2026-03-12 21:56:50');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `openid` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '微信openid',
  `nickname` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '微信用户' COMMENT '昵称',
  `avatar` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '头像URL',
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '手机号',
  `status` tinyint NOT NULL DEFAULT 1 COMMENT '状态: 1-正常 0-封禁',
  `deleted` tinyint NOT NULL DEFAULT 0 COMMENT '逻辑删除: 0-未删除 1-已删除',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_openid`(`openid` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '用户表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'oNSQb62h87DFpGNnN5Sbxn5FY7kI', 'lly', 'http://localhost:8080/file/2026/03/01/63e7dc007e7d4b3aa50e6a87bb87c763.png', '17633632726', 1, 0, '2026-02-28 13:08:54', '2026-03-01 22:09:59');
INSERT INTO `user` VALUES (2, 'o839C3VE8erN2DX6AxxxDbHYedcw', '微信用户', 'http://localhost:8080/file/2026/03/07/191645619f29459b9313786abfe6823c.jpeg', '17633632726', 1, 0, '2026-03-05 12:04:04', '2026-03-07 16:09:49');
INSERT INTO `user` VALUES (4, '122222', '微信用户', '', '', 1, 0, '2026-03-05 13:01:46', '2026-03-05 13:01:46');

-- ----------------------------
-- Table structure for user_game_info
-- ----------------------------
DROP TABLE IF EXISTS `user_game_info`;
CREATE TABLE `user_game_info`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL COMMENT '用户ID',
  `category_id` bigint NULL DEFAULT NULL COMMENT '分类ID',
  `game_account` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `contact` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注',
  `saved_fields` json NULL COMMENT '动态表单字段JSON',
  `label` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '保存标签',
  `created_at` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_user_id`(`user_id` ASC) USING BTREE,
  INDEX `idx_user_category`(`user_id` ASC, `category_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '用户保存的游戏信息' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_game_info
-- ----------------------------
INSERT INTO `user_game_info` VALUES (1, 2, 3, NULL, NULL, NULL, '{\"备注\": \"32231231\", \"游戏名称\": \"11111\", \"联系方式\": \"3312321\"}', '3312321 / 32231231', '2026-03-12 21:56:46');

-- ----------------------------
-- Table structure for user_subscribe
-- ----------------------------
DROP TABLE IF EXISTS `user_subscribe`;
CREATE TABLE `user_subscribe`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `user_id` bigint NOT NULL COMMENT '用户ID',
  `template_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '消息模板ID',
  `status` tinyint NOT NULL DEFAULT 1 COMMENT '授权状态: 1-已授权 0-已取消',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_user_template`(`user_id` ASC, `template_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '用户订阅消息授权表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_subscribe
-- ----------------------------

-- ----------------------------
-- Table structure for wallet
-- ----------------------------
DROP TABLE IF EXISTS `wallet`;
CREATE TABLE `wallet`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '钱包ID',
  `user_id` bigint NOT NULL COMMENT '用户ID',
  `balance` decimal(12, 2) NOT NULL DEFAULT 0.00 COMMENT '可用余额',
  `frozen_amount` decimal(12, 2) NOT NULL DEFAULT 0.00 COMMENT '冻结金额',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_user_id`(`user_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '用户钱包表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of wallet
-- ----------------------------
INSERT INTO `wallet` VALUES (1, 1, 9910.05, 0.00, '2026-02-28 13:08:54', '2026-03-01 17:42:36');
INSERT INTO `wallet` VALUES (2, 2, 9955.02, 0.00, '2026-03-05 12:04:04', '2026-03-05 12:46:25');
INSERT INTO `wallet` VALUES (3, 4, 10000.00, 0.00, '2026-03-05 13:02:06', '2026-03-05 13:02:06');

-- ----------------------------
-- Table structure for withdraw
-- ----------------------------
DROP TABLE IF EXISTS `withdraw`;
CREATE TABLE `withdraw`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '提现ID',
  `player_id` bigint NOT NULL COMMENT '打手ID',
  `account_id` bigint NOT NULL COMMENT '提现账户ID',
  `amount` decimal(10, 2) NOT NULL COMMENT '提现金额',
  `status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'PENDING' COMMENT '状态: PENDING-待处理 COMPLETED-已完成 REJECTED-已拒绝',
  `pay_method` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '实际打款方式(管理员填写)',
  `proof_image` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '打款凭证图片URL',
  `reject_reason` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '拒绝原因',
  `processed_by` bigint NULL DEFAULT NULL COMMENT '处理人(管理员ID)',
  `processed_at` datetime NULL DEFAULT NULL COMMENT '处理时间',
  `last_notify_at` datetime NULL DEFAULT NULL COMMENT '上次提醒管理员时间(防重复提醒)',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_player_id`(`player_id` ASC) USING BTREE,
  INDEX `idx_status`(`status` ASC) USING BTREE,
  INDEX `idx_created_at`(`created_at` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '提现记录表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of withdraw
-- ----------------------------
INSERT INTO `withdraw` VALUES (1, 1, 1, 15.99, 'REJECTED', NULL, NULL, '没钱', 1, '2026-03-01 20:36:53', NULL, '2026-03-01 20:28:38', '2026-03-01 20:28:38');
INSERT INTO `withdraw` VALUES (2, 1, 1, 15.99, 'COMPLETED', '', 'http://localhost:8080/file/2026/03/01/c3d7470ecf14408a89759a9a8762a9f6.png', NULL, 1, '2026-03-01 20:44:14', NULL, '2026-03-01 20:39:31', '2026-03-01 20:39:31');
INSERT INTO `withdraw` VALUES (3, 1, 1, 16.99, 'COMPLETED', NULL, NULL, NULL, 2, '2026-03-05 12:08:23', NULL, '2026-03-05 00:07:01', '2026-03-05 00:07:01');

SET FOREIGN_KEY_CHECKS = 1;
