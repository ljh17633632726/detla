"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  __name: "EmptyState",
  props: {
    text: { type: String, default: "暂无数据" },
    image: { type: String, default: "/static/icons/空空如也.svg" },
    buttonText: { type: String, default: "" }
  },
  emits: ["action"],
  setup(__props) {
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.image
      }, __props.image ? {
        b: __props.image
      } : {}, {
        c: common_vendor.t(__props.text),
        d: __props.buttonText
      }, __props.buttonText ? {
        e: common_vendor.t(__props.buttonText),
        f: common_vendor.o(($event) => _ctx.$emit("action"))
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3454b0cd"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/EmptyState.js.map
