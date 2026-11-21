import type { CollectionConfig } from 'payload'

export const Leads: CollectionConfig = {
  slug: 'leads',
  admin: {
    useAsTitle: 'email',
  },
  access: {
    create: () => true, // allow public submission from contact forms
    read: ({ req }) => Boolean(req.user), // admin only
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'type',
      type: 'select',
      defaultValue: 'contact',
      options: [
        { label: 'Contact Form', value: 'contact' },
        { label: 'Consultation', value: 'consultation' },
        { label: 'Career Application', value: 'career' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'New',
      options: [
        { label: 'New', value: 'New' },
        { label: 'Contacted', value: 'Contacted' },
        { label: 'Reviewed', value: 'Reviewed' },
        { label: 'Closed', value: 'Closed' },
        { label: 'Rejected', value: 'Rejected' },
      ],
    },
    {
      name: 'message',
      type: 'textarea',
    },
  ],
}
