"use strict";
const common_vendor = require("../../common/vendor.js");
const api_player = require("../../api/player.js");
const api_category = require("../../api/category.js");
const store_remind = require("../../store/remind.js");
if (!Math) {
  (OrderCard + EmptyState + CustomTabBar)();
}
const CustomTabBar = () => "../../components/CustomTabBar.js";
const OrderCard = () => "../../components/OrderCard.js";
const EmptyState = () => "../../components/EmptyState.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const orders = common_vendor.ref([]);
    const remindStore = store_remind.useRemindStore();
    const categories = common_vendor.ref([]);
    const allCategories = common_vendor.ref([]);
    const categoryId = common_vendor.ref("");
    const pageNum = common_vendor.ref(1);
    const loading = common_vendor.ref(false);
    const finished = common_vendor.ref(false);
    function getCategoryIdsUnderMain(mainId) {
      const flat = allCategories.value;
      const ids = [mainId];
      function collect(pid) {
        flat.filter((c) => c.parentId == pid).forEach((c) => {
          ids.push(c.id);
          collect(c.id);
        });
      }
      collect(mainId);
      return ids;
    }
    common_vendor.onShow(async () => {
      try {
        common_vendor.index.hideHomeButton();
      } catch (_) {
      }
      remindStore.fetchPlayerRemind();
      if (!allCategories.value.length) {
        try {
          const res = await api_category.getAllCategories();
          const all = res.data || [];
          allCategories.value = all;
          categories.value = all.filter((c) => !c.parentId || c.parentId === 0 || c.parentId === "");
        } catch (e) {
        }
      }
      refresh();
    });
    common_vendor.onPullDownRefresh(async () => {
      await refresh();
      common_vendor.index.stopPullDownRefresh();
    });
    function commissionRateForOrder(order) {
      if (order != null && (order.commissionRate === 0 || order.commissionRate != null && order.commissionRate !== "")) {
        return Number(order.commissionRate);
      }
      return 0;
    }
    function commissionPercent(order) {
      return Math.round(commissionRateForOrder(order) * 100);
    }
    function incomeAmount(order) {
      const n = Number(order == null ? void 0 : order.amount) || 0;
      return n * (1 - commissionRateForOrder(order));
    }
    function filterCategory(id) {
      categoryId.value = id;
      refresh();
    }
    async function refresh() {
      pageNum.value = 1;
      orders.value = [];
      finished.value = false;
      await loadData();
    }
    async function loadData() {
      var _a;
      loading.value = true;
      const params = { pageNum: pageNum.value, pageSize: 10 };
      if (categoryId.value) {
        const ids = getCategoryIdsUnderMain(categoryId.value);
        params.categoryIds = ids.join(",");
      }
      const res = await api_player.getOrderHall(params);
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
    async function doAccept(id) {
      common_vendor.index.showModal({ title: "提示", content: "确定接受该订单？", success: async (r) => {
        if (r.confirm) {
          try {
            await api_player.acceptOrder(id);
            common_vendor.index.showToast({ title: "接单成功" });
            refresh();
          } catch (e) {
          }
        }
      } });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !categoryId.value ? 1 : "",
        b: common_vendor.o(($event) => filterCategory("")),
        c: common_vendor.f(categories.value, (c, k0, i0) => {
          return {
            a: common_vendor.t(c.name),
            b: c.id,
            c: categoryId.value === c.id ? 1 : "",
            d: common_vendor.o(($event) => filterCategory(c.id), c.id)
          };
        }),
        d: common_vendor.f(orders.value, (o, k0, i0) => {
          return {
            a: "0ea4865c-0-" + i0,
            b: common_vendor.p({
              order: o,
              ["detail-path"]: "/pages-player/order/detail",
              embed: true
            }),
            c: common_vendor.t(incomeAmount(o).toFixed(2)),
            d: common_vendor.t(commissionPercent(o)),
            e: common_vendor.o(($event) => doAccept(o.id), o.id),
            f: o.id
          };
        }),
        e: loading.value
      }, loading.value ? {} : {}, {
        f: !loading.value && orders.value.length === 0
      }, !loading.value && orders.value.length === 0 ? {
        g: common_vendor.p({
          text: "暂无可接订单",
          image: "/static/icons/暂无项目.svg"
        })
      } : {}, {
        h: common_vendor.o(loadMore),
        i: common_vendor.p({
          current: 0
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0ea4865c"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages-player/hall/index.js.map
