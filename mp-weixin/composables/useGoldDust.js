"use strict";
const common_vendor = require("../common/vendor.js");
function useGoldDust(canvasId = "goldDust") {
  const instance = common_vendor.getCurrentInstance();
  let cvs = null;
  let ctx = null;
  let raf = null;
  let running = true;
  let W = 375;
  let H = 700;
  const COUNT = 45;
  const dots = [];
  function rand(a, b) {
    return Math.random() * (b - a) + a;
  }
  function spawn(d, init) {
    d.x = rand(0, W);
    d.y = init ? rand(0, H) : rand(H + 10, H + 60);
    const big = Math.random() < 0.15;
    d.r = big ? rand(3, 5) : rand(1.2, 3);
    d.vx = rand(-0.15, 0.15);
    d.vy = big ? rand(-0.2, -0.06) : rand(-0.4, -0.1);
    d.alpha = init ? rand(0.15, 0.5) : 0;
    d.peak = big ? rand(0.4, 0.7) : rand(0.2, 0.5);
    d.phase = init ? 1 : 0;
    d.tw = rand(0, Math.PI * 2);
    d.twSpeed = rand(0.01, 0.03);
    d.glowR = big ? d.r * 6 : d.r * 4;
  }
  function draw() {
    if (!running || !ctx)
      return;
    ctx.clearRect(0, 0, W, H);
    for (const d of dots) {
      if (d.phase === 0) {
        d.alpha += 3e-3;
        if (d.alpha >= d.peak) {
          d.alpha = d.peak;
          d.phase = 1;
        }
      }
      if (d.phase === 1) {
        d.tw += d.twSpeed;
        d.alpha = d.peak * (0.75 + 0.25 * Math.sin(d.tw));
        if (d.y < H * 0.15)
          d.phase = 2;
      }
      if (d.phase === 2) {
        d.alpha -= 3e-3;
        if (d.alpha <= 0) {
          spawn(d, false);
          continue;
        }
      }
      d.x += d.vx;
      d.y += d.vy;
      d.vx += rand(-5e-3, 5e-3);
      d.vx = Math.max(-0.15, Math.min(0.15, d.vx));
      if (d.y < -20 || d.x < -20 || d.x > W + 20) {
        spawn(d, false);
        continue;
      }
      if (d.alpha < 0.01)
        continue;
      const grad = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.glowR);
      grad.addColorStop(0, `rgba(99, 102, 241, ${d.alpha * 0.35})`);
      grad.addColorStop(0.5, `rgba(99, 102, 241, ${d.alpha * 0.1})`);
      grad.addColorStop(1, "rgba(99, 102, 241, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.glowR, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = d.alpha;
      ctx.fillStyle = "#6366f1";
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    scheduleNext();
  }
  function scheduleNext() {
    if (!running)
      return;
    if (cvs && cvs.requestAnimationFrame) {
      raf = cvs.requestAnimationFrame(draw);
    } else {
      raf = setTimeout(draw, 16);
    }
  }
  function stop() {
    running = false;
    if (raf == null)
      return;
    if (cvs && cvs.cancelAnimationFrame)
      cvs.cancelAnimationFrame(raf);
    else
      clearTimeout(raf);
    raf = null;
  }
  common_vendor.onMounted(() => {
    const sys = common_vendor.index.getSystemInfoSync();
    W = sys.windowWidth || 375;
    H = sys.windowHeight || 700;
    const dpr = sys.pixelRatio || 2;
    setTimeout(() => {
      common_vendor.index.createSelectorQuery().in(instance.proxy).select("#" + canvasId).fields({ node: true, size: true }).exec((res) => {
        if (!res || !res[0] || !res[0].node)
          return;
        cvs = res[0].node;
        ctx = cvs.getContext("2d");
        cvs.width = W * dpr;
        cvs.height = H * dpr;
        ctx.scale(dpr, dpr);
        for (let i = 0; i < COUNT; i++) {
          const d = {};
          spawn(d, true);
          dots.push(d);
        }
        draw();
      });
    }, 300);
  });
  common_vendor.onUnmounted(() => {
    stop();
  });
}
exports.useGoldDust = useGoldDust;
//# sourceMappingURL=../../.sourcemap/mp-weixin/composables/useGoldDust.js.map
