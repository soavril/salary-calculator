import { Card } from '@/components/ui/Card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '문의하기',
  description: '연봉 실수령액 계산기 문의 및 피드백',
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">문의하기</h1>

      <Card className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          피드백 및 문의
        </h2>
        <p className="text-gray-600 mb-4">
          서비스 이용 중 문의사항이나 개선 제안이 있으시면 아래 이메일로
          연락해 주세요.
        </p>
        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-gray-500 text-sm mb-1">이메일</p>
          <p className="text-gray-900 font-medium">soavril@naver.com</p>
        </div>
      </Card>

      <Card className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          자주 묻는 질문
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-900 mb-1">
              Q. 계산 결과가 실제와 다른 것 같아요.
            </h3>
            <p className="text-gray-600 text-sm">
              본 계산기는 간이 추정치를 제공하며, 실제 급여와는 차이가 있을 수
              있습니다. 정확한 금액은 급여명세서나 세무사 상담을 통해
              확인하세요.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-1">
              Q. 비과세 항목은 어떻게 처리하나요?
            </h3>
            <p className="text-gray-600 text-sm">
              현재 버전에서는 비과세 항목을 별도로 입력받지 않습니다. 비과세
              수당이 있는 경우 실제 실수령액은 계산 결과보다 높을 수 있습니다.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-1">
              Q. 입력한 연봉 정보가 저장되나요?
            </h3>
            <p className="text-gray-600 text-sm">
              아니요. 모든 계산은 브라우저에서만 처리되며, 서버에 저장되지
              않습니다.
            </p>
          </div>
        </div>
      </Card>

      <Card className="bg-blue-50 border-blue-100">
        <h2 className="text-xl font-semibold text-blue-900 mb-4">
          버그 리포트
        </h2>
        <p className="text-blue-800">
          계산 오류나 버그를 발견하셨다면 구체적인 입력값과 함께 알려주세요.
          빠르게 수정하겠습니다.
        </p>
      </Card>
    </div>
  );
}
