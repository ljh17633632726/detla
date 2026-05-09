-- Test seed data for delta_game
-- 用法：先导入 delta_game.sql 建表，再执行本文件追加测试数据。
-- 可重复执行；测试数据统一使用 10000+ ID。

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

--
-- Test seed data
-- 说明：以下数据仅用于本地/测试环境，可重复执行；统一使用 10000+ 的ID，避免和正式数据冲突。
--

INSERT INTO `user`
  (`id`, `openid`, `nickname`, `avatar`, `phone`, `status`, `deleted`, `created_at`, `updated_at`)
VALUES
  (10001, 'test_user_openid_10001', '测试老板A', 'https://furandianjing.cn/file/2026/03/26/a0d94ea1e2bb49ee933946c4a71792bf.jpg', '17600001001', 1, 0, '2026-05-09 10:00:00', '2026-05-09 10:00:00'),
  (10002, 'test_user_openid_10002', '测试老板B', 'https://furandianjing.cn/file/2026/03/29/c0c712c79d9c461791d53136cc5ebf6b.jpg', '17600001002', 1, 0, '2026-05-09 10:05:00', '2026-05-09 10:05:00')
ON DUPLICATE KEY UPDATE
  `nickname` = VALUES(`nickname`),
  `avatar` = VALUES(`avatar`),
  `phone` = VALUES(`phone`),
  `status` = VALUES(`status`),
  `deleted` = VALUES(`deleted`),
  `updated_at` = VALUES(`updated_at`);

INSERT INTO `wallet`
  (`id`, `user_id`, `balance`, `frozen_amount`, `created_at`, `updated_at`)
VALUES
  (10001, 10001, 188.66, 0.00, '2026-05-09 10:00:00', '2026-05-09 10:00:00'),
  (10002, 10002, 58.00, 0.00, '2026-05-09 10:05:00', '2026-05-09 10:05:00')
ON DUPLICATE KEY UPDATE
  `balance` = VALUES(`balance`),
  `frozen_amount` = VALUES(`frozen_amount`),
  `updated_at` = VALUES(`updated_at`);

INSERT INTO `player`
  (`id`, `openid`, `nickname`, `avatar`, `real_name`, `phone`, `skill_tags`, `game_level`, `proof_images`, `service_types`, `avg_rating`, `order_count`, `complete_rate`, `status`, `frozen_until`, `reject_reason`, `deposit_payment_no`, `last_online_at`, `is_online`, `deleted`, `created_at`, `updated_at`)
VALUES
  (10001, 'test_player_openid_10001', '测试接单员一号', 'https://furandianjing.cn/file/2026/03/29/2b6969d3785544148b1b354f89ea3dd6.png', '张测试', '17700001001', '护航,陪玩,上分', '荣耀王者/超凡入圣', '', '护航单,体验单', 4.90, 38, 98.50, 'ACTIVE', NULL, '', NULL, '2026-05-09 11:20:00', 1, 0, '2026-05-09 09:30:00', '2026-05-09 11:20:00'),
  (10002, 'test_player_openid_10002', '测试接单员二号', 'https://furandianjing.cn/file/2026/03/13/2b0eef8e28074948b2bca43f489a3d8a.png', '李测试', '17700001002', '双排,开黑,娱乐', '无畏契约钻石', '', '陪陪,特色玩法', 4.80, 24, 96.00, 'ACTIVE', NULL, '', NULL, '2026-05-09 11:10:00', 1, 0, '2026-05-09 09:35:00', '2026-05-09 11:10:00')
ON DUPLICATE KEY UPDATE
  `nickname` = VALUES(`nickname`),
  `avatar` = VALUES(`avatar`),
  `real_name` = VALUES(`real_name`),
  `phone` = VALUES(`phone`),
  `skill_tags` = VALUES(`skill_tags`),
  `game_level` = VALUES(`game_level`),
  `service_types` = VALUES(`service_types`),
  `avg_rating` = VALUES(`avg_rating`),
  `order_count` = VALUES(`order_count`),
  `complete_rate` = VALUES(`complete_rate`),
  `status` = VALUES(`status`),
  `last_online_at` = VALUES(`last_online_at`),
  `is_online` = VALUES(`is_online`),
  `deleted` = VALUES(`deleted`),
  `updated_at` = VALUES(`updated_at`);

