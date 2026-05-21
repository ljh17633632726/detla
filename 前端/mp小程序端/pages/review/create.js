"use strict";
const common_vendor = require("../../common/vendor.js");
const api_review = require("../../api/review.js");
if (!Math) {
  ImageUploader();
}
const ImageUploader = () => "../../components/ImageUploader.js";
const _sfc_main = {
  __name: "create",
  setup(__props) {
    const orderId = common_vendor.ref(0);
    const rating = common_vendor.ref(5);
    const content = common_vendor.ref("");
    const images = common_vendor.ref([]);
    common_vendor.onLoad((opts) => {
      orderId.value = opts.orderId;
    });
    async function submit() {
      if (!content.value)
        return common_vendor.index.showToast({ title: "请输入评价", icon: "none" });
      await api_review.addReview({ orderId: orderId.value, rating: rating.value, content: content.value, images: images.value.join(",") });
      common_vendor.index.showToast({ title: "评价成功" });
      setTimeout(() => common_vendor.index.navigateBack(), 1500);
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(5, (i, k0, i0) => {
          return {
            a: i,
            b: rating.value >= i ? 1 : "",
            c: common_vendor.o(($event) => rating.value = i, i)
          };
        }),
        b: content.value,
        c: common_vendor.o(($event) => content.value = $event.detail.value),
        d: common_vendor.o(($event) => images.value = $event),
        e: common_vendor.p({
          max: 3,
          modelValue: images.value
        }),
        f: common_vendor.o(submit)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6a700c41"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/review/create.js.map
