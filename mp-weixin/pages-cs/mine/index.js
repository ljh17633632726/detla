"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const store_app = require("../../store/app.js");
const store_chat = require("../../store/chat.js");
const store_remind = require("../../store/remind.js");
const utils_auth = require("../../utils/auth.js");
if (!Math) {
  CustomTabBar();
}
const CustomTabBar = () => "../../components/CustomTabBar.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const appStore = store_app.useAppStore();
    const remindStore = store_remind.useRemindStore();
    const csInfo = common_vendor.computed(() => utils_auth.getCsInfo() || {});
    common_vendor.onShow(() => {
      remindStore.fetchCsRemind();
    });
    function go(url) {
      common_vendor.index.navigateTo({ url });
    }
    function goProfileEdit() {
      common_vendor.index.navigateTo({ url: "/pages-cs/profile/edit" });
    }
    function doLogout() {
      common_vendor.index.showModal({
        title: "确认退出",
        content: "确定退出客服登录吗？",
        success(r) {
          if (r.confirm) {
            store_chat.useChatStore().disconnect();
            utils_auth.removeCsToken();
            appStore.switchToUser();
          }
        }
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: csInfo.value.avatar || "/static/images/default-avatar.png",
        b: common_vendor.t(csInfo.value.nickname || "客服工作台"),
        c: common_vendor.o(goProfileEdit),
        d: common_assets._imports_0$1,
        e: common_vendor.o(($event) => go("/pages-cs/order/list")),
        f: common_assets._imports_1,
        g: common_vendor.o(($event) => go("/pages-cs/complaint/list")),
        h: common_assets._imports_1,
        i: common_vendor.o(($event) => go("/pages-cs/quick-reply/index")),
        j: common_assets._imports_1,
        k: common_vendor.unref(remindStore).systemUnread > 0
      }, common_vendor.unref(remindStore).systemUnread > 0 ? {
        l: common_vendor.t(common_vendor.unref(remindStore).systemUnread > 99 ? "99+" : common_vendor.unref(remindStore).systemUnread)
      } : {}, {
        m: common_vendor.o(($event) => go("/pages/message/index")),
        n: common_assets._imports_2$2,
        o: common_vendor.o(($event) => go("/pages-cs/user/list")),
        p: common_assets._imports_2$2,
        q: common_vendor.o(($event) => go("/pages-cs/player/list")),
        r: common_vendor.o(doLogout),
        s: common_vendor.p({
          current: 4
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8c09d386"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages-cs/mine/index.js.map
