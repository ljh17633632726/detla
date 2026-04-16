"use strict";
const common_vendor = require("../common/vendor.js");
const utils_auth = require("../utils/auth.js");
const api_auth = require("../api/auth.js");
const api_user = require("../api/user.js");
const store_chat = require("./chat.js");
const useUserStore = common_vendor.defineStore("user", () => {
  const token = common_vendor.ref(utils_auth.getUserToken());
  const userInfo = common_vendor.ref(null);
  const isLoggedIn = common_vendor.computed(() => !!token.value);
  const nickname = common_vendor.computed(() => {
    var _a;
    return ((_a = userInfo.value) == null ? void 0 : _a.nickname) || "未登录";
  });
  const avatar = common_vendor.computed(() => {
    var _a;
    return ((_a = userInfo.value) == null ? void 0 : _a.avatar) || "";
  });
  const phone = common_vendor.computed(() => {
    var _a;
    return ((_a = userInfo.value) == null ? void 0 : _a.phone) || "";
  });
  async function login(phoneCode = "") {
    try {
      const loginRes = await common_vendor.index.login({ provider: "weixin" });
      const { data } = await api_auth.userLogin(loginRes.code, phoneCode);
      token.value = data.token;
      utils_auth.setUserToken(data.token);
      userInfo.value = data;
      const chatStore = store_chat.useChatStore();
      chatStore.fetchMessageUnreadCount();
      return { success: true, code: 200, data };
    } catch (e) {
      return {
        success: false,
        code: (e == null ? void 0 : e.code) || 500,
        msg: (e == null ? void 0 : e.msg) || (e == null ? void 0 : e.message) || "登录失败"
      };
    }
  }
  async function fetchProfile(silent = false) {
    if (!token.value)
      return;
    try {
      const { data } = await api_user.getUserProfile(silent ? { loading: false } : {});
      userInfo.value = data;
    } catch (e) {
    }
  }
  function logout() {
    token.value = "";
    userInfo.value = null;
    utils_auth.removeUserToken();
    utils_auth.removePlayerToken();
    common_vendor.index.reLaunch({ url: "/pages/login/index" });
  }
  function checkLogin() {
    if (!token.value) {
      common_vendor.index.navigateTo({ url: "/pages/login/index" });
      return false;
    }
    return true;
  }
  return {
    token,
    userInfo,
    isLoggedIn,
    nickname,
    avatar,
    phone,
    login,
    fetchProfile,
    logout,
    checkLogin
  };
});
exports.useUserStore = useUserStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/store/user.js.map
