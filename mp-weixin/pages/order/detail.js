"use strict";
const common_vendor = require("../../common/vendor.js");
const api_order = require("../../api/order.js");
const utils_constants = require("../../utils/constants.js");
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
    const parsedExtra = common_vendor.computed(() => {
      const o = order.value;
      if (!o)
        return [];
      if (o.extraFields) {
        try {
          const obj = typeof o.extraFields === "string" ? JSON.parse(o.extraFields) : o.extraFields;
          return Object.entries(obj).map(([key, value]) => ({ key, value }));
        } catch {
        }
      }
      const legacy = [];
      if (o.gameAccount)
        legacy.push({ key: "关联账号", value: o.gameAccount });
      if (o.contact)
        legacy.push({ key: "联系ID", value: o.contact });
      if (o.remark)
        legacy.push({ key: "备注", value: o.remark });
      return legacy;
    });
    common_vendor.onLoad((opts) => {
      orderId.value = opts.id;
    });
    common_vendor.onShow(() => {
      loadDetail();
    });
    async function loadDetail() {
      const res = await api_order.getOrderDetail(orderId.value);
      order.value = res.data;
      try {
        const pRes = await api_order.getOrderProgress(orderId.value);
        progressList.value = pRes.data || [];
      } catch (e) {
        progressList.value = [];
      }
    }
    function goPay() {
      common_vendor.index.navigateTo({ url: `/pages/order/pay?orderId=${orderId.value}&amount=${order.value.amount}` });
    }
    async function doCancel() {
      common_vendor.index.showModal({ title: "提示", content: "确定取消订单？", success: async (r) => {
        if (r.confirm) {
          await api_order.cancelOrder(orderId.value);
          common_vendor.index.showToast({ title: "已取消" });
          loadDetail();
        }
      } });
    }
    async function doRefund() {
      common_vendor.index.showModal({ title: "提示", content: "确定申请退款？订单将被取消并退回支付金额？", success: async (r) => {
        if (r.confirm) {
          await api_order.cancelOrder(orderId.value);
          common_vendor.index.showToast({ title: "退款申请已提交" });
          loadDetail();
        }
      } });
    }
    async function doConfirm() {
      common_vendor.index.showModal({ title: "提示", content: "确认服务已完成？", success: async (r) => {
        if (r.confirm) {
          await utils_subscribe.requestOrderSubscribe();
          await api_order.confirmOrder(orderId.value);
          common_vendor.index.showToast({ title: "已确认" });
          loadDetail();
        }
      } });
    }
    function goReview() {
      common_vendor.index.navigateTo({ url: `/pages/review/create?orderId=${orderId.value}` });
    }
    function goChat() {
      var _a;
      const name = ((_a = order.value) == null ? void 0 : _a.playerName) || "";
      common_vendor.index.navigateTo({ url: `/pages/chat/room?orderId=${orderId.value}&name=${encodeURIComponent(name)}` });
    }
    function goComplaint() {
      common_vendor.index.navigateTo({ url: `/pages/complaint/create?orderId=${orderId.value}` });
    }
    const showReplaceModal = common_vendor.ref(false);
    const replaceReason = common_vendor.ref("");
    const showDesignatePicker = common_vendor.ref(false);
    const playerKeyword = common_vendor.ref("");
    const playerList = common_vendor.ref([]);
    const designateSelectedPlayer = common_vendor.ref(null);
    const maxConcurrent = common_vendor.ref(5);
    common_vendor.watch(showDesignatePicker, (val) => {
      if (val)
        searchPlayers();
    });
    async function doReplace() {
      var _a;
      if (!replaceReason.value.trim())
        return common_vendor.index.showToast({ title: "请输入换人原因", icon: "none" });
      try {
        await api_order.requestReplace(orderId.value, { reason: replaceReason.value });
        common_vendor.index.showToast({ title: "已提交申请" });
        showReplaceModal.value = false;
        replaceReason.value = "";
      } catch (e) {
        common_vendor.index.showToast({ title: ((_a = e == null ? void 0 : e.data) == null ? void 0 : _a.msg) || "提交失败", icon: "none" });
      }
    }
    function previewImg(imgs, idx) {
      common_vendor.index.previewImage({ urls: imgs, current: idx });
    }
    async function searchPlayers() {
      try {
        const res = await api_order.getAvailablePlayers({ keyword: playerKeyword.value });
        const data = res.data || {};
        if (data.maxConcurrent)
          maxConcurrent.value = data.maxConcurrent;
        const page = data.players || {};
        playerList.value = page.records || [];
      } catch (e) {
        playerList.value = [];
      }
    }
    async function pickPlayer(p) {
      var _a;
      if (isFull(p)) {
        return common_vendor.index.showToast({
          title: `该接单员当前进行中 ${p.activeOrders || 0} 单，已达上限 ${maxConcurrent.value}`,
          icon: "none"
        });
      }
      designateSelectedPlayer.value = p;
      try {
        await api_order.designatePlayer(orderId.value, p.id);
        common_vendor.index.showToast({ title: "已指定接单员" });
        showDesignatePicker.value = false;
        designateSelectedPlayer.value = null;
        loadDetail();
      } catch (e) {
        common_vendor.index.showToast({ title: ((_a = e == null ? void 0 : e.data) == null ? void 0 : _a.msg) || "指定失败", icon: "none" });
      }
    }
    function isFull(p) {
      return (p.activeOrders || 0) >= maxConcurrent.value;
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
        e: order.value.specInfo || order.value.specCombination
      }, order.value.specInfo || order.value.specCombination ? {
        f: common_vendor.t(order.value.specCombination || order.value.specInfo)
      } : {}, {
        g: common_vendor.p({
          value: order.value.amount,
          size: 32
        }),
        h: parsedExtra.value.length
      }, parsedExtra.value.length ? {
        i: common_vendor.f(parsedExtra.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.key),
            b: common_vendor.t(item.value),
            c: item.key
          };
        })
      } : {}, {
        j: order.value.playerName || order.value.playerId
      }, order.value.playerName || order.value.playerId ? common_vendor.e({
        k: common_vendor.t(order.value.playerName || "已指派"),
        l: order.value.playerPhone
      }, order.value.playerPhone ? {
        m: common_vendor.t(order.value.playerPhone)
      } : {}) : {}, {
        n: progressList.value.length
      }, progressList.value.length ? {
        o: common_vendor.f(progressList.value, (p, idx, i0) => {
          return common_vendor.e({
            a: idx === 0 ? 1 : "",
            b: idx < progressList.value.length - 1
          }, idx < progressList.value.length - 1 ? {} : {}, {
            c: common_vendor.t(p.content || p.description || common_vendor.unref(utils_constants.ORDER_STATUS_TEXT)[p.status] || p.status),
            d: common_vendor.t(p.createdAt),
            e: p.images
          }, p.images ? {
            f: common_vendor.f(p.images.split(","), (img, i, i1) => {
              return {
                a: i,
                b: img,
                c: common_vendor.o(($event) => previewImg(p.images.split(","), i), i)
              };
            })
          } : {}, {
            g: idx
          });
        })
      } : {}, {
        p: order.value.status === "PENDING_PAYMENT"
      }, order.value.status === "PENDING_PAYMENT" ? {
        q: common_vendor.o(goPay)
      } : {}, {
        r: order.value.status === "PENDING_PAYMENT"
      }, order.value.status === "PENDING_PAYMENT" ? {
        s: common_vendor.o(doCancel)
      } : {}, {
        t: order.value.status === "PAID"
      }, order.value.status === "PAID" ? {
        v: common_vendor.o(doRefund)
      } : {}, {
        w: order.value.status === "PAID" && !order.value.playerId
      }, order.value.status === "PAID" && !order.value.playerId ? {
        x: common_vendor.o(($event) => showDesignatePicker.value = true)
      } : {}, {
        y: order.value.status === "COMPLETED"
      }, order.value.status === "COMPLETED" ? {
        z: common_vendor.o(doConfirm)
      } : {}, {
        A: order.value.status === "CONFIRMED" && !order.value.reviewed
      }, order.value.status === "CONFIRMED" && !order.value.reviewed ? {
        B: common_vendor.o(goReview)
      } : {}, {
        C: ["IN_PROGRESS", "COMPLETED", "CONFIRMED"].includes(order.value.status)
      }, ["IN_PROGRESS", "COMPLETED", "CONFIRMED"].includes(order.value.status) ? {
        D: common_vendor.o(goChat)
      } : {}, {
        E: order.value.status === "IN_PROGRESS"
      }, order.value.status === "IN_PROGRESS" ? {
        F: common_vendor.o(($event) => showReplaceModal.value = true)
      } : {}, {
        G: ["IN_PROGRESS", "COMPLETED"].includes(order.value.status)
      }, ["IN_PROGRESS", "COMPLETED"].includes(order.value.status) ? {
        H: common_vendor.o(goComplaint)
      } : {}, {
        I: common_vendor.t(order.value.createdAt),
        J: order.value.paidAt
      }, order.value.paidAt ? {
        K: common_vendor.t(order.value.paidAt)
      } : {}, {
        L: order.value.completedAt
      }, order.value.completedAt ? {
        M: common_vendor.t(order.value.completedAt)
      } : {}, {
        N: showDesignatePicker.value
      }, showDesignatePicker.value ? common_vendor.e({
        O: common_vendor.o(($event) => showDesignatePicker.value = false),
        P: common_vendor.t(maxConcurrent.value),
        Q: common_vendor.o(searchPlayers),
        R: playerKeyword.value,
        S: common_vendor.o(($event) => playerKeyword.value = $event.detail.value),
        T: common_vendor.o(searchPlayers),
        U: common_vendor.f(playerList.value, (p, k0, i0) => {
          return common_vendor.e({
            a: p.avatar || "/static/images/default-avatar.png",
            b: common_vendor.t(p.nickname || "-"),
            c: common_vendor.t(p.completedOrders || 0),
            d: common_vendor.t(p.activeOrders || 0),
            e: isFull(p)
          }, isFull(p) ? {} : {}, {
            f: designateSelectedPlayer.value && designateSelectedPlayer.value.id === p.id
          }, designateSelectedPlayer.value && designateSelectedPlayer.value.id === p.id ? {} : {}, {
            g: p.id,
            h: isFull(p) ? 1 : "",
            i: common_vendor.o(($event) => pickPlayer(p), p.id)
          });
        }),
        V: common_vendor.t(maxConcurrent.value),
        W: playerList.value.length === 0
      }, playerList.value.length === 0 ? {} : {}, {
        X: common_vendor.o(($event) => showDesignatePicker.value = false),
        Y: common_vendor.o(($event) => showDesignatePicker.value = false),
        Z: showDesignatePicker.value ? 1 : "",
        aa: common_vendor.o(() => {
        }),
        ab: common_vendor.o(($event) => showDesignatePicker.value = false)
      }) : {}, {
        ac: showReplaceModal.value
      }, showReplaceModal.value ? {
        ad: replaceReason.value,
        ae: common_vendor.o(($event) => replaceReason.value = $event.detail.value),
        af: common_vendor.o(($event) => showReplaceModal.value = false),
        ag: common_vendor.o(doReplace),
        ah: common_vendor.o(() => {
        }),
        ai: common_vendor.o(($event) => showReplaceModal.value = false)
      } : {}) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6b23c96c"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/order/detail.js.map
