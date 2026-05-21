"use strict";
const common_vendor = require("../../common/vendor.js");
const pagesCs_api_cs = require("../api/cs.js");
if (!Array) {
  const _component_el_tag = common_vendor.resolveComponent("el-tag");
  _component_el_tag();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const list = common_vendor.ref([]);
    const loading = common_vendor.ref(false);
    const showModal = common_vendor.ref(false);
    const showDeleteConfirm = common_vendor.ref(false);
    const editingId = common_vendor.ref(null);
    const deletingItem = common_vendor.ref(null);
    const form = common_vendor.reactive({ content: "", category: "", sortOrder: 0, status: 1 });
    async function fetchList() {
      var _a;
      loading.value = true;
      try {
        const res = await pagesCs_api_cs.getQuickReplyList({ pageNum: 1, pageSize: 100 });
        list.value = ((_a = res.data) == null ? void 0 : _a.records) || [];
      } catch (e) {
        list.value = [];
      } finally {
        loading.value = false;
      }
    }
    function openAdd() {
      editingId.value = null;
      Object.assign(form, { content: "", category: "", sortOrder: 0, status: 1 });
      showModal.value = true;
    }
    function openEdit(item) {
      editingId.value = item.id;
      Object.assign(form, {
        content: item.content || "",
        category: item.category || "",
        sortOrder: item.sortOrder ?? 0,
        status: item.status ?? 1
      });
      showModal.value = true;
    }
    async function handleSubmit() {
      if (!form.content.trim()) {
        return common_vendor.index.showToast({ title: "请输入内容", icon: "none" });
      }
      try {
        const data = {
          content: form.content.trim(),
          category: form.category.trim() || null,
          sortOrder: Number(form.sortOrder) || 0,
          status: form.status
        };
        if (editingId.value) {
          await pagesCs_api_cs.updateQuickReply({ ...data, id: editingId.value });
          common_vendor.index.showToast({ title: "已更新" });
        } else {
          await pagesCs_api_cs.addQuickReply(data);
          common_vendor.index.showToast({ title: "已添加" });
        }
        showModal.value = false;
        fetchList();
      } catch (e) {
        common_vendor.index.showToast({ title: "操作失败", icon: "none" });
      }
    }
    function confirmDelete(item) {
      deletingItem.value = item;
      showDeleteConfirm.value = true;
    }
    async function handleDelete() {
      if (!deletingItem.value)
        return;
      try {
        await pagesCs_api_cs.deleteQuickReply(deletingItem.value.id);
        common_vendor.index.showToast({ title: "已删除" });
        showDeleteConfirm.value = false;
        fetchList();
      } catch (e) {
        common_vendor.index.showToast({ title: "删除失败", icon: "none" });
      }
    }
    common_vendor.onShow(() => {
      fetchList();
    });
    return (_ctx, _cache) => {
      var _a;
      return common_vendor.e({
        a: common_vendor.f(list.value, (item, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.content),
            b: item.category
          }, item.category ? {
            c: common_vendor.t(item.category)
          } : {}, {
            d: item.status === 0
          }, item.status === 0 ? {
            e: "7c88b6cc-0-" + i0
          } : {}, {
            f: common_vendor.o(($event) => openEdit(item), item.id),
            g: common_vendor.o(($event) => openEdit(item), item.id),
            h: common_vendor.o(($event) => confirmDelete(item), item.id),
            i: item.id
          });
        }),
        b: list.value.length === 0 && !loading.value
      }, list.value.length === 0 && !loading.value ? {} : {}, {
        c: common_vendor.o(openAdd),
        d: showModal.value
      }, showModal.value ? {
        e: common_vendor.t(editingId.value ? "编辑快捷发言" : "新增快捷发言"),
        f: form.content,
        g: common_vendor.o(($event) => form.content = $event.detail.value),
        h: form.category,
        i: common_vendor.o(($event) => form.category = $event.detail.value),
        j: form.sortOrder,
        k: common_vendor.o(($event) => form.sortOrder = $event.detail.value),
        l: form.status === 1,
        m: common_vendor.o(($event) => form.status = $event.detail.value ? 1 : 0),
        n: common_vendor.o(($event) => showModal.value = false),
        o: common_vendor.t(editingId.value ? "保存" : "添加"),
        p: common_vendor.o(handleSubmit),
        q: common_vendor.o(() => {
        }),
        r: common_vendor.o(($event) => showModal.value = false)
      } : {}, {
        s: showDeleteConfirm.value
      }, showDeleteConfirm.value ? {
        t: common_vendor.t((_a = deletingItem.value) == null ? void 0 : _a.content),
        v: common_vendor.o(($event) => showDeleteConfirm.value = false),
        w: common_vendor.o(handleDelete),
        x: common_vendor.o(() => {
        }),
        y: common_vendor.o(($event) => showDeleteConfirm.value = false)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7c88b6cc"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages-cs/quick-reply/index.js.map
