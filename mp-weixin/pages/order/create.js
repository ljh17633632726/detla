"use strict";
const common_vendor = require("../../common/vendor.js");
const api_order = require("../../api/order.js");
const api_product = require("../../api/product.js");
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
    const formFields = common_vendor.ref([]);
    const extraFields = common_vendor.reactive({});
    const currentCategoryId = common_vendor.ref(null);
    const savedList = common_vendor.ref([]);
    const activeSavedId = common_vendor.ref(null);
    function getFieldOptions(field) {
      if (!field.options)
        return [];
      return field.options.split(",").map((s) => s.trim()).filter(Boolean);
    }
    async function loadFormFields(pid) {
      var _a;
      try {
        const prodRes = await api_product.getProductDetail(pid);
        const categoryId = (_a = prodRes.data) == null ? void 0 : _a.categoryId;
        if (!categoryId)
          return;
        currentCategoryId.value = categoryId;
        const res = await api_product.getCategoryFormFields(categoryId);
        formFields.value = res.data || [];
        loadSavedList(categoryId);
      } catch (e) {
        formFields.value = [];
      }
    }
    async function loadSavedList(categoryId) {
      try {
        const res = await api_user.getSavedInfoByCategory(categoryId);
        savedList.value = res.data || [];
      } catch (e) {
        savedList.value = [];
      }
    }
    function applySaved(item) {
      activeSavedId.value = item.id;
      let fields = {};
      if (item.savedFields) {
        try {
          fields = typeof item.savedFields === "string" ? JSON.parse(item.savedFields) : item.savedFields;
        } catch (e) {
        }
      }
      Object.keys(extraFields).forEach((k) => {
        extraFields[k] = "";
      });
      Object.entries(fields).forEach(([k, v]) => {
        extraFields[k] = v;
      });
    }
    function applyManual() {
      activeSavedId.value = "manual";
      Object.keys(extraFields).forEach((k) => {
        extraFields[k] = "";
      });
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
      loadFormFields(opts.productId);
    });
    async function submitOrder() {
      var _a, _b;
      if (!userStore.checkLogin())
        return;
      for (const field of formFields.value) {
        if (field.required && !((_a = extraFields[field.fieldLabel]) == null ? void 0 : _a.trim())) {
          return common_vendor.index.showToast({ title: `请填写${field.fieldLabel}`, icon: "none" });
        }
      }
      try {
        const fieldsToSubmit = { ...extraFields };
        const res = await api_order.createOrder({
          productId: productId.value,
          specInfo: specInfo.value,
          amount: amount.value,
          extraFields: fieldsToSubmit,
          designatedPlayerId: (_b = selectedPlayer.value) == null ? void 0 : _b.id
        });
        if (currentCategoryId.value && formFields.value.length) {
          const vals = Object.values(fieldsToSubmit).filter((v) => v && v.trim());
          if (vals.length) {
            const label = vals.slice(0, 2).join(" / ").substring(0, 30);
            try {
              await api_user.saveDynamicInfo({
                categoryId: currentCategoryId.value,
                savedFields: fieldsToSubmit,
                label
              });
            } catch (e) {
              common_vendor.index.__f__("error", "at pages/order/create.vue:255", "保存下单信息失败", e);
            }
          }
        }
        common_vendor.index.redirectTo({ url: `/pages/order/pay?orderId=${res.data.id}&amount=${res.data.amount}` });
      } catch (e) {
        common_vendor.index.__f__("error", "at pages/order/create.vue:261", "create order failed", e);
        const msg = (e == null ? void 0 : e.msg) || (e == null ? void 0 : e.message) || "下单失败，请稍后重试";
        common_vendor.index.showToast({ title: msg, icon: "none" });
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
        e: savedList.value.length || formFields.value.length
      }, savedList.value.length || formFields.value.length ? {
        f: common_vendor.f(savedList.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.label || "未命名"),
            b: item.id,
            c: activeSavedId.value === item.id ? 1 : "",
            d: common_vendor.o(($event) => applySaved(item), item.id)
          };
        }),
        g: activeSavedId.value === "manual" ? 1 : "",
        h: common_vendor.o(applyManual)
      } : {}, {
        i: formFields.value.length
      }, formFields.value.length ? {
        j: common_vendor.f(formFields.value, (field, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(field.fieldLabel),
            b: field.required
          }, field.required ? {} : {}, {
            c: field.fieldType === "TEXT"
          }, field.fieldType === "TEXT" ? {
            d: field.placeholder || "请输入" + field.fieldLabel,
            e: extraFields[field.fieldLabel],
            f: common_vendor.o(($event) => extraFields[field.fieldLabel] = $event.detail.value, field.id)
          } : field.fieldType === "TEXTAREA" ? {
            h: field.placeholder || "请输入" + field.fieldLabel,
            i: extraFields[field.fieldLabel],
            j: common_vendor.o(($event) => extraFields[field.fieldLabel] = $event.detail.value, field.id)
          } : field.fieldType === "SELECT" ? {
            l: common_vendor.t(extraFields[field.fieldLabel] || field.placeholder || "请选择" + field.fieldLabel),
            m: !extraFields[field.fieldLabel] ? 1 : "",
            n: getFieldOptions(field),
            o: common_vendor.o(($event) => extraFields[field.fieldLabel] = getFieldOptions(field)[$event.detail.value], field.id)
          } : {}, {
            g: field.fieldType === "TEXTAREA",
            k: field.fieldType === "SELECT",
            p: field.id
          });
        })
      } : {}, {
        k: wantDesignate.value,
        l: common_vendor.o(($event) => wantDesignate.value = $event.detail.value),
        m: wantDesignate.value
      }, wantDesignate.value ? common_vendor.e({
        n: selectedPlayer.value
      }, selectedPlayer.value ? {
        o: common_vendor.t(selectedPlayer.value.nickname)
      } : {}, {
        p: common_vendor.o(($event) => showPlayerPicker.value = true)
      }) : {}, {
        q: common_vendor.p({
          value: amount.value,
          size: 36
        }),
        r: common_vendor.o(submitOrder),
        s: showPlayerPicker.value
      }, showPlayerPicker.value ? common_vendor.e({
        t: common_vendor.o(($event) => showPlayerPicker.value = false),
        v: common_vendor.t(maxConcurrent.value),
        w: common_vendor.o(searchPlayers),
        x: playerKeyword.value,
        y: common_vendor.o(($event) => playerKeyword.value = $event.detail.value),
        z: common_vendor.o(searchPlayers),
        A: common_vendor.f(playerList.value, (p, k0, i0) => {
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
        B: common_vendor.t(maxConcurrent.value),
        C: playerList.value.length === 0
      }, playerList.value.length === 0 ? {} : {}, {
        D: common_vendor.o(($event) => showPlayerPicker.value = false),
        E: common_vendor.o(confirmPickPlayer),
        F: showPlayerPicker.value ? 1 : "",
        G: common_vendor.o(() => {
        }),
        H: common_vendor.o(($event) => showPlayerPicker.value = false)
      }) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8837ac90"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/order/create.js.map
