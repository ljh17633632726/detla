"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_product = require("../../api/product.js");
const api_chat = require("../../api/chat.js");
const store_user = require("../../store/user.js");
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const userStore = store_user.useUserStore();
    const product = common_vendor.ref(null);
    const swiperIdx = common_vendor.ref(0);
    common_vendor.onShareAppMessage(() => {
      const p = product.value;
      if (!p)
        return { title: "服务", path: "/pages/index/index" };
      return {
        title: p.name + " ¥" + Number(p.price || 0).toFixed(2),
        path: "/pages/product/detail?id=" + p.id,
        imageUrl: p.coverImage || p.image || ""
      };
    });
    common_vendor.onShareTimeline(() => {
      const p = product.value;
      if (!p)
        return { title: "服务" };
      return {
        title: p.name + " ¥" + Number(p.price || 0).toFixed(2),
        query: "id=" + p.id,
        imageUrl: p.coverImage || p.image || ""
      };
    });
    const priceInt = common_vendor.computed(() => {
      var _a;
      const p = Number(((_a = product.value) == null ? void 0 : _a.price) || 0).toFixed(2);
      return p.split(".")[0];
    });
    const priceDec = common_vendor.computed(() => {
      var _a;
      const p = Number(((_a = product.value) == null ? void 0 : _a.price) || 0).toFixed(2);
      return p.split(".")[1];
    });
    const images = common_vendor.computed(() => {
      if (!product.value)
        return [];
      const raw = product.value.images;
      if (!raw)
        return [product.value.coverImage || product.value.image];
      try {
        const arr = JSON.parse(raw);
        if (Array.isArray(arr))
          return arr;
      } catch {
      }
      return raw.split(",").filter(Boolean);
    });
    function previewImg(idx) {
      common_vendor.index.previewImage({ urls: images.value, current: idx });
    }
    common_vendor.onLoad(async (opts) => {
      try {
        const res = await api_product.getProductRichDetail(opts.id);
        const d = res.data;
        product.value = d.product || d;
        if (d.categoryName)
          product.value.categoryName = d.categoryName;
      } catch (e) {
        const basic = await api_product.getProductDetail(opts.id);
        product.value = basic.data;
      }
    });
    async function goChat() {
      if (!userStore.checkLogin())
        return;
      try {
        const res = await api_chat.createCsSession();
        const session = res.data;
        const p = product.value;
        const content = JSON.stringify({ id: p.id, name: p.name, price: p.price, coverImage: p.coverImage || p.image });
        await api_chat.sendChatMessage({ sessionId: session.id, type: "PRODUCT", content });
        common_vendor.index.navigateTo({ url: "/pages/chat/room?sessionId=" + session.id + "&name=" + encodeURIComponent("在线客服") });
      } catch (e) {
        common_vendor.index.showToast({ title: (e == null ? void 0 : e.msg) || "连接客服失败", icon: "none" });
      }
    }
    function goBuy() {
      var _a;
      const price = ((_a = product.value) == null ? void 0 : _a.price) || 0;
      const name = encodeURIComponent(product.value.name);
      common_vendor.index.navigateTo({ url: `/pages/order/create?productId=${product.value.id}&amount=${price}&productName=${name}` });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: product.value
      }, product.value ? common_vendor.e({
        b: common_vendor.f(images.value, (img, i, i0) => {
          return {
            a: img,
            b: common_vendor.o(($event) => previewImg(i), i),
            c: i
          };
        }),
        c: swiperIdx.value,
        d: common_vendor.o((e) => swiperIdx.value = e.detail.current),
        e: images.value.length > 1
      }, images.value.length > 1 ? {
        f: common_vendor.f(images.value, (img, i, i0) => {
          return {
            a: i,
            b: swiperIdx.value === i ? 1 : ""
          };
        })
      } : {}, {
        g: common_vendor.t(swiperIdx.value + 1),
        h: common_vendor.t(images.value.length),
        i: common_vendor.t(priceInt.value),
        j: common_vendor.t(priceDec.value),
        k: product.value.perUserLimitEnabled === 1 && product.value.perUserLimitCount
      }, product.value.perUserLimitEnabled === 1 && product.value.perUserLimitCount ? {
        l: common_vendor.t(product.value.perUserLimitCount)
      } : {}, {
        m: common_vendor.t(product.value.name),
        n: product.value.subtitle
      }, product.value.subtitle ? {
        o: common_vendor.t(product.value.subtitle)
      } : {}, {
        p: product.value.categoryName
      }, product.value.categoryName ? {
        q: common_vendor.t(product.value.categoryName)
      } : {}, {
        r: product.value.description
      }, product.value.description ? {
        s: common_vendor.t(product.value.description)
      } : {}, {
        t: product.value.detail
      }, product.value.detail ? {
        v: product.value.detail
      } : {}, {
        w: common_assets._imports_3,
        x: common_vendor.o(goChat),
        y: common_vendor.o(goBuy)
      }) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-acf502d9"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/product/detail.js.map
