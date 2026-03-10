"use strict";
const common_vendor = require("../../common/vendor.js");
const pagesCs_api_cs = require("../api/cs.js");
if (!Math) {
  ImageUploader();
}
const ImageUploader = () => "../../components/ImageUploader.js";
const _sfc_main = {
  __name: "edit",
  setup(__props) {
    const isEdit = common_vendor.ref(false);
    const form = common_vendor.reactive({ id: "", name: "", subtitle: "", categoryId: "", price: "", description: "", status: "ON", coverImage: "", images: "" });
    const coverImages = common_vendor.ref([]);
    const productImages = common_vendor.ref([]);
    const categories = common_vendor.ref([]);
    const categoryIndex = common_vendor.ref(-1);
    const categoryNames = common_vendor.computed(() => categories.value.map((c) => c.name));
    const selectedCategoryName = common_vendor.computed(() => {
      var _a;
      return ((_a = categories.value.find((c) => c.id === form.categoryId)) == null ? void 0 : _a.name) || "";
    });
    common_vendor.onLoad(async (opts) => {
      var _a;
      try {
        const res = await pagesCs_api_cs.getCsCategoryList({ pageNum: 1, pageSize: 100 });
        categories.value = ((_a = res.data) == null ? void 0 : _a.records) || res.data || [];
      } catch (e) {
      }
      if (opts.id) {
        isEdit.value = true;
        try {
          const res = await pagesCs_api_cs.getCsProductDetail(opts.id);
          const data = res.data;
          if (data) {
            Object.assign(form, data);
            if (data.coverImage)
              coverImages.value = [data.coverImage];
            if (data.images)
              productImages.value = data.images.split(",");
            categoryIndex.value = categories.value.findIndex((c) => c.id === data.categoryId);
          }
        } catch (e) {
        }
      }
    });
    function onCategoryChange(e) {
      var _a;
      categoryIndex.value = e.detail.value;
      form.categoryId = ((_a = categories.value[e.detail.value]) == null ? void 0 : _a.id) || "";
    }
    async function doSave() {
      if (!form.name)
        return common_vendor.index.showToast({ title: "请输入名称", icon: "none" });
      if (!form.price)
        return common_vendor.index.showToast({ title: "请输入价格", icon: "none" });
      form.coverImage = coverImages.value[0] || "";
      form.images = productImages.value.join(",");
      form.price = Number(form.price);
      try {
        await pagesCs_api_cs.saveCsProduct(form);
        common_vendor.index.showToast({ title: "保存成功" });
        setTimeout(() => common_vendor.index.navigateBack(), 1500);
      } catch (e) {
      }
    }
    return (_ctx, _cache) => {
      return {
        a: form.name,
        b: common_vendor.o(($event) => form.name = $event.detail.value),
        c: form.subtitle,
        d: common_vendor.o(($event) => form.subtitle = $event.detail.value),
        e: common_vendor.t(selectedCategoryName.value || "请选择分类"),
        f: common_vendor.n(form.categoryId ? "" : "placeholder"),
        g: categoryIndex.value,
        h: categoryNames.value,
        i: common_vendor.o(onCategoryChange),
        j: form.price,
        k: common_vendor.o(($event) => form.price = $event.detail.value),
        l: common_vendor.o(($event) => coverImages.value = $event),
        m: common_vendor.p({
          max: 1,
          modelValue: coverImages.value
        }),
        n: common_vendor.o(($event) => productImages.value = $event),
        o: common_vendor.p({
          max: 6,
          modelValue: productImages.value
        }),
        p: form.description,
        q: common_vendor.o(($event) => form.description = $event.detail.value),
        r: form.status === "ON" ? 1 : "",
        s: common_vendor.o(($event) => form.status = "ON"),
        t: form.status === "OFF" ? 1 : "",
        v: common_vendor.o(($event) => form.status = "OFF"),
        w: common_vendor.o(doSave)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-583c92af"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages-cs/product/edit.js.map
