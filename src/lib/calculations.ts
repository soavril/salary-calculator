// Phase 1: Simplified calculation model
// Focus on directional accuracy and comparison, not filing-level precision

import {
  NATIONAL_PENSION_RATE,
  NATIONAL_PENSION_MAX_MONTHLY,
  HEALTH_INSURANCE_RATE,
  LONG_TERM_CARE_RATE,
  EMPLOYMENT_INSURANCE_RATE,
  INCOME_TAX_BRACKETS,
  LOCAL_TAX_RATE,
  FREELANCER_WITHHOLDING_RATE,
  SIMPLE_BUSINESS_EFFECTIVE_RATE,
} from './constants';
import { roundToTen } from './format';
import type {
  SalaryResult,
  DeductionBreakdown,
  RaiseComparison,
  NegotiationResult,
  WorkTypeComparison,
  WorkType,
} from '@/types/salary';

/**
 * Calculate monthly deductions for a regular employee
 * Simplified model: assumes typical employee, no special deductions
 */
export function calculateDeductions(monthlyGross: number): DeductionBreakdown {
  // 국민연금: 4.5%, capped
  const nationalPension = Math.min(
    monthlyGross * NATIONAL_PENSION_RATE,
    NATIONAL_PENSION_MAX_MONTHLY
  );

  // 건강보험: 3.545%
  const healthInsurance = monthlyGross * HEALTH_INSURANCE_RATE;

  // 장기요양보험: 건강보험의 12.81%
  const longTermCare = healthInsurance * LONG_TERM_CARE_RATE;

  // 고용보험: 0.9%
  const employmentInsurance = monthlyGross * EMPLOYMENT_INSURANCE_RATE;

  // 소득세: simplified bracket calculation
  // Using annual gross for bracket lookup, then monthly
  const annualGross = monthlyGross * 12;
  const incomeTax = calculateSimplifiedIncomeTax(annualGross) / 12;

  // 지방소득세: 소득세의 10%
  const localTax = incomeTax * LOCAL_TAX_RATE;

  const total = nationalPension + healthInsurance + longTermCare +
                employmentInsurance + incomeTax + localTax;

  return {
    nationalPension: roundToTen(nationalPension),
    healthInsurance: roundToTen(healthInsurance),
    longTermCare: roundToTen(longTermCare),
    employmentInsurance: roundToTen(employmentInsurance),
    incomeTax: roundToTen(incomeTax),
    localTax: roundToTen(localTax),
    total: roundToTen(total),
  };
}

/**
 * Simplified income tax calculation
 * Phase 1: Uses basic brackets without complex deductions
 */
function calculateSimplifiedIncomeTax(annualGross: number): number {
  // Apply standard deduction approximation (Phase 1 simplification)
  // Real calculation involves 근로소득공제, 인적공제, etc.
  // We use ~15% standard deduction as rough approximation
  const taxableIncome = annualGross * 0.85;

  const bracket = INCOME_TAX_BRACKETS.find(
    (b) => taxableIncome >= b.min && taxableIncome < b.max
  );

  if (!bracket) return 0;

  const tax = taxableIncome * bracket.rate - bracket.deduction;
  return Math.max(0, tax);
}

/**
 * Calculate full salary result for employee
 */
export function calculateSalary(annualGross: number): SalaryResult {
  const monthlyGross = annualGross / 12;
  const breakdown = calculateDeductions(monthlyGross);
  const monthlyNet = roundToTen(monthlyGross - breakdown.total);
  const effectiveTaxRate = (breakdown.total / monthlyGross) * 100;

  return {
    annualGross,
    monthlyGross: roundToTen(monthlyGross),
    monthlyNet,
    breakdown,
    effectiveTaxRate,
  };
}

/**
 * Compare before/after raise - HERO FEATURE
 * Shows where the money actually went
 */
