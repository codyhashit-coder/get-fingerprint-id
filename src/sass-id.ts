// --------------------------- Types ---------------------------
export type DeviceType = 'mobile' | 'tablet' | 'desktop' | 'tv' | 'phone' | 'laptop' | 'unknown';

export interface ModelRule {
  id?: string;
  brand: string;
  model: string;
  uaContains?: string[];
  uaRegex?: string[];
  resolutions?: Array<{ w: number; h: number; ratio?: string }>;
  dpr?: number;
  priority?: number;
  type?: DeviceType;
  notes?: string;
  series?: string;
  year?: number;
  os?: {
    name: 'android' | 'ios' | 'ipados' | 'windows' | 'harmonyos' | 'macos' | 'mac os';
    minVersion?: string;
  };
  cpu?: {
    brand: string;
    model: string;
  };
}

type PreparedRule = ModelRule & {
  _prepared?: true;
  uaContainsLower?: string[];
  uaRegexObjects?: RegExp[];
  modelLower?: string;
  brandLower?: string;
};

function prepareRule(rule: ModelRule): PreparedRule {
  if ((rule as PreparedRule)._prepared) {
    return rule as PreparedRule;
  }

  const uaContainsLower = rule.uaContains?.map(s => s.toLowerCase());
  const uaRegexObjects = rule.uaRegex
    ?.map(pattern => {
      try {
        return new RegExp(pattern, 'i');
      } catch (error) {
        console.warn(`Invalid UA regex pattern "${pattern}" for rule ${rule.id || rule.model}:`, error);
        return undefined;
      }
    })
    .filter((regex): regex is RegExp => Boolean(regex));

  return {
    ...rule,
    _prepared: true,
    uaContainsLower,
    uaRegexObjects,
    modelLower: rule.model?.toLowerCase(),
    brandLower: rule.brand.toLowerCase()
  };
}

export interface BrowserInfo {
  name: string;
  version: string;
  engine?: string;
  engineVersion?: string;
}

export interface DetectionResult {
  brand?: string;
  model?: string;
  confidence: number;
  matchedRuleIds: string[];
  os?: string;
  deviceType: DeviceType;
  browser?: BrowserInfo;
  rawUA: string;
}

export interface FingerprintData {
  device: DetectionResult;
  screen: {
    width: number;
    height: number;
    colorDepth?: number;
    pixelRatio?: number;
  };
  timezone?: string;
  platform?: string;
  plugins?: string[];
  canvas?: string;
  webgl?: string;
  fonts?: string;
  audio?: string;
  mediaDevices?: string;
  hardwareConcurrency?: number;
  deviceMemory?: number;
  extra?: { [k: string]: any };
}

// --------------------------- Utility ---------------------------
function safeLower(s?: string) { return (s || '').toLowerCase(); }

function resolutionMatch(screenW: number, screenH: number, rule: ModelRule) {
  if (!rule.resolutions || !rule.resolutions.length) return false;
  return rule.resolutions.some(r => r.w === screenW && r.h === screenH);
}

function dprMatch(devicePixelRatio: number | undefined, rule: ModelRule) {
  if (devicePixelRatio === undefined || rule.dpr === undefined) return true; // 如果没有DPR信息，不扣分
  const diff = Math.abs(devicePixelRatio - rule.dpr);
  return diff < 0.1; // 允许0.1的误差
}

function osMatch(detectedOS: string | undefined, rule: ModelRule) {
  if (!detectedOS || !rule.os) return true; // 如果没有OS信息，不扣分
  const osName = rule.os.name.toLowerCase();
  const detectedOSLower = detectedOS.toLowerCase();
  
  if (osName === 'ios' || osName === 'ipados') {
    return detectedOSLower.includes('ios');
  }
  if (osName === 'android') {
    return detectedOSLower.includes('android');
  }
  if (osName === 'windows') {
    return detectedOSLower.includes('windows');
  }
  if (osName === 'macos' || osName === 'mac os') {
    return detectedOSLower.includes('macos') || detectedOSLower.includes('mac os');
  }
  if (osName === 'harmonyos') {
    return detectedOSLower.includes('harmony') || detectedOSLower.includes('harmonyos');
  }
  return true;
}

