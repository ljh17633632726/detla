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
    const statusLabelMap = {
      PENDING_PAYMENT: "待支付",
      PAID: "待接单",
      ASSIGNED: "已指派",
      ACCEPTED: "已接单",
      WAITING_TEAMMATE: "组队中",
      IN_PROGRESS: "进行中",
      COMPLETED: "待确认",
      CONFIRMED: "已完成",
      REVIEWED: "已评价",
      CANCELLED: "已取消",
      REFUNDING: "退款中",
      REFUNDED: "已退款",
      DISPUTED: "争议中",
      ARBITRATED: "已仲裁"
    };
    function statusLabel(s) {
      return statusLabelMap[s] || s;
    }
    const order = common_vendor.ref(null);
    const progressList = common_vendor.ref([]);
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
      await loadDetail();
    });
    function goAssign() {
      common_vendor.index.navigateTo({ url: "/pages-cs/order/assign?orderId=" + orderId.value });
    }
    function goChat() {
      common_vendor.index.navigateTo({ url: "/pages-cs/chat/room?orderId=" + orderId.value });
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
    async function loadDetail() {
      const [detailRes, progressRes] = await Promise.all([
        pagesCs_api_cs.getCsOrderDetail(orderId.value),
        pagesCs_api_cs.getCsOrderProgress(orderId.value)
      ]);
      order.value = detailRes.data;
      progressList.value = progressRes.data || [];
    }
    async function doRefund() {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定为该订单退款？订单将被取消并退回支付金额。",
        success: async (r) => {
          var _a;
          if (r.confirm) {
            try {
              await pagesCs_api_cs.csRefundOrder(orderId.value);
              common_vendor.index.showToast({ title: "退款已提交" });
              await loadDetail();
            } catch (e) {
              common_vendor.index.showToast({ title: ((_a = e == null ? void 0 : e.data) == null ? void 0 : _a.msg) || "操作失败", icon: "none" });
            }
          }
        }
      });
    }
    async function doConfirm() {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定手动结单？订单将变为已确认状态。",
        success: async (r) => {
          var _a;
          if (r.confirm) {
            try {
              await pagesCs_api_cs.csConfirmOrder(orderId.value);
              common_vendor.index.showToast({ title: "已结单" });
              await loadDetail();
            } catch (e) {
              common_vendor.index.showToast({ title: ((_a = e == null ? void 0 : e.data) == null ? void 0 : _a.msg) || "操作失败", icon: "none" });
            }
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
        f: order.value.specCombination
      }, order.value.specCombination ? {
        g: common_vendor.t(order.value.specCombination)
      } : {}, {
        h: common_vendor.t(Number(order.value.amount).toFixed(2)),
        i: common_vendor.t(order.value.createdAt),
        j: parsedExtra.value.length
      }, parsedExtra.value.length ? {
        k: common_vendor.f(parsedExtra.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.key),
            b: common_vendor.t(item.value),
            c: common_vendor.o(($event) => copyDetailItem(item), item.key),
            d: item.key
          };
        })
      } : {}, {
        l: common_vendor.t(order.value.userNickname || "ID: " + order.value.userId),
        m: order.value.contact
      }, order.value.contact ? {
        n: common_vendor.t(order.value.contact)
      } : {}, {
        o: order.value.playerId
      }, order.value.playerId ? {
        p: common_vendor.t(order.value.playerName || "ID: " + order.value.playerId)
      } : {}, {
        q: progressList.value.length
      }, progressList.value.length ? {
        r: common_vendor.f(progressList.value, (p, idx, i0) => {
          return common_vendor.e({
            a: idx === progressList.value.length - 1 ? 1 : "",
            b: common_vendor.t(p.createdAt),
            c: common_vendor.t(p.content || statusLabel(p.toStatus) || p.toStatus),
            d: p.images
          }, p.images ? {
            e: common_vendor.f(p.images.split(","), (img, i, i1) => {
              return {
                a: i,
                b: img,
                c: common_vendor.o(($event) => previewImg(p.images.split(","), i), i)
              };
            })
          } : {}, {
            f: p.id || idx
          });
        })
      } : {}, {
        s: order.value.status === "PAID" || order.value.status === "PENDING"
      }, order.value.status === "PAID" || order.value.status === "PENDING" ? {
        t: common_vendor.o(goAssign)
      } : {}, {
        v: order.value.status === "COMPLETED"
      }, order.value.status === "COMPLETED" ? {
        w: common_vendor.o(doConfirm)
      } : {}, {
        x: ["ASSIGNED", "IN_PROGRESS"].includes(order.value.status)
      }, ["ASSIGNED", "IN_PROGRESS"].includes(order.value.status) ? {
        y: common_vendor.o(doRefund)
      } : {}, {
        z: common_vendor.o(goChat)
      }) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-32640858"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages-cs/order/detail.js.map
