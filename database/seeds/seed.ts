import { loadEnvConfig } from '@next/env'
loadEnvConfig(process.cwd())

import { getPayload } from 'payload'
import config from '../../payload.config'
import dbData from '../schema/db.json'

async function seed() {
  console.log('🌱 Connecting to Payload CMS & Database...')
  const payload = await getPayload({ config })

  console.log('\n📦 Syncing Services Collection...')
  let srvCount = 0
  for (const srv of dbData.services) {
    try {
      const existing = await payload.find({
        collection: 'services',
        where: { slug: { equals: srv.slug } },
      })
      if (existing.docs.length === 0) {
        await payload.create({
          collection: 'services',
          data: {
            title: srv.title,
            slug: srv.slug,
            tagline: srv.description,
            description: srv.longDescription || srv.description,
            pricing: srv.pricing,
            iconName: srv.icon,
            features: srv.features ? srv.features.map((f) => ({ feature: f })) : [],
            featured: true,
          },
        })
        srvCount++
        console.log(`  ✓ Created service: ${srv.title}`)
      } else {
        console.log(`  - Already in CMS: ${srv.title}`)
      }
    } catch (err: any) {
      console.error(`  ✕ Service error (${srv.title}):`, err.message || err)
    }
  }

  console.log('\n🎨 Syncing Projects (Portfolio) Collection...')
  let projCount = 0
  for (const proj of dbData.portfolio) {
    try {
      const existing = await payload.find({
        collection: 'projects',
        where: { slug: { equals: proj.slug } },
      })
      if (existing.docs.length === 0) {
        await payload.create({
          collection: 'projects',
          data: {
            title: proj.title,
            slug: proj.slug,
            category: (proj.category as any) || 'Web Applications',
            client: proj.client,
            metric: proj.highlights ? proj.highlights[0] : '',
            description: proj.description,
            technologies: proj.tags ? proj.tags.map((t) => ({ tech: t })) : [],
            featured: true,
          },
        })
        projCount++
        console.log(`  ✓ Created project: ${proj.title}`)
      } else {
        console.log(`  - Already in CMS: ${proj.title}`)
      }
    } catch (err: any) {
      console.error(`  ✕ Project error (${proj.title}):`, err.message || err)
    }
  }

  console.log('\n📝 Syncing Blogs Collection...')
  let blogCount = 0
  for (const blog of dbData.blogs) {
    try {
      const existing = await payload.find({
        collection: 'blogs',
        where: { slug: { equals: blog.slug } },
      })
      if (existing.docs.length === 0) {
        await payload.create({
          collection: 'blogs',
          data: {
            title: blog.title,
            slug: blog.slug,
            author: blog.author || 'Aratha Team',
            category: blog.category || 'Market Intelligence',
            excerpt: blog.excerpt,
            readTime: blog.readTime || '5 min read',
            publishedDate: blog.date ? new Date(blog.date).toISOString() : new Date().toISOString(),
          },
        })
        blogCount++
        console.log(`  ✓ Created blog: ${blog.title}`)
      } else {
        console.log(`  - Already in CMS: ${blog.title}`)
      }
    } catch (err: any) {
      console.error(`  ✕ Blog error (${blog.title}):`, err.message || err)
    }
  }

  console.log('\n💬 Syncing Testimonials Collection...')
  let testCount = 0
  for (const test of dbData.testimonials) {
    try {
      const existing = await payload.find({
        collection: 'testimonials',
        where: { company: { equals: test.company } },
      })
      if (existing.docs.length === 0) {
        await payload.create({
          collection: 'testimonials',
          data: {
            name: test.name,
            role: test.role,
            company: test.company,
            content: test.content,
            rating: test.rating || 5,
          },
        })
        testCount++
        console.log(`  ✓ Created testimonial: ${test.name} (${test.company})`)
      } else {
        console.log(`  - Already in CMS: ${test.name}`)
      }
    } catch (err: any) {
      console.error(`  ✕ Testimonial error (${test.name}):`, err.message || err)
    }
  }

  console.log('\n📬 Syncing Leads Collection...')
  let leadCount = 0
  for (const lead of dbData.leads) {
    try {
      const existing = await payload.find({
        collection: 'leads',
        where: { email: { equals: lead.email } },
      })
      if (existing.docs.length === 0) {
        await payload.create({
          collection: 'leads',
          data: {
            name: lead.name || 'Anonymous',
            email: lead.email,
            phone: lead.phone || '',
            type: (lead.type as any) === 'newsletter' ? 'contact' : (lead.type as any) || 'contact',
            status: (lead.status as any) === 'Subscribed' ? 'New' : (lead.status as any) || 'New',
            message: lead.message || 'Newsletter Subscription',
          },
        })
        leadCount++
        console.log(`  ✓ Created lead: ${lead.email}`)
      } else {
        console.log(`  - Already in CMS: ${lead.email}`)
      }
    } catch (err: any) {
      console.error(`  ✕ Lead error (${lead.email}):`, err.message || err)
    }
  }

  console.log(`\n🎉 Sync Complete! Services: ${srvCount}, Projects: ${projCount}, Blogs: ${blogCount}, Testimonials: ${testCount}, Leads: ${leadCount}`)
  process.exit(0)
}

seed()
