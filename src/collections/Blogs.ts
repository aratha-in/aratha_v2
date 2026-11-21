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
          try {
            revalidateTag('insights', 'default')
            revalidateTag('blogs', 'default')
          } catch {}
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
          try {
            revalidateTag('insights', 'default')
            revalidateTag('blogs', 'default')
          } catch {}
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
              name: 'directAnswer',
              type: 'textarea',
              label: '⚡ Quick Answer / Direct Answer (AEO - Answer Engine Optimization)',
              admin: {
                description: 'Crucial for AEO: A clear 40-60 word definitive answer to the primary query. Google AI Overviews and Perplexity extract this directly as the featured answer.',
              },
            },
            {
              name: 'keyTakeaways',
              type: 'textarea',
              label: '📌 Executive Summary / Key Takeaways (GEO - Generative Engine Optimization)',
              admin: {
                description: 'Crucial for GEO: 3–5 bullet points summarizing core insights. Generative AI models (ChatGPT, Claude, Gemini) cite these when answering user prompts.',
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
              label: 'Or Paste Raw Markdown Article (SEO/AEO/GEO Formatted)',
              admin: {
                description: 'Fast-entry field. Format with ## for Headings, Step 1: for workflows, tables (| Col |), blockquotes (> Quote), and checklists (- [x]) for peak SEO, AEO, and GEO performance.',
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
          label: 'SEO, AEO & GEO Engine',
          fields: [
            {
              name: 'primaryKeyword',
              type: 'text',
              label: 'Primary Focus Keyword',
              admin: {
                description: 'The core search term targeted by this article (e.g. digital marketing strategy)',
              },
            },
            {
              name: 'secondaryKeywords',
              type: 'textarea',
              label: 'Secondary & Semantic Keywords (LSI)',
              admin: {
                description: 'Comma-separated related terms and synonyms used by search and generative AI engines.',
              },
            },
            {
              name: 'seoTitle',
              type: 'text',
              label: 'SEO Meta Title (50-60 characters)',
              admin: {
                description: 'Appears as the clickable headline in Google, Bing, and AI citations.',
              },
            },
            {
              name: 'seoDescription',
              type: 'textarea',
              label: 'SEO Meta Description (140-160 characters)',
              admin: {
                description: 'Compelling summary displayed in search snippets and generative summaries.',
              },
            },
            {
              name: 'faqs',
              type: 'json',
              label: 'Frequently Asked Questions (AEO & FAQPage Schema)',
              admin: {
                description: 'Enter FAQs: [{"question": "...", "answer": "..."}]. Automatically injected into Google FAQPage Schema & AI answer engines.',
              },
            },
            {
              name: 'researchReferences',
              type: 'textarea',
              label: 'Recommended Research References & Citations',
              admin: {
                description: 'Data sources, industry surveys, and benchmark citations to boost GEO authoritativeness.',
              },
            },
          ],
        },
      ],
    },
  ],
}
