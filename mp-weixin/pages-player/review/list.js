"use strict";
const common_vendor = require("../../common/vendor.js");
const api_review = require("../../api/review.js");
if (!Math) {
  (StarRating + EmptyState)();
}
const EmptyState = () => "../../components/EmptyState.js";
const StarRating = () => "../../components/StarRating.js";
const _sfc_main = {
  __name: "list",
  setup(__props) {
    const reviews = common_vendor.ref([]);
    const pageNum = common_vendor.ref(1);
    const loading = common_vendor.ref(false);
    const finished = common_vendor.ref(false);
    common_vendor.onLoad(() => {
      loadData();
    });
    async function loadData() {
      var _a;
      loading.value = true;
      const res = await api_review.getMyReviews({ pageNum: pageNum.value, pageSize: 20 });
      const list = ((_a = res.data) == null ? void 0 : _a.records) || [];
      if (list.length < 20)
        finished.value = true;
      reviews.value = pageNum.value === 1 ? list : [...reviews.value, ...list];
      loading.value = false;
    }
    function loadMore() {
      if (!loading.value && !finished.value) {
        pageNum.value++;
        loadData();
      }
    }
    function previewImg(imgs, idx) {
      common_vendor.index.previewImage({ urls: imgs, current: idx });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(reviews.value, (r, k0, i0) => {
          return common_vendor.e({
            a: r.userAvatar || "/static/images/default-avatar.png",
            b: common_vendor.t(r.userNickname || "匿名用户"),
            c: common_vendor.t(r.createdAt),
            d: "9fb68462-0-" + i0,
            e: common_vendor.p({
              ["model-value"]: r.rating,
              readonly: true
            }),
            f: common_vendor.t(r.content),
            g: r.images
          }, r.images ? {
            h: common_vendor.f(r.images.split(","), (img, i, i1) => {
              return {
                a: i,
                b: img,
                c: common_vendor.o(($event) => previewImg(r.images.split(","), i), i)
              };
            })
          } : {}, {
            i: common_vendor.t(r.orderNo || r.orderId),
            j: common_vendor.t(r.productName),
            k: r.reply
          }, r.reply ? {
            l: common_vendor.t(r.reply)
          } : {}, {
            m: r.id
          });
        }),
        b: loading.value
      }, loading.value ? {} : {}, {
        c: !loading.value && reviews.value.length === 0
      }, !loading.value && reviews.value.length === 0 ? {
        d: common_vendor.p({
          text: "暂无评价",
          image: "/static/icons/暂无纪录.svg"
        })
      } : {}, {
        e: common_vendor.o(loadMore)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9fb68462"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages-player/review/list.js.map
