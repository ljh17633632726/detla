"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_chat = require("../../api/chat.js");
const api_product = require("../../api/product.js");
const api_order = require("../../api/order.js");
const store_chat = require("../../store/chat.js");
const store_user = require("../../store/user.js");
const store_player = require("../../store/player.js");
const store_app = require("../../store/app.js");
const api_file = require("../../api/file.js");
const utils_websocket = require("../../utils/websocket.js");
const utils_format = require("../../utils/format.js");
const utils_constants = require("../../utils/constants.js");
const utils_chatSmsReminder = require("../../utils/chatSmsReminder.js");
if (!Math) {
  ChatBubble();
}
const ChatBubble = () => "../../components/ChatBubble.js";
const _sfc_main = {
  __name: "room",
  setup(__props) {
    const chatStore = store_chat.useChatStore();
    const userStore = store_user.useUserStore();
    const playerStore = store_player.usePlayerStore();
    const appStore = store_app.useAppStore();
    const sessionId = common_vendor.ref(0);
    const messages = common_vendor.ref([]);
    const inputText = common_vendor.ref("");
    const scrollAnchor = common_vendor.ref("");
    const showBottomBtn = common_vendor.ref(false);
    const sessionReady = common_vendor.ref(false);
    let _isNearBottom = true;
    const mySenderType = common_vendor.computed(() => appStore.role === "player" ? "PLAYER" : "USER");
    const USER_CHAT_OPTS = { chatRole: "USER" };
    const mySenderId = common_vendor.computed(
      () => {
        var _a, _b;
        return appStore.role === "player" ? (_a = playerStore.playerInfo) == null ? void 0 : _a.id : (_b = userStore.userInfo) == null ? void 0 : _b.id;
      }
    );
    const selfAvatar = common_vendor.computed(
      () => {
        var _a, _b;
        return appStore.role === "player" ? ((_a = playerStore.playerInfo) == null ? void 0 : _a.avatar) || "" : userStore.avatar || ((_b = userStore.userInfo) == null ? void 0 : _b.avatar) || "";
      }
    );
    const selfName = common_vendor.computed(
      () => {
        var _a, _b;
        return appStore.role === "player" ? ((_a = playerStore.playerInfo) == null ? void 0 : _a.nickname) || "接单员" : ((_b = userStore.userInfo) == null ? void 0 : _b.nickname) || "我";
      }
    );
    const otherAvatar = common_vendor.ref("");
    const otherName = common_vendor.ref("");
    const targetType = common_vendor.ref("");
    const canSendSmsReminder = common_vendor.computed(
      () => appStore.role === "player" ? targetType.value === "USER" : targetType.value === "PLAYER"
    );
    function isSelf(m) {
      if (!m)
        return false;
      const typeMatch = m.senderType === mySenderType.value || mySenderType.value === "CS" && (m.senderType === "CS" || m.senderType === "ADMIN");
      return typeMatch && String(m.senderId) === String(mySenderId.value);
    }
    const showProductPopup = common_vendor.ref(false);
    const showOrderPopup = common_vendor.ref(false);
    const productList = common_vendor.ref([]);
    const orderList = common_vendor.ref([]);
    function scrollToBottom() {
      setTimeout(() => {
        scrollAnchor.value = scrollAnchor.value === "msg-end-a" ? "msg-end-b" : "msg-end-a";
        showBottomBtn.value = false;
        _isNearBottom = true;
      }, 150);
    }
    function onScroll(e) {
      const { scrollTop, scrollHeight } = e.detail;
      _isNearBottom = scrollHeight - scrollTop < (e.detail.clientHeight || 600) + 300;
      showBottomBtn.value = !_isNearBottom;
    }
    function normalizeDate(str) {
      if (!str)
        return 0;
      if (typeof str === "string" && str.includes(" ")) {
        return new Date(str.replace(" ", "T")).getTime();
      }
      return new Date(str).getTime();
    }
    function showTimeSep(idx) {
      if (idx === 0)
        return true;
      const cur = normalizeDate(messages.value[idx].createdAt || messages.value[idx].timestamp || 0);
      const prev = normalizeDate(messages.value[idx - 1].createdAt || messages.value[idx - 1].timestamp || 0);
      return cur - prev > 3e5;
    }
    function formatMsgTime(t) {
      if (!t)
        return "";
      const str = typeof t === "string" && t.includes(" ") ? t.replace(" ", "T") : t;
      return utils_format.formatDateTime(str);
    }
    common_vendor.onLoad(async (opts) => {
      var _a;
      let sid = opts.sessionId;
      let sessionData = null;
      if (!sid && opts.orderId) {
        try {
          const sRes = await api_chat.getSessionByOrderId(opts.orderId, USER_CHAT_OPTS);
          sessionData = sRes.data;
          sid = sessionData == null ? void 0 : sessionData.id;
        } catch (e) {
          common_vendor.index.showToast({ title: ((_a = e == null ? void 0 : e.data) == null ? void 0 : _a.msg) || "无法发起聊天", icon: "none" });
          return;
        }
      }
      if (!sid) {
        common_vendor.index.showToast({ title: "聊天会话不存在", icon: "none" });
        return;
      }
      if (!sessionData && sid) {
        try {
          const dRes = await api_chat.getSessionDetail(sid, USER_CHAT_OPTS);
          sessionData = dRes.data;
        } catch (_) {
        }
      }
      if (sessionData) {
        otherAvatar.value = sessionData.avatar || "";
        otherName.value = sessionData.targetName || "";
        targetType.value = resolveEncodedType(sessionData.targetId);
        if (sessionData.targetName)
          common_vendor.index.setNavigationBarTitle({ title: sessionData.targetName });
      } else if (opts.name) {
        otherName.value = decodeURIComponent(opts.name);
        common_vendor.index.setNavigationBarTitle({ title: otherName.value });
      }
      sessionId.value = sid;
      sessionReady.value = true;
      if (appStore.role === "player" && !playerStore.playerInfo)
        await playerStore.fetchProfile();
      chatStore.setCurrentSession(sid);
      await loadMessages();
      api_chat.markMessageRead(sid, USER_CHAT_OPTS).catch(() => {
      });
      chatStore.connect(USER_CHAT_OPTS);
    });
    common_vendor.onUnload(() => {
      chatStore.clearCurrentSession();
    });
    common_vendor.watch(() => chatStore.newMessage, (msg) => {
      if (!msg || String(msg.sessionId) !== String(sessionId.value))
        return;
      const exists = messages.value.some(
        (m) => String(m.id) === String(msg.id) || m.type === msg.type && m.content === msg.content && Math.abs(new Date(m.createdAt || 0).getTime() - new Date(msg.createdAt || 0).getTime()) < 5e3
      );
      if (!exists) {
        messages.value.push(msg);
        scrollToBottom();
      }
    });
    async function loadMessages() {
      var _a;
      const res = await api_chat.getChatMessageList({ sessionId: sessionId.value, pageNum: 1, pageSize: 50, ...USER_CHAT_OPTS });
      messages.value = (((_a = res.data) == null ? void 0 : _a.records) || []).reverse();
      scrollToBottom();
    }
    function sendViaWs(type, content) {
      const data = {
        action: "send",
        sessionId: sessionId.value,
        type,
        content,
        chatRole: mySenderType.value
      };
      const sent = utils_websocket.sendMessage(data);
      if (!sent) {
        common_vendor.index.showToast({ title: "WebSocket未连接", icon: "none" });
        return false;
      }
      messages.value.push({
        id: Date.now(),
        sessionId: sessionId.value,
        senderId: mySenderId.value,
        senderType: mySenderType.value,
        type,
        content,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      });
      scrollToBottom();
      return true;
    }
    function send() {
      if (!inputText.value.trim() || !sessionReady.value)
        return;
      const content = inputText.value;
      inputText.value = "";
      sendViaWs("TEXT", content);
    }
    async function sendSmsReminder() {
      var _a;
      if (!sessionReady.value)
        return;
      try {
        const selected = await utils_chatSmsReminder.chooseChatSmsReminder(utils_chatSmsReminder.USER_CHAT_SMS_REMINDERS);
        await api_chat.sendChatSmsReminder(
          { sessionId: sessionId.value, reminderCode: selected.code },
          USER_CHAT_OPTS
        );
        common_vendor.index.showToast({ title: `已发送${selected.label}`, icon: "none" });
      } catch (e) {
        if ((_a = e == null ? void 0 : e.errMsg) == null ? void 0 : _a.includes("cancel"))
          return;
      }
    }
    async function sendImage() {
      if (!sessionReady.value)
        return;
      try {
        const urls = await api_file.chooseAndUpload(1);
        if (urls.length) {
          sendViaWs("IMAGE", urls[0]);
        }
      } catch (e) {
      }
    }
    async function openProductPicker() {
      var _a;
      showProductPopup.value = true;
      try {
        const res = await api_product.getProductList({ pageNum: 1, pageSize: 20, status: 1 });
        productList.value = ((_a = res.data) == null ? void 0 : _a.records) || res.data || [];
      } catch (e) {
        productList.value = [];
      }
    }
    async function openOrderPicker() {
      var _a;
      showOrderPopup.value = true;
      try {
        const res = await api_order.getOrderList({ pageNum: 1, pageSize: 20 });
        orderList.value = ((_a = res.data) == null ? void 0 : _a.records) || res.data || [];
      } catch (e) {
        orderList.value = [];
      }
    }
    function doSendProduct(p) {
      showProductPopup.value = false;
      const content = JSON.stringify({ id: p.id, name: p.name, price: p.price, coverImage: p.coverImage || p.image });
      sendViaWs("PRODUCT", content);
    }
    function doSendOrder(o) {
      showOrderPopup.value = false;
      const content = JSON.stringify({ id: o.id, orderNo: o.orderNo, productName: o.productName, amount: o.amount, status: o.status });
      sendViaWs("ORDER", content);
    }
    function resolveEncodedType(encodedId) {
      const numeric = Number(encodedId || 0);
      const type = Math.floor(numeric / 1e9);
      if (type === 2)
        return "PLAYER";
      if (type === 3)
        return "CS";
      return "USER";
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(messages.value, (m, idx, i0) => {
          return common_vendor.e({
            a: showTimeSep(idx)
          }, showTimeSep(idx) ? {
            b: common_vendor.t(formatMsgTime(m.createdAt || m.timestamp))
          } : {}, {
            c: "bc4afd2d-0-" + i0,
            d: common_vendor.p({
              msg: m,
              isSelf: isSelf(m),
              avatar: otherAvatar.value,
              selfAvatar: selfAvatar.value,
              name: otherName.value,
              selfName: selfName.value
            }),
            e: m.id
          });
        }),
        b: scrollAnchor.value,
        c: common_vendor.o(onScroll),
        d: showBottomBtn.value
      }, showBottomBtn.value ? {
        e: common_vendor.o(scrollToBottom)
      } : {}, {
        f: common_assets._imports_0$2,
        g: common_vendor.o(sendImage),
        h: common_assets._imports_1$1,
        i: common_vendor.o(openProductPicker),
        j: common_assets._imports_0$1,
        k: common_vendor.o(openOrderPicker),
        l: canSendSmsReminder.value
      }, canSendSmsReminder.value ? {
        m: common_assets._imports_3$2,
        n: common_vendor.o(sendSmsReminder)
      } : {}, {
        o: common_vendor.o(send),
        p: inputText.value,
        q: common_vendor.o(($event) => inputText.value = $event.detail.value),
        r: common_vendor.o(send),
        s: showProductPopup.value
      }, showProductPopup.value ? common_vendor.e({
        t: common_vendor.o(($event) => showProductPopup.value = false),
        v: common_vendor.f(productList.value, (p, k0, i0) => {
          return {
            a: p.coverImage || p.image,
            b: common_vendor.t(p.name),
            c: common_vendor.t(Number(p.price || 0).toFixed(2)),
            d: p.id,
            e: common_vendor.o(($event) => doSendProduct(p), p.id)
          };
        }),
        w: productList.value.length === 0
      }, productList.value.length === 0 ? {} : {}, {
        x: common_vendor.o(() => {
        }),
        y: common_vendor.o(($event) => showProductPopup.value = false)
      }) : {}, {
        z: showOrderPopup.value
      }, showOrderPopup.value ? common_vendor.e({
        A: common_vendor.o(($event) => showOrderPopup.value = false),
        B: common_vendor.f(orderList.value, (o, k0, i0) => {
          return {
            a: common_vendor.t(o.productName),
            b: common_vendor.t(Number(o.amount || 0).toFixed(2)),
            c: common_vendor.t(common_vendor.unref(utils_constants.ORDER_STATUS_TEXT)[o.status] || o.status),
            d: common_vendor.t(o.orderNo),
            e: o.id,
            f: common_vendor.o(($event) => doSendOrder(o), o.id)
          };
        }),
        C: orderList.value.length === 0
      }, orderList.value.length === 0 ? {} : {}, {
        D: common_vendor.o(() => {
        }),
        E: common_vendor.o(($event) => showOrderPopup.value = false)
      }) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bc4afd2d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/chat/room.js.map
