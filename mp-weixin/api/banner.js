"use strict";const e=require("./request.js");exports.getActiveBanners=(t={})=>e.get("/system/banner/active",{},{auth:!1,...t});
