"use strict";
const api_request = require("./request.js");
const getUserProfile = (opts = {}) => api_request.get("/user/profile", {}, { role: "user", ...opts });
const updateUserProfile = (data) => api_request.put("/user/profile", data, { role: "user" });
const getWallet = () => api_request.get("/user/wallet", {}, { role: "user" });
const getGameInfoList = () => api_request.get("/user/game-info/list", {}, { role: "user" });
const saveGameInfo = (data) => api_request.post("/user/game-info", data, { role: "user" });
exports.getGameInfoList = getGameInfoList;
exports.getUserProfile = getUserProfile;
exports.getWallet = getWallet;
exports.saveGameInfo = saveGameInfo;
exports.updateUserProfile = updateUserProfile;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/user.js.map
