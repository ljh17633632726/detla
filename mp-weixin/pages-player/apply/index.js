"use strict";
const common_vendor = require("../../common/vendor.js");
const api_player = require("../../api/player.js");
if (!Math) {
  ImageUploader();
}
const ImageUploader = () => "../../components/ImageUploader.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const form = common_vendor.reactive({ realName: "", phone: "", gameLevel: "", serviceTypes: "", skillTags: "" });
    const proofImages = common_vendor.ref([]);
    async function submit() {
      if (!form.realName || !form.phone)
        return common_vendor.index.showToast({ title: "请填写完整", icon: "none" });
      await api_player.applyPlayer({ ...form, proofImages: JSON.stringify(proofImages.value) });
      common_vendor.index.showToast({ title: "已提交，等待审核" });
      setTimeout(() => common_vendor.index.navigateBack(), 1500);
    }
    return (_ctx, _cache) => {
      return {
        a: form.realName,
        b: common_vendor.o(($event) => form.realName = $event.detail.value),
        c: form.phone,
        d: common_vendor.o(($event) => form.phone = $event.detail.value),
        e: form.gameLevel,
        f: common_vendor.o(($event) => form.gameLevel = $event.detail.value),
        g: form.serviceTypes,
        h: common_vendor.o(($event) => form.serviceTypes = $event.detail.value),
        i: form.skillTags,
        j: common_vendor.o(($event) => form.skillTags = $event.detail.value),
        k: common_vendor.o(($event) => proofImages.value = $event),
        l: common_vendor.p({
          max: 4,
          modelValue: proofImages.value
        }),
        m: common_vendor.o(submit)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c2070e8d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages-player/apply/index.js.map
