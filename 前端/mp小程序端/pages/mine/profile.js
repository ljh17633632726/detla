"use strict";
const common_vendor = require("../../common/vendor.js");
const api_user = require("../../api/user.js");
const api_file = require("../../api/file.js");
const store_user = require("../../store/user.js");
const _sfc_main = {
  __name: "profile",
  setup(__props) {
    const userStore = store_user.useUserStore();
    const nickname = common_vendor.ref("");
    const avatar = common_vendor.ref("");
    const phone = common_vendor.ref("");
    const userId = common_vendor.ref("");
    common_vendor.onLoad(async () => {
      try {
        const res = await api_user.getUserProfile();
        const d = res.data || {};
        nickname.value = d.nickname || "";
        avatar.value = d.avatar || "";
        phone.value = d.phone || "";
        userId.value = d.id || "";
      } catch (e) {
      }
    });
    async function onChooseWxAvatar(e) {
      const tempUrl = e.detail.avatarUrl;
      if (!tempUrl)
        return;
      try {
        common_vendor.index.showLoading({ title: "上传中..." });
        const url = await api_file.upload(tempUrl);
        avatar.value = url;
        common_vendor.index.hideLoading();
      } catch (err) {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({ title: "上传失败", icon: "none" });
      }
    }
    async function save() {
      if (!nickname.value.trim()) {
        return common_vendor.index.showToast({ title: "请输入昵称", icon: "none" });
      }
      try {
        await api_user.updateUserProfile({ nickname: nickname.value, avatar: avatar.value });
        userStore.fetchProfile(true);
        common_vendor.index.showToast({ title: "已保存" });
        setTimeout(() => common_vendor.index.navigateBack(), 1500);
      } catch (e) {
        common_vendor.index.showToast({ title: "保存失败", icon: "none" });
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: avatar.value || "/static/images/default-avatar.png",
        b: common_vendor.o(onChooseWxAvatar),
        c: nickname.value,
        d: common_vendor.o(($event) => nickname.value = $event.detail.value),
        e: phone.value
      }, phone.value ? {
        f: common_vendor.t(phone.value)
      } : {}, {
        g: userId.value
      }, userId.value ? {
        h: common_vendor.t(userId.value)
      } : {}, {
        i: common_vendor.o(save)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-935803c6"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/mine/profile.js.map