function guessDeviceTypeFromUA(ua: string): DeviceType {
  const a = ua.toLowerCase();
  if (/mobile|android|iphone|ipad|phone|blackberry|iemobile|mobi/.test(a)) {
    if (/ipad|tablet/.test(a)) return 'tablet';
    return 'mobile';
  }
  if (/tv|smarttv|googletv|appletv|hbbtv|pov-tv/.test(a)) return 'tv';
  // 尝试识别笔记本电脑
  if (/macbook|laptop|notebook|thinkpad|yoga|surface book|surface laptop/.test(a)) {
    return 'laptop';
  }
  return 'desktop';
}

// --------------------------- Browser Detection ---------------------------
function detectBrowser(ua: string): BrowserInfo | undefined {
  const browsers = [
    // 先检测特殊的浏览器，避免被 Chrome 误判
    { name: 'GSA', regex: /GSA\/([0-9\.]+)/i, engine: 'WebKit' },
    { name: 'Edge', regex: /edg(?:e|ios|a)\/([0-9\.]+)/i, engine: 'Blink' },
    { name: 'Opera', regex: /(?:opera|opr)\/([0-9\.]+)/i, engine: 'Blink' },
    { name: 'Chrome', regex: /chrome\/([0-9\.]+)/i, engine: 'Blink' },
    { name: 'Safari', regex: /version\/([0-9\.]+).*safari/i, engine: 'WebKit' },
    { name: 'Firefox', regex: /firefox\/([0-9\.]+)/i, engine: 'Gecko' },
    { name: 'IE', regex: /(?:msie |trident.*rv:)([0-9\.]+)/i, engine: 'Trident' },
    { name: 'Samsung Browser', regex: /samsungbrowser\/([0-9\.]+)/i, engine: 'Blink' },
    { name: 'UC Browser', regex: /ucbrowser\/([0-9\.]+)/i, engine: 'Blink' },
    { name: 'QQ Browser', regex: /(?:qqbrowser|mqqbrowser)\/([0-9\.]+)/i, engine: 'Blink' },
    { name: 'WeChat', regex: /micromessenger\/([0-9\.]+)/i, engine: 'Blink' },
    { name: 'Baidu', regex: /baidubrowser\/([0-9\.]+)/i, engine: 'Blink' },
  ];

  const lowerUA = ua.toLowerCase();
  
  for (const browser of browsers) {
    const match = lowerUA.match(browser.regex);
    if (match) {
      // 获取引擎版本
      let engineVersion: string | undefined;
      if (browser.engine === 'Blink' || browser.engine === 'WebKit') {
        const webkitMatch = lowerUA.match(/applewebkit\/([0-9\.]+)/i);
        engineVersion = webkitMatch ? webkitMatch[1] : undefined;
      } else if (browser.engine === 'Gecko') {
        const geckoMatch = lowerUA.match(/rv:([0-9\.]+)/i);
        engineVersion = geckoMatch ? geckoMatch[1] : undefined;
      }

      return {
        name: browser.name,
        version: match[1],
        engine: browser.engine,
        engineVersion
      };
    }
  }

  return undefined;
}

function detectOSFromUA(ua: string) {
  const a = ua.toLowerCase();
  if (/android/.test(a)) {
    const m = a.match(/android\s*([0-9\._]+)/);
    return m ? `Android ${m[1].replace(/_/g, '.')}` : 'Android';
  }
  if (/iphone|ipad|ipod/.test(a)) {
    const m = a.match(/os\s*([0-9\_]+)/i);
    return m ? `iOS ${m[1].replace(/_/g, '.')}` : 'iOS';
  }
  if (/windows nt/.test(a)) {
    const m = a.match(/windows nt ([0-9\.]+)/i);
    if (m) {
      const versionMap: { [key: string]: string } = {
        '10.0': '10/11',
        '6.3': '8.1',
        '6.2': '8',
        '6.1': '7',
        '6.0': 'Vista'
      };
      return `Windows ${versionMap[m[1]] || m[1]}`;
    }
    return 'Windows';
  }
  if (/mac os x/.test(a)) {
    const m = a.match(/mac os x ([0-9_\.]+)/i);
    return m ? `macOS ${m[1].replace(/_/g, '.')}` : 'macOS';
  }
  if (/linux/.test(a)) return 'Linux';
  return undefined;
}

// --------------------------- Canvas & WebGL Fingerprint ---------------------------
function getCanvasFingerprint(): string {
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    canvas.width = 200;
    canvas.height = 50;

    // 绘制文本
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillStyle = '#f60';
    ctx.fillRect(125, 1, 62, 20);
    
    ctx.fillStyle = '#069';
    ctx.fillText('Canvas Fingerprint 🎨', 2, 15);
    
    ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
    ctx.fillText('Canvas Fingerprint 🎨', 4, 17);

    // 获取图像数据
    return canvas.toDataURL();
  } catch (e) {
    return '';
  }
}

