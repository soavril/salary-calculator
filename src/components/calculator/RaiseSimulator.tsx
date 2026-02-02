'use client';

import { useState, useMemo, useCallback } from 'react';
import { Card, CardTitle } from '@/components/ui/Card';
import { SalaryInput } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
// import { ShareModal } from '@/components/ui/ShareModal'; // 애드센스 승인 후 활성화
import { QuickPresets, RaisePresets } from './QuickPresets';
import { calculateRaiseComparison, generateShareText } from '@/lib/calculations';
import { formatKRW, formatPercent, formatDelta } from '@/lib/format';
import Link from 'next/link';

export function RaiseSimulator() {
  const [currentSalary, setCurrentSalary] = useState(50_000_000);
  const [newSalary, setNewSalary] = useState(55_000_000);
  const [copied, setCopied] = useState(false);

  // 현재 연봉 선택 시 인상 후 연봉도 자동 조정 (+10% 또는 +500만 중 큰 값)
  const handleCurrentSalaryPreset = useCallback((value: number) => {
    setCurrentSalary(value);
    const tenPercent = value * 0.1;
    const fiveHundred = 5_000_000;
    const raise = Math.max(tenPercent, fiveHundred);
    setNewSalary(value + raise);
  }, []);

  // 현재 연봉 직접 입력 시에도 인상 후 연봉 자동 조정
  const handleCurrentSalaryChange = useCallback((value: number) => {
    setCurrentSalary(value);
    setNewSalary((prevNew) => {
      if (value >= prevNew) {
        const raise = Math.max(value * 0.1, 5_000_000);
        return value + raise;
      }
      return prevNew;
    });
  }, []);

  // 인상 후 연봉이 현재 연봉보다 작으면 경고 표시
  const isInvalidRange = newSalary <= currentSalary;

  const comparison = useMemo(() => {
    if (currentSalary > 0 && newSalary > currentSalary) {
      return calculateRaiseComparison(currentSalary, newSalary);
    }
    return null;
  }, [currentSalary, newSalary]);

  const shareText = useMemo(() => {
    if (comparison) return generateShareText(comparison);
    return '';
  }, [comparison]);

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card>
        <CardTitle subtitle="연봉 인상 후 실제 손에 쥐는 돈은?">
          연봉 인상 실수령 비교
        </CardTitle>

        {/* Quick Presets */}
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-2">현재 연봉 빠른 선택</p>
          <QuickPresets onSelect={handleCurrentSalaryPreset} selected={currentSalary} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SalaryInput
            label="현재 연봉"
            value={currentSalary}
            onChange={handleCurrentSalaryChange}
            placeholder="현재 연봉"
          />
          <SalaryInput
            label="인상 후 연봉"
            value={newSalary}
            onChange={setNewSalary}
            placeholder="인상 후 연봉"
            error={isInvalidRange && currentSalary > 0 ? '현재 연봉보다 높아야 합니다' : undefined}
          />
        </div>

        {/* Raise Presets */}
        <div className="mt-4">
          <RaisePresets currentSalary={currentSalary} onSelect={setNewSalary} />
        </div>
      </Card>

      {/* Results Section - Reserved height to prevent CLS */}
      <div className="min-h-[400px]">
        {comparison && comparison.grossDelta > 0 && (
          <>
            {/* Headline Result */}
            <Card className="mb-4 bg-gradient-to-br from-blue-50 to-white">
              <div className="text-center py-4">
                <p className="text-sm text-gray-500 mb-2">실수령 증가액</p>
                <p className="text-4xl font-bold text-blue-600">
                  {formatDelta(comparison.netDelta)}
                  <span className="text-lg font-normal text-gray-400">/월</span>
                </p>
                <p className="text-lg text-gray-600 mt-2">
                  연봉 {formatKRW(comparison.grossDelta)}원 인상 중{' '}
                  <span className="font-semibold text-blue-600">
                    {formatPercent(comparison.effectiveGainPercent)}
                  </span>
                  만 손에 남습니다
                </p>
              </div>
            </Card>

            {/* Before/After Comparison */}
            <Card className="mb-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1">현재 월 실수령</p>
                  <p className="text-2xl font-bold text-gray-700">
                    {formatKRW(comparison.before.monthlyNet)}원
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    세전 {formatKRW(comparison.before.monthlyGross)}원
                  </p>
                  <Link
                    href={`/salary/${Math.round(currentSalary / 10000)}`}
                    className="text-xs text-blue-500 hover:underline mt-1 inline-block"
                  >
                    상세 보기 →
                  </Link>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <p className="text-sm text-blue-600 mb-1">인상 후 월 실수령</p>
                  <p className="text-2xl font-bold text-blue-700">
                    {formatKRW(comparison.after.monthlyNet)}원
                  </p>
                  <p className="text-xs text-blue-400 mt-1">
                    세전 {formatKRW(comparison.after.monthlyGross)}원
                  </p>
                  <Link
                    href={`/salary/${Math.round(newSalary / 10000)}`}
                    className="text-xs text-blue-500 hover:underline mt-1 inline-block"
                  >
                    상세 보기 →
                  </Link>
                </div>
              </div>
            </Card>

            {/* Where the money went */}
            <Card className="mb-4">
              <CardTitle subtitle="인상분이 어디로 빠져나갔는지 확인하세요">
                공제 증가 내역
              </CardTitle>
              <div className="space-y-3">
                {[
                  { label: '국민연금', value: comparison.deductionDelta.nationalPension, color: 'bg-blue-200' },
                  { label: '건강보험', value: comparison.deductionDelta.healthInsurance, color: 'bg-green-200' },
                  { label: '장기요양', value: comparison.deductionDelta.longTermCare, color: 'bg-teal-200' },
                  { label: '고용보험', value: comparison.deductionDelta.employmentInsurance, color: 'bg-purple-200' },
                  { label: '소득세', value: comparison.deductionDelta.incomeTax, color: 'bg-red-200' },
                  { label: '지방소득세', value: comparison.deductionDelta.localTax, color: 'bg-orange-200' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-2 ${item.color} rounded-full transition-all`}
                        style={{
                          width: `${Math.min(Math.max(Math.abs(item.value) / comparison.grossDelta * 150, 8), 100)}px`,
                        }}
                        role="progressbar"
                        aria-valuenow={Math.abs(item.value)}
                        aria-label={`${item.label} 증가액`}
                      />
                      <span className="text-sm font-medium text-red-600 w-24 text-right">
                        +{formatKRW(Math.abs(item.value))}원
                      </span>
                    </div>
                  </div>
                ))}
                <div className="border-t pt-3 flex items-center justify-between font-semibold">
                  <span className="text-gray-800">공제 증가 합계</span>
                  <span className="text-red-600">
                    +{formatKRW(comparison.deductionDelta.total)}원/월
                  </span>
                </div>
              </div>
            </Card>

            {/* Conclusion & Share */}
            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
              {/* 핵심 비교 */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-white/10 rounded-xl">
                  <p className="text-gray-400 text-xs mb-1">연봉 인상액</p>
                  <p className="text-2xl font-bold text-yellow-400">
                    +{Math.round(comparison.grossDelta / 10000)}만원
                  </p>
                  <p className="text-xs text-gray-500">연</p>
                </div>
                <div className="text-center p-3 bg-white/10 rounded-xl">
                  <p className="text-gray-400 text-xs mb-1">실수령 증가</p>
                  <p className="text-2xl font-bold text-green-400">
                    +{Math.round(comparison.netDelta / 10000)}만원
                  </p>
                  <p className="text-xs text-gray-500">연</p>
                </div>
              </div>

              {/* 체감 인상률 강조 */}
              <div className="bg-white/5 rounded-xl p-4 mb-4 text-center border border-white/10">
                <p className="text-gray-400 text-xs mb-1">실제 체감 인상률</p>
                <p className="text-4xl font-bold text-white mb-1">
                  {formatPercent(comparison.effectiveGainPercent, 0)}
                </p>
                <p className="text-gray-400 text-sm">
                  인상분의 <span className="text-red-400 font-medium">{formatPercent(100 - comparison.effectiveGainPercent, 0)}</span>는 세금·보험으로 빠져나갑니다
                </p>
              </div>

              <Button
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(shareText);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  } catch {
                    alert(shareText);
                  }
                }}
                variant="secondary"
                fullWidth
                icon={
                  copied ? (
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  )
                }
              >
                {copied ? '복사 완료!' : '결과 복사하기'}
              </Button>
            </Card>

            {/* Cross-sell CTAs */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <Link
                href="/negotiate"
                className="p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all group"
              >
                <p className="font-medium text-gray-900 group-hover:text-blue-700 mb-1">협상 역산</p>
                <p className="text-xs text-gray-500">원하는 실수령을 위한 연봉은?</p>
              </Link>
              <Link
                href="/compare"
                className="p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all group"
              >
                <p className="font-medium text-gray-900 group-hover:text-blue-700 mb-1">고용형태 비교</p>
                <p className="text-xs text-gray-500">정규직 vs 프리랜서</p>
              </Link>
            </div>
          </>
        )}

        {/* Empty state when invalid range */}
        {isInvalidRange && currentSalary > 0 && newSalary > 0 && (
          <Card className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <p className="text-gray-600 font-medium mb-2">인상 후 연봉을 입력해주세요</p>
            <p className="text-sm text-gray-400">현재 연봉보다 높은 금액을 입력하면 결과가 표시됩니다</p>
          </Card>
        )}
      </div>

{/* 애드센스 승인 후 ShareModal 활성화 */}
    </div>
  );
}
