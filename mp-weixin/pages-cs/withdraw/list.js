"use strict";
const common_vendor = require("../../common/vendor.js");
const pagesCs_api_cs = require("../api/cs.js");
if (!Math) {
  (StatusTag + EmptyState)();
}
const StatusTag = () => "../../components/StatusTag.js";
const EmptyState = () => "../../components/EmptyState.js";
const _sfc_main = {
  __name: "list",
  setup(__props) {
    const STATUS_TEXT = { PENDING: "待审核", APPROVED: "已通过", REJECTED: "已拒绝", COMPLETED: "已到账" };
    const STATUS_COLOR = { PENDING: "#ff9900", APPROVED: "#ff4544", REJECTED: "#ee0a24", COMPLETED: "#07c160" };
    const statusFilter = common_vendor.ref("");
    const records = common_vendor.ref([]);
    const pageNum = common_vendor.ref(1);
    const loading = common_vendor.ref(false);
    const finished = common_vendor.ref(false);
    common_vendor.onShow(() => {
      refresh();
    });
    function filterStatus(s) {
      statusFilter.value = s;
      refresh();
    }
    function refresh() {
      pageNum.value = 1;
      records.value = [];
      finished.value = false;
      loadData();
    }
    async function loadData() {
      var _a;
      loading.value = true;
      const params = { pageNum: pageNum.value, pageSize: 20 };
      if (statusFilter.value)
        params.status = statusFilter.value;
      const res = await pagesCs_api_cs.getCsWithdrawList(params);
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
    function goHandle(id) {
      common_vendor.index.navigateTo({ url: "/pages-cs/withdraw/handle?id=" + id });
    }
    async function doApprove(id) {
      common_vendor.index.showModal({ title: "确认", content: "确定通过该提现申请？", success: async (r) => {
        if (r.confirm) {
          try {
            await pagesCs_api_cs.approveCsWithdraw(id);
            common_vendor.index.showToast({ title: "已通过" });
            refresh();
          } catch (e) {
          }
        }
      } });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !statusFilter.value ? 1 : "",
        b: common_vendor.o(($event) => filterStatus("")),
        c: statusFilter.value === "PENDING" ? 1 : "",
        d: common_vendor.o(($event) => filterStatus("PENDING")),
        e: statusFilter.value === "APPROVED" ? 1 : "",
        f: common_vendor.o(($event) => filterStatus("APPROVED")),
        g: statusFilter.value === "REJECTED" ? 1 : "",
        h: common_vendor.o(($event) => filterStatus("REJECTED")),
        i: statusFilter.value === "COMPLETED" ? 1 : "",
        j: common_vendor.o(($event) => filterStatus("COMPLETED")),
        k: common_vendor.f(records.value, (w, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(Number(w.amount).toFixed(2)),
            b: "8bed89a4-0-" + i0,
            c: common_vendor.p({
              status: w.status,
              ["text-map"]: STATUS_TEXT,
              ["color-map"]: STATUS_COLOR
            }),
            d: common_vendor.t(w.playerNickname || w.playerId),
            e: common_vendor.t(w.accountType === "ALIPAY" ? "支付宝" : w.accountType === "WECHAT" ? "微信" : "银行卡"),
            f: common_vendor.t(w.accountNo || ""),
            g: common_vendor.t(w.createdAt),
            h: w.status === "PENDING"
          }, w.status === "PENDING" ? {
            i: common_vendor.o(($event) => doApprove(w.id), w.id),
            j: common_vendor.o(($event) => goHandle(w.id), w.id)
          } : {}, {
            k: w.id,
            l: common_vendor.o(($event) => goHandle(w.id), w.id)
          });
        }),
        l: loading.value
      }, loading.value ? {} : {}, {
        m: !loading.value && records.value.length === 0
      }, !loading.value && records.value.length === 0 ? {
        n: common_vendor.p({
          text: "暂无提现记录",
          image: "/static/icons/暂无纪录.svg"
        })
      } : {}, {
        o: common_vendor.o(loadMore)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8bed89a4"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages-cs/withdraw/list.js.map