INSERT INTO `player_wallet`
  (`id`, `player_id`, `balance`, `frozen_amount`, `total_income`, `created_at`, `updated_at`)
VALUES
  (10001, 10001, 326.40, 20.00, 1890.80, '2026-05-09 09:30:00', '2026-05-09 11:20:00'),
  (10002, 10002, 142.20, 0.00, 860.50, '2026-05-09 09:35:00', '2026-05-09 11:10:00')
ON DUPLICATE KEY UPDATE
  `balance` = VALUES(`balance`),
  `frozen_amount` = VALUES(`frozen_amount`),
  `total_income` = VALUES(`total_income`),
  `updated_at` = VALUES(`updated_at`);

INSERT INTO `player_account`
  (`id`, `player_id`, `type`, `account_name`, `account_no`, `qrcode_url`, `is_default`, `deleted`, `created_at`, `updated_at`)
VALUES
  (10001, 10001, 'WECHAT', '张测试', 'test_wechat_10001', '', 1, 0, '2026-05-09 09:40:00', '2026-05-09 09:40:00'),
  (10002, 10002, 'ALIPAY', '李测试', 'test_alipay_10002', '', 1, 0, '2026-05-09 09:45:00', '2026-05-09 09:45:00')
ON DUPLICATE KEY UPDATE
  `type` = VALUES(`type`),
  `account_name` = VALUES(`account_name`),
  `account_no` = VALUES(`account_no`),
  `qrcode_url` = VALUES(`qrcode_url`),
  `is_default` = VALUES(`is_default`),
  `deleted` = VALUES(`deleted`),
  `updated_at` = VALUES(`updated_at`);

INSERT INTO `category`
  (`id`, `name`, `icon`, `sort_order`, `status`, `parent_id`, `deleted`, `created_at`, `updated_at`)
VALUES
  (10001, '测试专区', 'https://furandianjing.cn/file/2026/03/13/68d0585064dc44a1a9851e4a7d2787ee.jpg', 99, 1, 0, 0, '2026-05-09 10:00:00', '2026-05-09 10:00:00'),
  (10002, '测试护航单', '', 0, 1, 10001, 0, '2026-05-09 10:00:00', '2026-05-09 10:00:00'),
  (10003, '测试陪玩单', '', 1, 1, 10001, 0, '2026-05-09 10:00:00', '2026-05-09 10:00:00')
ON DUPLICATE KEY UPDATE
  `name` = VALUES(`name`),
  `icon` = VALUES(`icon`),
  `sort_order` = VALUES(`sort_order`),
  `status` = VALUES(`status`),
  `parent_id` = VALUES(`parent_id`),
  `deleted` = VALUES(`deleted`),
  `updated_at` = VALUES(`updated_at`);

INSERT INTO `category_form_field`
  (`id`, `category_id`, `field_key`, `field_label`, `field_type`, `options`, `placeholder`, `required`, `sort_order`, `created_at`)
VALUES
  (10001, 10001, 'game_id', '游戏ID', 'TEXT', '', '请输入游戏ID', 1, 0, '2026-05-09 10:00:00'),
  (10002, 10001, 'server', '游戏区服', 'SELECT', '微信区,QQ区,国际服', '请选择区服', 1, 1, '2026-05-09 10:00:00'),
  (10003, 10001, 'note', '备注需求', 'TEXTAREA', '', '例如：希望语音/不语音、偏好时间段', 0, 2, '2026-05-09 10:00:00')
ON DUPLICATE KEY UPDATE
  `category_id` = VALUES(`category_id`),
  `field_key` = VALUES(`field_key`),
  `field_label` = VALUES(`field_label`),
  `field_type` = VALUES(`field_type`),
  `options` = VALUES(`options`),
  `placeholder` = VALUES(`placeholder`),
  `required` = VALUES(`required`),
  `sort_order` = VALUES(`sort_order`);

