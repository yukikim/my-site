import type { Block } from 'payload'

export const RichText: Block = {
  slug: 'richText', // richText がblockTypeの値として使用される
  interfaceName: 'RichTextBlock', // Payloadが生成するTypeScript型の名前
  labels: {
    singular: 'Rich Text',
    plural: 'Rich Texts',
  },
  fields: [
    {
      name: 'content',
      type: 'richText',
      label: '本文',
      required: true,
    },
  ],
}
