import { Card } from '@/components/ui/Card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '개인정보처리방침',
  description: '연봉 실수령액 계산기 개인정보처리방침',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">개인정보처리방침</h1>

      <Card className="mb-6">
        <p className="text-gray-600 mb-4">
          연봉 실수령액 계산기(이하 &quot;서비스&quot;)는 이용자의 개인정보를
          중요시하며, 개인정보보호법 등 관련 법령을 준수합니다.
        </p>
        <p className="text-sm text-gray-500">최종 수정일: 2026년 2월</p>
      </Card>

      <Card className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          1. 수집하는 개인정보
        </h2>
        <p className="text-gray-600 mb-3">
          본 서비스는 회원가입 없이 이용 가능하며, 다음 정보만 자동으로 수집될 수
          있습니다:
        </p>
        <ul className="text-gray-600 space-y-1 ml-4">
          <li>• 접속 로그 (IP 주소, 접속 시간)</li>
          <li>• 브라우저 및 기기 정보</li>
          <li>• 서비스 이용 기록</li>
        </ul>
        <p className="text-gray-600 mt-3">
          <strong>중요:</strong> 계산기에 입력하시는 연봉 정보는 서버에 저장되지
          않으며, 브라우저에서만 처리됩니다.
        </p>
      </Card>

      <Card className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          2. 개인정보의 이용 목적
        </h2>
        <ul className="text-gray-600 space-y-1 ml-4">
          <li>• 서비스 제공 및 개선</li>
          <li>• 이용 통계 분석</li>
          <li>• 문의 응대</li>
        </ul>
      </Card>

      <Card className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          3. 쿠키 및 분석 도구
        </h2>
        <p className="text-gray-600 mb-3">
          본 서비스는 다음 도구를 사용할 수 있습니다:
        </p>
        <ul className="text-gray-600 space-y-1 ml-4">
          <li>• Google Analytics - 서비스 이용 통계 분석</li>
          <li>• Google AdSense - 맞춤형 광고 제공</li>
        </ul>
        <p className="text-gray-600 mt-3">
          쿠키 사용을 원하지 않는 경우, 브라우저 설정에서 쿠키를 비활성화할 수
          있습니다.
        </p>
      </Card>

      <Card className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          4. 개인정보의 보유 및 파기
        </h2>
        <p className="text-gray-600">
          수집된 정보는 이용 목적 달성 후 지체 없이 파기됩니다. 접속 로그는
          최대 1년간 보관 후 자동 삭제됩니다.
        </p>
      </Card>

      <Card className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          5. 제3자 제공
        </h2>
        <p className="text-gray-600">
          본 서비스는 이용자의 개인정보를 제3자에게 제공하지 않습니다. 단, 법령에
          따라 요청되는 경우는 예외로 합니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          6. 문의처
        </h2>
        <p className="text-gray-600">
          개인정보 관련 문의는 <a href="/contact" className="text-blue-600 hover:underline">문의하기</a> 페이지를 이용해 주세요.
        </p>
      </Card>
    </div>
  );
}
