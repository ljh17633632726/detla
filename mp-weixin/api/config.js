"use strict";
const api_request = require("./request.js");
function getSiteConfig() {
  return api_request.get("/system/config/site", {}, { auth: false, loading: false });
}
exports.getSiteConfig = getSiteConfig;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/config.js.map
