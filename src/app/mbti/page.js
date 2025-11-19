'use client'

import Navigation from '@/components/Navigation'

export default function MBTIPage() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-8xl mb-8 animate-bounce">🚧</div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            MBTI별 메뉴 추천
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            준비 중입니다!
          </p>
          <div className="bg-white rounded-3xl shadow-xl p-8 text-left">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🔮 Coming Soon
            </h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="mr-2">✨</span>
                <span>MBTI 성향에 맞는 음식 추천</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✨</span>
                <span>외향형/내향형에 따른 맛집 분위기 추천</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✨</span>
                <span>성격별 선호하는 맛과 식감 분석</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✨</span>
                <span>친구와 MBTI 궁합으로 함께 먹을 메뉴 추천</span>
              </li>
            </ul>
          </div>
          <a
            href="/"
            className="inline-block mt-8 btn-primary"
          >
            ← 메뉴 추천으로 돌아가기
          </a>
        </div>
      </div>
    </>
  )
}
