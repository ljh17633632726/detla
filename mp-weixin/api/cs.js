"use strict";
const api_request = require("./request.js");
const CS = { role: "cs" };
const getCsRemind = (opts = {}) => api_request.get("/cs/remind", {}, { ...CS, ...opts });
exports.getCsRemind = getCsRemind;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/cs.js.map
