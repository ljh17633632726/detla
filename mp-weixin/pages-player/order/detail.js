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
    const showReplaceModal = common_vendor.ref(false);
    const hasTeammate = common_vendor.computed(() => {
      var _a;
      const t = (_a = order.value) == null ? void 0 : _a.teammates;
      return t && t.some((m) => m.status === "ACCEPTED" || m.status === "INVITED");
    });
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
    async function doReplace(type) {
      const msgs = {
        all: "确定两个都换？主接单员和队友都将退出，订单回到接单大厅。",
        self: "确定换自己？你将退出该订单且不参与分成，订单回到接单大厅。",
        teammate: "确定换队友？队友将被移除且不参与分成，你可以重新邀请新队友。"
      };
      common_vendor.index.showModal({
        title: "确认换人",
        content: msgs[type],
        success: async (r) => {
          if (!r.confirm)
            return;
          try {
            if (type === "all")
              await api_player.replaceAll(orderId.value);
            else if (type === "self")
              await api_player.replaceSelf(orderId.value);
            else
              await api_player.replaceTeammate(orderId.value);
            showReplaceModal.value = false;
            if (type === "teammate") {
              common_vendor.index.showToast({ title: "队友已移除" });
              loadDetail();
            } else {
              common_vendor.index.showToast({ title: "已退出订单" });
              setTimeout(() => common_vendor.index.navigateBack(), 1500);
            }
          } catch (e) {
            common_vendor.index.showToast({ title: (e == null ? void 0 : e.msg) || "操作失败", icon: "none" });
          }
        }
      });
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
        m: parsedExtra.value.length
      }, parsedExtra.value.length ? {
        n: common_vendor.f(parsedExtra.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.key),
            b: common_vendor.t(item.value),
            c: item.key
          };
        })
      } : {}, {
        o: order.value.teammates && order.value.teammates.length
      }, order.value.teammates && order.value.teammates.length ? {
        p: common_vendor.f(order.value.teammates, (t, k0, i0) => {
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
        q: progressList.value.length
      }, progressList.value.length ? {
        r: common_vendor.f(progressList.value, (p, idx, i0) => {
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
        s: order.value.status === "ASSIGNED"
      }, order.value.status === "ASSIGNED" ? {
        t: common_vendor.o(doAccept)
      } : {}, {
        v: order.value.status === "ASSIGNED"
      }, order.value.status === "ASSIGNED" ? {
        w: common_vendor.o(doReject)
      } : {}, {
        x: ["ACCEPTED", "WAITING_TEAMMATE"].includes(order.value.status)
      }, ["ACCEPTED", "WAITING_TEAMMATE"].includes(order.value.status) ? {
        y: common_vendor.o(doStart)
      } : {}, {
        z: order.value.status === "IN_PROGRESS"
      }, order.value.status === "IN_PROGRESS" ? {
        A: common_vendor.o(goProgress)
      } : {}, {
        B: order.value.status === "IN_PROGRESS"
      }, order.value.status === "IN_PROGRESS" ? {
        C: common_vendor.o(doComplete)
      } : {}, {
        D: order.value.status === "IN_PROGRESS"
      }, order.value.status === "IN_PROGRESS" ? {
        E: common_vendor.o(($event) => showReplaceModal.value = true)
      } : {}, {
        F: ["ACCEPTED", "WAITING_TEAMMATE", "IN_PROGRESS"].includes(order.value.status) && order.value.playerId
      }, ["ACCEPTED", "WAITING_TEAMMATE", "IN_PROGRESS"].includes(order.value.status) && order.value.playerId ? {
        G: common_vendor.o(goInvite)
      } : {}, {
        H: ["ACCEPTED", "WAITING_TEAMMATE", "IN_PROGRESS", "COMPLETED", "CONFIRMED"].includes(order.value.status)
      }, ["ACCEPTED", "WAITING_TEAMMATE", "IN_PROGRESS", "COMPLETED", "CONFIRMED"].includes(order.value.status) ? {
        I: common_vendor.o(goChat)
      } : {}, {
        J: showReplaceModal.value
      }, showReplaceModal.value ? common_vendor.e({
        K: hasTeammate.value
      }, hasTeammate.value ? {
        L: common_vendor.o(($event) => doReplace("all"))
      } : {}, {
        M: !hasTeammate.value
      }, !hasTeammate.value ? {
        N: common_vendor.o(($event) => doReplace("self"))
      } : {}, {
        O: hasTeammate.value
      }, hasTeammate.value ? {
        P: common_vendor.o(($event) => doReplace("teammate"))
      } : {}, {
        Q: common_vendor.o(($event) => showReplaceModal.value = false),
        R: common_vendor.o(() => {
        }),
        S: common_vendor.o(($event) => showReplaceModal.value = false)
      }) : {}) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bb34d8c7"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages-player/order/detail.js.map
