import { deviceLoader } from './rules/deviceLoader';
import { createDetector, DetectionResult, DeviceType, ModelRule } from './sass-id';

// Create detector with initial empty rules
const detector = createDetector([]);
const detectorLoadedBrands = new Set<string>();

function normalizeBrandName(brand?: string) {
  return (brand || '').trim().toLowerCase();
}

function syncBrandsIntoDetector(brands: string[]) {
  brands
    .map(normalizeBrandName)
    .filter((brand): brand is string => Boolean(brand))
    .forEach(brand => {
      if (detectorLoadedBrands.has(brand)) return;
      const brandDevices = deviceLoader.findDevicesByBrand(brand);
      if (brandDevices.length) {
        detector.loadModelDB(brandDevices);
        detectorLoadedBrands.add(brand);
      }
    });
}

async function syncAllLoadedBrands() {
  syncBrandsIntoDetector(deviceLoader.getLoadedBrands());
}

export async function prepareDetectorForUA(
  ua: string,
  options?: { fallbackLoadAll?: boolean }
) {
  const matchedBrands = await deviceLoader.loadDevicesForUA(ua, options);
  syncBrandsIntoDetector(matchedBrands);

  if (!matchedBrands.length && options?.fallbackLoadAll) {
    await syncAllLoadedBrands();
  }
}

export async function preloadAllDevices() {
  await deviceLoader.initialize({ preloadAll: true });
  await syncAllLoadedBrands();
}

async function autoPrepareDetector() {
  if (typeof navigator !== 'undefined' && navigator.userAgent) {
    await prepareDetectorForUA(navigator.userAgent, { fallbackLoadAll: true });
  } else {
    await preloadAllDevices();
  }
}

autoPrepareDetector().catch(console.error);

export {
  createDetector,
  detector,
  deviceLoader
};

export type {
  DetectionResult,
  DeviceType,
  ModelRule
};