// --------------------------- Font Fingerprint ---------------------------
function getFontFingerprint(): string {
  try {
    if (typeof document === 'undefined') return '';
    
    const baseFonts = ['monospace', 'sans-serif', 'serif'];
    const testFonts = [
      'Arial', 'Verdana', 'Times New Roman', 'Courier New', 'Georgia',
      'Palatino', 'Garamond', 'Bookman', 'Comic Sans MS', 'Trebuchet MS',
      'Impact', 'Arial Black', 'Tahoma', 'Century Gothic', 'Lucida Console',
      'Microsoft YaHei', 'SimSun', 'SimHei', 'KaiTi', 'FangSong'
    ];
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';
    
    canvas.width = 200;
    canvas.height = 50;
    
    const testString = 'mmmmmmmmmmlli';
    const testSize = '72px';
    const baseWidths: { [key: string]: number } = {};
    
    // 测量基础字体宽度
    baseFonts.forEach(baseFont => {
      ctx.font = `${testSize} ${baseFont}`;
      baseWidths[baseFont] = ctx.measureText(testString).width;
    });
    
    // 检测可用字体
    const availableFonts: string[] = [];
    testFonts.forEach(font => {
      let detected = false;
      baseFonts.forEach(baseFont => {
        ctx.font = `${testSize} ${font}, ${baseFont}`;
        const width = ctx.measureText(testString).width;
        if (width !== baseWidths[baseFont]) {
          detected = true;
        }
      });
      if (detected) {
        availableFonts.push(font);
      }
    });
    
    return availableFonts.sort().join(',');
  } catch (e) {
    return '';
  }
}

// --------------------------- Audio Fingerprint ---------------------------
async function getAudioFingerprint(): Promise<string> {
  try {
    if (typeof AudioContext === 'undefined' && typeof (window as any).webkitAudioContext === 'undefined') {
      return '';
    }
    
    const AudioContextClass = AudioContext || (window as any).webkitAudioContext;
    const context = new AudioContextClass();
    const oscillator = context.createOscillator();
    const analyser = context.createAnalyser();
    const gainNode = context.createGain();
    const scriptProcessor = context.createScriptProcessor(4096, 1, 1);
    
    gainNode.gain.value = 0; // 静音
    oscillator.type = 'triangle';
    oscillator.connect(analyser);
    analyser.connect(scriptProcessor);
    scriptProcessor.connect(gainNode);
    gainNode.connect(context.destination);
    
    oscillator.start(0);
    
    return new Promise<string>((resolve) => {
      scriptProcessor.onaudioprocess = (event) => {
        const output = event.inputBuffer.getChannelData(0);
        const hash = Array.from(output.slice(0, 100))
          .map(v => Math.abs(v).toString(36).substring(2, 5))
          .join('');
        
        oscillator.stop();
        context.close();
        resolve(hash);
      };
      
      // 超时保护
      setTimeout(() => {
        try {
          oscillator.stop();
          context.close();
        } catch (e) {}
        resolve('');
      }, 100);
    });
  } catch (e) {
    return '';
  }
}

// --------------------------- Media Devices Fingerprint ---------------------------
async function getMediaDevicesFingerprint(): Promise<string> {
  try {
    if (typeof navigator === 'undefined' || !navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      return '';
    }
    
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const deviceInfo = devices
        .map(device => `${device.kind}:${device.deviceId.substring(0, 20)}`)
        .sort()
        .join('|');
      return deviceInfo;
    } catch (e) {
      return '';
    }
  } catch (e) {
    return '';
  }
}

function getWebGLFingerprint(): string {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null;
    if (!gl) return '';

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    const vendor = debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : '';
    const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : '';
    
    const webglInfo = [
      vendor,
      renderer,
      gl.getParameter(gl.VERSION),
      gl.getParameter(gl.SHADING_LANGUAGE_VERSION),
      gl.getParameter(gl.MAX_TEXTURE_SIZE),
      gl.getParameter(gl.MAX_VERTEX_ATTRIBS)
    ].join('|');

    return webglInfo;
  } catch (e) {
    return '';
  }
}

