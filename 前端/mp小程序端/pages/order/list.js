"use strict";
const common_vendor = require("../../common/vendor.js");
const api_order = require("../../api/order.js");
const composables_useGoldDust = require("../../composables/useGoldDust.js");
if (!Math) {
  (OrderCard + EmptyState + CustomTabBar)();
}
const OrderCard = () => "../../components/OrderCard.js";
const EmptyState = () => "../../components/EmptyState.js";
const CustomTabBar = () => "../../components/CustomTabBar.js";
const _sfc_main = {
  __name: "list",
  setup(__props) {
    composables_useGoldDust.useGoldDust();
    const orders = common_vendor.ref([]);
    const pageNum = common_vendor.ref(1);
    const loading = common_vendor.ref(false);
    const finished = common_vendor.ref(false);
    const listHeight = common_vendor.ref(500);
    common_vendor.onShow(() => {
      try {
        const sys = common_vendor.index.getSystemInfoSync();
        const winHeight = sys.windowHeight || sys.screenHeight || 500;
        const tabBarH = 56;
        listHeight.value = Math.floor(Number(winHeight) - tabBarH);
      } catch (_) {
      }
      refresh();
    });
    function refresh() {
      pageNum.value = 1;
      finished.value = false;
      loadData();
    }
    async function loadData() {
      var _a;
      loading.value = true;
      const res = await api_order.getOrderList({ pageNum: pageNum.value, pageSize: 10 }, { loading: false });
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
        a: common_vendor.f(orders.value, (o, k0, i0) => {
          return {
            a: o.id,
            b: "456ecf67-0-" + i0,
            c: common_vendor.p({
              order: o
            })
          };
        }),
        b: loading.value
      }, loading.value ? {} : {}, {
        c: !loading.value && orders.value.length === 0
      }, !loading.value && orders.value.length === 0 ? {
        d: common_vendor.p({
          text: "暂无订单",
          image: "/static/icons/暂无纪录.svg"
        })
      } : {}, {
        e: listHeight.value + "px",
        f: common_vendor.o(loadMore),
        g: common_vendor.p({
          current: 2
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-456ecf67"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/order/list.js.map
