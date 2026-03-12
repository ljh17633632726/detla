"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_product = require("../../api/product.js");
const api_banner = require("../../api/banner.js");
const api_notice = require("../../api/notice.js");
const api_category = require("../../api/category.js");
const api_chat = require("../../api/chat.js");
const api_message = require("../../api/message.js");
const store_user = require("../../store/user.js");
const store_chat = require("../../store/chat.js");
const store_site = require("../../store/site.js");
const composables_useGoldDust = require("../../composables/useGoldDust.js");
if (!Math) {
  (ProductCard + CustomTabBar)();
}
const ProductCard = () => "../../components/ProductCard.js";
const CustomTabBar = () => "../../components/CustomTabBar.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    composables_useGoldDust.useGoldDust();
    const userStore = store_user.useUserStore();
    const siteStore = store_site.useSiteStore();
    common_vendor.onShareAppMessage(() => ({
      title: siteStore.siteName + " - " + siteStore.subtitle,
      path: "/pages/index/index"
    }));
    common_vendor.onShareTimeline(() => ({
      title: siteStore.siteName + " - " + siteStore.subtitle
    }));
    const banners = common_vendor.ref([]);
    const categories = common_vendor.ref([]);
    const notices = common_vendor.ref([]);
    const recommendProducts = common_vendor.ref([]);
    const recommendTabs = common_vendor.ref([{ id: "", name: "全部热门" }]);
    const currentRecommendCategoryId = common_vendor.ref("");
    const showNoticePopup = common_vendor.ref(false);
    const popupNotices = common_vendor.ref([]);
    const popupCurrentIndex = common_vendor.ref(0);
    const showNoticeList = common_vendor.ref(false);
    function formatTime(t) {
      if (!t)
        return "";
      const d = new Date(t);
      return `${d.getMonth() + 1}-${d.getDate()}`;
    }
    async function loadData() {
      const _t = Date.now();
      try {
        const opts = { loading: false };
        const [bannerRes, noticeRes, catRes, categoriesRes, productRes] = await Promise.all([
          api_banner.getActiveBanners(opts),
          api_notice.getActiveNotices(opts),
          api_category.getCategoryTree(opts),
          api_product.getRecommendCategories(opts),
          api_product.getRecommendProducts(currentRecommendCategoryId.value ? { categoryId: currentRecommendCategoryId.value } : {}, opts)
        ]);
        if (bannerRes.data) {
          banners.value = bannerRes.data.records || bannerRes.data || [];
        }
        if (noticeRes.data) {
          const list = noticeRes.data.records || noticeRes.data || [];
          notices.value = list;
          const popupList = list.filter((n) => n.popupDisplay === 1);
          if (popupList.length > 0) {
            const seenIds = common_vendor.index.getStorageSync("seenNoticeIds") || [];
            const unseenList = popupList.filter((n) => !seenIds.includes(String(n.id)));
            if (unseenList.length > 0) {
              popupNotices.value = unseenList;
              popupCurrentIndex.value = 0;
              showNoticePopup.value = true;
            }
          }
        }
        if (catRes.data) {
          categories.value = (catRes.data || []).slice(0, 8);
        }
        if (categoriesRes.data && Array.isArray(categoriesRes.data)) {
          recommendTabs.value = [{ id: "", name: "全部热门" }, ...categoriesRes.data.map((c) => ({ id: String(c.id), name: c.name }))];
        }
        if (productRes.data) {
          recommendProducts.value = productRes.data.records || productRes.data || [];
        }
      } catch (e) {
        common_vendor.index.__f__("error", "at pages/index/index.vue:223", "load home data error", e);
      }
      common_vendor.index.__f__("log", "at pages/index/index.vue:225", `[HOME] loadData done ${Date.now() - _t}ms`);
    }
    common_vendor.onShow(() => {
      loadData();
      if (store_user.useUserStore().token) {
        api_message.getRemind({ loading: false }).then((res) => {
          const d = res.data || {};
          store_chat.useChatStore().setUnreadFromServer(d.messageUnread ?? 0);
          store_chat.useChatStore().setSystemUnreadFromServer(d.systemUnread ?? 0);
        }).catch(() => {
        });
      }
    });
    common_vendor.onPullDownRefresh(async () => {
      await loadData();
      common_vendor.index.stopPullDownRefresh();
    });
    function switchRecommendCategory(id) {
      if (currentRecommendCategoryId.value === id)
        return;
      currentRecommendCategoryId.value = id;
      const params = id ? { categoryId: id } : {};
      api_product.getRecommendProducts(params, { loading: false }).then((res) => {
        var _a;
        recommendProducts.value = ((_a = res.data) == null ? void 0 : _a.records) || res.data || [];
      }).catch(() => {
      });
    }
    function goSearch() {
      common_vendor.index.navigateTo({ url: "/pages/product/list?focus=1" });
    }
    function onBannerClick(item) {
      if (item.linkType === "product" && item.linkValue) {
        common_vendor.index.navigateTo({ url: `/pages/product/detail?id=${item.linkValue}` });
      } else if (item.linkType === "url" && item.linkValue)
        ;
    }
    function goCategory(id) {
      if (id)
        common_vendor.index.setStorageSync("selectedCategoryId", id);
      common_vendor.index.switchTab({ url: "/pages/category/index" });
    }
    function openNoticeDetail(item) {
      popupNotices.value = [item];
      popupCurrentIndex.value = 0;
      showNoticePopup.value = true;
    }
    function closeNoticePopup() {
      showNoticePopup.value = false;
      const seenIds = common_vendor.index.getStorageSync("seenNoticeIds") || [];
      popupNotices.value.forEach((n) => {
        if (n.id && !seenIds.includes(String(n.id))) {
          seenIds.push(String(n.id));
        }
      });
      common_vendor.index.setStorageSync("seenNoticeIds", seenIds);
    }
    async function goCustomerService() {
      if (!userStore.checkLogin())
        return;
      try {
        const res = await api_chat.createCsSession();
        const session = res.data;
        common_vendor.index.navigateTo({ url: "/pages/chat/room?sessionId=" + session.id + "&name=" + encodeURIComponent("在线客服") });
      } catch (e) {
        common_vendor.index.showToast({ title: (e == null ? void 0 : e.msg) || "连接客服失败", icon: "none" });
      }
    }
    return (_ctx, _cache) => {
      var _a, _b, _c;
      return common_vendor.e({
        a: common_vendor.o(goSearch),
        b: common_vendor.f(banners.value, (item, k0, i0) => {
          return {
            a: item.imageUrl,
            b: item.id,
            c: common_vendor.o(($event) => onBannerClick(item), item.id)
          };
        }),
        c: notices.value.length
      }, notices.value.length ? {
        d: common_assets._imports_0$1,
        e: common_vendor.f(notices.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: item.id
          };
        }),
        f: common_vendor.t(notices.value.length),
        g: common_vendor.o(($event) => showNoticeList.value = true)
      } : {}, {
        h: showNoticeList.value
      }, showNoticeList.value ? {
        i: common_vendor.o(($event) => showNoticeList.value = false),
        j: common_vendor.f(notices.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.t(formatTime(item.createTime)),
            c: item.id,
            d: common_vendor.o(($event) => {
              openNoticeDetail(item);
              showNoticeList.value = false;
            }, item.id)
          };
        }),
        k: common_vendor.o(() => {
        }),
        l: common_vendor.o(($event) => showNoticeList.value = false)
      } : {}, {
        m: common_vendor.f(categories.value, (cat, k0, i0) => {
          return {
            a: cat.icon || "/static/icons/分类.svg",
            b: common_vendor.t(cat.name),
            c: cat.id,
            d: common_vendor.o(($event) => goCategory(cat.id), cat.id)
          };
        }),
        n: common_vendor.f(recommendTabs.value, (tab, k0, i0) => {
          return {
            a: common_vendor.t(tab.name),
            b: tab.id,
            c: currentRecommendCategoryId.value === tab.id ? 1 : "",
            d: common_vendor.o(($event) => switchRecommendCategory(tab.id), tab.id)
          };
        }),
        o: common_vendor.f(recommendProducts.value, (p, k0, i0) => {
          return {
            a: p.id,
            b: "1cf27b2a-0-" + i0,
            c: common_vendor.p({
              product: p
            })
          };
        }),
        p: common_vendor.p({
          current: 0
        }),
        q: common_assets._imports_0,
        r: common_vendor.o(goCustomerService),
        s: showNoticePopup.value
      }, showNoticePopup.value ? common_vendor.e({
        t: common_vendor.t(popupCurrentIndex.value + 1),
        v: common_vendor.t(popupNotices.value.length),
        w: common_vendor.o(closeNoticePopup),
        x: common_vendor.t((_a = popupNotices.value[popupCurrentIndex.value]) == null ? void 0 : _a.title),
        y: (_b = popupNotices.value[popupCurrentIndex.value]) == null ? void 0 : _b.content
      }, ((_c = popupNotices.value[popupCurrentIndex.value]) == null ? void 0 : _c.content) ? {
        z: popupNotices.value[popupCurrentIndex.value].content
      } : {}, {
        A: popupNotices.value.length > 1
      }, popupNotices.value.length > 1 ? {
        B: popupCurrentIndex.value === 0 ? 1 : "",
        C: common_vendor.o(($event) => popupCurrentIndex.value > 0 && popupCurrentIndex.value--),
        D: popupCurrentIndex.value === popupNotices.value.length - 1 ? 1 : "",
        E: common_vendor.o(($event) => popupCurrentIndex.value < popupNotices.value.length - 1 && popupCurrentIndex.value++)
      } : {}, {
        F: common_vendor.o(closeNoticePopup),
        G: common_vendor.o(() => {
        }),
        H: common_vendor.o(closeNoticePopup)
      }) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
