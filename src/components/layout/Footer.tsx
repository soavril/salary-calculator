import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-auto">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Disclaimer - 가장 중요한 정보 */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8">
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-amber-800 mb-1">안내사항</p>
              <p className="text-sm text-amber-700">
                본 계산기는 2026년 기준 추정치를 제공하며, 실제 세금 및 공제액과 다를 수 있습니다.
                세무/법률 조언이 아니므로 정확한 내용은 전문가와 상담하세요.
              </p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
          {/* 계산기 */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              계산기
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  인상 비교
                </Link>
              </li>
              <li>
                <Link href="/table" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  연봉표
                </Link>
              </li>
              <li>
                <Link href="/negotiate" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  협상 계산
                </Link>
              </li>
              <li>
                <Link href="/compare" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  고용형태 비교
                </Link>
              </li>
            </ul>
          </div>

          {/* 인기 연봉 */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              인기 연봉
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/salary/3000" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  3000만원
                </Link>
              </li>
              <li>
                <Link href="/salary/4000" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  4000만원
                </Link>
              </li>
              <li>
                <Link href="/salary/5000" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  5000만원
                </Link>
              </li>
              <li>
                <Link href="/salary/6000" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  6000만원
                </Link>
              </li>
              <li>
                <Link href="/salary/7000" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  7000만원
                </Link>
              </li>
              <li>
                <Link href="/salary/8000" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  8000만원
                </Link>
              </li>
              <li>
                <Link href="/salary/10000" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  1억
                </Link>
              </li>
            </ul>
          </div>

          {/* 정보 */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              정보
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  서비스 소개
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  이용약관
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  문의하기
                </Link>
              </li>
            </ul>
          </div>

          {/* 2026 기준 */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              계산 기준
            </h3>
            <ul className="space-y-1 text-xs text-gray-500">
              <li>국민연금 4.5%</li>
              <li>건강보험 3.545%</li>
              <li>장기요양 12.81%</li>
              <li>고용보험 0.9%</li>
              <li>소득세 누진세율</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">₩</span>
            </div>
            <span className="text-sm font-medium text-gray-700">연봉 실수령액 계산기</span>
          </div>
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} 모든 계산은 추정치입니다.
          </p>
        </div>
      </div>
    </footer>
  );
}
