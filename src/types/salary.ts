// Phase 1: Simplified types for traffic/engagement product
// No complex tax logic - focus on comparison and emotional insight

export interface DeductionBreakdown {
  nationalPension: number;      // 국민연금
  healthInsurance: number;      // 건강보험
  longTermCare: number;         // 장기요양보험
  employmentInsurance: number;  // 고용보험
  incomeTax: number;            // 소득세
  localTax: number;             // 지방소득세
  total: number;
}

export interface SalaryResult {
  annualGross: number;
  monthlyGross: number;
  monthlyNet: number;
  breakdown: DeductionBreakdown;
  effectiveTaxRate: number;     // percentage
}

export interface RaiseComparison {
  before: SalaryResult;
  after: SalaryResult;
  grossDelta: number;           // monthly gross increase
  netDelta: number;             // monthly net increase
  effectiveGainPercent: number; // what % of raise you actually keep
  deductionDelta: DeductionBreakdown;
}

export interface NegotiationResult {
  currentMonthlyNet: number;
  targetMonthlyNet: number;
  requiredAnnualGross: number;
  requiredGrossDelta: number;   // how much gross raise needed
  message: string;              // human-readable conclusion
}

export type WorkType = 'employee' | 'freelancer' | 'simpleBusiness';

export interface WorkTypeComparison {
  type: WorkType;
  label: string;
  monthlyGross: number;
  monthlyNet: number;
  deductionRate: number;        // percentage
  caveat: string;
}
