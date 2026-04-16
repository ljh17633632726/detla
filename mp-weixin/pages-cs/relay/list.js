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
    const RELAY_STATUS_TEXT = { PENDING: "待审核", APPROVED: "已通过", REJECTED: "已拒绝" };
    const RELAY_STATUS_COLOR = { PENDING: "#ff4544", APPROVED: "#07c160", REJECTED: "#999" };
    const SPLIT_TYPE_TEXT = {
      FIFTY_FIFTY: "五五开",
      FORTY_SIXTY: "四六开",
      THIRTY_SEVENTY: "三七开",
      CUSTOM: "自定义金额"
    };
    const statusFilter = common_vendor.ref("");
    const relays = common_vendor.ref([]);
    const pageNum = common_vendor.ref(1);
    const loading = common_vendor.ref(false);
    const finished = common_vendor.ref(false);
    const showApproveModal = common_vendor.ref(false);
    const showRejectModal = common_vendor.ref(false);
    const currentRelay = common_vendor.ref(null);
    const playerKeyword = common_vendor.ref("");
    const approvePlayers = common_vendor.ref([]);
    const approvePageNum = common_vendor.ref(1);
    const approveLoading = common_vendor.ref(false);
    const approveFinished = common_vendor.ref(false);
    const maxConcurrent = common_vendor.ref(5);
    const rejectReason = common_vendor.ref("");
    const remindStore = store_remind.useRemindStore();
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
      relays.value = [];
      finished.value = false;
      loadData();
    }
    async function loadData() {
      var _a;
      loading.value = true;
      const params = { pageNum: pageNum.value, pageSize: 20 };
      if (statusFilter.value)
        params.status = statusFilter.value;
      try {
        const res = await pagesCs_api_cs.getCsRelayList(params);
        const list = ((_a = res.data) == null ? void 0 : _a.records) || [];
        if (list.length < 20)
          finished.value = true;
        relays.value = pageNum.value === 1 ? list : [...relays.value, ...list];
      } catch (e) {
      }
      loading.value = false;
    }
    function loadMore() {
      if (!loading.value && !finished.value) {
        pageNum.value++;
        loadData();
      }
    }
    function isFull(p) {
      return (p.activeOrders || 0) >= maxConcurrent.value;
    }
    function openApproveModal(r) {
      currentRelay.value = r;
      playerKeyword.value = "";
      approvePlayers.value = [];
      approvePageNum.value = 1;
      approveFinished.value = false;
      showApproveModal.value = true;
      loadApprovePlayers();
    }
    function searchPlayers() {
      approvePageNum.value = 1;
      approvePlayers.value = [];
      approveFinished.value = false;
      loadApprovePlayers();
    }
    function loadMoreApprovePlayers() {
      if (!approveLoading.value && !approveFinished.value) {
        approvePageNum.value++;
        loadApprovePlayers();
      }
    }
    async function loadApprovePlayers() {
      approveLoading.value = true;
      try {
        const params = { pageNum: approvePageNum.value, pageSize: 20 };
        if (playerKeyword.value)
          params.keyword = playerKeyword.value;
        const res = await pagesCs_api_cs.getCsPlayerAssignList(params);
        const data = res.data || {};
        const page = data.players || {};
        const list = page.records || [];
        if (list.length < 20)
          approveFinished.value = true;
        if (data.maxConcurrent != null)
          maxConcurrent.value = data.maxConcurrent;
        approvePlayers.value = approvePageNum.value === 1 ? list : [...approvePlayers.value, ...list];
      } catch (e) {
      }
      approveLoading.value = false;
    }
    async function selectPlayer(p) {
      var _a;
      if (isFull(p)) {
        common_vendor.index.showToast({ title: "该接单员已满载", icon: "none" });
        return;
      }
      if (!currentRelay.value)
        return;
      try {
        await pagesCs_api_cs.approveCsRelay(currentRelay.value.id, { playerId: p.id });
        common_vendor.index.showToast({ title: "审核通过" });
        showApproveModal.value = false;
        currentRelay.value = null;
        remindStore.fetchCsRemind();
        refresh();
      } catch (e) {
        const msg = ((_a = e == null ? void 0 : e.data) == null ? void 0 : _a.msg) || (e == null ? void 0 : e.msg) || "操作失败";
        common_vendor.index.showToast({ title: msg, icon: "none" });
      }
    }
    function openRejectModal(r) {
      currentRelay.value = r;
      rejectReason.value = "";
      showRejectModal.value = true;
    }
    async function confirmReject() {
      var _a, _b;
      if (!currentRelay.value)
        return;
      if (!((_a = rejectReason.value) == null ? void 0 : _a.trim())) {
        return common_vendor.index.showToast({ title: "请输入拒绝原因", icon: "none" });
      }
      try {
        await pagesCs_api_cs.rejectCsRelay(currentRelay.value.id, { reason: rejectReason.value.trim() });
        common_vendor.index.showToast({ title: "已拒绝" });
        showRejectModal.value = false;
        currentRelay.value = null;
        remindStore.fetchCsRemind();
        refresh();
      } catch (e) {
        const msg = ((_b = e == null ? void 0 : e.data) == null ? void 0 : _b.msg) || (e == null ? void 0 : e.msg) || "操作失败";
        common_vendor.index.showToast({ title: msg, icon: "none" });
      }
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
        i: common_vendor.f(relays.value, (r, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(r.orderNo),
            b: "19a07025-0-" + i0,
            c: common_vendor.p({
              status: r.status,
              ["text-map"]: RELAY_STATUS_TEXT,
              ["color-map"]: RELAY_STATUS_COLOR
            }),
            d: common_vendor.t(r.productName),
            e: common_vendor.t(r.playerNickname || r.originalPlayerName || "-"),
            f: common_vendor.t(SPLIT_TYPE_TEXT[r.splitType] || r.splitType),
            g: r.reason
          }, r.reason ? {
            h: common_vendor.t(r.reason)
          } : {}, {
            i: r.status === "PENDING"
          }, r.status === "PENDING" ? {
            j: common_vendor.o(($event) => openApproveModal(r), r.id),
            k: common_vendor.o(($event) => openRejectModal(r), r.id)
          } : {}, {
            l: r.id
          });
        }),
        j: loading.value
      }, loading.value ? {} : {}, {
        k: !loading.value && relays.value.length === 0
      }, !loading.value && relays.value.length === 0 ? {
        l: common_vendor.p({
          text: "暂无接力申请",
          image: "/static/icons/暂无项目.svg"
        })
      } : {}, {
        m: common_vendor.o(loadMore),
        n: showApproveModal.value
      }, showApproveModal.value ? common_vendor.e({
        o: common_vendor.o(searchPlayers),
        p: playerKeyword.value,
        q: common_vendor.o(($event) => playerKeyword.value = $event.detail.value),
        r: common_vendor.o(searchPlayers),
        s: common_vendor.f(approvePlayers.value, (p, k0, i0) => {
          return common_vendor.e({
            a: p.avatar || "/static/images/default-avatar.png",
            b: common_vendor.t(p.nickname),
            c: p.avgRating
          }, p.avgRating ? {
            d: common_vendor.t(Number(p.avgRating).toFixed(1))
          } : {}, {
            e: common_vendor.t(p.completedOrders || 0),
            f: common_vendor.t(p.activeOrders || 0),
            g: p.id,
            h: isFull(p) ? 1 : "",
            i: common_vendor.o(($event) => selectPlayer(p), p.id)
          });
        }),
        t: common_vendor.t(maxConcurrent.value),
        v: approveLoading.value
      }, approveLoading.value ? {} : {}, {
        w: !approveLoading.value && approvePlayers.value.length === 0
      }, !approveLoading.value && approvePlayers.value.length === 0 ? {
        x: common_vendor.p({
          text: "暂无可用接单员",
          image: "/static/icons/暂无项目.svg"
        })
      } : {}, {
        y: common_vendor.o(loadMoreApprovePlayers),
        z: common_vendor.o(($event) => showApproveModal.value = false),
        A: common_vendor.o(() => {
        }),
        B: common_vendor.o(($event) => showApproveModal.value = false)
      }) : {}, {
        C: showRejectModal.value
      }, showRejectModal.value ? {
        D: rejectReason.value,
        E: common_vendor.o(($event) => rejectReason.value = $event.detail.value),
        F: common_vendor.o(($event) => showRejectModal.value = false),
        G: common_vendor.o(confirmReject),
        H: common_vendor.o(() => {
        }),
        I: common_vendor.o(($event) => showRejectModal.value = false)
      } : {}, {
        J: common_vendor.p({
          current: -1
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-19a07025"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages-cs/relay/list.js.map
