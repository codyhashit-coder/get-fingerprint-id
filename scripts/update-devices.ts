import axios from 'axios';
import * as cheerio from 'cheerio';
import { createHash } from 'crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const OUTPUT_DIR = join(__dirname, '../../src/rules/devices/phones');
const GSMArena_BASE_URL = 'https://www.gsmarena.com';
const CACHE_DIR = join(__dirname, '.cache');
const RETRY_COUNT = 3;
const DELAY_BETWEEN_REQUESTS = 1500; // ms

interface Device {
  id: string;
  brand: string;
  model: string;
  series?: string;
  year: number;
  uaContains: string[];
  resolutions: Array<{ w: number; h: number; ratio: string }>;
  dpr: number;
  priority: number;
  type: 'phone' | 'tablet' | 'laptop' | 'desktop';
  os?: { name: string; minVersion: string };
  cpu?: { brand: string; model: string };
}

const BRAND_MAPPINGS: Record<string, { name: string; defaultType: 'phone' | 'tablet' | 'laptop' }> = {
  oppo: { name: 'oppo', defaultType: 'phone' },
  vivo: { name: 'vivo', defaultType: 'phone' },
  realme: { name: 'realme', defaultType: 'phone' },
  oneplus: { name: 'oneplus', defaultType: 'phone' },
  samsung: { name: 'samsung', defaultType: 'phone' },
  xiaomi: { name: 'xiaomi', defaultType: 'phone' },
  apple: { name: 'apple', defaultType: 'phone' },
  google: { name: 'google', defaultType: 'phone' },
  sony: { name: 'sony', defaultType: 'phone' },
  huawei: { name: 'huawei', defaultType: 'phone' },
  honor: { name: 'honor', defaultType: 'phone' },
  motorola: { name: 'motorola', defaultType: 'phone' },
  nokia: { name: 'nokia', defaultType: 'phone' },
  asus: { name: 'asus', defaultType: 'phone' },
  lg: { name: 'lg', defaultType: 'phone' },
  lenovo: { name: 'lenovo', defaultType: 'tablet' },
  tecno: { name: 'tecno', defaultType: 'phone' },
  infinix: { name: 'infinix', defaultType: 'phone' },
  zte: { name: 'zte', defaultType: 'phone' },
  nubia: { name: 'nubia', defaultType: 'phone' },
  itel: { name: 'itel', defaultType: 'phone' },
};

// 根据设备特征自动判断设备类型
function detectDeviceType(
  model: string, 
  resolution: { w: number; h: number },
  os?: { name: string; minVersion: string },
  defaultType: 'phone' | 'tablet' | 'laptop' = 'phone'
): 'phone' | 'tablet' | 'laptop' | 'desktop' {
  const modelLower = model.toLowerCase();
  
  // 笔记本电脑关键词
  if (/macbook|thinkpad|yoga|legion go|surface (book|laptop)|laptop|notebook/i.test(modelLower)) {
    return 'laptop';
  }
  
  // 平板关键词
  if (/ipad|tablet|pad|tab/i.test(modelLower)) {
    return 'tablet';
  }
  
  // 根据分辨率判断
  const diagonal = Math.sqrt(resolution.w ** 2 + resolution.h ** 2);
  if (diagonal > 4000) {
    // 大屏幕可能是平板或笔记本电脑
    if (os?.name === 'macos' || os?.name === 'windows') {
      return 'laptop';
    }
    return 'tablet';
  }
  
  // 根据操作系统判断
  if (os?.name === 'macos' || os?.name === 'mac os') {
    return 'laptop'; // macOS 设备通常是 MacBook
  }
  if (os?.name === 'windows') {
    // Windows 设备可能是笔记本电脑或台式机，默认返回 laptop
    return 'laptop';
  }
  if (os?.name === 'ipados') {
    return 'tablet';
  }
  
  return defaultType;
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function ensureDir(dir: string) {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

function getCachePath(url: string): string {
  const hash = createHash('md5').update(url).digest('hex');
  return join(CACHE_DIR, `${hash}.html`);
}

async function fetchWithCache(url: string): Promise<string> {
  ensureDir(CACHE_DIR);
  const cachePath = getCachePath(url);

  if (existsSync(cachePath)) {
    return readFileSync(cachePath, 'utf-8');
  }

  for (let i = 0; i < RETRY_COUNT; i++) {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml',
          'Accept-Language': 'en-US,en;q=0.9',
          'Referer': GSMArena_BASE_URL
        },
        timeout: 15000
      });
      writeFileSync(cachePath, response.data);
      return response.data;
    } catch (err) {
      console.warn(`Retry ${i + 1}/${RETRY_COUNT} failed for ${url}`);
      if (i === RETRY_COUNT - 1) throw err;
      await sleep(2000 * (i + 1));
    }
  }
  throw new Error('Unreachable');
}

