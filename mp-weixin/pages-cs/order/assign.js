"use strict";
const common_vendor = require("../../common/vendor.js");
const pagesCs_api_cs = require("../api/cs.js");
if (!Math) {
  EmptyState();
}
const EmptyState = () => "../../components/EmptyState.js";
const _sfc_main = {
  __name: "assign",
  setup(__props) {
    const orderId = common_vendor.ref("");
    const keyword = common_vendor.ref("");
    const players = common_vendor.ref([]);
    const pageNum = common_vendor.ref(1);
    const loading = common_vendor.ref(false);
    const maxConcurrent = common_vendor.ref(5);
    common_vendor.onLoad((opts) => {
      orderId.value = opts.orderId;
      loadData();
    });
    function isFull(p) {
      return (p.activeOrders || 0) >= maxConcurrent.value;
    }
    function searchPlayers() {
      pageNum.value = 1;
      players.value = [];
      loadData();
    }
    async function loadData() {
      loading.value = true;
      try {
        const params = { pageNum: pageNum.value, pageSize: 20 };
        if (keyword.value)
          params.keyword = keyword.value;
        const res = await pagesCs_api_cs.getCsPlayerAssignList(params);
        const data = res.data || {};
        const page = data.players || {};
        const list = page.records || [];
        players.value = pageNum.value === 1 ? list : [...players.value, ...list];
        if (data.maxConcurrent != null)
          maxConcurrent.value = data.maxConcurrent;
      } catch (e) {
      } finally {
        loading.value = false;
      }
    }
    function loadMore() {
      if (!loading.value) {
        pageNum.value++;
        loadData();
      }
    }
    function doAssign(p) {
      if (isFull(p)) {
        common_vendor.index.showModal({
          title: "无法指派",
          content: `${p.nickname} 当前已有 ${p.activeOrders || 0} 个进行中订单，已达最大接单数 ${maxConcurrent.value}`,
          showCancel: false
        });
        return;
      }
      const activeInfo = (p.activeOrders || 0) > 0 ? `
该接单员当前有 ${p.activeOrders} 个进行中订单` : "";
      common_vendor.index.showModal({
        title: "确认指派",
        content: `确定将订单指派给 ${p.nickname}？${activeInfo}`,
        success: async (r) => {
          var _a;
          if (r.confirm) {
            try {
              await pagesCs_api_cs.assignOrder(orderId.value, p.id);
              common_vendor.index.showToast({ title: "指派成功" });
              setTimeout(() => common_vendor.index.navigateBack(), 1500);
            } catch (e) {
              const msg = ((_a = e == null ? void 0 : e.data) == null ? void 0 : _a.msg) || (e == null ? void 0 : e.msg) || "指派失败";
              common_vendor.index.showToast({ title: msg, icon: "none" });
            }
          }
        }
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(maxConcurrent.value),
        b: common_vendor.o(searchPlayers),
        c: keyword.value,
        d: common_vendor.o(($event) => keyword.value = $event.detail.value),
        e: common_vendor.o(searchPlayers),
        f: common_vendor.f(players.value, (p, k0, i0) => {
          return common_vendor.e({
            a: p.avatar || "/static/images/default-avatar.png",
            b: common_vendor.t(p.nickname),
            c: isFull(p)
          }, isFull(p) ? {} : {}, {
            d: p.avgRating
          }, p.avgRating ? {
            e: common_vendor.t(Number(p.avgRating).toFixed(1))
          } : {}, {
            f: common_vendor.t(p.completedOrders || 0),
            g: common_vendor.t(p.activeOrders || 0),
            h: common_vendor.n((p.activeOrders || 0) > 0 ? "active-tag" : ""),
            i: isFull(p) ? 1 : "",
            j: common_vendor.o(($event) => doAssign(p), p.id),
            k: p.id,
            l: isFull(p) ? 1 : ""
          });
        }),
        g: common_vendor.t(maxConcurrent.value),
        h: loading.value
      }, loading.value ? {} : {}, {
        i: !loading.value && players.value.length === 0
      }, !loading.value && players.value.length === 0 ? {
        j: common_vendor.p({
          text: "暂无可用接单员",
          image: "/static/icons/暂无项目.svg"
        })
      } : {}, {
        k: common_vendor.o(loadMore)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-53a426cc"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages-cs/order/assign.js.map
