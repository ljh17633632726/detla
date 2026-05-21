"use strict";
const common_vendor = require("../../common/vendor.js");
const api_player = require("../../api/player.js");
if (!Math) {
  EmptyState();
}
const EmptyState = () => "../../components/EmptyState.js";
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const TX_TYPE_MAP = { PAY: "支付", REFUND: "退款", WITHDRAW: "提现", INCOME: "订单收益", RECHARGE: "充值" };
    const records = common_vendor.ref([]);
    const pageNum = common_vendor.ref(1);
    const loading = common_vendor.ref(false);
    const finished = common_vendor.ref(false);
    common_vendor.onLoad(() => {
      loadData();
    });
    function parseRemark(remark) {
      var _a, _b, _c, _d;
      if (!remark)
        return null;
      try {
        const orderAmount = (_a = remark.match(/订单金额:¥([\d.]+)/)) == null ? void 0 : _a[1];
        const commissionRate = (_b = remark.match(/平台抽成:([\d.]+)%/)) == null ? void 0 : _b[1];
        const commissionAmount = (_c = remark.match(/抽成金额:¥([\d.]+)/)) == null ? void 0 : _c[1];
        const income = (_d = remark.match(/实际收入:¥([\d.]+)/)) == null ? void 0 : _d[1];
        if (orderAmount)
          return { orderAmount, commissionRate, commissionAmount, income };
      } catch (e) {
      }
      return null;
    }
    async function loadData() {
      var _a;
      loading.value = true;
      const res = await api_player.getEarningsDetail({ pageNum: pageNum.value, pageSize: 20 });
      const list = (((_a = res.data) == null ? void 0 : _a.records) || []).map((item) => ({
        ...item,
        remarkInfo: parseRemark(item.remark)
      }));
      if (list.length < 20)
        finished.value = true;
      records.value = pageNum.value === 1 ? list : [...records.value, ...list];
      loading.value = false;
    }
    function loadMore() {
      if (!loading.value && !finished.value) {
        pageNum.value++;
        loadData();
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(records.value, (item, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.type === "INCOME" ? "订单收益" : TX_TYPE_MAP[item.type] || item.type),
            b: common_vendor.t(item.createdAt),
            c: item.remarkInfo
          }, item.remarkInfo ? {
            d: common_vendor.t(item.remarkInfo.orderAmount),
            e: common_vendor.t(item.remarkInfo.commissionRate),
            f: common_vendor.t(item.remarkInfo.commissionAmount)
          } : {}, {
            g: common_vendor.t(Number(item.amount) > 0 ? "+" : ""),
            h: common_vendor.t(Number(item.amount).toFixed(2)),
            i: Number(item.amount) > 0 ? 1 : "",
            j: item.id
          });
        }),
        b: loading.value
      }, loading.value ? {} : {}, {
        c: !loading.value && records.value.length === 0
      }, !loading.value && records.value.length === 0 ? {
        d: common_vendor.p({
          text: "暂无收益明细",
          image: "/static/icons/暂无纪录.svg"
        })
      } : {}, {
        e: common_vendor.o(loadMore)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-42e94b5b"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages-player/earnings/detail.js.map
