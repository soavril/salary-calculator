'use client';

import { useState, useMemo } from 'react';
import { Card, CardTitle } from '@/components/ui/Card';
import { SalaryInput } from '@/components/ui/Input';
import { QuickPresets } from './QuickPresets';
import { calculateWorkTypeComparison } from '@/lib/calculations';
import { formatKRW, formatPercent } from '@/lib/format';

export function WorkTypeCompare() {
  const [annualIncome, setAnnualIncome] = useState(50_000_000);

  const comparison = useMemo(() => {
    if (annualIncome > 0) {
      return calculateWorkTypeComparison(annualIncome);
    }
    return null;
  }, [annualIncome]);

  // 가장 유리한 옵션 찾기
  const bestOption = comparison
    ? comparison.reduce((best, current) =>
        current.monthlyNet > best.monthlyNet ? current : best
      )
    : null;

  return (
    <div className="space-y-6">
      {/* Input */}
      <Card>
        <CardTitle subtitle="같은 수입일 때 고용형태별 실수령 비교">
          연간 수입 입력
        </CardTitle>

        {/* Quick Presets */}
        <div className="mb-4">
          <QuickPresets onSelect={setAnnualIncome} selected={annualIncome} />
        </div>

        <SalaryInput
          label="예상 연간 수입"
          value={annualIncome}
          onChange={setAnnualIncome}
          placeholder="연간 수입"
        />
      </Card>

      {/* Comparison Cards - Reserved height */}
      <div className="min-h-[350px]">
        {comparison && (
          <>
            {/* 3-Column Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {comparison.map((item) => {
                const isBest = item.type === bestOption?.type;
                return (
                  <Card
                    key={item.type}
                    className={isBest ? 'border-2 border-blue-300 bg-gradient-to-b from-blue-50 to-white ring-2 ring-blue-100' : 'bg-white'}
                  >
                    <div className="text-center">
                      {/* 라벨 뱃지 */}
                      <div className="mb-3">
                        {isBest && (
                          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-blue-600 text-white mb-1">
                            실수령 최대
                          </span>
                        )}
                        <span
                          className={`block text-sm font-semibold ${
                            isBest ? 'text-blue-700' : 'text-gray-700'
                          }`}
                        >
                          {item.label}
                        </span>
                      </div>

                      {/* 월 실수령 */}
                      <div className="mb-3">
                        <p className="text-xs text-gray-400 mb-1">월 실수령</p>
                        <p className={`text-3xl font-bold ${isBest ? 'text-blue-600' : 'text-gray-900'}`}>
                          {formatKRW(item.monthlyNet)}
                          <span className="text-sm font-normal text-gray-400">원</span>
                        </p>
                      </div>

                      {/* 공제 정보 */}
                      <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-2 space-y-1">
                        <div className="flex justify-between">
                          <span>월 세전</span>
                          <span>{formatKRW(item.monthlyGross)}원</span>
                        </div>
                        <div className="flex justify-between">
                          <span>공제율</span>
                          <span className="text-red-500">-{formatPercent(item.deductionRate)}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* 차이 비교 요약 */}
            <Card className="mb-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-gray-400 text-xs mb-1">연 수입</p>
                  <p className="text-xl font-bold text-yellow-400">
                    {Math.round(annualIncome / 10000).toLocaleString()}만원
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">정규직 실수령</p>
                  <p className="text-xl font-bold text-white">
                    {formatKRW(comparison[0].monthlyNet)}원
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">프리랜서 실수령</p>
                  <p className="text-xl font-bold text-green-400">
                    {formatKRW(comparison[1].monthlyNet)}원
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-700 text-center">
                <p className="text-sm text-gray-300">
                  프리랜서가 월{' '}
                  <span className="text-green-400 font-semibold">
                    +{formatKRW(comparison[1].monthlyNet - comparison[0].monthlyNet)}원
                  </span>{' '}
                  더 받지만, 종합소득세 신고 시 추가 납부 가능
                </p>
              </div>
            </Card>

            {/* Caveats - 더 명확하게 */}
            <Card className="bg-amber-50 border border-amber-200">
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-amber-800 mb-2">반드시 확인하세요</p>
                  <ul className="space-y-2 text-sm text-amber-700">
                    <li className="flex items-start gap-2">
                      <span className="font-medium text-amber-800">정규직:</span>
                      <span>4대보험 혜택 (실업급여, 국민연금 등) 포함</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-medium text-amber-800">프리랜서:</span>
                      <span>3.3%는 원천징수만, 5월 종합소득세 신고 시 추가 세금 발생 가능</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-medium text-amber-800">간이사업자:</span>
                      <span>단순 추정치, 업종/경비율에 따라 크게 달라짐</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
