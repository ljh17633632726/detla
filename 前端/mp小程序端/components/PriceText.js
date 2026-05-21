"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  __name: "PriceText",
  props: {
    value: { type: [Number, String], default: 0 },
    size: { type: Number, default: 32 },
    color: { type: String, default: "#ff6b2b" }
  },
  setup(__props) {
    const props = __props;
    const formatValue = common_vendor.computed(() => Number(props.value || 0).toFixed(2));
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(formatValue.value),
        b: __props.size + "rpx",
        c: __props.color
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f0eab2cc"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/PriceText.js.map
