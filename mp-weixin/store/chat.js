"use strict";
const common_vendor = require("../common/vendor.js");
const utils_auth = require("../utils/auth.js");
const utils_websocket = require("../utils/websocket.js");
const api_message = require("../api/message.js");
const utils_notificationFeedback = require("../utils/notificationFeedback.js");
let systemUnreadPollTimer = null;
const useChatStore = common_vendor.defineStore("chat", () => {
  const connected = common_vendor.ref(false);
  const unreadCount = common_vendor.ref(0);
  const messageUnreadCount = common_vendor.ref(0);
  const currentSessionId = common_vendor.ref(null);
  const newMessage = common_vendor.ref(null);
  let lastSystemUnread = null;
  async function fetchMessageUnreadCount() {
    try {
      const role = common_vendor.index.getStorageSync("app_role") || "user";
      const type = role === "cs" ? "CS" : role === "player" ? "PLAYER" : "USER";
      const res = await api_message.getUnreadCount(type, { loading: false });
      const newCount = res.data ?? 0;
      if (lastSystemUnread !== null && newCount > lastSystemUnread) {
        utils_notificationFeedback.playMessageNotification();
        common_vendor.index.showToast({ title: "您有新的系统通知", icon: "none" });
      }
      lastSystemUnread = newCount;
      messageUnreadCount.value = newCount;
    } catch (_) {
    }
  }
  const totalUnreadCount = common_vendor.computed(() => unreadCount.value);
  function connect(opts = {}) {
    if (utils_websocket.isWsConnected())
      return;
    const role = common_vendor.index.getStorageSync("app_role") || "user";
    const token = utils_auth.getTokenByRole(role);
    if (!token)
      return;
    const chatRole = opts.chatRole ?? (role === "player" ? "PLAYER" : role === "cs" ? "CS" : "USER");
    utils_websocket.connectWebSocket(token, chatRole ? { chatRole } : {});
    utils_websocket.onWsConnect(() => {
      connected.value = true;
      fetchMessageUnreadCount();
      if (systemUnreadPollTimer)
        clearInterval(systemUnreadPollTimer);
      systemUnreadPollTimer = setInterval(fetchMessageUnreadCount, 25e3);
    });
    utils_websocket.onWsMessage((data) => {
      newMessage.value = data;
      if (data.sessionId !== currentSessionId.value) {
        unreadCount.value++;
        fetchMessageUnreadCount();
        utils_notificationFeedback.playMessageNotification();
        common_vendor.index.showToast({ title: "收到新消息", icon: "none" });
      }
    });
    utils_websocket.onWsClose(() => {
      connected.value = false;
    });
  }
  function disconnect() {
    if (systemUnreadPollTimer) {
      clearInterval(systemUnreadPollTimer);
      systemUnreadPollTimer = null;
    }
    utils_websocket.closeWebSocket();
    connected.value = false;
  }
  function setCurrentSession(sessionId) {
    currentSessionId.value = sessionId;
  }
  function clearCurrentSession() {
    currentSessionId.value = null;
  }
  function resetUnread() {
    unreadCount.value = 0;
  }
  function setUnreadFromServer(count) {
    unreadCount.value = Math.max(0, count ?? 0);
  }
  function setSystemUnreadFromServer(count) {
    messageUnreadCount.value = Math.max(0, count ?? 0);
    if (lastSystemUnread !== null)
      lastSystemUnread = messageUnreadCount.value;
  }
  return {
    connected,
    unreadCount,
    messageUnreadCount,
    totalUnreadCount,
    fetchMessageUnreadCount,
    setUnreadFromServer,
    setSystemUnreadFromServer,
    currentSessionId,
    newMessage,
    connect,
    disconnect,
    setCurrentSession,
    clearCurrentSession,
    resetUnread
  };
});
exports.useChatStore = useChatStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/store/chat.js.map
