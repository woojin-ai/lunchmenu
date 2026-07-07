'use client'

import Link from 'next/link'
import { useState } from 'react'

const navLinks = [
  { href: '/', label: '점심 추천', emoji: '🍽️', hoverColor: 'hover:bg-orange-500', isInternal: true },
  { href: 'https://16personality-type-test.vercel.app/', label: 'MBTI', emoji: '🧠', hoverColor: 'hover:bg-purple-500' },
  { href: 'https://saju-one-theta.vercel.app/', label: '사주팔자', emoji: '🔮', hoverColor: 'hover:bg-yellow-500' },
  { href: 'https://tarot-card-homepage.vercel.app/', label: '타로', emoji: '🃏', hoverColor: 'hover:bg-indigo-500' },
  { href: 'https://wj-portfolio.vercel.app/contact', label: 'Contact', emoji: '📬', hoverColor: 'hover:bg-teal-500' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">

        {/* 로고 */}
        <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <span className="text-2xl">🍽️</span>
          <span className="font-bold text-lg text-gray-800">오늘 뭐먹을까?</span>
        </Link>

        {/* 데스크탑 메뉴 */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) =>
            link.isInternal ? (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg transition-all ${link.hoverColor} hover:text-white text-gray-700 font-medium text-sm`}
              >
                <span className="mr-1">{link.emoji}</span>{link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-3 py-2 rounded-lg transition-all ${link.hoverColor} hover:text-white text-gray-700 font-medium text-sm flex items-center`}
              >
                <span className="mr-1">{link.emoji}</span>{link.label}
              </a>
            )
          )}
        </div>

        {/* 모바일 햄버거 버튼 */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="메뉴 열기"
        >
          {mobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* 모바일 드롭다운 메뉴 */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-2 space-y-1">
            {navLinks.map((link) =>
              link.isInternal ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="mr-3 text-xl">{link.emoji}</span>{link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="mr-3 text-xl">{link.emoji}</span>{link.label}
                </a>
              )
            )}
          </div>
        </div>
      )}
    </header>
  )
}
