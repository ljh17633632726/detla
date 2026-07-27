"use strict";const e=require("./request.js"),s={role:"cs"};exports.getCsRemind=(r={})=>e.get("/cs/remind",{},{...s,...r});
