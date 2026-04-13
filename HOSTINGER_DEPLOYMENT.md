# Lumière Beauty Spa — Hostinger Node.js Deployment Guide

> Deploy via Hostinger's Node.js hosting directly from GitHub. No Docker required.

## Prerequisites

1. **Hostinger Account** with Node.js hosting active
2. **GitHub Repository** pushed: `https://github.com/KeithJapitana/beauty-spa`
3. **Environment Variables** ready (see section below)
4. **PostgreSQL Database**: Use Supabase (cloud) or configure your own

## Step 1: Create Environment Variables

In Hostinger's hosting control panel, create these environment variables:

```bash
# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Email (Required for contact form)
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=noreply@lumierebautyspa.com
RESEND_TO_EMAIL=contact@lumierebautyspa.com

# reCAPTCHA (Required for contact form spam protection)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key
RECAPTCHA_SECRET_KEY=your_secret_key

# Analytics (Optional)
NEXT_PUBLIC_GTM_ID=your_gtm_id
NEXT_PUBLIC_GA4_ID=your_ga4_id

# Site URL (Important)
NEXT_PUBLIC_SITE_URL=https://lumierebautyspa.com
```

### Getting these values:

**Supabase:**
- Go to https://supabase.com → Your Project → Settings → API
- Copy `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
- Copy `Anon public key` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Copy `Service role key` → `SUPABASE_SERVICE_ROLE_KEY`

**Resend:**
- Go to https://resend.com → API Keys
- Create API key and copy it → `RESEND_API_KEY`
- Set your domain email → `RESEND_FROM_EMAIL`
- Set destination email → `RESEND_TO_EMAIL`

**reCAPTCHA:**
- Go to https://www.google.com/recaptcha/admin
- Create v3 site → copy keys
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` (visible to browser)
- `RECAPTCHA_SECRET_KEY` (secret, keep safe)

## Step 2: Connect GitHub Repository in Hostinger

1. **Log in to Hostinger Control Panel**
2. **Go to Web Hosting** → Your site
3. **Go to Git** or **GitHub Integration** section
4. **Connect to GitHub**:
   - Authorize Hostinger with GitHub
   - Select repository: `beauty-spa`
   - Branch: `main`
5. **Configure Build Settings**:
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Build Directory**: `.next`
   - **Node.js Version**: `18` (or 20 if available)
6. **Deploy**:
   - Click "Deploy" and wait for build to complete
   - Watch the deployment logs for errors

## Step 3: Run Database Migrations

Your site needs the database schema and RLS policies.

### Option A: Via Supabase Dashboard (Recommended)

1. **Go to Supabase Dashboard** → Your Project
2. **Go to SQL Editor**
3. **Create new query** and paste the contents of:
   - `supabase/migrations/001_initial_schema.sql`
   - Run it and wait for success
4. **Create another query** and paste:
   - `supabase/migrations/002_fix_rls_recursion.sql`
   - Run it

### Option B: Via psql CLI (if you have psql installed)

```bash
psql -h your-db-host -U postgres -d your-db-name < supabase/migrations/001_initial_schema.sql
psql -h your-db-host -U postgres -d your-db-name < supabase/migrations/002_fix_rls_recursion.sql
```

## Step 4: Create Admin User

1. **Go to Supabase Dashboard** → Auth → Users
2. **Create new user manually** or use the signup form
3. **Create admin record**:
   - Go to SQL Editor
   - Run:
   ```sql
   INSERT INTO profiles (id, name, role) 
   VALUES ((SELECT id FROM auth.users WHERE email = 'your-admin@email.com'), 'Admin Name', 'admin');
   ```

## Step 5: Verify Deployment

Once Hostinger finishes deploying:

1. **Visit your site**: `https://lumierebautyspa.com`
2. **Test pages**:
   - ✅ Homepage loads
   - ✅ Blog page works
   - ✅ Services page displays
   - ✅ Contact form accessible
   - ✅ Images load from Supabase
3. **Test admin**:
   - Go to `/login`
   - Sign in with admin credentials
   - Verify dashboard works
   - Try creating a blog post or portfolio item
4. **Test contact form**:
   - Submit test inquiry
   - Verify email arrives at `RESEND_TO_EMAIL`
   - Verify inquiry appears in admin dashboard

