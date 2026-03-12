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
        i: parsedExtra.value.length
      }, parsedExtra.value.length ? {
        j: common_vendor.f(parsedExtra.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.key),
            b: common_vendor.t(item.value),
            c: item.key
          };
        })
      } : {}, {
        k: common_vendor.t(order.value.userNickname || order.value.userId),
        l: order.value.contact
      }, order.value.contact ? {
        m: common_vendor.t(order.value.contact)
      } : {}, {
        n: order.value.playerId
      }, order.value.playerId ? {
        o: common_vendor.t(order.value.playerNickname || order.value.playerId)
      } : {}, {
        p: order.value.status === "PAID" || order.value.status === "PENDING"
      }, order.value.status === "PAID" || order.value.status === "PENDING" ? {
        q: common_vendor.o(goAssign)
      } : {}, {
        r: common_vendor.o(goChat)
      }) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-32640858"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages-cs/order/detail.js.map
