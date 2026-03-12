"use strict";
const api_request = require("./request.js");
const createPayment = (orderId) => api_request.post(`/pay/wx/${orderId}`);
const createPlayerDeposit = () => api_request.post("/pay/player-deposit");
const balancePay = (orderId) => api_request.post(`/pay/balance/${orderId}`);
const getTransactions = (params) => api_request.get("/pay/transactions", params);
exports.balancePay = balancePay;
exports.createPayment = createPayment;
exports.createPlayerDeposit = createPlayerDeposit;
exports.getTransactions = getTransactions;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/pay.js.map
