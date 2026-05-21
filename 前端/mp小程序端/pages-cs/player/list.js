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
    const FREEZE_DURATIONS = [
      { hours: 24, label: "1天" },
      { hours: 72, label: "3天" },
      { hours: 168, label: "7天" },
      { hours: 720, label: "30天" },
      { hours: 0, label: "永久" }
    ];
    const keyword = common_vendor.ref("");
    const statusFilter = common_vendor.ref("");
    const players = common_vendor.ref([]);
    const pageNum = common_vendor.ref(1);
    const loading = common_vendor.ref(false);
    const finished = common_vendor.ref(false);
    const showFreezeModal = common_vendor.ref(false);
    const freezeTarget = common_vendor.ref(null);
    const freezeHours = common_vendor.ref(24);
    common_vendor.onShow(() => {
      refresh();
    });
    function filterStatus(s) {
      statusFilter.value = s;
      refresh();
    }
    function refresh() {
      pageNum.value = 1;
      players.value = [];
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
      const res = await pagesCs_api_cs.getCsPlayerList(params);
      const list = ((_a = res.data) == null ? void 0 : _a.records) || [];
      if (list.length < 20)
        finished.value = true;
      players.value = pageNum.value === 1 ? list : [...players.value, ...list];
      loading.value = false;
    }
    function loadMore() {
      if (!loading.value && !finished.value) {
        pageNum.value++;
        loadData();
      }
    }
    function goAudit(id) {
      common_vendor.index.navigateTo({ url: "/pages-cs/player/audit?id=" + id });
    }
    function openFreeze(p) {
      freezeTarget.value = p;
      freezeHours.value = 24;
      showFreezeModal.value = true;
    }
    async function doFreeze() {
      if (!freezeTarget.value)
        return;
      try {
        await pagesCs_api_cs.freezeCsPlayer(freezeTarget.value.id, { hours: freezeHours.value });
        common_vendor.index.showToast({ title: "已冻结" });
        showFreezeModal.value = false;
        refresh();
      } catch (e) {
      }
    }
    function formatTime(t) {
      if (!t)
        return "永久";
      return t.replace("T", " ").substring(0, 16);
    }
    return (_ctx, _cache) => {
      var _a;
      return common_vendor.e({
        a: common_vendor.o(refresh),
        b: keyword.value,
        c: common_vendor.o(($event) => keyword.value = $event.detail.value),
        d: !statusFilter.value ? 1 : "",
        e: common_vendor.o(($event) => filterStatus("")),
        f: statusFilter.value === "PENDING" ? 1 : "",
        g: common_vendor.o(($event) => filterStatus("PENDING")),
        h: statusFilter.value === "ACTIVE" ? 1 : "",
        i: common_vendor.o(($event) => filterStatus("ACTIVE")),
        j: statusFilter.value === "FROZEN" ? 1 : "",
        k: common_vendor.o(($event) => filterStatus("FROZEN")),
        l: common_vendor.f(players.value, (p, k0, i0) => {
          return common_vendor.e({
            a: p.avatar || "/static/images/default-avatar.png",
            b: common_vendor.t(p.nickname || p.realName),
            c: p.status === "FROZEN"
          }, p.status === "FROZEN" ? {} : p.status === "PENDING" ? {} : {}, {
            d: p.status === "PENDING",
            e: p.avgRating
          }, p.avgRating ? {
            f: common_vendor.t(Number(p.avgRating).toFixed(1))
          } : {}, {
            g: common_vendor.t(p.completedOrders || 0),
            h: p.activeOrders
          }, p.activeOrders ? {
            i: common_vendor.t(p.activeOrders)
          } : {}, {
            j: p.phone
          }, p.phone ? {
            k: common_vendor.t(p.phone)
          } : {}, {
            l: p.status === "FROZEN" && p.frozenUntil
          }, p.status === "FROZEN" && p.frozenUntil ? {
            m: common_vendor.t(formatTime(p.frozenUntil))
          } : {}, {
            n: p.status === "PENDING"
          }, p.status === "PENDING" ? {
            o: common_vendor.o(($event) => goAudit(p.id), p.id)
          } : {}, {
            p: p.status === "ACTIVE"
          }, p.status === "ACTIVE" ? {
            q: common_vendor.o(($event) => openFreeze(p), p.id)
          } : {}, {
            r: p.status === "FROZEN"
          }, p.status === "FROZEN" ? {
            s: common_vendor.o(($event) => goAudit(p.id), p.id)
          } : {}, {
            t: p.id
          });
        }),
        m: loading.value
      }, loading.value ? {} : {}, {
        n: !loading.value && players.value.length === 0
      }, !loading.value && players.value.length === 0 ? {
        o: common_vendor.p({
          text: "暂无接单员",
          image: "/static/icons/暂无项目.svg"
        })
      } : {}, {
        p: common_vendor.o(loadMore),
        q: showFreezeModal.value
      }, showFreezeModal.value ? {
        r: common_vendor.t((_a = freezeTarget.value) == null ? void 0 : _a.nickname),
        s: common_vendor.f(FREEZE_DURATIONS, (d, k0, i0) => {
          return {
            a: common_vendor.t(d.label),
            b: d.hours,
            c: freezeHours.value === d.hours ? 1 : "",
            d: common_vendor.o(($event) => freezeHours.value = d.hours, d.hours)
          };
        }),
        t: common_vendor.o(($event) => showFreezeModal.value = false),
        v: common_vendor.o(doFreeze),
        w: common_vendor.o(() => {
        }),
        x: common_vendor.o(($event) => showFreezeModal.value = false)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c81956d8"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages-cs/player/list.js.map
