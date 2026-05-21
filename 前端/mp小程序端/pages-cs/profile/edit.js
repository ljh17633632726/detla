"use strict";
const common_vendor = require("../../common/vendor.js");
const pagesCs_api_cs = require("../api/cs.js");
const api_file = require("../../api/file.js");
const utils_auth = require("../../utils/auth.js");
const _sfc_main = {
  __name: "edit",
  setup(__props) {
    const form = common_vendor.reactive({ nickname: "", avatar: "" });
    common_vendor.onLoad(async () => {
      try {
        const res = await pagesCs_api_cs.getCsProfile();
        const d = res.data;
        if (d) {
          form.nickname = d.nickname || "";
          form.avatar = d.avatar || "";
        } else {
          const info = utils_auth.getCsInfo();
          form.nickname = (info == null ? void 0 : info.nickname) || "";
          form.avatar = (info == null ? void 0 : info.avatar) || "";
        }
      } catch (_) {
      }
    });
    async function chooseAvatar() {
      try {
        const urls = await api_file.chooseAndUpload(1);
        if (urls.length)
          form.avatar = urls[0];
      } catch (_) {
      }
    }
    async function doSave() {
      var _a;
      if (!((_a = form.nickname) == null ? void 0 : _a.trim()))
        return common_vendor.index.showToast({ title: "请输入昵称", icon: "none" });
      try {
        await pagesCs_api_cs.updateCsProfile({ nickname: form.nickname.trim(), avatar: form.avatar || void 0 });
        const info = utils_auth.getCsInfo() || {};
        utils_auth.setCsInfo({ ...info, nickname: form.nickname.trim(), avatar: form.avatar });
        common_vendor.index.showToast({ title: "保存成功" });
        setTimeout(() => common_vendor.index.navigateBack(), 1e3);
      } catch (e) {
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: form.avatar
      }, form.avatar ? {
        b: form.avatar
      } : {}, {
        c: common_vendor.o(chooseAvatar),
        d: form.nickname,
        e: common_vendor.o(($event) => form.nickname = $event.detail.value),
        f: common_vendor.o(doSave)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-41d440a1"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages-cs/profile/edit.js.map
