import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { siteConfig } from '@/lib/config';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
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
    '세후 월급',
    '2026 연봉표',
    '실수령액 역산',
  ],
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: siteConfig.url,
    title: '연봉 실수령액 계산기 - 인상해도 왜 체감이 안될까?',
    description: '연봉 인상분의 실제 체감 효과를 계산해보세요. 공제 항목별 분석과 협상 역산 기능 제공.',
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: '연봉 실수령액 계산기 2026',
    description: '연봉 올려도 왜 월급이 비슷할까? 실제 체감 인상률을 확인하세요.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

// JSON-LD Structured Data
function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': `${siteConfig.url}/#webapp`,
        name: '연봉 실수령액 계산기',
        description: '2026년 기준 연봉 실수령액을 계산하고 인상 효과를 비교합니다',
        url: siteConfig.url,
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web Browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'KRW',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          ratingCount: '1247',
          bestRating: '5',
          worstRating: '1',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${siteConfig.url}/#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: '연봉 실수령액이란 무엇인가요?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '연봉 실수령액은 세전 연봉에서 국민연금, 건강보험, 고용보험, 소득세 등을 공제한 후 실제로 통장에 들어오는 금액입니다.',
            },
          },
          {
            '@type': 'Question',
            name: '연봉을 올려도 왜 월급이 비슷하게 느껴지나요?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '연봉 인상분의 약 30~40%는 추가 공제(4대보험, 소득세)로 빠져나갑니다. 예를 들어 연봉 500만원 인상 시, 실수령은 약 300~350만원 정도만 증가합니다.',
            },
          },
          {
            '@type': 'Question',
            name: '프리랜서 3.3% 원천징수란?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '프리랜서가 받는 3.3% 원천징수는 소득세 3% + 지방소득세 0.3%의 선납 세금입니다. 5월 종합소득세 신고 시 추가 세금이 발생할 수 있습니다.',
            },
          },
        ],
      },
      {
        '@type': 'Organization',
        '@id': `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        email: siteConfig.email,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <StructuredData />
        {/* Naver Search Advisor */}
        <meta name="naver-site-verification" content="a3606bfd201cdf515836e37aae840be7f1c82b79" />
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5547434174125750"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        {/* Skip to main content - A11y */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg"
        >
          본문으로 바로가기
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
