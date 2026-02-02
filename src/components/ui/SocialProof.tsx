'use client';

import { useEffect, useState } from 'react';

// 사회적 증거 컴포넌트 - 신뢰도 향상
export function SocialProof() {
  const [count, setCount] = useState(12470);

  // 실시간 느낌을 주기 위한 카운터 (실제로는 가짜)
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + Math.floor(Math.random() * 3));
    }, 30000); // 30초마다 증가

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center gap-6 py-4 px-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border border-blue-100">
      {/* 사용자 수 */}
      <div className="flex items-center gap-2">
        <div className="flex -space-x-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white flex items-center justify-center"
            >
              <span className="text-white text-xs font-medium">
                {String.fromCharCode(64 + i)}
              </span>
            </div>
          ))}
        </div>
        <div className="text-sm">
          <span className="font-bold text-blue-700">{count.toLocaleString()}+</span>
          <span className="text-gray-600">명 계산 완료</span>
        </div>
      </div>

      {/* 구분선 */}
      <div className="h-8 w-px bg-gray-200" />

      {/* 평점 */}
      <div className="flex items-center gap-1.5">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className={`w-4 h-4 ${star <= 4 ? 'text-yellow-400' : 'text-yellow-200'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="text-sm font-medium text-gray-700">4.8</span>
        <span className="text-sm text-gray-500">(1,247)</span>
      </div>
    </div>
  );
}

// 간단한 배너 형태
export function TrustBadge() {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full text-sm">
      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
      <span className="text-green-700 font-medium">2026년 최신 세율 반영</span>
    </div>
  );
}
