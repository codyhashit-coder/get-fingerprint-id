import { ModelRule } from '../sass-id';

export interface Device extends ModelRule {
  series?: string;
  year?: number;
  os?: {
    name: 'android' | 'ios' | 'ipados' | 'windows' | 'harmonyos';
    minVersion?: string;
  };
  cpu?: {
    brand: string;
    model: string;
  };
  dpr?: number;
}

type DeviceModuleLoader = () => Promise<{ default: Device[] }>;

const deviceModules = import.meta.glob<{ default: Device[] }>('./devices/**/*.json');

const BRAND_HINTS: Record<string, string[]> = {
  apple: ['iphone', 'ipad', 'macintosh', 'macbook', 'ios'],
  samsung: ['samsung', 'sm-', 'galaxy'],
  huawei: ['huawei', 'harmony'],
  honor: ['honor'],
  google: ['pixel', 'google'],
  xiaomi: ['xiaomi', 'redmi', 'mi ', 'mi-', 'mix '],
  oppo: ['oppo'],
  vivo: ['vivo'],
  oneplus: ['oneplus'],
  lenovo: ['lenovo', 'thinkpad'],
  asus: ['asus', 'rog', 'zenfone'],
  sony: ['sony', 'xperia'],
  motorola: ['moto', 'motorola'],
  blackshark: ['blackshark'],
  nothing: ['nothing'],
  realme: ['realme'],
  fairphone: ['fairphone'],
  tecno: ['tecno'],
  infinix: ['infinix'],
  itel: ['itel'],
  nubia: ['nubia'],
  meizu: ['meizu'],
  zte: ['zte', 'axon'],
  acer: ['acer'],
  hp: ['hp ', 'hewlett'],
  dell: ['dell'],
  microsoft: ['surface'],
  lg: ['lg-'],
};

function normalizeBrand(value?: string) {
  return (value || '').trim().toLowerCase();
}

function extractBrandFromPath(path: string): string | undefined {
  const match = path.match(/\/([a-z0-9_-]+)\.json$/i);
  if (!match) return undefined;
  return normalizeBrand(match[1]);
}

class DeviceLoader {
  private devices: Map<string, Device> = new Map();
  private initialized = false;
  private allBrandsLoaded = false;
  private brandLoaders: Map<string, DeviceModuleLoader[]> = new Map();
  private loadedBrands: Set<string> = new Set();
  private loadingBrands: Map<string, Promise<void>> = new Map();

  constructor() {
    for (const path in deviceModules) {
      const brand = extractBrandFromPath(path);
      if (!brand) continue;
      const loader = deviceModules[path] as DeviceModuleLoader;
      if (!this.brandLoaders.has(brand)) {
        this.brandLoaders.set(brand, []);
      }
      this.brandLoaders.get(brand)!.push(loader);
    }
  }

  async initialize(options?: { preloadAll?: boolean }) {
    const shouldPreloadAll = options?.preloadAll ?? true;
    if (this.initialized && (!shouldPreloadAll || this.allBrandsLoaded)) {
      return;
    }

    this.initialized = true;

    if (!shouldPreloadAll) {
      return;
    }

    if (this.allBrandsLoaded) {
      return;
    }

    await this.loadAllBrands();
  }

  async loadDevicesForBrand(brand: string) {
    const normalized = normalizeBrand(brand);
    if (!normalized || this.loadedBrands.has(normalized)) {
      return;
    }

    const loaders = this.brandLoaders.get(normalized);
    if (!loaders?.length) {
      return;
    }

    if (this.loadingBrands.has(normalized)) {
      return this.loadingBrands.get(normalized);
    }

    const loadPromise = (async () => {
      for (const loader of loaders) {
        try {
          const module = await loader();
          const devices = module?.default || [];
          this.addDevices(devices);
        } catch (error) {
          console.error(`Error loading devices for brand ${brand}:`, error);
        }
      }
      this.loadedBrands.add(normalized);
      this.loadingBrands.delete(normalized);
    })();

    this.loadingBrands.set(normalized, loadPromise);
    await loadPromise;
  }

  async loadDevicesForUA(ua: string, options?: { fallbackLoadAll?: boolean }) {
    this.initialized = true;
    const lowerUA = (ua || '').toLowerCase();
    const matchedBrands = this.guessBrandsFromUA(lowerUA);

    if (!matchedBrands.length) {
      if (options?.fallbackLoadAll) {
        await this.initialize({ preloadAll: true });
      }
      return [];
    }

    await Promise.all(matchedBrands.map(brand => this.loadDevicesForBrand(brand)));
    return matchedBrands;
  }

  getDeviceById(id: string): Device | undefined {
    return this.devices.get(id);
  }

  findDevicesByBrand(brand: string): Device[] {
    const normalized = normalizeBrand(brand);
    return Array.from(this.devices.values())
      .filter(device => normalizeBrand(device.brand) === normalized);
  }

  getAllDevices(): Device[] {
    return Array.from(this.devices.values());
  }

  getLoadedBrands(): string[] {
    return Array.from(this.loadedBrands);
  }

  addDevice(device: Device) {
    if (!device.id) {
      throw new Error('Device must have an id');
    }
    this.devices.set(device.id, device);
  }

  addDevices(devices: Device[]) {
    devices.forEach(device => {
      if (!device.id || !device.brand || !device.model) {
        console.warn('Invalid device data:', device);
        return;
      }
      this.addDevice(device);
    });
  }

  private async loadAllBrands() {
    await Promise.all(
      Array.from(this.brandLoaders.keys()).map(brand => this.loadDevicesForBrand(brand))
    );
    this.allBrandsLoaded = true;
    console.log(`Loaded ${this.devices.size} devices`);
  }

  private guessBrandsFromUA(lowerUA: string): string[] {
    const matches = new Set<string>();

    for (const [brand, hints] of Object.entries(BRAND_HINTS)) {
      if (hints.some(hint => lowerUA.includes(hint))) {
        matches.add(brand);
      }
    }

    if (!matches.size) {
      for (const brand of this.brandLoaders.keys()) {
        if (lowerUA.includes(brand)) {
          matches.add(brand);
        }
      }
    }

    return Array.from(matches);
  }
}

export const deviceLoader = new DeviceLoader();

// 默认改为懒加载：仅构建索引，需要时再按 UA 载入品牌
deviceLoader.initialize({ preloadAll: false }).catch(console.error);
