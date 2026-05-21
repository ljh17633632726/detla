"use strict";
const ROLE = {
  USER: "user",
  PLAYER: "player",
  CS: "cs"
};
const ORDER_STATUS_TEXT = {
  PENDING_PAYMENT: "待支付",
  PAID: "待接单",
  ASSIGNED: "已指派",
  ACCEPTED: "已接单",
  WAITING_TEAMMATE: "组队中",
  IN_PROGRESS: "进行中",
  COMPLETED: "待确认",
  CONFIRMED: "已完成",
  REVIEWED: "已评价",
  CANCELLED: "已取消",
  REFUNDING: "退款中",
  REFUNDED: "已退款",
  DISPUTED: "争议中",
  ARBITRATED: "已仲裁"
};
const ORDER_STATUS_COLOR = {
  PENDING_PAYMENT: "#ff9900",
  PAID: "#6366f1",
  ASSIGNED: "#9c27b0",
  ACCEPTED: "#6366f1",
  WAITING_TEAMMATE: "#818cf8",
  IN_PROGRESS: "#818cf8",
  COMPLETED: "#07c160",
  CONFIRMED: "#07c160",
  REVIEWED: "#07c160",
  CANCELLED: "#999999",
  REFUNDING: "#ee0a24",
  REFUNDED: "#ee0a24",
  DISPUTED: "#ee0a24",
  ARBITRATED: "#9c27b0"
};
const PLAYER_ORDER_TABS = [
  { label: "全部", value: "" },
  { label: "待接单", value: "ASSIGNED" },
  { label: "已接单", value: "ACCEPTED" },
  { label: "进行中", value: "IN_PROGRESS" },
  { label: "待确认", value: "COMPLETED" },
  { label: "已完成", value: "CONFIRMED" },
  { label: "已评价", value: "REVIEWED" },
  { label: "争议中", value: "DISPUTED" },
  { label: "已取消", value: "CANCELLED" }
];
const COMPLAINT_STATUS_TEXT = {
  PENDING: "待处理",
  PROCESSING: "处理中",
  RESOLVED: "已解决",
  APPEALING: "申诉中",
  APPEAL_RESOLVED: "申诉处理完毕"
};
exports.COMPLAINT_STATUS_TEXT = COMPLAINT_STATUS_TEXT;
exports.ORDER_STATUS_COLOR = ORDER_STATUS_COLOR;
exports.ORDER_STATUS_TEXT = ORDER_STATUS_TEXT;
exports.PLAYER_ORDER_TABS = PLAYER_ORDER_TABS;
exports.ROLE = ROLE;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/constants.js.map