export function calculateRaiseComparison(
  currentAnnual: number,
  newAnnual: number
): RaiseComparison {
  const before = calculateSalary(currentAnnual);
  const after = calculateSalary(newAnnual);

  const grossDelta = after.monthlyGross - before.monthlyGross;
  const netDelta = after.monthlyNet - before.monthlyNet;

  // What percentage of the raise do you actually keep?
  const effectiveGainPercent = grossDelta > 0
    ? (netDelta / grossDelta) * 100
    : 0;

  // Where did the rest go?
  const deductionDelta: DeductionBreakdown = {
    nationalPension: after.breakdown.nationalPension - before.breakdown.nationalPension,
    healthInsurance: after.breakdown.healthInsurance - before.breakdown.healthInsurance,
    longTermCare: after.breakdown.longTermCare - before.breakdown.longTermCare,
    employmentInsurance: after.breakdown.employmentInsurance - before.breakdown.employmentInsurance,
    incomeTax: after.breakdown.incomeTax - before.breakdown.incomeTax,
    localTax: after.breakdown.localTax - before.breakdown.localTax,
    total: after.breakdown.total - before.breakdown.total,
  };

  return {
    before,
    after,
    grossDelta,
    netDelta,
    effectiveGainPercent,
    deductionDelta,
  };
}

/**
 * Reverse calculation: find gross needed for desired net increase
 * Uses binary search for simplicity
 */
export function calculateRequiredGross(
  currentAnnual: number,
  desiredMonthlyNetIncrease: number
): NegotiationResult {
  const current = calculateSalary(currentAnnual);
  const targetMonthlyNet = current.monthlyNet + desiredMonthlyNetIncrease;

  // Binary search for required gross
  let low = currentAnnual;
  let high = currentAnnual * 3; // Generous upper bound
  let result = currentAnnual;

  for (let i = 0; i < 50; i++) {
    const mid = (low + high) / 2;
    const salary = calculateSalary(mid);

    if (salary.monthlyNet >= targetMonthlyNet) {
      result = mid;
      high = mid;
    } else {
      low = mid;
    }

    if (high - low < 10000) break;
  }

  // Round to nearest 만원 (10,000)
  const requiredAnnualGross = Math.ceil(result / 100000) * 100000;
  const requiredGrossDelta = requiredAnnualGross - currentAnnual;

  return {
    currentMonthlyNet: current.monthlyNet,
    targetMonthlyNet,
    requiredAnnualGross,
    requiredGrossDelta,
    message: `월 실수령 ${Math.round(desiredMonthlyNetIncrease / 10000)}만원 인상을 위해 연봉 최소 ${Math.round(requiredGrossDelta / 10000)}만원 인상이 필요합니다.`,
  };
}

/**
 * Compare different work types
 * Phase 1: Simplified estimates
 */
export function calculateWorkTypeComparison(
  annualIncome: number
): WorkTypeComparison[] {
  const monthlyIncome = annualIncome / 12;

  // 정규직
  const employee = calculateSalary(annualIncome);

  // 프리랜서 3.3% 원천징수
  const freelancerWithholding = monthlyIncome * FREELANCER_WITHHOLDING_RATE;
  const freelancerNet = monthlyIncome - freelancerWithholding;

  // 간이사업자 (very rough estimate)
  const simpleBusinessTax = monthlyIncome * SIMPLE_BUSINESS_EFFECTIVE_RATE;
  const simpleBusinessNet = monthlyIncome - simpleBusinessTax;

  return [
    {
      type: 'employee' as WorkType,
      label: '정규직',
      monthlyGross: roundToTen(monthlyIncome),
      monthlyNet: employee.monthlyNet,
      deductionRate: employee.effectiveTaxRate,
      caveat: '4대보험 + 소득세 포함',
    },
    {
      type: 'freelancer' as WorkType,
      label: '프리랜서 (3.3%)',
      monthlyGross: roundToTen(monthlyIncome),
      monthlyNet: roundToTen(freelancerNet),
      deductionRate: 3.3,
      caveat: '원천징수만 반영, 종합소득세 별도',
    },
    {
      type: 'simpleBusiness' as WorkType,
      label: '간이사업자',
      monthlyGross: roundToTen(monthlyIncome),
      monthlyNet: roundToTen(simpleBusinessNet),
      deductionRate: SIMPLE_BUSINESS_EFFECTIVE_RATE * 100,
      caveat: '단순 추정치, 실제와 다를 수 있음',
    },
  ];
}

/**
 * Generate shareable one-liner for raise comparison
 */
export function generateShareText(comparison: RaiseComparison): string {
  const grossDeltaMan = Math.round(comparison.grossDelta / 10000);
  const netDeltaMan = Math.round(comparison.netDelta / 10000);
  const keepPercent = Math.round(comparison.effectiveGainPercent);

  return `연봉 ${grossDeltaMan}만원 올렸는데 실수령은 ${netDeltaMan}만원만 늘었다. 실제 인상률 ${keepPercent}% 🤔`;
}
