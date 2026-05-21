"use strict";
const api_request = require("./request.js");
const addReview = (data) => api_request.post("/order/review", data);
const getMyReviews = (params) => api_request.get("/order/review/my", params);
exports.addReview = addReview;
exports.getMyReviews = getMyReviews;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/review.js.map
