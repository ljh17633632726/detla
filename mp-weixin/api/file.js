"use strict";
const common_vendor = require("../common/vendor.js");
const api_request = require("./request.js");
const upload = (filePath) => api_request.uploadFile(filePath);
function chooseAndUpload(count = 1) {
  return new Promise((resolve, reject) => {
    common_vendor.index.chooseImage({
      count,
      sizeType: ["compressed"],
      sourceType: ["album", "camera"],
      success: async (res) => {
        try {
          const urls = [];
          for (const path of res.tempFilePaths) {
            const url = await api_request.uploadFile(path);
            urls.push(url);
          }
          resolve(urls);
        } catch (err) {
          reject(err);
        }
      },
      fail: reject
    });
  });
}
exports.chooseAndUpload = chooseAndUpload;
exports.upload = upload;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/file.js.map
