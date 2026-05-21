"use strict";
const common_vendor = require("../../common/vendor.js");
const pagesCs_api_cs = require("../api/cs.js");
if (!Math) {
  StatusTag();
}
const StatusTag = () => "../../components/StatusTag.js";
const _sfc_main = {
  __name: "handle",
  setup(__props) {
    const COMPLAINT_TYPE_TEXT = { SERVICE_QUALITY: "服务质量", ACCOUNT_ISSUE: "账号问题", DELAY: "进度延迟", FRAUD: "欺诈", OTHER: "其他" };
    const COMPLAINT_STATUS_TEXT = { PENDING: "待处理", PROCESSING: "处理中", RESOLVED: "已解决", REJECTED: "已驳回", APPEALING: "申诉中" };
    const COMPLAINT_STATUS_COLOR = { PENDING: "#ee0a24", PROCESSING: "#ff9900", RESOLVED: "#07c160", REJECTED: "#999", APPEALING: "#ee0a24" };
    const RESULT_TEXT = { FULL_REFUND: "全额退款", PARTIAL_REFUND: "部分退款", REJECT: "驳回投诉", REDO: "重新服务" };
    const PENALTY_TEXT = { NONE: "无", WARNING: "警告", FREEZE: "冻结账号" };
    const complaint = common_vendor.ref(null);
    const order = common_vendor.ref(null);
    const userNickname = common_vendor.ref("");
    const playerNickname = common_vendor.ref("");
    const complaintId = common_vendor.ref("");
    const resolveForm = common_vendor.reactive({ result: "FULL_REFUND", refundAmount: "", resultReason: "", playerPenalty: "NONE" });
    common_vendor.onLoad(async (opts) => {
      complaintId.value = opts.id;
      await loadDetail(opts.id);
    });
    async function loadDetail(id) {
      const res = await pagesCs_api_cs.getCsComplaintDetail(id);
      const data = res.data || {};
      complaint.value = data.complaint || data;
      order.value = data.order || null;
      userNickname.value = data.userNickname || "";
      playerNickname.value = data.playerNickname || "";
    }
    async function doAccept() {
      try {
        await pagesCs_api_cs.processCsComplaint(complaintId.value, {});
        common_vendor.index.showToast({ title: "已受理" });
        await loadDetail(complaintId.value);
      } catch (e) {
      }
    }
    async function doResolve() {
      if (!resolveForm.resultReason)
        return common_vendor.index.showToast({ title: "请输入处理说明", icon: "none" });
      try {
        await pagesCs_api_cs.resolveCsComplaint(complaintId.value, {
          result: resolveForm.result,
          refundAmount: resolveForm.result === "PARTIAL_REFUND" ? Number(resolveForm.refundAmount) || 0 : null,
          resultReason: resolveForm.resultReason,
          playerPenalty: resolveForm.playerPenalty
        });
        common_vendor.index.showToast({ title: "仲裁完成" });
        setTimeout(() => common_vendor.index.navigateBack(), 1500);
      } catch (e) {
      }
    }
    function previewImg(imgs, idx) {
      common_vendor.index.previewImage({ urls: imgs, current: idx });
    }
    function formatTime(t) {
      if (!t)
        return "";
      return t.replace("T", " ").substring(0, 16);
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: complaint.value
      }, complaint.value ? common_vendor.e({
        b: common_vendor.t(COMPLAINT_TYPE_TEXT[complaint.value.type] || complaint.value.type),
        c: common_vendor.p({
          status: complaint.value.status,
          ["text-map"]: COMPLAINT_STATUS_TEXT,
          ["color-map"]: COMPLAINT_STATUS_COLOR
        }),
        d: common_vendor.t(complaint.value.content),
        e: complaint.value.images
      }, complaint.value.images ? {
        f: common_vendor.f(complaint.value.images.split(","), (img, i, i0) => {
          return {
            a: i,
            b: img,
            c: common_vendor.o(($event) => previewImg(complaint.value.images.split(","), i), i)
          };
        })
      } : {}, {
        g: common_vendor.t(userNickname.value || complaint.value.userId),
        h: order.value
      }, order.value ? {
        i: common_vendor.t(order.value.orderNo)
      } : {}, {
        j: order.value
      }, order.value ? {
        k: common_vendor.t(Number(order.value.amount).toFixed(2))
      } : {}, {
        l: playerNickname.value
      }, playerNickname.value ? {
        m: common_vendor.t(playerNickname.value)
      } : {}, {
        n: common_vendor.t(complaint.value.expectedResult),
        o: common_vendor.t(formatTime(complaint.value.createdAt)),
        p: complaint.value.status === "PENDING"
      }, complaint.value.status === "PENDING" ? {
        q: common_vendor.o(doAccept)
      } : {}, {
        r: complaint.value.status === "PROCESSING" || complaint.value.status === "APPEALING"
      }, complaint.value.status === "PROCESSING" || complaint.value.status === "APPEALING" ? common_vendor.e({
        s: resolveForm.result === "FULL_REFUND" ? 1 : "",
        t: common_vendor.o(($event) => resolveForm.result = "FULL_REFUND"),
        v: resolveForm.result === "PARTIAL_REFUND" ? 1 : "",
        w: common_vendor.o(($event) => resolveForm.result = "PARTIAL_REFUND"),
        x: resolveForm.result === "REDO" ? 1 : "",
        y: common_vendor.o(($event) => resolveForm.result = "REDO"),
        z: resolveForm.result === "REJECT" ? 1 : "",
        A: common_vendor.o(($event) => resolveForm.result = "REJECT"),
        B: resolveForm.result === "PARTIAL_REFUND"
      }, resolveForm.result === "PARTIAL_REFUND" ? {
        C: resolveForm.refundAmount,
        D: common_vendor.o(($event) => resolveForm.refundAmount = $event.detail.value)
      } : {}, {
        E: resolveForm.playerPenalty === "NONE" ? 1 : "",
        F: common_vendor.o(($event) => resolveForm.playerPenalty = "NONE"),
        G: resolveForm.playerPenalty === "WARNING" ? 1 : "",
        H: common_vendor.o(($event) => resolveForm.playerPenalty = "WARNING"),
        I: resolveForm.playerPenalty === "FREEZE" ? 1 : "",
        J: common_vendor.o(($event) => resolveForm.playerPenalty = "FREEZE"),
        K: resolveForm.resultReason,
        L: common_vendor.o(($event) => resolveForm.resultReason = $event.detail.value),
        M: common_vendor.o(doResolve)
      }) : {}, {
        N: complaint.value.result
      }, complaint.value.result ? common_vendor.e({
        O: common_vendor.t(RESULT_TEXT[complaint.value.result] || complaint.value.result),
        P: complaint.value.resultReason
      }, complaint.value.resultReason ? {
        Q: common_vendor.t(complaint.value.resultReason)
      } : {}, {
        R: complaint.value.refundAmount
      }, complaint.value.refundAmount ? {
        S: common_vendor.t(Number(complaint.value.refundAmount).toFixed(2))
      } : {}, {
        T: complaint.value.playerPenalty && complaint.value.playerPenalty !== "NONE"
      }, complaint.value.playerPenalty && complaint.value.playerPenalty !== "NONE" ? {
        U: common_vendor.t(PENALTY_TEXT[complaint.value.playerPenalty] || complaint.value.playerPenalty)
      } : {}, {
        V: complaint.value.resolvedAt
      }, complaint.value.resolvedAt ? {
        W: common_vendor.t(formatTime(complaint.value.resolvedAt))
      } : {}) : {}) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a0c17634"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages-cs/complaint/handle.js.map
