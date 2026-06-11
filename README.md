# Wadii Marketing Website

Next.js marketing site for [Wadii](https://www.wadii.in) — banquet management software.

**Repo:** https://github.com/wadii0306/website-new  
**Changelog:** see [CHANGELOG.md](./CHANGELOG.md)

## Environment

Copy `env.example` to `.env` locally, or set the same variable in **Vercel → Settings → Environment Variables**:

```env
NEXT_PUBLIC_API_URL=https://api.wadii.in/api
```

**Important:** `NEXT_PUBLIC_*` variables are baked in at build time. After adding or changing this on Vercel, you must **Redeploy** the project.

Contact form posts to `POST /website` → full URL `https://api.wadii.in/api/website`. Leads appear in product admin under web leads.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
