// Payloadが用意しているLexical用Reactコンポーネントを別名でインポート
import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'

import type { RichTextBlock } from '@/payload-types'

type RenderRichTextProps = {
  block: RichTextBlock
}

export function RenderRichText({ block }: RenderRichTextProps) {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <LexicalRichText
          data={block.content}
          className={[
            'text-slate-700',
            '[&_h2]:mb-4 [&_h2]:mt-10 [&_h2]:text-3xl [&_h2]:font-bold',
            '[&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:text-2xl [&_h3]:font-bold',
            '[&_p]:my-4 [&_p]:leading-8',
            '[&_a]:text-blue-600 [&_a]:underline',
            '[&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6',
            '[&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6',
            '[&_li]:my-2',
          ].join(' ')}
        />
      </div>
    </section>
  )
}
