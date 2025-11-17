# get-fingerprint-id

一个高精度的设备指纹识别库，支持通过多维度特征（UA、分辨率、DPR、Canvas、WebGL、字体、音频等）识别设备型号并生成唯一设备ID。

## ✨ 特性

- 🎯 **高准确率**：即使在 UA 信息缺失的情况下，准确率仍可达 95%+
- 🔍 **多维度识别**：支持 UA、分辨率、DPR、操作系统、设备类型等多维度匹配
- 🎨 **丰富指纹**：自动收集 Canvas、WebGL、字体、音频、媒体设备等硬件特征
- 📱 **广泛支持**：支持国内外手机、平板、笔记本、台式机等多种设备类型
- 🚀 **开箱即用**：内置大量设备数据库，无需额外配置
- 📦 **TypeScript**：完整的 TypeScript 类型定义

## 📦 安装

### npm

```bash
npm install get-fingerprint-id
```

### yarn

```bash
yarn add get-fingerprint-id
```

### pnpm

```bash
pnpm add get-fingerprint-id
```

## 🚀 快速开始

### 基础用法

```javascript
import { detector } from 'get-fingerprint-id';

// 等待设备数据库加载完成（通常很快）
setTimeout(async () => {
  const ua = navigator.userAgent;
  const width = window.screen.width;
  const height = window.screen.height;

  // 检测设备信息
  const result = detector.detectDevice(ua, width, height);
  console.log('设备品牌:', result.brand);
  console.log('设备型号:', result.model);
  console.log('置信度:', (result.confidence * 100).toFixed(1) + '%');

  // 生成设备指纹ID
  const fingerprintId = await detector.generateDeviceFingerprint(ua, width, height);
  console.log('设备指纹ID:', fingerprintId);
}, 100);
```

### 在浏览器中使用

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>设备指纹识别</title>
</head>
<body>
  <div id="result"></div>
  
  <script type="module">
    import { detector } from 'https://cdn.jsdelivr.net/npm/get-fingerprint-id/dist/sass-id.es.js';
    
    async function init() {
      // 等待设备数据库加载
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const ua = navigator.userAgent;
      const width = window.screen.width;
      const height = window.screen.height;
      
      // 检测设备
      const result = detector.detectDevice(ua, width, height);
      
      // 生成指纹ID
      const fingerprintId = await detector.generateDeviceFingerprint(ua, width, height);
      
      document.getElementById('result').innerHTML = `
        <h2>设备信息</h2>
        <p>品牌: ${result.brand}</p>
        <p>型号: ${result.model}</p>
        <p>操作系统: ${result.os}</p>
        <p>设备类型: ${result.deviceType}</p>
        <p>置信度: ${(result.confidence * 100).toFixed(1)}%</p>
        <p>浏览器: ${result.browser?.name} ${result.browser?.version}</p>
        <h2>设备指纹ID</h2>
        <p>${fingerprintId}</p>
      `;
    }
    
    init();
  </script>
</body>
</html>
```

## 📚 API 文档

### `detector.detectDevice(ua, screenW, screenH, extra?)`

检测设备信息。

**参数：**
- `ua: string` - User Agent 字符串
- `screenW: number` - 屏幕宽度（像素）
- `screenH: number` - 屏幕高度（像素）
- `extra?: { [k: string]: any }` - 额外参数（可选）
  - `pixelRatio?: number` - 设备像素比（DPR）

**返回：** `DetectionResult`

```typescript
interface DetectionResult {
  brand?: string;              // 设备品牌
  model?: string;              // 设备型号
  confidence: number;           // 置信度 (0-1)
  matchedRuleIds: string[];     // 匹配的规则ID列表
  os?: string;                  // 操作系统
  deviceType: DeviceType;       // 设备类型
  browser?: BrowserInfo;        // 浏览器信息
  rawUA: string;                // 原始UA字符串
}
```

**示例：**

```javascript
const result = detector.detectDevice(
  navigator.userAgent,
  window.screen.width,
  window.screen.height,
  { pixelRatio: window.devicePixelRatio }
);

