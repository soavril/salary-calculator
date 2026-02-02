import { NegotiationCalculator } from '@/components/calculator/NegotiationCalculator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '연봉 협상 계산기 - 원하는 실수령을 위한 연봉',
  description:
    '원하는 월 실수령 인상을 위해 연봉을 얼마나 올려달라고 해야 할까요? 역산 계산기로 협상 금액을 계산해보세요.',
};

export default function NegotiatePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          연봉 협상 역산 계산기
        </h1>
        <p className="text-gray-600 text-lg">
          원하는 실수령 인상을 위해 연봉을 얼마나 요청해야 할까요?
        </p>
      </section>

      {/* Calculator */}
      <NegotiationCalculator />

      {/* Ad Slot - AdSense 승인 후 활성화 */}
      <div className="mt-8" id="ad-slot-negotiate" aria-hidden="true" />

      {/* SEO Content */}
      <section className="mt-12 prose prose-gray max-w-none">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          연봉 협상, 얼마를 요구해야 할까?
        </h2>
        <p className="text-gray-600 mb-4">
          월 실수령 30만원 인상을 원한다면, 연봉으로는 약 500~600만원 인상을
          요청해야 합니다. 세금과 4대보험이 추가로 공제되기 때문입니다.
        </p>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          협상 전 알아야 할 것
        </h3>
        <ul className="text-gray-600 list-disc pl-5 space-y-2">
          <li>연봉 인상분의 60~70%만 실수령으로 돌아옵니다</li>
          <li>높은 연봉대일수록 소득세율이 올라갑니다</li>
          <li>국민연금은 월 265,500원이 상한선입니다</li>
        </ul>
      </section>
    </div>
  );
}
