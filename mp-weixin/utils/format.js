"use strict";
function normalizeDateInput(dateStr) {
  if (!dateStr)
    return null;
  if (typeof dateStr === "string" && dateStr.includes(" ") && !dateStr.includes("T")) {
    return new Date(dateStr.replace(" ", "T"));
  }
  return new Date(dateStr);
}
function formatDateTime(dateStr) {
  if (!dateStr)
    return "";
  const d = normalizeDateInput(dateStr);
  if (!d || isNaN(d.getTime()))
    return dateStr;
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}
function formatDate(dateStr) {
  if (!dateStr)
    return "";
  const d = normalizeDateInput(dateStr);
  if (!d || isNaN(d.getTime()))
    return dateStr;
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
function formatRelativeTime(dateStr) {
  if (!dateStr)
    return "";
  const now = Date.now();
  const d = normalizeDateInput(dateStr);
  if (!d || isNaN(d.getTime()))
    return dateStr;
  const diff = Math.floor((now - d.getTime()) / 1e3);
  if (diff < 60)
    return "刚刚";
  if (diff < 3600)
    return `${Math.floor(diff / 60)}分钟前`;
  if (diff < 86400)
    return `${Math.floor(diff / 3600)}小时前`;
  if (diff < 604800)
    return `${Math.floor(diff / 86400)}天前`;
  return formatDate(dateStr);
}
exports.formatDateTime = formatDateTime;
exports.formatRelativeTime = formatRelativeTime;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/format.js.map
