"use strict";
const common_vendor = require("../../common/vendor.js");
const api_user = require("../../api/user.js");
const api_pay = require("../../api/pay.js");
if (!Math) {
  EmptyState();
}
const EmptyState = () => "../../components/EmptyState.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const TX_TYPE_MAP = { PAY: "支付", REFUND: "退款", WITHDRAW: "提现", INCOME: "收入", RECHARGE: "充值", BALANCE_PAY: "余额支付" };
    function typeText(type) {
      return TX_TYPE_MAP[type] || "交易";
    }
    function remarkText(remark) {
      if (!remark)
        return "";
      return /[A-Za-z]/.test(remark) ? "交易" : remark;
    }
    function formatTime(str) {
      if (!str)
        return "";
      const s = String(str).replace("T", " ").trim();
      const m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})(?:\s+(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?)?/);
      if (!m)
        return s.replace(/[A-Za-z]/g, "") || "";
      const [, y, mo, d, h, mi, sec] = m;
      const part = `${y}年${Number(mo)}月${Number(d)}日`;
      if (h !== void 0 && mi !== void 0)
        return part + ` ${Number(h)}:${String(Number(mi)).padStart(2, "0")}`;
      return part;
    }
    const balance = common_vendor.ref("0.00");
    const transactions = common_vendor.ref([]);
    const pageNum = common_vendor.ref(1);
    const loading = common_vendor.ref(false);
    const finished = common_vendor.ref(false);
    common_vendor.onLoad(async () => {
      var _a;
      const w = await api_user.getWallet();
      balance.value = Number(((_a = w.data) == null ? void 0 : _a.balance) || 0).toFixed(2);
      loadData();
    });
    async function loadData() {
      var _a;
      loading.value = true;
      const res = await api_pay.getTransactions({ pageNum: pageNum.value, pageSize: 20 });
      const list = ((_a = res.data) == null ? void 0 : _a.records) || [];
      if (list.length < 20)
        finished.value = true;
      transactions.value = pageNum.value === 1 ? list : [...transactions.value, ...list];
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
        a: common_vendor.t(balance.value),
        b: common_vendor.f(transactions.value, (t, k0, i0) => {
          return {
            a: common_vendor.t(typeText(t.type)),
            b: common_vendor.t(remarkText(t.remark)),
            c: common_vendor.t(t.amount > 0 ? "+" : ""),
            d: common_vendor.t(t.amount),
            e: t.amount > 0 ? 1 : "",
            f: common_vendor.t(formatTime(t.createdAt)),
            g: t.id
          };
        }),
        c: transactions.value.length === 0
      }, transactions.value.length === 0 ? {
        d: common_vendor.p({
          text: "暂无记录",
          image: "/static/icons/暂无纪录.svg"
        })
      } : {}, {
        e: common_vendor.o(loadMore)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-70996a17"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/wallet/index.js.map
