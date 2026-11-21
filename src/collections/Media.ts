import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Media & File',
    plural: 'Media & Files',
  },
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['filename', 'mimeType', 'filesize', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  upload: {
    staticDir: 'public/media',
    staticURL: '/media',
    adminThumbnail: 'thumbnail',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 512,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        position: 'centre',
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Alt Text / Description',
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Caption / Display Title',
    },
  ],
}
