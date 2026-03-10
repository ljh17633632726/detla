"use strict";
const common_vendor = require("../../common/vendor.js");
const pagesCs_api_cs = require("../api/cs.js");
if (!Math) {
  StatusTag();
}
const StatusTag = () => "../../components/StatusTag.js";
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const order = common_vendor.ref(null);
    const orderId = common_vendor.ref("");
    common_vendor.onLoad(async (opts) => {
      orderId.value = opts.id;
      const res = await pagesCs_api_cs.getCsOrderDetail(opts.id);
      order.value = res.data;
    });
    function goAssign() {
      common_vendor.index.navigateTo({ url: "/pages-cs/order/assign?orderId=" + orderId.value });
    }
    function goChat() {
      common_vendor.index.navigateTo({ url: "/pages-cs/chat/room?orderId=" + orderId.value });
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
        e: order.value.specCombination
      }, order.value.specCombination ? {
        f: common_vendor.t(order.value.specCombination)
      } : {}, {
        g: common_vendor.t(Number(order.value.amount).toFixed(2)),
        h: common_vendor.t(order.value.createdAt),
        i: common_vendor.t(order.value.userNickname || order.value.userId),
        j: order.value.contact
      }, order.value.contact ? {
        k: common_vendor.t(order.value.contact)
      } : {}, {
        l: order.value.playerId
      }, order.value.playerId ? {
        m: common_vendor.t(order.value.playerNickname || order.value.playerId)
      } : {}, {
        n: order.value.gameAccount
      }, order.value.gameAccount ? common_vendor.e({
        o: common_vendor.t(order.value.gameAccount),
        p: order.value.remark
      }, order.value.remark ? {
        q: common_vendor.t(order.value.remark)
      } : {}) : {}, {
        r: order.value.status === "PAID" || order.value.status === "PENDING"
      }, order.value.status === "PAID" || order.value.status === "PENDING" ? {
        s: common_vendor.o(goAssign)
      } : {}, {
        t: common_vendor.o(goChat)
      }) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-32640858"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages-cs/order/detail.js.map
