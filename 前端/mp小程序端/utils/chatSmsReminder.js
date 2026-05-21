"use strict";
const common_vendor = require("../common/vendor.js");
const USER_CHAT_SMS_REMINDERS = [
  { code: "CS_MESSAGE_REMINDER", label: "消息提醒" }
];
const PLAYER_CHAT_SMS_REMINDERS = [
  { code: "CS_MESSAGE_REMINDER", label: "消息提醒" },
  { code: "PLAYER_FINISH_ORDER", label: "通知老板结单" }
];
const CS_CHAT_SMS_REMINDERS = [
  { code: "CS_MESSAGE_REMINDER", label: "消息提醒" }
];
function chooseChatSmsReminder(options) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(options) || options.length === 0) {
      reject(new Error("暂无可用提醒方式"));
      return;
    }
    common_vendor.index.showActionSheet({
      itemList: options.map((item) => item.label),
      success(res) {
        resolve(options[res.tapIndex]);
      },
      fail(err) {
        reject(err);
      }
    });
  });
}
exports.CS_CHAT_SMS_REMINDERS = CS_CHAT_SMS_REMINDERS;
exports.PLAYER_CHAT_SMS_REMINDERS = PLAYER_CHAT_SMS_REMINDERS;
exports.USER_CHAT_SMS_REMINDERS = USER_CHAT_SMS_REMINDERS;
exports.chooseChatSmsReminder = chooseChatSmsReminder;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/chatSmsReminder.js.map
