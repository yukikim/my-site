import React from 'react'
import { Noto_Sans_JP, Dela_Gothic_One, M_PLUS_1, Domine } from 'next/font/google'
import './styles.css'
import Header from '@/components/Header'

const notoSansJP = Noto_Sans_JP({
  display: 'swap',
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-jp',
})
const delaGothicOne = Dela_Gothic_One({
  display: 'swap',
  subsets: ['latin', 'latin-ext'],
  weight: ['400'],
  variable: '--font-dela-gothic-one',
})
const mPlus1 = M_PLUS_1({
  display: 'swap',
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '700'],
  variable: '--font-m-plus-1',
})
const domine = Domine({
  display: 'swap',
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '700'],
  variable: '--font-domine',
})
export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html
      lang="ja"
      // TailwindCSS の font-family を適用するために、各フォントの variable を className に追加
      className={`${notoSansJP.variable} ${delaGothicOne.variable} ${mPlus1.variable} ${domine.variable}`}
    >
      <body className="font-noto-sans-jp">
        <Header />
        <h1 className="font-dela-gothic-one text-4xl">フォントの表示テストDelaGothicOne</h1>
        <h2 className="font-m-plus-1 text-2xl">フォントの表示テストMPlus1</h2>
        <h3 className="font-domine text-xl">Hello Payload CMS Domine こんにちは</h3>
        <main>{children}</main>
      </body>
    </html>
  )
}
