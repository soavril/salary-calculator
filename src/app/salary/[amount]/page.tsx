import { Card, CardTitle } from '@/components/ui/Card';
import { getSalaryData, getNearbySalaries, POPULAR_SALARIES } from '@/lib/salaryTable';
import { formatKRW, formatPercent } from '@/lib/format';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ amount: string }>;
}

export async function generateStaticParams() {
  return POPULAR_SALARIES.map((amount) => ({
    amount: amount.toString(),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { amount } = await params;
  const salary = parseInt(amount, 10);

  if (isNaN(salary) || salary < 1000 || salary > 50000) {
    return { title: '연봉 실수령액' };
  }

  const data = getSalaryData(salary);
  const salaryText = salary >= 10000 ? `${salary / 10000}억` : `${salary}만원`;

  return {
    title: `연봉 ${salaryText} 실수령액 - 2026년 월급 계산`,
    description: `연봉 ${salaryText} 실수령액은 월 ${formatKRW(data.monthlyNet)}원입니다. 4대보험, 소득세 공제 내역과 비슷한 연봉대 비교를 확인하세요.`,
    keywords: [
      `연봉 ${salary}만원`,
      `연봉 ${salaryText} 실수령`,
      `${salaryText} 월급`,
      `연봉 ${salary} 실수령액`,
    ],
  };
}

export default async function SalaryDetailPage({ params }: PageProps) {
  const { amount } = await params;
  const salary = parseInt(amount, 10);

  if (isNaN(salary) || salary < 1000 || salary > 50000) {
    notFound();
  }

  const data = getSalaryData(salary);
  const nearby = getNearbySalaries(salary);
  const salaryText = salary >= 10000 ? `${salary / 10000}억` : `${formatKRW(salary)}만원`;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Hero */}
      <section className="text-center mb-8">
        <p className="text-blue-600 font-medium mb-2">2026년 기준</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          연봉 {salaryText} 실수령액
        </h1>
        <p className="text-5xl font-bold text-blue-600 mb-2">
          월 {formatKRW(data.monthlyNet)}원
        </p>
        <p className="text-gray-500">
          세전 월급 {formatKRW(data.monthlyGross)}원 기준
        </p>
      </section>

      {/* Breakdown */}
      <Card className="mb-6">
        <CardTitle>월 공제 내역</CardTitle>
        <div className="space-y-3">
          {[
            { label: '국민연금', value: data.result.breakdown.nationalPension },
            { label: '건강보험', value: data.result.breakdown.healthInsurance },
            { label: '장기요양보험', value: data.result.breakdown.longTermCare },
            { label: '고용보험', value: data.result.breakdown.employmentInsurance },
            { label: '소득세', value: data.result.breakdown.incomeTax },
            { label: '지방소득세', value: data.result.breakdown.localTax },
          ].map((item) => (
            <div key={item.label} className="flex justify-between items-center">
              <span className="text-gray-600">{item.label}</span>
              <span className="text-red-500 font-medium">
                -{formatKRW(item.value)}원
              </span>
            </div>
          ))}
          <div className="border-t pt-3 flex justify-between items-center font-semibold">
            <span className="text-gray-800">공제 합계</span>
            <span className="text-red-600">
              -{formatKRW(data.totalDeduction)}원
            </span>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>실효세율</span>
            <span>{formatPercent(data.effectiveRate)}</span>
          </div>
        </div>
      </Card>

      {/* Yearly Summary */}
      <Card className="mb-6 bg-blue-50 border-blue-100">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-sm text-blue-600 mb-1">연간 실수령</p>
            <p className="text-2xl font-bold text-blue-700">
              {formatKRW(data.monthlyNet * 12)}원
            </p>
          </div>
          <div>
            <p className="text-sm text-blue-600 mb-1">연간 공제액</p>
            <p className="text-2xl font-bold text-red-600">
              {formatKRW(data.totalDeduction * 12)}원
            </p>
          </div>
        </div>
      </Card>

      {/* Nearby Comparison */}
      <Card className="mb-6">
        <CardTitle>비슷한 연봉대 비교</CardTitle>
        <div className="space-y-2">
          {nearby.map((nearbySalary) => {
            const nearbyData = getSalaryData(nearbySalary);
            const isCurrent = nearbySalary === salary;
            const nearbyText =
              nearbySalary >= 10000
                ? `${nearbySalary / 10000}억`
                : `${formatKRW(nearbySalary)}만원`;

            return (
              <Link
                key={nearbySalary}
                href={`/salary/${nearbySalary}`}
                className={`flex justify-between items-center p-3 rounded-lg transition-colors ${
                  isCurrent
                    ? 'bg-blue-100 border border-blue-200'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <span
                  className={
                    isCurrent ? 'font-semibold text-blue-700' : 'text-gray-700'
                  }
                >
                  연봉 {nearbyText}
                </span>
                <span
                  className={
                    isCurrent ? 'font-bold text-blue-700' : 'font-medium text-gray-900'
                  }
                >
                  월 {formatKRW(nearbyData.monthlyNet)}원
                </span>
              </Link>
            );
          })}
        </div>
      </Card>

      {/* Ad Slot */}
      <div className="my-8 bg-gray-100 rounded-xl h-[250px] flex items-center justify-center text-gray-400 text-sm">
        광고 영역
      </div>

      {/* CTA */}
      <div className="flex gap-4">
        <Link
          href="/"
          className="flex-1 py-3 px-4 bg-blue-600 text-white text-center rounded-xl font-medium hover:bg-blue-700 transition-colors"
        >
          인상 효과 계산하기
        </Link>
        <Link
          href="/table"
          className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 text-center rounded-xl font-medium hover:bg-gray-200 transition-colors"
        >
          전체 연봉표 보기
        </Link>
      </div>

      {/* SEO Content */}
      <section className="mt-12 prose prose-gray max-w-none">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          연봉 {salaryText}, 실제로 얼마 받을까?
        </h2>
        <p className="text-gray-600 mb-4">
          연봉 {salaryText}의 월 실수령액은 약 {formatKRW(data.monthlyNet)}원입니다.
          세전 월급 {formatKRW(data.monthlyGross)}원에서 4대보험과 소득세를 공제한
          금액으로, 실효세율은 {formatPercent(data.effectiveRate)}입니다.
        </p>
        <p className="text-gray-600">
          같은 연봉이라도 부양가족 수, 비과세 수당에 따라 실수령액이 달라질 수
          있습니다. 정확한 금액은 급여명세서를 확인하세요.
        </p>
      </section>
    </div>
  );
}
