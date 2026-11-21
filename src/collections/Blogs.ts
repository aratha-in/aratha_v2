import type { CollectionConfig } from 'payload'

export const Blogs: CollectionConfig = {
  slug: 'blogs',
  labels: {
    singular: 'Insight',
    plural: 'Insights',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'author', 'publishedDate'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.slug) {
          data.slug = data.slug
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
        } else if (data?.title) {
          data.slug = data.title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
        }
        return data;
      },
    ],
    afterChange: [
      async ({ doc, previousDoc }) => {
        try {
          const { revalidatePath, revalidateTag } = await import('next/cache')
          revalidatePath('/insights')
          revalidatePath('/')
          revalidatePath('/sitemap.xml')
          revalidateTag('insights')
          revalidateTag('blogs')
          if (doc?.slug) {
            revalidatePath(`/insights/${doc.slug}`)
          }
          if (previousDoc?.slug && previousDoc.slug !== doc?.slug) {
            revalidatePath(`/insights/${previousDoc.slug}`)
          }
        } catch (err) {
          console.warn('Revalidation error afterChange:', err)
        }
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        try {
          const { revalidatePath, revalidateTag } = await import('next/cache')
          revalidatePath('/insights')
          revalidatePath('/')
          revalidatePath('/sitemap.xml')
          revalidateTag('insights')
          revalidateTag('blogs')
          if (doc?.slug) {
            revalidatePath(`/insights/${doc.slug}`)
          }
        } catch (err) {
          console.warn('Revalidation error afterDelete:', err)
        }
      },
    ],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Article & Banner Image',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Article Title',
            },
            {
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
              label: 'URL Slug',
              admin: {
                description: 'e.g. building-digital-marketing-strategy-with-clear-business-goals',
              },
            },
            {
              name: 'articleStatus',
              type: 'select',
              defaultValue: 'published',
              required: true,
              options: [
                { label: 'Published (Live on website)', value: 'published' },
                { label: 'Draft (Hidden from website)', value: 'draft' },
              ],
              admin: {
                description: 'Only Published articles appear on the website. Drafts are completely hidden.',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'publication',
                  type: 'text',
                  defaultValue: 'ARATHA INSIGHTS',
                  admin: { width: '50%' },
                },
                {
                  name: 'category',
                  type: 'select',
                  defaultValue: 'Digital Marketing',
                  admin: { width: '50%' },
                  options: [
                    { label: 'Digital Marketing', value: 'Digital Marketing' },
                    { label: 'Market Intelligence', value: 'Market Intelligence' },
                    { label: 'Business Strategy', value: 'Business Strategy' },
                    { label: 'Technology Insights', value: 'Technology Insights' },
                    { label: 'Customer Experience', value: 'Customer Experience' },
                    { label: 'Industry Trends', value: 'Industry Trends' },
                    { label: 'Research & Reports', value: 'Research & Reports' },
                    { label: 'Guides & Resources', value: 'Guides & Resources' },
                  ],
                },
              ],
            },
            {
              type: 'collapsible',
              label: '📸 Article Banner / Cover Image',
              admin: {
                initCollapsed: false,
              },
              fields: [
                {
                  name: 'featuredImage',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Upload Banner Image (JPG, PNG, WebP)',
                  admin: {
                    description: 'Upload high-resolution article cover banner (16:9 ratio recommended). Managed by CMS & automatically resized.',
                  },
                },
                {
                  name: 'bannerImageUrl',
                  type: 'text',
                  label: 'Or External Banner Image URL',
                  admin: {
                    description: 'Optional: Direct image URL (e.g. https://images.unsplash.com/... or CDN link)',
                  },
                },
                {
                  name: 'bannerImageAlt',
                  type: 'text',
                  label: 'Banner Image Alt Text / Caption',
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'author',
                  type: 'text',
                  defaultValue: 'Aratha Team',
                  admin: { width: '50%' },
                },
                {
                  name: 'authorUser',
                  type: 'relationship',
                  relationTo: 'users',
                  label: 'Link to CMS User Profile',
                  admin: {
                    width: '50%',
                    description: 'Select registered team member / author',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'readTime',
                  type: 'text',
                  defaultValue: '5 min read',
                  admin: { width: '33%' },
                },
                {
                  name: 'publishedDate',
                  type: 'date',
                  admin: {
                    width: '33%',
                    date: {
                      pickerAppearance: 'dayOnly',
                    },
                  },
                },
                {
                  name: 'tags',
                  type: 'text',
                  label: 'Tags / Topics',
                  admin: {
                    width: '34%',
                    description: 'e.g. SEO, Strategy, Growth, Next.js',
                  },
                },
              ],
            },
            {
              name: 'targetAudience',
              type: 'textarea',
              label: 'Target Audience Profile',
              admin: {
                description: 'e.g. Business owners, entrepreneurs, startup founders, marketing managers',
              },
            },
            {
              name: 'alternativeHeadlines',
              type: 'textarea',
              label: 'Alternative Suggested Headlines',
              admin: {
                description: 'Alternative headlines for A/B testing or multi-platform distribution',
              },
            },
            {
              name: 'excerpt',
              type: 'textarea',
              required: true,
              label: 'Excerpt / Summary Teaser',
            },
            {
              name: 'keyTakeaways',
              type: 'textarea',
              label: 'Key Takeaways / Highlights (Top Box)',
              admin: {
                description: 'Enter key bullet points to highlight at the top of the article',
              },
            },
            {
              name: 'content',
              type: 'richText',
              label: 'Article Body (Rich Text Editor)',
            },
            {
              name: 'rawMarkdownContent',
              type: 'textarea',
              label: 'Or Paste Raw Markdown Article',
              admin: {
                description: 'Optional fast-entry field: paste complete markdown article text here',
              },
            },
          ],
        },
        {
          label: 'User Files & Downloads',
          fields: [
            {
              name: 'downloadableFile',
              type: 'upload',
              relationTo: 'media',
              label: 'Upload Resource / Attachment (PDF, Guide, Checklist)',
              admin: {
                description: 'Attach a downloadable file for readers to download directly from the article',
              },
            },
            {
              name: 'resourceName',
              type: 'text',
              label: 'Resource Display Name',
              admin: {
                description: 'e.g. Digital Marketing Strategy Checklist (PDF)',
              },
            },
            {
              name: 'resourceUrl',
              type: 'text',
              label: 'Or External Resource Download URL',
            },
            {
              name: 'resourceDescription',
              type: 'textarea',
              label: 'Resource Description / Callout Text',
            },
          ],
        },
        {
          label: 'SEO & Search Assets',
          fields: [
            {
              name: 'primaryKeyword',
              type: 'text',
              label: 'Primary Keyword',
            },
            {
              name: 'secondaryKeywords',
              type: 'textarea',
              label: 'Secondary Keywords',
            },
            {
              name: 'seoTitle',
              type: 'text',
              label: 'SEO Title',
            },
            {
              name: 'seoDescription',
              type: 'textarea',
              label: 'Meta Description',
            },
            {
              name: 'researchReferences',
              type: 'textarea',
              label: 'Recommended Research References',
            },
          ],
        },
      ],
    },
  ],
}
