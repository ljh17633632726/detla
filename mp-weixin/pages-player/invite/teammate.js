"use strict";
const common_vendor = require("../../common/vendor.js");
const api_player = require("../../api/player.js");
if (!Math) {
  EmptyState();
}
const EmptyState = () => "../../components/EmptyState.js";
const _sfc_main = {
  __name: "teammate",
  setup(__props) {
    const orderId = common_vendor.ref("");
    const keyword = common_vendor.ref("");
    const players = common_vendor.ref([]);
    const pageNum = common_vendor.ref(1);
    const loading = common_vendor.ref(false);
    const finished = common_vendor.ref(false);
    const maxConcurrent = common_vendor.ref(5);
    const showSplitModal = common_vendor.ref(false);
    const inviteTarget = common_vendor.ref(null);
    const selectedSplit = common_vendor.ref("FIFTY_FIFTY");
    const customAmount = common_vendor.ref("");
    const splitOptions = [
      { value: "FIFTY_FIFTY", label: "五五开", desc: "平分接单员收入" },
      { value: "FORTY_SIXTY", label: "四六开", desc: "队友40% 你拿60%" },
      { value: "THIRTY_SEVENTY", label: "三七开", desc: "队友30% 你拿70%" },
      { value: "CUSTOM", label: "自定义金额", desc: "指定队友分成金额" }
    ];
    common_vendor.onLoad((opts) => {
      orderId.value = opts.orderId;
      loadData();
    });
    function searchTeammate() {
      pageNum.value = 1;
      players.value = [];
      finished.value = false;
      loadData();
    }
    async function loadData() {
      loading.value = true;
      const params = { pageNum: pageNum.value, pageSize: 20, orderId: orderId.value };
      if (keyword.value)
        params.keyword = keyword.value;
      const res = await api_player.getAvailableTeammates(params);
      const data = res.data || {};
      if (data.maxConcurrent)
        maxConcurrent.value = data.maxConcurrent;
      const page = data.players || {};
      const list = page.records || [];
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
    function openInvite(player) {
      inviteTarget.value = player;
      selectedSplit.value = "FIFTY_FIFTY";
      customAmount.value = "";
      showSplitModal.value = true;
    }
    async function confirmInvite() {
      if (!inviteTarget.value)
        return;
      const data = { inviteePlayerId: inviteTarget.value.id, splitType: selectedSplit.value };
      if (selectedSplit.value === "CUSTOM") {
        if (!customAmount.value || Number(customAmount.value) <= 0) {
          return common_vendor.index.showToast({ title: "请输入有效金额", icon: "none" });
        }
        data.customAmount = Number(customAmount.value);
      }
      try {
        await api_player.inviteTeammate(orderId.value, data);
        common_vendor.index.showToast({ title: "已发送邀请" });
        showSplitModal.value = false;
      } catch (e) {
      }
    }
    return (_ctx, _cache) => {
      var _a;
      return common_vendor.e({
        a: common_vendor.o(searchTeammate),
        b: keyword.value,
        c: common_vendor.o(($event) => keyword.value = $event.detail.value),
        d: common_vendor.o(searchTeammate),
        e: common_vendor.f(players.value, (p, k0, i0) => {
          return common_vendor.e({
            a: p.avatar || "/static/images/default-avatar.png",
            b: common_vendor.t(p.nickname),
            c: p.avgRating
          }, p.avgRating ? {
            d: common_vendor.t(Number(p.avgRating).toFixed(1))
          } : {}, {
            e: common_vendor.t(p.completedOrders || 0),
            f: common_vendor.t(p.activeOrders || 0),
            g: p.activeOrders >= maxConcurrent.value ? 1 : "",
            h: common_vendor.o(($event) => openInvite(p), p.id),
            i: p.id
          });
        }),
        f: common_vendor.t(maxConcurrent.value),
        g: loading.value
      }, loading.value ? {} : {}, {
        h: !loading.value && players.value.length === 0
      }, !loading.value && players.value.length === 0 ? {
        i: common_vendor.p({
          text: "暂无可邀请的队友",
          image: "/static/icons/暂无项目.svg"
        })
      } : {}, {
        j: common_vendor.o(loadMore),
        k: showSplitModal.value
      }, showSplitModal.value ? common_vendor.e({
        l: common_vendor.t((_a = inviteTarget.value) == null ? void 0 : _a.nickname),
        m: common_vendor.f(splitOptions, (opt, k0, i0) => {
          return {
            a: common_vendor.t(opt.label),
            b: common_vendor.t(opt.desc),
            c: opt.value,
            d: selectedSplit.value === opt.value ? 1 : "",
            e: common_vendor.o(($event) => selectedSplit.value = opt.value, opt.value)
          };
        }),
        n: selectedSplit.value === "CUSTOM"
      }, selectedSplit.value === "CUSTOM" ? {
        o: customAmount.value,
        p: common_vendor.o(($event) => customAmount.value = $event.detail.value)
      } : {}, {
        q: common_vendor.o(($event) => showSplitModal.value = false),
        r: common_vendor.o(confirmInvite),
        s: common_vendor.o(() => {
        }),
        t: common_vendor.o(($event) => showSplitModal.value = false)
      }) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e09f31ee"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages-player/invite/teammate.js.map
