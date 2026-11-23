import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Users } from './src/collections/Users'
import { Media } from './src/collections/Media'
import { Services } from './src/collections/Services'
import { Projects } from './src/collections/Projects'
import { Blogs } from './src/collections/Blogs'
import { Testimonials } from './src/collections/Testimonials'
import { Leads } from './src/collections/Leads'
import { Certificates } from './src/collections/Certificates'
import { s3Storage } from '@payloadcms/storage-s3'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  sharp,
  routes: {
    admin: '/cms',
  },
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Services, Projects, Blogs, Testimonials, Leads, Certificates],
  plugins: [
    s3Storage({
      enabled: Boolean(process.env.AWS_ACCESS_KEY_ID),
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET || 'assets',
      config: {
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
        },
        region: process.env.AWS_REGION || 'us-east-2',
        endpoint: process.env.AWS_ENDPOINT_URL_S3 || 'https://br-rough-butterfly-bet3bhql.storage.c-9.us-east-2.aws.neon.tech',
        forcePathStyle: true,
      },
    }),
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'aratha_payload_super_secret_key_2025_cyber_sapphire',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || process.env.DATABASE_URI || '',
    },
  }),
})
