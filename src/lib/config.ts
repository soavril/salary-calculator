// Site configuration - Update these values for production
export const siteConfig = {
  name: '연봉 실수령액 계산기',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://wolgeup.com',
  description: '2026년 기준 연봉 실수령액 계산, 인상 효과 비교, 협상 역산까지',
  author: '연봉 실수령액 계산기',
  email: 'soavril@naver.com',
  year: 2026,
};

// Social sharing
export const shareConfig = {
  kakaoAppKey: process.env.NEXT_PUBLIC_KAKAO_APP_KEY || '',
};
