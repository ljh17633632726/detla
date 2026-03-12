"use strict";
const api_request = require("./request.js");
const getUserProfile = (opts = {}) => api_request.get("/user/profile", {}, { role: "user", ...opts });
const updateUserProfile = (data) => api_request.put("/user/profile", data, { role: "user" });
const getWallet = () => api_request.get("/user/wallet", {}, { role: "user" });
const getSavedInfoByCategory = (categoryId) => api_request.get(`/user/game-info/list/${categoryId}`, {}, { role: "user" });
const saveDynamicInfo = (data) => api_request.post("/user/game-info/dynamic", data, { role: "user" });
exports.getSavedInfoByCategory = getSavedInfoByCategory;
exports.getUserProfile = getUserProfile;
exports.getWallet = getWallet;
exports.saveDynamicInfo = saveDynamicInfo;
exports.updateUserProfile = updateUserProfile;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/user.js.map
