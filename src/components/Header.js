'use client'

import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-8">
        <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
          <span className="text-2xl">🍽️</span>
          <span className="font-bold text-xl text-gray-800">
            오늘 뭐먹을까?
          </span>
        </Link>

        <div className="flex items-center space-x-2">
          <Link
            href="/"
            className="px-4 py-2 rounded-lg transition-all hover:bg-orange-500 hover:text-white text-gray-700 font-medium"
          >
            <span className="mr-2">🍽️</span>
            점심 추천
          </Link>
          <a
            href="https://16personality-type-test.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg transition-all hover:bg-purple-500 hover:text-white text-gray-700 font-medium flex items-center"
          >
            <span className="mr-2">🧠</span>
            MBTI
          </a>
        </div>
      </nav>
    </header>
  )
}