// --------------------------- Fingerprint Generation ---------------------------
async function generateFingerprint(data: FingerprintData): Promise<string> {
  // 收集所有指纹数据（按重要性排序）
  const components = [
    data.device.brand || 'unknown',
    data.device.model || 'unknown',
    data.device.os || 'unknown',
    data.device.browser?.name || 'unknown',
    data.device.browser?.version || 'unknown',
    data.device.browser?.engine || 'unknown',
    data.device.browser?.engineVersion || 'unknown',
    data.device.deviceType,
    `${data.screen.width}x${data.screen.height}`,
    data.screen.colorDepth?.toString() || '',
    data.screen.pixelRatio?.toString() || '',
    data.timezone || '',
    data.platform || '',
    (data.plugins || []).join(','),
    data.canvas || '',
    data.webgl || '',
    data.fonts || '',
    data.audio || '',
    data.mediaDevices || '',
    data.hardwareConcurrency?.toString() || '',
    data.deviceMemory?.toString() || ''
  ];
  
  // 添加额外数据
  if (data.extra) {
    Object.keys(data.extra).sort().forEach(key => {
      components.push(`${key}:${JSON.stringify(data.extra![key])}`);
    });
  }

  const fingerprint = components.join('|');
  
  // 使用 SubtleCrypto API 生成 SHA-256 哈希
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(fingerprint);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (e) {
      // Fallback to simple hash if crypto API is not available
    }
  }
  
  // 简单哈希作为降级方案
  return simpleHash(fingerprint);
}

function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16).padStart(16, '0');
}

