"use strict";
const common_vendor = require("../../common/vendor.js");
const api_player = require("../../api/player.js");
if (!Math) {
  EmptyState();
}
const EmptyState = () => "../../components/EmptyState.js";
const _sfc_main = {
  __name: "list",
  setup(__props) {
    const accounts = common_vendor.ref([]);
    common_vendor.onShow(async () => {
      try {
        const res = await api_player.getAccountList();
        accounts.value = res.data || [];
      } catch (e) {
      }
    });
    function goAdd() {
      common_vendor.index.navigateTo({ url: "/pages-player/account/edit" });
    }
    function goEdit(a) {
      common_vendor.index.navigateTo({ url: "/pages-player/account/edit?id=" + a.id + "&data=" + encodeURIComponent(JSON.stringify(a)) });
    }
    function doDelete(id) {
      common_vendor.index.showModal({ title: "提示", content: "确认删除该账户吗", success: async (r) => {
        if (r.confirm) {
          try {
            await api_player.deleteAccount(id);
            common_vendor.index.showToast({ title: "已删除" });
            accounts.value = accounts.value.filter((a) => a.id !== id);
          } catch (e) {
          }
        }
      } });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(accounts.value, (a, k0, i0) => {
          return common_vendor.e({
            a: a.type === "ALIPAY" ? "/static/icons/钞票.svg" : a.type === "WECHAT" ? "/static/icons/钞票.svg" : "/static/icons/理财.svg",
            b: common_vendor.t(a.type === "ALIPAY" ? "支付宝" : a.type === "WECHAT" ? "微信" : "银行卡"),
            c: a.isDefault
          }, a.isDefault ? {} : {}, {
            d: common_vendor.t(a.account),
            e: a.realName
          }, a.realName ? {
            f: common_vendor.t(a.realName)
          } : {}, {
            g: common_vendor.o(($event) => goEdit(a), a.id),
            h: common_vendor.o(($event) => doDelete(a.id), a.id),
            i: a.id
          });
        }),
        b: accounts.value.length === 0
      }, accounts.value.length === 0 ? {
        c: common_vendor.o(goAdd),
        d: common_vendor.p({
          text: "暂无收款账户",
          image: "/pages-player/static/icons/暂无地址.svg",
          ["button-text"]: "添加账户"
        })
      } : {}, {
        e: common_vendor.o(goAdd)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3926cacb"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages-player/account/list.js.map
