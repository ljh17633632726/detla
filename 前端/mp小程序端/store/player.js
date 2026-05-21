"use strict";
const common_vendor = require("../common/vendor.js");
const api_player = require("../api/player.js");
const usePlayerStore = common_vendor.defineStore("player", () => {
  const playerInfo = common_vendor.ref(null);
  const playerId = common_vendor.computed(() => {
    var _a;
    return ((_a = playerInfo.value) == null ? void 0 : _a.id) || null;
  });
  const auditStatus = common_vendor.computed(() => {
    var _a;
    return ((_a = playerInfo.value) == null ? void 0 : _a.status) || "";
  });
  const isApproved = common_vendor.computed(() => {
    var _a;
    return ((_a = playerInfo.value) == null ? void 0 : _a.status) === "ACTIVE";
  });
  async function fetchProfile(opts = {}) {
    try {
      const { data } = await api_player.getPlayerProfile(opts);
      playerInfo.value = data;
      return data;
    } catch (e) {
      return null;
    }
  }
  function reset() {
    playerInfo.value = null;
  }
  return {
    playerInfo,
    playerId,
    auditStatus,
    isApproved,
    fetchProfile,
    reset
  };
});
exports.usePlayerStore = usePlayerStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/store/player.js.map
