"use strict";
const common_vendor = require("../../common/vendor.js");
const api_chat = require("../../api/chat.js");
const api_product = require("../../api/product.js");
const api_player = require("../../api/player.js");
const store_chat = require("../../store/chat.js");
const store_player = require("../../store/player.js");
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
    const playerStore = store_player.usePlayerStore();
    const sessionId = common_vendor.ref(0);
    const messages = common_vendor.ref([]);
    const inputText = common_vendor.ref("");
    const scrollAnchor = common_vendor.ref("");
    const showBottomBtn = common_vendor.ref(false);
    const sessionReady = common_vendor.ref(false);
    const showToolbar = common_vendor.ref(false);
    const showProductPopup = common_vendor.ref(false);
    const showOrderPopup = common_vendor.ref(false);
    const productList = common_vendor.ref([]);
    const orderList = common_vendor.ref([]);
    const selfAvatar = common_vendor.computed(() => {
      var _a;
      return ((_a = playerStore.playerInfo) == null ? void 0 : _a.avatar) || "";
    });
    const selfName = common_vendor.computed(() => {
      var _a;
      return ((_a = playerStore.playerInfo) == null ? void 0 : _a.nickname) || "接单员";
    });
    const mySenderId = common_vendor.computed(() => {
      var _a;
      return (_a = playerStore.playerInfo) == null ? void 0 : _a.id;
    });
    const otherAvatar = common_vendor.ref("");
    const otherName = common_vendor.ref("");
    const targetType = common_vendor.ref("");
    const canSendSmsReminder = common_vendor.computed(() => targetType.value === "USER");
    function isSelf(m) {
      if (!m)
        return false;
      return (m.senderType === "PLAYER" || m.senderType === "ADMIN") && String(m.senderId) === String(mySenderId.value);
    }
    function scrollToBottom() {
      setTimeout(() => {
        scrollAnchor.value = scrollAnchor.value === "msg-end-a" ? "msg-end-b" : "msg-end-a";
        showBottomBtn.value = false;
      }, 150);
    }
    function onScroll(e) {
      const { scrollTop, scrollHeight } = e.detail;
      showBottomBtn.value = scrollHeight - scrollTop >= (e.detail.clientHeight || 600) + 300;
    }
    function normalizeDate(str) {
      if (!str)
        return 0;
      if (typeof str === "string" && str.includes(" "))
        return new Date(str.replace(" ", "T")).getTime();
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
    const PLAYER_CHAT_OPTS = { chatRole: "PLAYER" };
    common_vendor.onLoad(async (opts) => {
      var _a;
      let sid = opts.sessionId;
      let sessionData = null;
      if (!sid && opts.orderId) {
        try {
          const sRes = await api_chat.getSessionByOrderId(opts.orderId, PLAYER_CHAT_OPTS);
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
          const dRes = await api_chat.getSessionDetail(sid, PLAYER_CHAT_OPTS);
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
      if (!playerStore.playerInfo)
        await playerStore.fetchProfile();
      chatStore.setCurrentSession(sid);
      await loadMessages();
      api_chat.markMessageRead(sid, PLAYER_CHAT_OPTS).catch(() => {
      });
      chatStore.connect(PLAYER_CHAT_OPTS);
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
      const res = await api_chat.getChatMessageList({
        sessionId: sessionId.value,
        pageNum: 1,
        pageSize: 50,
        chatRole: "PLAYER"
      });
      messages.value = (((_a = res.data) == null ? void 0 : _a.records) || []).reverse();
      scrollToBottom();
    }
    function sendViaWs(type, content) {
      const data = {
        action: "send",
        sessionId: sessionId.value,
        type,
        content,
        chatRole: "PLAYER"
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
        senderType: "PLAYER",
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
      showToolbar.value = false;
      try {
        const selected = await utils_chatSmsReminder.chooseChatSmsReminder(utils_chatSmsReminder.PLAYER_CHAT_SMS_REMINDERS);
        await api_chat.sendChatSmsReminder(
          { sessionId: sessionId.value, reminderCode: selected.code },
          PLAYER_CHAT_OPTS
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
      showToolbar.value = false;
      try {
        const urls = await api_file.chooseAndUpload(1);
        if (urls.length)
          sendViaWs("IMAGE", urls[0]);
      } catch (e) {
      }
    }
    async function openProductPicker() {
      var _a;
      showToolbar.value = false;
      showProductPopup.value = true;
      try {
        const res = await api_product.getProductList({ pageNum: 1, pageSize: 20, status: 1 });
        productList.value = ((_a = res.data) == null ? void 0 : _a.records) || res.data || [];
      } catch (e) {
        productList.value = [];
      }
    }
    async function openOrderPicker() {
      var _a, _b;
      showToolbar.value = false;
      showOrderPopup.value = true;
      try {
        const res = await api_player.getMyWork({ pageNum: 1, pageSize: 20 });
        const list = ((_a = res.data) == null ? void 0 : _a.records) || ((_b = res.data) == null ? void 0 : _b.list) || [];
        orderList.value = Array.isArray(list) ? list : [];
      } catch (e) {
        orderList.value = [];
      }
    }
    function doSendProduct(p) {
      showProductPopup.value = false;
      sendViaWs("PRODUCT", JSON.stringify({ id: p.id, name: p.name, price: p.price, coverImage: p.coverImage || p.image }));
    }
    function doSendOrder(o) {
      showOrderPopup.value = false;
      sendViaWs("ORDER", JSON.stringify({ id: o.id, orderNo: o.orderNo, productName: o.productName, amount: o.amount, status: o.status }));
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
            c: "f972a68c-0-" + i0,
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
        f: showToolbar.value
      }, showToolbar.value ? common_vendor.e({
        g: common_vendor.o(sendImage),
        h: common_vendor.o(openProductPicker),
        i: common_vendor.o(openOrderPicker),
        j: canSendSmsReminder.value
      }, canSendSmsReminder.value ? {
        k: common_vendor.o(sendSmsReminder)
      } : {}) : {}, {
        l: common_vendor.o(($event) => showToolbar.value = !showToolbar.value),
        m: common_vendor.o(send),
        n: common_vendor.o(($event) => showToolbar.value = false),
        o: inputText.value,
        p: common_vendor.o(($event) => inputText.value = $event.detail.value),
        q: common_vendor.o(send),
        r: showProductPopup.value
      }, showProductPopup.value ? common_vendor.e({
        s: common_vendor.o(($event) => showProductPopup.value = false),
        t: common_vendor.f(productList.value, (p, k0, i0) => {
          return {
            a: p.coverImage || p.image,
            b: common_vendor.t(p.name),
            c: common_vendor.t(Number(p.price || 0).toFixed(2)),
            d: p.id,
            e: common_vendor.o(($event) => doSendProduct(p), p.id)
          };
        }),
        v: productList.value.length === 0
      }, productList.value.length === 0 ? {} : {}, {
        w: common_vendor.o(() => {
        }),
        x: common_vendor.o(($event) => showProductPopup.value = false)
      }) : {}, {
        y: showOrderPopup.value
      }, showOrderPopup.value ? common_vendor.e({
        z: common_vendor.o(($event) => showOrderPopup.value = false),
        A: common_vendor.f(orderList.value, (o, k0, i0) => {
          return {
            a: common_vendor.t(o.productName),
            b: common_vendor.t(Number(o.amount || 0).toFixed(2)),
            c: common_vendor.t(common_vendor.unref(utils_constants.ORDER_STATUS_TEXT)[o.status] || o.status),
            d: common_vendor.t(o.orderNo),
            e: o.id,
            f: common_vendor.o(($event) => doSendOrder(o), o.id)
          };
        }),
        B: orderList.value.length === 0
      }, orderList.value.length === 0 ? {} : {}, {
        C: common_vendor.o(() => {
        }),
        D: common_vendor.o(($event) => showOrderPopup.value = false)
      }) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f972a68c"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages-player/chat/room.js.map
