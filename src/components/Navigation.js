'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 로고 */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <span className="text-2xl">🍽️</span>
            <span className="font-bold text-xl text-gray-800">
              오늘 뭐먹을까?
            </span>
          </Link>

          {/* 데스크톱 메뉴 */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              href="/"
              className="px-4 py-2 rounded-lg transition-all hover:bg-orange-500 hover:text-white text-gray-700 font-medium"
            >
              <span className="mr-2">🍽️</span>
              점심 추천
            </Link>
            <Link
              href="/mbti"
              className="px-4 py-2 rounded-lg transition-all hover:bg-purple-500 hover:text-white text-gray-700 font-medium flex items-center"
            >
              <span className="mr-2">🧠</span>
              MBTI
            </Link>
            <button
              className="px-4 py-2 rounded-lg transition-all text-gray-400 cursor-not-allowed flex items-center"
              onClick={() => alert('준비 중입니다! 🚧')}
            >
              <span className="mr-2">🔮</span>
              사주팔자
              <span className="ml-2 text-xs bg-gray-200 px-2 py-1 rounded-full">
                준비중
              </span>
            </button>
            <button
              className="px-4 py-2 rounded-lg transition-all text-gray-400 cursor-not-allowed flex items-center"
              onClick={() => alert('준비 중입니다! 🚧')}
            >
              <span className="mr-2">🃏</span>
              타로
              <span className="ml-2 text-xs bg-gray-200 px-2 py-1 rounded-full">
                준비중
              </span>
            </button>
          </div>

          {/* 로그인 버튼 */}
          <div className="hidden md:block">
            <button
              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full hover:from-orange-600 hover:to-red-600 transition-all shadow-md"
              onClick={() => alert('로그인 기능은 준비 중입니다! 🚧')}
            >
              로그인
            </button>
          </div>

          {/* 모바일 메뉴 버튼 */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              href="/"
              className="block px-4 py-3 rounded-lg hover:bg-orange-500 hover:text-white text-gray-700 transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="mr-2">🍽️</span>
              점심 추천
            </Link>
            <Link
              href="/mbti"
              className="block px-4 py-3 rounded-lg hover:bg-purple-500 hover:text-white text-gray-700 transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="mr-2">🧠</span>
              MBTI
            </Link>
            <button
              className="w-full text-left px-4 py-3 rounded-lg text-gray-400"
              onClick={() => alert('준비 중입니다! 🚧')}
            >
              <span className="mr-2">🔮</span>
              사주팔자
              <span className="ml-2 text-xs bg-gray-200 px-2 py-1 rounded-full">
                준비중
              </span>
            </button>
            <button
              className="w-full text-left px-4 py-3 rounded-lg text-gray-400"
              onClick={() => alert('준비 중입니다! 🚧')}
            >
              <span className="mr-2">🃏</span>
              타로
              <span className="ml-2 text-xs bg-gray-200 px-2 py-1 rounded-full">
                준비중
              </span>
            </button>
            <button
              className="w-full mt-2 px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all"
              onClick={() => alert('로그인 기능은 준비 중입니다! 🚧')}
            >
              로그인
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
