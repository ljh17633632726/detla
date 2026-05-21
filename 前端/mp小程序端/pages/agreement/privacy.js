"use strict";
const common_vendor = require("../../common/vendor.js");
const store_site = require("../../store/site.js");
const _sfc_main = {
  __name: "privacy",
  setup(__props) {
    const siteStore = store_site.useSiteStore();
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(siteStore).fullName),
        b: common_vendor.t(common_vendor.unref(siteStore).fullName)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d015f332"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/agreement/privacy.js.map
