"use strict";
const common_vendor = require("../common/vendor.js");
const WS_BASE_URL = "wss://anheiboshen.com/ws/chat";
const HEARTBEAT_INTERVAL = 3e4;
const MAX_RECONNECT = 5;
let state = "DISCONNECTED";
let socketTask = null;
let heartbeatTimer = null;
let reconnectCount = 0;
let reconnectTimer = null;
let currentToken = null;
let currentChatRole = "";
const callbacks = { onMessage: null, onConnect: null, onClose: null };
let sendQueue = [];
let _pendingConnect = null;
function connectWebSocket(token, options = {}) {
  const chatRole = options.chatRole || "";
  if (state === "CONNECTED" || state === "CONNECTING") {
    if (currentToken === token && currentChatRole === chatRole) {
      common_vendor.index.__f__("log", "at utils/websocket.js:35", "[WS] already connected/connecting, reuse");
      return;
    }
    _pendingConnect = { token, chatRole };
    closeWebSocket();
    return;
  }
  if (state === "CLOSING") {
    _pendingConnect = { token, chatRole };
    return;
  }
  currentToken = token;
  currentChatRole = chatRole;
  reconnectCount = 0;
  _clearReconnectTimer();
  _doConnect();
}
function closeWebSocket() {
  reconnectCount = MAX_RECONNECT;
  _clearReconnectTimer();
  _stopHeartbeat();
  sendQueue.length = 0;
  if (socketTask) {
    state = "CLOSING";
    try {
      socketTask.close();
    } catch (_) {
    }
  } else {
    state = "DISCONNECTED";
  }
}
function sendMessage(data) {
  if (state === "CONNECTED" && socketTask) {
    socketTask.send({ data: JSON.stringify(data) });
    return true;
  }
  if (state === "CONNECTING") {
    sendQueue.push(data);
    return true;
  }
  common_vendor.index.__f__("warn", "at utils/websocket.js:84", `[WS] send failed, state=${state}`);
  return false;
}
function onWsMessage(cb) {
  callbacks.onMessage = cb;
}
function onWsConnect(cb) {
  callbacks.onConnect = cb;
}
function onWsClose(cb) {
  callbacks.onClose = cb;
}
function _doConnect() {
  state = "CONNECTING";
  let url = `${WS_BASE_URL}?token=${currentToken}`;
  if (currentChatRole)
    url += `&chatRole=${encodeURIComponent(currentChatRole)}`;
  common_vendor.index.__f__("log", "at utils/websocket.js:100", `[WS] connecting → ${url}`);
  socketTask = common_vendor.index.connectSocket({ url, success() {
  } });
  socketTask.onOpen(() => {
    common_vendor.index.__f__("log", "at utils/websocket.js:104", "[WS] connected");
    state = "CONNECTED";
    reconnectCount = 0;
    _startHeartbeat();
    callbacks.onConnect && callbacks.onConnect();
    _flushQueue();
  });
  socketTask.onMessage((res) => {
    try {
      const data = JSON.parse(res.data);
      if (data.type !== "pong") {
        callbacks.onMessage && callbacks.onMessage(data);
      }
    } catch (_) {
    }
  });
  socketTask.onError((err) => {
    common_vendor.index.__f__("error", "at utils/websocket.js:122", "[WS] error:", err);
  });
  socketTask.onClose(() => {
    common_vendor.index.__f__("log", "at utils/websocket.js:126", "[WS] closed");
    const wasIntentional = state === "CLOSING";
    _stopHeartbeat();
    socketTask = null;
    state = "DISCONNECTED";
    callbacks.onClose && callbacks.onClose();
    if (_pendingConnect) {
      const { token, chatRole } = _pendingConnect;
      _pendingConnect = null;
      currentToken = token;
      currentChatRole = chatRole;
      reconnectCount = 0;
      setTimeout(() => _doConnect(), 100);
      return;
    }
    if (!wasIntentional && reconnectCount < MAX_RECONNECT) {
      reconnectCount++;
      common_vendor.index.__f__("log", "at utils/websocket.js:147", `[WS] reconnecting (${reconnectCount}/${MAX_RECONNECT})...`);
      reconnectTimer = setTimeout(() => _doConnect(), 3e3 * reconnectCount);
    }
  });
}
function _flushQueue() {
  while (sendQueue.length > 0) {
    const d = sendQueue.shift();
    if (socketTask)
      socketTask.send({ data: JSON.stringify(d) });
  }
}
function _startHeartbeat() {
  _stopHeartbeat();
  heartbeatTimer = setInterval(() => {
    if (state === "CONNECTED" && socketTask) {
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
function _clearReconnectTimer() {
  if (reconnectTimer) {
    clearTimeout(reconnectTimer);
    reconnectTimer = null;
  }
}
exports.closeWebSocket = closeWebSocket;
exports.connectWebSocket = connectWebSocket;
exports.onWsClose = onWsClose;
exports.onWsConnect = onWsConnect;
exports.onWsMessage = onWsMessage;
exports.sendMessage = sendMessage;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/websocket.js.map
