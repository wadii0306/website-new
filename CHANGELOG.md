# Changelog

All notable updates to the Wadii marketing website (`website-new`).

## 2025-06-03 (update)

- Removed client-side `console.info` logs from contact form (no PII in browser console)
- Contact submissions are handled by the API at `POST /website` — check product admin for leads

## 2025-06-03

- Landing page sections polished (Who Uses, Manual vs Wadii comparison, social proof)
- Real venue names in trusted-by strip
- Privacy Policy page at `/privacy-policy` with footer links
- Contact form connects to `https://api.wadii.in/api/website`
- Repo: https://github.com/wadii0306/website-new

### Deploy notes

- Set `NEXT_PUBLIC_API_URL=https://api.wadii.in/api` in Vercel
- Production site: https://www.wadii.in
