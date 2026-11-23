import type { CollectionConfig } from 'payload'

export const Certificates: CollectionConfig = {
  slug: 'certificates',
  labels: {
    singular: 'Workshop Certificate',
    plural: 'Workshop Certificates',
  },
  admin: {
    useAsTitle: 'candidateName',
    defaultColumns: ['certificateId', 'candidateName', 'workshopTitle', 'issueDate', 'status'],
    group: 'Certifications',
  },
  access: {
    read: () => true, // Publicly verifiable by ID / candidate
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.certificateId) {
          data.certificateId = String(data.certificateId).trim().toUpperCase()
        }
        return data
      },
    ],
    afterChange: [
      async ({ doc, previousDoc }) => {
        try {
          const { revalidatePath } = await import('next/cache')
          revalidatePath('/certificates')
          if (doc?.certificateId) {
            revalidatePath(`/certificates/${doc.certificateId}`)
          }
          if (previousDoc?.certificateId && previousDoc.certificateId !== doc?.certificateId) {
            revalidatePath(`/certificates/${previousDoc.certificateId}`)
          }
        } catch (err) {
          console.warn('Certificate revalidation error afterChange:', err)
        }
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        try {
          const { revalidatePath } = await import('next/cache')
          revalidatePath('/certificates')
          if (doc?.certificateId) {
            revalidatePath(`/certificates/${doc.certificateId}`)
          }
        } catch (err) {
          console.warn('Certificate revalidation error afterDelete:', err)
        }
      },
    ],
  },
  fields: [
    {
      name: 'candidateName',
      type: 'text',
      required: true,
      label: 'Candidate Full Name',
    },
    {
      name: 'certificateId',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: 'Certificate ID (e.g. AR-WS-2026-001)',
    },
    {
      name: 'workshopTitle',
      type: 'text',
      required: true,
      label: 'Workshop / Training Title',
    },
    {
      name: 'issueDate',
      type: 'date',
      required: true,
      label: 'Completion / Issue Date',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'valid',
      required: true,
      options: [
        { label: 'Active & Verified', value: 'valid' },
        { label: 'Revoked', value: 'revoked' },
      ],
      label: 'Certificate Status',
    },
    {
      name: 'grade',
      type: 'text',
      label: 'Grade / Achievement Level (e.g. Completed with Distinction)',
    },
    {
      name: 'candidateEmail',
      type: 'email',
      label: 'Candidate Email Address (for verification lookup)',
    },
    {
      name: 'instructor',
      type: 'text',
      defaultValue: 'Aratha Technical Training Group',
      label: 'Instructor / Issuing Authority',
    },
    {
      name: 'workshopDuration',
      type: 'text',
      label: 'Workshop Duration (e.g. 4 Weeks / 40 Hours)',
    },
    {
      name: 'skillsLearned',
      type: 'text',
      label: 'Key Skills Acquired (comma-separated)',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Workshop Description / Project Summary',
    },
    {
      name: 'certificateFile',
      type: 'upload',
      relationTo: 'media',
      label: 'Optional Uploaded Certificate Document / Badge',
    },
  ],
}
