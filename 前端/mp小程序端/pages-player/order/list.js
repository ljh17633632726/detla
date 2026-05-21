"use strict";
const common_vendor = require("../../common/vendor.js");
const api_player = require("../../api/player.js");
const utils_constants = require("../../utils/constants.js");
if (!Math) {
  (OrderCard + EmptyState + CustomTabBar)();
}
const CustomTabBar = () => "../../components/CustomTabBar.js";
const OrderCard = () => "../../components/OrderCard.js";
const EmptyState = () => "../../components/EmptyState.js";
const _sfc_main = {
  __name: "list",
  setup(__props) {
    const tabs = utils_constants.PLAYER_ORDER_TABS;
    const currentTab = common_vendor.ref("");
    const orders = common_vendor.ref([]);
    const pageNum = common_vendor.ref(1);
    const loading = common_vendor.ref(false);
    const finished = common_vendor.ref(false);
    common_vendor.onShow(() => {
      try {
        common_vendor.index.hideHomeButton();
      } catch (_) {
      }
      refresh();
    });
    function switchTab(val) {
      currentTab.value = val;
      refresh();
    }
    function refresh() {
      pageNum.value = 1;
      orders.value = [];
      finished.value = false;
      loadData();
    }
    async function loadData() {
      var _a;
      loading.value = true;
      const res = await api_player.getMyWork({ pageNum: pageNum.value, pageSize: 10, status: currentTab.value });
      const list = ((_a = res.data) == null ? void 0 : _a.records) || [];
      if (list.length < 10)
        finished.value = true;
      orders.value = pageNum.value === 1 ? list : [...orders.value, ...list];
      loading.value = false;
    }
    function loadMore() {
      if (!loading.value && !finished.value) {
        pageNum.value++;
        loadData();
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(common_vendor.unref(tabs), (tab, k0, i0) => {
          return {
            a: common_vendor.t(tab.label),
            b: tab.value,
            c: currentTab.value === tab.value ? 1 : "",
            d: common_vendor.o(($event) => switchTab(tab.value), tab.value)
          };
        }),
        b: common_vendor.f(orders.value, (o, k0, i0) => {
          return {
            a: o.id,
            b: "790a0bd3-0-" + i0,
            c: common_vendor.p({
              order: o,
              ["detail-path"]: "/pages-player/order/detail"
            })
          };
        }),
        c: !loading.value && orders.value.length === 0
      }, !loading.value && orders.value.length === 0 ? {
        d: common_vendor.p({
          text: "暂无订单",
          image: "/static/icons/暂无纪录.svg"
        })
      } : {}, {
        e: common_vendor.o(loadMore),
        f: common_vendor.p({
          current: 1
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-790a0bd3"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages-player/order/list.js.map
