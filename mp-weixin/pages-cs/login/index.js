"use strict";
const common_vendor = require("../../common/vendor.js");
const api_auth = require("../../api/auth.js");
const utils_auth = require("../../utils/auth.js");
const store_app = require("../../store/app.js");
const store_chat = require("../../store/chat.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const appStore = store_app.useAppStore();
    const chatStore = store_chat.useChatStore();
    const username = common_vendor.ref("");
    const password = common_vendor.ref("");
    async function handleLogin() {
      if (!username.value || !password.value)
        return common_vendor.index.showToast({ title: "请输入账号密码", icon: "none" });
      try {
        const res = await api_auth.csLogin({ username: username.value, password: password.value, role: "cs" });
        utils_auth.setCsToken(res.data.token);
        utils_auth.setCsInfo({ adminId: res.data.adminId, nickname: res.data.nickname, avatar: res.data.avatar, role: res.data.role });
        appStore.switchToCs();
        chatStore.connect();
        chatStore.fetchMessageUnreadCount();
      } catch (e) {
      }
    }
    return (_ctx, _cache) => {
      return {
        a: username.value,
        b: common_vendor.o(($event) => username.value = $event.detail.value),
        c: password.value,
        d: common_vendor.o(($event) => password.value = $event.detail.value),
        e: common_vendor.o(handleLogin)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6d046369"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages-cs/login/index.js.map
