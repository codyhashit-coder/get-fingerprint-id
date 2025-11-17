#!/usr/bin/env tsx

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createDetector, ModelRule, DetectionResult } from '../src/sass-id';

interface ReplaySample {
  ua: string;
  screen?: {
    width: number;
    height: number;
    pixelRatio?: number;
  };
  expectedBrand?: string;
  expectedModel?: string;
  extra?: Record<string, any>;
  note?: string;
}

interface SampleReport {
  sample: ReplaySample;
  result: DetectionResult;
  brandMatched?: boolean;
  modelMatched?: boolean;
}

async function loadDeviceRules(dir: string): Promise<ModelRule[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const rules: ModelRule[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      rules.push(...(await loadDeviceRules(fullPath)));
      continue;
    }

    if (!entry.isFile() || !entry.name.endsWith('.json')) {
      continue;
    }

    try {
      const fileContent = await fs.readFile(fullPath, 'utf8');
      const parsed = JSON.parse(fileContent);
      if (Array.isArray(parsed)) {
        parsed.forEach(rule => rules.push(rule));
      } else {
        console.warn(`跳过无效的规则文件（需要数组格式）：${fullPath}`);
      }
    } catch (error) {
      console.error(`读取设备规则失败：${fullPath}`, error);
    }
  }

  return rules;
}

function normalize(value?: string) {
  return (value || '').trim().toLowerCase();
}

function evaluateSample(
  detector: ReturnType<typeof createDetector>,
  sample: ReplaySample
): SampleReport {
  const screenW = sample.screen?.width ?? 0;
  const screenH = sample.screen?.height ?? 0;

  const result = detector.detectDevice(sample.ua, screenW, screenH, {
    pixelRatio: sample.screen?.pixelRatio,
    ...sample.extra
  });

  const brandMatched = sample.expectedBrand
    ? normalize(result.brand) === normalize(sample.expectedBrand)
    : undefined;

  const modelMatched = sample.expectedModel
    ? normalize(result.model) === normalize(sample.expectedModel)
    : undefined;

  return { sample, result, brandMatched, modelMatched };
}

function printSummary(reports: SampleReport[]) {
  const total = reports.length;
  const brandExpectations = reports.filter(r => r.brandMatched !== undefined);
  const modelExpectations = reports.filter(r => r.modelMatched !== undefined);

  const brandHits = brandExpectations.filter(r => r.brandMatched).length;
  const modelHits = modelExpectations.filter(r => r.modelMatched).length;

  console.log('===== 回放统计 =====');
  console.log(`样本总数：${total}`);
  console.log(
    `品牌命中：${brandHits}/${brandExpectations.length || 0}` +
      (brandExpectations.length
        ? ` (${((brandHits / brandExpectations.length) * 100).toFixed(1)}%)`
        : '')
  );
  console.log(
    `型号命中：${modelHits}/${modelExpectations.length || 0}` +
      (modelExpectations.length
        ? ` (${((modelHits / modelExpectations.length) * 100).toFixed(1)}%)`
        : '')
  );

  const misses = reports.filter(
    r =>
      (r.brandMatched === false || r.modelMatched === false) &&
      (r.sample.expectedBrand || r.sample.expectedModel)
  );

  if (misses.length) {
    console.log('\n--- 未命中的样本 ---');
    misses.forEach((miss, index) => {
      console.log(`\n[${index + 1}] UA: ${miss.sample.ua}`);
      if (miss.sample.note) {
        console.log(`备注：${miss.sample.note}`);
      }
      if (miss.sample.expectedBrand) {
        console.log(
          `期待品牌：${miss.sample.expectedBrand} | 实际：${miss.result.brand ?? 'unknown'}`
        );
      }
      if (miss.sample.expectedModel) {
        console.log(
          `期待型号：${miss.sample.expectedModel} | 实际：${miss.result.model ?? 'unknown'}`
        );
      }
      console.log(
        `屏幕：${miss.sample.screen?.width ?? '-'}x${miss.sample.screen?.height ?? '-'} @ ${
          miss.sample.screen?.pixelRatio ?? '-'
        }`
      );
      console.log(`置信度：${(miss.result.confidence * 100).toFixed(1)}%`);
      if (miss.result.matchedRuleIds.length) {
        console.log(`匹配规则：${miss.result.matchedRuleIds.join(', ')}`);
      }
    });
  }
}

async function main() {
  const [, , inputArg] = process.argv;
  if (!inputArg) {
    console.error('用法：npx tsx scripts/replay-ua.ts <samples.json>');
    process.exit(1);
  }

  const samplePath = path.isAbsolute(inputArg)
    ? inputArg
    : path.resolve(process.cwd(), inputArg);

  const samplesContent = await fs.readFile(samplePath, 'utf8');
  const samples = JSON.parse(samplesContent);
  if (!Array.isArray(samples)) {
    throw new Error('样本文件必须是数组格式');
  }

  console.log('载入设备规则...');
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const rulesDir = path.resolve(__dirname, '../src/rules/devices');
  const rules = await loadDeviceRules(rulesDir);
  console.log(`共加载 ${rules.length} 条规则`);

  const detector = createDetector([]);
  detector.loadModelDB(rules);

  console.log('开始回放...');
  const reports = samples.map(sample => evaluateSample(detector, sample));
  printSummary(reports);
}

main().catch(error => {
  console.error('回放任务失败：', error);
  process.exit(1);
});

