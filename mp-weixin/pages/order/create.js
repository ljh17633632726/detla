"use strict";
const common_vendor = require("../../common/vendor.js");
const api_order = require("../../api/order.js");
const api_user = require("../../api/user.js");
const store_user = require("../../store/user.js");
if (!Math) {
  PriceText();
}
const PriceText = () => "../../components/PriceText.js";
const _sfc_main = {
  __name: "create",
  setup(__props) {
    const userStore = store_user.useUserStore();
    const productId = common_vendor.ref(0);
    const specInfo = common_vendor.ref("");
    const amount = common_vendor.ref(0);
    const productName = common_vendor.ref("");
    const form = common_vendor.reactive({
      gameAccount: "",
      contact: "",
      remark: ""
    });
    const savedGameList = common_vendor.ref([]);
    const selectedGameId = common_vendor.ref(null);
    async function loadSavedGameList() {
      try {
        const res = await api_user.getGameInfoList();
        savedGameList.value = res.data || [];
      } catch (e) {
        savedGameList.value = [];
      }
    }
    function selectSavedGame(g) {
      selectedGameId.value = g.id;
      form.gameAccount = g.gameAccount || "";
      form.contact = g.contact || "";
      form.remark = g.remark || "";
    }
    function clearSelectedGame() {
      selectedGameId.value = null;
      form.gameAccount = "";
      form.contact = "";
      form.remark = "";
    }
    const wantDesignate = common_vendor.ref(false);
    const showPlayerPicker = common_vendor.ref(false);
    const selectedPlayer = common_vendor.ref(null);
    const playerKeyword = common_vendor.ref("");
    const playerList = common_vendor.ref([]);
    const maxConcurrent = common_vendor.ref(5);
    common_vendor.watch(wantDesignate, (val) => {
      if (val)
        searchPlayers();
    });
    function isFull(p) {
      return (p.activeOrders || 0) >= maxConcurrent.value;
    }
    async function searchPlayers() {
      try {
        const res = await api_order.getAvailablePlayers({ pageNum: 1, pageSize: 50, keyword: playerKeyword.value });
        const data = res.data || {};
        const page = data.players || {};
        playerList.value = page.records || [];
        if (data.maxConcurrent != null)
          maxConcurrent.value = data.maxConcurrent;
      } catch (e) {
        playerList.value = [];
      }
    }
    function pickPlayer(p) {
      if (isFull(p)) {
        common_vendor.index.showModal({
          title: "无法选择",
          content: `该接单员当前已有 ${p.activeOrders || 0} 个进行中订单，已达最大接单数 ${maxConcurrent.value}`,
          showCancel: false
        });
        return;
      }
      selectedPlayer.value = p;
    }
    function confirmPickPlayer() {
      showPlayerPicker.value = false;
    }
    common_vendor.onLoad((opts) => {
      productId.value = opts.productId;
      specInfo.value = decodeURIComponent(opts.specCombination || opts.specInfo || "");
      amount.value = opts.amount || 0;
      productName.value = decodeURIComponent(opts.productName || "服务");
      loadSavedGameList();
    });
    async function submitOrder() {
      var _a;
      if (!userStore.checkLogin())
        return;
      if (!form.gameAccount)
        return common_vendor.index.showToast({ title: "请输入关联账号", icon: "none" });
      if (!form.contact)
        return common_vendor.index.showToast({ title: "请输入联系ID", icon: "none" });
      try {
        const res = await api_order.createOrder({
          productId: productId.value,
          specInfo: specInfo.value,
          amount: amount.value,
          gameAccount: form.gameAccount,
          contact: form.contact,
          remark: form.remark,
          designatedPlayerId: (_a = selectedPlayer.value) == null ? void 0 : _a.id
        });
        if (form.gameAccount && form.contact) {
          api_user.saveGameInfo({ gameAccount: form.gameAccount, contact: form.contact, remark: form.remark }).catch(() => {
          });
        }
        common_vendor.index.redirectTo({ url: `/pages/order/pay?orderId=${res.data.id}&amount=${res.data.amount}` });
      } catch (e) {
        common_vendor.index.__f__("error", "at pages/order/create.vue:219", "create order failed", e);
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(productName.value),
        b: specInfo.value
      }, specInfo.value ? {
        c: common_vendor.t(specInfo.value)
      } : {}, {
        d: common_vendor.p({
          value: amount.value,
          size: 36
        }),
        e: savedGameList.value.length > 0
      }, savedGameList.value.length > 0 ? {
        f: common_vendor.f(savedGameList.value, (g, k0, i0) => {
          return {
            a: common_vendor.t(g.gameAccount),
            b: common_vendor.t(g.contact),
            c: g.id,
            d: selectedGameId.value === g.id ? 1 : "",
            e: common_vendor.o(($event) => selectSavedGame(g), g.id)
          };
        }),
        g: common_vendor.o(clearSelectedGame)
      } : {}, {
        h: form.gameAccount,
        i: common_vendor.o(($event) => form.gameAccount = $event.detail.value),
        j: form.contact,
        k: common_vendor.o(($event) => form.contact = $event.detail.value),
        l: form.remark,
        m: common_vendor.o(($event) => form.remark = $event.detail.value),
        n: wantDesignate.value,
        o: common_vendor.o(($event) => wantDesignate.value = $event.detail.value),
        p: wantDesignate.value
      }, wantDesignate.value ? common_vendor.e({
        q: selectedPlayer.value
      }, selectedPlayer.value ? {
        r: common_vendor.t(selectedPlayer.value.nickname)
      } : {}, {
        s: common_vendor.o(($event) => showPlayerPicker.value = true)
      }) : {}, {
        t: common_vendor.p({
          value: amount.value,
          size: 36
        }),
        v: common_vendor.o(submitOrder),
        w: showPlayerPicker.value
      }, showPlayerPicker.value ? common_vendor.e({
        x: common_vendor.o(($event) => showPlayerPicker.value = false),
        y: common_vendor.t(maxConcurrent.value),
        z: common_vendor.o(searchPlayers),
        A: playerKeyword.value,
        B: common_vendor.o(($event) => playerKeyword.value = $event.detail.value),
        C: common_vendor.o(searchPlayers),
        D: common_vendor.f(playerList.value, (p, k0, i0) => {
          return common_vendor.e({
            a: p.avatar || "/static/images/default-avatar.png",
            b: common_vendor.t(p.nickname || "-"),
            c: isFull(p)
          }, isFull(p) ? {} : {}, {
            d: p.avgRating
          }, p.avgRating ? {
            e: common_vendor.t(Number(p.avgRating).toFixed(1))
          } : {}, {
            f: common_vendor.t(p.completedOrders || 0),
            g: common_vendor.t(p.activeOrders || 0),
            h: common_vendor.n((p.activeOrders || 0) > 0 ? "active-tag" : ""),
            i: selectedPlayer.value && selectedPlayer.value.id === p.id
          }, selectedPlayer.value && selectedPlayer.value.id === p.id ? {} : {}, {
            j: p.id,
            k: selectedPlayer.value && selectedPlayer.value.id === p.id ? 1 : "",
            l: isFull(p) ? 1 : "",
            m: common_vendor.o(($event) => pickPlayer(p), p.id)
          });
        }),
        E: common_vendor.t(maxConcurrent.value),
        F: playerList.value.length === 0
      }, playerList.value.length === 0 ? {} : {}, {
        G: common_vendor.o(($event) => showPlayerPicker.value = false),
        H: common_vendor.o(confirmPickPlayer),
        I: showPlayerPicker.value ? 1 : "",
        J: common_vendor.o(() => {
        }),
        K: common_vendor.o(($event) => showPlayerPicker.value = false)
      }) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8837ac90"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/order/create.js.map
