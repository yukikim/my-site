import Image from 'next/image'

import type { HeroBlock } from '@/payload-types'

type RenderHeroProps = {
  block: HeroBlock
}

export function RenderHero({ block }: RenderHeroProps) {
  // Hero画像はdepth: 1の場合はオブジェクトですが、念のため判定を入れています
  const image = typeof block.image === 'object' ? block.image : null

  return (
    <section className="bg-slate-50">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
        <div>
          {block.eyebrow && (
            <p className="mb-4 text-sm font-semibold tracking-widest text-indigo-600">
              {block.eyebrow}
            </p>
          )}

          <h1 className="font-noto-sans-jp text-3xl font-bold leading-tight tracking-tight text-slate-700 sm:text-4xl lg:text-5xl">
            {block.heading}
          </h1>

          {block.description && (
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              {block.description}
            </p>
          )}
        </div>
        {image?.url && (
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        )}
      </div>
    </section>
  )
}
