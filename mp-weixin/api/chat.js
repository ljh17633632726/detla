"use strict";
const api_request = require("./request.js");
const sendChatMessage = (data) => api_request.post("/common/chat/message/send", data);
const getSessionList = (opts = {}) => {
  const query = opts.chatRole ? { chatRole: opts.chatRole } : {};
  return api_request.get("/common/chat/session/list", query, opts);
};
const getChatMessageList = (params) => api_request.get("/common/chat/message/list", params);
const getSessionByOrderId = (orderId, opts = {}) => {
  const params = opts.chatRole ? { chatRole: opts.chatRole } : {};
  return api_request.get(`/common/chat/session/by-order/${orderId}`, params);
};
const getSessionDetail = (sessionId, opts = {}) => {
  const params = opts.chatRole ? { chatRole: opts.chatRole } : {};
  return api_request.get(`/common/chat/session/${sessionId}`, params);
};
const markMessageRead = (sessionId, opts = {}) => {
  const q = opts.chatRole ? `&chatRole=${encodeURIComponent(opts.chatRole)}` : "";
  return api_request.post(`/common/chat/message/read?sessionId=${sessionId}${q}`, {});
};
const createCsSession = () => api_request.post("/common/chat/session/cs");
exports.createCsSession = createCsSession;
exports.getChatMessageList = getChatMessageList;
exports.getSessionByOrderId = getSessionByOrderId;
exports.getSessionDetail = getSessionDetail;
exports.getSessionList = getSessionList;
exports.markMessageRead = markMessageRead;
exports.sendChatMessage = sendChatMessage;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/chat.js.map
