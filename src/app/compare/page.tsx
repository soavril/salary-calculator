import { WorkTypeCompare } from '@/components/calculator/WorkTypeCompare';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '정규직 vs 프리랜서 실수령 비교',
  description:
    '같은 수입이라면 정규직과 프리랜서 중 어디가 유리할까요? 고용 형태별 실수령액을 비교해보세요.',
};

export default function ComparePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          고용형태별 실수령 비교
        </h1>
        <p className="text-gray-600 text-lg">
          정규직, 프리랜서, 사업자 중 어떤 형태가 유리할까요?
        </p>
      </section>

      {/* Calculator */}
      <WorkTypeCompare />

      {/* Ad Slot - AdSense 승인 후 활성화 */}
      <div className="mt-8" id="ad-slot-compare" aria-hidden="true" />

      {/* SEO Content */}
      <section className="mt-12 prose prose-gray max-w-none">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          프리랜서 3.3%의 진실
        </h2>
        <p className="text-gray-600 mb-4">
          프리랜서가 받는 3.3% 원천징수는 &quot;선납 세금&quot;일 뿐입니다. 5월
          종합소득세 신고 시 추가 세금이 나올 수 있고, 건강보험료도 별도로
          납부해야 합니다.
        </p>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          정규직 vs 프리랜서, 뭐가 나을까?
        </h3>
        <p className="text-gray-600">
          단순히 세금만 비교하면 프리랜서가 유리해 보이지만, 퇴직금, 연차, 4대보험
          혜택(실업급여 등)을 고려하면 정규직이 유리한 경우가 많습니다. 본인의
          상황에 맞게 판단하세요.
        </p>
      </section>
    </div>
  );
}