INSERT INTO `product`
  (`id`, `category_id`, `name`, `subtitle`, `description`, `cover_image`, `images`, `required_player_count`, `status`, `sort_order`, `sales_count`, `avg_rating`, `commission_rate`, `review_count`, `is_recommend`, `recommend_category_id`, `deleted`, `created_at`, `updated_at`, `price`, `per_user_limit_enabled`, `per_user_limit_count`, `per_user_limit_type`)
VALUES
  (10001, 10002, '测试护航体验单', '30分钟体验，适合验证下单流程', '测试商品：用于用户端下单、支付、订单进度和聊天流程。', 'https://furandianjing.cn/file/2026/03/29/c0c712c79d9c461791d53136cc5ebf6b.jpg', 'https://furandianjing.cn/file/2026/03/29/c0c712c79d9c461791d53136cc5ebf6b.jpg,https://furandianjing.cn/file/2026/03/29/2b6969d3785544148b1b354f89ea3dd6.png', 1, 1, 1, 36, 4.90, 0.2000, 12, 1, 1, 0, '2026-05-09 10:00:00', '2026-05-09 10:00:00', 9.90, 0, NULL, 0),
  (10002, 10002, '测试双人护航单', '双人组队护航，适合测试队友邀请', '测试商品：用于打手组队、分成、订单参与人等流程。', 'https://furandianjing.cn/file/2026/03/13/2b0eef8e28074948b2bca43f489a3d8a.png', 'https://furandianjing.cn/file/2026/03/13/2b0eef8e28074948b2bca43f489a3d8a.png', 2, 1, 2, 18, 4.80, 0.2300, 5, 1, 7, 0, '2026-05-09 10:05:00', '2026-05-09 10:05:00', 39.90, 0, NULL, 0),
  (10003, 10003, '测试娱乐陪玩单', '休闲娱乐，语音开黑', '测试商品：用于分类页、推荐页和商品详情展示。', 'https://furandianjing.cn/file/2026/03/12/a94f7f70456c4c468d01e12a65b738e0.jpg', 'https://furandianjing.cn/file/2026/03/12/a94f7f70456c4c468d01e12a65b738e0.jpg', 1, 1, 3, 52, 5.00, 0.1800, 20, 1, 6, 0, '2026-05-09 10:10:00', '2026-05-09 10:10:00', 19.90, 0, NULL, 0)
ON DUPLICATE KEY UPDATE
  `category_id` = VALUES(`category_id`),
  `name` = VALUES(`name`),
  `subtitle` = VALUES(`subtitle`),
  `description` = VALUES(`description`),
  `cover_image` = VALUES(`cover_image`),
  `images` = VALUES(`images`),
  `required_player_count` = VALUES(`required_player_count`),
  `status` = VALUES(`status`),
  `sort_order` = VALUES(`sort_order`),
  `sales_count` = VALUES(`sales_count`),
  `avg_rating` = VALUES(`avg_rating`),
  `commission_rate` = VALUES(`commission_rate`),
  `review_count` = VALUES(`review_count`),
  `is_recommend` = VALUES(`is_recommend`),
  `recommend_category_id` = VALUES(`recommend_category_id`),
  `deleted` = VALUES(`deleted`),
  `updated_at` = VALUES(`updated_at`),
  `price` = VALUES(`price`),
  `per_user_limit_enabled` = VALUES(`per_user_limit_enabled`),
  `per_user_limit_count` = VALUES(`per_user_limit_count`),
  `per_user_limit_type` = VALUES(`per_user_limit_type`);

INSERT INTO `product_spec`
  (`id`, `product_id`, `spec_name`, `spec_values`, `sort_order`, `created_at`)
VALUES
  (10001, 10001, '服务时长', JSON_ARRAY('30分钟', '60分钟', '120分钟'), 0, '2026-05-09 10:00:00'),
  (10002, 10001, '是否语音', JSON_ARRAY('不语音', '开麦语音'), 1, '2026-05-09 10:00:00'),
  (10003, 10002, '服务模式', JSON_ARRAY('双人护航', '主接+队友'), 0, '2026-05-09 10:05:00')
