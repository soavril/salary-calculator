'use client';

import { useState, useMemo, useCallback } from 'react';
import { Card, CardTitle } from '@/components/ui/Card';
import { SalaryInput } from '@/components/ui/Input';
import { ShareButton } from '@/components/ui/Button';
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
    // 인상 후 연봉: 현재 + 10% 또는 +500만 중 더 큰 값으로 설정
    const tenPercent = value * 0.1;
    const fiveHundred = 5_000_000;
    const raise = Math.max(tenPercent, fiveHundred);
    setNewSalary(value + raise);
  }, []);

  // 현재 연봉 직접 입력 시에도 인상 후 연봉 자동 조정
  const handleCurrentSalaryChange = useCallback((value: number) => {
    setCurrentSalary(value);
    // 인상 후 연봉이 현재 연봉보다 작거나 같으면 자동 조정
    if (value >= newSalary) {
      const raise = Math.max(value * 0.1, 5_000_000);
      setNewSalary(value + raise);
    }
  }, [newSalary]);

  // 인상 후 연봉이 현재 연봉보다 작으면 경고 표시
  const isInvalidRange = newSalary <= currentSalary;

  const comparison = useMemo(() => {
    if (currentSalary > 0 && newSalary > currentSalary) {
      return calculateRaiseComparison(currentSalary, newSalary);
    }
    return null;
  }, [currentSalary, newSalary]);

  const handleShare = async () => {
    if (!comparison) return;
    const text = generateShareText(comparison);
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card>
        <CardTitle>연봉 인상 실수령 비교</CardTitle>

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
          <div>
            <SalaryInput
              label="인상 후 연봉"
              value={newSalary}
              onChange={setNewSalary}
              placeholder="인상 후 연봉"
            />
            {isInvalidRange && currentSalary > 0 && (
              <p className="text-xs text-red-500 mt-1">
                인상 후 연봉은 현재 연봉보다 높아야 합니다
              </p>
            )}
          </div>
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
                <p className={`text-4xl font-bold ${comparison.netDelta >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
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
                    상세 보기
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
                    상세 보기
                  </Link>
                </div>
              </div>
            </Card>

            {/* Where the money went */}
            <Card className="mb-4">
              <CardTitle>인상분은 어디로 갔나?</CardTitle>
              <div className="space-y-3">
                {[
                  { label: '국민연금', value: comparison.deductionDelta.nationalPension },
                  { label: '건강보험', value: comparison.deductionDelta.healthInsurance },
                  { label: '장기요양', value: comparison.deductionDelta.longTermCare },
                  { label: '고용보험', value: comparison.deductionDelta.employmentInsurance },
                  { label: '소득세', value: comparison.deductionDelta.incomeTax },
                  { label: '지방소득세', value: comparison.deductionDelta.localTax },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-gray-600">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <div
                        className="h-2 bg-red-200 rounded"
                        style={{
                          width: `${Math.min(Math.abs(item.value) / comparison.grossDelta * 200, 100)}px`,
                        }}
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
            <Card className="bg-gray-900 text-white">
              {/* 핵심 비교 */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-gray-400 text-xs mb-1">연봉 인상액</p>
                  <p className="text-2xl font-bold text-yellow-400">
                    +{Math.round(comparison.grossDelta / 10000)}만원
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-xs mb-1">실수령 증가</p>
                  <p className="text-2xl font-bold text-green-400">
                    +{Math.round(comparison.netDelta / 10000)}만원
                  </p>
                </div>
              </div>

              {/* 체감 인상률 강조 */}
              <div className="bg-gray-800 rounded-lg p-3 mb-4 text-center">
                <p className="text-gray-400 text-xs mb-1">실제 체감 인상률</p>
                <p className="text-3xl font-bold text-white">
                  {formatPercent(comparison.effectiveGainPercent, 0)}
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  인상분의 {formatPercent(100 - comparison.effectiveGainPercent, 0)}는 세금·보험으로
                </p>
              </div>

              <ShareButton onClick={handleShare} copied={copied} />
            </Card>
          </>
        )}

        {/* Empty state when invalid range */}
        {isInvalidRange && currentSalary > 0 && newSalary > 0 && (
          <Card className="text-center py-8">
            <p className="text-gray-500">
              인상 후 연봉을 현재 연봉보다 높게 설정해주세요
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
