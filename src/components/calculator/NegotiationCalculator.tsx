'use client';

import { useState, useMemo } from 'react';
import { Card, CardTitle } from '@/components/ui/Card';
import { SalaryInput } from '@/components/ui/Input';
import { calculateRequiredGross, calculateRaiseComparison } from '@/lib/calculations';
import { formatKRW } from '@/lib/format';

type Mode = 'targetNet' | 'compareOffer';

export function NegotiationCalculator() {
  const [mode, setMode] = useState<Mode>('targetNet');
  const [currentSalary, setCurrentSalary] = useState(50_000_000);
  const [targetNetIncrease, setTargetNetIncrease] = useState(300_000);
  const [offerSalary, setOfferSalary] = useState(55_000_000);

  const result = useMemo(() => {
    if (mode === 'targetNet' && currentSalary > 0 && targetNetIncrease > 0) {
      return calculateRequiredGross(currentSalary, targetNetIncrease);
    }
    if (mode === 'compareOffer' && currentSalary > 0 && offerSalary > 0) {
      return calculateRaiseComparison(currentSalary, offerSalary);
    }
    return null;
  }, [mode, currentSalary, targetNetIncrease, offerSalary]);

  return (
    <div className="space-y-6">
      {/* Mode Tabs */}
      <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
        <button
          onClick={() => setMode('targetNet')}
          className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
            mode === 'targetNet'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          목표 실수령 역산
        </button>
        <button
          onClick={() => setMode('compareOffer')}
          className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
            mode === 'compareOffer'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          제안 연봉 비교
        </button>
      </div>

      {/* Input Section */}
      <Card>
        <CardTitle>
          {mode === 'targetNet' ? '원하는 실수령 인상액 계산' : '제안받은 연봉 비교'}
        </CardTitle>
        <div className="space-y-4">
          <SalaryInput
            label="현재 연봉"
            value={currentSalary}
            onChange={setCurrentSalary}
            placeholder="현재 연봉"
          />
          {mode === 'targetNet' ? (
            <SalaryInput
              label="원하는 월 실수령 인상액"
              value={targetNetIncrease}
              onChange={setTargetNetIncrease}
              placeholder="예: 300,000"
            />
          ) : (
            <SalaryInput
              label="제안받은 연봉"
              value={offerSalary}
              onChange={setOfferSalary}
              placeholder="제안받은 연봉"
            />
          )}
        </div>
      </Card>

      {/* Results - Reserved height */}
      <div className="min-h-[250px]">
        {mode === 'targetNet' && result && 'requiredAnnualGross' in result && (
          <Card className="bg-gradient-to-br from-green-50 to-white">
            <div className="text-center py-4">
              <p className="text-sm text-gray-500 mb-3">필요한 연봉 인상액</p>
              <p className="text-4xl font-bold text-green-600 mb-2">
                +{formatKRW(result.requiredGrossDelta)}원
              </p>
              <p className="text-gray-600 mb-4">
                목표 연봉: <span className="font-semibold">{formatKRW(result.requiredAnnualGross)}원</span>
              </p>
              <div className="bg-white rounded-xl p-4 border border-green-100">
                <p className="text-gray-800">{result.message}</p>
              </div>
            </div>
          </Card>
        )}

        {mode === 'compareOffer' && result && 'netDelta' in result && (
          <Card className="bg-gradient-to-br from-blue-50 to-white">
            <div className="text-center py-4">
              <p className="text-sm text-gray-500 mb-3">실수령 차이</p>
              <p className={`text-4xl font-bold mb-2 ${result.netDelta >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                {result.netDelta >= 0 ? '+' : ''}{formatKRW(result.netDelta)}원
                <span className="text-lg font-normal text-gray-400">/월</span>
              </p>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-white rounded-xl p-3 border">
                  <p className="text-xs text-gray-500">현재 실수령</p>
                  <p className="text-lg font-semibold">{formatKRW(result.before.monthlyNet)}원</p>
                </div>
                <div className="bg-white rounded-xl p-3 border border-blue-200">
                  <p className="text-xs text-blue-600">제안 실수령</p>
                  <p className="text-lg font-semibold text-blue-700">{formatKRW(result.after.monthlyNet)}원</p>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Tips */}
      <Card className="bg-gray-50">
        <p className="text-sm text-gray-600">
          <span className="font-semibold">협상 팁:</span> 연봉 인상분의 약 60~70%만 실수령으로 돌아옵니다.
          원하는 실수령 인상액의 1.5배 이상을 연봉으로 요청하세요.
        </p>
      </Card>
    </div>
  );
}
