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
    initialize(): Promise<void>;
    getDeviceById(id: string): Device | undefined;
    findDevicesByBrand(brand: string): Device[];
    getAllDevices(): Device[];
    addDevice(device: Device): void;
    addDevices(devices: Device[]): void;
}
export declare const deviceLoader: DeviceLoader;
export {};
