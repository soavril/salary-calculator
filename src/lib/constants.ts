// Phase 1: 2026 Korean tax/insurance rates
// Simplified model for typical employee scenario

export const TAX_YEAR = 2026;

// 4대보험 요율 (근로자 부담분)
export const NATIONAL_PENSION_RATE = 0.045;          // 4.5%
export const NATIONAL_PENSION_MAX_MONTHLY = 265_500; // 월 최대 납부액

export const HEALTH_INSURANCE_RATE = 0.03545;        // 3.545%
export const LONG_TERM_CARE_RATE = 0.1281;           // 건강보험의 12.81%

export const EMPLOYMENT_INSURANCE_RATE = 0.009;      // 0.9%

// 소득세 간이 구간 (근사치 - Phase 1용 단순화)
// 실제 간이세액표는 더 복잡하지만, Phase 1은 비교/체감에 집중
export const INCOME_TAX_BRACKETS = [
  { min: 0, max: 14_000_000, rate: 0.06, deduction: 0 },
  { min: 14_000_000, max: 50_000_000, rate: 0.15, deduction: 1_260_000 },
  { min: 50_000_000, max: 88_000_000, rate: 0.24, deduction: 5_760_000 },
  { min: 88_000_000, max: 150_000_000, rate: 0.35, deduction: 15_440_000 },
  { min: 150_000_000, max: 300_000_000, rate: 0.38, deduction: 19_940_000 },
  { min: 300_000_000, max: 500_000_000, rate: 0.40, deduction: 25_940_000 },
  { min: 500_000_000, max: 1_000_000_000, rate: 0.42, deduction: 35_940_000 },
  { min: 1_000_000_000, max: Infinity, rate: 0.45, deduction: 65_940_000 },
];

// 지방소득세
export const LOCAL_TAX_RATE = 0.1; // 소득세의 10%

// 프리랜서 원천징수율
export const FREELANCER_WITHHOLDING_RATE = 0.033; // 3.3%

// 간이과세 사업자 추정 세율 (매우 단순화)
export const SIMPLE_BUSINESS_EFFECTIVE_RATE = 0.05; // ~5% rough estimate
