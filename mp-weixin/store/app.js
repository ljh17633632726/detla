"use strict";
const common_vendor = require("../common/vendor.js");
const utils_constants = require("../utils/constants.js");
const utils_role = require("../utils/role.js");
const ROLE_KEY = "app_role";
const useAppStore = common_vendor.defineStore("app", () => {
  const role = common_vendor.ref(utils_constants.ROLE.USER);
  function restoreRole() {
    const saved = common_vendor.index.getStorageSync(ROLE_KEY);
    if (saved && Object.values(utils_constants.ROLE).includes(saved)) {
      role.value = saved;
    }
  }
  function _saveRole() {
    common_vendor.index.setStorageSync(ROLE_KEY, role.value);
  }
  function switchToUser() {
    role.value = utils_constants.ROLE.USER;
    _saveRole();
    utils_role.navigateToRole(utils_constants.ROLE.USER);
  }
  function switchToPlayer() {
    role.value = utils_constants.ROLE.PLAYER;
    _saveRole();
    utils_role.navigateToRole(utils_constants.ROLE.PLAYER);
  }
  function switchToCs() {
    role.value = utils_constants.ROLE.CS;
    _saveRole();
    utils_role.navigateToRole(utils_constants.ROLE.CS);
  }
  const isUser = () => role.value === utils_constants.ROLE.USER;
  const isPlayer = () => role.value === utils_constants.ROLE.PLAYER;
  const isCs = () => role.value === utils_constants.ROLE.CS;
  return {
    role,
    restoreRole,
    switchToUser,
    switchToPlayer,
    switchToCs,
    isUser,
    isPlayer,
    isCs
  };
});
exports.useAppStore = useAppStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/store/app.js.map
