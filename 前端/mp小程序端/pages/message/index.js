"use strict";
const common_vendor = require("../../common/vendor.js");
const api_message = require("../../api/message.js");
const store_chat = require("../../store/chat.js");
if (!Math) {
  EmptyState();
}
const EmptyState = () => "../../components/EmptyState.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const messages = common_vendor.ref([]);
    const pageNum = common_vendor.ref(1);
    const loading = common_vendor.ref(false);
    const finished = common_vendor.ref(false);
    common_vendor.onLoad(() => {
      loadData();
    });
    common_vendor.onShow(() => {
      store_chat.useChatStore().fetchMessageUnreadCount();
    });
    async function loadData() {
      var _a;
      loading.value = true;
      const params = { pageNum: pageNum.value, pageSize: 20 };
      const res = await api_message.getMessageList(params);
      const list = ((_a = res.data) == null ? void 0 : _a.records) || [];
      if (list.length < 20)
        finished.value = true;
      messages.value = pageNum.value === 1 ? list : [...messages.value, ...list];
      loading.value = false;
    }
    function loadMore() {
      if (!loading.value && !finished.value) {
        pageNum.value++;
        loadData();
      }
    }
    async function onTap(m) {
      if (!m.isRead) {
        await api_message.markRead(m.id);
        m.isRead = 1;
      }
      if (m.type === "ORDER" && m.relatedId) {
        common_vendor.index.navigateTo({ url: `/pages/order/detail?id=${m.relatedId}` });
      }
    }
    const chatStore = store_chat.useChatStore();
    async function markAllReadClick() {
      try {
        const role = common_vendor.index.getStorageSync("app_role") || "user";
        const userType = role === "cs" ? "CS" : role === "player" ? "PLAYER" : "USER";
        await api_message.markAllRead(userType);
        common_vendor.index.showToast({ title: "已全部标为已读", icon: "none" });
        messages.value.forEach((m) => {
          m.isRead = 1;
        });
        chatStore.fetchMessageUnreadCount();
      } catch (e) {
        common_vendor.index.showToast({ title: "操作失败", icon: "none" });
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(markAllReadClick),
        b: common_vendor.f(messages.value, (m, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(m.title),
            b: !m.isRead
          }, !m.isRead ? {} : {}, {
            c: common_vendor.t(m.content),
            d: common_vendor.t(m.createdAt),
            e: m.id,
            f: common_vendor.o(($event) => onTap(m), m.id)
          });
        }),
        c: loading.value
      }, loading.value ? {} : {}, {
        d: !loading.value && messages.value.length === 0
      }, !loading.value && messages.value.length === 0 ? {
        e: common_vendor.p({
          text: "暂无通知",
          image: "/static/icons/暂无通知.svg"
        })
      } : {}, {
        f: common_vendor.o(loadMore)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-780fc0ad"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/message/index.js.map
