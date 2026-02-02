'use client';

import { formatKRW, parseNumberInput } from '@/lib/format';

interface SalaryInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  unit?: string;
  hint?: string;
  error?: string;
}

export function SalaryInput({
  label,
  value,
  onChange,
  placeholder = '금액을 입력하세요',
  unit = '원',
  hint,
  error,
}: SalaryInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseNumberInput(e.target.value);
    onChange(parsed);
  };

  // 만원 단위 표시
  const displayManwon = value >= 10000 ? `${(value / 10000).toLocaleString()}만원` : null;

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          inputMode="numeric"
          value={value > 0 ? formatKRW(value) : ''}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full px-4 py-3 text-lg border rounded-xl outline-none transition-all ${
            error
              ? 'border-red-300 focus:ring-2 focus:ring-red-500 focus:border-transparent'
              : 'border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          }`}
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
          {unit}
        </span>
      </div>
      {/* 만원 단위 힌트 */}
      {displayManwon && !error && (
        <p className="text-xs text-blue-600 font-medium">{displayManwon}</p>
      )}
      {/* 커스텀 힌트 */}
      {hint && !error && (
        <p className="text-xs text-gray-500">{hint}</p>
      )}
      {/* 에러 메시지 */}
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

// 간단한 숫자 입력 (만원 단위 없음)
interface NumberInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  suffix?: string;
}

export function NumberInput({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  suffix = '',
}: NumberInputProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={value}
          onChange={(e) => {
            const v = parseInt(e.target.value, 10);
            if (!isNaN(v) && v >= min && v <= max) onChange(v);
          }}
          min={min}
          max={max}
          className="w-20 px-3 py-2 text-center border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
        {suffix && <span className="text-sm text-gray-500">{suffix}</span>}
      </div>
    </div>
  );
}
