"use strict";
const common_vendor = require("../common/vendor.js");
function playMessageNotification() {
  try {
    common_vendor.index.vibrateShort({ type: "medium" });
  } catch (e) {
  }
  try {
    const ctx = common_vendor.index.createInnerAudioContext();
    ctx.src = "/static/sounds/notify.wav";
    ctx.volume = 0.6;
    ctx.autoplay = true;
    ctx.obeyMuteSwitch = false;
    ctx.onEnded(() => ctx.destroy());
    ctx.onError(() => ctx.destroy());
  } catch (e) {
  }
}
exports.playMessageNotification = playMessageNotification;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/notificationFeedback.js.map
