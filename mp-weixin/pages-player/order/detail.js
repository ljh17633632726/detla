"use strict";
const common_vendor = require("../../common/vendor.js");
const api_player = require("../../api/player.js");
const api_order = require("../../api/order.js");
const utils_subscribe = require("../../utils/subscribe.js");
if (!Math) {
  (StatusTag + PriceText)();
}
const StatusTag = () => "../../components/StatusTag.js";
const PriceText = () => "../../components/PriceText.js";
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const order = common_vendor.ref(null);
    const orderId = common_vendor.ref(0);
    const progressList = common_vendor.ref([]);
    const showRelayModal = common_vendor.ref(false);
    const relayForm = common_vendor.ref({ splitType: "FIFTY_FIFTY", customAmount: "", reason: "" });
    const SPLIT_OPTIONS = [
      { value: "FIFTY_FIFTY", label: "五五开", desc: "你和接力接单员平分收入" },
      { value: "FORTY_SIXTY", label: "四六开", desc: "你拿40%，接力接单员拿60%" },
      { value: "THIRTY_SEVENTY", label: "三七开", desc: "你拿30%，接力接单员拿70%" },
      { value: "CUSTOM", label: "自定义金额", desc: "指定你要拿的金额" }
    ];
    const teammateStatusText = { INVITED: "待处理", ACCEPTED: "已接受", REJECTED: "已拒绝", CANCELLED: "已作废", REPLACED: "已更换" };
    const teammateStatusColor = { INVITED: "#e6a23c", ACCEPTED: "#07c160", REJECTED: "#ee0a24", CANCELLED: "#999", REPLACED: "#909399" };
    common_vendor.onLoad((opts) => {
      orderId.value = opts.id;
    });
    common_vendor.onShow(() => {
      loadDetail();
    });
    function commissionRateForOrder(o) {
      if (o && (o.commissionRate === 0 || o.commissionRate != null && o.commissionRate !== "")) {
        return Number(o.commissionRate);
      }
      return 0;
    }
    function commissionPercent(o) {
      return Math.round(commissionRateForOrder(o) * 100);
    }
    function incomeAmount(o) {
      const n = Number(o == null ? void 0 : o.amount) || 0;
      return n * (1 - commissionRateForOrder(o));
    }
    async function loadDetail() {
      const res = await api_order.getOrderDetail(orderId.value);
      order.value = res.data;
      try {
        const pRes = await api_player.getPlayerOrderProgress(orderId.value);
        progressList.value = pRes.data || [];
      } catch (e) {
        progressList.value = [];
      }
    }
    async function doAccept() {
      await utils_subscribe.requestPlayerSubscribe();
      await api_player.acceptOrder(orderId.value);
      common_vendor.index.showToast({ title: "已接单" });
      loadDetail();
    }
    async function doReject() {
      common_vendor.index.showModal({ title: "提示", content: "确定拒绝该指派？", success: async (r) => {
        if (r.confirm) {
          await api_player.rejectAssign(orderId.value);
          common_vendor.index.showToast({ title: "已拒绝" });
          common_vendor.index.navigateBack();
        }
      } });
    }
    async function doStart() {
      await api_player.startOrder(orderId.value);
      common_vendor.index.showToast({ title: "已开始" });
      loadDetail();
    }
    async function doComplete() {
      common_vendor.index.showModal({ title: "提示", content: "确认已完成服务？", success: async (r) => {
        if (r.confirm) {
          await utils_subscribe.requestPlayerSubscribe();
          await api_player.completeOrder(orderId.value);
          common_vendor.index.showToast({ title: "已完成" });
          loadDetail();
        }
      } });
    }
    function openRelayModal() {
      relayForm.value = { splitType: "FIFTY_FIFTY", customAmount: "", reason: "" };
      showRelayModal.value = true;
    }
    function goProgress() {
      common_vendor.index.navigateTo({ url: "/pages-player/order/progress?orderId=" + orderId.value });
    }
    function goChat() {
      common_vendor.index.navigateTo({ url: "/pages-player/chat/room?orderId=" + orderId.value });
    }
    function goInvite() {
      common_vendor.index.navigateTo({ url: "/pages-player/invite/teammate?orderId=" + orderId.value });
    }
    function previewImg(imgs, idx) {
      common_vendor.index.previewImage({ urls: imgs, current: idx });
    }
    async function submitRelayForm() {
      var _a;
      if (!((_a = relayForm.value.reason) == null ? void 0 : _a.trim()))
        return common_vendor.index.showToast({ title: "请输入申请原因", icon: "none" });
      const data = { splitType: relayForm.value.splitType, reason: relayForm.value.reason.trim() };
      if (relayForm.value.splitType === "CUSTOM") {
        const custom = Number(relayForm.value.customAmount);
        if (!relayForm.value.customAmount || custom <= 0) {
          return common_vendor.index.showToast({ title: "请输入有效金额", icon: "none" });
        }
        const maxIncome = order.value ? incomeAmount(order.value) : 0;
        if (custom > maxIncome) {
          return common_vendor.index.showToast({ title: "自定义金额不能超过到手金额 ¥" + maxIncome.toFixed(2), icon: "none" });
        }
        data.splitAmount = custom;
      }
      try {
        await api_player.submitRelay(orderId.value, data);
        common_vendor.index.showToast({ title: "已提交接力申请" });
        showRelayModal.value = false;
        relayForm.value = { splitType: "FIFTY_FIFTY", customAmount: "", reason: "" };
        loadDetail();
      } catch (e) {
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: order.value
      }, order.value ? common_vendor.e({
        b: common_vendor.p({
          status: order.value.status
        }),
        c: common_vendor.t(order.value.orderNo),
        d: common_vendor.t(order.value.productName),
        e: order.value.specCombination || order.value.specInfo
      }, order.value.specCombination || order.value.specInfo ? {
        f: common_vendor.t(order.value.specCombination || order.value.specInfo)
      } : {}, {
        g: common_vendor.p({
          value: order.value.amount,
          size: 32
        }),
        h: common_vendor.t(incomeAmount(order.value).toFixed(2)),
        i: common_vendor.t(commissionPercent(order.value)),
        j: order.value.userNickname
      }, order.value.userNickname ? {
        k: order.value.userAvatar || "/static/images/default-avatar.png",
        l: common_vendor.t(order.value.userNickname)
      } : {}, {
        m: order.value.gameAccount
      }, order.value.gameAccount ? common_vendor.e({
        n: common_vendor.t(order.value.gameAccount),
        o: order.value.contact
      }, order.value.contact ? {
        p: common_vendor.t(order.value.contact)
      } : {}, {
        q: order.value.remark
      }, order.value.remark ? {
        r: common_vendor.t(order.value.remark)
      } : {}) : {}, {
        s: order.value.teammates && order.value.teammates.length
      }, order.value.teammates && order.value.teammates.length ? {
        t: common_vendor.f(order.value.teammates, (t, k0, i0) => {
          return {
            a: t.avatar || "/static/images/default-avatar.png",
            b: common_vendor.t(t.nickname),
            c: "bb34d8c7-2-" + i0,
            d: common_vendor.p({
              status: t.status,
              textMap: teammateStatusText,
              colorMap: teammateStatusColor
            }),
            e: t.id
          };
        })
      } : {}, {
        v: progressList.value.length
      }, progressList.value.length ? {
        w: common_vendor.f(progressList.value, (p, idx, i0) => {
          return common_vendor.e({
            a: common_vendor.t(p.content),
            b: common_vendor.t(p.createdAt),
            c: p.images
          }, p.images ? {
            d: common_vendor.f(p.images.split(","), (img, i, i1) => {
              return {
                a: i,
                b: img,
                c: common_vendor.o(($event) => previewImg(p.images.split(","), i), i)
              };
            })
          } : {}, {
            e: idx
          });
        })
      } : {}, {
        x: order.value.status === "ASSIGNED"
      }, order.value.status === "ASSIGNED" ? {
        y: common_vendor.o(doAccept)
      } : {}, {
        z: order.value.status === "ASSIGNED"
      }, order.value.status === "ASSIGNED" ? {
        A: common_vendor.o(doReject)
      } : {}, {
        B: ["ACCEPTED", "WAITING_TEAMMATE"].includes(order.value.status)
      }, ["ACCEPTED", "WAITING_TEAMMATE"].includes(order.value.status) ? {
        C: common_vendor.o(doStart)
      } : {}, {
        D: order.value.status === "IN_PROGRESS"
      }, order.value.status === "IN_PROGRESS" ? {
        E: common_vendor.o(goProgress)
      } : {}, {
        F: order.value.status === "IN_PROGRESS"
      }, order.value.status === "IN_PROGRESS" ? {
        G: common_vendor.o(doComplete)
      } : {}, {
        H: order.value.status === "IN_PROGRESS"
      }, order.value.status === "IN_PROGRESS" ? {
        I: common_vendor.o(openRelayModal)
      } : {}, {
        J: ["ACCEPTED", "WAITING_TEAMMATE"].includes(order.value.status) && order.value.playerId
      }, ["ACCEPTED", "WAITING_TEAMMATE"].includes(order.value.status) && order.value.playerId ? {
        K: common_vendor.o(goInvite)
      } : {}, {
        L: ["ACCEPTED", "WAITING_TEAMMATE", "IN_PROGRESS", "COMPLETED", "CONFIRMED"].includes(order.value.status)
      }, ["ACCEPTED", "WAITING_TEAMMATE", "IN_PROGRESS", "COMPLETED", "CONFIRMED"].includes(order.value.status) ? {
        M: common_vendor.o(goChat)
      } : {}, {
        N: showRelayModal.value
      }, showRelayModal.value ? common_vendor.e({
        O: common_vendor.f(SPLIT_OPTIONS, (opt, k0, i0) => {
          return {
            a: common_vendor.t(opt.label),
            b: common_vendor.t(opt.desc),
            c: opt.value,
            d: relayForm.value.splitType === opt.value ? 1 : "",
            e: common_vendor.o(($event) => relayForm.value.splitType = opt.value, opt.value)
          };
        }),
        P: relayForm.value.splitType === "CUSTOM"
      }, relayForm.value.splitType === "CUSTOM" ? {
        Q: relayForm.value.customAmount,
        R: common_vendor.o(($event) => relayForm.value.customAmount = $event.detail.value)
      } : {}, {
        S: relayForm.value.reason,
        T: common_vendor.o(($event) => relayForm.value.reason = $event.detail.value),
        U: common_vendor.o(($event) => showRelayModal.value = false),
        V: common_vendor.o(submitRelayForm),
        W: common_vendor.o(() => {
        }),
        X: common_vendor.o(($event) => showRelayModal.value = false)
      }) : {}) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bb34d8c7"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages-player/order/detail.js.map
