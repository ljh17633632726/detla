"use strict";
const common_vendor = require("../common/vendor.js");
const utils_constants = require("../utils/constants.js");
const _sfc_main = {
  __name: "ChatBubble",
  props: {
    msg: { type: Object, required: true },
    isSelf: { type: Boolean, default: false },
    avatar: { type: String, default: "" },
    selfAvatar: { type: String, default: "" },
    name: { type: String, default: "" },
    selfName: { type: String, default: "" }
  },
  setup(__props) {
    const props = __props;
    function firstChar(str) {
      if (!str || typeof str !== "string")
        return "?";
      const s = str.trim();
      return s.length ? s[0] : "?";
    }
    const cardData = common_vendor.computed(() => {
      if (props.msg.type === "PRODUCT" || props.msg.type === "ORDER") {
        try {
          return JSON.parse(props.msg.content);
        } catch {
          return {};
        }
      }
      return {};
    });
    const statusText = common_vendor.computed(() => {
      var _a, _b;
      return utils_constants.ORDER_STATUS_TEXT[(_a = cardData.value) == null ? void 0 : _a.status] || ((_b = cardData.value) == null ? void 0 : _b.status) || "";
    });
    function previewImage() {
      common_vendor.index.previewImage({ urls: [props.msg.content], current: 0 });
    }
    function goProduct(d) {
      if (d == null ? void 0 : d.id)
        common_vendor.index.navigateTo({ url: "/pages/product/detail?id=" + d.id });
    }
    function goOrder(d) {
      if (d == null ? void 0 : d.id)
        common_vendor.index.navigateTo({ url: "/pages/order/detail?id=" + d.id });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.isSelf && __props.selfAvatar
      }, __props.isSelf && __props.selfAvatar ? {
        b: __props.selfAvatar
      } : __props.isSelf ? {
        d: common_vendor.t(firstChar(__props.selfName))
      } : __props.avatar ? {
        f: __props.avatar
      } : {
        g: common_vendor.t(firstChar(__props.name))
      }, {
        c: __props.isSelf,
        e: __props.avatar,
        h: __props.msg.type === "TEXT"
      }, __props.msg.type === "TEXT" ? {
        i: common_vendor.t(__props.msg.content)
      } : __props.msg.type === "IMAGE" ? {
        k: __props.msg.content,
        l: common_vendor.o(previewImage)
      } : __props.msg.type === "PRODUCT" ? {
        n: cardData.value.coverImage || cardData.value.image,
        o: common_vendor.t(cardData.value.name),
        p: common_vendor.t(Number(cardData.value.price || 0).toFixed(2)),
        q: common_vendor.o(($event) => goProduct(cardData.value))
      } : __props.msg.type === "ORDER" ? {
        s: common_vendor.t(cardData.value.productName || cardData.value.orderNo),
        t: common_vendor.t(Number(cardData.value.amount || 0).toFixed(2)),
        v: common_vendor.t(statusText.value),
        w: common_vendor.t(cardData.value.orderNo),
        x: common_vendor.o(($event) => goOrder(cardData.value))
      } : {
        y: common_vendor.t(__props.msg.content)
      }, {
        j: __props.msg.type === "IMAGE",
        m: __props.msg.type === "PRODUCT",
        r: __props.msg.type === "ORDER",
        z: __props.isSelf ? 1 : "",
        A: __props.isSelf ? 1 : ""
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-76b25565"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/ChatBubble.js.map
