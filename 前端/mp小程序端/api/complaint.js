"use strict";
const api_request = require("./request.js");
const createComplaint = (data) => api_request.post("/order/complaint", data);
const getComplaintDetail = (id) => api_request.get(`/order/complaint/${id}`);
const appealComplaint = (id, data) => api_request.post(`/order/complaint/${id}/appeal`, data);
const getMyComplaints = (params) => api_request.get("/order/complaint/my", params);
exports.appealComplaint = appealComplaint;
exports.createComplaint = createComplaint;
exports.getComplaintDetail = getComplaintDetail;
exports.getMyComplaints = getMyComplaints;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/complaint.js.map
