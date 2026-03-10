"use strict";
const common_vendor = require("../../common/vendor.js");
const store_remind = require("../../store/remind.js");
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
    const remindStore = store_remind.useRemindStore();
    const COMPLAINT_TYPE_TEXT = { SERVICE_QUALITY: "服务质量", ACCOUNT_ISSUE: "账号问题", DELAY: "进度延迟", FRAUD: "欺诈", OTHER: "其他" };
    const COMPLAINT_STATUS_TEXT = { PENDING: "待处理", PROCESSING: "处理中", RESOLVED: "已解决", REJECTED: "已驳回" };
    const COMPLAINT_STATUS_COLOR = { PENDING: "#ff4544", PROCESSING: "#ff9900", RESOLVED: "#07c160", REJECTED: "#999" };
    const statusFilter = common_vendor.ref("");
    const complaints = common_vendor.ref([]);
    const pageNum = common_vendor.ref(1);
    const loading = common_vendor.ref(false);
    const finished = common_vendor.ref(false);
    common_vendor.onShow(() => {
      remindStore.fetchCsRemind();
      refresh();
    });
    function filterStatus(s) {
      statusFilter.value = s;
      refresh();
    }
    function refresh() {
      pageNum.value = 1;
      complaints.value = [];
      finished.value = false;
      loadData();
    }
    async function loadData() {
      var _a;
      loading.value = true;
      const params = { pageNum: pageNum.value, pageSize: 20 };
      if (statusFilter.value)
        params.status = statusFilter.value;
      const res = await pagesCs_api_cs.getCsComplaintList(params);
      const list = ((_a = res.data) == null ? void 0 : _a.records) || [];
      if (list.length < 20)
        finished.value = true;
      complaints.value = pageNum.value === 1 ? list : [...complaints.value, ...list];
      loading.value = false;
    }
    function loadMore() {
      if (!loading.value && !finished.value) {
        pageNum.value++;
        loadData();
      }
    }
    function goHandle(id) {
      common_vendor.index.navigateTo({ url: "/pages-cs/complaint/handle?id=" + id });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !statusFilter.value ? 1 : "",
        b: common_vendor.o(($event) => filterStatus("")),
        c: statusFilter.value === "PENDING" ? 1 : "",
        d: common_vendor.o(($event) => filterStatus("PENDING")),
        e: statusFilter.value === "PROCESSING" ? 1 : "",
        f: common_vendor.o(($event) => filterStatus("PROCESSING")),
        g: statusFilter.value === "RESOLVED" ? 1 : "",
        h: common_vendor.o(($event) => filterStatus("RESOLVED")),
        i: common_vendor.f(complaints.value, (c, k0, i0) => {
          return {
            a: common_vendor.t(COMPLAINT_TYPE_TEXT[c.type] || c.type),
            b: "ad917872-0-" + i0,
            c: common_vendor.p({
              status: c.status,
              ["text-map"]: COMPLAINT_STATUS_TEXT,
              ["color-map"]: COMPLAINT_STATUS_COLOR
            }),
            d: common_vendor.t(c.content),
            e: common_vendor.t(c.userNickname || c.userId),
            f: common_vendor.t(c.createdAt),
            g: c.id,
            h: common_vendor.o(($event) => goHandle(c.id), c.id)
          };
        }),
        j: loading.value
      }, loading.value ? {} : {}, {
        k: !loading.value && complaints.value.length === 0
      }, !loading.value && complaints.value.length === 0 ? {
        l: common_vendor.p({
          text: "暂无投诉",
          image: "/static/icons/暂无项目.svg"
        })
      } : {}, {
        m: common_vendor.o(loadMore),
        n: common_vendor.p({
          current: 2
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ad917872"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages-cs/complaint/list.js.map
