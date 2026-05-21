"use strict";
const api_request = require("./request.js");
const getActiveBanners = (opts = {}) => api_request.get("/system/banner/active", {}, { auth: false, ...opts });
exports.getActiveBanners = getActiveBanners;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/banner.js.map
