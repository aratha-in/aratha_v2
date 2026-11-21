import fs from 'fs';

function markdownToLexical(markdown) {
  if (!markdown) {
    return {
      root: {
        type: 'root',
        format: '',
        indent: 0,
        version: 1,
        children: [],
        direction: 'ltr',
      },
    };
  }

  const lines = markdown.split('\n');
  const children = [];

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();
    if (!line) continue;

    if (line.startsWith('### ')) {
      children.push({
        type: 'heading',
        tag: 'h3',
        format: '',
        indent: 0,
        version: 1,
        children: [{ type: 'text', text: line.replace('### ', ''), format: 0, mode: 'normal', style: '', detail: 0, version: 1 }],
        direction: 'ltr',
      });
    } else if (line.startsWith('## ')) {
      children.push({
        type: 'heading',
        tag: 'h2',
        format: '',
        indent: 0,
        version: 1,
        children: [{ type: 'text', text: line.replace('## ', ''), format: 0, mode: 'normal', style: '', detail: 0, version: 1 }],
        direction: 'ltr',
      });
    } else if (line.startsWith('# ')) {
      children.push({
        type: 'heading',
        tag: 'h1',
        format: '',
        indent: 0,
        version: 1,
        children: [{ type: 'text', text: line.replace('# ', ''), format: 0, mode: 'normal', style: '', detail: 0, version: 1 }],
        direction: 'ltr',
      });
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      children.push({
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        children: [{ type: 'text', text: '• ' + line.replace(/^[-*]\s+/, ''), format: 0, mode: 'normal', style: '', detail: 0, version: 1 }],
        direction: 'ltr',
      });
    } else {
      children.push({
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        children: [{ type: 'text', text: line, format: 0, mode: 'normal', style: '', detail: 0, version: 1 }],
        direction: 'ltr',
      });
    }
  }

  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      children,
      direction: 'ltr',
    },
  };
}

