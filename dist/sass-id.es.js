const O = /* @__PURE__ */ Object.assign({ "./devices/phones/apple.json": () => import("./apple-RNts6T0X.js"), "./devices/phones/asus.json": () => import("./asus-CBX8looP.js"), "./devices/phones/blackshark.json": () => import("./blackshark-CiPcLHmK.js"), "./devices/phones/google.json": () => import("./google-q7ibyHbt.js"), "./devices/phones/honor.json": () => import("./honor-CWHbJPHm.js"), "./devices/phones/huawei.json": () => import("./huawei-Q01q4VSq.js"), "./devices/phones/infinix.json": () => import("./infinix-CjjA3FaS.js"), "./devices/phones/itel.json": () => import("./itel-BBHlk-vh.js"), "./devices/phones/lenovo.json": () => import("./lenovo-reIttnS3.js"), "./devices/phones/meizu.json": () => import("./meizu-C1fo1Gwh.js"), "./devices/phones/motorola.json": () => import("./motorola-DUoWQzk0.js"), "./devices/phones/nothing.json": () => import("./nothing-CItiIDFD.js"), "./devices/phones/nubia.json": () => import("./nubia-BBkg2RXx.js"), "./devices/phones/oneplus.json": () => import("./oneplus-uiaIsQsd.js"), "./devices/phones/oppo.json": () => import("./oppo-BzX3XjhV.js"), "./devices/phones/realme.json": () => import("./realme-BuA4DKwL.js"), "./devices/phones/samsung.json": () => import("./samsung-Cza0FQAQ.js"), "./devices/phones/sony.json": () => import("./sony-BqcZDzds.js"), "./devices/phones/tecno.json": () => import("./tecno-BJMoKRjg.js"), "./devices/phones/vivo.json": () => import("./vivo-D07Ezbv3.js"), "./devices/phones/xiaomi.json": () => import("./xiaomi-DOYX_jL6.js"), "./devices/phones/zte.json": () => import("./zte-DtRzY0Tp.js") }), H = {
  apple: ["iphone", "ipad", "macintosh", "macbook", "ios"],
  samsung: ["samsung", "sm-", "galaxy"],
  huawei: ["huawei", "harmony"],
  honor: ["honor"],
  google: ["pixel", "google"],
  xiaomi: ["xiaomi", "redmi", "mi ", "mi-", "mix "],
  oppo: ["oppo"],
  vivo: ["vivo"],
  oneplus: ["oneplus"],
  lenovo: ["lenovo", "thinkpad"],
  asus: ["asus", "rog", "zenfone"],
  sony: ["sony", "xperia"],
  motorola: ["moto", "motorola"],
  blackshark: ["blackshark"],
  nothing: ["nothing"],
  realme: ["realme"],
  tecno: ["tecno"],
  infinix: ["infinix"],
  itel: ["itel"],
  nubia: ["nubia"],
  meizu: ["meizu"],
  zte: ["zte", "axon"],
  acer: ["acer"],
  hp: ["hp ", "hewlett"],
  dell: ["dell"],
  microsoft: ["surface"],
  lg: ["lg-"]
};
function E(n) {
  return (n || "").trim().toLowerCase();
}
function ee(n) {
  const e = n.match(/\/([a-z0-9_-]+)\.json$/i);
  if (e)
    return E(e[1]);
}
class te {
  devices = /* @__PURE__ */ new Map();
  initialized = !1;
  allBrandsLoaded = !1;
  brandLoaders = /* @__PURE__ */ new Map();
  loadedBrands = /* @__PURE__ */ new Set();
  loadingBrands = /* @__PURE__ */ new Map();
  constructor() {
    for (const e in O) {
      const t = ee(e);
      if (!t) continue;
      const r = O[e];
      this.brandLoaders.has(t) || this.brandLoaders.set(t, []), this.brandLoaders.get(t).push(r);
    }
  }
  async initialize(e) {
    const t = e?.preloadAll ?? !0;
    this.initialized && (!t || this.allBrandsLoaded) || (this.initialized = !0, t && (this.allBrandsLoaded || await this.loadAllBrands()));
  }
  async loadDevicesForBrand(e) {
    const t = E(e);
    if (!t || this.loadedBrands.has(t))
      return;
    const r = this.brandLoaders.get(t);
    if (!r?.length)
      return;
    if (this.loadingBrands.has(t))
      return this.loadingBrands.get(t);
    const l = (async () => {
      for (const h of r)
        try {
          const p = (await h())?.default || [];
          this.addDevices(p);
        } catch (v) {
          console.error(`Error loading devices for brand ${e}:`, v);
        }
      this.loadedBrands.add(t), this.loadingBrands.delete(t);
    })();
    this.loadingBrands.set(t, l), await l;
  }
  async loadDevicesForUA(e, t) {
    this.initialized = !0;
    const r = (e || "").toLowerCase(), l = this.guessBrandsFromUA(r);
    return l.length ? (await Promise.all(l.map((h) => this.loadDevicesForBrand(h))), l) : (t?.fallbackLoadAll && await this.initialize({ preloadAll: !0 }), []);
  }
  getDeviceById(e) {
    return this.devices.get(e);
  }
  findDevicesByBrand(e) {
    const t = E(e);
    return Array.from(this.devices.values()).filter((r) => E(r.brand) === t);
  }
  getAllDevices() {
    return Array.from(this.devices.values());
  }
  getLoadedBrands() {
    return Array.from(this.loadedBrands);
  }
  addDevice(e) {
    if (!e.id)
      throw new Error("Device must have an id");
    this.devices.set(e.id, e);
  }
  addDevices(e) {
    e.forEach((t) => {
      if (!t.id || !t.brand || !t.model) {
        console.warn("Invalid device data:", t);
        return;
      }
      this.addDevice(t);
    });
  }
  async loadAllBrands() {
    await Promise.all(
      Array.from(this.brandLoaders.keys()).map((e) => this.loadDevicesForBrand(e))
    ), this.allBrandsLoaded = !0, console.log(`Loaded ${this.devices.size} devices`);
  }
  guessBrandsFromUA(e) {
    const t = /* @__PURE__ */ new Set();
    for (const [r, l] of Object.entries(H))
      l.some((h) => e.includes(h)) && t.add(r);
    if (!t.size)
      for (const r of this.brandLoaders.keys())
        e.includes(r) && t.add(r);
    return Array.from(t);
  }
}
const C = new te();
C.initialize({ preloadAll: !1 }).catch(console.error);
function R(n) {
  if (n._prepared)
    return n;
  const e = n.uaContains?.map((r) => r.toLowerCase()), t = n.uaRegex?.map((r) => {
    try {
      return new RegExp(r, "i");
    } catch (l) {
      console.warn(`Invalid UA regex pattern "${r}" for rule ${n.id || n.model}:`, l);
      return;
    }
  }).filter((r) => !!r);
  return {
    ...n,
    _prepared: !0,
    uaContainsLower: e,
    uaRegexObjects: t,
    modelLower: n.model?.toLowerCase(),
    brandLower: n.brand.toLowerCase()
  };
}
function oe(n) {
  return (n || "").toLowerCase();
}
function $(n, e, t) {
  return !t.resolutions || !t.resolutions.length ? !1 : t.resolutions.some((r) => r.w === n && r.h === e);
}
function F(n, e) {
  return n === void 0 || e.dpr === void 0 ? !0 : Math.abs(n - e.dpr) < 0.1;
}
function P(n, e) {
  if (!n || !e.os) return !0;
  const t = e.os.name.toLowerCase(), r = n.toLowerCase();
  return t === "ios" || t === "ipados" ? r.includes("ios") : t === "android" ? r.includes("android") : t === "windows" ? r.includes("windows") : t === "macos" || t === "mac os" ? r.includes("macos") || r.includes("mac os") : t === "harmonyos" ? r.includes("harmony") || r.includes("harmonyos") : !0;
}
function ne(n) {
  const e = n.toLowerCase();
  return /mobile|android|iphone|ipad|phone|blackberry|iemobile|mobi/.test(e) ? /ipad|tablet/.test(e) ? "tablet" : "mobile" : /tv|smarttv|googletv|appletv|hbbtv|pov-tv/.test(e) ? "tv" : /macbook|laptop|notebook|thinkpad|yoga|surface book|surface laptop/.test(e) ? "laptop" : "desktop";
}
function U(n) {
  const e = [
    // 先检测特殊的浏览器，避免被 Chrome 误判
    { name: "GSA", regex: /GSA\/([0-9\.]+)/i, engine: "WebKit" },
    { name: "Edge", regex: /edg(?:e|ios|a)\/([0-9\.]+)/i, engine: "Blink" },
    { name: "Opera", regex: /(?:opera|opr)\/([0-9\.]+)/i, engine: "Blink" },
    { name: "Chrome", regex: /chrome\/([0-9\.]+)/i, engine: "Blink" },
    { name: "Safari", regex: /version\/([0-9\.]+).*safari/i, engine: "WebKit" },
    { name: "Firefox", regex: /firefox\/([0-9\.]+)/i, engine: "Gecko" },
    { name: "IE", regex: /(?:msie |trident.*rv:)([0-9\.]+)/i, engine: "Trident" },
    { name: "Samsung Browser", regex: /samsungbrowser\/([0-9\.]+)/i, engine: "Blink" },
    { name: "UC Browser", regex: /ucbrowser\/([0-9\.]+)/i, engine: "Blink" },
    { name: "QQ Browser", regex: /(?:qqbrowser|mqqbrowser)\/([0-9\.]+)/i, engine: "Blink" },
    { name: "WeChat", regex: /micromessenger\/([0-9\.]+)/i, engine: "Blink" },
    { name: "Baidu", regex: /baidubrowser\/([0-9\.]+)/i, engine: "Blink" }
  ], t = n.toLowerCase();
  for (const r of e) {
    const l = t.match(r.regex);
    if (l) {
      let h;
      if (r.engine === "Blink" || r.engine === "WebKit") {
        const v = t.match(/applewebkit\/([0-9\.]+)/i);
        h = v ? v[1] : void 0;
      } else if (r.engine === "Gecko") {
        const v = t.match(/rv:([0-9\.]+)/i);
        h = v ? v[1] : void 0;
      }
      return {
        name: r.name,
        version: l[1],
        engine: r.engine,
        engineVersion: h
      };
    }
  }
}
function ie(n) {
  const e = n.toLowerCase();
  if (/android/.test(e)) {
    const t = e.match(/android\s*([0-9\._]+)/);
    return t ? `Android ${t[1].replace(/_/g, ".")}` : "Android";
  }
  if (/iphone|ipad|ipod/.test(e)) {
    const t = e.match(/os\s*([0-9\_]+)/i);
    return t ? `iOS ${t[1].replace(/_/g, ".")}` : "iOS";
  }
  if (/windows nt/.test(e)) {
    const t = e.match(/windows nt ([0-9\.]+)/i);
    return t ? `Windows ${{
      "10.0": "10/11",
      "6.3": "8.1",
      "6.2": "8",
      "6.1": "7",
      "6.0": "Vista"
    }[t[1]] || t[1]}` : "Windows";
  }
  if (/mac os x/.test(e)) {
    const t = e.match(/mac os x ([0-9_\.]+)/i);
    return t ? `macOS ${t[1].replace(/_/g, ".")}` : "macOS";
  }
  if (/linux/.test(e)) return "Linux";
}
function G() {
  try {
    const n = document.createElement("canvas"), e = n.getContext("2d");
    return e ? (n.width = 200, n.height = 50, e.textBaseline = "top", e.font = "14px Arial", e.fillStyle = "#f60", e.fillRect(125, 1, 62, 20), e.fillStyle = "#069", e.fillText("Canvas Fingerprint 🎨", 2, 15), e.fillStyle = "rgba(102, 204, 0, 0.7)", e.fillText("Canvas Fingerprint 🎨", 4, 17), n.toDataURL()) : "";
  } catch {
    return "";
  }
}
function N() {
  try {
    if (typeof document > "u") return "";
    const n = ["monospace", "sans-serif", "serif"], e = [
      "Arial",
      "Verdana",
      "Times New Roman",
      "Courier New",
      "Georgia",
      "Palatino",
      "Garamond",
      "Bookman",
      "Comic Sans MS",
      "Trebuchet MS",
      "Impact",
      "Arial Black",
      "Tahoma",
      "Century Gothic",
      "Lucida Console",
      "Microsoft YaHei",
      "SimSun",
      "SimHei",
      "KaiTi",
      "FangSong"
    ], t = document.createElement("canvas"), r = t.getContext("2d");
    if (!r) return "";
    t.width = 200, t.height = 50;
    const l = "mmmmmmmmmmlli", h = "72px", v = {};
    n.forEach((f) => {
      r.font = `${h} ${f}`, v[f] = r.measureText(l).width;
    });
    const p = [];
    return e.forEach((f) => {
      let m = !1;
      n.forEach((u) => {
        r.font = `${h} ${f}, ${u}`, r.measureText(l).width !== v[u] && (m = !0);
      }), m && p.push(f);
    }), p.sort().join(",");
  } catch {
    return "";
  }
}
async function V() {
  try {
    if (typeof AudioContext > "u" && typeof window.webkitAudioContext > "u")
      return "";
    const n = AudioContext || window.webkitAudioContext, e = new n(), t = e.createOscillator(), r = e.createAnalyser(), l = e.createGain(), h = e.createScriptProcessor(4096, 1, 1);
    return l.gain.value = 0, t.type = "triangle", t.connect(r), r.connect(h), h.connect(l), l.connect(e.destination), t.start(0), new Promise((v) => {
      h.onaudioprocess = (p) => {
        const f = p.inputBuffer.getChannelData(0), m = Array.from(f.slice(0, 100)).map((u) => Math.abs(u).toString(36).substring(2, 5)).join("");
        t.stop(), e.close(), v(m);
      }, setTimeout(() => {
        try {
          t.stop(), e.close();
        } catch {
        }
        v("");
      }, 100);
    });
  } catch {
    return "";
  }
}
async function K() {
  try {
    if (typeof navigator > "u" || !navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices)
      return "";
    try {
      return (await navigator.mediaDevices.enumerateDevices()).map((t) => `${t.kind}:${t.deviceId.substring(0, 20)}`).sort().join("|");
    } catch {
      return "";
    }
  } catch {
    return "";
  }
}
function q() {
  try {
    const n = document.createElement("canvas"), e = n.getContext("webgl") || n.getContext("experimental-webgl");
    if (!e) return "";
    const t = e.getExtension("WEBGL_debug_renderer_info"), r = t ? e.getParameter(t.UNMASKED_VENDOR_WEBGL) : "", l = t ? e.getParameter(t.UNMASKED_RENDERER_WEBGL) : "";
    return [
      r,
      l,
      e.getParameter(e.VERSION),
      e.getParameter(e.SHADING_LANGUAGE_VERSION),
      e.getParameter(e.MAX_TEXTURE_SIZE),
      e.getParameter(e.MAX_VERTEX_ATTRIBS)
    ].join("|");
  } catch {
    return "";
  }
}
async function re(n) {
  const e = [
    n.device.brand || "unknown",
    n.device.model || "unknown",
    n.device.os || "unknown",
    n.device.browser?.name || "unknown",
    n.device.browser?.version || "unknown",
    n.device.browser?.engine || "unknown",
    n.device.browser?.engineVersion || "unknown",
    n.device.deviceType,
    `${n.screen.width}x${n.screen.height}`,
    n.screen.colorDepth?.toString() || "",
    n.screen.pixelRatio?.toString() || "",
    n.timezone || "",
    n.platform || "",
    (n.plugins || []).join(","),
    n.canvas || "",
    n.webgl || "",
    n.fonts || "",
    n.audio || "",
    n.mediaDevices || "",
    n.hardwareConcurrency?.toString() || "",
    n.deviceMemory?.toString() || ""
  ];
  n.extra && Object.keys(n.extra).sort().forEach((r) => {
    e.push(`${r}:${JSON.stringify(n.extra[r])}`);
  });
  const t = e.join("|");
  if (typeof crypto < "u" && crypto.subtle)
    try {
      const l = new TextEncoder().encode(t), h = await crypto.subtle.digest("SHA-256", l);
      return Array.from(new Uint8Array(h)).map((p) => p.toString(16).padStart(2, "0")).join("");
    } catch {
    }
  return se(t);
}
function se(n) {
  let e = 0;
  for (let t = 0; t < n.length; t++) {
    const r = n.charCodeAt(t);
    e = (e << 5) - e + r, e = e & e;
  }
  return Math.abs(e).toString(16).padStart(16, "0");
}
function ae(n = []) {
  const e = n.map(R);
  function t(p) {
    e.push(R(p));
  }
  function r(p) {
    e.push(...p.map(R));
  }
  function l() {
    e.length = 0;
  }
  function h(p, f, m, u) {
    const S = oe(p), y = [], c = ne(p), g = ie(p), B = U(p), x = u?.pixelRatio || (typeof window < "u" ? window.devicePixelRatio : void 0);
    for (const o of e) {
      let i = 0, s = !1, a = !1, d = !0, D = !0, k = !1;
      const L = o.uaContainsLower;
      if (L && L.length > 0)
        if (L.some((T) => S.includes(T)))
          i += 40, s = !0;
        else
          continue;
      const j = o.uaRegexObjects;
      if (!s && j && j.length > 0 && j.some((T) => T.test(p)) && (i += 40, s = !0), s) {
        if (o.resolutions?.length)
          if (a = $(f, m, o), a)
            i += 20;
          else {
            const z = o.type === "laptop" || o.type === "desktop", Z = o.type === "tablet";
            if (z || Z) {
              const I = z ? 50 : 20;
              o.resolutions.some((_) => {
                const J = Math.abs(_.w - f), Y = Math.abs(_.h - m);
                return J <= I && Y <= I;
              }) ? (a = !0, i += 15) : i -= 10;
            } else
              i -= 10;
          }
        d = F(x, o), d ? o.dpr !== void 0 && (i += 10) : i -= 5, D = P(g, o), D ? o.os && (i += 10) : i -= 10, o.type && (k = o.type === c || o.type === "phone" && c === "mobile" || o.type === "mobile" && c === "phone" || o.type === "laptop" && c === "desktop" || // laptop和desktop互相兼容
        o.type === "desktop" && c === "laptop", k ? i += 10 : i -= 5);
        const A = o.modelLower;
        !!A && (A.includes("mac") && (c === "desktop" || c === "laptop") || A.includes("macbook") && (c === "desktop" || c === "laptop") || A.includes("iphone") && (c === "mobile" || c === "phone") || A.includes("ipad") && c === "tablet" || A.includes("laptop") && (c === "desktop" || c === "laptop")) && (i += 5), o.priority && (i += Math.min(o.priority / 100, 20)), y.push({
          rule: o,
          score: i,
          uaMatch: s,
          resolutionMatch: a,
          dprMatch: d,
          osMatch: D,
          deviceTypeMatch: k
        });
      }
    }
    if (y.length === 0)
      for (const o of e) {
        let i = 0, s = !1, a = !0, d = !0, D = !1;
        if (o.resolutions?.length) {
          if (s = $(f, m, o), !s) continue;
          i += 30;
        } else
          continue;
        if (a = F(x, o), o.dpr !== void 0 && (a ? i += 25 : i -= 15), d = P(g, o), o.os)
          if (d)
            i += 20;
          else
            continue;
        else g && (i += 5);
        if (o.type)
          if (D = o.type === c || o.type === "phone" && c === "mobile" || o.type === "mobile" && c === "phone" || o.type === "laptop" && c === "desktop" || // laptop和desktop互相兼容
          o.type === "desktop" && c === "laptop", D)
            i += 15;
          else
            continue;
        if (g) {
          const k = o.brandLower;
          g.includes("iOS") && k === "apple" ? i += 10 : g.includes("Android") && k !== "apple" && (i += 5);
        }
        o.priority && (i += Math.min(o.priority / 100, 15)), y.push({
          rule: o,
          score: i,
          uaMatch: !1,
          resolutionMatch: s,
          dprMatch: a,
          osMatch: d,
          deviceTypeMatch: D
        });
      }
    if (y.length === 0 && g)
      for (const o of e) {
        let i = 0;
        const s = P(g, o);
        if (!s || !o.os) continue;
        if (o.resolutions?.length) {
          if (!o.resolutions.some((D) => {
            const k = Math.abs(D.w - f), L = Math.abs(D.h - m), A = o.type === "laptop" || o.type === "desktop" ? 50 : 10;
            return k <= A && L <= A;
          })) continue;
          i += 20;
        }
        if (o.type)
          if (o.type === c || o.type === "phone" && c === "mobile" || o.type === "mobile" && c === "phone" || o.type === "laptop" && c === "desktop" || // laptop和desktop互相兼容
          o.type === "desktop" && c === "laptop")
            i += 10;
          else
            continue;
        const a = F(x, o);
        o.dpr !== void 0 && a && (i += 15), i += 5, y.push({
          rule: o,
          score: i,
          uaMatch: !1,
          resolutionMatch: !0,
          dprMatch: a,
          osMatch: s,
          deviceTypeMatch: !0
        });
      }
    if (y.sort((o, i) => i.score - o.score), y.length > 0) {
      const o = y[0], i = y.filter((d) => d.score >= o.score * 0.7).map((d) => d.rule.id || `${d.rule.brand}:${d.rule.model}`);
      let s = o.uaMatch ? 0.85 : 0.65, a = 0;
      if (o.resolutionMatch && a++, o.dprMatch && o.rule.dpr !== void 0 && a++, o.osMatch && o.rule.os && a++, o.deviceTypeMatch && o.rule.type && a++, s += a * 0.05, s = Math.min(0.98, s + Math.min(o.score / 300, 0.1)), y.length > 1) {
        const d = o.score - y[1].score;
        d > 20 ? s = Math.min(0.98, s + 0.05) : d < 5 && y.length > 1 && (s = Math.max(0.5, s - 0.1));
      }
      return {
        brand: o.rule.brand,
        model: o.rule.model,
        confidence: Math.min(0.98, Math.max(0.5, s)),
        matchedRuleIds: i,
        os: g,
        deviceType: c,
        browser: B,
        rawUA: p
      };
    }
    let b = "unknown", w = "unknown", M = 0.3;
    if (g) {
      if (g.includes("Windows"))
        if (b = "Windows", f > 0 && m > 0) {
          const o = e.filter(
            (i) => i.os?.name === "windows" && (i.type === "laptop" || i.type === "desktop") && i.resolutions?.some((s) => {
              const a = Math.abs(s.w - f), d = Math.abs(s.h - m);
              return a <= 50 && d <= 50;
            })
          );
          if (o.length > 0) {
            const i = o.sort((s, a) => (a.priority || 0) - (s.priority || 0))[0];
            b = i.brand, w = i.model, M = 0.65;
          } else
            w = "Windows PC", M = 0.4;
        } else
          w = "Windows PC", M = 0.4;
      else if (g.includes("macOS"))
        if (b = "Apple", f > 0 && m > 0) {
          const o = e.filter(
            (i) => (i.os?.name === "macos" || i.os?.name === "mac os") && (i.type === "laptop" || i.type === "desktop") && i.resolutions?.some((s) => {
              const a = Math.abs(s.w - f), d = Math.abs(s.h - m);
              return a <= 50 && d <= 50;
            })
          );
          if (o.length > 0) {
            let i = o[0];
            if (x) {
              const s = o.filter(
                (a) => a.dpr && Math.abs(a.dpr - x) < 0.2
              );
              s.length > 0 ? i = s.sort((a, d) => (d.priority || 0) - (a.priority || 0))[0] : i = o.sort((a, d) => (d.priority || 0) - (a.priority || 0))[0];
            } else
              i = o.sort((s, a) => (a.priority || 0) - (s.priority || 0))[0];
            b = i.brand, w = i.model, M = x && i.dpr ? 0.75 : 0.65;
          } else
            w = "Mac", M = 0.4;
        } else
          w = "Mac", M = 0.4;
      else if (g.includes("Linux"))
        b = "Linux", w = "PC", M = 0.35;
      else if (g.includes("Android")) {
        if (b = "Android", w = "Device", f > 0 && m > 0) {
          const o = e.filter(
            (i) => i.os?.name === "android" && i.resolutions?.some((s) => {
              const a = Math.abs(s.w - f), d = Math.abs(s.h - m);
              return a <= 20 && d <= 20;
            })
          );
          if (o.length > 0) {
            const i = o.sort((s, a) => (a.priority || 0) - (s.priority || 0))[0];
            b = i.brand, w = i.model, M = 0.6;
          }
        }
      } else if (g.includes("iOS"))
        if (b = "Apple", f > 0 && m > 0 && x) {
          const o = e.filter(
            (i) => (i.os?.name === "ios" || i.os?.name === "ipados") && i.resolutions?.some((s) => {
              const a = Math.abs(s.w - f), d = Math.abs(s.h - m);
              return a <= 10 && d <= 10;
            }) && (!i.dpr || Math.abs(i.dpr - x) < 0.2)
          );
          if (o.length > 0) {
            const i = o.sort((s, a) => (a.priority || 0) - (s.priority || 0))[0];
            b = i.brand, w = i.model, M = 0.75;
          } else
            w = c === "tablet" ? "iPad" : "iPhone", M = 0.5;
        } else
          w = c === "tablet" ? "iPad" : "iPhone", M = 0.45;
    }
    return {
      brand: b,
      model: w,
      confidence: Math.max(0.3, M),
      matchedRuleIds: [],
      os: g,
      deviceType: c,
      browser: B,
      rawUA: p
    };
  }
  async function v(p, f, m, u) {
    const S = {
      ...u?.extra,
      pixelRatio: u?.pixelRatio || (typeof window < "u" ? window.devicePixelRatio : void 0)
    }, y = h(p, f, m, S);
    let c = u?.canvas, g = u?.webgl, B = u?.fonts, x = u?.audio, b = u?.mediaDevices;
    u?.autoCollect !== !1 && typeof document < "u" && (c || (c = G()), g || (g = q()), B || (B = N()), x || (x = await V()), b || (b = await K()));
    const w = u?.hardwareConcurrency || (typeof navigator < "u" ? navigator.hardwareConcurrency : void 0), M = u?.deviceMemory || (typeof navigator < "u" && navigator.deviceMemory ? navigator.deviceMemory : void 0), o = {
      device: y,
      screen: {
        width: f,
        height: m,
        colorDepth: u?.colorDepth || (typeof screen < "u" ? screen.colorDepth : void 0),
        pixelRatio: u?.pixelRatio || (typeof window < "u" ? window.devicePixelRatio : void 0)
      },
      timezone: u?.timezone || (typeof Intl < "u" ? Intl.DateTimeFormat().resolvedOptions().timeZone : void 0),
      platform: u?.platform || (typeof navigator < "u" ? navigator.platform : void 0),
      plugins: u?.plugins || (typeof navigator < "u" && navigator.plugins ? Array.from(navigator.plugins).map((i) => i.name).sort() : void 0),
      canvas: c,
      webgl: g,
      fonts: B,
      audio: x,
      mediaDevices: b,
      hardwareConcurrency: w,
      deviceMemory: M,
      extra: u?.extra
    };
    return re(o);
  }
  return {
    detectDevice: h,
    addRule: t,
    loadModelDB: r,
    clearDB: l,
    generateDeviceFingerprint: v,
    detectBrowser: U,
    getCanvasFingerprint: G,
    getWebGLFingerprint: q,
    getFontFingerprint: N,
    getAudioFingerprint: V,
    getMediaDevicesFingerprint: K,
    _db: e
  };
}
const ce = ae([]), W = /* @__PURE__ */ new Set();
function de(n) {
  return (n || "").trim().toLowerCase();
}
function X(n) {
  n.map(de).filter((e) => !!e).forEach((e) => {
    if (W.has(e)) return;
    const t = C.findDevicesByBrand(e);
    t.length && (ce.loadModelDB(t), W.add(e));
  });
}
async function Q() {
  X(C.getLoadedBrands());
}
async function le(n, e) {
  const t = await C.loadDevicesForUA(n, e);
  X(t), !t.length && e?.fallbackLoadAll && await Q();
}
async function pe() {
  await C.initialize({ preloadAll: !0 }), await Q();
}
async function fe() {
  typeof navigator < "u" && navigator.userAgent ? await le(navigator.userAgent, { fallbackLoadAll: !0 }) : await pe();
}
fe().catch(console.error);
export {
  ae as createDetector,
  ce as detector,
  C as deviceLoader,
  pe as preloadAllDevices,
  le as prepareDetectorForUA
};
