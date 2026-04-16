"use strict";
const common_vendor = require("../common/vendor.js");
const api_cs = require("../api/cs.js");
const api_player = require("../api/player.js");
const utils_notificationFeedback = require("../utils/notificationFeedback.js");
const useRemindStore = common_vendor.defineStore("remind", () => {
  const complaintUnread = common_vendor.ref(0);
  const relayUnread = common_vendor.ref(0);
  const replaceUnread = common_vendor.ref(0);
  const messageUnread = common_vendor.ref(0);
  const systemUnread = common_vendor.ref(0);
  const inviteCount = common_vendor.ref(0);
  let pollTimer = null;
  let pollingRole = "";
  let lastRelayUnread = null;
  async function fetchCsRemind(options = {}) {
    const notifyIncrease = options.notifyIncrease === true;
    try {
      const res = await api_cs.getCsRemind({ loading: false });
      const d = res.data || {};
      const nextRelayUnread = d.relayUnread ?? 0;
      if (notifyIncrease && lastRelayUnread !== null && nextRelayUnread > lastRelayUnread) {
        utils_notificationFeedback.playMessageNotification();
        common_vendor.index.showToast({ title: "收到新的接力申请", icon: "none" });
      }
      complaintUnread.value = d.complaintUnread ?? 0;
      relayUnread.value = nextRelayUnread;
      replaceUnread.value = d.replaceUnread ?? 0;
      messageUnread.value = d.messageUnread ?? 0;
      systemUnread.value = d.systemUnread ?? 0;
      lastRelayUnread = nextRelayUnread;
    } catch (_) {
      complaintUnread.value = 0;
      relayUnread.value = 0;
      replaceUnread.value = 0;
      messageUnread.value = 0;
      systemUnread.value = 0;
    }
  }
  async function fetchPlayerRemind() {
    try {
      const res = await api_player.getPlayerRemind({ loading: false });
      const d = res.data || {};
      inviteCount.value = d.inviteCount ?? 0;
      systemUnread.value = d.systemUnread ?? 0;
      messageUnread.value = d.messageUnread ?? 0;
    } catch (_) {
      inviteCount.value = 0;
      systemUnread.value = 0;
      messageUnread.value = 0;
    }
  }
  function startPolling(role) {
    if (pollTimer && pollingRole === role)
      return;
    stopPolling();
    if (role === "cs") {
      pollingRole = role;
      fetchCsRemind();
      pollTimer = setInterval(() => fetchCsRemind({ notifyIncrease: true }), 15e3);
      return;
    }
    if (role === "player") {
      pollingRole = role;
      fetchPlayerRemind();
      pollTimer = setInterval(fetchPlayerRemind, 15e3);
    }
  }
  function stopPolling() {
    if (pollTimer) {
      clearInterval(pollTimer);
      pollTimer = null;
    }
    pollingRole = "";
  }
  function clear() {
    stopPolling();
    complaintUnread.value = 0;
    relayUnread.value = 0;
    replaceUnread.value = 0;
    messageUnread.value = 0;
    systemUnread.value = 0;
    inviteCount.value = 0;
    lastRelayUnread = null;
  }
  return {
    complaintUnread,
    relayUnread,
    replaceUnread,
    messageUnread,
    systemUnread,
    inviteCount,
    fetchCsRemind,
    fetchPlayerRemind,
    startPolling,
    stopPolling,
    clear
  };
});
exports.useRemindStore = useRemindStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/store/remind.js.map
