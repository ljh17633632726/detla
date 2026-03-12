"use strict";
const api_request = require("./request.js");
const getProductList = (params) => api_request.get("/product/list", params, { auth: false });
const getProductDetail = (id) => api_request.get(`/product/${id}`, {}, { auth: false });
const getProductRichDetail = (id) => api_request.get(`/app/product/${id}`, {}, { auth: false });
const getRecommendProducts = (params = {}, opts = {}) => api_request.get("/product/recommend", params, { auth: false, ...opts });
const getRecommendCategories = (opts = {}) => api_request.get("/product/recommend/categories", {}, { auth: false, ...opts });
const getCategoryFormFields = (categoryId) => api_request.get(`/product/category/${categoryId}/form-fields`, {}, { auth: false });
exports.getCategoryFormFields = getCategoryFormFields;
exports.getProductDetail = getProductDetail;
exports.getProductList = getProductList;
exports.getProductRichDetail = getProductRichDetail;
exports.getRecommendCategories = getRecommendCategories;
exports.getRecommendProducts = getRecommendProducts;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/product.js.map
