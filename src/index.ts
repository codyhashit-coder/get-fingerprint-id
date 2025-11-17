import { deviceLoader } from './rules/deviceLoader';
import { createDetector, DetectionResult, DeviceType, ModelRule } from './sass-id';

// Create detector with initial empty rules
const detector = createDetector([]);

// Initialize device loader and load device data
async function initializeDetector() {
  try {
    await deviceLoader.initialize();
    // Get all devices and add them to the detector
    const allDevices = deviceLoader.getAllDevices();
    detector.loadModelDB(allDevices);
  } catch (error) {
    console.error('Failed to initialize device detector:', error);
  }
}

// Start initialization
initializeDetector().catch(console.error);

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

