# Aratha

Aratha's website is built with Next.js. To run it locally:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Insights content

Insights and blog articles are stored in `src/data/db.json`. Add or edit entries in the `blogs` array, then commit and deploy the change. Set `status` to `"published"` to publish an article; use `"draft"` or `"review"` to keep it private. Older entries without a status remain visible for backward compatibility. Future-dated articles remain hidden until their publication date.

The site currently has no web-based CMS, scheduled publishing, or external database. Article changes are made through the repository and become available with the next deployment.

## Deploy on Vercel

The easiest way to deploy this Next.js app is through the [Vercel Platform](https://vercel.com/new).
See the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for details.
