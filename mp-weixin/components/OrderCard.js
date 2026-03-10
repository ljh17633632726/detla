"use strict";
const common_vendor = require("../common/vendor.js");
if (!Math) {
  StatusTag();
}
const StatusTag = () => "./StatusTag.js";
const _sfc_main = {
  __name: "OrderCard",
  props: {
    order: { type: Object, required: true },
    detailPath: { type: String, default: "/pages/order/detail" },
    /** 嵌入模式：无背景/边框/外边距，由外层作为卡片容器 */
    embed: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const isPlayerView = common_vendor.computed(() => props.detailPath.includes("pages-player"));
    const playerCommissionRateValue = common_vendor.computed(() => {
      const o = props.order;
      if (o && (o.commissionRate === 0 || o.commissionRate != null && o.commissionRate !== "")) {
        return Number(o.commissionRate);
      }
      return 0;
    });
    const playerCommissionPercent = common_vendor.computed(() => Math.round(playerCommissionRateValue.value * 100));
    const playerIncomeAmount = common_vendor.computed(() => {
      var _a;
      const n = Number((_a = props.order) == null ? void 0 : _a.amount) || 0;
      return n * (1 - playerCommissionRateValue.value);
    });
    const showChat = common_vendor.computed(() => {
      if (!props.order.playerId)
        return false;
      const chatStatuses = ["ACCEPTED", "WAITING_TEAMMATE", "IN_PROGRESS", "COMPLETED", "CONFIRMED"];
      return chatStatuses.includes(props.order.status);
    });
    const actionText = common_vendor.computed(() => {
      if (isPlayerView.value) {
        const playerMap = {
          ASSIGNED: "接单",
          ACCEPTED: "开始服务",
          IN_PROGRESS: "提交进度"
        };
        return playerMap[props.order.status] || "";
      }
      const map = {
        PENDING_PAYMENT: "去支付",
        COMPLETED: "确认完成",
        CONFIRMED: "去评价"
      };
      return map[props.order.status] || "";
    });
    function formatTime(t) {
      if (!t)
        return "";
      return String(t).replace("T", " ").slice(0, 16);
    }
    function goDetail() {
      common_vendor.index.navigateTo({ url: `${props.detailPath}?id=${props.order.id}` });
    }
    function goChat() {
      const chatPath = isPlayerView.value ? "/pages-player/chat/room" : "/pages/chat/room";
      common_vendor.index.navigateTo({ url: `${chatPath}?orderId=${props.order.id}` });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(__props.order.productName),
        b: common_vendor.p({
          status: __props.order.status
        }),
        c: __props.order.specInfo
      }, __props.order.specInfo ? {
        d: common_vendor.t(__props.order.specInfo)
      } : {}, {
        e: common_vendor.t(__props.order.orderNo),
        f: __props.order.playerId && !isPlayerView.value
      }, __props.order.playerId && !isPlayerView.value ? {
        g: __props.order.playerAvatar || "/static/images/default-avatar.png",
        h: common_vendor.t(__props.order.playerName || "接单员" + __props.order.playerId)
      } : {}, {
        i: __props.order.userNickname && isPlayerView.value
      }, __props.order.userNickname && isPlayerView.value ? {
        j: __props.order.userAvatar || "/static/images/default-avatar.png",
        k: common_vendor.t(__props.order.userNickname)
      } : {}, {
        l: common_vendor.t(Number(__props.order.amount).toFixed(2)),
        m: common_vendor.t(formatTime(__props.order.createdAt)),
        n: showChat.value
      }, showChat.value ? {
        o: common_vendor.o(goChat)
      } : {}, {
        p: actionText.value
      }, actionText.value ? {
        q: common_vendor.t(actionText.value),
        r: common_vendor.o(goDetail)
      } : {}, {
        s: isPlayerView.value
      }, isPlayerView.value ? {
        t: common_vendor.t(playerIncomeAmount.value.toFixed(2)),
        v: common_vendor.t(playerCommissionPercent.value)
      } : {}, {
        w: __props.embed ? 1 : "",
        x: common_vendor.o(goDetail)
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e55d4433"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/OrderCard.js.map
