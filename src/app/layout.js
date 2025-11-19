import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '오늘 점심은 뭐먹을까?',
  description: '매일 고민되는 점심 메뉴, 이제 걱정 끝! AI가 추천해주는 맞춤 점심 메뉴',
  keywords: '점심메뉴, 메뉴추천, 맛집, 근처맛집, 배달음식',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <meta name="naver-site-verification" content="4f1f97e8cd289c7eed2ae482c648ba2dd6bbb09" />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
          <Header />
          {children}
        </div>
      </body>
    </html>
  )
}
