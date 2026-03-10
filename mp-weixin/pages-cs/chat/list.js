"use strict";
const common_vendor = require("../../common/vendor.js");
const store_chat = require("../../store/chat.js");
const store_remind = require("../../store/remind.js");
const pagesCs_api_cs = require("../api/cs.js");
const utils_format = require("../../utils/format.js");
if (!Math) {
  (EmptyState + CustomTabBar)();
}
const CustomTabBar = () => "../../components/CustomTabBar.js";
const EmptyState = () => "../../components/EmptyState.js";
const _sfc_main = {
  __name: "list",
  setup(__props) {
    const chatStore = store_chat.useChatStore();
    const remindStore = store_remind.useRemindStore();
    const sessions = common_vendor.ref([]);
    common_vendor.onShow(async () => {
      var _a;
      chatStore.fetchMessageUnreadCount();
      remindStore.fetchCsRemind();
      try {
        const res = await pagesCs_api_cs.getCsChatSessions({ pageNum: 1, pageSize: 100 });
        sessions.value = ((_a = res.data) == null ? void 0 : _a.records) || res.data || [];
      } catch (e) {
        sessions.value = [];
      }
    });
    function firstChar(str) {
      const s = str && String(str).trim() || "";
      return s.length ? s[0] : "?";
    }
    function goRoom(s) {
      common_vendor.index.navigateTo({
        url: "/pages-cs/chat/room?sessionId=" + s.id + "&name=" + encodeURIComponent(s.targetName || "") + "&avatar=" + encodeURIComponent(s.avatar || "")
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(sessions.value, (s, k0, i0) => {
          return common_vendor.e({
            a: s.avatar
          }, s.avatar ? {
            b: s.avatar
          } : {
            c: common_vendor.t(firstChar(s.targetName || ""))
          }, {
            d: common_vendor.t(s.targetName || "用户 #" + s.id),
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4546dd9c"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages-cs/chat/list.js.map
