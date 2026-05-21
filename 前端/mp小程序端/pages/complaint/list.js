"use strict";
const common_vendor = require("../../common/vendor.js");
const api_complaint = require("../../api/complaint.js");
const utils_constants = require("../../utils/constants.js");
if (!Math) {
  StatusTag();
}
const StatusTag = () => "../../components/StatusTag.js";
const _sfc_main = {
  __name: "list",
  setup(__props) {
    const items = common_vendor.ref([]);
    const loading = common_vendor.ref(false);
    const finished = common_vendor.ref(false);
    const query = common_vendor.ref({ pageNum: 1, pageSize: 10, status: "" });
    const statusOptions = [
      { label: "全部", value: "" },
      { label: "待处理", value: "PENDING" },
      { label: "处理中", value: "PROCESSING" },
      { label: "已解决", value: "RESOLVED" },
      { label: "申诉中", value: "APPEALING" }
    ];
    common_vendor.onLoad(() => {
      resetAndLoad();
    });
    function resetAndLoad() {
      items.value = [];
      finished.value = false;
      query.value.pageNum = 1;
      fetchList();
    }
    async function fetchList() {
      var _a;
      if (loading.value || finished.value)
        return;
      loading.value = true;
      try {
        const res = await api_complaint.getMyComplaints(query.value);
        const records = ((_a = res.data) == null ? void 0 : _a.records) || res.data || [];
        if (records.length < query.value.pageSize) {
          finished.value = true;
        }
        items.value = items.value.concat(records);
        query.value.pageNum += 1;
      } catch (e) {
      } finally {
        loading.value = false;
      }
    }
    function loadMore() {
      fetchList();
    }
    function changeStatus(val) {
      if (query.value.status === val)
        return;
      query.value.status = val;
      resetAndLoad();
    }
    function goDetail(c) {
      common_vendor.index.navigateTo({ url: `/pages/complaint/detail?id=${c.id}` });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(statusOptions, (s, k0, i0) => {
          return {
            a: common_vendor.t(s.label),
            b: s.value,
            c: query.value.status === s.value ? 1 : "",
            d: common_vendor.o(($event) => changeStatus(s.value), s.value)
          };
        }),
        b: items.value.length === 0 && !loading.value
      }, items.value.length === 0 && !loading.value ? {} : {}, {
        c: common_vendor.f(items.value, (c, k0, i0) => {
          return {
            a: common_vendor.t(c.type || "投诉"),
            b: "ec70149e-0-" + i0,
            c: common_vendor.p({
              status: c.status,
              textMap: common_vendor.unref(utils_constants.COMPLAINT_STATUS_TEXT)
            }),
            d: common_vendor.t(c.content),
            e: common_vendor.t(c.createdAt),
            f: c.id,
            g: common_vendor.o(($event) => goDetail(c), c.id)
          };
        }),
        d: loading.value
      }, loading.value ? {} : finished.value && items.value.length > 0 ? {} : {}, {
        e: finished.value && items.value.length > 0,
        f: common_vendor.o(loadMore)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ec70149e"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/complaint/list.js.map
