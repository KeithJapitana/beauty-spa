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
});

export const metadata: Metadata = {
  title: {
    default: "Lumière Beauty Spa",
    template: "%s | Lumière Beauty Spa",
  },
  description: "Experience luxurious beauty treatments tailored to your needs. From facials to body contouring, Lumière Beauty Spa helps you look and feel your best.",
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
