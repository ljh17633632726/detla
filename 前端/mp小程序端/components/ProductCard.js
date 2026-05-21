"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  __name: "ProductCard",
  props: {
    product: { type: Object, required: true },
    coverHeight: { type: Number, default: 340 },
    dense: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const displayPrice = common_vendor.computed(() => {
      return Number(props.product.price || 0).toFixed(2);
    });
    function goDetail() {
      common_vendor.index.navigateTo({ url: `/pages/product/detail?id=${props.product.id}` });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.product.coverImage,
        b: __props.coverHeight + "rpx",
        c: common_vendor.t(__props.product.name),
        d: __props.product.subtitle
      }, __props.product.subtitle ? {
        e: common_vendor.t(__props.product.subtitle)
      } : {}, {
        f: common_vendor.t(displayPrice.value),
        g: __props.dense ? 1 : "",
        h: common_vendor.o(goDetail)
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fe52aa40"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/ProductCard.js.map