async function main() {
  // 1. Authenticate to Payload API
  const loginRes = await fetch('http://localhost:3000/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@aratha.com',
      password: 'AdminPassword123!',
    }),
  });

  const loginData = await loginRes.json();
  if (!loginData.token) {
    console.error('Failed to log into Payload:', loginData);
    process.exit(1);
  }
  const token = loginData.token;
  console.log('Logged in successfully. User:', loginData.user.email);

  // 2. Read existing blogs from db.json
  const dbData = JSON.parse(fs.readFileSync('src/data/db.json', 'utf-8'));
  const existingBlogs = dbData.blogs || [];

  // Check which blogs are already in Payload CMS
  const currentBlogsRes = await fetch('http://localhost:3000/api/blogs?limit=100', {
    headers: { Authorization: `JWT ${token}` },
  });
  const currentBlogsData = await currentBlogsRes.json();
  const existingSlugs = new Set((currentBlogsData.docs || []).map(b => b.slug));
  console.log('Existing slugs in CMS:', Array.from(existingSlugs));

  // Category mapping
  const categoryMap = {
    'Web Development': 'Technology Insights',
    'Branding': 'Business Strategy',
    'Tech Strategy': 'Technology Insights',
  };

  // Import existing website articles
  for (const b of existingBlogs) {
    if (existingSlugs.has(b.slug)) {
      console.log(`Article "${b.slug}" already in CMS. Skipping.`);
      continue;
    }

    const payload = {
      title: b.title,
      slug: b.slug,
      publication: 'ARATHA INSIGHTS',
      category: categoryMap[b.category] || b.category || 'Technology Insights',
      author: b.author || 'Aratha Team',
      excerpt: b.excerpt,
      content: markdownToLexical(b.content),
      readTime: b.readTime || '5 min read',
      publishedDate: b.date ? new Date(b.date).toISOString() : new Date().toISOString(),
      editorialStatus: 'published',
      seoTitle: b.seoTitle || b.title,
      seoDescription: b.seoDescription || b.excerpt,
    };

    const res = await fetch('http://localhost:3000/api/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const resData = await res.json();
    if (res.ok) {
      console.log(`Saved existing article "${b.title}" (ID: ${resData.doc?.id})`);
    } else {
      console.error(`Failed to save "${b.slug}":`, resData);
    }
  }

  // 3. New Article: Building a Digital Marketing Strategy With Clear Business Goals
  const newArticleSlug = 'building-digital-marketing-strategy-with-clear-business-goals';
  if (!existingSlugs.has(newArticleSlug)) {
    const newArticleContent = `# Building a Digital Marketing Strategy With Clear Business Goals

Many businesses invest in digital marketing without having a clear understanding of what they want to achieve.

They publish social media posts, run advertisements, update their websites and experiment with different platforms. Yet, when asked whether these activities are generating business results, the answers are often unclear.

The problem is not necessarily the marketing channels. It is the absence of a connected strategy.

Digital marketing becomes more effective when every activity serves a defined business objective. Instead of asking, "Which platform should we use?", businesses should first ask, "What outcome are we trying to achieve?"

That question is the foundation of a meaningful digital marketing strategy.

## What Is a Digital Marketing Strategy?

A digital marketing strategy is a structured plan that connects business objectives with target audiences, marketing channels, communication, budgets and performance measurement.

It defines:
- What the business wants to achieve.
- Who the business wants to reach.
- What message it needs to communicate.
- Which digital channels are appropriate.
- What resources and budget are required.
- How success will be measured.

A strategy provides direction, while campaigns and individual marketing activities help execute that direction.

For example, a business that wants to increase qualified enquiries may use SEO, Google Ads, social media advertising and a dedicated landing page. Each activity has a different role, but all contribute towards the same business objective.

## Step 1: Start With Clear Business Goals

Before selecting marketing platforms, identify the business outcome that matters most.

Different businesses have different priorities.

**Brand awareness:** Introduce your business to relevant audiences and improve recognition.
**Lead generation:** Attract potential customers who are interested in your products or services.
**Sales growth:** Increase purchases, bookings or completed transactions.
**Website visibility:** Improve organic search presence and attract relevant website visitors.
**Customer retention:** Encourage repeat purchases, continued engagement and stronger customer relationships.

A useful way to define a goal is to make it specific, measurable, achievable, relevant and time-bound (SMART).

For example, instead of saying: "We want more leads."
Define the objective as: "Generate 100 qualified enquiries over the next three months through our website and digital advertising campaigns."

The second statement provides a measurable direction. The business can now plan its activities, budget and performance indicators around it.

## Step 2: Understand Your Target Audience

A marketing strategy should be built around customers, not assumptions about customers.

Before investing in campaigns, understand:
- Who are your ideal customers?
- What problems are they trying to solve?
- Where are they located?
- What influences their purchasing decisions?
- What questions do they ask before buying?
- Which digital platforms do they use?
- What prevents them from choosing your business?

Consider a Hyderabad-based website development company. Its potential customers might include startup founders, local retailers, educational institutions and professional service providers.

Although all these audiences may need websites, their requirements differ. A startup may prioritise affordability and speed, while an established organisation may focus on scalability, integrations and long-term support. Understanding these differences helps businesses create relevant messages and campaigns.

## Step 3: Choose the Right Digital Marketing Channels

Every digital channel has a different purpose. The objective is not to be present everywhere but to select the channels that support your business goals.

### 1. Search Engine Optimisation (SEO)
SEO helps businesses improve their organic visibility when customers search for relevant products, services or information. Useful for building long-term discoverability.

### 2. Google Search Advertising
Search advertising can help businesses reach people searching for specific products or services with commercial intent.

### 3. Social Media Marketing
Platforms such as Instagram, Facebook, LinkedIn and YouTube support brand communication, customer engagement, content distribution and advertising.

### 4. Content Marketing
Blogs, articles, videos, guides and case studies can educate customers, answer questions and support the decision-making process.

### 5. Email and Customer Communication
Email marketing and consent-based direct communication can help businesses nurture enquiries, share updates and maintain customer relationships.

### 6. Website and Landing Page Optimisation
Your website is often where customers evaluate your business before contacting you or making a purchase. Clear service information, strong calls to action, relevant content and simple enquiry processes can improve the customer experience.

## Step 4: Build a Practical Campaign Workflow

A strategy becomes useful when it can be translated into an organised campaign.

1. Define the campaign objective
2. Identify the audience
3. Develop the campaign message
4. Select the channels
5. Prepare the digital assets
6. Establish the budget and timeline
7. Configure measurement
8. Launch, monitor and optimise

## Step 5: Allocate Your Marketing Budget Strategically

A marketing budget should reflect business priorities rather than simply being divided equally across platforms.

Consider:
- Customer acquisition objectives.
- Audience size and competition.
- Cost of reaching the target audience.
- Website and creative development requirements.
- Advertising costs and content production resources.
- Measurement and optimisation requirements.

For a business starting its digital marketing journey, a controlled pilot campaign can be useful.

## Step 6: Measure Performance Using the Right KPIs

Key Performance Indicators (KPIs) help businesses evaluate whether marketing activities are contributing to their objectives:
- Brand awareness: Reach, impressions, video views
- Website traffic: Sessions, users, traffic sources
- Lead generation: Enquiries, qualified leads, cost per lead
- Sales: Purchases, revenue, conversion rate
- Advertising efficiency: Cost per click, cost per acquisition, return on ad spend
- Customer retention: Repeat purchases, retention rate, customer lifetime value

## Step 7: Review, Learn and Improve

Digital marketing is not a one-time activity. Establish a regular review process:
- Weekly review: Check delivery, spending, enquiries, tracking.
- Monthly review: Evaluate KPIs, lead quality, conversion performance.
- Quarterly review: Revisit business objectives, channel effectiveness, budgets.

## Digital Marketing Strategy Checklist

Before launching your next campaign, review:
- Have we defined a clear business objective?
- Is the objective measurable and time-bound?
- Do we understand our ideal customers?
- Have we selected the appropriate digital channels?
- Is our campaign message clear?
- Are analytics and conversion tracking configured?

## The Key Takeaway: Build a Strategy Before You Build a Campaign

Digital marketing should not be a collection of disconnected activities. Every advertisement, article, social media post, landing page and email should contribute to a broader business objective.

Before investing in your next digital marketing campaign, ask yourself:
"Do we have a clear business goal, and does every marketing activity help us move towards it?"

That is the difference between simply doing digital marketing and building a digital marketing strategy.

---
At Aratha, we believe technology should solve real business problems and create meaningful opportunities for growth.
Discuss your digital growth goals with Aratha: https://www.aratha.in | info@aratha.in`;

    const newArticlePayload = {
      title: 'Building a Digital Marketing Strategy With Clear Business Goals',
      slug: newArticleSlug,
      publication: 'ARATHA INSIGHTS',
      category: 'Digital Marketing',
      author: 'Aratha Team',
      targetAudience: 'Business owners, entrepreneurs, startup founders, marketing managers and business decision-makers.',
      primaryKeyword: 'Digital Marketing Strategy',
      secondaryKeywords: 'Digital marketing goals, digital marketing plan, marketing campaign strategy, digital marketing channels, marketing KPIs, online marketing strategy, digital growth strategy, campaign performance',
      alternativeHeadlines: '1. From Business Goals to Digital Growth: Building a Winning Marketing Strategy\n2. Stop Marketing Without a Plan: Align Digital Campaigns With Business Goals\n3. The Business Guide to Creating a Results-Driven Digital Marketing Strategy',
      excerpt: 'A successful digital marketing strategy starts with clear business goals, not simply choosing social media platforms or running advertisements. Discover how to define objectives, understand customers, select the right channels, plan campaigns, allocate budgets and measure meaningful KPIs.',
      content: markdownToLexical(newArticleContent),
      readTime: '8 min read',
      publishedDate: new Date().toISOString(),
      editorialStatus: 'review',
      editorialNotes: `Publication readiness: Ready for review
- Business goals and measurable objectives explained
- Target audience and channel selection covered
- Campaign workflow and budget planning included
- KPIs connected to business outcomes
- Practical Indian business example included
- Research references from official Google documentation
- Aratha's approved brand positioning and tagline maintained

Editorial recommendation: This article should follow the introductory article "What Is Digital Marketing and Where Should a Business Start?" It moves the reader from understanding digital marketing to actually planning a goal-oriented strategy. It also creates a strong foundation for future ARATHA INSIGHTS articles on campaign budgeting, customer acquisition, marketing analytics and channel-specific strategies.`,
      coverImageHeadline: 'BUILD A STRATEGY. ALIGN YOUR GOALS. DRIVE GROWTH.',
      coverImagePrompt: `Create a premium 16:9 editorial cover image for ARATHA INSIGHTS, a business and technology publication.
Main headline: "BUILD A STRATEGY. ALIGN YOUR GOALS. DRIVE GROWTH."
Visualise a business strategy ecosystem with a central strategic planning concept connected to business objectives, target audiences, digital marketing channels, campaign execution, analytics dashboards and measurable growth.
Brand colours: Black and white foundation with Aratha yellow (#FEC903) and olive green accents.
Design style: Modern, premium, minimal and professional corporate editorial design.`,
      linkedinDescription: 'A successful digital marketing strategy starts with clear business goals, not simply choosing social media platforms or running advertisements. Discover how to define objectives, understand customers, select the right channels, plan campaigns, allocate budgets and measure meaningful KPIs.',
      linkedinHashtags: '#DigitalMarketing #MarketingStrategy #BusinessGrowth #DigitalStrategy #ArathaInsights',
      linkedinPost: `Are your digital marketing activities connected to your business goals?

Many businesses invest in websites, social media, SEO and online advertisements without having a clear strategy behind them.

But successful digital marketing is not about doing everything. It is about doing the right things for the right reasons.

In our latest ARATHA INSIGHTS article, we explore:
🔹 How to define clear business marketing objectives
🔹 Understanding your target audience
🔹 Selecting the right digital marketing channels
🔹 Building a practical campaign workflow
🔹 Allocating marketing budgets strategically
🔹 Measuring performance through meaningful KPIs
🔹 Reviewing and improving campaign results

Remember: Every marketing activity should contribute to a measurable business objective.

Planning your next campaign? Discuss your digital growth goals with Aratha.
🌐 https://www.aratha.in
✉️ info@aratha.in

#DigitalMarketing #MarketingStrategy #BusinessGrowth #DigitalStrategy #ArathaInsights`,
      seoTitle: 'Building a Digital Marketing Strategy With Clear Business Goals',
      seoDescription: 'Learn how to build a digital marketing strategy with clear business goals, audience targeting, channel selection, campaign planning and measurable KPIs.',
      researchReferences: `1. Google – Map Your Measurement Goals (https://services.google.com/fh/files/misc/map_your_measurement_goals_en.pdf)
2. Google Ads – 8 Steps to Prepare Your Campaign for Success (https://support.google.com/google-ads/answer/10498850)
3. Google Analytics – Conversions vs. Key Events (https://support.google.com/analytics/answer/13965727)
4. Google Analytics – Mark Events as Key Events (https://support.google.com/analytics/answer/13128484)
5. Google Ads – Choose the Right Campaign Type (https://support.google.com/google-ads/answer/2567043)`,
    };

    const res = await fetch('http://localhost:3000/api/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify(newArticlePayload),
    });

    const resData = await res.json();
    if (res.ok) {
      console.log(`Saved new LinkedIn article "${newArticlePayload.title}" (ID: ${resData.doc?.id})`);
    } else {
      console.error('Failed to save new article:', resData);
    }

    // Also update db.json so frontend immediately displays it
    if (!existingBlogs.some(b => b.slug === newArticleSlug)) {
      existingBlogs.unshift({
        id: 'blog-4',
        slug: newArticleSlug,
        title: newArticlePayload.title,
        excerpt: newArticlePayload.excerpt,
        content: newArticleContent,
        image: 'gradient-amber-rose',
        date: new Date().toISOString().split('T')[0],
        readTime: '8 min read',
        author: 'Aratha Team',
        category: 'Digital Marketing',
        status: 'published',
        seoTitle: newArticlePayload.seoTitle,
        seoDescription: newArticlePayload.seoDescription,
      });
      dbData.blogs = existingBlogs;
      fs.writeFileSync('src/data/db.json', JSON.stringify(dbData, null, 2), 'utf-8');
      console.log('Synchronized db.json with new article for frontend website.');
    }
  }

  console.log('All articles processed successfully!');
}

main().catch(console.error);