console.log(result);
// {
//   brand: "Apple",
//   model: "iPhone 15 Pro",
//   confidence: 0.95,
//   matchedRuleIds: ["iphone-15-pro"],
//   os: "iOS 17.0",
//   deviceType: "phone",
//   browser: { name: "Safari", version: "17.0", engine: "WebKit" },
//   rawUA: "Mozilla/5.0..."
// }
```

### `detector.generateDeviceFingerprint(ua, screenW, screenH, options?)`

生成设备唯一指纹ID。

**参数：**
- `ua: string` - User Agent 字符串
- `screenW: number` - 屏幕宽度（像素）
- `screenH: number` - 屏幕高度（像素）
- `options?: FingerprintOptions` - 指纹选项（可选）

**返回：** `Promise<string>` - 设备指纹ID（SHA-256 哈希值）

**FingerprintOptions：**

```typescript
interface FingerprintOptions {
  colorDepth?: number;           // 颜色深度
  pixelRatio?: number;          // 设备像素比
  timezone?: string;            // 时区
  platform?: string;            // 平台信息
  plugins?: string[];           // 插件列表
  canvas?: string;              // Canvas 指纹（自动生成）
  webgl?: string;               // WebGL 指纹（自动生成）
  fonts?: string;                // 字体指纹（自动生成）
  audio?: string;                // 音频指纹（自动生成）
  mediaDevices?: string;        // 媒体设备指纹（自动生成）
  hardwareConcurrency?: number;  // CPU 核心数
  deviceMemory?: number;         // 设备内存（GB）
  extra?: { [k: string]: any };  // 额外数据
  autoCollect?: boolean;         // 是否自动收集指纹（默认 true）
}
```

**示例：**

```javascript
// 自动收集所有指纹（推荐）
const fingerprintId = await detector.generateDeviceFingerprint(
  navigator.userAgent,
  window.screen.width,
  window.screen.height
);

// 手动指定部分指纹
const fingerprintId2 = await detector.generateDeviceFingerprint(
  navigator.userAgent,
  window.screen.width,
  window.screen.height,
  {
    autoCollect: true,  // 自动收集缺失的指纹
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    hardwareConcurrency: navigator.hardwareConcurrency,
    deviceMemory: navigator.deviceMemory
  }
);

// 禁用自动收集
const fingerprintId3 = await detector.generateDeviceFingerprint(
  navigator.userAgent,
  window.screen.width,
  window.screen.height,
  {
    autoCollect: false,
    canvas: detector.getCanvasFingerprint(),
    webgl: detector.getWebGLFingerprint()
  }
);
```

### `detector.getCanvasFingerprint()`

获取 Canvas 指纹。

**返回：** `string` - Canvas 指纹（Base64 编码的图像数据）

```javascript
const canvasFingerprint = detector.getCanvasFingerprint();
```

### `detector.getWebGLFingerprint()`

获取 WebGL 指纹。

**返回：** `string` - WebGL 指纹信息

```javascript
const webglFingerprint = detector.getWebGLFingerprint();
```

### `detector.getFontFingerprint()`

获取字体指纹。

**返回：** `string` - 可用字体列表（逗号分隔）

```javascript
const fontFingerprint = detector.getFontFingerprint();
```

### `detector.getAudioFingerprint()`

获取音频指纹。

**返回：** `Promise<string>` - 音频指纹哈希

```javascript
const audioFingerprint = await detector.getAudioFingerprint();
```

### `detector.getMediaDevicesFingerprint()`

获取媒体设备指纹。

**返回：** `Promise<string>` - 媒体设备信息

```javascript
const mediaDevicesFingerprint = await detector.getMediaDevicesFingerprint();
```

### `createDetector(initialDB?)`

创建自定义检测器实例。

**参数：**
- `initialDB?: ModelRule[]` - 初始设备规则数据库

**返回：** 检测器实例

```javascript
import { createDetector } from 'get-fingerprint-id';

