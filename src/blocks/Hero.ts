import type { Block } from 'payload'

export const Hero: Block = {
  slug: 'hero', // hero がblockTypeの値として使用される
  interfaceName: 'HeroBlock', // Payloadが生成するTypeScript型の名前
  labels: {
    singular: 'Hero',
    plural: 'Heroes',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: '小見出し',
    },
    {
      name: 'heading',
      type: 'text',
      label: '見出し',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: '説明文',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'メイン画像',
    },
  ],
}
