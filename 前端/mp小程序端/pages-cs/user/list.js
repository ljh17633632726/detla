"use strict";
const common_vendor = require("../../common/vendor.js");
const pagesCs_api_cs = require("../api/cs.js");
if (!Math) {
  EmptyState();
}
const EmptyState = () => "../../components/EmptyState.js";
const _sfc_main = {
  __name: "list",
  setup(__props) {
    const keyword = common_vendor.ref("");
    const users = common_vendor.ref([]);
    const pageNum = common_vendor.ref(1);
    const loading = common_vendor.ref(false);
    const finished = common_vendor.ref(false);
    common_vendor.onShow(() => {
      refresh();
    });
    function refresh() {
      pageNum.value = 1;
      users.value = [];
      finished.value = false;
      loadData();
    }
    async function loadData() {
      var _a;
      loading.value = true;
      const params = { pageNum: pageNum.value, pageSize: 20 };
      if (keyword.value)
        params.keyword = keyword.value;
      const res = await pagesCs_api_cs.getCsUserList(params);
      const list = ((_a = res.data) == null ? void 0 : _a.records) || [];
      if (list.length < 20)
        finished.value = true;
      users.value = pageNum.value === 1 ? list : [...users.value, ...list];
      loading.value = false;
    }
    function loadMore() {
      if (!loading.value && !finished.value) {
        pageNum.value++;
        loadData();
      }
    }
    async function toggleStatus(id, status) {
      const action = status === "DISABLED" ? "禁用" : "启用";
      common_vendor.index.showModal({ title: "提示", content: `确定${action}该用户？`, success: async (r) => {
        if (r.confirm) {
          try {
            await pagesCs_api_cs.updateCsUserStatus(id, { status });
            common_vendor.index.showToast({ title: `已${action}` });
            refresh();
          } catch (e) {
          }
        }
      } });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(refresh),
        b: keyword.value,
        c: common_vendor.o(($event) => keyword.value = $event.detail.value),
        d: common_vendor.f(users.value, (u, k0, i0) => {
          return common_vendor.e({
            a: u.avatar || "/static/images/default-avatar.png",
            b: common_vendor.t(u.nickname || u.phone),
            c: common_vendor.t(u.createdAt),
            d: common_vendor.t(u.orderCount || 0),
            e: common_vendor.t(u.status === "DISABLED" ? "已禁用" : "正常"),
            f: common_vendor.n(u.status === "DISABLED" ? "disabled" : "active"),
            g: u.status !== "DISABLED"
          }, u.status !== "DISABLED" ? {
            h: common_vendor.o(($event) => toggleStatus(u.id, "DISABLED"), u.id)
          } : {
            i: common_vendor.o(($event) => toggleStatus(u.id, "ACTIVE"), u.id)
          }, {
            j: u.id
          });
        }),
        e: loading.value
      }, loading.value ? {} : {}, {
        f: !loading.value && users.value.length === 0
      }, !loading.value && users.value.length === 0 ? {
        g: common_vendor.p({
          text: "暂无用户",
          image: "/static/icons/暂无项目.svg"
        })
      } : {}, {
        h: common_vendor.o(loadMore)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-28326e6b"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages-cs/user/list.js.map
