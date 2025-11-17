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

class DeviceLoader {
  private devices: Map<string, Device> = new Map();
  private initialized = false;

  async initialize() {
    if (this.initialized) return;
    
    try {
      // 导入所有设备数据
      const deviceModules = import.meta.glob('./devices/**/*.json', { eager: true });
      
      for (const path in deviceModules) {
        try {
          const devices: Device[] = (deviceModules[path] as any).default || [];
          devices.forEach(device => {
            if (!device.id || !device.brand || !device.model) {
              console.warn(`Invalid device data in ${path}:`, device);
              return;
            }
            this.devices.set(device.id, device);
          });
        } catch (error) {
          console.error(`Error loading devices from ${path}:`, error);
        }
      }
      
      this.initialized = true;
      console.log(`Loaded ${this.devices.size} devices`);
    } catch (error) {
      console.error('Failed to load device data:', error);
    }
  }

  getDeviceById(id: string): Device | undefined {
    return this.devices.get(id);
  }

  findDevicesByBrand(brand: string): Device[] {
    return Array.from(this.devices.values())
      .filter(device => device.brand.toLowerCase() === brand.toLowerCase());
  }

  getAllDevices(): Device[] {
    return Array.from(this.devices.values());
  }

  addDevice(device: Device) {
    if (!device.id) {
      throw new Error('Device must have an id');
    }
    this.devices.set(device.id, device);
  }

  addDevices(devices: Device[]) {
    devices.forEach(device => this.addDevice(device));
  }
}

export const deviceLoader = new DeviceLoader();

// 初始化设备数据库
deviceLoader.initialize().catch(console.error);
