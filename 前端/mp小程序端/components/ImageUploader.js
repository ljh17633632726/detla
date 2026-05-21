"use strict";
const common_vendor = require("../common/vendor.js");
const api_file = require("../api/file.js");
const _sfc_main = {
  __name: "ImageUploader",
  props: {
    modelValue: { type: Array, default: () => [] },
    max: { type: Number, default: 9 }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    async function chooseImage() {
      const remain = props.max - props.modelValue.length;
      if (remain <= 0)
        return;
      try {
        const urls = await api_file.chooseAndUpload(remain);
        emit("update:modelValue", [...props.modelValue, ...urls]);
      } catch (e) {
        common_vendor.index.__f__("error", "at components/ImageUploader.vue:31", "upload failed", e);
      }
    }
    function removeImage(index) {
      const list = [...props.modelValue];
      list.splice(index, 1);
      emit("update:modelValue", list);
    }
    function previewImage(index) {
      common_vendor.index.previewImage({
        urls: props.modelValue,
        current: index
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(__props.modelValue, (img, index, i0) => {
          return {
            a: img,
            b: common_vendor.o(($event) => previewImage(index), index),
            c: common_vendor.o(($event) => removeImage(index), index),
            d: index
          };
        }),
        b: __props.modelValue.length < __props.max
      }, __props.modelValue.length < __props.max ? {
        c: common_vendor.o(chooseImage)
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7bd1ddd2"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/ImageUploader.js.map
