"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const store_player = require("../../store/player.js");
const store_app = require("../../store/app.js");
const store_chat = require("../../store/chat.js");
const store_remind = require("../../store/remind.js");
const api_player = require("../../api/player.js");
if (!Math) {
  (OrderCard + CustomTabBar)();
}
const CustomTabBar = () => "../../components/CustomTabBar.js";
const OrderCard = () => "../../components/OrderCard.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const playerStore = store_player.usePlayerStore();
    const appStore = store_app.useAppStore();
    const remindStore = store_remind.useRemindStore();
    const homeData = common_vendor.ref({});
    const recentOrders = common_vendor.ref([]);
    const isOnline = common_vendor.computed(() => {
      var _a;
      return ((_a = playerStore.playerInfo) == null ? void 0 : _a.isOnline) === 1;
    });
    common_vendor.onShow(async () => {
      var _a;
      try {
        common_vendor.index.hideHomeButton();
      } catch (_) {
      }
      playerStore.fetchProfile();
      remindStore.fetchPlayerRemind();
      try {
        const res = await api_player.getPlayerHome();
        homeData.value = res.data || {};
      } catch (e) {
      }
      try {
        const res = await api_player.getMyWork({ pageNum: 1, pageSize: 3, status: "ASSIGNED" });
        recentOrders.value = ((_a = res.data) == null ? void 0 : _a.records) || [];
      } catch (e) {
      }
    });
    async function onToggleOnline(e) {
      const newVal = e.detail.value;
      try {
        await api_player.toggleOnlineStatus(newVal);
        playerStore.fetchProfile();
        common_vendor.index.showToast({ title: newVal ? "已上线" : "已下线", icon: "none" });
      } catch (err) {
        common_vendor.index.showToast({ title: "操作失败", icon: "none" });
        playerStore.fetchProfile();
      }
    }
    function go(url) {
      common_vendor.index.navigateTo({ url });
    }
    function backToUser() {
      store_chat.useChatStore().disconnect();
      appStore.switchToUser();
    }
    return (_ctx, _cache) => {
      var _a;
      return common_vendor.e({
        a: common_vendor.t(isOnline.value ? "在线接单中" : "已离线"),
        b: common_vendor.n(isOnline.value ? "on" : "off"),
        c: isOnline.value,
        d: common_vendor.o(onToggleOnline),
        e: common_vendor.t(homeData.value.todayCompleted || 0),
        f: common_vendor.t(homeData.value.todayIncome || "0.00"),
        g: common_vendor.t(((_a = homeData.value.wallet) == null ? void 0 : _a.totalIncome) || "0.00"),
        h: common_assets._imports_0$3,
        i: common_vendor.o(($event) => go("/pages-player/hall/index")),
        j: common_assets._imports_0$1,
        k: common_vendor.o(($event) => go("/pages-player/order/list")),
        l: common_assets._imports_2,
        m: common_vendor.o(($event) => go("/pages-player/earnings/index")),
        n: common_assets._imports_3$1,
        o: common_vendor.o(($event) => go("/pages-player/withdraw/index")),
        p: common_assets._imports_4$1,
        q: common_vendor.o(($event) => go("/pages-player/withdraw/list")),
        r: common_assets._imports_3$1,
        s: common_vendor.o(($event) => go("/pages-player/account/list")),
        t: common_assets._imports_5$1,
        v: common_vendor.unref(remindStore).inviteCount > 0
      }, common_vendor.unref(remindStore).inviteCount > 0 ? {
        w: common_vendor.t(common_vendor.unref(remindStore).inviteCount > 99 ? "99+" : common_vendor.unref(remindStore).inviteCount)
      } : {}, {
        x: common_vendor.o(($event) => go("/pages-player/invite/list")),
        y: common_assets._imports_1,
        z: common_vendor.unref(remindStore).systemUnread > 0
      }, common_vendor.unref(remindStore).systemUnread > 0 ? {
        A: common_vendor.t(common_vendor.unref(remindStore).systemUnread > 99 ? "99+" : common_vendor.unref(remindStore).systemUnread)
      } : {}, {
        B: common_vendor.o(($event) => go("/pages/message/index")),
        C: recentOrders.value.length
      }, recentOrders.value.length ? {
        D: common_vendor.o(($event) => go("/pages-player/order/list")),
        E: common_vendor.f(recentOrders.value, (o, k0, i0) => {
          return {
            a: o.id,
            b: "100cf608-0-" + i0,
            c: common_vendor.p({
              order: o,
              ["detail-path"]: "/pages-player/order/detail"
            })
          };
        })
      } : {}, {
        F: common_vendor.o(backToUser),
        G: common_vendor.p({
          current: 3
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-100cf608"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages-player/mine/index.js.map
