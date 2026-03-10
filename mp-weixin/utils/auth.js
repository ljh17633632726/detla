"use strict";
const common_vendor = require("../common/vendor.js");
const USER_TOKEN_KEY = "user_token";
const PLAYER_TOKEN_KEY = "player_token";
const CS_TOKEN_KEY = "cs_token";
function getUserToken() {
  return common_vendor.index.getStorageSync(USER_TOKEN_KEY) || "";
}
function setUserToken(token) {
  common_vendor.index.setStorageSync(USER_TOKEN_KEY, token);
}
function removeUserToken() {
  common_vendor.index.removeStorageSync(USER_TOKEN_KEY);
}
function getPlayerToken() {
  return common_vendor.index.getStorageSync(PLAYER_TOKEN_KEY) || "";
}
function setPlayerToken(token) {
  common_vendor.index.setStorageSync(PLAYER_TOKEN_KEY, token);
}
function removePlayerToken() {
  common_vendor.index.removeStorageSync(PLAYER_TOKEN_KEY);
}
const CS_INFO_KEY = "cs_info";
function getCsToken() {
  return common_vendor.index.getStorageSync(CS_TOKEN_KEY) || "";
}
function setCsToken(token) {
  common_vendor.index.setStorageSync(CS_TOKEN_KEY, token);
}
function getCsInfo() {
  return common_vendor.index.getStorageSync(CS_INFO_KEY) || null;
}
function setCsInfo(info) {
  common_vendor.index.setStorageSync(CS_INFO_KEY, info);
}
function removeCsToken() {
  common_vendor.index.removeStorageSync(CS_TOKEN_KEY);
  common_vendor.index.removeStorageSync(CS_INFO_KEY);
}
function getTokenByRole(role) {
  if (role === "cs")
    return getCsToken();
  if (role === "player")
    return getPlayerToken();
  return getUserToken();
}
exports.getCsInfo = getCsInfo;
exports.getTokenByRole = getTokenByRole;
exports.getUserToken = getUserToken;
exports.removeCsToken = removeCsToken;
exports.removePlayerToken = removePlayerToken;
exports.removeUserToken = removeUserToken;
exports.setCsInfo = setCsInfo;
exports.setCsToken = setCsToken;
exports.setPlayerToken = setPlayerToken;
exports.setUserToken = setUserToken;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/auth.js.map
