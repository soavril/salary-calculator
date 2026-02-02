import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: '연봉 실수령액 계산기 2026 - 인상 체감 시뮬레이터',
    template: '%s | 연봉 실수령액',
  },
  description:
    '연봉 올려도 왜 월급이 비슷할까? 2026년 기준 연봉 실수령액 계산, 인상 효과 비교, 협상 역산까지. 실제 체감 인상률을 확인하세요.',
  keywords: [
    '연봉 실수령액',
    '연봉 계산기',
    '월급 실수령액',
    '연봉 인상',
    '연봉 협상',
    '4대보험',
    '소득세',
    '프리랜서 세금',
  ],
  authors: [{ name: '연봉 실수령액 계산기' }],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    title: '연봉 실수령액 계산기 - 인상해도 왜 체감이 안될까?',
    description: '연봉 인상분의 실제 체감 효과를 계산해보세요. 공제 항목별 분석과 협상 역산 기능 제공.',
    siteName: '연봉 실수령액 계산기',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    // Add Google Search Console verification here
    // google: 'your-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="canonical" href="https://example.com" />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
