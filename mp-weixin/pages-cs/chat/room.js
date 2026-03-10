"use strict";
const common_vendor = require("../../common/vendor.js");
const pagesCs_api_cs = require("../api/cs.js");
const utils_auth = require("../../utils/auth.js");
const api_file = require("../../api/file.js");
const utils_websocket = require("../../utils/websocket.js");
const utils_format = require("../../utils/format.js");
if (!Math) {
  ChatBubble();
}
const ChatBubble = () => "../../components/ChatBubble.js";
const _sfc_main = {
  __name: "room",
  setup(__props) {
    const csInfo = utils_auth.getCsInfo() || {};
    const csId = csInfo.adminId;
    const userAvatar = common_vendor.ref("");
    const otherName = common_vendor.ref("");
    const sessionId = common_vendor.ref(0);
    const messages = common_vendor.ref([]);
    const inputText = common_vendor.ref("");
    const scrollAnchor = common_vendor.ref("");
    const showBottomBtn = common_vendor.ref(false);
    const showToolbar = common_vendor.ref(false);
    const showProductPopup = common_vendor.ref(false);
    const productList = common_vendor.ref([]);
    const showQuickReplyPopup = common_vendor.ref(false);
    const quickReplies = common_vendor.ref([]);
    let _isNearBottom = true;
    function isSelf(m) {
      return m.senderType === "CS" || m.senderType === "ADMIN";
    }
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
      const cur = normalizeDate(messages.value[idx].createdAt || 0);
      const prev = normalizeDate(messages.value[idx - 1].createdAt || 0);
      return cur - prev > 3e5;
    }
    function formatMsgTime(t) {
      if (!t)
        return "";
      const str = typeof t === "string" && t.includes(" ") ? t.replace(" ", "T") : t;
      return utils_format.formatDateTime(str);
    }
    function initWs() {
      const token = utils_auth.getTokenByRole("cs");
      if (!token)
        return;
      utils_websocket.onWsConnect(() => {
      });
      utils_websocket.onWsMessage((data) => {
        if (data && String(data.sessionId) === String(sessionId.value)) {
          const exists = messages.value.some(
            (m) => String(m.id) === String(data.id) || m.type === data.type && m.content === data.content && Math.abs(new Date(m.createdAt || 0).getTime() - new Date(data.createdAt || 0).getTime()) < 5e3
          );
          if (!exists) {
            messages.value.push(data);
            scrollToBottom();
          }
        }
      });
      utils_websocket.connectWebSocket(token);
    }
    common_vendor.onLoad(async (opts) => {
      var _a;
      if (!opts.sessionId) {
        common_vendor.index.showToast({ title: "会话不存在", icon: "none" });
        return;
      }
      sessionId.value = opts.sessionId;
      if (opts.name) {
        otherName.value = decodeURIComponent(opts.name);
        common_vendor.index.setNavigationBarTitle({ title: otherName.value });
      }
      if (opts.avatar)
        userAvatar.value = decodeURIComponent(opts.avatar);
      try {
        const res = await pagesCs_api_cs.getCsChatMessages({ sessionId: sessionId.value, pageNum: 1, pageSize: 50 });
        messages.value = (((_a = res.data) == null ? void 0 : _a.records) || []).reverse();
        scrollToBottom();
      } catch (e) {
      }
      pagesCs_api_cs.csChatMarkRead(sessionId.value).catch(() => {
      });
      initWs();
    });
    common_vendor.onUnload(() => {
      utils_websocket.closeWebSocket();
    });
    function sendViaWs(type, content) {
      const data = {
        action: "send",
        sessionId: sessionId.value,
        senderType: "CS",
        senderId: csId,
        chatRole: "CS",
        type,
        content
      };
      const sent = utils_websocket.sendMessage(data);
      if (!sent) {
        common_vendor.index.showToast({ title: "WebSocket未连接", icon: "none" });
        return false;
      }
      messages.value.push({
        id: Date.now(),
        sessionId: sessionId.value,
        senderId: csId,
        senderType: "CS",
        type,
        content,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      });
      scrollToBottom();
      return true;
    }
    function send() {
      if (!inputText.value.trim())
        return;
      const content = inputText.value.trim();
      inputText.value = "";
      sendViaWs("TEXT", content);
    }
    async function sendImage() {
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
        const res = await pagesCs_api_cs.getCsProductList({ pageNum: 1, pageSize: 20, status: 1 });
        productList.value = ((_a = res.data) == null ? void 0 : _a.records) || res.data || [];
      } catch (e) {
        productList.value = [];
      }
    }
    function doSendProduct(p) {
      showProductPopup.value = false;
      const content = JSON.stringify({ id: p.id, name: p.name, price: p.price, coverImage: p.coverImage || p.image });
      sendViaWs("PRODUCT", content);
    }
    async function openQuickReply() {
      showToolbar.value = false;
      showQuickReplyPopup.value = true;
      if (quickReplies.value.length === 0) {
        try {
          const res = await pagesCs_api_cs.getActiveQuickReplies();
          quickReplies.value = res.data || [];
        } catch (e) {
          quickReplies.value = [];
        }
      }
    }
    function useQuickReply(qr) {
      showQuickReplyPopup.value = false;
      inputText.value = qr.content;
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(messages.value, (m, idx, i0) => {
          return common_vendor.e({
            a: showTimeSep(idx)
          }, showTimeSep(idx) ? {
            b: common_vendor.t(formatMsgTime(m.createdAt || m.timestamp))
          } : {}, {
            c: "9348d54c-0-" + i0,
            d: common_vendor.p({
              msg: m,
              isSelf: isSelf(m),
              avatar: isSelf(m) ? "" : userAvatar.value,
              selfAvatar: "",
              name: otherName.value,
              selfName: common_vendor.unref(csInfo).nickname || "客服"
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
      }, showToolbar.value ? {
        g: common_vendor.o(sendImage),
        h: common_vendor.o(openProductPicker),
        i: common_vendor.o(openQuickReply)
      } : {}, {
        j: showQuickReplyPopup.value
      }, showQuickReplyPopup.value ? common_vendor.e({
        k: common_vendor.o(($event) => showQuickReplyPopup.value = false),
        l: common_vendor.f(quickReplies.value, (qr, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(qr.content),
            b: qr.category
          }, qr.category ? {
            c: common_vendor.t(qr.category)
          } : {}, {
            d: qr.id,
            e: common_vendor.o(($event) => useQuickReply(qr), qr.id)
          });
        }),
        m: quickReplies.value.length === 0
      }, quickReplies.value.length === 0 ? {} : {}, {
        n: common_vendor.o(() => {
        }),
        o: common_vendor.o(($event) => showQuickReplyPopup.value = false)
      }) : {}, {
        p: common_vendor.o(($event) => showToolbar.value = !showToolbar.value),
        q: common_vendor.o(send),
        r: common_vendor.o(($event) => showToolbar.value = false),
        s: inputText.value,
        t: common_vendor.o(($event) => inputText.value = $event.detail.value),
        v: common_vendor.o(send),
        w: showProductPopup.value
      }, showProductPopup.value ? common_vendor.e({
        x: common_vendor.o(($event) => showProductPopup.value = false),
        y: common_vendor.f(productList.value, (p, k0, i0) => {
          return {
            a: p.coverImage || p.image,
            b: common_vendor.t(p.name),
            c: common_vendor.t(Number(p.price || 0).toFixed(2)),
            d: p.id,
            e: common_vendor.o(($event) => doSendProduct(p), p.id)
          };
        }),
        z: productList.value.length === 0
      }, productList.value.length === 0 ? {} : {}, {
        A: common_vendor.o(() => {
        }),
        B: common_vendor.o(($event) => showProductPopup.value = false)
      }) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9348d54c"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages-cs/chat/room.js.map