function parseResolution(resStr: string): { w: number; h: number; ratio: string } | null {
  const match = resStr.match(/(\d+) x (\d+) pixels?/i);
  if (!match) return null;
  const w = parseInt(match[1], 10);
  const h = parseInt(match[2], 10);
  const gcd = (a: number, b: number): number => b ? gcd(b, a % b) : a;
  const d = gcd(w, h);
  const ratio = `${w / d}:${h / d}`;
  return { w, h, ratio };
}

function estimateDPR(res: { w: number; h: number }): number {
  const diagonal = Math.sqrt(res.w ** 2 + res.h ** 2);
  if (diagonal > 6000) return 3.5;
  if (diagonal > 5000) return 3;
  if (diagonal > 4000) return 2.75;
  if (diagonal > 3000) return 2.5;
  return 2;
}

function extractYear($: cheerio.CheerioAPI, model?: string): number {
  // 尝试从发布日期提取年份
  const released = $('td:contains("Released")').next().text().trim();
  
  // 支持多种日期格式：
  // - "2026" 
  // - "Expected 2026"
  // - "Coming Q1 2026"
  // - "Q1 2026"
  // - "January 2026"
  // - "2026-01-15"
  // - "Announced 2026"
  const yearPatterns = [
    /(\d{4})/,  // 任何4位数字（优先匹配，会匹配所有4位数字）
  ];
  
  // 先尝试精确匹配未来年份关键词
  const futureYearPatterns = [
    /(?:expected|coming|announced|launch|rumored|leaked).*?(\d{4})/i,  // "Expected 2026"
    /(?:q[1-4]|quarter).*?(\d{4})/i,  // "Q1 2026"
    /(?:january|february|march|april|may|june|july|august|september|october|november|december).*?(\d{4})/i,  // "January 2026"
  ];
  
  // 优先匹配包含未来年份关键词的格式
  for (const pattern of futureYearPatterns) {
    const match = released.match(pattern);
    if (match && match[1]) {
      const year = parseInt(match[1], 10);
      // 验证年份是否合理（2000-2100之间，包括未来年份）
      if (year >= 2000 && year <= 2100) {
        return year;
      }
    }
  }
  
  // 如果没有匹配到关键词格式，尝试匹配所有4位数字
  for (const pattern of yearPatterns) {
    const match = released.match(pattern);
    if (match) {
      const year = parseInt(match[1] || match[0], 10);
      // 验证年份是否合理（2000-2100之间，包括未来年份）
      if (year >= 2000 && year <= 2100) {
        return year;
      }
    }
  }
  
  // 如果从发布日期无法提取，尝试从型号名称推断（仅作为备选）
  if (model) {
    // 尝试匹配型号中的年份，如 "iPhone 18" 可能暗示 2026年
    const modelYearMatch = model.match(/(?:iphone|ipad|galaxy|note|s)\s*(\d{2,3})/i);
    if (modelYearMatch) {
      const modelNumber = parseInt(modelYearMatch[1], 10);
      // iPhone 型号推断：iPhone 17 (2025), iPhone 18 (2026), etc.
      // 这是一个粗略的推断，仅作为最后备选
      if (modelNumber >= 17 && modelNumber <= 30) {
        const inferredYear = 2008 + modelNumber; // iPhone 3G (2008) 是 iPhone 2
        if (inferredYear >= 2025 && inferredYear <= 2030) {
          return inferredYear;
        }
      }
    }
  }
  
  // 如果都找不到，返回当前年份+1（优先添加未来设备）
  const currentYear = new Date().getFullYear();
  // 默认返回下一年，确保能添加未来设备
  return currentYear + 1;
}

