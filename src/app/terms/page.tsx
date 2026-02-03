import { Card } from '@/components/ui/Card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '이용약관',
  description: '연봉 실수령액 계산기 이용약관',
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">이용약관</h1>

      <Card className="mb-6">
        <p className="text-gray-600 mb-4">
          연봉 실수령액 계산기(이하 &quot;서비스&quot;)를 이용해 주셔서 감사합니다.
          본 서비스 이용 전 아래 약관을 확인해 주세요.
        </p>
        <p className="text-sm text-gray-500">최종 수정일: 2026년 2월</p>
      </Card>

      <Card className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          1. 서비스 목적
        </h2>
        <p className="text-gray-600 mb-3">
          본 서비스는 연봉 실수령액을 <strong>참고용으로 계산</strong>하는 시뮬레이션 도구입니다.
        </p>
        <p className="text-gray-600">
          본 서비스는 세무 상담, 재정 조언, 법률 자문을 제공하지 않습니다.
        </p>
      </Card>

      <Card className="mb-6 border-l-4 border-yellow-400">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          2. 면책 조항
        </h2>
        <div className="bg-yellow-50 p-4 rounded-lg mb-4">
          <p className="text-yellow-800 font-semibold">
            본 계산기의 결과는 참고용 예상치이며, 법적 효력이 없습니다.
          </p>
        </div>
        <ul className="text-gray-600 space-y-2 ml-4">
          <li>• 실제 실수령액은 회사의 급여 정책, 공제 항목에 따라 다를 수 있습니다.</li>
          <li>• 세법 개정으로 인해 계산 결과가 달라질 수 있습니다.</li>
          <li>• 정확한 급여 정보는 소속 회사 또는 세무 전문가에게 문의하세요.</li>
        </ul>
        <p className="text-gray-600 mt-4">
          본 사이트 이용으로 인해 발생하는 어떠한 손해에 대해서도 운영자는 책임을 지지 않습니다.
        </p>
      </Card>

      <Card className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          3. 계산 기준
        </h2>
        <p className="text-gray-600 mb-3">
          본 계산기는 다음 기준을 참고하여 작성되었습니다:
        </p>
        <ul className="text-gray-600 space-y-1 ml-4">
          <li>• 4대보험: 2026년 요율 기준</li>
          <li>• 소득세: 근로소득 간이세액표 기준</li>
          <li>• 지방소득세: 소득세의 10%</li>
        </ul>
        <p className="text-gray-600 mt-3">
          세율 및 요율은 변경될 수 있으며, 본 사이트가 항상 최신 정보를 반영하지 못할 수 있습니다.
        </p>
      </Card>

      <Card className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          4. 지적재산권
        </h2>
        <p className="text-gray-600">
          본 사이트의 디자인, 코드, 콘텐츠에 대한 저작권은 운영자에게 있습니다.
        </p>
      </Card>

      <Card className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          5. 약관 변경
        </h2>
        <p className="text-gray-600">
          본 이용약관은 필요에 따라 변경될 수 있으며, 변경 시 이 페이지에 게시합니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          6. 문의처
        </h2>
        <p className="text-gray-600">
          서비스 관련 문의는 <a href="/contact" className="text-blue-600 hover:underline">문의하기</a> 페이지를 이용해 주세요.
        </p>
      </Card>
    </div>
  );
}
