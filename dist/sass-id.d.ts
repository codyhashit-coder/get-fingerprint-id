export type DeviceType = 'mobile' | 'tablet' | 'desktop' | 'tv' | 'phone' | 'laptop' | 'unknown';
export interface ModelRule {
    id?: string;
    brand: string;
    model: string;
    uaContains?: string[];
    uaRegex?: string[];
    resolutions?: Array<{
        w: number;
        h: number;
        ratio?: string;
    }>;
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
    extra?: {
        [k: string]: any;
    };
}
declare function detectBrowser(ua: string): BrowserInfo | undefined;
declare function getCanvasFingerprint(): string;
declare function getFontFingerprint(): string;
declare function getAudioFingerprint(): Promise<string>;
declare function getMediaDevicesFingerprint(): Promise<string>;
declare function getWebGLFingerprint(): string;
export declare function createDetector(initialDB?: ModelRule[]): {
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
    readonly detectBrowser: typeof detectBrowser;
    readonly getCanvasFingerprint: typeof getCanvasFingerprint;
    readonly getWebGLFingerprint: typeof getWebGLFingerprint;
    readonly getFontFingerprint: typeof getFontFingerprint;
    readonly getAudioFingerprint: typeof getAudioFingerprint;
    readonly getMediaDevicesFingerprint: typeof getMediaDevicesFingerprint;
    readonly _db: ModelRule[];
};
export {};
