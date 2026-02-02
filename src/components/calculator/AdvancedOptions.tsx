'use client';

import { useState } from 'react';

interface AdvancedOptionsProps {
  dependents: number;
  nonTaxable: number;
  onDependentsChange: (value: number) => void;
  onNonTaxableChange: (value: number) => void;
}

export function AdvancedOptions({
  dependents,
  nonTaxable,
  onDependentsChange,
  onNonTaxableChange,
}: AdvancedOptionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-t border-gray-100 pt-4 mt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
      >
        <span className="text-sm text-gray-500">고급 옵션</span>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="mt-4 space-y-4 p-4 bg-gray-50 rounded-xl">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              부양가족 수 (본인 포함)
            </label>
            <select
              value={dependents}
              onChange={(e) => onDependentsChange(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <option key={n} value={n}>
                  {n}명
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-400 mt-1">
              본인 1명 + 배우자, 자녀, 부모 등
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              월 비과세 수당
            </label>
            <div className="flex gap-2">
              {[0, 100000, 200000].map((amount) => (
                <button
                  key={amount}
                  onClick={() => onNonTaxableChange(amount)}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                    nonTaxable === amount
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {amount === 0 ? '없음' : `${amount / 10000}만원`}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-1">
              식대, 교통비 등 비과세 항목
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-lg p-3">
            <p className="text-xs text-amber-700">
              고급 옵션은 Phase 2 기능입니다. 현재는 표준 모델(부양가족 1명, 비과세 없음)로 계산됩니다.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
