import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'
import dbData from '@/data/db.json'

export async function GET() {
  try {
    const payload = await getPayloadClient()
    const summary = {
      servicesCreated: 0,
      projectsCreated: 0,
      blogsCreated: 0,
      testimonialsCreated: 0,
      leadsCreated: 0,
    }

    // 1. Services
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
          summary.servicesCreated++
        }
      } catch (err) {
        console.error('Error seeding service:', err)
      }
    }

    // 2. Projects (Portfolio)
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
          summary.projectsCreated++
        }
      } catch (err) {
        console.error('Error seeding project:', err)
      }
    }

    // 3. Blogs
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
          summary.blogsCreated++
        }
      } catch (err) {
        console.error('Error seeding blog:', err)
      }
    }

    // 4. Testimonials
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
          summary.testimonialsCreated++
        }
      } catch (err) {
        console.error('Error seeding testimonial:', err)
      }
    }

    // 5. Leads
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
          summary.leadsCreated++
        }
      } catch (err) {
        console.error('Error seeding lead:', err)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Database successfully seeded into Payload CMS & Neon PostgreSQL!',
      summary,
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to seed database' },
      { status: 500 }
    )
  }
}
