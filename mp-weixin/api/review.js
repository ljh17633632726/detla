"use strict";const e=require("./request.js");exports.addReview=r=>e.post("/order/review",r),exports.getMyReviews=r=>e.get("/order/review/my",r);
