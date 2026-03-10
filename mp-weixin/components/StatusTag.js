"use strict";
const common_vendor = require("../common/vendor.js");
const utils_constants = require("../utils/constants.js");
const _sfc_main = {
  __name: "StatusTag",
  props: {
    status: { type: String, default: "" },
    textMap: { type: Object, default: () => utils_constants.ORDER_STATUS_TEXT },
    colorMap: { type: Object, default: () => utils_constants.ORDER_STATUS_COLOR }
  },
  setup(__props) {
    const props = __props;
    const statusText = common_vendor.computed(() => props.textMap[props.status] || props.status);
    const statusColor = common_vendor.computed(() => props.colorMap[props.status] || "#999");
    const statusBg = common_vendor.computed(() => {
      const c = props.colorMap[props.status] || "#999";
      return c + "1A";
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(statusText.value),
        b: statusColor.value,
        c: statusBg.value
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b93f6f4d"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/StatusTag.js.map
