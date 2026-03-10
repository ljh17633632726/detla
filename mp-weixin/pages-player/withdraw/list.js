"use strict";
const common_vendor = require("../../common/vendor.js");
const api_player = require("../../api/player.js");
if (!Math) {
  (StatusTag + EmptyState)();
}
const EmptyState = () => "../../components/EmptyState.js";
const StatusTag = () => "../../components/StatusTag.js";
const _sfc_main = {
  __name: "list",
  setup(__props) {
    const WITHDRAW_STATUS_TEXT = { PENDING: "审核中", APPROVED: "已通过", REJECTED: "已拒绝", COMPLETED: "已到账", CANCELLED: "已取消" };
    const WITHDRAW_STATUS_COLOR = { PENDING: "#ff9900", APPROVED: "#ff4544", REJECTED: "#ee0a24", COMPLETED: "#07c160", CANCELLED: "rgba(0,0,0,0.3)" };
    const records = common_vendor.ref([]);
    const pageNum = common_vendor.ref(1);
    const loading = common_vendor.ref(false);
    const finished = common_vendor.ref(false);
    common_vendor.onLoad(() => {
      loadData();
    });
    async function loadData() {
      var _a;
      loading.value = true;
      const res = await api_player.getWithdrawList({ pageNum: pageNum.value, pageSize: 20 });
      const list = ((_a = res.data) == null ? void 0 : _a.records) || [];
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
    function goDetail(id) {
      common_vendor.index.navigateTo({ url: "/pages-player/withdraw/detail?id=" + id });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(records.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(Number(item.amount).toFixed(2)),
            b: "ebe9e38b-0-" + i0,
            c: common_vendor.p({
              status: item.status,
              ["text-map"]: WITHDRAW_STATUS_TEXT,
              ["color-map"]: WITHDRAW_STATUS_COLOR
            }),
            d: common_vendor.t(item.accountType === "ALIPAY" ? "支付宝" : item.accountType === "WECHAT" ? "微信" : "银行卡"),
            e: common_vendor.t(item.accountNo || ""),
            f: common_vendor.t(item.createdAt),
            g: item.id,
            h: common_vendor.o(($event) => goDetail(item.id), item.id)
          };
        }),
        b: loading.value
      }, loading.value ? {} : {}, {
        c: !loading.value && records.value.length === 0
      }, !loading.value && records.value.length === 0 ? {
        d: common_vendor.p({
          text: "暂无提现记录",
          image: "/static/icons/暂无纪录.svg"
        })
      } : {}, {
        e: common_vendor.o(loadMore)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ebe9e38b"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages-player/withdraw/list.js.map
