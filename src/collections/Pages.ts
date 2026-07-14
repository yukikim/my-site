import type { CollectionConfig } from 'payload'

import { Hero } from '../blocks/Hero'
import { RichText } from '../blocks/RichText'

export const Pages: CollectionConfig = {
  slug: 'pages',

  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
  },

  access: {
    read: ({ req: { user } }) => {
      if (user) {
        return true
      }

      return {
        _status: {
          equals: 'published',
        },
      }
    },
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'ページタイトル',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'スラッグ',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'URLの一部として使用されるスラッグを入力してください。例: "about-us"',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      label: 'ページ内容',
      blocks: [Hero, RichText],
      required: true,
    },
  ],
}
