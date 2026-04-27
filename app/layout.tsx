import type { Metadata } from "next";
import { Cairo, Public_Sans } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["latin"],
  variable: "--font-cairo",
  display: "swap",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Econova – Environmental Campaign Tracker",
  description:
    "Join thousands of stewards transforming their local environments. Track real-time impact of reforestation campaigns.",
  openGraph: {
    title: "Econova – Environmental Campaign Tracker",
    description: "Real-time reforestation campaign tracking.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cairo.variable} ${publicSans.variable}`}>
      <body className="min-h-screen bg-[#fdfbef] antialiased">{children}</body>
    </html>
  );
}
