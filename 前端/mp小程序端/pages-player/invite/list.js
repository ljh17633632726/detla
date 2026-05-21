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
    const INVITE_STATUS_TEXT = { INVITED: "待处理", ACCEPTED: "已接受", REJECTED: "已拒绝", CANCELLED: "已作废" };
    const INVITE_STATUS_COLOR = { INVITED: "#ff9900", ACCEPTED: "#07c160", REJECTED: "#ee0a24", CANCELLED: "#999" };
    const SPLIT_TYPE_TEXT = { FIFTY_FIFTY: "五五开", FORTY_SIXTY: "四六开", THIRTY_SEVENTY: "三七开", CUSTOM: "自定义" };
    const tab = common_vendor.ref("received");
    const records = common_vendor.ref([]);
    const pageNum = common_vendor.ref(1);
    const loading = common_vendor.ref(false);
    const finished = common_vendor.ref(false);
    common_vendor.onShow(() => {
      refresh();
    });
    function switchTab(t) {
      tab.value = t;
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
      const res = await api_player.getInviteList({ pageNum: pageNum.value, pageSize: 20, type: tab.value });
      const list = ((_a = res.data) == null ? void 0 : _a.records) || (Array.isArray(res.data) ? res.data : []);
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
    function getOrderId(item) {
      return (item == null ? void 0 : item.orderId) ?? null;
    }
    async function doAccept(item) {
      var _a;
      const orderId = getOrderId(item);
      if (orderId == null) {
        common_vendor.index.showToast({ title: "数据异常，缺少订单信息", icon: "none" });
        return;
      }
      try {
        await api_player.acceptInvite(orderId);
        common_vendor.index.showToast({ title: "已接受" });
        refresh();
      } catch (e) {
        common_vendor.index.showToast({ title: ((_a = e == null ? void 0 : e.data) == null ? void 0 : _a.msg) || (e == null ? void 0 : e.message) || "接受失败", icon: "none" });
      }
    }
    async function doReject(item) {
      const orderId = getOrderId(item);
      if (orderId == null) {
        common_vendor.index.showToast({ title: "数据异常，缺少订单信息", icon: "none" });
        return;
      }
      common_vendor.index.showModal({ title: "提示", content: "确定拒绝该邀请？", success: async (r) => {
        var _a;
        if (!r.confirm)
          return;
        try {
          await api_player.rejectInvite(orderId);
          common_vendor.index.showToast({ title: "已拒绝" });
          refresh();
        } catch (e) {
          common_vendor.index.showToast({ title: ((_a = e == null ? void 0 : e.data) == null ? void 0 : _a.msg) || (e == null ? void 0 : e.message) || "拒绝失败", icon: "none" });
        }
      } });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: tab.value === "received" ? 1 : "",
        b: common_vendor.o(($event) => switchTab("received")),
        c: tab.value === "sent" ? 1 : "",
        d: common_vendor.o(($event) => switchTab("sent")),
        e: common_vendor.f(records.value, (item, k0, i0) => {
          return common_vendor.e({
            a: (tab.value === "received" ? item.fromAvatar : item.toAvatar) || "/static/images/default-avatar.png",
            b: common_vendor.t(tab.value === "received" ? item.fromNickname : item.toNickname),
            c: common_vendor.t(item.orderNo || item.orderId),
            d: common_vendor.t(SPLIT_TYPE_TEXT[item.splitType] || "平分"),
            e: common_vendor.t(item.splitType === "CUSTOM" && item.splitAmount ? " ¥" + item.splitAmount : ""),
            f: common_vendor.t(INVITE_STATUS_TEXT[item.status] || item.status),
            g: INVITE_STATUS_COLOR[item.status] || "#999",
            h: tab.value === "received" && item.status === "INVITED"
          }, tab.value === "received" && item.status === "INVITED" ? {
            i: common_vendor.o(($event) => doAccept(item), item.id),
            j: common_vendor.o(($event) => doReject(item), item.id)
          } : {}, {
            k: item.id
          });
        }),
        f: loading.value
      }, loading.value ? {} : {}, {
        g: !loading.value && records.value.length === 0
      }, !loading.value && records.value.length === 0 ? {
        h: common_vendor.p({
          text: "暂无邀请记录",
          image: "/static/icons/暂无纪录.svg"
        })
      } : {}, {
        i: common_vendor.o(loadMore)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3ea0d269"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages-player/invite/list.js.map
