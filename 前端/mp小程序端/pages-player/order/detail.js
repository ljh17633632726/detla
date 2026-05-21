"use strict";
const common_vendor = require("../../common/vendor.js");
const api_player = require("../../api/player.js");
const api_order = require("../../api/order.js");
const utils_subscribe = require("../../utils/subscribe.js");
if (!Math) {
  (StatusTag + PriceText + ImageUploader)();
}
const StatusTag = () => "../../components/StatusTag.js";
const PriceText = () => "../../components/PriceText.js";
const ImageUploader = () => "../../components/ImageUploader.js";
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
    const showCompleteModal = common_vendor.ref(false);
    const endServiceImages = common_vendor.ref([]);
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
    function doComplete() {
      showCompleteModal.value = true;
    }
    function closeCompleteModal() {
      showCompleteModal.value = false;
      endServiceImages.value = [];
    }
    async function submitComplete() {
      var _a;
      if (!endServiceImages.value.length) {
        return common_vendor.index.showToast({ title: "请至少上传一张结束服务图片", icon: "none" });
      }
      try {
        await utils_subscribe.requestPlayerSubscribe();
        await api_player.completeOrder(orderId.value, { images: endServiceImages.value.join(",") });
        common_vendor.index.showToast({ title: "已完成" });
        closeCompleteModal();
        loadDetail();
      } catch (e) {
        common_vendor.index.showToast({ title: ((_a = e == null ? void 0 : e.data) == null ? void 0 : _a.msg) || "完成失败", icon: "none" });
      }
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
    function copyText(text, title) {
      if (!text) {
        return common_vendor.index.showToast({ title: "暂无可复制内容", icon: "none" });
      }
      common_vendor.index.setClipboardData({
        data: text,
        success: () => common_vendor.index.showToast({ title, icon: "none" })
      });
    }
    function copyOrderNo() {
      var _a;
      copyText(((_a = order.value) == null ? void 0 : _a.orderNo) || "", "订单号已复制");
    }
    function copyDetailItem(item) {
      copyText(String((item == null ? void 0 : item.value) ?? ""), `${(item == null ? void 0 : item.key) || "内容"}已复制`);
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
        d: common_vendor.o(copyOrderNo),
        e: common_vendor.t(order.value.productName),
        f: order.value.specCombination || order.value.specInfo
      }, order.value.specCombination || order.value.specInfo ? {
        g: common_vendor.t(order.value.specCombination || order.value.specInfo)
      } : {}, {
        h: common_vendor.p({
          value: order.value.amount,
          size: 32
        }),
        i: common_vendor.t(incomeAmount(order.value).toFixed(2)),
        j: common_vendor.t(commissionPercent(order.value)),
        k: order.value.userNickname
      }, order.value.userNickname ? {
        l: order.value.userAvatar || "/static/images/default-avatar.png",
        m: common_vendor.t(order.value.userNickname)
      } : {}, {
        n: parsedExtra.value.length
      }, parsedExtra.value.length ? {
        o: common_vendor.f(parsedExtra.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.key),
            b: common_vendor.t(item.value),
            c: common_vendor.o(($event) => copyDetailItem(item), item.key),
            d: item.key
          };
        })
      } : {}, {
        p: order.value.teammates && order.value.teammates.length
      }, order.value.teammates && order.value.teammates.length ? {
        q: common_vendor.f(order.value.teammates, (t, k0, i0) => {
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
        r: progressList.value.length
      }, progressList.value.length ? {
        s: common_vendor.f(progressList.value, (p, idx, i0) => {
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
        t: order.value.status === "ASSIGNED"
      }, order.value.status === "ASSIGNED" ? {
        v: common_vendor.o(doAccept)
      } : {}, {
        w: order.value.status === "ASSIGNED"
      }, order.value.status === "ASSIGNED" ? {
        x: common_vendor.o(doReject)
      } : {}, {
        y: ["ACCEPTED", "WAITING_TEAMMATE"].includes(order.value.status)
      }, ["ACCEPTED", "WAITING_TEAMMATE"].includes(order.value.status) ? {
        z: common_vendor.o(doStart)
      } : {}, {
        A: order.value.status === "IN_PROGRESS"
      }, order.value.status === "IN_PROGRESS" ? {
        B: common_vendor.o(goProgress)
      } : {}, {
        C: order.value.status === "IN_PROGRESS"
      }, order.value.status === "IN_PROGRESS" ? {
        D: common_vendor.o(doComplete)
      } : {}, {
        E: order.value.status === "IN_PROGRESS"
      }, order.value.status === "IN_PROGRESS" ? {
        F: common_vendor.o(($event) => showReplaceModal.value = true)
      } : {}, {
        G: ["IN_PROGRESS"].includes(order.value.status) && order.value.playerId
      }, ["IN_PROGRESS"].includes(order.value.status) && order.value.playerId ? {
        H: common_vendor.o(goInvite)
      } : {}, {
        I: ["ACCEPTED", "WAITING_TEAMMATE", "IN_PROGRESS", "COMPLETED", "CONFIRMED"].includes(order.value.status)
      }, ["ACCEPTED", "WAITING_TEAMMATE", "IN_PROGRESS", "COMPLETED", "CONFIRMED"].includes(order.value.status) ? {
        J: common_vendor.o(goChat)
      } : {}, {
        K: showCompleteModal.value
      }, showCompleteModal.value ? {
        L: common_vendor.o(($event) => endServiceImages.value = $event),
        M: common_vendor.p({
          max: 6,
          modelValue: endServiceImages.value
        }),
        N: common_vendor.o(closeCompleteModal),
        O: common_vendor.o(submitComplete),
        P: common_vendor.o(() => {
        }),
        Q: common_vendor.o(closeCompleteModal)
      } : {}, {
        R: showReplaceModal.value
      }, showReplaceModal.value ? common_vendor.e({
        S: hasTeammate.value
      }, hasTeammate.value ? {
        T: common_vendor.o(($event) => doReplace("all"))
      } : {}, {
        U: !hasTeammate.value
      }, !hasTeammate.value ? {
        V: common_vendor.o(($event) => doReplace("self"))
      } : {}, {
        W: hasTeammate.value
      }, hasTeammate.value ? {
        X: common_vendor.o(($event) => doReplace("teammate"))
      } : {}, {
        Y: common_vendor.o(($event) => showReplaceModal.value = false),
        Z: common_vendor.o(() => {
        }),
        aa: common_vendor.o(($event) => showReplaceModal.value = false)
      }) : {}) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bb34d8c7"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages-player/order/detail.js.map
