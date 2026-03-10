"use strict";
const common_vendor = require("../common/vendor.js");
const TEMPLATE = {
  /** 订单状态变更通知（phrase4 订单状态、character_string1 订单单号、thing2 订单类型、amount3 订单金额） */
  ORDER_STATUS: "sUrc4cGcXvz5Mi59q3b0Jp8jmNt9CGWd2_-pc0jiwGs",
  /** 收入到账通知 */
  INCOME: "YOUR_TEMPLATE_ID_INCOME",
  /** 组队邀请通知 */
  TEAM_INVITE: "YOUR_TEMPLATE_ID_TEAM_INVITE",
  /** 订单确认通知 */
  ORDER_CONFIRM: "YOUR_TEMPLATE_ID_ORDER_CONFIRM"
};
function requestSubscribe(tmplIds) {
  const validIds = tmplIds.filter((id) => id && !id.startsWith("YOUR_TEMPLATE_ID"));
  if (validIds.length === 0) {
    common_vendor.index.__f__("log", "at utils/subscribe.js:32", "[Subscribe] 无有效模板ID，跳过订阅请求");
    return Promise.resolve({});
  }
  return new Promise((resolve) => {
    common_vendor.index.__f__("log", "at utils/subscribe.js:38", "[Subscribe] 请求订阅消息, tmplIds:", validIds);
    common_vendor.index.requestSubscribeMessage({
      tmplIds: validIds,
      success(res) {
        common_vendor.index.__f__("log", "at utils/subscribe.js:42", "[Subscribe] 授权结果:", res);
        resolve(res);
      },
      fail(err) {
        common_vendor.index.__f__("log", "at utils/subscribe.js:47", "[Subscribe] 授权失败/拒绝:", err);
        if (err && err.errCode === 20001) {
          common_vendor.index.__f__("warn", "at utils/subscribe.js:50", "[Subscribe] 模板ID未在公众平台配置，请登录 mp.weixin.qq.com -> 订阅消息 -> 公共模板库 添加「订单状态」类模板并填入模板ID");
        }
        resolve({});
      },
      complete() {
        try {
          const sys = typeof common_vendor.index.getSystemInfoSync === "function" ? common_vendor.index.getSystemInfoSync() : {};
          if (sys.platform === "devtools") {
            common_vendor.index.__f__("warn", "at utils/subscribe.js:59", "[Subscribe] 当前为开发者工具，订阅弹窗可能不显示，请使用微信「真机调试」验证");
          }
        } catch (e) {
        }
      }
    });
  });
}
function requestOrderSubscribe() {
  return requestSubscribe([
    TEMPLATE.ORDER_STATUS,
    TEMPLATE.ORDER_CONFIRM
  ]);
}
function requestPlayerSubscribe() {
  return requestSubscribe([
    TEMPLATE.ORDER_STATUS,
    TEMPLATE.INCOME,
    TEMPLATE.ORDER_CONFIRM
  ]);
}
exports.requestOrderSubscribe = requestOrderSubscribe;
exports.requestPlayerSubscribe = requestPlayerSubscribe;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/subscribe.js.map
