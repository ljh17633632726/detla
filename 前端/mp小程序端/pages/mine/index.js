"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const store_user = require("../../store/user.js");
const store_chat = require("../../store/chat.js");
const store_app = require("../../store/app.js");
const store_player = require("../../store/player.js");
const utils_auth = require("../../utils/auth.js");
const api_auth = require("../../api/auth.js");
const api_chat = require("../../api/chat.js");
const composables_useGoldDust = require("../../composables/useGoldDust.js");
if (!Math) {
  CustomTabBar();
}
const CustomTabBar = () => "../../components/CustomTabBar.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    composables_useGoldDust.useGoldDust();
    const userStore = store_user.useUserStore();
    const appStore = store_app.useAppStore();
    const playerStore = store_player.usePlayerStore();
    const chatStore = store_chat.useChatStore();
    const longPressCount = common_vendor.ref(0);
    const systemUnread = common_vendor.computed(() => chatStore.messageUnreadCount);
    common_vendor.onShow(() => {
      const savedToken = utils_auth.getUserToken();
      if (savedToken && !userStore.token) {
        userStore.token = savedToken;
      }
      if (userStore.token) {
        userStore.fetchProfile(true);
        store_chat.useChatStore().fetchMessageUnreadCount();
      }
    });
    const TAB_PAGES = ["/pages/index/index", "/pages/category/index", "/pages/order/list", "/pages/chat/list", "/pages/mine/index"];
    function go(url) {
      if (TAB_PAGES.includes(url)) {
        common_vendor.index.switchTab({ url });
      } else {
        common_vendor.index.navigateTo({ url });
      }
    }
    function goLogin() {
      common_vendor.index.navigateTo({ url: "/pages/login/index" });
    }
    function formatPhone(p) {
      if (!p || p.length < 7)
        return p;
      return p.slice(0, 3) + "****" + p.slice(-4);
    }
    async function goPlayer() {
      var _a, _b, _c;
      if (!userStore.checkLogin())
        return;
      try {
        const profile = await playerStore.fetchProfile({ role: "user" });
        if (!profile) {
          common_vendor.index.navigateTo({ url: "/pages-player/apply/index" });
        } else if (profile.status === "PENDING") {
          common_vendor.index.showToast({ title: "审核中，请耐心等待", icon: "none" });
        } else if (profile.status === "ACTIVE") {
          const res = await api_auth.switchToPlayerToken();
          if ((_a = res == null ? void 0 : res.data) == null ? void 0 : _a.token) {
            utils_auth.setPlayerToken(res.data.token);
            store_chat.useChatStore().disconnect();
            appStore.switchToPlayer();
          }
        } else {
          common_vendor.index.navigateTo({ url: "/pages-player/apply/index" });
        }
      } catch (e) {
        const msg = ((_b = e == null ? void 0 : e.data) == null ? void 0 : _b.msg) || (e == null ? void 0 : e.message);
        if (msg)
          common_vendor.index.showToast({ title: msg, icon: "none" });
        if (((_c = e == null ? void 0 : e.data) == null ? void 0 : _c.code) === 1002)
          common_vendor.index.navigateTo({ url: "/pages-player/apply/index" });
      }
    }
    async function goCustomerService() {
      if (!userStore.checkLogin())
        return;
      try {
        const res = await api_chat.createCsSession();
        const session = res.data;
        common_vendor.index.navigateTo({ url: "/pages/chat/room?sessionId=" + session.id + "&name=" + encodeURIComponent("在线客服") });
      } catch (e) {
        common_vendor.index.showToast({ title: (e == null ? void 0 : e.msg) || "连接客服失败", icon: "none" });
      }
    }
    function onLongPress() {
      longPressCount.value++;
      if (longPressCount.value >= 3) {
        longPressCount.value = 0;
        common_vendor.index.navigateTo({ url: "/pages-cs/login/index" });
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(userStore).avatar || "/static/images/default-avatar.png",
        b: common_vendor.unref(userStore).isLoggedIn
      }, common_vendor.unref(userStore).isLoggedIn ? common_vendor.e({
        c: common_vendor.t(common_vendor.unref(userStore).nickname),
        d: common_vendor.unref(userStore).phone
      }, common_vendor.unref(userStore).phone ? {
        e: common_vendor.t(formatPhone(common_vendor.unref(userStore).phone))
      } : {}) : {}, {
        f: common_vendor.o(($event) => common_vendor.unref(userStore).isLoggedIn ? go("/pages/mine/profile") : goLogin()),
        g: common_vendor.o(onLongPress),
        h: common_assets._imports_0$1,
        i: common_vendor.o(($event) => go("/pages/order/list")),
        j: common_assets._imports_1,
        k: common_vendor.o(($event) => go("/pages/complaint/list")),
        l: common_assets._imports_2,
        m: common_vendor.o(($event) => go("/pages/wallet/index")),
        n: common_assets._imports_1,
        o: systemUnread.value > 0
      }, systemUnread.value > 0 ? {
        p: common_vendor.t(systemUnread.value > 99 ? "99+" : systemUnread.value)
      } : {}, {
        q: common_vendor.o(($event) => go("/pages/message/index")),
        r: common_assets._imports_3,
        s: common_vendor.o(goCustomerService),
        t: common_assets._imports_4,
        v: common_vendor.o(goPlayer),
        w: common_assets._imports_5,
        x: common_vendor.o(($event) => go("/pages/agreement/user")),
        y: common_assets._imports_6,
        z: common_vendor.o(($event) => go("/pages/agreement/privacy")),
        A: common_vendor.unref(userStore).isLoggedIn
      }, common_vendor.unref(userStore).isLoggedIn ? {
        B: common_vendor.o(($event) => common_vendor.unref(userStore).logout())
      } : {}, {
        C: common_vendor.p({
          current: 4
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-569e925a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/mine/index.js.map
