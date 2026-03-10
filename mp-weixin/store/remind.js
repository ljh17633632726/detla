"use strict";
const common_vendor = require("../common/vendor.js");
const api_cs = require("../api/cs.js");
const api_player = require("../api/player.js");
const useRemindStore = common_vendor.defineStore("remind", () => {
  const complaintUnread = common_vendor.ref(0);
  const messageUnread = common_vendor.ref(0);
  const systemUnread = common_vendor.ref(0);
  const inviteCount = common_vendor.ref(0);
  async function fetchCsRemind() {
    try {
      const res = await api_cs.getCsRemind({ loading: false });
      const d = res.data || {};
      complaintUnread.value = d.complaintUnread ?? 0;
      messageUnread.value = d.messageUnread ?? 0;
      systemUnread.value = d.systemUnread ?? 0;
    } catch (_) {
      complaintUnread.value = 0;
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
  function clear() {
    complaintUnread.value = 0;
    messageUnread.value = 0;
    systemUnread.value = 0;
    inviteCount.value = 0;
  }
  return {
    complaintUnread,
    messageUnread,
    systemUnread,
    inviteCount,
    fetchCsRemind,
    fetchPlayerRemind,
    clear
  };
});
exports.useRemindStore = useRemindStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/store/remind.js.map
