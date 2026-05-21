"use strict";
const api_request = require("./request.js");
const getAllCategories = (opts = {}) => api_request.get("/product/category/all", {}, { auth: false, ...opts });
const getCategoryTree = (opts = {}) => api_request.get("/product/category/tree", {}, { auth: false, ...opts });
exports.getAllCategories = getAllCategories;
exports.getCategoryTree = getCategoryTree;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/category.js.map
