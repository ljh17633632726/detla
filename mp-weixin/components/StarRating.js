"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  __name: "StarRating",
  props: {
    modelValue: { type: Number, default: 0 },
    readonly: { type: Boolean, default: false },
    showText: { type: Boolean, default: false },
    size: { type: Number, default: 36 }
  },
  emits: ["update:modelValue"],
  setup(__props) {
    const props = __props;
    const currentValue = common_vendor.computed(() => props.modelValue || 0);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(5, (i, k0, i0) => {
          return {
            a: i,
            b: i <= currentValue.value ? 1 : "",
            c: i - 0.5 === currentValue.value ? 1 : "",
            d: common_vendor.o(($event) => !__props.readonly && _ctx.$emit("update:modelValue", i), i)
          };
        }),
        b: __props.showText
      }, __props.showText ? {
        c: common_vendor.t(currentValue.value.toFixed(1))
      } : {}, {
        d: __props.readonly ? 1 : ""
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-99c21569"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/StarRating.js.map
