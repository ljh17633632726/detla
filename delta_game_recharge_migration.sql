-- 已有数据库升级脚本：支付记录保存充值套餐的赠送金额快照。
ALTER TABLE `payment`
  ADD COLUMN `recharge_bonus` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '余额充值赠送金额' AFTER `amount`;
