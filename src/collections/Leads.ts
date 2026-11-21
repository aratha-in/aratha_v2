import type { CollectionConfig } from 'payload'

export const Leads: CollectionConfig = {
  slug: 'leads',
  labels: {
    singular: 'Lead & Inquiry',
    plural: 'Leads & Inquiries',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'phone', 'type', 'status', 'createdAt'],
  },
  access: {
    create: () => true, // allow public submission from contact forms
    read: ({ req }) => Boolean(req.user), // admin only
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Candidate / Client Name',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email Address',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone Number',
    },
    {
      name: 'type',
      type: 'select',
      defaultValue: 'contact',
      label: 'Inquiry Type',
      options: [
        { label: 'Contact Form / Inquiry Brief', value: 'contact' },
        { label: 'Consultation', value: 'consultation' },
        { label: 'Career Application', value: 'career' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'New',
      label: 'Lead Status',
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
      label: 'Detailed Inquiry Brief / Request Message',
    },
  ],
}
