import { Card } from '@/components/ui/Card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '서비스 소개',
  description: '연봉 실수령액 계산기 서비스 소개. 연봉 인상 효과를 체감할 수 있도록 도와드립니다.',
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">서비스 소개</h1>

      <Card className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          연봉 실수령액 계산기란?
        </h2>
        <p className="text-gray-600 mb-4">
          연봉 실수령액 계산기는 직장인들이 연봉 인상의 실제 효과를 체감할 수
          있도록 도와주는 무료 온라인 도구입니다.
        </p>
        <p className="text-gray-600">
          단순히 숫자만 보여주는 것이 아니라, &quot;왜 연봉을 올려도 체감이
          안되는지&quot;를 명확하게 설명해드립니다.
        </p>
      </Card>

      <Card className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          제공하는 기능
        </h2>
        <ul className="space-y-3 text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">•</span>
            <div>
              <span className="font-medium">연봉 인상 비교</span> - 인상 전후
              실수령액 차이와 공제 항목별 변화를 확인
            </div>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">•</span>
            <div>
              <span className="font-medium">협상 역산 계산</span> - 원하는
              실수령 인상을 위해 필요한 연봉 인상액 계산
            </div>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">•</span>
            <div>
              <span className="font-medium">고용형태 비교</span> - 정규직,
              프리랜서, 사업자 간 실수령 비교
            </div>
          </li>
        </ul>
      </Card>

      <Card className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          계산 기준
        </h2>
        <p className="text-gray-600 mb-3">
          본 계산기는 2026년 기준 다음 항목을 반영합니다:
        </p>
        <ul className="text-gray-600 space-y-1 ml-4">
          <li>• 국민연금 4.5% (상한 월 265,500원)</li>
          <li>• 건강보험 3.545%</li>
          <li>• 장기요양보험 (건강보험의 12.81%)</li>
          <li>• 고용보험 0.9%</li>
          <li>• 소득세 (간이세액표 기준 근사치)</li>
          <li>• 지방소득세 (소득세의 10%)</li>
        </ul>
      </Card>

      <Card className="bg-amber-50 border-amber-100">
        <h2 className="text-xl font-semibold text-amber-800 mb-4">
          중요 안내
        </h2>
        <p className="text-amber-700">
          본 서비스는 추정치를 제공하며, 실제 세금 및 공제액과 다를 수 있습니다.
          정확한 세금 계산이나 법률 조언이 필요한 경우 세무사 또는 관련 전문가와
          상담하시기 바랍니다.
        </p>
      </Card>
    </div>
  );
}
