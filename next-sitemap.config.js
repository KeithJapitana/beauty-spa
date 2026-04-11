/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://yourspa.com',
  generateRobotsTxt: true,
  exclude: ['/admin/*', '/login'],
  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [
      { userAgent: '*', allow: '/', disallow: ['/admin'] },
    ],
  },
}
