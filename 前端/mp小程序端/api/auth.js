"use strict";
const api_request = require("./request.js");
const userLogin = (code, phoneCode) => api_request.post("/user/auth/login", { code, phoneCode }, { auth: false });
const switchToPlayerToken = () => api_request.post("/user/auth/switch-to-player", {}, { role: "user", loading: true });
const csLogin = (data) => api_request.post("/cs/auth/login", data, { auth: false });
exports.csLogin = csLogin;
exports.switchToPlayerToken = switchToPlayerToken;
exports.userLogin = userLogin;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/auth.js.map
