"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const store_app = require("./store/app.js");
const store_user = require("./store/user.js");
const store_chat = require("./store/chat.js");
const store_player = require("./store/player.js");
const store_site = require("./store/site.js");
const utils_auth = require("./utils/auth.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/category/index.js";
  "./pages/product/list.js";
  "./pages/product/detail.js";
  "./pages/order/create.js";
  "./pages/order/pay.js";
  "./pages/order/list.js";
  "./pages/order/detail.js";
  "./pages/review/create.js";
  "./pages/complaint/create.js";
  "./pages/complaint/detail.js";
  "./pages/complaint/list.js";
  "./pages/wallet/index.js";
  "./pages/mine/index.js";
  "./pages/mine/profile.js";
  "./pages/chat/list.js";
  "./pages/chat/room.js";
  "./pages/message/index.js";
  "./pages/agreement/user.js";
  "./pages/agreement/privacy.js";
  "./pages/login/index.js";
  "./pages-player/apply/index.js";
  "./pages-player/hall/index.js";
  "./pages-player/order/list.js";
  "./pages-player/order/detail.js";
  "./pages-player/order/progress.js";
  "./pages-player/invite/list.js";
  "./pages-player/invite/teammate.js";
  "./pages-player/chat/list.js";
  "./pages-player/chat/room.js";
  "./pages-player/earnings/index.js";
  "./pages-player/earnings/detail.js";
  "./pages-player/withdraw/index.js";
  "./pages-player/withdraw/list.js";
  "./pages-player/withdraw/detail.js";
  "./pages-player/account/list.js";
  "./pages-player/account/edit.js";
  "./pages-player/review/list.js";
  "./pages-player/mine/index.js";
  "./pages-cs/login/index.js";
  "./pages-cs/dashboard/index.js";
  "./pages-cs/order/list.js";
  "./pages-cs/order/detail.js";
  "./pages-cs/order/assign.js";
  "./pages-cs/complaint/list.js";
  "./pages-cs/relay/list.js";
  "./pages-cs/complaint/handle.js";
  "./pages-cs/user/list.js";
  "./pages-cs/player/list.js";
  "./pages-cs/player/audit.js";
  "./pages-cs/withdraw/list.js";
  "./pages-cs/withdraw/handle.js";
  "./pages-cs/product/list.js";
  "./pages-cs/product/edit.js";
  "./pages-cs/category/list.js";
  "./pages-cs/mine/index.js";
  "./pages-cs/profile/edit.js";
  "./pages-cs/chat/list.js";
  "./pages-cs/chat/room.js";
  "./pages-cs/quick-reply/index.js";
}
const _sfc_main = {
  __name: "App",
  setup(__props) {
    function shouldConnectChat() {
      const role = common_vendor.index.getStorageSync("app_role") || "user";
      const token = utils_auth.getTokenByRole(role);
      return !!token;
    }
    common_vendor.onLaunch(() => {
      const appStore = store_app.useAppStore();
      const userStore = store_user.useUserStore();
      const playerStore = store_player.usePlayerStore();
      const siteStore = store_site.useSiteStore();
      const chatStore = store_chat.useChatStore();
      siteStore.fetchSiteConfig();
      appStore.restoreRole();
      if (userStore.token) {
        userStore.fetchProfile();
        if (appStore.role === "player") {
          playerStore.fetchProfile();
        }
      }
      if (shouldConnectChat()) {
        setTimeout(() => {
          chatStore.connect();
        }, 300);
      }
    });
    common_vendor.onShow(() => {
      const chatStore = store_chat.useChatStore();
      if (shouldConnectChat()) {
        if (!chatStore.connected)
          chatStore.connect();
        chatStore.fetchMessageUnreadCount();
      }
    });
    return () => {
    };
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  const pinia = common_vendor.createPinia();
  app.use(pinia);
  return { app };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
