"use strict";
const common_vendor = require("../../common/vendor.js");
const store_user = require("../../store/user.js");
const store_app = require("../../store/app.js");
const store_site = require("../../store/site.js");
const store_chat = require("../../store/chat.js");
const api_auth = require("../../api/auth.js");
const utils_auth = require("../../utils/auth.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const userStore = store_user.useUserStore();
    const chatStore = store_chat.useChatStore();
    const appStore = store_app.useAppStore();
    const siteStore = store_site.useSiteStore();
    const loginMode = common_vendor.ref("wechat");
    const username = common_vendor.ref("");
    const password = common_vendor.ref("");
    const agreed = common_vendor.ref(false);
    async function handleWechatLogin(e) {
      if (!agreed.value) {
        return common_vendor.index.showToast({ title: "请先阅读并勾选同意协议", icon: "none" });
      }
      if (e.detail.errMsg && e.detail.errMsg.indexOf("deny") > -1) {
        return common_vendor.index.showToast({ title: "请使用手机号快捷登录", icon: "none" });
      }
      const phoneCode = e.detail.code || "";
      const success = await userStore.login(phoneCode);
      if (success) {
        chatStore.connect();
        common_vendor.index.reLaunch({ url: "/pages/index/index" });
      }
    }
    async function handleAccountLogin() {
      if (!agreed.value) {
        return common_vendor.index.showToast({ title: "请先阅读并勾选同意协议", icon: "none" });
      }
      if (!username.value || !password.value) {
        return common_vendor.index.showToast({ title: "请输入账号密码", icon: "none" });
      }
      try {
        const res = await api_auth.csLogin({ username: username.value, password: password.value, role: "cs" });
        utils_auth.setCsToken(res.data.token);
        appStore.switchToCs();
      } catch (e) {
        common_vendor.index.showToast({ title: "登录失败，请检查账号密码", icon: "none" });
      }
    }
    function goPage(url) {
      common_vendor.index.navigateTo({ url });
    }
    function toggleAgree() {
      agreed.value = !agreed.value;
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(siteStore).logo || "/static/images/logo.png",
        b: common_vendor.t(common_vendor.unref(siteStore).siteName),
        c: common_vendor.t(common_vendor.unref(siteStore).subtitle),
        d: loginMode.value === "wechat" ? 1 : "",
        e: common_vendor.o(($event) => loginMode.value = "wechat"),
        f: loginMode.value === "account" ? 1 : "",
        g: common_vendor.o(($event) => loginMode.value = "account"),
        h: loginMode.value === "wechat"
      }, loginMode.value === "wechat" ? {
        i: common_vendor.o(handleWechatLogin)
      } : {
        j: username.value,
        k: common_vendor.o(($event) => username.value = $event.detail.value),
        l: password.value,
        m: common_vendor.o(($event) => password.value = $event.detail.value),
        n: common_vendor.o(handleAccountLogin)
      }, {
        o: agreed.value
      }, agreed.value ? {} : {}, {
        p: agreed.value ? 1 : "",
        q: common_vendor.o(toggleAgree),
        r: common_vendor.o(($event) => goPage("/pages/agreement/user")),
        s: common_vendor.o(($event) => goPage("/pages/agreement/privacy"))
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d08ef7d4"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/index.js.map