function extractOS($: cheerio.CheerioAPI): { name: string; minVersion: string } | undefined {
  const osText = $('td:contains("OS")').next().text().trim();
  const androidMatch = osText.match(/Android\s*([\d.]+)/i);
  if (androidMatch) {
    return { name: 'android', minVersion: androidMatch[1].split('.')[0] };
  }
  const iosMatch = osText.match(/iOS\s*([\d.]+)/i);
  if (iosMatch) {
    return { name: 'ios', minVersion: iosMatch[1].split('.')[0] };
  }
  const ipadosMatch = osText.match(/iPadOS\s*([\d.]+)/i);
  if (ipadosMatch) {
    return { name: 'ipados', minVersion: ipadosMatch[1].split('.')[0] };
  }
  const macosMatch = osText.match(/macOS\s*([\d.]+)|Mac OS X\s*([\d._]+)/i);
  if (macosMatch) {
    return { name: 'macos', minVersion: (macosMatch[1] || macosMatch[2] || '').split('.')[0] };
  }
  const windowsMatch = osText.match(/Windows\s*([\d.]+)/i);
  if (windowsMatch) {
    return { name: 'windows', minVersion: windowsMatch[1].split('.')[0] };
  }
  return undefined;
}

function extractCPU($: cheerio.CheerioAPI): { brand: string; model: string } | undefined {
  const cpuText = $('td:contains("Chipset")').next().text().trim() ||
                 $('td:contains("CPU")').next().text().trim();
  if (!cpuText) return undefined;

  const qualcomm = cpuText.match(/(Snapdragon\s+[\w\s\-]+|SD\s*[\w\-]+)/i);
  if (qualcomm) return { brand: 'Qualcomm', model: qualcomm[0].trim() };

  const mediatek = cpuText.match(/(Dimensity\s+\d+|Helio\s+[\w]+|MT\d+)/i);
  if (mediatek) return { brand: 'MediaTek', model: mediatek[0].trim() };

  const exynos = cpuText.match(/Exynos\s*\d+/i);
  if (exynos) return { brand: 'Samsung', model: exynos[0].trim() };

  const apple = cpuText.match(/Apple\s+A\d+/i);
  if (apple) return { brand: 'Apple', model: apple[0].trim() };

  return { brand: 'Unknown', model: cpuText.split(' ')[0] };
}

