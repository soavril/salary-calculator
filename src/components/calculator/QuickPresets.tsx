'use client';

import { useState } from 'react';

interface QuickPresetsProps {
  onSelect: (value: number) => void;
  selected?: number;
}

const PRESETS = [
  { label: '3000만', value: 30_000_000 },
  { label: '4000만', value: 40_000_000 },
  { label: '5000만', value: 50_000_000 },
  { label: '6000만', value: 60_000_000 },
  { label: '7000만', value: 70_000_000 },
  { label: '8000만', value: 80_000_000 },
  { label: '1억', value: 100_000_000 },
];

export function QuickPresets({ onSelect, selected }: QuickPresetsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {PRESETS.map((preset) => (
        <button
          key={preset.value}
          onClick={() => onSelect(preset.value)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
            selected === preset.value
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {preset.label}
        </button>
      ))}
    </div>
  );
}

// Raise presets - 금액 기반
const AMOUNT_PRESETS = [
  { label: '+300만', delta: 3_000_000 },
  { label: '+500만', delta: 5_000_000 },
  { label: '+1000만', delta: 10_000_000 },
  { label: '+2000만', delta: 20_000_000 },
];

// Raise presets - 퍼센트 기반
const PERCENT_PRESETS = [
  { label: '+5%', percent: 0.05 },
  { label: '+10%', percent: 0.10 },
  { label: '+15%', percent: 0.15 },
  { label: '+20%', percent: 0.20 },
  { label: '+30%', percent: 0.30 },
];

interface RaisePresetsProps {
  currentSalary: number;
  onSelect: (newSalary: number) => void;
}

export function RaisePresets({ currentSalary, onSelect }: RaisePresetsProps) {
  const [mode, setMode] = useState<'amount' | 'percent'>('percent');

  if (currentSalary <= 0) return null;

  return (
    <div className="space-y-2">
      {/* Mode Toggle */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">빠른 인상:</span>
        <div className="flex bg-gray-100 rounded-lg p-0.5">
          <button
            onClick={() => setMode('percent')}
            className={`px-2 py-1 text-xs font-medium rounded-md transition-colors ${
              mode === 'percent'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            %
          </button>
          <button
            onClick={() => setMode('amount')}
            className={`px-2 py-1 text-xs font-medium rounded-md transition-colors ${
              mode === 'amount'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            금액
          </button>
        </div>
      </div>

      {/* Presets */}
      <div className="flex flex-wrap gap-2">
        {mode === 'percent' ? (
          PERCENT_PRESETS.map((preset) => {
            const newSalary = Math.round(currentSalary * (1 + preset.percent));
            const deltaMan = Math.round((newSalary - currentSalary) / 10000);
            return (
              <button
                key={preset.percent}
                onClick={() => onSelect(newSalary)}
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-green-50 text-green-700 hover:bg-green-100 transition-colors flex items-center gap-1"
              >
                <span>{preset.label}</span>
                <span className="text-green-500 text-[10px]">({deltaMan}만)</span>
              </button>
            );
          })
        ) : (
          AMOUNT_PRESETS.map((preset) => (
            <button
              key={preset.delta}
              onClick={() => onSelect(currentSalary + preset.delta)}
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
            >
              {preset.label}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
