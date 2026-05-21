"use strict";
const common_vendor = require("../../common/vendor.js");
const api_product = require("../../api/product.js");
if (!Math) {
  (ProductCard + EmptyState)();
}
const ProductCard = () => "../../components/ProductCard.js";
const EmptyState = () => "../../components/EmptyState.js";
const _sfc_main = {
  __name: "list",
  setup(__props) {
    const keyword = common_vendor.ref("");
    const products = common_vendor.ref([]);
    const pageNum = common_vendor.ref(1);
    const loading = common_vendor.ref(false);
    const finished = common_vendor.ref(false);
    const categoryId = common_vendor.ref("");
    const parentCategoryId = common_vendor.ref("");
    const autoFocus = common_vendor.ref(false);
    const currentSort = common_vendor.ref("");
    const sortAsc = common_vendor.ref(true);
    const sortOptions = [
      { label: "综合", value: "" },
      { label: "价格", value: "price" },
      { label: "销量", value: "sales" }
    ];
    common_vendor.onLoad((opts) => {
      if (opts.categoryId)
        categoryId.value = opts.categoryId;
      if (opts.parentCategoryId)
        parentCategoryId.value = opts.parentCategoryId;
      if (opts.keyword)
        keyword.value = opts.keyword;
      if (opts.focus)
        autoFocus.value = true;
      loadData();
    });
    function switchSort(val) {
      if (currentSort.value === val) {
        sortAsc.value = !sortAsc.value;
      } else {
        currentSort.value = val;
        sortAsc.value = val === "price";
      }
      refresh();
    }
    function doSearch() {
      refresh();
    }
    function refresh() {
      pageNum.value = 1;
      products.value = [];
      finished.value = false;
      loadData();
    }
    async function loadData() {
      var _a, _b;
      loading.value = true;
      const params = { pageNum: pageNum.value, pageSize: 10 };
      if (keyword.value)
        params.keyword = keyword.value;
      if (categoryId.value)
        params.categoryId = categoryId.value;
      if (parentCategoryId.value)
        params.parentCategoryId = parentCategoryId.value;
      if (currentSort.value) {
        params.orderBy = currentSort.value;
        params.orderDir = sortAsc.value ? "asc" : "desc";
      }
      const res = await api_product.getProductList(params);
      const list = ((_a = res.data) == null ? void 0 : _a.records) || ((_b = res.data) == null ? void 0 : _b.rows) || [];
      if (list.length < 10)
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
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(doSearch),
        b: autoFocus.value,
        c: keyword.value,
        d: common_vendor.o(($event) => keyword.value = $event.detail.value),
        e: common_vendor.f(sortOptions, (s, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(s.label),
            b: currentSort.value === s.value
          }, currentSort.value === s.value ? {
            c: common_vendor.t(sortAsc.value ? "↑" : "↓")
          } : {}, {
            d: s.value,
            e: currentSort.value === s.value ? 1 : "",
            f: common_vendor.o(($event) => switchSort(s.value), s.value)
          });
        }),
        f: common_vendor.f(products.value, (p, k0, i0) => {
          return {
            a: p.id,
            b: "e958a167-0-" + i0,
            c: common_vendor.p({
              product: p
            })
          };
        }),
        g: loading.value
      }, loading.value ? {} : {}, {
        h: !loading.value && products.value.length === 0
      }, !loading.value && products.value.length === 0 ? {
        i: common_vendor.p({
          text: "暂无商品",
          image: "/static/icons/购物车空空如也.svg"
        })
      } : {}, {
        j: common_vendor.o(loadMore)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e958a167"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/product/list.js.map
