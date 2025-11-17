import { deviceLoader } from './rules/deviceLoader';
import { createDetector, DetectionResult, DeviceType, ModelRule } from './sass-id';
declare const detector: {
    readonly detectDevice: (ua: string, screenW: number, screenH: number, extra?: {
        [k: string]: any;
    }) => DetectionResult;
    readonly addRule: (rule: ModelRule) => void;
    readonly loadModelDB: (rules: ModelRule[]) => void;
    readonly clearDB: () => void;
    readonly generateDeviceFingerprint: (ua: string, screenW: number, screenH: number, options?: {
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
        extra?: {
            [k: string]: any;
        };
        autoCollect?: boolean;
    }) => Promise<string>;
    readonly detectBrowser: (ua: string) => import("./sass-id").BrowserInfo | undefined;
    readonly getCanvasFingerprint: () => string;
    readonly getWebGLFingerprint: () => string;
    readonly getFontFingerprint: () => string;
    readonly getAudioFingerprint: () => Promise<string>;
    readonly getMediaDevicesFingerprint: () => Promise<string>;
    readonly _db: ModelRule[];
};
export declare function prepareDetectorForUA(ua: string, options?: {
    fallbackLoadAll?: boolean;
}): Promise<void>;
export declare function preloadAllDevices(): Promise<void>;
export { createDetector, detector, deviceLoader };
export type { DetectionResult, DeviceType, ModelRule };
