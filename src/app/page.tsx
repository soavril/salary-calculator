import { RaiseSimulator } from '@/components/calculator/RaiseSimulator';
import { TrustBadge } from '@/components/ui/SocialProof';
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
        <div className="mb-4">
          <TrustBadge />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          연봉 올렸는데 왜 월급이 비슷하지?
        </h1>
        <p className="text-gray-600 text-lg">
          인상 전후 실수령액을 비교하고, 공제로 사라진 돈을 확인하세요.
        </p>
      </section>

      {/* Main Calculator */}
      <RaiseSimulator />

      {/* Ad Slot - AdSense 승인 후 활성화 */}
      <div className="mt-8" id="ad-slot-home" aria-hidden="true" />

      {/* SEO Content */}
      <section className="mt-12 space-y-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            연봉 실수령액이란?
          </h2>
          <p className="text-gray-600 leading-relaxed">
            연봉 실수령액은 세전 연봉에서 국민연금, 건강보험, 고용보험, 소득세 등을
            공제한 후 실제로 통장에 들어오는 금액입니다. 연봉이 높아질수록 공제액도
            증가하기 때문에, 연봉 인상분 전체가 손에 들어오지 않습니다.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            왜 연봉 올려도 체감이 안될까?
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            연봉 인상분의 약 30~40%는 추가 공제로 빠져나갑니다. 예를 들어 연봉
            500만원 인상 시, 실수령은 약 300~350만원 정도만 증가합니다.
          </p>
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
            <p className="text-sm text-blue-800">
              <strong>예시:</strong> 연봉 5,000만원 → 5,500만원 인상 시<br />
              월 세전 약 42만원 증가 → 실수령은 약 28만원만 증가 (체감 인상률 67%)
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            2026년 4대보험 요율
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: '국민연금', rate: '4.5%', note: '상한 월 265,500원' },
              { name: '건강보험', rate: '3.545%', note: '' },
              { name: '장기요양보험', rate: '12.81%', note: '건강보험의' },
              { name: '고용보험', rate: '0.9%', note: '' },
            ].map((item) => (
              <div key={item.name} className="bg-gray-50 rounded-lg p-3">
                <p className="font-medium text-gray-900">{item.name}</p>
                <p className="text-lg font-bold text-blue-600">{item.rate}</p>
                {item.note && <p className="text-xs text-gray-500">{item.note}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
