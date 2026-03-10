"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const pagesCs_api_cs = require("../api/cs.js");
const store_remind = require("../../store/remind.js");
if (!Math) {
  CustomTabBar();
}
const CustomTabBar = () => "../../components/CustomTabBar.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const data = common_vendor.ref({});
    const remindStore = store_remind.useRemindStore();
    const pendingOrders = common_vendor.computed(() => {
      const list = data.value.pendingOrders;
      return Array.isArray(list) ? list : [];
    });
    common_vendor.onShow(async () => {
      try {
        const res = await pagesCs_api_cs.getDashboard();
        data.value = res.data || {};
      } catch (e) {
      }
      remindStore.fetchCsRemind();
    });
    function go(url) {
      common_vendor.index.navigateTo({ url });
    }
    function formatAmount(v) {
      if (v == null)
        return "0.00";
      return Number(v).toFixed(2);
    }
    function formatTime(t) {
      if (!t)
        return "";
      return t.replace("T", " ").substring(5, 16);
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(data.value.pendingAssign || 0),
        b: common_vendor.o(($event) => go("/pages-cs/order/list")),
        c: common_vendor.t(data.value.pendingComplaints || 0),
        d: common_vendor.o(($event) => go("/pages-cs/complaint/list")),
        e: common_vendor.t(data.value.inProgress || 0),
        f: common_vendor.t(data.value.processingComplaints || 0),
        g: common_vendor.t(data.value.pendingChatSessions || 0),
        h: common_vendor.t(data.value.todayOrders || 0),
        i: common_vendor.t(data.value.todayCompleted || 0),
        j: common_vendor.t(formatAmount(data.value.todayAmount)),
        k: common_vendor.t(data.value.totalUsers || 0),
        l: common_vendor.t(data.value.totalPlayers || 0),
        m: common_vendor.t(data.value.activePlayers || 0),
        n: pendingOrders.value.length > 0
      }, pendingOrders.value.length > 0 ? {
        o: common_vendor.o(($event) => go("/pages-cs/order/list")),
        p: common_vendor.f(pendingOrders.value, (o, k0, i0) => {
          return {
            a: common_vendor.t(o.productName),
            b: common_vendor.t(o.amount),
            c: common_vendor.t(o.orderNo),
            d: common_vendor.t(formatTime(o.createdAt)),
            e: o.id,
            f: common_vendor.o(($event) => go("/pages-cs/order/detail?id=" + o.id), o.id)
          };
        })
      } : {}, {
        q: common_assets._imports_0$2,
        r: common_vendor.o(($event) => go("/pages-cs/order/list")),
        s: common_assets._imports_1$1,
        t: common_vendor.o(($event) => go("/pages-cs/complaint/list")),
        v: common_assets._imports_2$1,
        w: common_vendor.o(($event) => go("/pages-cs/player/list")),
        x: common_assets._imports_2$1,
        y: common_vendor.o(($event) => go("/pages-cs/relay/list")),
        z: common_vendor.p({
          current: 0
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d3a5be35"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages-cs/dashboard/index.js.map