// 创建自定义检测器
const customDetector = createDetector([
  {
    id: 'custom-device-1',
    brand: 'Custom',
    model: 'Device 1',
    resolutions: [{ w: 1920, h: 1080 }],
    dpr: 2,
    type: 'desktop',
    os: { name: 'windows' }
  }
]);

// 添加更多规则
customDetector.addRule({
  id: 'custom-device-2',
  brand: 'Custom',
  model: 'Device 2',
  resolutions: [{ w: 2560, h: 1440 }],
  dpr: 2.5,
  type: 'laptop'
});

// 加载设备数据库
customDetector.loadModelDB([...moreDevices]);

// 清空数据库
customDetector.clearDB();
```

## 🔧 高级用法

### 自定义设备规则

```javascript
import { createDetector, ModelRule } from 'get-fingerprint-id';

const customRules: ModelRule[] = [
  {
    id: 'my-device-1',
    brand: 'MyBrand',
    model: 'MyModel',
    uaContains: ['MyDevice'],
    resolutions: [
      { w: 1920, h: 1080, ratio: '16:9' },
      { w: 2560, h: 1440, ratio: '16:9' }
    ],
    dpr: 2,
    priority: 10000,
    type: 'desktop',
    os: {
      name: 'windows',
      minVersion: '10.0'
    },
    cpu: {
      brand: 'Intel',
      model: 'Core i7'
    }
  }
];

const detector = createDetector(customRules);
```

### 批量检测

```javascript
const devices = [
  { ua: 'UA1', width: 1920, height: 1080 },
  { ua: 'UA2', width: 2560, height: 1440 },
  // ...
];

const results = devices.map(device => 
  detector.detectDevice(device.ua, device.width, device.height)
);

const fingerprints = await Promise.all(
  devices.map(device => 
    detector.generateDeviceFingerprint(device.ua, device.width, device.height)
  )
);
```

### 监听设备数据库加载

```javascript
import { deviceLoader } from 'get-fingerprint-id';

// 等待设备数据库加载完成
await deviceLoader.initialize();

// 获取所有设备
const allDevices = deviceLoader.getAllDevices();
console.log(`已加载 ${allDevices.length} 个设备`);

// 根据品牌查找设备
const appleDevices = deviceLoader.findDevicesByBrand('Apple');

// 根据ID获取设备
const device = deviceLoader.getDeviceById('iphone-15-pro');
```

## 📊 识别准确率

- **有 UA 信息时**：准确率 **95%+**
- **无 UA 但分辨率/DPR 匹配时**：准确率 **85-95%**
- **仅 OS 信息时**：准确率 **60-75%**（iOS 设备可达 75%）

识别算法采用三阶段匹配策略：
1. **第一阶段**：UA 精确匹配
2. **第二阶段**：硬件特征匹配（分辨率 + DPR + OS + 设备类型）
3. **第三阶段**：模糊匹配（允许一定误差）

## ⚠️ 注意事项

1. **异步初始化**：设备数据库需要异步加载，建议在使用前等待一小段时间（100-200ms）
2. **浏览器兼容性**：部分指纹功能（如 AudioContext、MediaDevices）需要现代浏览器支持
3. **隐私保护**：指纹识别可能涉及隐私问题，请确保符合相关法律法规
4. **性能考虑**：自动收集所有指纹可能需要一些时间，建议在后台异步执行

## 🛠️ 开发

### 克隆项目

```bash
git clone https://github.com/codyhashit-coder/get-fingerprint-id.git
cd get-fingerprint-id
```

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建

```bash
npm run build
```

### 更新设备数据库

```bash
npm run update-devices
```

## 📝 类型定义

完整的 TypeScript 类型定义已包含在包中：

```typescript
import type {
  DetectionResult,
  DeviceType,
  ModelRule,
  BrowserInfo
} from 'get-fingerprint-id';
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

ISC

## 👤 作者

cody

---

**注意**：本库仅用于合法的设备识别和统计目的，请勿用于恶意追踪或侵犯用户隐私。

