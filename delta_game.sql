-- MySQL dump 10.13  Distrib 8.0.24, for Linux (x86_64)
--
-- Host: localhost    Database: delta_game
-- ------------------------------------------------------
-- Server version	8.0.24

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '管理员ID',
  `username` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户名',
  `password` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '密码(BCrypt加密)',
  `nickname` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '昵称',
  `avatar` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '头像URL',
  `role` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '角色: ADMIN-管理员 CS-客服 BOTH-双重角色',
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '手机号',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态: 1-正常 0-禁用',
  `login_fail_count` int NOT NULL DEFAULT '0' COMMENT '连续登录失败次数',
  `lock_time` datetime DEFAULT NULL COMMENT '锁定截止时间(失败5次锁定30分钟)',
  `last_login_at` datetime DEFAULT NULL COMMENT '最后登录时间',
  `last_login_ip` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '最后登录IP',
  `deleted` tinyint NOT NULL DEFAULT '0' COMMENT '逻辑删除',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `uk_username` (`username`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='管理员/客服表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'admin','$2a$10$sr59LNu4Asts4rCD13pG9Op8wgir1PSAveeQHefhsgc0UeTH1Bpfm','超级管理员','','admin','',1,0,NULL,'2026-04-08 19:24:35','',0,'2026-02-27 11:25:20','2026-02-27 11:25:20'),(2,'kefu','$2a$10$qKBy2Vfnt4IC2ifHGFu.8uX4P3YTzDVQRhrl5xwE2ktWXXAp949WO','复燃电竞客服','https://furandianjing.cn/file/2026/03/26/a0d94ea1e2bb49ee933946c4a71792bf.jpg','cs','',1,0,NULL,'2026-04-08 23:49:00','',0,'2026-02-27 19:25:55','2026-04-07 19:33:23'),(3,'poo','$2a$10$Q9lFEUPhri0Xx.nKvPsYZuH9M4GV6no/NkqubQGQVz9KoLzJ.2L9.','总策划','','admin','',1,0,NULL,'2026-04-08 17:53:42','',0,'2026-03-10 20:31:59','2026-03-10 20:31:59');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `banner`
--

DROP TABLE IF EXISTS `banner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `banner` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '轮播图ID',
  `image_url` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '图片URL',
  `link_type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'NONE' COMMENT '跳转类型: PRODUCT/CATEGORY/URL/NONE',
  `link_value` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '跳转值(商品ID/分类ID/外链URL)',
  `sort_order` int NOT NULL DEFAULT '0' COMMENT '排序',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态: 1-启用 0-禁用',
  `start_time` datetime DEFAULT NULL COMMENT '生效开始时间',
  `end_time` datetime DEFAULT NULL COMMENT '生效结束时间',
  `deleted` tinyint NOT NULL DEFAULT '0' COMMENT '逻辑删除',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_status_time` (`status`,`start_time`,`end_time`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='轮播图表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banner`
--

LOCK TABLES `banner` WRITE;
/*!40000 ALTER TABLE `banner` DISABLE KEYS */;
INSERT INTO `banner` VALUES (1,'https://furandianjing.cn/file/2026/03/05/2554d8434f074a9daa409cde64170b8b.webp','NONE',NULL,0,1,NULL,NULL,1,'2026-03-01 15:30:19','2026-03-10 20:02:59'),(2,'https://furandianjing.cn/file/2026/03/05/694204886a654ad79b99fb23b4ebcec3.webp','NONE',NULL,0,1,NULL,NULL,1,'2026-03-01 15:30:25','2026-03-10 20:02:57'),(3,'https://furandianjing.cn/file/2026/03/06/7eba3e7e33834f33899b91db2d30adcd.jpg','NONE',NULL,0,1,NULL,NULL,0,'2026-03-06 21:36:23','2026-03-06 21:36:23'),(4,'https://furandianjing.cn/file/2026/03/10/f6567f4793ab43789f608278ac5e111e.jpg','NONE',NULL,0,1,NULL,NULL,0,'2026-03-10 20:02:54','2026-03-10 20:02:54'),(5,'https://furandianjing.cn/file/2026/03/10/2afc7f31ca584de9825bc660849d15a4.jpg','NONE',NULL,0,1,NULL,NULL,0,'2026-03-10 20:06:10','2026-03-10 20:06:10'),(6,'https://furandianjing.cn/file/2026/03/10/c91d775fec3b46a3b656c1904a90cdeb.jpg','NONE',NULL,0,1,NULL,NULL,0,'2026-03-10 20:06:33','2026-03-10 20:06:33'),(7,'https://furandianjing.cn/file/2026/03/10/0436807262d54f19b399df0fe96099b1.jpg','NONE',NULL,0,1,NULL,NULL,0,'2026-03-10 20:07:04','2026-03-10 20:07:04');
/*!40000 ALTER TABLE `banner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '分类ID',
  `name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '分类名称',
  `icon` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '分类图标URL',
  `sort_order` int NOT NULL DEFAULT '0' COMMENT '排序(数字越小越靠前)',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态: 1-启用 0-禁用',
  `parent_id` bigint NOT NULL DEFAULT '0' COMMENT '父分类ID(预留，当前均为0)',
  `deleted` tinyint NOT NULL DEFAULT '0' COMMENT '逻辑删除',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='商品分类表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'测试','',0,1,0,1,'2026-02-27 18:16:39','2026-03-01 16:04:36'),(2,'三角洲','https://furandianjing.cn/file/2026/03/05/a198efb4b05549d48a5b7c1591b729cb.png',0,1,0,0,'2026-03-01 15:29:02','2026-03-29 17:12:49'),(3,'无畏契约','https://furandianjing.cn/file/2026/03/18/5f08ee3f811e4d6ea8edc5111ba4797a.png',1,1,0,0,'2026-03-05 21:59:19','2026-04-02 13:14:32'),(4,'体验单','',0,1,2,0,'2026-03-06 19:50:28','2026-03-12 12:21:19'),(5,'瓦陪陪','',0,1,3,0,'2026-03-06 19:50:35','2026-03-17 20:51:53'),(6,'手机端护航单','',1,1,2,0,'2026-03-07 17:51:14','2026-03-13 02:46:53'),(7,'王者荣耀','https://furandianjing.cn/file/2026/03/12/a94f7f70456c4c468d01e12a65b738e0.jpg',2,1,0,0,'2026-03-12 12:20:42','2026-04-02 13:14:32'),(8,'和平精英','https://furandianjing.cn/file/2026/03/12/ea4512c421284072a6780bf3abd221cd.jpg',3,1,0,0,'2026-03-12 12:22:38','2026-04-02 13:14:32'),(9,'开局一把刀','',4,1,2,0,'2026-03-13 01:17:59','2026-03-13 03:04:13'),(10,'洲陪陪','',3,1,2,0,'2026-03-13 01:18:15','2026-03-18 15:50:01'),(11,'赌神单','',5,1,2,0,'2026-03-13 01:18:37','2026-03-13 03:04:16'),(12,'差价劵','https://furandianjing.cn/file/2026/03/13/eb45cd42a4df402a806cef5978f368e1.png',4,0,0,0,'2026-03-13 01:19:03','2026-04-02 13:14:32'),(13,'特色玩法','',6,1,2,0,'2026-03-13 01:19:52','2026-03-13 03:04:21'),(14,'摘星计划','',0,1,7,0,'2026-03-13 01:20:28','2026-03-13 01:20:28'),(15,'陪陪','',0,1,7,0,'2026-03-13 01:20:38','2026-03-13 01:20:38'),(16,'地铁逃生','',0,1,8,0,'2026-03-13 01:21:19','2026-03-13 01:21:19'),(17,'守护榜','https://furandianjing.cn/file/2026/03/13/2b0eef8e28074948b2bca43f489a3d8a.png',6,1,0,0,'2026-03-13 01:21:39','2026-04-02 13:14:32'),(18,'周边礼品','https://furandianjing.cn/file/2026/03/13/68d0585064dc44a1a9851e4a7d2787ee.jpg',7,0,0,0,'2026-03-13 01:22:01','2026-04-02 13:14:32'),(19,'PC端护航单','',2,1,2,0,'2026-03-13 02:47:41','2026-03-13 02:47:41'),(20,'云顶之弈','',5,0,0,0,'2026-03-19 18:39:28','2026-04-02 13:14:32'),(21,'差补劵','https://furandianjing.cn/file/2026/03/27/d38fcee9554249868ffa3ce1a2b0293e.png',5,1,0,0,'2026-03-27 15:26:36','2026-04-02 13:14:32'),(22,'差补劵','',0,1,21,0,'2026-03-27 15:41:16','2026-03-27 16:06:02'),(23,'香香鸡爪榜','',0,1,17,0,'2026-03-27 15:41:31','2026-03-27 15:41:31'),(24,'饱饱鸡腿榜','',1,1,17,0,'2026-03-27 15:41:55','2026-03-27 15:42:20'),(25,'浪漫玫瑰榜','',2,1,17,0,'2026-03-27 15:42:09','2026-03-27 15:42:09');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_form_field`
--

DROP TABLE IF EXISTS `category_form_field`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_form_field` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `category_id` bigint NOT NULL COMMENT '父分类ID',
  `field_key` varchar(64) COLLATE utf8mb4_general_ci NOT NULL COMMENT '字段键名(英文,存储用)',
  `field_label` varchar(64) COLLATE utf8mb4_general_ci NOT NULL COMMENT '字段显示名(中文)',
  `field_type` varchar(20) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'TEXT' COMMENT '字段类型: TEXT/SELECT/TEXTAREA',
  `options` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'SELECT类型的选项,逗号分隔,如: 选项1,选项2,选项3',
  `placeholder` varchar(128) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '输入提示',
  `required` tinyint NOT NULL DEFAULT '1' COMMENT '是否必填: 1-是 0-否',
  `sort_order` int NOT NULL DEFAULT '0' COMMENT '排序(越小越靠前)',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `idx_category_id` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='分类动态表单字段';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_form_field`
--

LOCK TABLES `category_form_field` WRITE;
/*!40000 ALTER TABLE `category_form_field` DISABLE KEYS */;
INSERT INTO `category_form_field` VALUES (1,2,'key1','数字编码','TEXT','','请输入数字编码ID',1,1,'2026-03-10 23:04:57'),(3,2,'key3','备注','TEXT','','请输入备注',0,3,'2026-03-10 23:06:03'),(4,3,'key1','游戏大区','TEXTAREA','','Q区,V区',1,1,'2026-03-10 23:06:27'),(5,3,'key2','备注','TEXT','','备注',0,2,'2026-03-10 23:06:38'),(10,2,'youxiid','游戏ID','TEXT','','为了保证你的数字编码无误，请填写游戏名字',1,0,'2026-03-18 14:48:51'),(11,2,'youxidating','游戏大区','TEXTAREA','','Q区,V区',1,2,'2026-03-18 14:50:30'),(12,3,'youxiID','游戏ID','TEXT','','请输入xxx#12345',1,0,'2026-03-18 14:59:29');
/*!40000 ALTER TABLE `category_form_field` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_message`
--

DROP TABLE IF EXISTS `chat_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_message` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '消息ID',
  `conversation_id` bigint DEFAULT NULL,
  `session_id` bigint NOT NULL COMMENT '会话ID',
  `sender_type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '发送者类型: USER/PLAYER/CS/SYSTEM',
  `sender_id` bigint DEFAULT NULL COMMENT '发送者ID(SYSTEM时为空)',
  `type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'TEXT' COMMENT '消息类型: TEXT/IMAGE/SYSTEM',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '消息内容(文本 或 图片URL)',
  `is_read` tinyint NOT NULL DEFAULT '0' COMMENT '是否已读: 1-已读 0-未读',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_session_created` (`session_id`,`created_at`) USING BTREE,
  KEY `idx_created_at` (`created_at`) USING BTREE,
  KEY `idx_conv_time` (`conversation_id`,`created_at`) USING BTREE,
  KEY `idx_conv_id` (`conversation_id`,`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4934 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='聊天消息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_message`
--

LOCK TABLES `chat_message` WRITE;
/*!40000 ALTER TABLE `chat_message` DISABLE KEYS */;
/*!40000 ALTER TABLE `chat_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_session`
--

DROP TABLE IF EXISTS `chat_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_session` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id1` bigint NOT NULL COMMENT '参与者1编码ID(较小)',
  `id2` bigint NOT NULL COMMENT '参与者2编码ID(较大)',
  `status` varchar(20) DEFAULT 'ACTIVE',
  `last_message_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_id1_id2` (`id1`,`id2`),
  KEY `idx_id1` (`id1`),
  KEY `idx_id2` (`id2`)
) ENGINE=InnoDB AUTO_INCREMENT=712 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='私聊会话(id1<id2)';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_session`
--

LOCK TABLES `chat_session` WRITE;
/*!40000 ALTER TABLE `chat_session` DISABLE KEYS */;
/*!40000 ALTER TABLE `chat_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `complaint`
--

DROP TABLE IF EXISTS `complaint`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `complaint` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '投诉ID',
  `order_id` bigint NOT NULL COMMENT '订单ID',
  `user_id` bigint NOT NULL COMMENT '投诉用户ID',
  `player_id` bigint NOT NULL COMMENT '被投诉打手ID(主接打手)',
  `type` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '投诉类型: SERVICE_QUALITY/TIMEOUT/ACCOUNT_ISSUE/FRAUD/OTHER',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '投诉内容',
  `images` varchar(4096) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '证据图片URL，多个以逗号分隔',
  `expected_result` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '期望结果: FULL_REFUND/PARTIAL_REFUND/REDO',
  `status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'PENDING' COMMENT '状态: PENDING/PROCESSING/RESOLVED/APPEALED',
  `result` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '仲裁结果: FULL_REFUND/PARTIAL_REFUND/REJECT/REDO',
  `refund_amount` decimal(10,2) DEFAULT NULL COMMENT '裁定退款金额(部分退款时)',
  `result_reason` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '仲裁理由',
  `player_penalty` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '打手处罚: WARNING/DEDUCT_RATING/FREEZE/NONE',
  `operator_id` bigint DEFAULT NULL COMMENT '处理客服ID',
  `resolved_at` datetime DEFAULT NULL COMMENT '仲裁时间',
  `appeal_reason` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '申诉理由',
  `appeal_images` varchar(4096) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '申诉证据图片，多个以逗号分隔',
  `appeal_result` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '终审结果',
  `appeal_operator_id` bigint DEFAULT NULL COMMENT '终审处理人(管理员ID)',
  `appeal_resolved_at` datetime DEFAULT NULL COMMENT '终审时间',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `cs_read_at` datetime DEFAULT NULL COMMENT '客服查看时间（未读红点）',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `uk_order_id` (`order_id`) USING BTREE,
  KEY `idx_user_id` (`user_id`) USING BTREE,
  KEY `idx_player_id` (`player_id`) USING BTREE,
  KEY `idx_status` (`status`) USING BTREE,
  KEY `idx_created_at` (`created_at`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='投诉表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `complaint`
--

LOCK TABLES `complaint` WRITE;
/*!40000 ALTER TABLE `complaint` DISABLE KEYS */;
/*!40000 ALTER TABLE `complaint` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `content_config`
--

DROP TABLE IF EXISTS `content_config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `content_config` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `config_key` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '配置键(如:about_us/faq/guide)',
  `config_value` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '配置值(富文本/JSON)',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '备注说明',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `uk_config_key` (`config_key`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='内容配置表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `content_config`
--

LOCK TABLES `content_config` WRITE;
/*!40000 ALTER TABLE `content_config` DISABLE KEYS */;
/*!40000 ALTER TABLE `content_config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notice`
--

DROP TABLE IF EXISTS `notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notice` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '公告ID',
  `title` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '公告标题',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '公告内容',
  `type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'SYSTEM' COMMENT '类型: SYSTEM-系统公告 ACTIVITY-活动公告',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态: 1-启用 0-禁用',
  `sort_order` int NOT NULL DEFAULT '0' COMMENT '排序',
  `popup_display` tinyint NOT NULL DEFAULT '0' COMMENT '是否首页弹窗展示: 1-是 0-否',
  `deleted` tinyint NOT NULL DEFAULT '0' COMMENT '逻辑删除',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_status` (`status`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='公告表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notice`
--

LOCK TABLES `notice` WRITE;
/*!40000 ALTER TABLE `notice` DISABLE KEYS */;
INSERT INTO `notice` VALUES (1,'客服在线时间早上9:00--晚上12:00','<br>','system',1,0,0,0,'2026-03-01 15:30:51','2026-03-01 15:30:51'),(2,'测试公告','<ol><li>测试公告</li><li>测试XXX</li></ol>','system',1,0,0,1,'2026-03-03 12:53:36','2026-03-13 01:24:50'),(3,'维护，版本更新','系统维护，版本更新！，暂时无法使用请谅解','system',1,0,1,1,'2026-03-29 10:20:29','2026-03-29 17:16:15'),(4,'维护升级','4月2日早9:00-13:00维护升级，此时间段无法使用，请谅解','system',1,0,1,0,'2026-04-01 22:32:10','2026-04-01 22:32:10');
/*!40000 ALTER TABLE `notice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `operation_log`
--

DROP TABLE IF EXISTS `operation_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `operation_log` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '日志ID',
  `module` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '操作模块',
  `operation` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '操作类型(LOGIN/CREATE/UPDATE/DELETE等)',
  `operator_type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '操作者类型: ADMIN/CS',
  `operator_id` bigint NOT NULL COMMENT '操作者ID',
  `operator_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '操作者名称',
  `target_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '操作对象类型(如:ORDER/PLAYER/USER)',
  `target_id` bigint DEFAULT NULL COMMENT '操作对象ID',
  `detail` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '操作详情',
  `ip` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '操作IP',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_operator` (`operator_type`,`operator_id`) USING BTREE,
  KEY `idx_module` (`module`) USING BTREE,
  KEY `idx_created_at` (`created_at`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=820 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='操作日志表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `operation_log`
--

LOCK TABLES `operation_log` WRITE;
/*!40000 ALTER TABLE `operation_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `operation_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '订单ID',
  `order_no` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '订单号(雪花算法生成)',
  `user_id` bigint NOT NULL COMMENT '下单用户ID',
  `product_id` bigint NOT NULL COMMENT '商品ID',
  `product_name` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '商品名称(下单快照)',
  `spec_info` json DEFAULT NULL COMMENT '规格快照JSON',
  `amount` decimal(10,2) NOT NULL COMMENT '订单金额',
  `commission_rate` decimal(5,4) DEFAULT NULL COMMENT '下单时快照的抽佣比例(0~1)',
  `game_account` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '游戏账号',
  `contact` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '联系方式',
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '用户备注',
  `extra_fields` json DEFAULT NULL COMMENT '动态表单字段JSON',
  `required_player_count` tinyint NOT NULL DEFAULT '1' COMMENT '需要打手数量(下单快照)',
  `designated_player_id` bigint DEFAULT NULL COMMENT '用户指定打手ID(可为空)',
  `player_id` bigint DEFAULT NULL COMMENT '主接打手ID',
  `status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'PENDING_PAYMENT' COMMENT '订单状态',
  `pay_deadline` datetime DEFAULT NULL COMMENT '支付截止时间(创建时间+30min)',
  `assign_time` datetime DEFAULT NULL COMMENT '指派时间',
  `accept_time` datetime DEFAULT NULL COMMENT '接单时间',
  `teammate_deadline` datetime DEFAULT NULL COMMENT '组队截止时间(仅多人订单)',
  `start_time` datetime DEFAULT NULL COMMENT '服务开始时间',
  `complete_time` datetime DEFAULT NULL COMMENT '服务完成时间',
  `confirm_time` datetime DEFAULT NULL COMMENT '确认完成时间',
  `auto_confirm_deadline` datetime DEFAULT NULL COMMENT '自动确认截止时间(完成+24h)',
  `settled` tinyint NOT NULL DEFAULT '0' COMMENT '是否已结算: 1-是 0-否',
  `settle_amount` decimal(10,2) DEFAULT NULL COMMENT '打手总结算金额(扣除平台抽成)',
  `settle_time` datetime DEFAULT NULL COMMENT '结算时间',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `uk_order_no` (`order_no`) USING BTREE,
  KEY `idx_user_id_status` (`user_id`,`status`) USING BTREE,
  KEY `idx_player_id_status` (`player_id`,`status`) USING BTREE,
  KEY `idx_status` (`status`) USING BTREE,
  KEY `idx_status_pay_deadline` (`status`,`pay_deadline`) USING BTREE,
  KEY `idx_status_auto_confirm` (`status`,`auto_confirm_deadline`) USING BTREE,
  KEY `idx_status_teammate_deadline` (`status`,`teammate_deadline`) USING BTREE,
  KEY `idx_created_at` (`created_at`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=630 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='订单表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_player`
--

DROP TABLE IF EXISTS `order_player`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_player` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `order_id` bigint NOT NULL COMMENT '订单ID',
  `player_id` bigint NOT NULL COMMENT '打手ID',
  `role` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '角色: PRIMARY-主接 TEAMMATE-队友',
  `status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'ACCEPTED' COMMENT '状态: INVITED/ACCEPTED/REJECTED/EXPIRED/RELEASED',
  `split_type` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '分成方式: FIFTY_FIFTY/FORTY_SIXTY/THIRTY_SEVENTY/CUSTOM',
  `split_ratio` decimal(5,2) DEFAULT NULL COMMENT '分成比例(%，如50.00表示50%)',
  `split_amount` decimal(10,2) DEFAULT NULL COMMENT '自定义金额(仅CUSTOM时有值)',
  `invited_by` bigint DEFAULT NULL COMMENT '邀请人ID(队友记录时为主接打手ID)',
  `invited_at` datetime DEFAULT NULL COMMENT '邀请时间',
  `invite_deadline` datetime DEFAULT NULL COMMENT '邀请响应截止时间',
  `accepted_at` datetime DEFAULT NULL COMMENT '接受时间',
  `rejected_at` datetime DEFAULT NULL COMMENT '拒绝时间',
  `settle_amount` decimal(10,2) DEFAULT NULL COMMENT '个人结算金额',
  `settled_at` datetime DEFAULT NULL COMMENT '结算时间',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_order_id` (`order_id`) USING BTREE,
  KEY `idx_player_id` (`player_id`) USING BTREE,
  KEY `idx_status_role` (`status`,`role`) USING BTREE,
  KEY `idx_invite_deadline` (`status`,`invite_deadline`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=974 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='订单参与打手表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_player`
--

LOCK TABLES `order_player` WRITE;
/*!40000 ALTER TABLE `order_player` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_player` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_progress`
--

DROP TABLE IF EXISTS `order_progress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_progress` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `order_id` bigint NOT NULL COMMENT '订单ID',
  `type` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '类型: STATUS_CHANGE/PROGRESS_UPDATE/TEAMMATE_INVITED/TEAMMATE_ACCEPTED/TEAMMATE_REJECTED/DISPUTE_CREATED/COMPLETED',
  `operator_type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '操作者类型: USER/PLAYER/CS/ADMIN/SYSTEM',
  `operator_id` bigint DEFAULT NULL COMMENT '操作者ID(SYSTEM时为空)',
  `from_status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '变更前状态',
  `to_status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '变更后状态',
  `content` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '进度说明文字',
  `images` varchar(4096) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '截图URL，多个以逗号分隔',
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '备注',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_order_id` (`order_id`) USING BTREE,
  KEY `idx_created_at` (`created_at`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5348 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='订单进度记录表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_progress`
--

LOCK TABLES `order_progress` WRITE;
/*!40000 ALTER TABLE `order_progress` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_progress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_relay_request`
--

DROP TABLE IF EXISTS `order_relay_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_relay_request` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `order_id` bigint NOT NULL,
  `original_player_id` bigint NOT NULL,
  `split_type` varchar(32) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `split_amount` decimal(10,2) DEFAULT NULL,
  `reason` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` varchar(32) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'PENDING',
  `new_player_id` bigint DEFAULT NULL,
  `reviewed_by` bigint DEFAULT NULL,
  `reviewed_at` datetime DEFAULT NULL,
  `reject_reason` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_order_id` (`order_id`),
  KEY `idx_status` (`status`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='订单接力申请';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_relay_request`
--

LOCK TABLES `order_relay_request` WRITE;
/*!40000 ALTER TABLE `order_relay_request` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_relay_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '支付ID',
  `payment_no` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '支付单号',
  `order_id` bigint DEFAULT NULL COMMENT '订单ID(押金支付时为空)',
  `user_id` bigint NOT NULL COMMENT '支付用户ID',
  `biz_type` varchar(20) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'ORDER' COMMENT '业务类型: ORDER-订单支付 PLAYER_DEPOSIT-打手押金',
  `amount` decimal(10,2) NOT NULL COMMENT '支付金额',
  `pay_method` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '支付方式: WECHAT-微信 BALANCE-余额',
  `status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'PAYING' COMMENT '状态: PAYING/PAID/FAILED/REFUNDING/REFUNDED',
  `wx_transaction_id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '微信支付交易号',
  `wx_prepay_id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '微信预支付ID',
  `refund_amount` decimal(10,2) DEFAULT NULL COMMENT '退款金额',
  `refund_no` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '退款单号',
  `refund_reason` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '退款原因',
  `refund_time` datetime DEFAULT NULL COMMENT '退款完成时间',
  `paid_at` datetime DEFAULT NULL COMMENT '支付成功时间',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `uk_payment_no` (`payment_no`) USING BTREE,
  KEY `idx_order_id` (`order_id`) USING BTREE,
  KEY `idx_user_id` (`user_id`) USING BTREE,
  KEY `idx_status` (`status`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=615 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='支付记录表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player`
--

DROP TABLE IF EXISTS `player`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `player` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '打手ID',
  `openid` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '微信openid',
  `nickname` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '昵称',
  `avatar` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '头像URL',
  `real_name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '真实姓名',
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '联系方式',
  `skill_tags` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `game_level` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '游戏段位/等级',
  `proof_images` varchar(4096) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '技能证明截图，多个以逗号分隔',
  `service_types` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `avg_rating` decimal(3,2) NOT NULL DEFAULT '5.00' COMMENT '平均评分(1.00~5.00)',
  `order_count` int NOT NULL DEFAULT '0' COMMENT '累计接单数',
  `complete_rate` decimal(5,2) NOT NULL DEFAULT '100.00' COMMENT '完成率(%)',
  `status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'PENDING' COMMENT '状态: PENDING-待审核 ACTIVE-正常 REJECTED-已驳回 FROZEN-已冻结',
  `frozen_until` datetime DEFAULT NULL COMMENT '冻结截止时间',
  `reject_reason` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '驳回原因',
  `deposit_payment_no` varchar(64) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '打手入驻押金支付单号(100元)',
  `last_online_at` datetime DEFAULT NULL COMMENT '最后在线时间',
  `is_online` tinyint NOT NULL DEFAULT '0' COMMENT '是否在线: 0-离线 1-在线',
  `deleted` tinyint NOT NULL DEFAULT '0' COMMENT '逻辑删除',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `uk_openid` (`openid`) USING BTREE,
  KEY `idx_status` (`status`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=369 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='打手表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player`
--

LOCK TABLES `player` WRITE;
/*!40000 ALTER TABLE `player` DISABLE KEYS */;
/*!40000 ALTER TABLE `player` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player_account`
--

DROP TABLE IF EXISTS `player_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `player_account` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '账户ID',
  `player_id` bigint NOT NULL COMMENT '打手ID',
  `type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '账户类型: WECHAT-微信 ALIPAY-支付宝',
  `account_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '真实姓名',
  `account_no` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '账号',
  `qrcode_url` varchar(512) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '收款码图片URL（支付宝/微信）',
  `is_default` tinyint NOT NULL DEFAULT '0' COMMENT '是否默认: 1-是 0-否',
  `deleted` tinyint NOT NULL DEFAULT '0' COMMENT '逻辑删除',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_player_id` (`player_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='打手提现账户表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player_account`
--

LOCK TABLES `player_account` WRITE;
/*!40000 ALTER TABLE `player_account` DISABLE KEYS */;
/*!40000 ALTER TABLE `player_account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player_replace_request`
--

DROP TABLE IF EXISTS `player_replace_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `player_replace_request` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `order_id` bigint NOT NULL COMMENT '订单ID',
  `user_id` bigint NOT NULL COMMENT '申请用户ID',
  `old_player_id` bigint DEFAULT NULL COMMENT '被换打手ID',
  `reason` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '换人原因',
  `status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'PENDING' COMMENT 'PENDING/APPROVED/REJECTED',
  `operator_id` bigint DEFAULT NULL COMMENT '处理客服ID',
  `operator_remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '客服备注',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `processed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_order_id` (`order_id`) USING BTREE,
  KEY `idx_status` (`status`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='换人申请';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player_replace_request`
--

LOCK TABLES `player_replace_request` WRITE;
/*!40000 ALTER TABLE `player_replace_request` DISABLE KEYS */;
/*!40000 ALTER TABLE `player_replace_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player_wallet`
--

DROP TABLE IF EXISTS `player_wallet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `player_wallet` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '钱包ID',
  `player_id` bigint NOT NULL COMMENT '打手ID',
  `balance` decimal(12,2) NOT NULL DEFAULT '0.00' COMMENT '可用余额',
  `frozen_amount` decimal(12,2) NOT NULL DEFAULT '0.00' COMMENT '冻结金额(提现审核中)',
  `total_income` decimal(12,2) NOT NULL DEFAULT '0.00' COMMENT '累计收入',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `uk_player_id` (`player_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='打手钱包表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player_wallet`
--

LOCK TABLES `player_wallet` WRITE;
/*!40000 ALTER TABLE `player_wallet` DISABLE KEYS */;
/*!40000 ALTER TABLE `player_wallet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `price_rule`
--

DROP TABLE IF EXISTS `price_rule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `price_rule` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '规则ID',
  `product_id` bigint NOT NULL COMMENT '商品ID',
  `spec_combination` json NOT NULL COMMENT '规格组合(如:{"当前段位":"青铜","目标段位":"白银"})',
  `price` decimal(10,2) NOT NULL COMMENT '售价',
  `original_price` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '原价(划线价)',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_product_id` (`product_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='价格规则表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `price_rule`
--

LOCK TABLES `price_rule` WRITE;
/*!40000 ALTER TABLE `price_rule` DISABLE KEYS */;
/*!40000 ALTER TABLE `price_rule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '商品ID',
  `category_id` bigint NOT NULL COMMENT '所属分类ID',
  `name` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '商品名称',
  `subtitle` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '商品副标题',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '商品描述',
  `cover_image` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '封面图URL',
  `images` varchar(4096) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '详情图URL，多个以逗号分隔',
  `required_player_count` tinyint NOT NULL DEFAULT '1' COMMENT '需要打手数量(1-单人 2-双人组队)',
  `status` tinyint NOT NULL DEFAULT '0' COMMENT '状态: 1-上架 0-下架',
  `sort_order` int NOT NULL DEFAULT '0' COMMENT '排序',
  `sales_count` int NOT NULL DEFAULT '0' COMMENT '销量',
  `avg_rating` decimal(3,2) NOT NULL DEFAULT '5.00' COMMENT '平均评分',
  `commission_rate` decimal(5,4) DEFAULT NULL COMMENT '商品级抽佣比例(0~1),为NULL则使用系统默认',
  `review_count` int NOT NULL DEFAULT '0' COMMENT '评价数',
  `is_recommend` tinyint NOT NULL DEFAULT '0' COMMENT '是否推荐: 1-是 0-否',
  `recommend_category_id` bigint DEFAULT NULL COMMENT '所属热门推荐分类',
  `deleted` tinyint NOT NULL DEFAULT '0' COMMENT '逻辑删除',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `price` decimal(10,2) DEFAULT NULL COMMENT '商品价格',
  `per_user_limit_enabled` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否开启每人限购（0关 1开）',
  `per_user_limit_count` int DEFAULT NULL COMMENT '每个用户最多可购买次数',
  `per_user_limit_type` tinyint NOT NULL DEFAULT '0' COMMENT '每人限购类型: 0-不限购 1-永久限购一次 2-7天限购一次 3-1个月限购一次',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_category_status` (`category_id`,`status`) USING BTREE,
  KEY `idx_status_sort` (`status`,`sort_order`) USING BTREE,
  KEY `idx_status_sales` (`status`,`sales_count`) USING BTREE,
  KEY `idx_product_recommend_category` (`recommend_category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=150 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='商品表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (78,5,'测试','','','https://furandianjing.cn/file/2026/03/29/c0c712c79d9c461791d53136cc5ebf6b.jpg','https://furandianjing.cn/file/2026/03/29/2b6969d3785544148b1b354f89ea3dd6.png',1,0,0,6,5.00,NULL,0,0,NULL,0,'2026-03-19 21:46:19','2026-04-07 19:33:53',0.01,1,1,2);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_spec`
--

DROP TABLE IF EXISTS `product_spec`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_spec` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '规格ID',
  `product_id` bigint NOT NULL COMMENT '商品ID',
  `spec_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '规格名称(如:当前段位、目标段位)',
  `spec_values` json NOT NULL COMMENT '可选值列表(如:["青铜","白银","黄金"])',
  `sort_order` int NOT NULL DEFAULT '0' COMMENT '排序',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_product_id` (`product_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='商品规格表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_spec`
--

LOCK TABLES `product_spec` WRITE;
/*!40000 ALTER TABLE `product_spec` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_spec` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quick_reply`
--

DROP TABLE IF EXISTS `quick_reply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quick_reply` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `category` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '分类: ORDER-订单 COMPLAINT-投诉 GENERAL-通用',
  `content` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '回复内容',
  `sort_order` int NOT NULL DEFAULT '0' COMMENT '排序',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态: 1-启用 0-禁用',
  `deleted` tinyint NOT NULL DEFAULT '0' COMMENT '逻辑删除',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_category` (`category`,`status`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='快捷回复表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quick_reply`
--

LOCK TABLES `quick_reply` WRITE;
/*!40000 ALTER TABLE `quick_reply` DISABLE KEYS */;
INSERT INTO `quick_reply` VALUES (1,'问候','你今天好吗',0,1,1,'2026-03-03 19:56:54','2026-03-15 13:01:02'),(2,'问候','老板您好请问有什么能帮到你的嘛',1,1,0,'2026-03-15 13:01:49','2026-03-15 13:01:49'),(3,'炸单加保底金额','机密炸单:保底+20万\n绝密炸单:保底+50万\n潮汐监狱炸单:保底+70万\n注:保险箱价值>100万时，不计为炸单，但也不计入保底。',0,1,0,'2026-04-06 20:33:37','2026-04-06 20:33:37'),(4,'物资配备','机密护航:需为老板准备金色背包(若老板自备则无需)。\n绝密护航:需为老板准备红色背包(若老板自备则无需)。',0,1,0,'2026-04-06 20:41:25','2026-04-06 20:41:25'),(5,'换人','连续炸单6把可以申请换打手的哦',0,1,0,'2026-04-06 20:44:47','2026-04-06 20:44:47'),(6,'卡保底','保底金额大于50万不视为卡保底哦亲亲',0,1,0,'2026-04-06 20:45:30','2026-04-06 20:45:30');
/*!40000 ALTER TABLE `quick_reply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recommend_category`
--

DROP TABLE IF EXISTS `recommend_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recommend_category` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(32) COLLATE utf8mb4_general_ci NOT NULL COMMENT '编码',
  `name` varchar(64) COLLATE utf8mb4_general_ci NOT NULL COMMENT '展示名称',
  `sort_order` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='热门推荐分类';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recommend_category`
--

LOCK TABLES `recommend_category` WRITE;
/*!40000 ALTER TABLE `recommend_category` DISABLE KEYS */;
INSERT INTO `recommend_category` VALUES (1,'HOT','体验单',10),(2,'ESCORT','每周特惠',20),(3,'SWAKIH','开局一把刀',40),(4,'GOGS','赌神单',50),(5,'UG','特色玩法',60),(6,'NG','全新玩法',30),(7,'EO','护航单',35);
/*!40000 ALTER TABLE `recommend_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '评价ID',
  `order_id` bigint NOT NULL COMMENT '订单ID',
  `user_id` bigint NOT NULL COMMENT '评价用户ID',
  `player_id` bigint NOT NULL COMMENT '被评价打手ID(主接打手)',
  `product_id` bigint NOT NULL COMMENT '商品ID(便于按商品查评价)',
  `rating` tinyint NOT NULL COMMENT '星级评分(1-5)',
  `content` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '评价文字(最多200字)',
  `images` varchar(4096) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '评价图片URL，多个以逗号分隔',
  `deleted` tinyint NOT NULL DEFAULT '0' COMMENT '逻辑删除(管理员可删违规评价)',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `uk_order_id` (`order_id`) USING BTREE,
  KEY `idx_player_id` (`player_id`) USING BTREE,
  KEY `idx_product_id` (`product_id`) USING BTREE,
  KEY `idx_created_at` (`created_at`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='评价表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sensitive_word`
--

DROP TABLE IF EXISTS `sensitive_word`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sensitive_word` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `word` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '敏感词',
  `category` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '分类: DIRTY/AD/POLITICAL/OTHER',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态: 1-启用 0-禁用',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_status` (`status`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='敏感词表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sensitive_word`
--

LOCK TABLES `sensitive_word` WRITE;
/*!40000 ALTER TABLE `sensitive_word` DISABLE KEYS */;
/*!40000 ALTER TABLE `sensitive_word` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `statistics_daily`
--

DROP TABLE IF EXISTS `statistics_daily`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `statistics_daily` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `stat_date` date NOT NULL COMMENT '统计日期',
  `new_user_count` int NOT NULL DEFAULT '0' COMMENT '新增用户数',
  `active_user_count` int NOT NULL DEFAULT '0' COMMENT '活跃用户数',
  `new_order_count` int NOT NULL DEFAULT '0' COMMENT '新增订单数',
  `completed_order_count` int NOT NULL DEFAULT '0' COMMENT '完成订单数',
  `cancelled_order_count` int NOT NULL DEFAULT '0' COMMENT '取消订单数',
  `total_amount` decimal(12,2) NOT NULL DEFAULT '0.00' COMMENT '成交总额',
  `platform_income` decimal(12,2) NOT NULL DEFAULT '0.00' COMMENT '平台收入',
  `player_income` decimal(12,2) NOT NULL DEFAULT '0.00' COMMENT '打手总收入',
  `new_player_count` int NOT NULL DEFAULT '0' COMMENT '新增打手数',
  `active_player_count` int NOT NULL DEFAULT '0' COMMENT '活跃打手数',
  `new_complaint_count` int NOT NULL DEFAULT '0' COMMENT '新增投诉数',
  `avg_order_amount` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '平均客单价',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `uk_stat_date` (`stat_date`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='每日统计快照表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `statistics_daily`
--

LOCK TABLES `statistics_daily` WRITE;
/*!40000 ALTER TABLE `statistics_daily` DISABLE KEYS */;
/*!40000 ALTER TABLE `statistics_daily` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscribe_message_log`
--

DROP TABLE IF EXISTS `subscribe_message_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subscribe_message_log` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `user_type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '接收者类型: USER/PLAYER',
  `user_id` bigint NOT NULL COMMENT '接收者ID',
  `template_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '消息模板ID',
  `data` json NOT NULL COMMENT '发送数据JSON',
  `status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '发送状态: SUCCESS/FAIL',
  `error_msg` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '失败原因',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_user` (`user_type`,`user_id`) USING BTREE,
  KEY `idx_created_at` (`created_at`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1675 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='微信订阅消息发送日志表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscribe_message_log`
--

LOCK TABLES `subscribe_message_log` WRITE;
/*!40000 ALTER TABLE `subscribe_message_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `subscribe_message_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_config`
--

DROP TABLE IF EXISTS `sys_config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_config` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `config_key` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '配置键',
  `config_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '配置名称',
  `config_value` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '配置值',
  `value_type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'text' COMMENT '值类型: text/number/boolean/textarea',
  `config_group` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '基础配置' COMMENT '配置分组',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '备注说明',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `uk_config_key` (`config_key`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='系统配置表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_config`
--

LOCK TABLES `sys_config` WRITE;
/*!40000 ALTER TABLE `sys_config` DISABLE KEYS */;
INSERT INTO `sys_config` VALUES (10,'settlement.commission_rate','平台抽成比例','0.23','text','结算配置','0~1之间的小数，如0.2表示20%抽成','2026-03-01 21:15:50','2026-03-01 21:15:50'),(11,'withdraw.min_amount','最低提现金额','20','number','提现配置','打手最低提现金额（元）','2026-03-01 21:15:50','2026-03-01 21:15:50'),(12,'withdraw.max_daily_count','每日提现次数上限','1','number','提现配置','每个打手每天最多提现次数','2026-03-01 21:15:50','2026-03-01 21:15:50'),(13,'order.auto_confirm_hours','自动确认收货时间','48','number','订单配置','用户未操作时自动确认的小时数','2026-03-01 21:15:50','2026-03-01 21:15:50'),(14,'order.pay_deadline_minutes','支付超时时间','15','number','订单配置','下单后多少分钟未支付自动取消','2026-03-01 21:15:50','2026-03-01 21:15:50'),(15,'order.max_active_per_player','打手最大接单数','1','number','订单配置','打手同时进行中的订单上限','2026-03-01 21:15:50','2026-03-01 21:15:50'),(19,'site_name','平台名称','复燃电竞','text','站点配置','显示在登录页、协议等处的平台名称','2026-03-03 16:50:14','2026-03-03 16:50:14'),(20,'site_subtitle','平台副标题','想让所有老板都可以再次复燃','text','站点配置','显示在登录页名称下方','2026-03-03 16:50:14','2026-03-03 16:50:14'),(21,'site_logo','平台Logo','https://furandianjing.cn/file/2026/03/05/aad68ae732c348b7b581647d6f075e29.jpg','image','站点配置','Logo 图片URL，为空则使用默认','2026-03-03 16:50:14','2026-03-03 16:55:29'),(22,'site_admin_title','后台标题','复燃电竞管理后台','text','站点配置','PC管理后台侧栏和登录页显示的标题','2026-03-03 16:50:14','2026-03-03 16:50:14'),(23,'player.deposit_required','打手入驻押金','false','boolean','打手配置','开启后打手申请入驻需支付押金，关闭后无需押金即可申请','2026-03-11 14:06:37','2026-03-11 14:06:37'),(24,'player.deposit_amount','打手入驻押金金额','0','number','打手配置','开启打手押金时的应支付金额，单位：元','2026-03-18 14:39:13','2026-03-18 14:39:13'),(25,'sms.aliyun.enabled','启用阿里云短信提醒','true','boolean','短信配置','开启后聊天页和后台业务事件均可发送短信提醒','2026-03-29 10:05:18','2026-03-29 10:05:18'),(26,'sms.aliyun.access_key_id','阿里云 AccessKey ID','REDACTED_ACCESS_KEY_ID','text','短信配置','阿里云 RAM 用户的 AccessKey ID','2026-03-29 10:05:18','2026-03-29 10:05:18'),(27,'sms.aliyun.access_key_secret','阿里云 AccessKey Secret','REDACTED_ACCESS_KEY_SECRET','text','短信配置','阿里云 RAM 用户的 AccessKey Secret','2026-03-29 10:05:18','2026-03-29 10:05:18'),(28,'sms.aliyun.endpoint','阿里云短信 Endpoint','dysmsapi.aliyuncs.com','text','短信配置','短信服务默认 Endpoint，一般无需修改','2026-03-29 10:05:18','2026-03-29 10:05:18'),(29,'sms.aliyun.sign_name','阿里云短信签名','德阳市旌阳区复燃俱乐部','text','短信配置','已审核通过的短信签名','2026-03-29 10:05:18','2026-03-29 10:05:18'),(30,'sms.aliyun.template_code.cs_message_reminder','消息提醒模板 Code','SMS_504365043','text','短信配置','用户、打手、客服端通用的消息提醒短信模板','2026-03-29 10:05:18','2026-03-29 10:05:18'),(33,'sms.aliyun.template_code.player_finish_order','通知老板结单模板 Code','SMS_504575043','text','短信配置','打手端通知老板结单使用的固定内容短信模板','2026-03-29 10:05:18','2026-03-29 10:05:18'),(35,'sms.aliyun.template_code.player_order_assigned','打手被指派模板 Code','SMS_504890091','text','短信配置','后台自动发送给被指派打手的固定内容短信模板','2026-03-29 10:05:18','2026-03-29 10:05:18'),(36,'sms.aliyun.template_code.player_teammate_invited','打手被邀请模板 Code','SMS_504775096','text','短信配置','后台自动发送给被邀请打手的固定内容短信模板','2026-03-29 10:05:18','2026-03-29 10:05:18'),(37,'sms.aliyun.cooldown_seconds','客服短信提醒冷却秒数','60','number','短信配置','客服发送短信提醒的冷却时间','2026-03-29 10:05:18','2026-03-29 10:05:18'),(38,'sms.aliyun.user_player_cooldown_seconds','用户/打手短信冷却秒数','600','number','短信配置','用户端和打手端全局发送短信提醒冷却时间','2026-03-29 10:05:18','2026-03-29 10:05:18'),(39,'sms.aliyun.player_fee','打手短信提醒扣费金额','0.05','number','短信配置','打手每次成功发送短信提醒时从余额中扣除的金额','2026-03-29 10:05:19','2026-03-29 10:05:19');
/*!40000 ALTER TABLE `sys_config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_notification`
--

DROP TABLE IF EXISTS `system_notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `system_notification` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `receiver_type` varchar(20) NOT NULL COMMENT 'USER/PLAYER/CS',
  `receiver_id` bigint NOT NULL DEFAULT '0' COMMENT '接收者ID，CS 时 0 表示全体客服',
  `title` varchar(200) NOT NULL DEFAULT '',
  `content` varchar(1000) DEFAULT NULL,
  `biz_type` varchar(64) DEFAULT NULL COMMENT '业务类型 ORDER_ASSIGNED/ORDER_PAID 等',
  `related_id` bigint DEFAULT NULL,
  `is_read` tinyint NOT NULL DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_receiver` (`receiver_type`,`receiver_id`),
  KEY `idx_receiver_unread` (`receiver_type`,`receiver_id`,`is_read`),
  KEY `idx_created` (`created_at`)
) ENGINE=InnoDB AUTO_INCREMENT=4669 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='系统通知';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_notification`
--

LOCK TABLES `system_notification` WRITE;
/*!40000 ALTER TABLE `system_notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `system_notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '交易ID',
  `type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '类型: INCOME/CONSUMPTION/REFUND/WITHDRAW/WITHDRAW_REJECT/RECHARGE',
  `user_type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '账户类型: USER/PLAYER',
  `user_id` bigint NOT NULL COMMENT '用户/打手ID',
  `amount` decimal(12,2) NOT NULL COMMENT '交易金额(正-入账 负-出账)',
  `balance_before` decimal(12,2) NOT NULL COMMENT '变动前余额',
  `balance_after` decimal(12,2) NOT NULL COMMENT '变动后余额',
  `related_order_id` bigint DEFAULT NULL COMMENT '关联订单ID',
  `related_payment_id` bigint DEFAULT NULL COMMENT '关联支付记录ID',
  `related_withdraw_id` bigint DEFAULT NULL COMMENT '关联提现记录ID',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '备注(如:主接分成/队友分成)',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_user` (`user_type`,`user_id`) USING BTREE,
  KEY `idx_type` (`type`) USING BTREE,
  KEY `idx_related_order` (`related_order_id`) USING BTREE,
  KEY `idx_created_at` (`created_at`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1120 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='交易流水表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `openid` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '微信openid',
  `nickname` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '微信用户' COMMENT '昵称',
  `avatar` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '头像URL',
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '手机号',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态: 1-正常 0-封禁',
  `deleted` tinyint NOT NULL DEFAULT '0' COMMENT '逻辑删除: 0-未删除 1-已删除',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `uk_openid` (`openid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=376 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='用户表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_game_info`
--

DROP TABLE IF EXISTS `user_game_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_game_info` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL COMMENT '用户ID',
  `category_id` bigint DEFAULT NULL COMMENT '分类ID',
  `game_account` varchar(255) DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  `saved_fields` json DEFAULT NULL COMMENT '动态表单字段JSON',
  `label` varchar(128) DEFAULT NULL COMMENT '保存标签',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_user_category` (`user_id`,`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=294 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='用户保存的游戏信息';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_game_info`
--

LOCK TABLES `user_game_info` WRITE;
/*!40000 ALTER TABLE `user_game_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_game_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_subscribe`
--

DROP TABLE IF EXISTS `user_subscribe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_subscribe` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `user_id` bigint NOT NULL COMMENT '用户ID',
  `template_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '消息模板ID',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '授权状态: 1-已授权 0-已取消',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `uk_user_template` (`user_id`,`template_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='用户订阅消息授权表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_subscribe`
--

LOCK TABLES `user_subscribe` WRITE;
/*!40000 ALTER TABLE `user_subscribe` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_subscribe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wallet`
--

DROP TABLE IF EXISTS `wallet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wallet` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '钱包ID',
  `user_id` bigint NOT NULL COMMENT '用户ID',
  `balance` decimal(12,2) NOT NULL DEFAULT '0.00' COMMENT '可用余额',
  `frozen_amount` decimal(12,2) NOT NULL DEFAULT '0.00' COMMENT '冻结金额',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `uk_user_id` (`user_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=375 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='用户钱包表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wallet`
--

LOCK TABLES `wallet` WRITE;
/*!40000 ALTER TABLE `wallet` DISABLE KEYS */;
/*!40000 ALTER TABLE `wallet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `withdraw`
--

DROP TABLE IF EXISTS `withdraw`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `withdraw` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '提现ID',
  `player_id` bigint NOT NULL COMMENT '打手ID',
  `account_id` bigint NOT NULL COMMENT '提现账户ID',
  `amount` decimal(10,2) NOT NULL COMMENT '提现金额',
  `status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'PENDING' COMMENT '状态: PENDING-待处理 COMPLETED-已完成 REJECTED-已拒绝',
  `pay_method` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '实际打款方式(管理员填写)',
  `proof_image` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '打款凭证图片URL',
  `reject_reason` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '拒绝原因',
  `processed_by` bigint DEFAULT NULL COMMENT '处理人(管理员ID)',
  `processed_at` datetime DEFAULT NULL COMMENT '处理时间',
  `last_notify_at` datetime DEFAULT NULL COMMENT '上次提醒管理员时间(防重复提醒)',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_player_id` (`player_id`) USING BTREE,
  KEY `idx_status` (`status`) USING BTREE,
  KEY `idx_created_at` (`created_at`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=158 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='提现记录表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `withdraw`
--

LOCK TABLES `withdraw` WRITE;
/*!40000 ALTER TABLE `withdraw` DISABLE KEYS */;
/*!40000 ALTER TABLE `withdraw` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'delta_game'
--

--
-- Dumping routines for database 'delta_game'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-09 10:21:01


