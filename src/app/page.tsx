import { RaiseSimulator } from '@/components/calculator/RaiseSimulator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '연봉 실수령액 계산기 2026 - 인상 효과 비교',
  description:
    '연봉 인상해도 왜 월급이 비슷할까요? 2026년 기준 4대보험, 소득세 공제 후 실수령액을 계산하고, 인상 전후 차이를 비교해보세요.',
};

export default function HomePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          연봉 올렸는데 왜 월급이 비슷하지?
        </h1>
        <p className="text-gray-600 text-lg">
          인상 전후 실수령액을 비교하고, 공제로 사라진 돈을 확인하세요.
        </p>
      </section>

      {/* Main Calculator */}
      <RaiseSimulator />

      {/* Ad Slot Placeholder */}
      <div className="mt-8 bg-gray-100 rounded-xl h-[250px] flex items-center justify-center text-gray-400 text-sm">
        광고 영역
      </div>

      {/* SEO Content */}
      <section className="mt-12 prose prose-gray max-w-none">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          연봉 실수령액이란?
        </h2>
        <p className="text-gray-600 mb-4">
          연봉 실수령액은 세전 연봉에서 국민연금, 건강보험, 고용보험, 소득세 등을
          공제한 후 실제로 통장에 들어오는 금액입니다. 연봉이 높아질수록 공제액도
          증가하기 때문에, 연봉 인상분 전체가 손에 들어오지 않습니다.
        </p>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          왜 연봉 올려도 체감이 안될까?
        </h3>
        <p className="text-gray-600">
          연봉 인상분의 약 30~40%는 추가 공제로 빠져나갑니다. 예를 들어 연봉
          500만원 인상 시, 실수령은 약 300~350만원 정도만 증가합니다. 이
          계산기로 정확한 체감 효과를 확인해보세요.
        </p>
      </section>
    </div>
  );
}
