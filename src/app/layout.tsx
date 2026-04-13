import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { PublicShell } from "@/components/layout/public-shell";
import { GTMScript, GTMNoScript } from "@/components/tracking/gtm";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Lumière Beauty Spa",
    template: "%s | Lumière Beauty Spa",
  },
  description: "Experience luxurious beauty treatments tailored to your needs. From facials to body contouring, Lumière Beauty Spa helps you look and feel your best.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://yourspa.com'),
  openGraph: {
    siteName: 'Lumière Beauty Spa',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} h-full antialiased`}
    >
      <head>
        {/* Preconnect to Supabase storage for faster image loading */}
        <link rel="preconnect" href="https://srxldfhypsteusdcnvtz.supabase.co" />
        <link rel="dns-prefetch" href="https://srxldfhypsteusdcnvtz.supabase.co" />
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <GTMNoScript />
        <GTMScript />
        <PublicShell>
          {children}
        </PublicShell>
        <Toaster />
      </body>
    </html>
  );
}
