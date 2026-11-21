import type { CollectionConfig } from 'payload'

export const Blogs: CollectionConfig = {
  slug: 'blogs',
  labels: {
    singular: 'Insight',
    plural: 'Insights',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'author', 'editorialStatus', 'publishedDate'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Article Content',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
            },
            {
              name: 'publication',
              type: 'text',
              defaultValue: 'ARATHA INSIGHTS',
            },
            {
              name: 'category',
              type: 'select',
              defaultValue: 'Digital Marketing',
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
            {
              name: 'author',
              type: 'text',
              defaultValue: 'Aratha Team',
            },
            {
              name: 'targetAudience',
              type: 'textarea',
              label: 'Target Audience',
              admin: {
                description: 'e.g. Business owners, entrepreneurs, startup founders, marketing managers',
              },
            },
            {
              name: 'alternativeHeadlines',
              type: 'textarea',
              label: 'Alternative Headlines',
              admin: {
                description: 'Suggested alternative headlines for A/B testing or multi-platform distribution',
              },
            },
            {
              name: 'excerpt',
              type: 'textarea',
              required: true,
              label: 'Excerpt / Summary',
            },
            {
              name: 'content',
              type: 'richText',
              label: 'Article Body (Rich Text)',
            },
            {
              name: 'readTime',
              type: 'text',
              defaultValue: '5 min read',
            },
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'publishedDate',
              type: 'date',
              admin: {
                date: {
                  pickerAppearance: 'dayOnly',
                },
              },
            },
          ],
        },
        {
          label: 'LinkedIn & Social Assets',
          fields: [
            {
              name: 'linkedinDescription',
              type: 'textarea',
              label: 'LinkedIn Article Description',
            },
            {
              name: 'linkedinHashtags',
              type: 'text',
              label: 'Suggested Hashtags',
            },
            {
              name: 'linkedinPost',
              type: 'textarea',
              label: 'Promotional LinkedIn Post Copy',
            },
            {
              name: 'coverImageHeadline',
              type: 'text',
              label: 'Cover Image Headline',
            },
            {
              name: 'coverImagePrompt',
              type: 'textarea',
              label: 'Cover Image Generation Prompt',
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
        {
          label: 'Editorial Quality Check',
          fields: [
            {
              name: 'editorialStatus',
              type: 'select',
              defaultValue: 'review',
              options: [
                { label: 'Draft', value: 'draft' },
                { label: 'Ready for Review', value: 'review' },
                { label: 'Approved', value: 'approved' },
                { label: 'Published', value: 'published' },
              ],
            },
            {
              name: 'editorialNotes',
              type: 'textarea',
              label: 'Editorial Notes & Recommendations',
            },
          ],
        },
      ],
    },
  ],
}
