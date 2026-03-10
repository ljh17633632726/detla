"use strict";
const common_vendor = require("../../common/vendor.js");
const api_complaint = require("../../api/complaint.js");
const utils_constants = require("../../utils/constants.js");
if (!Math) {
  StatusTag();
}
const StatusTag = () => "../../components/StatusTag.js";
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const complaintColorMap = { PENDING: "#ff9900", PROCESSING: "#ff4544", RESOLVED: "#07c160", APPEALING: "#ee0a24", APPEAL_RESOLVED: "#07c160" };
    const complaint = common_vendor.ref(null);
    const order = common_vendor.ref(null);
    const progress = common_vendor.ref([]);
    const complaintId = common_vendor.ref(0);
    const showAppeal = common_vendor.ref(false);
    const appealContent = common_vendor.ref("");
    common_vendor.onLoad(async (opts) => {
      complaintId.value = opts.id;
      const res = await api_complaint.getComplaintDetail(opts.id);
      if (res.data && res.data.complaint) {
        complaint.value = res.data.complaint;
        order.value = res.data.order || null;
        progress.value = res.data.progress || [];
      } else {
        complaint.value = res.data;
      }
    });
    async function submitAppeal() {
      if (!appealContent.value.trim())
        return common_vendor.index.showToast({ title: "请输入申诉原因", icon: "none" });
      await api_complaint.appealComplaint(complaintId.value, { appealReason: appealContent.value });
      showAppeal.value = false;
      common_vendor.index.showToast({ title: "申诉已提交" });
      const res = await api_complaint.getComplaintDetail(complaintId.value);
      complaint.value = res.data;
    }
    function previewImg(imgs, idx) {
      common_vendor.index.previewImage({ urls: imgs, current: idx });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: complaint.value
      }, complaint.value ? common_vendor.e({
        b: common_vendor.t(complaint.value.type),
        c: common_vendor.p({
          status: complaint.value.status,
          textMap: common_vendor.unref(utils_constants.COMPLAINT_STATUS_TEXT),
          colorMap: complaintColorMap
        }),
        d: common_vendor.t(complaint.value.createdAt),
        e: common_vendor.t(complaint.value.content),
        f: complaint.value.images
      }, complaint.value.images ? {
        g: common_vendor.f(complaint.value.images.split(","), (img, idx, i0) => {
          return {
            a: idx,
            b: img,
            c: common_vendor.o(($event) => previewImg(complaint.value.images.split(","), idx), idx)
          };
        })
      } : {}, {
        h: complaint.value.expectedResult
      }, complaint.value.expectedResult ? {
        i: common_vendor.t(complaint.value.expectedResult)
      } : {}, {
        j: complaint.value.resultReason || complaint.value.result
      }, complaint.value.resultReason || complaint.value.result ? common_vendor.e({
        k: complaint.value.resultReason
      }, complaint.value.resultReason ? {
        l: common_vendor.t(complaint.value.resultReason)
      } : {}, {
        m: complaint.value.refundAmount
      }, complaint.value.refundAmount ? {
        n: common_vendor.t(Number(complaint.value.refundAmount).toFixed(2))
      } : {}, {
        o: complaint.value.playerPenalty && complaint.value.playerPenalty !== "NONE"
      }, complaint.value.playerPenalty && complaint.value.playerPenalty !== "NONE" ? {
        p: common_vendor.t({
          FREEZE: "冻结账号",
          WARNING: "警告",
          DEDUCT: "扣款"
        }[complaint.value.playerPenalty] || complaint.value.playerPenalty)
      } : {}) : {}, {
        q: complaint.value.status === "RESOLVED"
      }, complaint.value.status === "RESOLVED" ? {
        r: common_vendor.o(($event) => showAppeal.value = true)
      } : {}, {
        s: showAppeal.value
      }, showAppeal.value ? {
        t: appealContent.value,
        v: common_vendor.o(($event) => appealContent.value = $event.detail.value),
        w: common_vendor.o(($event) => showAppeal.value = false),
        x: common_vendor.o(submitAppeal),
        y: common_vendor.o(() => {
        }),
        z: common_vendor.o(($event) => showAppeal.value = false)
      } : {}) : {}, {
        A: order.value
      }, order.value ? {
        B: common_vendor.t(order.value.orderNo),
        C: common_vendor.t(order.value.productName),
        D: common_vendor.t(order.value.status)
      } : {}, {
        E: progress.value && progress.value.length
      }, progress.value && progress.value.length ? {
        F: common_vendor.f(progress.value, (p, k0, i0) => {
          return {
            a: common_vendor.t(p.createdAt),
            b: common_vendor.t(p.content),
            c: p.id
          };
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fe45cbc7"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/complaint/detail.js.map
