"use strict";
const common_vendor = require("../../common/vendor.js");
const api_player = require("../../api/player.js");
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const WITHDRAW_STATUS_TEXT = { PENDING: "审核中", APPROVED: "已通过", REJECTED: "已拒绝", COMPLETED: "已到账", CANCELLED: "已取消" };
    const detail = common_vendor.ref(null);
    const statusClass = common_vendor.computed(() => {
      var _a;
      const map = { PENDING: "pending", APPROVED: "approved", COMPLETED: "completed", REJECTED: "rejected" };
      return map[(_a = detail.value) == null ? void 0 : _a.status] || "";
    });
    common_vendor.onLoad(async (opts) => {
      const res = await api_player.getWithdrawDetail(opts.id);
      detail.value = res.data;
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: detail.value
      }, detail.value ? common_vendor.e({
        b: common_vendor.t(WITHDRAW_STATUS_TEXT[detail.value.status] || detail.value.status),
        c: detail.value.rejectReason
      }, detail.value.rejectReason ? {
        d: common_vendor.t(detail.value.rejectReason)
      } : {}, {
        e: common_vendor.n(statusClass.value),
        f: common_vendor.t(Number(detail.value.amount).toFixed(2)),
        g: common_vendor.t(detail.value.withdrawNo || detail.value.id),
        h: common_vendor.t(detail.value.accountType === "ALIPAY" ? "支付宝" : detail.value.accountType === "WECHAT" ? "微信" : "银行卡"),
        i: common_vendor.t(detail.value.accountNo || "-"),
        j: detail.value.remark
      }, detail.value.remark ? {
        k: common_vendor.t(detail.value.remark)
      } : {}, {
        l: common_vendor.t(detail.value.createdAt),
        m: detail.value.processedAt
      }, detail.value.processedAt ? {
        n: common_vendor.t(detail.value.processedAt)
      } : {}) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5262a8ac"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages-player/withdraw/detail.js.map
