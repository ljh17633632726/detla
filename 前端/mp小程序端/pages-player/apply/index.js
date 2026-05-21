"use strict";
const common_vendor = require("../../common/vendor.js");
const api_player = require("../../api/player.js");
const api_pay = require("../../api/pay.js");
const store_site = require("../../store/site.js");
if (!Math) {
  ImageUploader();
}
const ImageUploader = () => "../../components/ImageUploader.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const siteStore = store_site.useSiteStore();
    const form = common_vendor.reactive({ realName: "", phone: "", gameLevel: "", serviceTypes: "", skillTags: "" });
    const proofImages = common_vendor.ref([]);
    const submitting = common_vendor.ref(false);
    async function submit() {
      if (!form.realName || !form.phone)
        return common_vendor.index.showToast({ title: "请填写完整", icon: "none" });
      if (submitting.value)
        return;
      submitting.value = true;
      try {
        if (siteStore.depositRequired) {
          await submitWithDeposit();
        } else {
          await api_player.applyPlayer({
            ...form,
            proofImages: proofImages.value.join(",")
          });
          common_vendor.index.showToast({ title: "已提交，等待审核" });
          setTimeout(() => common_vendor.index.navigateBack(), 1500);
        }
      } catch (e) {
        if (e && e.errMsg && !e.errMsg.includes("cancel")) {
          common_vendor.index.showToast({ title: e.msg || "操作失败", icon: "none" });
        }
      } finally {
        submitting.value = false;
      }
    }
    async function submitWithDeposit() {
      var _a;
      const res = await api_pay.createPlayerDeposit();
      const { paymentNo, timeStamp, nonceStr, package: pkg, signType, paySign } = res.data;
      await new Promise((resolve, reject) => {
        common_vendor.index.requestPayment({
          provider: "wxpay",
          timeStamp,
          nonceStr,
          package: pkg,
          signType: signType || "RSA",
          paySign,
          success: () => resolve(),
          fail: (e) => reject(e)
        });
      });
      const doApply = () => api_player.applyPlayer({
        ...form,
        proofImages: proofImages.value.join(","),
        depositPaymentNo: paymentNo
      });
      try {
        await doApply();
      } catch (e) {
        if ((_a = e == null ? void 0 : e.msg) == null ? void 0 : _a.includes("未到账")) {
          common_vendor.index.showToast({ title: "支付到账中，请稍候...", icon: "none" });
          await new Promise((r) => setTimeout(r, 2500));
          await doApply();
        } else {
          throw e;
        }
      }
      common_vendor.index.showToast({ title: "已提交，等待审核" });
      setTimeout(() => common_vendor.index.navigateBack(), 1500);
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: form.realName,
        b: common_vendor.o(($event) => form.realName = $event.detail.value),
        c: form.phone,
        d: common_vendor.o(($event) => form.phone = $event.detail.value),
        e: form.gameLevel,
        f: common_vendor.o(($event) => form.gameLevel = $event.detail.value),
        g: form.serviceTypes,
        h: common_vendor.o(($event) => form.serviceTypes = $event.detail.value),
        i: form.skillTags,
        j: common_vendor.o(($event) => form.skillTags = $event.detail.value),
        k: common_vendor.o(($event) => proofImages.value = $event),
        l: common_vendor.p({
          max: 4,
          modelValue: proofImages.value
        }),
        m: common_vendor.unref(siteStore).depositRequired
      }, common_vendor.unref(siteStore).depositRequired ? {} : {}, {
        n: common_vendor.t(submitting.value ? "提交中..." : common_vendor.unref(siteStore).depositRequired ? "支付押金并提交" : "提交申请"),
        o: submitting.value ? 1 : "",
        p: common_vendor.o(submit)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c2070e8d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages-player/apply/index.js.map
