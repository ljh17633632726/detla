"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_pay = require("../../api/pay.js");
const api_order = require("../../api/order.js");
const api_user = require("../../api/user.js");
const utils_subscribe = require("../../utils/subscribe.js");
if (!Math) {
  PriceText();
}
const PriceText = () => "../../components/PriceText.js";
const _sfc_main = {
  __name: "pay",
  setup(__props) {
    const orderId = common_vendor.ref(0);
    const amount = common_vendor.ref(0);
    const payType = common_vendor.ref("WECHAT");
    const walletBalance = common_vendor.ref("0.00");
    const countdown = common_vendor.ref(0);
    const expired = common_vendor.ref(false);
    let timer = null;
    const formatCountdown = common_vendor.computed(() => {
      const m = Math.floor(countdown.value / 60);
      const s = countdown.value % 60;
      return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    });
    common_vendor.onLoad(async (opts) => {
      var _a;
      orderId.value = opts.orderId;
      amount.value = opts.amount;
      try {
        const orderRes = await api_order.getOrderDetail(orderId.value);
        const order = orderRes.data;
        if (order) {
          amount.value = order.amount || amount.value;
          if (order.status !== "PENDING_PAYMENT") {
            handleOrderNotPending(order.status);
            return;
          }
          if (order.payDeadline) {
            const deadlineMs = new Date(order.payDeadline.replace(" ", "T")).getTime();
            const remainSec = Math.floor((deadlineMs - Date.now()) / 1e3);
            countdown.value = remainSec > 0 ? remainSec : 0;
          } else {
            countdown.value = 1800;
          }
        }
      } catch (e) {
        countdown.value = 1800;
      }
      if (countdown.value <= 0) {
        expired.value = true;
      } else {
        startCountdown();
      }
      try {
        const w = await api_user.getWallet();
        walletBalance.value = Number(((_a = w.data) == null ? void 0 : _a.balance) || 0).toFixed(2);
      } catch (e) {
      }
    });
    function startCountdown() {
      timer = setInterval(() => {
        countdown.value--;
        if (countdown.value <= 0) {
          clearInterval(timer);
          expired.value = true;
        }
      }, 1e3);
    }
    function handleOrderNotPending(status) {
      const msg = status === "PAID" ? "该订单已支付" : status === "CANCELLED" ? "订单已取消" : "订单状态已变更";
      common_vendor.index.showModal({
        title: "提示",
        content: msg,
        showCancel: false,
        success: () => common_vendor.index.redirectTo({ url: `/pages/order/detail?id=${orderId.value}` })
      });
    }
    function handleAlreadyPaid() {
      common_vendor.index.showModal({
        title: "提示",
        content: "该订单已支付，请勿重复支付",
        showCancel: false,
        success: () => common_vendor.index.redirectTo({ url: `/pages/order/detail?id=${orderId.value}` })
      });
    }
    common_vendor.onUnmounted(() => {
      if (timer)
        clearInterval(timer);
    });
    async function handlePay() {
      if (expired.value)
        return common_vendor.index.showToast({ title: "订单已超时", icon: "none" });
      await utils_subscribe.requestOrderSubscribe();
      try {
        if (payType.value === "BALANCE") {
          await api_pay.balancePay(orderId.value);
          common_vendor.index.showToast({ title: "支付成功" });
          setTimeout(() => common_vendor.index.redirectTo({ url: `/pages/order/detail?id=${orderId.value}` }), 1500);
        } else {
          const res = await api_pay.createPayment(orderId.value);
          const payParams = res.data;
          common_vendor.index.requestPayment({
            provider: "wxpay",
            timeStamp: payParams.timeStamp,
            nonceStr: payParams.nonceStr,
            package: payParams.package,
            signType: payParams.signType || "RSA",
            paySign: payParams.paySign,
            success() {
              common_vendor.index.showToast({ title: "支付成功" });
              setTimeout(() => common_vendor.index.redirectTo({ url: `/pages/order/detail?id=${orderId.value}` }), 1500);
            },
            fail() {
              common_vendor.index.showToast({ title: "支付取消", icon: "none" });
            }
          });
        }
      } catch (e) {
        if (e && e.code === 4010) {
          handleAlreadyPaid();
        }
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          value: amount.value,
          size: 60
        }),
        b: countdown.value > 0
      }, countdown.value > 0 ? {
        c: common_vendor.t(formatCountdown.value)
      } : expired.value ? {} : {}, {
        d: expired.value,
        e: common_assets._imports_2,
        f: payType.value === "WECHAT" ? 1 : "",
        g: payType.value === "WECHAT" ? 1 : "",
        h: common_vendor.o(($event) => payType.value = "WECHAT"),
        i: common_assets._imports_3,
        j: common_vendor.t(walletBalance.value),
        k: payType.value === "BALANCE" ? 1 : "",
        l: payType.value === "BALANCE" ? 1 : "",
        m: common_vendor.o(($event) => payType.value = "BALANCE"),
        n: expired.value ? 1 : "",
        o: common_vendor.o(handlePay)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-69d8188c"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/order/pay.js.map
