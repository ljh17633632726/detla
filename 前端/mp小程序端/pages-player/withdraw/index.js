"use strict";
const common_vendor = require("../../common/vendor.js");
const api_player = require("../../api/player.js");
if (!Math) {
  EmptyState();
}
const EmptyState = () => "../../components/EmptyState.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const balance = common_vendor.ref("0.00");
    const form = common_vendor.reactive({ amount: "", accountId: "", remark: "" });
    const accounts = common_vendor.ref([]);
    const selectedAccount = common_vendor.ref(null);
    const showAccountPicker = common_vendor.ref(false);
    common_vendor.onShow(async () => {
      var _a;
      try {
        const res = await api_player.getEarningsSummary();
        balance.value = Number(((_a = res.data) == null ? void 0 : _a.balance) || 0).toFixed(2);
      } catch (e) {
      }
      try {
        const res = await api_player.getAccountList();
        accounts.value = res.data || [];
      } catch (e) {
      }
    });
    function accountDisplay(a) {
      return `${a.type === "ALIPAY" ? "支付宝" : a.type === "WECHAT" ? "微信" : a.type === "BANK" ? "银行卡" : a.type} ${(a.accountNo || "").replace(/(.{3}).*(.{4})/, "$1****$2")}`;
    }
    function selectAccount(a) {
      selectedAccount.value = a;
      form.accountId = a.id;
      showAccountPicker.value = false;
    }
    async function doSubmit() {
      if (!form.amount || Number(form.amount) <= 0)
        return common_vendor.index.showToast({ title: "请输入金额", icon: "none" });
      if (Number(form.amount) > Number(balance.value))
        return common_vendor.index.showToast({ title: "超过可提现金额", icon: "none" });
      if (!form.accountId)
        return common_vendor.index.showToast({ title: "请选择提现账户", icon: "none" });
      try {
        await api_player.applyWithdraw({ amount: Number(form.amount), accountId: form.accountId, remark: form.remark });
        common_vendor.index.showToast({ title: "提现申请已提交" });
        setTimeout(() => common_vendor.index.navigateTo({ url: "/pages-player/withdraw/list" }), 1500);
      } catch (e) {
      }
    }
    function goList() {
      common_vendor.index.navigateTo({ url: "/pages-player/withdraw/list" });
    }
    function goAccounts() {
      common_vendor.index.navigateTo({ url: "/pages-player/account/list" });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(balance.value),
        b: form.amount,
        c: common_vendor.o(($event) => form.amount = $event.detail.value),
        d: common_vendor.o(($event) => form.amount = balance.value),
        e: common_vendor.t(selectedAccount.value ? accountDisplay(selectedAccount.value) : "请选择提现账户"),
        f: common_vendor.n(selectedAccount.value ? "" : "placeholder"),
        g: common_vendor.o(($event) => showAccountPicker.value = true),
        h: form.remark,
        i: common_vendor.o(($event) => form.remark = $event.detail.value),
        j: common_vendor.o(doSubmit),
        k: common_vendor.o(goList),
        l: common_vendor.o(goAccounts),
        m: showAccountPicker.value
      }, showAccountPicker.value ? common_vendor.e({
        n: common_vendor.f(accounts.value, (a, k0, i0) => {
          var _a;
          return {
            a: common_vendor.t(accountDisplay(a)),
            b: a.id,
            c: ((_a = selectedAccount.value) == null ? void 0 : _a.id) === a.id ? 1 : "",
            d: common_vendor.o(($event) => selectAccount(a), a.id)
          };
        }),
        o: accounts.value.length === 0
      }, accounts.value.length === 0 ? {
        p: common_vendor.o(goAccounts),
        q: common_vendor.p({
          text: "暂无账户，请先添加",
          image: "/pages-player/static/icons/暂无地址.svg",
          ["button-text"]: "添加账户"
        })
      } : {}, {
        r: common_vendor.o(() => {
        }),
        s: common_vendor.o(($event) => showAccountPicker.value = false)
      }) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-df8bbd78"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages-player/withdraw/index.js.map