// --------------------------- Core Detector ---------------------------
export function createDetector(initialDB: ModelRule[] = []) {
  const db: PreparedRule[] = initialDB.map(prepareRule);

  function addRule(rule: ModelRule) { db.push(prepareRule(rule)); }
  function loadModelDB(rules: ModelRule[]) { db.push(...rules.map(prepareRule)); }
  function clearDB() { db.length = 0; }

  function detectDevice(
    ua: string, 
    screenW: number, 
    screenH: number, 
    extra?: { [k: string]: any }
  ): DetectionResult {
    const lowerUA = safeLower(ua);
    const candidates: Array<{ 
      rule: PreparedRule, 
      score: number, 
      uaMatch: boolean, 
      resolutionMatch: boolean,
      dprMatch: boolean,
      osMatch: boolean,
      deviceTypeMatch: boolean
    }> = [];

    // 检测设备类型和操作系统
    const detectedDeviceType = guessDeviceTypeFromUA(ua);
    const osInfo = detectOSFromUA(ua);
    const browserInfo = detectBrowser(ua);
    const devicePixelRatio = extra?.pixelRatio || (typeof window !== 'undefined' ? window.devicePixelRatio : undefined);

    // 第一阶段：尝试查找UA精确匹配
    for (const rule of db) {
      let score = 0;
      let uaMatched = false;
      let resolutionMatched = false;
      let dprMatched = true;
      let osMatched = true;
      let deviceTypeMatched = false;

      // 检查 UA 包含
      const uaContains = rule.uaContainsLower;
      if (uaContains && uaContains.length > 0) {
        const uaMatch = uaContains.some(s => lowerUA.includes(s));
        if (uaMatch) {
          score += 40; // 提高UA匹配权重
          uaMatched = true;
        } else {
          continue; // 如果有uaContains但没匹配，跳过
        }
      }

      // 检查 UA 正则
      const uaRegexList = rule.uaRegexObjects;
      if (!uaMatched && uaRegexList && uaRegexList.length > 0) {
        const regexMatch = uaRegexList.some(regex => regex.test(ua));
        if (regexMatch) {
          score += 40;
          uaMatched = true;
        }
      }

      // 如果有 UA 匹配，检查其他特征
      if (uaMatched) {
        // 检查分辨率
        if (rule.resolutions?.length) {
          resolutionMatched = resolutionMatch(screenW, screenH, rule);
          if (!resolutionMatched) {
            // 对于电脑和平板，允许更大的分辨率误差
            const isLaptopOrDesktop = rule.type === 'laptop' || rule.type === 'desktop';
            const isTablet = rule.type === 'tablet';
            if (isLaptopOrDesktop || isTablet) {
              // 检查是否在容差范围内
              const tolerance = isLaptopOrDesktop ? 50 : 20;
              const withinTolerance = rule.resolutions.some(r => {
                const wDiff = Math.abs(r.w - screenW);
                const hDiff = Math.abs(r.h - screenH);
                return wDiff <= tolerance && hDiff <= tolerance;
              });
              if (withinTolerance) {
                resolutionMatched = true;
                score += 15; // 在容差范围内，但分数稍低
              } else {
                score -= 10; // 分辨率不匹配扣分，但不直接跳过
              }
            } else {
              score -= 10; // 分辨率不匹配扣分，但不直接跳过
            }
          } else {
            score += 20;
          }
        }

        // 检查DPR
        dprMatched = dprMatch(devicePixelRatio, rule);
        if (!dprMatched) {
          score -= 5;
        } else if (rule.dpr !== undefined) {
          score += 10;
        }

        // 检查操作系统
        osMatched = osMatch(osInfo, rule);
        if (!osMatched) {
          score -= 10;
        } else if (rule.os) {
          score += 10;
        }

        // 检查设备类型
        if (rule.type) {
          deviceTypeMatched = rule.type === detectedDeviceType || 
            (rule.type === 'phone' && detectedDeviceType === 'mobile') ||
            (rule.type === 'mobile' && detectedDeviceType === 'phone') ||
            (rule.type === 'laptop' && detectedDeviceType === 'desktop') || // laptop和desktop互相兼容
            (rule.type === 'desktop' && detectedDeviceType === 'laptop'); // desktop和laptop互相兼容
          if (deviceTypeMatched) {
            score += 10;
          } else {
            score -= 5;
          }
        }

        // 设备类型启发式匹配
        const modelLower = rule.modelLower;
        const isLikelyMatch = !!modelLower && (
          (modelLower.includes('mac') && (detectedDeviceType === 'desktop' || detectedDeviceType === 'laptop')) ||
          (modelLower.includes('macbook') && (detectedDeviceType === 'desktop' || detectedDeviceType === 'laptop')) ||
          (modelLower.includes('iphone') && (detectedDeviceType === 'mobile' || detectedDeviceType === 'phone')) ||
          (modelLower.includes('ipad') && detectedDeviceType === 'tablet') ||
          (modelLower.includes('laptop') && (detectedDeviceType === 'desktop' || detectedDeviceType === 'laptop'))
        );
        if (isLikelyMatch) {
          score += 5;
        }

        // 优先级加分
        if (rule.priority) {
          score += Math.min(rule.priority / 100, 20); // 限制优先级影响
        }

        candidates.push({ 
          rule, 
          score, 
          uaMatch: uaMatched, 
          resolutionMatch: resolutionMatched,
          dprMatch: dprMatched,
          osMatch: osMatched,
          deviceTypeMatch: deviceTypeMatched
        });
      }
    }

    // 第二阶段：如果没有UA匹配，尝试基于硬件特征匹配（分辨率+DPR+OS+设备类型）
    if (candidates.length === 0) {
      for (const rule of db) {
        let score = 0;
        let resolutionMatched = false;
        let dprMatched = true;
        let osMatched = true;
        let deviceTypeMatched = false;

        // 必须匹配分辨率（如果规则有定义）
        if (rule.resolutions?.length) {
          resolutionMatched = resolutionMatch(screenW, screenH, rule);
          if (!resolutionMatched) continue; // 分辨率必须匹配
          score += 30; // 分辨率匹配是核心特征
        } else {
          // 如果没有分辨率定义，跳过（避免误匹配）
          continue;
        }

        // 检查DPR
        dprMatched = dprMatch(devicePixelRatio, rule);
        if (rule.dpr !== undefined) {
          if (dprMatched) {
            score += 25; // DPR匹配很重要
          } else {
            score -= 15; // DPR不匹配扣分，但不直接跳过
          }
        }

        // 检查操作系统
        osMatched = osMatch(osInfo, rule);
        if (rule.os) {
          if (osMatched) {
            score += 20;
          } else {
            continue; // OS不匹配直接跳过
          }
        } else if (osInfo) {
          // 如果没有定义OS，但检测到了OS，给一些基础分
          score += 5;
        }

        // 检查设备类型
        if (rule.type) {
          deviceTypeMatched = rule.type === detectedDeviceType || 
            (rule.type === 'phone' && detectedDeviceType === 'mobile') ||
            (rule.type === 'mobile' && detectedDeviceType === 'phone') ||
            (rule.type === 'laptop' && detectedDeviceType === 'desktop') || // laptop和desktop互相兼容
            (rule.type === 'desktop' && detectedDeviceType === 'laptop'); // desktop和laptop互相兼容
          if (deviceTypeMatched) {
            score += 15;
          } else {
            continue; // 设备类型不匹配跳过
          }
        }

        // 品牌和型号的启发式匹配
        if (osInfo) {
          const brandLower = rule.brandLower;
          if (osInfo.includes('iOS') && brandLower === 'apple') {
            score += 10;
          } else if (osInfo.includes('Android') && brandLower !== 'apple') {
            score += 5;
          }
        }

        // 优先级加分
        if (rule.priority) {
          score += Math.min(rule.priority / 100, 15);
        }

        candidates.push({ 
          rule, 
          score, 
          uaMatch: false, 
          resolutionMatch: resolutionMatched,
          dprMatch: dprMatched,
          osMatch: osMatched,
          deviceTypeMatch: deviceTypeMatched
        });
      }
    }

    // 第三阶段：如果还是没有匹配，尝试基于操作系统和分辨率范围匹配
    if (candidates.length === 0 && osInfo) {
      for (const rule of db) {
        let score = 0;

        // 操作系统必须匹配
        const osMatched = osMatch(osInfo, rule);
        if (!osMatched || !rule.os) continue;

        // 分辨率范围匹配（允许一定误差）
        if (rule.resolutions?.length) {
          const resolutionMatched = rule.resolutions.some(r => {
            const wDiff = Math.abs(r.w - screenW);
            const hDiff = Math.abs(r.h - screenH);
            // 对于电脑和平板，允许更大的误差（因为可能有缩放）
            const isLaptopOrDesktop = rule.type === 'laptop' || rule.type === 'desktop';
            const tolerance = isLaptopOrDesktop ? 50 : 10;
            return wDiff <= tolerance && hDiff <= tolerance;
          });
          if (!resolutionMatched) continue;
          score += 20;
        }

        // 设备类型匹配
        if (rule.type) {
          const deviceTypeMatched = rule.type === detectedDeviceType || 
            (rule.type === 'phone' && detectedDeviceType === 'mobile') ||
            (rule.type === 'mobile' && detectedDeviceType === 'phone') ||
            (rule.type === 'laptop' && detectedDeviceType === 'desktop') || // laptop和desktop互相兼容
            (rule.type === 'desktop' && detectedDeviceType === 'laptop'); // desktop和laptop互相兼容
          if (deviceTypeMatched) {
            score += 10;
          } else {
            continue;
          }
        }

        // DPR匹配
        const dprMatched = dprMatch(devicePixelRatio, rule);
        if (rule.dpr !== undefined && dprMatched) {
          score += 15;
        }

        score += 5; // 基础分

        candidates.push({ 
          rule, 
          score, 
          uaMatch: false, 
          resolutionMatch: true,
          dprMatch: dprMatched,
          osMatch: osMatched,
          deviceTypeMatch: true
        });
      }
    }

    // 按分数排序
    candidates.sort((a, b) => b.score - a.score);

    if (candidates.length > 0) {
      const top = candidates[0];
      const matchedRuleIds = candidates
        .filter(c => c.score >= top.score * 0.7) // 降低阈值，允许更多候选
        .map(c => c.rule.id || `${c.rule.brand}:${c.rule.model}`);

      // 计算置信度
      let confidence = top.uaMatch ? 0.85 : 0.65; // UA匹配时基础置信度更高
      
      // 根据匹配特征数量调整
      let matchCount = 0;
      if (top.resolutionMatch) matchCount++;
      if (top.dprMatch && top.rule.dpr !== undefined) matchCount++;
      if (top.osMatch && top.rule.os) matchCount++;
      if (top.deviceTypeMatch && top.rule.type) matchCount++;
      
      confidence += matchCount * 0.05; // 每个匹配特征加5%
      
      // 根据分数调整
      confidence = Math.min(0.98, confidence + Math.min(top.score / 300, 0.1));
      
      // 如果分数差距大，提高置信度
      if (candidates.length > 1) {
        const scoreGap = top.score - candidates[1].score;
        if (scoreGap > 20) {
          confidence = Math.min(0.98, confidence + 0.05);
        } else if (scoreGap < 5 && candidates.length > 1) {
          confidence = Math.max(0.5, confidence - 0.1); // 分数接近时降低置信度
        }
      }

      return {
        brand: top.rule.brand,
        model: top.rule.model,
        confidence: Math.min(0.98, Math.max(0.5, confidence)),
        matchedRuleIds,
        os: osInfo,
        deviceType: detectedDeviceType,
        browser: browserInfo,
        rawUA: ua
      };
    }

    // 降级方案：基于操作系统猜测
    let brand = 'unknown';
    let model = 'unknown';
    let confidence = 0.3;

    if (osInfo) {
      if (osInfo.includes('Windows')) {
        brand = 'Windows';
        // 尝试根据分辨率匹配Windows设备（包括笔记本电脑）
        if (screenW > 0 && screenH > 0) {
          const windowsCandidates = db.filter(r => 
            r.os?.name === 'windows' && 
            (r.type === 'laptop' || r.type === 'desktop') &&
            r.resolutions?.some(res => {
              const wDiff = Math.abs(res.w - screenW);
              const hDiff = Math.abs(res.h - screenH);
              // 电脑分辨率允许更大的误差（因为可能有缩放）
              return wDiff <= 50 && hDiff <= 50;
            })
          );
          if (windowsCandidates.length > 0) {
            const best = windowsCandidates.sort((a, b) => (b.priority || 0) - (a.priority || 0))[0];
            brand = best.brand;
            model = best.model;
            confidence = 0.65;
          } else {
            model = 'Windows PC';
            confidence = 0.4;
          }
        } else {
          model = 'Windows PC';
          confidence = 0.4;
        }
      } else if (osInfo.includes('macOS')) {
        brand = 'Apple';
        // 尝试根据分辨率和DPR匹配MacBook型号
        if (screenW > 0 && screenH > 0) {
          const macCandidates = db.filter(r => 
            (r.os?.name === 'macos' || r.os?.name === 'mac os') && 
            (r.type === 'laptop' || r.type === 'desktop') &&
            r.resolutions?.some(res => {
              const wDiff = Math.abs(res.w - screenW);
              const hDiff = Math.abs(res.h - screenH);
              // 电脑分辨率允许更大的误差（因为可能有缩放）
              return wDiff <= 50 && hDiff <= 50;
            })
          );
          if (macCandidates.length > 0) {
            // 如果DPR可用，优先匹配DPR
            let best = macCandidates[0];
            if (devicePixelRatio) {
              const dprMatches = macCandidates.filter(r => 
                r.dpr && Math.abs(r.dpr - devicePixelRatio) < 0.2
              );
              if (dprMatches.length > 0) {
                best = dprMatches.sort((a, b) => (b.priority || 0) - (a.priority || 0))[0];
              } else {
                best = macCandidates.sort((a, b) => (b.priority || 0) - (a.priority || 0))[0];
              }
            } else {
              best = macCandidates.sort((a, b) => (b.priority || 0) - (a.priority || 0))[0];
            }
            brand = best.brand;
            model = best.model;
            confidence = devicePixelRatio && best.dpr ? 0.75 : 0.65; // 有DPR匹配时置信度更高
          } else {
            model = 'Mac';
            confidence = 0.4;
          }
        } else {
          model = 'Mac';
          confidence = 0.4;
        }
      } else if (osInfo.includes('Linux')) {
        brand = 'Linux';
        model = 'PC';
        confidence = 0.35;
      } else if (osInfo.includes('Android')) {
        brand = 'Android';
        model = 'Device';
        // 尝试根据分辨率猜测Android设备
        if (screenW > 0 && screenH > 0) {
          const androidCandidates = db.filter(r => 
            r.os?.name === 'android' && 
            r.resolutions?.some(res => {
              const wDiff = Math.abs(res.w - screenW);
              const hDiff = Math.abs(res.h - screenH);
              return wDiff <= 20 && hDiff <= 20;
            })
          );
          if (androidCandidates.length > 0) {
            const best = androidCandidates.sort((a, b) => (b.priority || 0) - (a.priority || 0))[0];
            brand = best.brand;
            model = best.model;
            confidence = 0.6; // 基于分辨率匹配的置信度
          }
        }
      } else if (osInfo.includes('iOS')) {
        brand = 'Apple';
        // 尝试根据分辨率和DPR猜测iOS设备
        if (screenW > 0 && screenH > 0 && devicePixelRatio) {
          const iosCandidates = db.filter(r => 
            (r.os?.name === 'ios' || r.os?.name === 'ipados') && 
            r.resolutions?.some(res => {
              const wDiff = Math.abs(res.w - screenW);
              const hDiff = Math.abs(res.h - screenH);
              return wDiff <= 10 && hDiff <= 10;
            }) &&
            (!r.dpr || Math.abs(r.dpr - devicePixelRatio) < 0.2)
          );
          if (iosCandidates.length > 0) {
            const best = iosCandidates.sort((a, b) => (b.priority || 0) - (a.priority || 0))[0];
            brand = best.brand;
            model = best.model;
            confidence = 0.75; // iOS设备分辨率+DPR匹配准确率较高
          } else {
            model = detectedDeviceType === 'tablet' ? 'iPad' : 'iPhone';
            confidence = 0.5;
          }
        } else {
          model = detectedDeviceType === 'tablet' ? 'iPad' : 'iPhone';
          confidence = 0.45;
        }
      }
    }

    return {
      brand,
      model,
      confidence: Math.max(0.3, confidence),
      matchedRuleIds: [],
      os: osInfo,
      deviceType: detectedDeviceType,
      browser: browserInfo,
      rawUA: ua
    };
  }

  async function generateDeviceFingerprint(
    ua: string,
    screenW: number,
    screenH: number,
    options?: {
      colorDepth?: number;
      pixelRatio?: number;
      timezone?: string;
      platform?: string;
      plugins?: string[];
      canvas?: string;
      webgl?: string;
      fonts?: string;
      audio?: string;
      mediaDevices?: string;
      hardwareConcurrency?: number;
      deviceMemory?: number;
      extra?: { [k: string]: any };
      autoCollect?: boolean; // 自动收集所有指纹
    }
  ): Promise<string> {
    // 将pixelRatio传递给detectDevice用于匹配
    const extraWithPixelRatio = {
      ...options?.extra,
      pixelRatio: options?.pixelRatio || (typeof window !== 'undefined' ? window.devicePixelRatio : undefined)
    };
    
    const device = detectDevice(ua, screenW, screenH, extraWithPixelRatio);
    
    // 如果 autoCollect 为 true，自动生成所有指纹
    let canvasFingerprint = options?.canvas;
    let webglFingerprint = options?.webgl;
    let fontFingerprint = options?.fonts;
    let audioFingerprint = options?.audio;
    let mediaDevicesFingerprint = options?.mediaDevices;
    
    if (options?.autoCollect !== false && typeof document !== 'undefined') {
      // 默认自动收集（除非明确设置为false）
      if (!canvasFingerprint) {
        canvasFingerprint = getCanvasFingerprint();
      }
      if (!webglFingerprint) {
        webglFingerprint = getWebGLFingerprint();
      }
      if (!fontFingerprint) {
        fontFingerprint = getFontFingerprint();
      }
      if (!audioFingerprint) {
        audioFingerprint = await getAudioFingerprint();
      }
      if (!mediaDevicesFingerprint) {
        mediaDevicesFingerprint = await getMediaDevicesFingerprint();
      }
    }
    
    // 收集硬件信息
    const hardwareConcurrency = options?.hardwareConcurrency || 
      (typeof navigator !== 'undefined' ? navigator.hardwareConcurrency : undefined);
    const deviceMemory = options?.deviceMemory || 
      (typeof navigator !== 'undefined' && (navigator as any).deviceMemory ? 
        (navigator as any).deviceMemory : undefined);
    
    const fingerprintData: FingerprintData = {
      device,
      screen: {
        width: screenW,
        height: screenH,
        colorDepth: options?.colorDepth || (typeof screen !== 'undefined' ? screen.colorDepth : undefined),
        pixelRatio: options?.pixelRatio || (typeof window !== 'undefined' ? window.devicePixelRatio : undefined)
      },
      timezone: options?.timezone || (typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : undefined),
      platform: options?.platform || (typeof navigator !== 'undefined' ? navigator.platform : undefined),
      plugins: options?.plugins || (typeof navigator !== 'undefined' && navigator.plugins ? 
        Array.from(navigator.plugins).map(p => p.name).sort() : undefined),
      canvas: canvasFingerprint,
      webgl: webglFingerprint,
      fonts: fontFingerprint,
      audio: audioFingerprint,
      mediaDevices: mediaDevicesFingerprint,
      hardwareConcurrency,
      deviceMemory,
      extra: options?.extra
    };

    return generateFingerprint(fingerprintData);
  }

  return {
    detectDevice,
    addRule,
    loadModelDB,
    clearDB,
    generateDeviceFingerprint,
    detectBrowser,
    getCanvasFingerprint,
    getWebGLFingerprint,
    getFontFingerprint,
    getAudioFingerprint,
    getMediaDevicesFingerprint,
    _db: db as ModelRule[]
  } as const;
}