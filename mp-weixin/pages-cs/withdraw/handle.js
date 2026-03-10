"use strict";
const common_vendor = require("../../common/vendor.js");
const pagesCs_api_cs = require("../api/cs.js");
const _sfc_main = {
  __name: "handle",
  setup(__props) {
    const STATUS_TEXT = { PENDING: "待审核", APPROVED: "已通过", REJECTED: "已拒绝", COMPLETED: "已到账" };
    const detail = common_vendor.ref(null);
    const withdrawId = common_vendor.ref("");
    const rejectReason = common_vendor.ref("");
    const statusClass = common_vendor.computed(() => {
      var _a;
      const map = { PENDING: "pending", APPROVED: "approved", COMPLETED: "completed", REJECTED: "rejected" };
      return map[(_a = detail.value) == null ? void 0 : _a.status] || "";
    });
    common_vendor.onLoad(async (opts) => {
      withdrawId.value = opts.id;
      const res = await pagesCs_api_cs.getCsWithdrawDetail(opts.id);
      detail.value = res.data;
    });
    async function doApprove() {
      common_vendor.index.showModal({ title: "确认", content: "确定通过该提现申请？", success: async (r) => {
        if (r.confirm) {
          try {
            await pagesCs_api_cs.approveCsWithdraw(withdrawId.value);
            common_vendor.index.showToast({ title: "已通过" });
            setTimeout(() => common_vendor.index.navigateBack(), 1500);
          } catch (e) {
          }
        }
      } });
    }
    async function doReject() {
      if (!rejectReason.value)
        return common_vendor.index.showToast({ title: "请输入拒绝原因", icon: "none" });
      common_vendor.index.showModal({ title: "确认", content: "确定拒绝该提现申请？", success: async (r) => {
        if (r.confirm) {
          try {
            await pagesCs_api_cs.rejectCsWithdraw(withdrawId.value, { reason: rejectReason.value });
            common_vendor.index.showToast({ title: "已拒绝" });
            setTimeout(() => common_vendor.index.navigateBack(), 1500);
          } catch (e) {
          }
        }
      } });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: detail.value
      }, detail.value ? common_vendor.e({
        b: common_vendor.t(STATUS_TEXT[detail.value.status] || detail.value.status),
        c: common_vendor.n(statusClass.value),
        d: common_vendor.t(Number(detail.value.amount).toFixed(2)),
        e: common_vendor.t(detail.value.playerNickname || detail.value.playerId),
        f: common_vendor.t(detail.value.accountType === "ALIPAY" ? "支付宝" : detail.value.accountType === "WECHAT" ? "微信" : "银行卡"),
        g: common_vendor.t(detail.value.accountNo || "-"),
        h: detail.value.realName
      }, detail.value.realName ? {
        i: common_vendor.t(detail.value.realName)
      } : {}, {
        j: common_vendor.t(detail.value.createdAt),
        k: detail.value.remark
      }, detail.value.remark ? {
        l: common_vendor.t(detail.value.remark)
      } : {}, {
        m: detail.value.status === "PENDING"
      }, detail.value.status === "PENDING" ? {
        n: rejectReason.value,
        o: common_vendor.o(($event) => rejectReason.value = $event.detail.value),
        p: common_vendor.o(doApprove),
        q: common_vendor.o(doReject)
      } : {}, {
        r: detail.value.rejectReason
      }, detail.value.rejectReason ? {
        s: common_vendor.t(detail.value.rejectReason)
      } : {}) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5b97c1bb"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages-cs/withdraw/handle.js.map
