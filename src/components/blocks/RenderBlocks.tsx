import type { Page } from '@/payload-types'

import { RenderHero } from './RenderHero'
import { RenderRichText } from './RenderRichText'

type RenderBlocksProps = {
  blocks: Page['layout']
}

export function RenderBlocks({ blocks }: RenderBlocksProps) {
  if (!blocks?.length) {
    return null
  }

  return (
    <>
      {blocks.map((block, index) => {
        const key = block.id ?? `${block.blockType}-${index}`

        switch (block.blockType) {
          case 'hero':
            return <RenderHero key={key} block={block} />
          case 'richText':
            return <RenderRichText key={key} block={block} />
          default:
            return null
        }
      })}
    </>
  )
}
