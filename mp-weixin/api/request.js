"use strict";
const common_vendor = require("../common/vendor.js");
const utils_auth = require("../utils/auth.js");
const BASE_URL = "https://anheiboshen.com/api";
let loadingCount = 0;
let _handlingUnauthorized = false;
function showLoading() {
  if (loadingCount === 0) {
    common_vendor.index.showLoading({ title: "加载中...", mask: true });
  }
  loadingCount++;
}
function hideLoading() {
  loadingCount--;
  if (loadingCount <= 0) {
    loadingCount = 0;
    try {
      common_vendor.index.hideLoading();
    } catch (e) {
    }
  }
}
function getCurrentRole() {
  return common_vendor.index.getStorageSync("app_role") || "user";
}
function request(options) {
  const {
    url,
    method = "GET",
    data = {},
    loading = true,
    auth = true,
    role,
    header = {}
  } = options;
  return new Promise((resolve, reject) => {
    let loadingHandled = false;
    const finishLoading = () => {
      if (loading && !loadingHandled) {
        loadingHandled = true;
        hideLoading();
      }
    };
    if (loading)
      showLoading();
    const currentRole = role || getCurrentRole();
    if (auth) {
      const token = utils_auth.getTokenByRole(currentRole);
      if (token) {
        header["Authorization"] = `Bearer ${token}`;
      }
    }
    const _startTime = Date.now();
    let finalUrl = `${BASE_URL}${url}`;
    let bodyData = data;
    if (method === "GET" && data && Object.keys(data).length > 0) {
      const qs = Object.entries(data).filter(([, v]) => v !== void 0 && v !== null && v !== "").map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`).join("&");
      if (qs)
        finalUrl += (url.includes("?") ? "&" : "?") + qs;
      bodyData = {};
    }
    common_vendor.index.__f__("log", "at api/request.js:90", `[REQ] >>> ${method} ${finalUrl}`);
    common_vendor.index.request({
      url: finalUrl,
      method,
      data: bodyData,
      header: {
        "Content-Type": "application/json",
        ...header
      },
      success(res) {
        common_vendor.index.__f__("log", "at api/request.js:100", `[REQ] <<< ${method} ${url} ${Date.now() - _startTime}ms`);
        const { statusCode, data: resData } = res;
        if (statusCode === 200) {
          if (resData.code === 0 || resData.code === 200) {
            resolve(resData);
          } else if (resData.code === 401) {
            finishLoading();
            handleUnauthorized(currentRole);
            reject(resData);
          } else {
            finishLoading();
            common_vendor.index.showToast({ title: resData.msg || "请求失败", icon: "none" });
            reject(resData);
          }
        } else if (statusCode === 401) {
          finishLoading();
          handleUnauthorized(currentRole);
          reject(resData);
        } else {
          finishLoading();
          common_vendor.index.showToast({ title: `网络错误(${statusCode})`, icon: "none" });
          reject(resData);
        }
      },
      fail(err) {
        finishLoading();
        common_vendor.index.showToast({ title: "网络连接失败", icon: "none" });
        reject(err);
      },
      complete() {
        finishLoading();
      }
    });
  });
}
function handleUnauthorized(role) {
  if (_handlingUnauthorized)
    return;
  _handlingUnauthorized = true;
  if (role === "cs") {
    common_vendor.index.removeStorageSync("cs_token");
  } else if (role === "player") {
    common_vendor.index.removeStorageSync("player_token");
  } else {
    common_vendor.index.removeStorageSync("user_token");
  }
  common_vendor.index.showToast({ title: "登录已过期，请重新登录", icon: "none" });
  setTimeout(() => {
    _handlingUnauthorized = false;
    if (role === "cs") {
      common_vendor.index.reLaunch({ url: "/pages/login/index" });
    } else if (role === "player") {
      common_vendor.index.setStorageSync("app_role", "user");
      common_vendor.index.reLaunch({ url: "/pages/mine/index" });
    } else {
      common_vendor.index.reLaunch({ url: "/pages/login/index" });
    }
  }, 1500);
}
function uploadFile(filePath) {
  return new Promise((resolve, reject) => {
    const role = getCurrentRole();
    const token = utils_auth.getTokenByRole(role);
    const header = {};
    if (token) {
      header["Authorization"] = `Bearer ${token}`;
    }
    common_vendor.index.uploadFile({
      url: `${BASE_URL}/common/file/upload`,
      filePath,
      name: "file",
      header,
      success(res) {
        if (res.statusCode === 200) {
          const data = JSON.parse(res.data);
          if (data.code === 0 || data.code === 200) {
            resolve(data.data);
          } else {
            common_vendor.index.showToast({ title: data.msg || "上传失败", icon: "none" });
            reject(data);
          }
        } else {
          reject(res);
        }
      },
      fail(err) {
        common_vendor.index.showToast({ title: "上传失败", icon: "none" });
        reject(err);
      }
    });
  });
}
const get = (url, data, options = {}) => request({ url, method: "GET", data, ...options });
const post = (url, data, options = {}) => request({ url, method: "POST", data, ...options });
const put = (url, data, options = {}) => request({ url, method: "PUT", data, ...options });
const del = (url, data, options = {}) => request({ url, method: "DELETE", data, ...options });
exports.del = del;
exports.get = get;
exports.post = post;
exports.put = put;
exports.uploadFile = uploadFile;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/request.js.map
