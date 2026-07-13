type FooterLink = {
  label: string
  href: string
}

type FooterMenu = {
  title: string
  links: FooterLink[]
}

const footerMenus: FooterMenu[] = [
  {
    title: 'サービス',
    links: [
      { label: 'Webサイト制作', href: '/services/web-site' },
      { label: 'Webアプリ開発', href: '/services/web-app' },
      { label: '保守・運用', href: '/services/maintenance' },
    ],
  },
  {
    title: '会社情報',
    links: [
      { label: '会社概要', href: '/about' },
      { label: 'お知らせ', href: '/news' },
      { label: '採用情報', href: '/recruit' },
    ],
  },
  {
    title: 'サポート',
    links: [
      { label: 'お問い合わせ', href: '/contact' },
      { label: 'プライバシーポリシー', href: '/privacy' },
      { label: '利用規約', href: '/terms' },
    ],
  },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-700 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* 会社情報 */}
          <div className="sm:col-span-2">
            <a href="/" className="text-2xl font-bold tracking-tight text-white">
              My Profile
            </a>

            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-400">
              Webサイト制作、Webアプリ開発、保守・運用を通じて、 お客様のビジネスを支援します。
            </p>

            <address className="mt-6 text-sm not-italic leading-7 text-slate-400">
              〒000-0000
              <br />
              東京都○○区○○ 1-2-3
              <br />
              TEL: 00-0000-0000
            </address>
          </div>

          {/* フッターメニュー */}
          {footerMenus.map((menu) => (
            <div key={menu.title}>
              <h2 className="text-sm font-semibold text-white">{menu.title}</h2>

              <ul className="mt-4 space-y-3">
                {menu.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-slate-800 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            &copy; {currentYear} Sample Site. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <a
              href="https://x.com/"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-slate-400 hover:text-white"
              aria-label="X"
            >
              X
            </a>

            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-slate-400 hover:text-white"
              aria-label="GitHub"
            >
              GitHub
            </a>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-slate-400 hover:text-white"
              aria-label="Instagram"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
