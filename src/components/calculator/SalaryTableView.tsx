'use client';

import { useMemo, useState } from 'react';
import { generateSalaryTable, SALARY_PRESETS } from '@/lib/salaryTable';
import { formatKRW, formatPercent } from '@/lib/format';
import Link from 'next/link';

export function SalaryTableView() {
  const [showAll, setShowAll] = useState(false);
  const fullTable = useMemo(() => generateSalaryTable(), []);

  // Show only presets or full table
  const displayTable = showAll
    ? fullTable
    : fullTable.filter((row) => SALARY_PRESETS.includes(row.annual));

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Toggle */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <span className="text-sm text-gray-500">
          {showAll ? '전체 보기 (100만원 단위)' : '주요 연봉만 보기'}
        </span>
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          {showAll ? '간략히 보기' : '전체 보기'}
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                연봉
              </th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700">
                월 세전
              </th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700">
                공제합계
              </th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700 bg-blue-50">
                월 실수령
              </th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700">
                실효세율
              </th>
              <th className="px-4 py-3 text-center font-semibold text-gray-700">
                상세
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {displayTable.map((row) => (
              <tr
                key={row.annual}
                id={`salary-${row.annual}`}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3 font-medium text-gray-900">
                  {row.annual >= 10000
                    ? `${(row.annual / 10000).toFixed(1)}억`
                    : `${formatKRW(row.annual)}만원`}
                </td>
                <td className="px-4 py-3 text-right text-gray-600">
                  {formatKRW(row.monthlyGross)}원
                </td>
                <td className="px-4 py-3 text-right text-red-500">
                  -{formatKRW(row.totalDeduction)}원
                </td>
                <td className="px-4 py-3 text-right font-bold text-blue-600 bg-blue-50">
                  {formatKRW(row.monthlyNet)}원
                </td>
                <td className="px-4 py-3 text-right text-gray-500">
                  {formatPercent(row.effectiveRate)}
                </td>
                <td className="px-4 py-3 text-center">
                  <Link
                    href={`/salary/${row.annual}`}
                    className="text-blue-500 hover:text-blue-700 text-xs"
                  >
                    자세히
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Load more hint */}
      {!showAll && (
        <div className="p-4 text-center border-t border-gray-100">
          <button
            onClick={() => setShowAll(true)}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            100만원 단위로 전체 보기 →
          </button>
        </div>
      )}
    </div>
  );
}
