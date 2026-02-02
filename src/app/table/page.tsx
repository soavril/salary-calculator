import { Card } from '@/components/ui/Card';
import { SalaryTableView } from '@/components/calculator/SalaryTableView';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '2026 연봉 실수령액표 - 연봉별 월급 실수령액 총정리',
  description:
    '2026년 기준 연봉 2000만원~1억5천만원 실수령액표. 연봉별 4대보험, 소득세 공제 후 월 실수령액을 한눈에 확인하세요.',
  keywords: [
    '연봉 실수령액표',
    '2026 연봉표',
    '연봉 3000 실수령',
    '연봉 4000 실수령',
    '연봉 5000 실수령',
    '월급 실수령액',
  ],
};

export default function TablePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Hero */}
      <section className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          2026 연봉 실수령액표
        </h1>
        <p className="text-gray-600 text-lg">
          연봉별 4대보험 + 소득세 공제 후 실수령액을 한눈에 확인하세요
        </p>
      </section>

      {/* Quick Jump */}
      <Card className="mb-6">
        <p className="text-sm text-gray-500 mb-3">빠른 이동</p>
        <div className="flex flex-wrap gap-2">
          {[3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000].map((salary) => (
            <a
              key={salary}
              href={`#salary-${salary}`}
              className="px-3 py-1.5 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-lg text-sm transition-colors"
            >
              {salary >= 10000 ? `${salary / 10000}억` : `${salary}만`}
            </a>
          ))}
        </div>
      </Card>

      {/* Table */}
      <SalaryTableView />

      {/* Ad Slot - AdSense 승인 후 활성화 */}
      <div className="my-8" id="ad-slot-table" aria-hidden="true" />

      {/* SEO Content */}
      <section className="prose prose-gray max-w-none">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          연봉 실수령액 계산 방법
        </h2>
        <p className="text-gray-600 mb-4">
          연봉 실수령액은 세전 연봉에서 다음 항목들을 공제한 금액입니다:
        </p>
        <ul className="text-gray-600 space-y-1 mb-4">
          <li>• <strong>국민연금</strong>: 월 급여의 4.5% (상한 월 265,500원)</li>
          <li>• <strong>건강보험</strong>: 월 급여의 3.545%</li>
          <li>• <strong>장기요양보험</strong>: 건강보험의 12.81%</li>
          <li>• <strong>고용보험</strong>: 월 급여의 0.9%</li>
          <li>• <strong>소득세</strong>: 소득구간별 누진세율 적용</li>
          <li>• <strong>지방소득세</strong>: 소득세의 10%</li>
        </ul>

        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          연봉대별 실효세율
        </h3>
        <p className="text-gray-600 mb-4">
          연봉 3,000만원대는 약 15~17%, 5,000만원대는 약 18~20%,
          8,000만원 이상은 22% 이상의 실효세율이 적용됩니다.
          연봉이 높아질수록 소득세 구간이 올라가 체감 인상률이 낮아집니다.
        </p>

        <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
          <p className="text-sm text-amber-800">
            본 표는 2026년 기준 추정치이며, 비과세 수당, 부양가족 수에 따라
            실제 금액과 차이가 있을 수 있습니다.
          </p>
        </div>
      </section>
    </div>
  );
}
