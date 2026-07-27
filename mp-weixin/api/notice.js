"use strict";const e=require("./request.js");exports.getActiveNotices=(t={})=>e.get("/system/notice/active",{},{auth:!1,...t});
