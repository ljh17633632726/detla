"use strict";
const api_request = require("./request.js");
const getMessageList = (params) => api_request.get("/message/list", params);
const getUnreadCount = (type, options = {}) => api_request.get("/message/unread-count", { type }, options);
const getRemind = (options = {}) => api_request.get("/message/remind", {}, options);
const markRead = (id) => api_request.post(`/message/read/${id}`);
const markAllRead = (userType) => api_request.post(`/message/read-all?userType=${encodeURIComponent(userType)}`, {});
exports.getMessageList = getMessageList;
exports.getRemind = getRemind;
exports.getUnreadCount = getUnreadCount;
exports.markAllRead = markAllRead;
exports.markRead = markRead;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/message.js.map
