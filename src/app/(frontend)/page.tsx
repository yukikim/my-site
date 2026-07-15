import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })
  // DB から media コレクションのデータを取得する(分割代入: docsプロパティの値を mediaList に代入)
  const { docs: mediaList } = await payload.find({
    collection: 'media',
    overrideAccess: false,
    sort: '-createdAt',
  })
  // console.log('mediaList', mediaList)

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  type Feature = {
    title: string
    description: string
    icon: string
  }

  const features: Feature[] = [
    {
      title: 'Webサイト制作',
      description: '企業サイトやサービスサイトを、目的に合わせて設計・開発します。',
      icon: '01',
    },
    {
      title: 'Webアプリ開発',
      description: '業務システムや予約システムなど、運用しやすいWebアプリを開発します。',
      icon: '02',
    },
    {
      title: '保守・運用',
      description: '公開後の更新、機能追加、セキュリティ対策まで継続的に支援します。',
      icon: '03',
    },
  ]

  return (
    <>
      {/* ヒーローセクション */}
      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
          <div>
            <p className="mb-4 text-sm font-semibold tracking-widest text-indigo-600">
              WEB DEVELOPMENT
            </p>

            <h1 className="font-noto-sans-jp text-3xl font-bold leading-tight tracking-tight text-slate-700 sm:text-4xl lg:text-5xl">
              ビジネスの課題を解決する
              <span className="mt-2 block text-indigo-500">Webサイト・アプリを開発</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              要件整理からデザイン、開発、運用まで一貫して対応します。
              小規模なWebサイトから業務システムまで、お客様の目的に合わせて提案します。
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                お問い合わせ
              </a>

              <a
                href="/services"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
              >
                サービスを見る
              </a>
            </div>
          </div>

          {/* 画像の代わりとなるサンプルブロック */}
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-700 p-6 shadow-xl sm:p-10">
              <div className="flex h-full flex-col justify-between rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
                <div>
                  <p className="text-sm font-medium text-blue-100">Sample Dashboard</p>
                  <p className="mt-2 text-2xl font-bold text-white">Web Solution</p>
                </div>

                <div className="space-y-4">
                  <div className="h-4 w-3/4 rounded bg-white/80" />
                  <div className="h-4 w-full rounded bg-white/50" />
                  <div className="h-4 w-2/3 rounded bg-white/50" />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="h-16 rounded-lg bg-white/20" />
                  <div className="h-16 rounded-lg bg-white/20" />
                  <div className="h-16 rounded-lg bg-white/20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* サービス一覧 */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold tracking-widest text-blue-600">SERVICES</p>

            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              提供サービス
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              お客様の事業内容や課題に合わせて、必要な機能と構成を提案します。
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-8"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-sm font-bold text-blue-600">
                  {feature.icon}
                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-900">{feature.title}</h3>

                <p className="mt-3 leading-7 text-slate-600">{feature.description}</p>

                <a
                  href="/services"
                  className="mt-6 inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800"
                >
                  詳細を見る
                  <span className="ml-2" aria-hidden="true">
                    →
                  </span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 紹介コンテンツ */}
      <section className="bg-indigo-900 py-16 text-white sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-semibold tracking-widest text-blue-300">ABOUT US</p>

            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              シンプルで運用しやすい
              <span className="block">システムを提供します</span>
            </h2>

            <p className="mt-6 leading-8 text-slate-300">
              必要以上に複雑な機能を増やすのではなく、実際の業務や運用方法を確認したうえで、
              長く使いやすい構成を設計します。
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-4 sm:gap-6">
            <div className="rounded-xl bg-white/10 p-5 sm:p-6">
              <dt className="text-sm text-slate-300">対応範囲</dt>
              <dd className="mt-2 text-xl font-bold sm:text-2xl">設計〜運用</dd>
            </div>

            <div className="rounded-xl bg-white/10 p-5 sm:p-6">
              <dt className="text-sm text-slate-300">開発方式</dt>
              <dd className="mt-2 text-xl font-bold sm:text-2xl">アジャイル</dd>
            </div>

            <div className="rounded-xl bg-white/10 p-5 sm:p-6">
              <dt className="text-sm text-slate-300">レスポンシブ</dt>
              <dd className="mt-2 text-xl font-bold sm:text-2xl">標準対応</dd>
            </div>

            <div className="rounded-xl bg-white/10 p-5 sm:p-6">
              <dt className="text-sm text-slate-300">更新・保守</dt>
              <dd className="mt-2 text-xl font-bold sm:text-2xl">対応可能</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-600">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Web制作・開発について相談しませんか？
            </h2>

            <p className="mt-3 text-blue-100">
              ご相談内容が固まっていない段階でも、お気軽にお問い合わせください。
            </p>
          </div>

          <a
            href="/contact"
            className="inline-flex w-full shrink-0 items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-50 md:w-auto"
          >
            無料で相談する
          </a>
        </div>
      </section>

      {/* <div className="home">
        <div className="content">
          <picture>
            <source srcSet="https://raw.githubusercontent.com/payloadcms/payload/3.x/packages/ui/src/assets/payload-favicon.svg" />
            <Image
              alt="Payload Logo"
              height={65}
              src="https://raw.githubusercontent.com/payloadcms/payload/3.x/packages/ui/src/assets/payload-favicon.svg"
              width={65}
            />
          </picture>
          {!user && <h1>Welcome to your new project.</h1>}
          {user && <h1>Welcome back, {user.email}</h1>}
          <div className="links">
            <a
              className="admin"
              href={payloadConfig.routes.admin}
              rel="noopener noreferrer"
              target="_blank"
            >
              Go to admin panel
            </a>
            <a
              className="docs"
              href="https://payloadcms.com/docs"
              rel="noopener noreferrer"
              target="_blank"
            >
              Documentation
            </a>
          </div>
          <div className="mediaList">
            {mediaList.map(
              (media) =>
                media.url && (
                  <div key={media.id} className="mediaItem">
                    <Image alt={media.alt} height={100} src={media.url} width={100} />
                    <p>{media.alt}</p>
                  </div>
                ),
            )}
          </div>
        </div>
        <div className="footer">
          <p>Update this page by editing</p>
          <a className="codeLink" href={fileURL}>
            <code>app/(frontend)/page.tsx</code>
          </a>
        </div>
      </div> */}
    </>
  )
}
