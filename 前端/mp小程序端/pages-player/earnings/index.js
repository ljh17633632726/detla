"use strict";
const common_vendor = require("../../common/vendor.js");
const api_player = require("../../api/player.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const summary = common_vendor.ref({});
    common_vendor.onShow(async () => {
      try {
        const res = await api_player.getEarningsSummary();
        summary.value = res.data || {};
      } catch (e) {
      }
    });
    function goDetail() {
      common_vendor.index.navigateTo({ url: "/pages-player/earnings/detail" });
    }
    function goWithdraw() {
      common_vendor.index.navigateTo({ url: "/pages-player/withdraw/index" });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(summary.value.totalIncome || "0.00"),
        b: common_vendor.t(summary.value.monthIncome || "0.00"),
        c: common_vendor.t(summary.value.weekIncome || "0.00"),
        d: common_vendor.t(summary.value.todayIncome || "0.00"),
        e: common_vendor.t(summary.value.totalOrders || 0),
        f: common_vendor.t(summary.value.monthOrders || 0),
        g: common_vendor.t(summary.value.avgOrderAmount || "0.00"),
        h: common_vendor.t(summary.value.completionRate || "0"),
        i: common_vendor.o(goDetail),
        j: common_vendor.o(goWithdraw)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ec6bdfb5"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages-player/earnings/index.js.map