## Troubleshooting

### Build Fails with "npm ERR!"

**Issue:** Hostinger build fails due to missing dependencies

**Fix:**
- Ensure `package.json` is correct
- Check that all Git changes are pushed to `main` branch
- Redeploy from Hostinger dashboard

### Site Shows 500 Error

**Issue:** Runtime error in Next.js

**Fix:**
1. Check Hostinger logs (hosting dashboard → logs)
2. Verify all environment variables are set
3. Check Supabase database connection (test query in Supabase SQL Editor)
4. Try running `npm start` locally: `npm run build && npm start`

### Contact Form Not Sending Emails

**Issue:** Emails not being delivered

**Checklist:**
- [ ] `RESEND_API_KEY` is set correctly
- [ ] `RESEND_FROM_EMAIL` is set
- [ ] `RESEND_TO_EMAIL` is set
- [ ] Check Resend dashboard for failed sends
- [ ] Verify DNS records if using custom domain (Resend may require SPF/DKIM)

### Admin Dashboard Fails to Load

**Issue:** 403 or 401 errors on `/admin` pages

**Fix:**
1. Verify `SUPABASE_SERVICE_ROLE_KEY` is correct
2. Ensure RLS policies are applied (run migration 002)
3. Check that admin user's `role` is set to `'admin'` in `profiles` table
4. Try logging out and logging back in

### Images Not Loading from Blog

**Issue:** 403 or broken images

**Fix:**
1. Check Supabase storage bucket `blog-images` is **public**
2. Verify images are uploaded to correct bucket path
3. Check that image URLs start with: `https://srxldfhypsteusdcnvtz.supabase.co/storage/v1/object/public/blog-images/`
4. Verify domain is in `next.config.ts` remotePatterns

### Blog Post 404

**Issue:** Publishing works but visiting post shows 404

**Fix:**
- This is usually a build cache issue
- In Hostinger, redeploy the site
- The `generateStaticParams` will re-build all blog post pages

## Monitoring

### Check Hostinger Logs

1. Go to **Hosting Dashboard**
2. Go to **Logs** section
3. View **Build Logs** (deployment errors)
4. View **Error Logs** (runtime errors)

### Performance

Once deployed, run Lighthouse on production:

```bash
npx lighthouse https://lumierebautyspa.com --view
```

Expected scores:
- Performance: 70-85 (much better than dev server)
- Accessibility: 96
- Best Practices: 96
- SEO: 100

## Continuous Deployment

**Automatic Updates:**
- Push changes to GitHub `main` branch
- Hostinger automatically detects and rebuilds
- New version deployed with zero downtime

**Manual Redeploy:**
- Hostinger dashboard → Git → click "Deploy"

## Backup & Maintenance

### Database Backups
- Supabase handles automated daily backups
- Go to Supabase → Database → Backups to restore

### Monitor Quotas
- **Supabase**: Check storage usage and auth limits
- **Resend**: Monitor email send volume (check dashboard)
- **Hostinger**: Monitor Node.js resource usage

## SSL/HTTPS

Hostinger automatically provides SSL certificates via Let's Encrypt. Your site will be:
- `https://lumierebautyspa.com` (secure by default)

## Domain Setup

If using custom domain:
1. **Point domain to Hostinger** nameservers
2. **In Hostinger panel**, configure the domain in hosting settings
3. **SSL certificate** automatically provisioned

## Support Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs
- **Hostinger Support**: Your Hostinger control panel live chat
- **GitHub**: https://github.com/KeithJapitana/beauty-spa

---

**Quick Checklist Before Going Live:**

- [ ] GitHub repository pushed to `main`
- [ ] All environment variables set in Hostinger
- [ ] Database migrations ran (001 + 002)
- [ ] Admin user created in auth
- [ ] Hostinger deployment completed successfully
- [ ] Homepage loads at your domain
- [ ] Blog posts render correctly
- [ ] Admin dashboard accessible and functional
- [ ] Contact form sends emails
- [ ] Images load from Supabase
- [ ] Mobile responsive on all pages
- [ ] Lighthouse audit run (expect 90+ overall)

🚀 **You're ready to go live!**
