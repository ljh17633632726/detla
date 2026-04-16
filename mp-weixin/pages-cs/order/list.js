"use strict";
const common_vendor = require("../../common/vendor.js");
const pagesCs_api_cs = require("../api/cs.js");
if (!Math) {
  (StatusTag + EmptyState + CustomTabBar)();
}
const StatusTag = () => "../../components/StatusTag.js";
const EmptyState = () => "../../components/EmptyState.js";
const CustomTabBar = () => "../../components/CustomTabBar.js";
const _sfc_main = {
  __name: "list",
  setup(__props) {
    const statusOptions = [
      { value: "PENDING_PAYMENT", label: "待支付" },
      { value: "PAID", label: "待接单" },
      { value: "ASSIGNED", label: "已指派" },
      { value: "ACCEPTED", label: "已接单" },
      { value: "IN_PROGRESS", label: "进行中" },
      { value: "COMPLETED", label: "待确认" },
      { value: "CONFIRMED", label: "已完成" },
      { value: "CANCELLED", label: "已取消" },
      { value: "REFUNDING", label: "退款中" },
      { value: "REFUNDED", label: "已退款" },
      { value: "DISPUTED", label: "争议中" }
    ];
    const keyword = common_vendor.ref("");
    const statusFilter = common_vendor.ref("");
    const orders = common_vendor.ref([]);
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
      orders.value = [];
      finished.value = false;
      loadData();
    }
    async function loadData() {
      var _a;
      loading.value = true;
      const params = { pageNum: pageNum.value, pageSize: 20 };
      if (keyword.value)
        params.keyword = keyword.value;
      if (statusFilter.value)
        params.status = statusFilter.value;
      const res = await pagesCs_api_cs.getCsOrderList(params);
      const list = ((_a = res.data) == null ? void 0 : _a.records) || [];
      if (list.length < 20)
        finished.value = true;
      orders.value = pageNum.value === 1 ? list : [...orders.value, ...list];
      loading.value = false;
    }
    function loadMore() {
      if (!loading.value && !finished.value) {
        pageNum.value++;
        loadData();
      }
    }
    function displayUserName(o) {
      const name = o.userNickname ?? o.user_nickname;
      if (name != null && String(name).trim() !== "")
        return name;
      return "ID: " + (o.userId ?? "");
    }
    function goDetail(id) {
      common_vendor.index.navigateTo({ url: "/pages-cs/order/detail?id=" + id });
    }
    function goAssign(id) {
      common_vendor.index.navigateTo({ url: "/pages-cs/order/assign?orderId=" + id });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(refresh),
        b: keyword.value,
        c: common_vendor.o(($event) => keyword.value = $event.detail.value),
        d: !statusFilter.value ? 1 : "",
        e: common_vendor.o(($event) => filterStatus("")),
        f: common_vendor.f(statusOptions, (s, k0, i0) => {
          return {
            a: common_vendor.t(s.label),
            b: s.value,
            c: statusFilter.value === s.value ? 1 : "",
            d: common_vendor.o(($event) => filterStatus(s.value), s.value)
          };
        }),
        g: common_vendor.f(orders.value, (o, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(o.orderNo),
            b: "1776171a-0-" + i0,
            c: common_vendor.p({
              status: o.status
            }),
            d: common_vendor.t(o.productName),
            e: common_vendor.t(displayUserName(o)),
            f: common_vendor.t(Number(o.amount).toFixed(2)),
            g: common_vendor.t(o.createdAt),
            h: o.status === "PAID" || o.status === "ASSIGNED"
          }, o.status === "PAID" || o.status === "ASSIGNED" ? {
            i: common_vendor.o(($event) => goAssign(o.id), o.id)
          } : {}, {
            j: o.id,
            k: common_vendor.o(($event) => goDetail(o.id), o.id)
          });
        }),
        h: loading.value
      }, loading.value ? {} : {}, {
        i: !loading.value && orders.value.length === 0
      }, !loading.value && orders.value.length === 0 ? {
        j: common_vendor.p({
          text: "暂无订单",
          image: "/static/icons/暂无纪录.svg"
        })
      } : {}, {
        k: common_vendor.o(loadMore),
        l: common_vendor.p({
          current: 1
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1776171a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages-cs/order/list.js.map
