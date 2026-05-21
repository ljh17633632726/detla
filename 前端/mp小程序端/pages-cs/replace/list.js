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
    const REPLACE_STATUS_TEXT = { PENDING: "待审核", APPROVED: "已通过", REJECTED: "已拒绝" };
    const REPLACE_STATUS_COLOR = { PENDING: "#ff4544", APPROVED: "#07c160", REJECTED: "#999" };
    const statusFilter = common_vendor.ref("");
    const replaces = common_vendor.ref([]);
    const pageNum = common_vendor.ref(1);
    const loading = common_vendor.ref(false);
    const finished = common_vendor.ref(false);
    const showApproveModal = common_vendor.ref(false);
    const showRejectModal = common_vendor.ref(false);
    const showPlayerPicker = common_vendor.ref(false);
    const currentReplace = common_vendor.ref(null);
    const rejectReason = common_vendor.ref("");
    const playerKeyword = common_vendor.ref("");
    const players = common_vendor.ref([]);
    const playerPageNum = common_vendor.ref(1);
    const playerLoading = common_vendor.ref(false);
    const playerFinished = common_vendor.ref(false);
    const maxConcurrent = common_vendor.ref(5);
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
      replaces.value = [];
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
        const res = await pagesCs_api_cs.getCsReplaceList(params);
        const list = ((_a = res.data) == null ? void 0 : _a.records) || [];
        if (list.length < 20)
          finished.value = true;
        replaces.value = pageNum.value === 1 ? list : [...replaces.value, ...list];
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
    function openApproveModal(r) {
      currentReplace.value = r;
      showPlayerPicker.value = false;
      playerKeyword.value = "";
      players.value = [];
      showApproveModal.value = true;
    }
    function closeApproveModal() {
      showApproveModal.value = false;
      showPlayerPicker.value = false;
      currentReplace.value = null;
    }
    function selectMode(mode) {
      if (mode === "hall") {
        common_vendor.index.showModal({
          title: "确认同意",
          content: "同意换人后，订单将重新放入接单大厅，被换打手本单无收益。确认吗？",
          success: async (res) => {
            if (res.confirm) {
              await doApprove(null);
            }
          }
        });
      } else {
        showPlayerPicker.value = true;
        playerPageNum.value = 1;
        playerFinished.value = false;
        players.value = [];
        loadPlayers();
      }
    }
    function isFull(p) {
      return (p.activeOrders || 0) >= maxConcurrent.value;
    }
    function searchPlayers() {
      playerPageNum.value = 1;
      players.value = [];
      playerFinished.value = false;
      loadPlayers();
    }
    function loadMorePlayers() {
      if (!playerLoading.value && !playerFinished.value) {
        playerPageNum.value++;
        loadPlayers();
      }
    }
    async function loadPlayers() {
      playerLoading.value = true;
      try {
        const params = { pageNum: playerPageNum.value, pageSize: 20 };
        if (playerKeyword.value)
          params.keyword = playerKeyword.value;
        const res = await pagesCs_api_cs.getCsPlayerAssignList(params);
        const data = res.data || {};
        const page = data.players || {};
        const list = page.records || [];
        if (list.length < 20)
          playerFinished.value = true;
        if (data.maxConcurrent != null)
          maxConcurrent.value = data.maxConcurrent;
        players.value = playerPageNum.value === 1 ? list : [...players.value, ...list];
      } catch (e) {
      }
      playerLoading.value = false;
    }
    function confirmAssignPlayer(p) {
      if (isFull(p)) {
        common_vendor.index.showToast({ title: "该接单员已满载", icon: "none" });
        return;
      }
      common_vendor.index.showModal({
        title: "确认指定",
        content: `同意换人并将订单指派给 ${p.nickname}？
被换打手本单无收益。`,
        success: async (res) => {
          if (res.confirm) {
            await doApprove(p);
          }
        }
      });
    }
    async function doApprove(selectedPlayer) {
      var _a;
      if (!currentReplace.value)
        return;
      try {
        await pagesCs_api_cs.approveCsReplace(currentReplace.value.id, {});
        if (selectedPlayer) {
          try {
            await pagesCs_api_cs.assignOrder(currentReplace.value.orderId, selectedPlayer.id);
            common_vendor.index.showToast({ title: "已同意，打手已指派" });
          } catch (e) {
            common_vendor.index.showToast({ title: "换人成功，指派失败请手动指派", icon: "none" });
          }
        } else {
          common_vendor.index.showToast({ title: "已同意，订单已入接单大厅" });
        }
        closeApproveModal();
        remindStore.fetchCsRemind();
        refresh();
      } catch (e) {
        const msg = ((_a = e == null ? void 0 : e.data) == null ? void 0 : _a.msg) || (e == null ? void 0 : e.msg) || "操作失败";
        common_vendor.index.showToast({ title: msg, icon: "none" });
      }
    }
    function openRejectModal(r) {
      currentReplace.value = r;
      rejectReason.value = "";
      showRejectModal.value = true;
    }
    async function confirmReject() {
      var _a, _b;
      if (!currentReplace.value)
        return;
      if (!((_a = rejectReason.value) == null ? void 0 : _a.trim())) {
        return common_vendor.index.showToast({ title: "请输入拒绝原因", icon: "none" });
      }
      try {
        await pagesCs_api_cs.rejectCsReplace(currentReplace.value.id, { remark: rejectReason.value.trim() });
        common_vendor.index.showToast({ title: "已拒绝" });
        showRejectModal.value = false;
        currentReplace.value = null;
        remindStore.fetchCsRemind();
        refresh();
      } catch (e) {
        const msg = ((_b = e == null ? void 0 : e.data) == null ? void 0 : _b.msg) || (e == null ? void 0 : e.msg) || "操作失败";
        common_vendor.index.showToast({ title: msg, icon: "none" });
      }
    }
    function formatTime(t) {
      if (!t)
        return "";
      return t.replace("T", " ").substring(0, 16);
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
        i: common_vendor.f(replaces.value, (r, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(r.orderNo),
            b: "13ff974b-0-" + i0,
            c: common_vendor.p({
              status: r.status,
              ["text-map"]: REPLACE_STATUS_TEXT,
              ["color-map"]: REPLACE_STATUS_COLOR
            }),
            d: common_vendor.t(r.productName),
            e: common_vendor.t(r.userNickname || "-"),
            f: common_vendor.t(r.playerNickname || "-"),
            g: r.reason
          }, r.reason ? {
            h: common_vendor.t(r.reason)
          } : {}, {
            i: r.processedAt
          }, r.processedAt ? {
            j: common_vendor.t(formatTime(r.processedAt))
          } : {}, {
            k: r.operatorRemark
          }, r.operatorRemark ? {
            l: common_vendor.t(r.operatorRemark)
          } : {}, {
            m: r.status === "PENDING"
          }, r.status === "PENDING" ? {
            n: common_vendor.o(($event) => openApproveModal(r), r.id),
            o: common_vendor.o(($event) => openRejectModal(r), r.id)
          } : {}, {
            p: r.id
          });
        }),
        j: loading.value
      }, loading.value ? {} : {}, {
        k: !loading.value && replaces.value.length === 0
      }, !loading.value && replaces.value.length === 0 ? {
        l: common_vendor.p({
          text: "暂无换人申请",
          image: "/static/icons/暂无项目.svg"
        })
      } : {}, {
        m: common_vendor.o(loadMore),
        n: showApproveModal.value
      }, showApproveModal.value ? common_vendor.e({
        o: !showPlayerPicker.value
      }, !showPlayerPicker.value ? {
        p: common_vendor.o(($event) => selectMode("hall")),
        q: common_vendor.o(($event) => selectMode("assign")),
        r: common_vendor.o(closeApproveModal)
      } : {}, {
        s: showPlayerPicker.value
      }, showPlayerPicker.value ? common_vendor.e({
        t: common_vendor.o(searchPlayers),
        v: playerKeyword.value,
        w: common_vendor.o(($event) => playerKeyword.value = $event.detail.value),
        x: common_vendor.o(searchPlayers),
        y: common_vendor.f(players.value, (p, k0, i0) => {
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
            i: common_vendor.o(($event) => confirmAssignPlayer(p), p.id)
          });
        }),
        z: common_vendor.t(maxConcurrent.value),
        A: playerLoading.value
      }, playerLoading.value ? {} : {}, {
        B: !playerLoading.value && players.value.length === 0
      }, !playerLoading.value && players.value.length === 0 ? {
        C: common_vendor.p({
          text: "暂无可用接单员",
          image: "/static/icons/暂无项目.svg"
        })
      } : {}, {
        D: common_vendor.o(loadMorePlayers),
        E: common_vendor.o(($event) => showPlayerPicker.value = false)
      }) : {}, {
        F: common_vendor.o(() => {
        }),
        G: common_vendor.o(closeApproveModal)
      }) : {}, {
        H: showRejectModal.value
      }, showRejectModal.value ? {
        I: rejectReason.value,
        J: common_vendor.o(($event) => rejectReason.value = $event.detail.value),
        K: common_vendor.o(($event) => showRejectModal.value = false),
        L: common_vendor.o(confirmReject),
        M: common_vendor.o(() => {
        }),
        N: common_vendor.o(($event) => showRejectModal.value = false)
      } : {}, {
        O: common_vendor.p({
          current: -1
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-13ff974b"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages-cs/replace/list.js.map
