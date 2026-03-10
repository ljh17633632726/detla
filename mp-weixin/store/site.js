"use strict";
const common_vendor = require("../common/vendor.js");
const api_config = require("../api/config.js");
const useSiteStore = common_vendor.defineStore("site", () => {
  const siteName = common_vendor.ref("三角洲");
  const subtitle = common_vendor.ref("专业游戏平台");
  const logo = common_vendor.ref("");
  const adminTitle = common_vendor.ref("三角洲管理后台");
  const playerCommissionRate = common_vendor.ref(0);
  const fullName = common_vendor.computed(() => siteName.value + "平台");
  async function fetchSiteConfig() {
    try {
      const res = await api_config.getSiteConfig();
      const data = res.data || {};
      if (data.site_name)
        siteName.value = data.site_name;
      if (data.site_subtitle)
        subtitle.value = data.site_subtitle;
      if (data.site_logo)
        logo.value = data.site_logo;
      if (data.site_admin_title)
        adminTitle.value = data.site_admin_title;
      if (data.player_commission_rate !== void 0 && data.player_commission_rate !== null) {
        playerCommissionRate.value = Number(data.player_commission_rate) || 0;
      }
    } catch (e) {
      common_vendor.index.__f__("warn", "at store/site.js:28", "[SiteStore] fetch site config failed", e);
    }
  }
  return { siteName, subtitle, logo, adminTitle, playerCommissionRate, fullName, fetchSiteConfig };
});
exports.useSiteStore = useSiteStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/store/site.js.map