ON DUPLICATE KEY UPDATE
  `product_id` = VALUES(`product_id`),
  `spec_name` = VALUES(`spec_name`),
  `spec_values` = VALUES(`spec_values`),
  `sort_order` = VALUES(`sort_order`);

INSERT INTO `banner`
  (`id`, `image_url`, `link_type`, `link_value`, `sort_order`, `status`, `start_time`, `end_time`, `deleted`, `created_at`, `updated_at`)
VALUES
  (10001, 'https://furandianjing.cn/file/2026/03/10/f6567f4793ab43789f608278ac5e111e.jpg', 'PRODUCT', '10001', 1, 1, NULL, NULL, 0, '2026-05-09 10:00:00', '2026-05-09 10:00:00')
ON DUPLICATE KEY UPDATE
  `image_url` = VALUES(`image_url`),
  `link_type` = VALUES(`link_type`),
  `link_value` = VALUES(`link_value`),
  `sort_order` = VALUES(`sort_order`),
  `status` = VALUES(`status`),
  `deleted` = VALUES(`deleted`),
  `updated_at` = VALUES(`updated_at`);

INSERT INTO `notice`
  (`id`, `title`, `content`, `type`, `status`, `sort_order`, `popup_display`, `deleted`, `created_at`, `updated_at`)
VALUES
  (10001, '测试公告：下单流程已准备好', '<p>这是测试公告，可用于验证首页公告栏和弹窗。</p>', 'system', 1, 1, 0, 0, '2026-05-09 10:00:00', '2026-05-09 10:00:00')
ON DUPLICATE KEY UPDATE
  `title` = VALUES(`title`),
  `content` = VALUES(`content`),
  `type` = VALUES(`type`),
  `status` = VALUES(`status`),
  `sort_order` = VALUES(`sort_order`),
  `popup_display` = VALUES(`popup_display`),
  `deleted` = VALUES(`deleted`),
  `updated_at` = VALUES(`updated_at`);

INSERT INTO `order`
  (`id`, `order_no`, `user_id`, `product_id`, `product_name`, `spec_info`, `amount`, `commission_rate`, `game_account`, `contact`, `remark`, `extra_fields`, `required_player_count`, `designated_player_id`, `player_id`, `status`, `pay_deadline`, `assign_time`, `accept_time`, `teammate_deadline`, `start_time`, `complete_time`, `confirm_time`, `auto_confirm_deadline`, `settled`, `settle_amount`, `settle_time`, `created_at`, `updated_at`)
