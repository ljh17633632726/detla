"use strict";
const common_vendor = require("../common/vendor.js");
const store_app = require("../store/app.js");
const store_chat = require("../store/chat.js");
const store_remind = require("../store/remind.js");
const utils_role = require("../utils/role.js");
const _sfc_main = {
  __name: "CustomTabBar",
  props: {
    current: { type: Number, default: 0 }
  },
  setup(__props) {
    const props = __props;
    const appStore = store_app.useAppStore();
    const chatStore = store_chat.useChatStore();
    const remindStore = store_remind.useRemindStore();
    const currentIndex = common_vendor.ref(props.current);
    const safeBottom = common_vendor.ref(0);
    const currentTabs = common_vendor.computed(() => utils_role.ROLE_TABS[appStore.role] || utils_role.ROLE_TABS.user);
    const mineRedDot = common_vendor.computed(() => {
      const role = appStore.role;
      if (role === "user")
        return (chatStore.messageUnreadCount || 0) > 0;
      return (remindStore.systemUnread || 0) > 0;
    });
    function badgeCount(tab) {
      const role = appStore.role;
      if (tab.text === "消息") {
        if (role === "user")
          return chatStore.totalUnreadCount;
        if (role === "cs" || role === "player")
          return remindStore.messageUnread;
      }
      if (role === "cs" && tab.text === "投诉")
        return remindStore.complaintUnread;
      return 0;
    }
    common_vendor.onMounted(() => {
      var _a;
      const windowInfo = common_vendor.index.getWindowInfo();
      safeBottom.value = ((_a = windowInfo.safeAreaInsets) == null ? void 0 : _a.bottom) || 0;
    });
    const TAB_BAR_PAGES = [
      "/pages/index/index",
      "/pages/category/index",
      "/pages/order/list",
      "/pages/chat/list",
      "/pages/mine/index"
    ];
    function switchTab(tab, index) {
      if (currentIndex.value === index)
        return;
      if (TAB_BAR_PAGES.includes(tab.pagePath)) {
        common_vendor.index.switchTab({ url: tab.pagePath });
      } else {
        common_vendor.index.redirectTo({ url: tab.pagePath });
      }
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(currentTabs.value, (tab, index, i0) => {
          return common_vendor.e({
            a: currentIndex.value === index ? tab.iconActive : tab.icon,
            b: tab.text !== "我的" && badgeCount(tab) > 0
          }, tab.text !== "我的" && badgeCount(tab) > 0 ? {
            c: common_vendor.t(badgeCount(tab) > 99 ? "99+" : badgeCount(tab))
          } : {}, {
            d: tab.text === "我的" && mineRedDot.value
          }, tab.text === "我的" && mineRedDot.value ? {} : {}, {
            e: common_vendor.t(tab.text),
            f: tab.pagePath,
            g: currentIndex.value === index ? 1 : "",
            h: common_vendor.o(($event) => switchTab(tab, index), tab.pagePath)
          });
        }),
        b: safeBottom.value + "px"
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6def6a3b"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/CustomTabBar.js.map
