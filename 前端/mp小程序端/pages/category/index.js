"use strict";
const common_vendor = require("../../common/vendor.js");
const api_category = require("../../api/category.js");
const api_product = require("../../api/product.js");
const composables_useGoldDust = require("../../composables/useGoldDust.js");
if (!Math) {
  CustomTabBar();
}
const CustomTabBar = () => "../../components/CustomTabBar.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    composables_useGoldDust.useGoldDust();
    const categoryTree = common_vendor.ref([]);
    const selectedParentId = common_vendor.ref(0);
    const selectedChildId = common_vendor.ref(0);
    const loading = common_vendor.ref(false);
    const products = common_vendor.ref([]);
    const productLoading = common_vendor.ref(false);
    const productFinished = common_vendor.ref(false);
    const productPageNum = common_vendor.ref(1);
    const parentCategories = common_vendor.computed(() => categoryTree.value);
    const currentChildren = common_vendor.computed(() => {
      const parent = categoryTree.value.find((c) => c.id === selectedParentId.value);
      return (parent == null ? void 0 : parent.children) || [];
    });
    const queryCategoryId = common_vendor.computed(() => {
      if (selectedChildId.value)
        return selectedChildId.value;
      return null;
    });
    const queryParentCategoryId = common_vendor.computed(() => {
      if (!selectedChildId.value && selectedParentId.value)
        return selectedParentId.value;
      return null;
    });
    const inited = common_vendor.ref(false);
    common_vendor.onShow(async () => {
      const storedId = common_vendor.index.getStorageSync("selectedCategoryId");
      if (storedId)
        common_vendor.index.removeStorageSync("selectedCategoryId");
      if (!inited.value) {
        loading.value = true;
        try {
          const res = await api_category.getCategoryTree();
          const tree = res.data || [];
          categoryTree.value = tree;
          if (storedId) {
            applyStoredId(tree, Number(storedId));
          } else if (tree.length > 0) {
            selectedParentId.value = tree[0].id;
          }
        } catch (e) {
          categoryTree.value = [];
        }
        loading.value = false;
        inited.value = true;
        refreshProducts();
      } else if (storedId) {
        applyStoredId(categoryTree.value, Number(storedId));
        refreshProducts();
      }
    });
    function applyStoredId(tree, id) {
      const isParent = tree.some((c) => c.id === id);
      if (isParent) {
        selectedParentId.value = id;
        selectedChildId.value = 0;
      } else {
        for (const p of tree) {
          const child = (p.children || []).find((c) => c.id === id);
          if (child) {
            selectedParentId.value = p.id;
            selectedChildId.value = child.id;
            break;
          }
        }
      }
    }
    function selectParent(c) {
      selectedParentId.value = c.id;
      selectedChildId.value = 0;
      refreshProducts();
    }
    function selectChild(childId) {
      selectedChildId.value = childId;
      refreshProducts();
    }
    function refreshProducts() {
      productPageNum.value = 1;
      products.value = [];
      productFinished.value = false;
      loadProducts();
    }
    async function loadProducts() {
      var _a, _b;
      if (productLoading.value)
        return;
      productLoading.value = true;
      try {
        const params = { pageNum: productPageNum.value, pageSize: 10 };
        if (queryCategoryId.value) {
          params.categoryId = queryCategoryId.value;
        } else if (queryParentCategoryId.value) {
          params.parentCategoryId = queryParentCategoryId.value;
        }
        const res = await api_product.getProductList(params);
        const list = ((_a = res.data) == null ? void 0 : _a.records) || ((_b = res.data) == null ? void 0 : _b.rows) || [];
        if (list.length < 10)
          productFinished.value = true;
        products.value = productPageNum.value === 1 ? list : [...products.value, ...list];
      } catch (e) {
        products.value = productPageNum.value === 1 ? [] : products.value;
      }
      productLoading.value = false;
    }
    function goProductDetail(id) {
      common_vendor.index.navigateTo({ url: `/pages/product/detail?id=${id}` });
    }
    function loadMoreProducts() {
      if (!productLoading.value && !productFinished.value) {
        productPageNum.value++;
        loadProducts();
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(parentCategories.value, (c, k0, i0) => {
          return {
            a: common_vendor.t(c.name),
            b: c.id,
            c: selectedParentId.value === c.id ? 1 : "",
            d: common_vendor.o(($event) => selectParent(c), c.id)
          };
        }),
        b: selectedChildId.value === 0 ? 1 : "",
        c: common_vendor.o(($event) => selectChild(0)),
        d: common_vendor.f(currentChildren.value, (child, k0, i0) => {
          return {
            a: common_vendor.t(child.name),
            b: child.id,
            c: selectedChildId.value === child.id ? 1 : "",
            d: common_vendor.o(($event) => selectChild(child.id), child.id)
          };
        }),
        e: common_vendor.f(products.value, (p, k0, i0) => {
          return common_vendor.e({
            a: p.coverImage,
            b: common_vendor.t(p.name),
            c: p.subtitle
          }, p.subtitle ? {
            d: common_vendor.t(p.subtitle)
          } : {}, {
            e: common_vendor.t(Number(p.price || 0).toFixed(2)),
            f: p.id,
            g: common_vendor.o(($event) => goProductDetail(p.id), p.id)
          });
        }),
        f: productLoading.value
      }, productLoading.value ? {} : {}, {
        g: !productLoading.value && products.value.length === 0
      }, !productLoading.value && products.value.length === 0 ? {} : {}, {
        h: productFinished.value && products.value.length > 0
      }, productFinished.value && products.value.length > 0 ? {} : {}, {
        i: common_vendor.o(loadMoreProducts),
        j: common_vendor.p({
          current: 1
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3cdc7548"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/category/index.js.map
