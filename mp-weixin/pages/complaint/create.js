"use strict";
const common_vendor = require("../../common/vendor.js");
const api_complaint = require("../../api/complaint.js");
const api_order = require("../../api/order.js");
if (!Math) {
  ImageUploader();
}
const ImageUploader = () => "../../components/ImageUploader.js";
const _sfc_main = {
  __name: "create",
  setup(__props) {
    const orderId = common_vendor.ref(0);
    const orderInfo = common_vendor.ref(null);
    const types = ["服务态度", "服务质量", "违规操作", "其他"];
    const expectedOptions = ["退款", "重新服务", "赔偿", "道歉"];
    const typeIdx = common_vendor.ref(0);
    const content = common_vendor.ref("");
    const images = common_vendor.ref([]);
    const expectedResult = common_vendor.ref("");
    const submitting = common_vendor.ref(false);
    common_vendor.onLoad(async (opts) => {
      orderId.value = Number(opts.orderId);
      if (orderId.value) {
        try {
          const res = await api_order.getOrderDetail(orderId.value);
          orderInfo.value = res.data;
        } catch (e) {
        }
      }
    });
    async function submit() {
      var _a;
      if (submitting.value)
        return;
      if (!orderId.value)
        return common_vendor.index.showToast({ title: "订单参数异常", icon: "none" });
      if (!content.value)
        return common_vendor.index.showToast({ title: "请描述投诉内容", icon: "none" });
      submitting.value = true;
      try {
        await api_complaint.createComplaint({
          orderId: orderId.value,
          type: types[typeIdx.value],
          content: content.value,
          images: images.value.length ? images.value.join(",") : null,
          expectedResult: expectedResult.value || null
        });
        common_vendor.index.showToast({ title: "已提交" });
        setTimeout(() => common_vendor.index.navigateBack(), 1500);
      } catch (e) {
        common_vendor.index.showToast({ title: ((_a = e == null ? void 0 : e.data) == null ? void 0 : _a.msg) || "提交失败", icon: "none" });
      } finally {
        submitting.value = false;
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: orderInfo.value
      }, orderInfo.value ? {
        b: common_vendor.t(orderInfo.value.orderNo),
        c: common_vendor.t(orderInfo.value.productName),
        d: common_vendor.t(orderInfo.value.amount)
      } : {}, {
        e: common_vendor.t(types[typeIdx.value] || "请选择"),
        f: types,
        g: common_vendor.o(($event) => typeIdx.value = $event.detail.value),
        h: content.value,
        i: common_vendor.o(($event) => content.value = $event.detail.value),
        j: common_vendor.o(($event) => images.value = $event),
        k: common_vendor.p({
          max: 6,
          modelValue: images.value
        }),
        l: common_vendor.t(expectedResult.value || "请选择"),
        m: expectedOptions,
        n: common_vendor.o(($event) => expectedResult.value = expectedOptions[$event.detail.value]),
        o: submitting.value ? 1 : "",
        p: common_vendor.o(submit)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-44affa2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/complaint/create.js.map
