"use strict";
const api_request = require("./request.js");
const getActiveNotices = (opts = {}) => api_request.get("/system/notice/active", {}, { auth: false, ...opts });
exports.getActiveNotices = getActiveNotices;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/notice.js.map
