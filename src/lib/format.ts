// Number formatting utilities for Korean Won

export function formatKRW(amount: number): string {
  return new Intl.NumberFormat('ko-KR').format(Math.round(amount));
}

export function formatKRWWithUnit(amount: number): string {
  const rounded = Math.round(amount);
  if (rounded >= 100_000_000) {
    return `${(rounded / 100_000_000).toFixed(1)}억원`;
  }
  if (rounded >= 10_000) {
    return `${formatKRW(rounded)}원`;
  }
  return `${formatKRW(rounded)}원`;
}

export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

export function formatDelta(amount: number): string {
  const sign = amount >= 0 ? '+' : '';
  return `${sign}${formatKRW(amount)}원`;
}

export function parseNumberInput(value: string): number {
  // Remove commas and non-numeric characters except digits
  const cleaned = value.replace(/[^0-9]/g, '');
  return parseInt(cleaned, 10) || 0;
}

// Round to nearest 10원 (Korean convention)
export function roundToTen(amount: number): number {
  return Math.round(amount / 10) * 10;
}
