"use strict";
const common_vendor = require("../common/vendor.js");
const WS_BASE_URL = "wss://furandianjing.cn/ws/chat";
const HEARTBEAT_INTERVAL = 3e4;
const MAX_RECONNECT = 5;
let socketTask = null;
let heartbeatTimer = null;
let reconnectCount = 0;
let currentToken = null;
let onMessageCallback = null;
let onConnectCallback = null;
let onCloseCallback = null;
function connectWebSocket(token, options = {}) {
  if (socketTask) {
    common_vendor.index.__f__("log", "at utils/websocket.js:25", "[WS] already connecting/connected, skip new connect");
    return;
  }
  currentToken = token;
  currentChatRole = options.chatRole || "";
  reconnectCount = 0;
  _doConnect();
}
let currentChatRole = "";
function _doConnect() {
  let url = `${WS_BASE_URL}?token=${currentToken}`;
  if (currentChatRole)
    url += `&chatRole=${encodeURIComponent(currentChatRole)}`;
  socketTask = common_vendor.index.connectSocket({
    url,
    success() {
      common_vendor.index.__f__("log", "at utils/websocket.js:43", "[WS] connecting...");
    }
  });
  socketTask.onOpen(() => {
    common_vendor.index.__f__("log", "at utils/websocket.js:48", "[WS] connected");
    reconnectCount = 0;
    _startHeartbeat();
    onConnectCallback && onConnectCallback();
  });
  socketTask.onMessage((res) => {
    const data = JSON.parse(res.data);
    if (data.type !== "pong") {
      onMessageCallback && onMessageCallback(data);
    }
  });
  socketTask.onError((err) => {
    common_vendor.index.__f__("error", "at utils/websocket.js:62", "[WS] error:", err);
  });
  socketTask.onClose(() => {
    common_vendor.index.__f__("log", "at utils/websocket.js:66", "[WS] closed");
    _stopHeartbeat();
    socketTask = null;
    onCloseCallback && onCloseCallback();
    if (reconnectCount < MAX_RECONNECT) {
      reconnectCount++;
      common_vendor.index.__f__("log", "at utils/websocket.js:73", `[WS] reconnecting (${reconnectCount}/${MAX_RECONNECT})...`);
      setTimeout(() => _doConnect(), 3e3 * reconnectCount);
    }
  });
}
function _startHeartbeat() {
  _stopHeartbeat();
  heartbeatTimer = setInterval(() => {
    if (socketTask) {
      socketTask.send({ data: JSON.stringify({ type: "ping" }) });
    }
  }, HEARTBEAT_INTERVAL);
}
function _stopHeartbeat() {
  if (heartbeatTimer) {
    clearInterval(heartbeatTimer);
    heartbeatTimer = null;
  }
}
function sendMessage(data) {
  if (!socketTask) {
    common_vendor.index.__f__("warn", "at utils/websocket.js:100", "[WS] not connected");
    return false;
  }
  socketTask.send({ data: JSON.stringify(data) });
  return true;
}
function closeWebSocket() {
  reconnectCount = MAX_RECONNECT;
  _stopHeartbeat();
  if (socketTask) {
    socketTask.close();
    socketTask = null;
  }
}
function onWsMessage(callback) {
  onMessageCallback = callback;
}
function onWsConnect(callback) {
  onConnectCallback = callback;
}
function onWsClose(callback) {
  onCloseCallback = callback;
}
function isWsConnected() {
  return socketTask !== null;
}
exports.closeWebSocket = closeWebSocket;
exports.connectWebSocket = connectWebSocket;
exports.isWsConnected = isWsConnected;
exports.onWsClose = onWsClose;
exports.onWsConnect = onWsConnect;
exports.onWsMessage = onWsMessage;
exports.sendMessage = sendMessage;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/websocket.js.map
