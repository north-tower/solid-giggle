import type { Metadata } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import "./globals.css";
import { SiteLayout } from "@/components/maisha/site-layout";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Maisha Mabati | Mabati for Life",
  description: "Explore Maisha Mabati roofing sheets, profiles and finishes for your next project in Kenya.",
  openGraph: {
    title: "Maisha Mabati | Mabati for Life",
    description: "Quality roofing for the place you call home.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${dmSans.variable} ${manrope.variable}`}>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body>
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
