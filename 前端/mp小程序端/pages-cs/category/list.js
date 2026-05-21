"use strict";
const common_vendor = require("../../common/vendor.js");
const pagesCs_api_cs = require("../api/cs.js");
if (!Math) {
  (EmptyState + ImageUploader)();
}
const EmptyState = () => "../../components/EmptyState.js";
const ImageUploader = () => "../../components/ImageUploader.js";
const _sfc_main = {
  __name: "list",
  setup(__props) {
    const categories = common_vendor.ref([]);
    const showAddDialog = common_vendor.ref(false);
    const editingId = common_vendor.ref("");
    const categoryForm = common_vendor.reactive({ name: "", sort: 0, icon: "", parentId: "" });
    const iconImages = common_vendor.ref([]);
    const parentIndex = common_vendor.ref(-1);
    const parentCategories = common_vendor.computed(() => {
      return categories.value.filter((c) => !c.parentId || c.parentId === 0 || c.parentId === "");
    });
    const parentCategoryNames = common_vendor.computed(() => {
      return ["无（顶级分类）", ...parentCategories.value.map((c) => c.name)];
    });
    const selectedParentName = common_vendor.computed(() => {
      if (!categoryForm.parentId)
        return "无（顶级分类）";
      const p = parentCategories.value.find((c) => c.id === categoryForm.parentId);
      return (p == null ? void 0 : p.name) || "无（顶级分类）";
    });
    const groupedCategories = common_vendor.computed(() => {
      const parents = parentCategories.value;
      const childrenMap = {};
      categories.value.forEach((c) => {
        const pid = c.parentId ?? "";
        const key = pid === 0 || pid === null || pid === void 0 ? "" : String(pid);
        if (!childrenMap[key])
          childrenMap[key] = [];
        childrenMap[key].push(c);
      });
      const result = [];
      result.push({ parent: null, children: childrenMap[""] || [] });
      parents.forEach((p) => {
        result.push({ parent: p, children: childrenMap[String(p.id)] || [] });
      });
      return result;
    });
    common_vendor.onShow(() => {
      loadData();
    });
    function openAddDialog() {
      editingId.value = "";
      categoryForm.name = "";
      categoryForm.sort = 0;
      categoryForm.parentId = "";
      iconImages.value = [];
      parentIndex.value = 0;
      showAddDialog.value = true;
    }
    async function loadData() {
      var _a;
      try {
        const res = await pagesCs_api_cs.getCsCategoryList({ pageNum: 1, pageSize: 100 });
        categories.value = ((_a = res.data) == null ? void 0 : _a.records) || res.data || [];
      } catch (e) {
      }
    }
    function onParentChange(e) {
      var _a;
      const idx = e.detail.value;
      parentIndex.value = idx;
      if (idx === 0) {
        categoryForm.parentId = "";
      } else {
        categoryForm.parentId = ((_a = parentCategories.value[idx - 1]) == null ? void 0 : _a.id) || "";
      }
    }
    function editCategory(c) {
      editingId.value = c.id;
      categoryForm.name = c.name;
      categoryForm.sort = c.sort || 0;
      categoryForm.icon = c.icon || "";
      categoryForm.parentId = c.parentId || "";
      iconImages.value = c.icon ? [c.icon] : [];
      const pid = categoryForm.parentId;
      parentIndex.value = pid ? parentCategories.value.findIndex((p) => p.id === pid) + 1 : 0;
      showAddDialog.value = true;
    }
    async function doSave() {
      if (!categoryForm.name)
        return common_vendor.index.showToast({ title: "请输入名称", icon: "none" });
      categoryForm.icon = categoryForm.parentId ? "" : iconImages.value[0] || "";
      const data = { ...categoryForm, sort: Number(categoryForm.sort) || 0 };
      if (!data.parentId)
        delete data.parentId;
      if (editingId.value)
        data.id = editingId.value;
      try {
        await pagesCs_api_cs.saveCsCategory(data);
        common_vendor.index.showToast({ title: "保存成功" });
        showAddDialog.value = false;
        editingId.value = "";
        categoryForm.name = "";
        categoryForm.sort = 0;
        categoryForm.parentId = "";
        iconImages.value = [];
        parentIndex.value = -1;
        loadData();
      } catch (e) {
      }
    }
    function doDelete(id) {
      common_vendor.index.showModal({ title: "提示", content: "确定删除该分类？", success: async (r) => {
        if (r.confirm) {
          try {
            await pagesCs_api_cs.deleteCsCategory(id);
            common_vendor.index.showToast({ title: "已删除" });
            loadData();
          } catch (e) {
          }
        }
      } });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(groupedCategories.value, (group, k0, i0) => {
          var _a;
          return common_vendor.e({
            a: group.parent
          }, group.parent ? {
            b: common_vendor.t(group.parent.name)
          } : {}, {
            c: common_vendor.f(group.children, (c, k1, i1) => {
              return common_vendor.e({
                a: c.icon && !c.parentId
              }, c.icon && !c.parentId ? {
                b: c.icon
              } : {}, {
                c: common_vendor.t(c.name),
                d: common_vendor.t(c.productCount || 0),
                e: c.parentId ? 1 : "",
                f: common_vendor.o(($event) => editCategory(c), c.id),
                g: common_vendor.o(($event) => doDelete(c.id), c.id),
                h: c.id
              });
            }),
            d: ((_a = group.parent) == null ? void 0 : _a.id) || "root"
          });
        }),
        b: categories.value.length === 0
      }, categories.value.length === 0 ? {
        c: common_vendor.p({
          text: "暂无分类",
          image: "/pages-cs/static/icons/文件夹空空如也.svg"
        })
      } : {}, {
        d: common_vendor.o(openAddDialog),
        e: showAddDialog.value
      }, showAddDialog.value ? common_vendor.e({
        f: common_vendor.t(editingId.value ? "编辑分类" : "添加分类"),
        g: common_vendor.t(selectedParentName.value || "无（顶级分类）"),
        h: common_vendor.n(categoryForm.parentId ? "" : "placeholder"),
        i: parentIndex.value,
        j: parentCategoryNames.value,
        k: common_vendor.o(onParentChange),
        l: categoryForm.name,
        m: common_vendor.o(($event) => categoryForm.name = $event.detail.value),
        n: categoryForm.sort,
        o: common_vendor.o(($event) => categoryForm.sort = $event.detail.value),
        p: !categoryForm.parentId
      }, !categoryForm.parentId ? {
        q: common_vendor.o(($event) => iconImages.value = $event),
        r: common_vendor.p({
          max: 1,
          modelValue: iconImages.value
        })
      } : {}, {
        s: common_vendor.o(doSave),
        t: common_vendor.o(() => {
        }),
        v: common_vendor.o(($event) => showAddDialog.value = false)
      }) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-60235aa3"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages-cs/category/list.js.map