VALUES
  (10001, 'TEST202605090001', 10001, 10001, '测试护航体验单', JSON_OBJECT('服务时长','30分钟','是否语音','开麦语音'), 9.90, 0.2000, 'test-game-id-10001', 'test-contact-10001', '测试待支付订单', JSON_OBJECT('game_id','test-game-id-10001','server','QQ区','note','待支付测试'), 1, NULL, NULL, 'PENDING_PAYMENT', '2026-05-09 10:30:00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, '2026-05-09 10:15:00', '2026-05-09 10:15:00'),
  (10002, 'TEST202605090002', 10001, 10001, '测试护航体验单', JSON_OBJECT('服务时长','60分钟','是否语音','不语音'), 19.90, 0.2000, 'test-game-id-10001', 'test-contact-10001', '测试已支付待接单订单', JSON_OBJECT('game_id','test-game-id-10001','server','微信区','note','待接单测试'), 1, NULL, NULL, 'PAID', '2026-05-09 10:35:00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, '2026-05-09 10:20:00', '2026-05-09 10:21:00'),
  (10003, 'TEST202605090003', 10001, 10002, '测试双人护航单', JSON_OBJECT('服务模式','双人护航'), 39.90, 0.2300, 'test-game-id-10001', 'test-contact-10001', '测试进行中订单', JSON_OBJECT('game_id','test-game-id-10001','server','QQ区','note','进行中测试'), 2, NULL, 10001, 'IN_PROGRESS', '2026-05-09 10:40:00', '2026-05-09 10:31:00', '2026-05-09 10:35:00', '2026-05-09 11:00:00', '2026-05-09 10:42:00', NULL, NULL, NULL, 0, NULL, NULL, '2026-05-09 10:25:00', '2026-05-09 10:42:00'),
  (10004, 'TEST202605090004', 10002, 10003, '测试娱乐陪玩单', JSON_OBJECT('服务时长','60分钟'), 19.90, 0.1800, 'test-game-id-10002', 'test-contact-10002', '测试待确认订单', JSON_OBJECT('game_id','test-game-id-10002','server','国际服','note','待确认测试'), 1, NULL, 10002, 'COMPLETED', '2026-05-09 10:45:00', '2026-05-09 10:41:00', '2026-05-09 10:43:00', NULL, '2026-05-09 10:50:00', '2026-05-09 11:30:00', NULL, '2026-05-11 11:30:00', 0, NULL, NULL, '2026-05-09 10:35:00', '2026-05-09 11:30:00'),
  (10005, 'TEST202605090005', 10002, 10003, '测试娱乐陪玩单', JSON_OBJECT('服务时长','120分钟'), 29.90, 0.1800, 'test-game-id-10002', 'test-contact-10002', '测试已完成已结算订单', JSON_OBJECT('game_id','test-game-id-10002','server','微信区','note','已完成测试'), 1, NULL, 10002, 'CONFIRMED', '2026-05-08 10:45:00', '2026-05-08 10:41:00', '2026-05-08 10:43:00', NULL, '2026-05-08 10:50:00', '2026-05-08 11:30:00', '2026-05-08 11:50:00', '2026-05-10 11:30:00', 1, 24.52, '2026-05-08 11:55:00', '2026-05-08 10:35:00', '2026-05-08 11:55:00')
ON DUPLICATE KEY UPDATE
  `user_id` = VALUES(`user_id`),
  `product_id` = VALUES(`product_id`),
  `product_name` = VALUES(`product_name`),
  `spec_info` = VALUES(`spec_info`),
  `amount` = VALUES(`amount`),
  `commission_rate` = VALUES(`commission_rate`),
  `game_account` = VALUES(`game_account`),
  `contact` = VALUES(`contact`),
  `remark` = VALUES(`remark`),
  `extra_fields` = VALUES(`extra_fields`),
  `required_player_count` = VALUES(`required_player_count`),
  `designated_player_id` = VALUES(`designated_player_id`),
  `player_id` = VALUES(`player_id`),
  `status` = VALUES(`status`),
  `pay_deadline` = VALUES(`pay_deadline`),
  `assign_time` = VALUES(`assign_time`),
  `accept_time` = VALUES(`accept_time`),
  `teammate_deadline` = VALUES(`teammate_deadline`),
  `start_time` = VALUES(`start_time`),
  `complete_time` = VALUES(`complete_time`),
  `confirm_time` = VALUES(`confirm_time`),
  `auto_confirm_deadline` = VALUES(`auto_confirm_deadline`),
  `settled` = VALUES(`settled`),
  `settle_amount` = VALUES(`settle_amount`),
  `settle_time` = VALUES(`settle_time`),
  `updated_at` = VALUES(`updated_at`);

INSERT INTO `order_player`
  (`id`, `order_id`, `player_id`, `role`, `status`, `split_type`, `split_ratio`, `split_amount`, `invited_by`, `invited_at`, `invite_deadline`, `accepted_at`, `rejected_at`, `settle_amount`, `settled_at`, `created_at`)
VALUES
  (10001, 10003, 10001, 'PRIMARY', 'ACCEPTED', NULL, NULL, NULL, NULL, NULL, NULL, '2026-05-09 10:35:00', NULL, NULL, NULL, '2026-05-09 10:31:00'),
  (10002, 10003, 10002, 'TEAMMATE', 'ACCEPTED', 'FIFTY_FIFTY', 50.00, NULL, 10001, '2026-05-09 10:36:00', '2026-05-09 11:00:00', '2026-05-09 10:38:00', NULL, NULL, NULL, '2026-05-09 10:36:00'),
  (10003, 10004, 10002, 'PRIMARY', 'ACCEPTED', NULL, NULL, NULL, NULL, NULL, NULL, '2026-05-09 10:43:00', NULL, NULL, NULL, '2026-05-09 10:41:00'),
  (10004, 10005, 10002, 'PRIMARY', 'ACCEPTED', NULL, NULL, NULL, NULL, NULL, NULL, '2026-05-08 10:43:00', NULL, 24.52, '2026-05-08 11:55:00', '2026-05-08 10:41:00')
ON DUPLICATE KEY UPDATE
  `order_id` = VALUES(`order_id`),
  `player_id` = VALUES(`player_id`),
  `role` = VALUES(`role`),
  `status` = VALUES(`status`),
  `split_type` = VALUES(`split_type`),
  `split_ratio` = VALUES(`split_ratio`),
  `split_amount` = VALUES(`split_amount`),
  `invited_by` = VALUES(`invited_by`),
  `invited_at` = VALUES(`invited_at`),
  `invite_deadline` = VALUES(`invite_deadline`),
  `accepted_at` = VALUES(`accepted_at`),
  `rejected_at` = VALUES(`rejected_at`),
  `settle_amount` = VALUES(`settle_amount`),
  `settled_at` = VALUES(`settled_at`);

INSERT INTO `order_progress`
  (`id`, `order_id`, `type`, `operator_type`, `operator_id`, `from_status`, `to_status`, `content`, `images`, `remark`, `created_at`)
VALUES
  (10001, 10002, 'STATUS_CHANGE', 'USER', 10001, 'PENDING_PAYMENT', 'PAID', '用户已支付订单，等待客服指派接单员', NULL, NULL, '2026-05-09 10:21:00'),
  (10002, 10003, 'STATUS_CHANGE', 'CS', 2, 'PAID', 'ASSIGNED', '客服已指派接单员一号', NULL, NULL, '2026-05-09 10:31:00'),
  (10003, 10003, 'STATUS_CHANGE', 'PLAYER', 10001, 'ASSIGNED', 'ACCEPTED', '接单员已接单', NULL, NULL, '2026-05-09 10:35:00'),
  (10004, 10003, 'TEAMMATE_ACCEPTED', 'PLAYER', 10002, 'ACCEPTED', 'WAITING_TEAMMATE', '队友已接受邀请', NULL, NULL, '2026-05-09 10:38:00'),
  (10005, 10003, 'STATUS_CHANGE', 'PLAYER', 10001, 'WAITING_TEAMMATE', 'IN_PROGRESS', '服务已开始', NULL, NULL, '2026-05-09 10:42:00'),
  (10006, 10004, 'PROGRESS_UPDATE', 'PLAYER', 10002, 'IN_PROGRESS', 'IN_PROGRESS', '已完成一局，正在等待用户确认最终结果', '', NULL, '2026-05-09 11:10:00'),
  (10007, 10004, 'COMPLETED', 'PLAYER', 10002, 'IN_PROGRESS', 'COMPLETED', '服务已完成，请用户确认', '', NULL, '2026-05-09 11:30:00'),
  (10008, 10005, 'COMPLETED', 'PLAYER', 10002, 'IN_PROGRESS', 'COMPLETED', '服务已完成', '', NULL, '2026-05-08 11:30:00'),
  (10009, 10005, 'STATUS_CHANGE', 'USER', 10002, 'COMPLETED', 'CONFIRMED', '用户已确认完成，订单已结算', NULL, NULL, '2026-05-08 11:50:00')
ON DUPLICATE KEY UPDATE
  `order_id` = VALUES(`order_id`),
  `type` = VALUES(`type`),
  `operator_type` = VALUES(`operator_type`),
  `operator_id` = VALUES(`operator_id`),
  `from_status` = VALUES(`from_status`),
  `to_status` = VALUES(`to_status`),
  `content` = VALUES(`content`),
  `images` = VALUES(`images`),
  `remark` = VALUES(`remark`),
  `created_at` = VALUES(`created_at`);

INSERT INTO `payment`
  (`id`, `payment_no`, `order_id`, `user_id`, `biz_type`, `amount`, `pay_method`, `status`, `wx_transaction_id`, `wx_prepay_id`, `refund_amount`, `refund_no`, `refund_reason`, `refund_time`, `paid_at`, `created_at`, `updated_at`)
VALUES
  (10001, 'TESTPAY202605090001', 10002, 10001, 'ORDER', 19.90, 'WECHAT', 'PAID', 'WXTEST202605090001', 'prepay_test_10001', NULL, NULL, NULL, NULL, '2026-05-09 10:21:00', '2026-05-09 10:20:00', '2026-05-09 10:21:00'),
  (10002, 'TESTPAY202605090002', 10003, 10001, 'ORDER', 39.90, 'BALANCE', 'PAID', NULL, NULL, NULL, NULL, NULL, NULL, '2026-05-09 10:26:00', '2026-05-09 10:25:00', '2026-05-09 10:26:00'),
  (10003, 'TESTPAY202605090003', 10004, 10002, 'ORDER', 19.90, 'WECHAT', 'PAID', 'WXTEST202605090003', 'prepay_test_10003', NULL, NULL, NULL, NULL, '2026-05-09 10:36:00', '2026-05-09 10:35:00', '2026-05-09 10:36:00'),
  (10004, 'TESTPAY202605080001', 10005, 10002, 'ORDER', 29.90, 'WECHAT', 'PAID', 'WXTEST202605080001', 'prepay_test_10004', NULL, NULL, NULL, NULL, '2026-05-08 10:36:00', '2026-05-08 10:35:00', '2026-05-08 10:36:00')
ON DUPLICATE KEY UPDATE
  `order_id` = VALUES(`order_id`),
  `user_id` = VALUES(`user_id`),
  `biz_type` = VALUES(`biz_type`),
  `amount` = VALUES(`amount`),
  `pay_method` = VALUES(`pay_method`),
  `status` = VALUES(`status`),
  `wx_transaction_id` = VALUES(`wx_transaction_id`),
  `wx_prepay_id` = VALUES(`wx_prepay_id`),
  `paid_at` = VALUES(`paid_at`),
  `updated_at` = VALUES(`updated_at`);

INSERT INTO `chat_session`
  (`id`, `id1`, `id2`, `status`, `last_message_at`, `created_at`, `updated_at`)
VALUES
  (10001, 10001, 3000000002, 'ACTIVE', '2026-05-09 11:05:00', '2026-05-09 10:50:00', '2026-05-09 11:05:00'),
  (10002, 10001, 2000010001, 'ACTIVE', '2026-05-09 11:00:00', '2026-05-09 10:40:00', '2026-05-09 11:00:00')
ON DUPLICATE KEY UPDATE
  `id1` = VALUES(`id1`),
  `id2` = VALUES(`id2`),
  `status` = VALUES(`status`),
  `last_message_at` = VALUES(`last_message_at`),
  `updated_at` = VALUES(`updated_at`);

INSERT INTO `chat_message`
  (`id`, `conversation_id`, `session_id`, `sender_type`, `sender_id`, `type`, `content`, `is_read`, `created_at`)
VALUES
  (10001, NULL, 10001, 'USER', 10001, 'TEXT', '你好，我想咨询一下测试护航体验单。', 1, '2026-05-09 10:50:00'),
  (10002, NULL, 10001, 'CS', 2, 'TEXT', '您好，可以直接下单，测试接单员会尽快处理。', 0, '2026-05-09 10:52:00'),
  (10003, NULL, 10001, 'USER', 10001, 'PRODUCT', '{"id":10001,"name":"测试护航体验单","price":9.90,"coverImage":"https://furandianjing.cn/file/2026/03/29/c0c712c79d9c461791d53136cc5ebf6b.jpg"}', 1, '2026-05-09 11:05:00'),
  (10004, NULL, 10002, 'USER', 10001, 'TEXT', '订单已经开始了吗？', 1, '2026-05-09 10:58:00'),
  (10005, NULL, 10002, 'PLAYER', 10001, 'TEXT', '已经开始了，预计30分钟内完成。', 0, '2026-05-09 11:00:00')
ON DUPLICATE KEY UPDATE
  `session_id` = VALUES(`session_id`),
  `sender_type` = VALUES(`sender_type`),
  `sender_id` = VALUES(`sender_id`),
  `type` = VALUES(`type`),
  `content` = VALUES(`content`),
  `is_read` = VALUES(`is_read`),
  `created_at` = VALUES(`created_at`);

INSERT INTO `system_notification`
  (`id`, `receiver_type`, `receiver_id`, `title`, `content`, `biz_type`, `related_id`, `is_read`, `created_at`)
VALUES
  (10001, 'USER', 10001, '订单已支付', '测试订单 TEST202605090002 已支付，等待接单。', 'ORDER_PAID', 10002, 0, '2026-05-09 10:21:00'),
  (10002, 'PLAYER', 10001, '新订单指派', '你有一个测试订单已被指派，请及时处理。', 'ORDER_ASSIGNED', 10003, 0, '2026-05-09 10:31:00'),
  (10003, 'CS', 0, '测试待接单订单', '测试订单 TEST202605090002 等待客服处理。', 'ORDER_PAID', 10002, 0, '2026-05-09 10:21:00')
ON DUPLICATE KEY UPDATE
  `receiver_type` = VALUES(`receiver_type`),
  `receiver_id` = VALUES(`receiver_id`),
  `title` = VALUES(`title`),
  `content` = VALUES(`content`),
  `biz_type` = VALUES(`biz_type`),
  `related_id` = VALUES(`related_id`),
  `is_read` = VALUES(`is_read`),
  `created_at` = VALUES(`created_at`);

INSERT INTO `transaction`
  (`id`, `type`, `user_type`, `user_id`, `amount`, `balance_before`, `balance_after`, `related_order_id`, `related_payment_id`, `related_withdraw_id`, `remark`, `created_at`)
VALUES
  (10001, 'CONSUMPTION', 'USER', 10001, -39.90, 228.56, 188.66, 10003, 10002, NULL, '测试订单余额支付', '2026-05-09 10:26:00'),
  (10002, 'INCOME', 'PLAYER', 10002, 24.52, 301.88, 326.40, 10005, 10004, NULL, '测试订单结算收入', '2026-05-08 11:55:00')
ON DUPLICATE KEY UPDATE
  `type` = VALUES(`type`),
  `user_type` = VALUES(`user_type`),
  `user_id` = VALUES(`user_id`),
  `amount` = VALUES(`amount`),
  `balance_before` = VALUES(`balance_before`),
  `balance_after` = VALUES(`balance_after`),
  `related_order_id` = VALUES(`related_order_id`),
  `related_payment_id` = VALUES(`related_payment_id`),
  `related_withdraw_id` = VALUES(`related_withdraw_id`),
  `remark` = VALUES(`remark`),
  `created_at` = VALUES(`created_at`);

INSERT INTO `review`
  (`id`, `order_id`, `user_id`, `player_id`, `product_id`, `rating`, `content`, `images`, `deleted`, `created_at`)
VALUES
  (10001, 10005, 10002, 10002, 10003, 5, '测试评价：服务很快，沟通顺畅。', '', 0, '2026-05-08 12:00:00')
ON DUPLICATE KEY UPDATE
  `user_id` = VALUES(`user_id`),
  `player_id` = VALUES(`player_id`),
  `product_id` = VALUES(`product_id`),
  `rating` = VALUES(`rating`),
  `content` = VALUES(`content`),
  `images` = VALUES(`images`),
  `deleted` = VALUES(`deleted`),
  `created_at` = VALUES(`created_at`);

SET FOREIGN_KEY_CHECKS = 1;
