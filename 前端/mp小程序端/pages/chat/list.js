"use strict";
const common_vendor = require("../../common/vendor.js");
const api_chat = require("../../api/chat.js");
const api_message = require("../../api/message.js");
const store_chat = require("../../store/chat.js");
const utils_format = require("../../utils/format.js");
const composables_useGoldDust = require("../../composables/useGoldDust.js");
if (!Math) {
  (EmptyState + CustomTabBar)();
}
const EmptyState = () => "../../components/EmptyState.js";
const CustomTabBar = () => "../../components/CustomTabBar.js";
const _sfc_main = {
  __name: "list",
  setup(__props) {
    composables_useGoldDust.useGoldDust();
    const chatStore = store_chat.useChatStore();
    const sessions = common_vendor.ref([]);
    const USER_CHAT_OPTS = { chatRole: "USER" };
    async function fetchList() {
      try {
        const res = await api_chat.getSessionList({ ...USER_CHAT_OPTS, loading: false });
        sessions.value = res.data || [];
      } catch (e) {
        sessions.value = [];
      }
    }
    common_vendor.onShow(async () => {
      chatStore.connect(USER_CHAT_OPTS);
      try {
        const res = await api_message.getRemind({ loading: false });
        const d = res.data || {};
        chatStore.setUnreadFromServer(d.messageUnread ?? 0);
        chatStore.setSystemUnreadFromServer(d.systemUnread ?? 0);
      } catch (_) {
      }
      await fetchList();
    });
    common_vendor.watch(() => chatStore.newMessage, () => {
      if (chatStore.newMessage)
        fetchList();
    });
    function firstChar(str) {
      const s = str && String(str).trim() || "";
      return s.length ? s[0] : "?";
    }
    function goRoom(s) {
      common_vendor.index.navigateTo({ url: "/pages/chat/room?sessionId=" + s.id + "&name=" + encodeURIComponent(s.targetName || s.nickname || "") });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(sessions.value, (s, k0, i0) => {
          return common_vendor.e({
            a: s.avatar
          }, s.avatar ? {
            b: s.avatar
          } : {
            c: common_vendor.t(firstChar(s.targetName || s.nickname || ""))
          }, {
            d: common_vendor.t(s.targetName || s.nickname || "会话 #" + s.id),
            e: common_vendor.t(common_vendor.unref(utils_format.formatRelativeTime)(s.lastMessageAt)),
            f: common_vendor.t(s.lastMessage || "暂无消息"),
            g: s.unreadCount > 0
          }, s.unreadCount > 0 ? {
            h: common_vendor.t(s.unreadCount > 99 ? "99+" : s.unreadCount)
          } : {}, {
            i: s.id,
            j: common_vendor.o(($event) => goRoom(s), s.id)
          });
        }),
        b: sessions.value.length === 0
      }, sessions.value.length === 0 ? {
        c: common_vendor.p({
          text: "暂无会话",
          image: "/static/icons/暂无消息对话.svg"
        })
      } : {}, {
        d: common_vendor.p({
          current: 3
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-32c40775"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/chat/list.js.map
