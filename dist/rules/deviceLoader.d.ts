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
declare class DeviceLoader {
    private devices;
    private initialized;
    private allBrandsLoaded;
    private brandLoaders;
    private loadedBrands;
    private loadingBrands;
    constructor();
    initialize(options?: {
        preloadAll?: boolean;
    }): Promise<void>;
    loadDevicesForBrand(brand: string): Promise<void>;
    loadDevicesForUA(ua: string, options?: {
        fallbackLoadAll?: boolean;
    }): Promise<string[]>;
    getDeviceById(id: string): Device | undefined;
    findDevicesByBrand(brand: string): Device[];
    getAllDevices(): Device[];
    getLoadedBrands(): string[];
    addDevice(device: Device): void;
    addDevices(devices: Device[]): void;
    private loadAllBrands;
    private guessBrandsFromUA;
}
export declare const deviceLoader: DeviceLoader;
export {};
