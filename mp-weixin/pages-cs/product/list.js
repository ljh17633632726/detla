"use strict";
const common_vendor = require("../../common/vendor.js");
const pagesCs_api_cs = require("../api/cs.js");
if (!Math) {
  EmptyState();
}
const EmptyState = () => "../../components/EmptyState.js";
const _sfc_main = {
  __name: "list",
  setup(__props) {
    const keyword = common_vendor.ref("");
    const products = common_vendor.ref([]);
    const pageNum = common_vendor.ref(1);
    const loading = common_vendor.ref(false);
    const finished = common_vendor.ref(false);
    common_vendor.onShow(() => {
      refresh();
    });
    function refresh() {
      pageNum.value = 1;
      products.value = [];
      finished.value = false;
      loadData();
    }
    async function loadData() {
      var _a;
      loading.value = true;
      const params = { pageNum: pageNum.value, pageSize: 20 };
      if (keyword.value)
        params.keyword = keyword.value;
      const res = await pagesCs_api_cs.getCsProductList(params);
      const list = ((_a = res.data) == null ? void 0 : _a.records) || [];
      if (list.length < 20)
        finished.value = true;
      products.value = pageNum.value === 1 ? list : [...products.value, ...list];
      loading.value = false;
    }
    function loadMore() {
      if (!loading.value && !finished.value) {
        pageNum.value++;
        loadData();
      }
    }
    function goAdd() {
      common_vendor.index.navigateTo({ url: "/pages-cs/product/edit" });
    }
    function goEdit(id) {
      common_vendor.index.navigateTo({ url: "/pages-cs/product/edit?id=" + id });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(refresh),
        b: keyword.value,
        c: common_vendor.o(($event) => keyword.value = $event.detail.value),
        d: common_vendor.o(goAdd),
        e: common_vendor.f(products.value, (p, k0, i0) => {
          return {
            a: p.coverImage || p.image,
            b: common_vendor.t(p.name),
            c: common_vendor.t(Number(p.price || p.minPrice || 0).toFixed(2)),
            d: common_vendor.t(p.sales || 0),
            e: common_vendor.t(p.status === "ON" ? "上架" : "下架"),
            f: common_vendor.n(p.status === "ON" ? "on" : "off"),
            g: p.id,
            h: common_vendor.o(($event) => goEdit(p.id), p.id)
          };
        }),
        f: loading.value
      }, loading.value ? {} : {}, {
        g: !loading.value && products.value.length === 0
      }, !loading.value && products.value.length === 0 ? {
        h: common_vendor.o(goAdd),
        i: common_vendor.p({
          text: "暂无商品",
          image: "/static/icons/购物车空空如也.svg",
          ["button-text"]: "添加商品"
        })
      } : {}, {
        j: common_vendor.o(loadMore)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-352a4a3f"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages-cs/product/list.js.map
