// Pre-calculated salary table for SEO and quick reference
// Covers 2000만원 ~ 1.5억 range (most searched)

import { calculateSalary } from './calculations';
import type { SalaryResult } from '@/types/salary';

export interface SalaryTableRow {
  annual: number;          // 연봉 (만원 단위로 표시)
  annualRaw: number;       // 연봉 (원)
  monthlyGross: number;    // 월 세전
  monthlyNet: number;      // 월 실수령
  totalDeduction: number;  // 월 공제합계
  effectiveRate: number;   // 실효세율 %
}

// Common salary points that people search for
export const SALARY_PRESETS = [
  2400, 2700, 3000, 3300, 3600, 4000, 4500, 5000,
  5500, 6000, 7000, 8000, 9000, 10000, 12000, 15000
];

// Generate full table from 2000 to 15000 (만원) in 100만원 increments
export function generateSalaryTable(): SalaryTableRow[] {
  const rows: SalaryTableRow[] = [];

  for (let salary = 2000; salary <= 15000; salary += 100) {
    const annualRaw = salary * 10000;
    const result = calculateSalary(annualRaw);

    rows.push({
      annual: salary,
      annualRaw,
      monthlyGross: result.monthlyGross,
      monthlyNet: result.monthlyNet,
      totalDeduction: result.breakdown.total,
      effectiveRate: result.effectiveTaxRate,
    });
  }

  return rows;
}

// Get specific salary data (for individual pages)
export function getSalaryData(annualInManwon: number): SalaryTableRow & { result: SalaryResult } {
  const annualRaw = annualInManwon * 10000;
  const result = calculateSalary(annualRaw);

  return {
    annual: annualInManwon,
    annualRaw,
    monthlyGross: result.monthlyGross,
    monthlyNet: result.monthlyNet,
    totalDeduction: result.breakdown.total,
    effectiveRate: result.effectiveTaxRate,
    result,
  };
}

// Get nearby salaries for comparison
export function getNearbySalaries(annualInManwon: number): number[] {
  const nearby = [
    annualInManwon - 500,
    annualInManwon - 200,
    annualInManwon,
    annualInManwon + 200,
    annualInManwon + 500,
  ].filter(s => s >= 2000 && s <= 20000);

  return nearby;
}

// SEO: Generate list of popular salary amounts for sitemap
export const POPULAR_SALARIES = [
  2400, 2500, 2700, 3000, 3200, 3500, 3600, 4000, 4200, 4500,
  5000, 5500, 6000, 6500, 7000, 7500, 8000, 8500, 9000, 10000,
  11000, 12000, 13000, 15000
];
