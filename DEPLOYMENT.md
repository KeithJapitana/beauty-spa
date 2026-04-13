# Lumière Beauty Spa — Deployment Guide

## Prerequisites

- Coolify instance (self-hosted or cloud) running on Hostinger VPS
- Docker installed on the VPS
- PostgreSQL database (Supabase or self-hosted)
- Environment variables configured

## Environment Variables

Create a `.env.production` file in the project root with these variables:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Email
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=noreply@lumierebautyspa.com
RESEND_TO_EMAIL=contact@lumierebautyspa.com

# reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key
RECAPTCHA_SECRET_KEY=your_secret_key

# Analytics
NEXT_PUBLIC_GTM_ID=your_gtm_id (optional)
NEXT_PUBLIC_GA4_ID=your_ga4_id (optional)

# Site
NEXT_PUBLIC_SITE_URL=https://lumierebautyspa.com
```

## Deployment Steps

### 1. Using Coolify

1. **Log in to Coolify** on your Hostinger VPS
2. **Create a new Application** → Select "Docker"
3. **Connect your GitHub repository**:
   - Repository: `https://github.com/KeithJapitana/beauty-spa`
   - Branch: `main`
4. **Configure the Build Settings**:
   - Dockerfile path: `./Dockerfile`
   - Build command: (leave default)
5. **Set Environment Variables** in Coolify:
   - Copy all variables from `.env.production` into Coolify's environment section
6. **Configure Port Forwarding**:
   - Container port: `3000`
   - Public port: `80` / `443` (with SSL)
7. **Deploy**:
   - Coolify will automatically build and run the Docker image
   - Watch the deployment logs for any errors

### 2. Manual Docker Deployment

If not using Coolify, build and run manually:

```bash
# Build the image
docker build -t beauty-spa:latest .

# Run the container
docker run -d \
  -p 3000:3000 \
  --name beauty-spa \
  -e NEXT_PUBLIC_SUPABASE_URL=your_url \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key \
  -e SUPABASE_SERVICE_ROLE_KEY=your_key \
  # ... (add all other env vars)
  beauty-spa:latest

# Verify it's running
docker logs beauty-spa
```

## Post-Deployment Checklist

- [ ] Verify the site loads at your domain
- [ ] Test all pages (home, blog, services, contact, admin login)
- [ ] Check blog posts load correctly
- [ ] Verify admin dashboard is protected and works
- [ ] Test contact form submission
- [ ] Check images load from Supabase storage
- [ ] Verify email notifications are sent
- [ ] Run Lighthouse audit on production
- [ ] Test mobile responsiveness
- [ ] Monitor error logs in Coolify

## Database Migration

If deploying to a fresh Supabase instance:

1. **Create a new Supabase project**
2. **Run migrations** in the SQL editor:
   - `supabase/migrations/001_initial_schema.sql`
   - `supabase/migrations/002_fix_rls_recursion.sql`
3. **Verify RLS policies** are in place
4. **Create an admin user** via the auth console

## SSL/HTTPS

Coolify automatically handles SSL with Let's Encrypt. If using manual Docker:

1. Use Nginx or Caddy as a reverse proxy
2. Configure SSL certificates
3. Route traffic to the Docker container on `localhost:3000`

## Monitoring & Troubleshooting

### Check Logs in Coolify
- Deployments tab → View build/runtime logs
- Container metrics (CPU, memory usage)

### Common Issues

**Database Connection Refused**
- Verify `NEXT_PUBLIC_SUPABASE_URL` and keys are correct
- Check Supabase project is running
- Ensure RLS policies allow the service role key

**Images Not Loading**
- Verify Supabase storage bucket `blog-images` is public
- Check domain in `next.config.ts` remotePatterns

**Admin Login Failing**
- Verify `SUPABASE_SERVICE_ROLE_KEY` is set correctly
- Check authentication callback URL is correctly configured
- Ensure RLS policies for `auth.users()` are correct

**High Memory Usage**
- GSAP animations and page transitions can be heavy
- Monitor bundle size with `npm run build` output
- Consider disabling animations on mobile if needed

## Performance

Production deployment should see significant improvements:
- **LCP**: 2-3s (vs 7s on localhost)
- **FCP**: 1-1.5s (vs 2s on localhost)
- **Performance Score**: 70-85+ (vs 51 on localhost)

Run Lighthouse on production URL to verify real performance metrics.

## Scaling Considerations

- **Database**: Supabase auto-scales; monitor metrics
- **Storage**: Blog images stored in Supabase (pay-per-use)
- **Email**: Resend has limits; monitor send quota
- **Traffic**: Next.js with ISR can handle high traffic; add CDN for static assets

## Updates & CI/CD

Once deployed:
1. Push changes to `main` branch
2. Coolify automatically detects changes
3. Coolify rebuilds and redeployes the Docker image
4. Zero-downtime deployments (container restart)

## Backup & Recovery

- **Database**: Enable Supabase automated backups
- **Media**: Store images in Supabase (geographically distributed)
- **Code**: Keep GitHub repository updated

---

**Support**: For issues, check Coolify logs or reach out to Hostinger support.