async function fetchDeviceDetails(url: string, brand: string): Promise<Device | null> {
  try {
    const html = await fetchWithCache(url);
    const $ = cheerio.load(html);

    const model = $('h1.specs-phone-name-title').text().trim();
    if (!model) return null;

    const year = extractYear($, model);
    const resolution = $('td:contains("Resolution")').next().text().trim();
    const resObj = parseResolution(resolution);
    if (!resObj) return null;

    const dpr = estimateDPR(resObj);
    const os = extractOS($);
    const cpu = extractCPU($);

    // Extract model codes from network/tech
    const techText = $('td:contains("Technology")').next().text().trim() +
                     $('td:contains("2G")').next().text().trim() +
                     $('td:contains("3G")').next().text().trim() +
                     $('td:contains("4G")').next().text().trim();
    const codes = [...new Set(
      techText.match(/[A-Z]{3}\d+[A-Z]?/g) || []
    )].slice(0, 3);

    const uaContains = [model, ...codes].filter(Boolean);
    const id = `${brand}-${model.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

    // 自动检测设备类型
    const defaultType = BRAND_MAPPINGS[brand]?.defaultType || 'phone';
    const deviceType = detectDeviceType(model, resObj, os, defaultType);

    // Priority: flagship > mid > entry
    let priority = 9000;
    if (/pro|ultra|x\d+|fold|flip|note/i.test(model)) priority += 1000;
    if (dpr >= 3) priority += 500;
    if (cpu?.model.includes('Snapdragon 8') || cpu?.model.includes('Dimensity 9')) priority += 800;
    // 笔记本电脑通常优先级更高
    if (deviceType === 'laptop') priority += 2000;

    return {
      id,
      brand: brand.charAt(0).toUpperCase() + brand.slice(1),
      model,
      series: model.match(/(Find X|Reno|A|K|Pad|MacBook|ThinkPad|Yoga|Legion)/i)?.[0] || undefined,
      year,
      uaContains,
      resolutions: [resObj],
      dpr,
      priority,
      type: deviceType,
      os,
      cpu
    };
  } catch (err) {
    console.error(`Failed to parse ${url}:`, err instanceof Error ? err.message : err);
    return null;
  }
}

async function fetchBrandDevices(brand: string): Promise<Device[]> {
  const searchUrl = `${GSMArena_BASE_URL}/results.php3?sFreeText=${encodeURIComponent(brand)}`;
  console.log(`\nFetching device list for: ${brand}`);

  try {
    const html = await fetchWithCache(searchUrl);
    const $ = cheerio.load(html);
    const devices: Device[] = [];

    const links = $('.makers a').map((_, el) => $(el).attr('href')).get();
    console.log(`Found ${links.length} device links for ${brand}`);

    for (let i = 0; i < links.length; i++) {
      const link = links[i];
      const detailUrl = `${GSMArena_BASE_URL}/${link}`;
      const device = await fetchDeviceDetails(detailUrl, brand);
      if (device) {
        devices.push(device);
      }
      console.log(`  [${i + 1}/${links.length}] ${device ? 'Success' : 'Failed'} ${link.split('-')[0]}`);
      await sleep(DELAY_BETWEEN_REQUESTS);
    }

    return devices;
  } catch (err) {
    console.error(`Error fetching brand ${brand}:`, err instanceof Error ? err.message : err);
    return [];
  }
}

async function updateDeviceFiles() {
  ensureDir(OUTPUT_DIR);

  for (const [brandKey, { name: fileName }] of Object.entries(BRAND_MAPPINGS)) {
    console.log(`\n=== Processing ${brandKey.toUpperCase()} ===`);

    const filePath = join(OUTPUT_DIR, `${fileName}.json`);
    let existing: Device[] = [];

    if (existsSync(filePath)) {
      try {
        existing = JSON.parse(readFileSync(filePath, 'utf-8'));
        console.log(`Loaded ${existing.length} existing devices`);
      } catch (e) {
        console.warn(`Failed to parse existing file, starting fresh`);
      }
    }

    const fetched = await fetchBrandDevices(brandKey);
    const existingIds = new Set(existing.map(d => d.id));
    const newDevices = fetched.filter(d => !existingIds.has(d.id));

    if (newDevices.length === 0) {
      console.log(`No new devices for ${brandKey}`);
      continue;
    }

    const merged = [...newDevices, ...existing].sort((a, b) => b.priority - a.priority);
    writeFileSync(filePath, JSON.stringify(merged, null, 2), 'utf-8');
    console.log(`Updated ${filePath} → ${merged.length} total devices (+${newDevices.length} new)`);

    await sleep(1000);
  }

  console.log('\nAll brands updated successfully!');
}

// Run
updateDeviceFiles().catch(err => {
  console.error('Update failed:', err);
  process.exit(1);
});