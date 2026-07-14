'use client'

import Link from 'next/link'
import { useState } from 'react'

type MenuItem = {
  label: string
  href: string
}

const menuItems: MenuItem[] = [
  { label: 'ホーム', href: '/' },
  { label: 'サービス', href: '/services' },
  { label: '料金', href: '/pricing' },
  { label: '会社概要', href: '/about' },
  { label: 'お問い合わせ', href: '/contact' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const toggleMenu = (): void => {
    setIsMenuOpen((current) => !current)
  }

  const closeMenu = (): void => {
    setIsMenuOpen(false)
  }

  return (
    <header className="border-b border-gray-200 bg-slate-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* ロゴ */}
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-gray-400"
            onClick={closeMenu}
          >
            My Profile
          </Link>

          {/* PC向けメニュー */}
          <nav className="hidden items-center gap-8 md:flex" aria-label="メインメニュー">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-300 transition-colors hover:text-blue-300"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* スマートフォン向けハンバーガーボタン */}
          <button
            type="button"
            onClick={toggleMenu}
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 md:hidden"
            aria-label={isMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? (
              // 閉じるアイコン
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              // ハンバーガーアイコン
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* スマートフォン向けメニュー */}
      {isMenuOpen && (
        <nav
          id="mobile-menu"
          className="border-t border-gray-200 bg-white px-4 py-4 md:hidden"
          aria-label="スマートフォンメニュー"
        >
          <div className="flex flex-col gap-1">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="rounded-md px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
