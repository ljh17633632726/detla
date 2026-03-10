"use strict";
const common_vendor = require("../../common/vendor.js");
const api_player = require("../../api/player.js");
if (!Math) {
  ImageUploader();
}
const ImageUploader = () => "../../components/ImageUploader.js";
const _sfc_main = {
  __name: "progress",
  setup(__props) {
    const orderId = common_vendor.ref(0);
    const content = common_vendor.ref("");
    const images = common_vendor.ref([]);
    common_vendor.onLoad((opts) => {
      orderId.value = opts.orderId;
    });
    async function submit() {
      if (!content.value)
        return common_vendor.index.showToast({ title: "请描述进度", icon: "none" });
      await api_player.submitWorkProgress(orderId.value, { content: content.value, images: images.value.join(",") });
      common_vendor.index.showToast({ title: "已提交" });
      setTimeout(() => common_vendor.index.navigateBack(), 1500);
    }
    return (_ctx, _cache) => {
      return {
        a: content.value,
        b: common_vendor.o(($event) => content.value = $event.detail.value),
        c: common_vendor.o(($event) => images.value = $event),
        d: common_vendor.p({
          max: 6,
          modelValue: images.value
        }),
        e: common_vendor.o(submit)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e2287179"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages-player/order/progress.js.map
