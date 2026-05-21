"use strict";
const common_vendor = require("../../common/vendor.js");
const pagesCs_api_cs = require("../api/cs.js");
const _sfc_main = {
  __name: "audit",
  setup(__props) {
    const STATUS_TEXT = { PENDING: "待审核", ACTIVE: "已激活", FROZEN: "已冻结", REJECTED: "已拒绝" };
    const player = common_vendor.ref(null);
    const playerId = common_vendor.ref("");
    const auditRemark = common_vendor.ref("");
    common_vendor.onLoad(async (opts) => {
      playerId.value = opts.id;
      const res = await pagesCs_api_cs.getCsPlayerDetail(opts.id);
      player.value = res.data;
    });
    async function doAudit(status) {
      const action = status === "ACTIVE" ? "通过" : "拒绝";
      common_vendor.index.showModal({ title: "确认", content: `确定${action}该接单员申请？`, success: async (r) => {
        if (r.confirm) {
          try {
            await pagesCs_api_cs.auditCsPlayer(playerId.value, { status, rejectReason: auditRemark.value });
            common_vendor.index.showToast({ title: `已${action}` });
            setTimeout(() => common_vendor.index.navigateBack(), 1500);
          } catch (e) {
          }
        }
      } });
    }
    function previewImg(imgs, idx) {
      common_vendor.index.previewImage({ urls: imgs, current: idx });
    }
    return (_ctx, _cache) => {
      var _a;
      return common_vendor.e({
        a: player.value
      }, player.value ? common_vendor.e({
        b: player.value.avatar || "/static/images/default-avatar.png",
        c: common_vendor.t(player.value.nickname || player.value.realName),
        d: common_vendor.t(STATUS_TEXT[player.value.status] || player.value.status),
        e: common_vendor.n((_a = player.value.status) == null ? void 0 : _a.toLowerCase()),
        f: common_vendor.t(player.value.realName),
        g: common_vendor.t(player.value.phone),
        h: common_vendor.t(player.value.gameLevel),
        i: common_vendor.t(player.value.serviceTypes),
        j: player.value.skillTags && player.value.skillTags.length
      }, player.value.skillTags && player.value.skillTags.length ? {
        k: common_vendor.t(Array.isArray(player.value.skillTags) ? player.value.skillTags.join(", ") : player.value.skillTags)
      } : {}, {
        l: player.value.proofImages
      }, player.value.proofImages ? {
        m: common_vendor.f(player.value.proofImages.split(","), (img, i, i0) => {
          return {
            a: i,
            b: img,
            c: common_vendor.o(($event) => previewImg(player.value.proofImages.split(","), i), i)
          };
        })
      } : {}, {
        n: player.value.status === "PENDING" || player.value.status === "FROZEN"
      }, player.value.status === "PENDING" || player.value.status === "FROZEN" ? {
        o: auditRemark.value,
        p: common_vendor.o(($event) => auditRemark.value = $event.detail.value),
        q: common_vendor.o(($event) => doAudit("ACTIVE")),
        r: common_vendor.o(($event) => doAudit("REJECTED"))
      } : {}) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6d07ea5d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages-cs/player/audit.js.map
