"use strict";
const common_vendor = require("../../common/vendor.js");
const api_player = require("../../api/player.js");
const api_file = require("../../api/file.js");
const _sfc_main = {
  __name: "edit",
  setup(__props) {
    const types = [
      { value: "ALIPAY", label: "支付宝", icon: "💙" },
      { value: "WECHAT", label: "微信", icon: "💚" },
      { value: "BANK", label: "银行卡", icon: "🏦" }
    ];
    const isEdit = common_vendor.ref(false);
    const form = common_vendor.reactive({ id: "", type: "ALIPAY", accountNo: "", accountName: "", bankName: "", qrcodeUrl: "", isDefault: 0 });
    common_vendor.onLoad((opts) => {
      if (opts.id && opts.data) {
        isEdit.value = true;
        const data = JSON.parse(decodeURIComponent(opts.data));
        Object.assign(form, { ...form, ...data, qrcodeUrl: data.qrcodeUrl || "" });
      }
    });
    async function chooseQrcode() {
      try {
        const urls = await api_file.chooseAndUpload(1);
        if (urls.length)
          form.qrcodeUrl = urls[0];
      } catch (_) {
      }
    }
    async function doSave() {
      if (!form.accountNo)
        return common_vendor.index.showToast({ title: "请输入账号", icon: "none" });
      if (!form.accountName)
        return common_vendor.index.showToast({ title: "请输入姓名", icon: "none" });
      if ((form.type === "ALIPAY" || form.type === "WECHAT") && !form.qrcodeUrl)
        return common_vendor.index.showToast({ title: "请上传收款码图片", icon: "none" });
      if (form.type === "BANK" && !form.bankName)
        return common_vendor.index.showToast({ title: "请输入开户行", icon: "none" });
      try {
        if (isEdit.value) {
          await api_player.updateAccount(form);
        } else {
          await api_player.addAccount(form);
        }
        common_vendor.index.showToast({ title: "保存成功" });
        setTimeout(() => common_vendor.index.navigateBack(), 1500);
      } catch (e) {
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(types, (t, k0, i0) => {
          return {
            a: common_vendor.t(t.icon),
            b: common_vendor.t(t.label),
            c: t.value,
            d: form.type === t.value ? 1 : "",
            e: common_vendor.o(($event) => form.type = t.value, t.value)
          };
        }),
        b: form.accountNo,
        c: common_vendor.o(($event) => form.accountNo = $event.detail.value),
        d: form.accountName,
        e: common_vendor.o(($event) => form.accountName = $event.detail.value),
        f: form.type === "ALIPAY" || form.type === "WECHAT"
      }, form.type === "ALIPAY" || form.type === "WECHAT" ? common_vendor.e({
        g: form.qrcodeUrl
      }, form.qrcodeUrl ? {
        h: form.qrcodeUrl,
        i: common_vendor.o(chooseQrcode)
      } : {
        j: common_vendor.o(chooseQrcode)
      }) : {}, {
        k: form.type === "BANK"
      }, form.type === "BANK" ? {
        l: form.bankName,
        m: common_vendor.o(($event) => form.bankName = $event.detail.value)
      } : {}, {
        n: form.isDefault === 1,
        o: common_vendor.o(($event) => form.isDefault = $event.detail.value ? 1 : 0),
        p: common_vendor.o(doSave)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-91359831"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages-player/account/edit.js.map
